<?php

namespace App\Http\Controllers;

use App\Models\ClientAccount;
use App\Models\Project;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class WorkspacePageController extends Controller
{
    public function dashboard(Request $request): Response
    {
        Gate::authorize('viewAny', Project::class);

        $user = $request->user();
        $projects = Project::query()
            ->with('clientAccount:id,business_name')
            ->when(! $user->isStudioStaff(), fn (Builder $query) => $query->where(
                fn (Builder $visible) => $visible
                    ->whereHas('clientAccount.users', fn (Builder $members) => $members->whereKey($user->getKey()))
                    ->orWhereHas('members', fn (Builder $members) => $members->whereKey($user->getKey())),
            ))
            ->latest()
            ->limit(6)
            ->get();

        $accountsQuery = ClientAccount::query()
            ->when(! $user->isStudioStaff(), fn (Builder $query) => $query->whereHas(
                'users',
                fn (Builder $members) => $members->whereKey($user->getKey()),
            ));

        $projectQuery = Project::query()
            ->when(! $user->isStudioStaff(), fn (Builder $query) => $query->where(
                fn (Builder $visible) => $visible
                    ->whereHas('clientAccount.users', fn (Builder $members) => $members->whereKey($user->getKey()))
                    ->orWhereHas('members', fn (Builder $members) => $members->whereKey($user->getKey())),
            ));

        return Inertia::render('dashboard', [
            'stats' => [
                'clients' => (clone $accountsQuery)->count(),
                'projects' => (clone $projectQuery)->count(),
                'activeProjects' => (clone $projectQuery)->whereIn('status', ['onboarding', 'active'])->count(),
                'completedProjects' => (clone $projectQuery)->where('status', 'completed')->count(),
            ],
            'recentProjects' => $projects,
            'isStudio' => $user->isStudioStaff(),
        ]);
    }

    public function clients(Request $request): Response
    {
        Gate::authorize('viewAny', ClientAccount::class);

        $user = $request->user();
        $clients = ClientAccount::query()
            ->withCount('projects')
            ->when(! $user->isStudioStaff(), fn (Builder $query) => $query->whereHas(
                'users',
                fn (Builder $members) => $members->whereKey($user->getKey()),
            ))
            ->orderBy('business_name')
            ->paginate(12)
            ->withQueryString();

        return Inertia::render('clients/index', [
            'clients' => $clients,
            'isStudio' => $user->isStudioStaff(),
            'invitationUrl' => session('invitation_url'),
        ]);
    }

    public function storeClient(Request $request): RedirectResponse
    {
        Gate::authorize('create', ClientAccount::class);

        $validated = $request->validate([
            'business_name' => ['required', 'string', 'max:160'],
            'business_category' => ['nullable', 'string', 'max:120'],
            'website' => ['nullable', 'url', 'max:255'],
            'contact_name' => ['nullable', 'string', 'max:160'],
            'contact_email' => ['nullable', 'email', 'max:255'],
            'contact_phone' => ['nullable', 'string', 'max:40'],
        ]);

        $baseSlug = Str::slug($validated['business_name']) ?: 'client';
        $slug = $baseSlug;
        $suffix = 2;

        while (ClientAccount::query()->where('slug', $slug)->exists()) {
            $slug = $baseSlug.'-'.$suffix++;
        }

        $validated['slug'] = $slug;
        ClientAccount::create($validated);

        return to_route('clients.index')->with('success', 'Client account created.');
    }

    public function projects(Request $request): Response
    {
        Gate::authorize('viewAny', Project::class);

        $user = $request->user();
        $projects = Project::query()
            ->with('clientAccount:id,business_name')
            ->when(! $user->isStudioStaff(), fn (Builder $query) => $query->where(
                fn (Builder $visible) => $visible
                    ->whereHas('clientAccount.users', fn (Builder $members) => $members->whereKey($user->getKey()))
                    ->orWhereHas('members', fn (Builder $members) => $members->whereKey($user->getKey())),
            ))
            ->latest()
            ->paginate(12)
            ->withQueryString();

        $clients = $user->isStudioStaff()
            ? ClientAccount::query()->orderBy('business_name')->get(['id', 'business_name'])
            : collect();

        return Inertia::render('projects/index', [
            'projects' => $projects,
            'clients' => $clients,
            'isStudio' => $user->isStudioStaff(),
        ]);
    }

    public function storeProject(Request $request): RedirectResponse
    {
        Gate::authorize('create', Project::class);

        $validated = $request->validate([
            'client_account_id' => ['required', 'integer', 'exists:client_accounts,id'],
            'product_tier' => ['required', 'in:starter,business,custom'],
            'name' => ['required', 'string', 'max:160'],
            'objective' => ['nullable', 'string', 'max:4000'],
            'target_launch_date' => ['nullable', 'date'],
        ]);

        $project = new Project($validated);
        $project->created_by = $request->user()->getKey();
        $project->status = 'draft';
        $project->current_stage = 'discovery';
        $project->save();

        return to_route('projects.index')->with('success', 'Project created.');
    }
}
