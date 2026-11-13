<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

#[Fillable([
    'client_account_id',
    'product_tier',
    'status',
    'name',
    'objective',
    'target_launch_date',
    'current_stage',
    'next_action',
    'next_action_owner',
])]
class Project extends Model
{
    protected function casts(): array
    {
        return [
            'target_launch_date' => 'date',
        ];
    }

    /** @return BelongsTo<ClientAccount, $this> */
    public function clientAccount(): BelongsTo
    {
        return $this->belongsTo(ClientAccount::class);
    }

    /** @return BelongsTo<User, $this> */
    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    /** @return BelongsToMany<User, $this> */
    public function members(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'project_members')
            ->withPivot('role')
            ->withTimestamps();
    }
}
