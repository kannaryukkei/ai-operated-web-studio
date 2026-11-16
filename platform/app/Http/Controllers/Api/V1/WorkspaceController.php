<?php

namespace App\Http\Controllers\Api\V1;

use App\Actions\Workspace\CreateClientAccount;
use App\Http\Controllers\Controller;
use App\Http\Requests\Api\V1\StoreClientAccountRequest as StoreApiClientAccountRequest;
use App\Models\ClientAccount;
use App\Models\Project;
use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class WorkspaceController extends Controller
{
    public function clientAccounts(Request $request): JsonResponse
    {
        Gate::authorize('viewAny', ClientAccount::class);

        $accounts = ClientAccount::query()
            ->withCount('projects')
            ->when(
                ! $request->user()->isStudioStaff(),
                fn (Builder $query) => $query->whereHas(
                    'users',
                    fn (Builder $members) => $members->whereKey($request->user()->getKey()),
                ),
            )
            ->orderBy('business_name')
            ->get();

        return response()->json(['data' => $accounts]);
    }

    public function storeClientAccount(
        StoreApiClientAccountRequest $request,
        CreateClientAccount $createClientAccount,
    ): JsonResponse {
        $account = $createClientAccount->handle($request->validated());

        return response()->json(['data' => $account], 201);
    }

    public function showClientAccount(ClientAccount $clientAccount): JsonResponse
    {
        Gate::authorize('view', $clientAccount);

        $clientAccount->load([
            'projects' => fn ($query) => $query->latest(),
        ]);

        return response()->json(['data' => $clientAccount]);
    }

    public function addClientAccountMember(Request $request, ClientAccount $clientAccount): JsonResponse
    {
        Gate::authorize('manageMembers', $clientAccount);

        $validated = $request->validate([
            'user_id' => ['required', 'integer', 'exists:users,id'],
            'membership_role' => ['required', 'in:owner,member'],
        ]);

        $clientUser = User::query()
            ->whereKey($validated['user_id'])
            ->firstOrFail();

        if (! $clientUser->isClient()) {
            return response()->json([
                'message' => 'Only users with the client role can be assigned to a client account.',
            ], 422);
        }

        $clientAccount->users()->syncWithoutDetaching([
            $clientUser->getKey() => ['membership_role' => $validated['membership_role']],
        ]);

        return response()->json([
            'data' => [
                'client_account_id' => $clientAccount->getKey(),
                'user_id' => $clientUser->getKey(),
                'membership_role' => $validated['membership_role'],
            ],
        ], 201);
    }

    public function projects(Request $request): JsonResponse
    {
        Gate::authorize('viewAny', Project::class);

        $user = $request->user();

        $projects = Project::query()
            ->with('clientAccount:id,business_name')
            ->when(
                ! $user->isStudioStaff(),
                fn (Builder $query) => $query->where(
                    fn (Builder $visible) => $visible
                        ->whereHas(
                            'clientAccount.users',
                            fn (Builder $members) => $members->whereKey($user->getKey()),
                        )
                        ->orWhereHas(
                            'members',
                            fn (Builder $members) => $members->whereKey($user->getKey()),
                        ),
                ),
            )
            ->latest()
            ->get();

        return response()->json(['data' => $projects]);
    }

    public function storeProject(Request $request): JsonResponse
    {
        Gate::authorize('create', Project::class);

        $validated = $request->validate([
            'client_account_id' => ['required', 'integer', 'exists:client_accounts,id'],
            'product_tier' => ['required', 'in:starter,business,custom'],
            'status' => ['sometimes', 'in:draft,onboarding,active,on_hold,completed,cancelled'],
            'name' => ['required', 'string', 'max:160'],
            'objective' => ['nullable', 'string', 'max:4000'],
            'target_launch_date' => ['nullable', 'date'],
            'current_stage' => ['sometimes', 'string', 'max:64'],
            'next_action' => ['nullable', 'string', 'max:4000'],
            'next_action_owner' => ['nullable', 'in:studio,client'],
        ]);

        $clientAccount = ClientAccount::query()->findOrFail($validated['client_account_id']);
        Gate::authorize('view', $clientAccount);

        $project = new Project($validated);
        $project->created_by = $request->user()->getKey();
        $project->save();

        return response()->json([
            'data' => $project->load('clientAccount:id,business_name'),
        ], 201);
    }

    public function showProject(Project $project): JsonResponse
    {
        Gate::authorize('view', $project);

        return response()->json([
            'data' => $project->load('clientAccount:id,business_name'),
        ]);
    }
}
