<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

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

    /** @return \Illuminate\Database\Eloquent\Relations\BelongsTo<Project, $this> */
    public function project(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(Project::class);
    }

    /** @return \Illuminate\Database\Eloquent\Relations\BelongsTo<User, $this> */
    public function submitter(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(User::class, 'submitted_by');
    }
}
