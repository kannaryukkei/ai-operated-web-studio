<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Fillable([
    'project_id',
    'submitted_by',
    'version',
    'payload',
    'status',
    'submitted_at',
])]
/**
 * @property array<string, mixed> $payload
 * @property \Illuminate\Support\Carbon|null $submitted_at
 */
class ProjectIntake extends Model
{
    protected function casts(): array
    {
        return [
            'version' => 'integer',
            'payload' => 'array',
            'submitted_at' => 'datetime',
        ];
    }

    /** @return BelongsTo<Project, $this> */
    public function project(): BelongsTo
    {
        return $this->belongsTo(Project::class);
    }

    /** @return BelongsTo<User, $this> */
    public function submitter(): BelongsTo
    {
        return $this->belongsTo(User::class, 'submitted_by');
    }
}
