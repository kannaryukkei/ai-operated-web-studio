<?php

namespace App\Policies;

use App\Models\Project;
use App\Models\User;

class ProjectPolicy
{
    public function viewAny(User $user): bool
    {
        return $user->isStudioStaff() || $user->isClient();
    }

    public function view(User $user, Project $project): bool
    {
        if ($user->isStudioStaff()) {
            return true;
        }

        return $user->clientAccounts()
            ->whereKey($project->client_account_id)
            ->exists()
            || $project->members()->whereKey($user->getKey())->exists();
    }

    public function create(User $user): bool
    {
        return $user->isStudioStaff();
    }

    public function update(User $user, Project $project): bool
    {
        if ($user->isStudioStaff()) {
            return true;
        }

        $isAccountOwner = $user->clientAccounts()
            ->whereKey($project->client_account_id)
            ->wherePivot('membership_role', 'owner')
            ->exists();

        $isProjectEditor = $project->members()
            ->whereKey($user->getKey())
            ->wherePivotIn('role', ['owner', 'editor'])
            ->exists();

        return $isAccountOwner || $isProjectEditor;
    }

    public function delete(User $user, Project $project): bool
    {
        return $user->isStudioOwner();
    }
}
