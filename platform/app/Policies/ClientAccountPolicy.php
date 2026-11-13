<?php

namespace App\Policies;

use App\Models\ClientAccount;
use App\Models\User;

class ClientAccountPolicy
{
    public function viewAny(User $user): bool
    {
        return $user->isStudioStaff() || $user->isClient();
    }

    public function view(User $user, ClientAccount $clientAccount): bool
    {
        return $user->isStudioStaff()
            || $clientAccount->users()->whereKey($user->getKey())->exists();
    }

    public function create(User $user): bool
    {
        return $user->isStudioStaff();
    }

    public function update(User $user, ClientAccount $clientAccount): bool
    {
        return $user->isStudioStaff()
            || $clientAccount->users()
                ->whereKey($user->getKey())
                ->wherePivotIn('membership_role', ['owner', 'admin'])
                ->exists();
    }

    public function manageMembers(User $user, ClientAccount $clientAccount): bool
    {
        return $user->isStudioStaff();
    }

    public function delete(User $user, ClientAccount $clientAccount): bool
    {
        return $user->isStudioOwner();
    }
}
