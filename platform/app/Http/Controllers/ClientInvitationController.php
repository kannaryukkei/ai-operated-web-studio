<?php

namespace App\Http\Controllers;

use App\Enums\UserRole;
use App\Models\ClientAccount;
use App\Models\ClientInvitation;
use App\Models\User;
use Illuminate\Database\QueryException;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Validation\Rules\Password;
use Inertia\Inertia;
use Inertia\Response;

class ClientInvitationController extends Controller
{
    public function store(Request $request, ClientAccount $clientAccount): RedirectResponse
    {
        Gate::authorize('manageMembers', $clientAccount);

        $validated = $request->validate([
            'email' => ['required', 'email', 'max:255'],
            'membership_role' => ['required', 'in:owner,member'],
        ]);

        $email = Str::lower($validated['email']);
        $existingUser = User::query()->whereRaw('lower(email) = ?', [$email])->first();

        if ($existingUser?->isStudioStaff()) {
            return back()->withErrors(['email' => 'Studio staff cannot be invited as client members.']);
        }

        if ($existingUser && $clientAccount->users()->whereKey($existingUser->getKey())->exists()) {
            return back()->withErrors(['email' => 'This user is already a member of this client account.']);
        }

        $token = Str::random(64);

        DB::transaction(function () use ($clientAccount, $request, $email, $validated, $token): void {
            ClientInvitation::query()
                ->where('client_account_id', $clientAccount->getKey())
                ->whereRaw('lower(email) = ?', [$email])
                ->whereNull('accepted_at')
                ->whereNull('revoked_at')
                ->update(['revoked_at' => now()]);

            ClientInvitation::create([
                'client_account_id' => $clientAccount->getKey(),
                'invited_by' => $request->user()->getKey(),
                'email' => $email,
                'membership_role' => $validated['membership_role'],
                'token_hash' => hash('sha256', $token),
                'expires_at' => now()->addDays(7),
            ]);
        });

        return back()->with('invitation_url', url('/invitations/'.$token));
    }

    public function show(string $token): Response
    {
        $invitation = $this->findInvitation($token);

        abort_unless($invitation->isPending(), 404);

        $user = request()->user();
        $existingUser = User::query()->whereRaw('lower(email) = ?', [Str::lower($invitation->email)])->exists();

        return Inertia::render('invitations/show', [
            'email' => $invitation->email,
            'businessName' => $invitation->clientAccount->business_name,
            'membershipRole' => $invitation->membership_role,
            'existingUser' => $existingUser,
            'canAccept' => $user !== null
                && Str::lower($user->email) === Str::lower($invitation->email)
                && $user->isClient(),
            'token' => $token,
        ]);
    }

    public function accept(Request $request, string $token): RedirectResponse
    {
        $invitation = $this->findInvitation($token);

        $validated = $request->validate([
            'name' => ['required_without:existing_account', 'nullable', 'string', 'max:160'],
            'password' => ['required_without:existing_account', 'nullable', 'confirmed', Password::defaults()],
        ]);

        try {
            $user = DB::transaction(function () use ($invitation, $request, $validated): User {
                $lockedInvitation = ClientInvitation::query()
                    ->whereKey($invitation->getKey())
                    ->lockForUpdate()
                    ->firstOrFail();

                abort_unless($lockedInvitation->isPending(), 404);

                $user = User::query()
                    ->whereRaw('lower(email) = ?', [Str::lower($lockedInvitation->email)])
                    ->lockForUpdate()
                    ->first();

                if ($user) {
                    abort_unless($request->user() !== null, 403, 'Log in with the invited email address to accept this invitation.');
                    abort_unless(Str::lower($request->user()->email) === Str::lower($lockedInvitation->email), 403);
                    abort_unless($user->isClient(), 403);
                } else {
                    abort_unless($request->user() === null, 403, 'This invitation is for a different email address.');
                    $user = User::create([
                        'name' => $validated['name'],
                        'email' => $lockedInvitation->email,
                        'password' => Hash::make($validated['password']),
                    ]);
                    $user->forceFill(['role' => UserRole::Client])->save();
                }

                $lockedInvitation->clientAccount->users()->syncWithoutDetaching([
                    $user->getKey() => ['membership_role' => $lockedInvitation->membership_role],
                ]);
                $lockedInvitation->forceFill(['accepted_at' => now()])->save();

                return $user;
            });
        } catch (QueryException $exception) {
            throw $exception;
        }

        if (! $request->user()) {
            Auth::login($user);
        }

        return to_route('dashboard')->with('success', 'You have joined '.$invitation->clientAccount->business_name.'.');
    }

    public function revoke(ClientAccount $clientAccount, ClientInvitation $invitation): RedirectResponse
    {
        Gate::authorize('manageMembers', $clientAccount);
        abort_unless($invitation->client_account_id === $clientAccount->getKey(), 404);
        abort_unless($invitation->accepted_at === null, 409);

        $invitation->forceFill(['revoked_at' => now()])->save();

        return back()->with('success', 'Invitation revoked.');
    }

    private function findInvitation(string $token): ClientInvitation
    {
        return ClientInvitation::query()
            ->with('clientAccount')
            ->where('token_hash', hash('sha256', $token))
            ->firstOrFail();
    }
}
