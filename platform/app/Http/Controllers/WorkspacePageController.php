<?php

namespace App\Http\Controllers;

use App\Actions\Workspace\CreateClientAccount;
use App\Actions\Workspace\CreateProject;
use App\Http\Requests\StoreClientAccountRequest;
use App\Http\Requests\StoreProjectRequest;
use App\Models\ClientAccount;
use App\Models\Project;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
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

    public function storeClient(
        StoreClientAccountRequest $request,
        CreateClientAccount $createClientAccount,
    ): RedirectResponse {
        $createClientAccount->handle($request->validated());

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

    public function storeProject(
        StoreProjectRequest $request,
        CreateProject $createProject,
    ): RedirectResponse {
        $attributes = [
            ...$request->validated(),
            'status' => 'draft',
            'current_stage' => 'discovery',
        ];

        $createProject->handle($attributes, $request->user());

        return to_route('projects.index')->with('success', 'Project created.');
    }
}
