<?php

namespace App\Models;

use App\Enums\DiscoveryRunStatus;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Carbon;

/**
 * @property int $project_id
 * @property int $project_intake_id
 * @property int|null $requested_by
 * @property int $intake_version
 * @property string|null $failure_reason
 * @property array<string, mixed> $input_snapshot
 * @property array<string, mixed>|null $result
 * @property DiscoveryRunStatus $status
 * @property Carbon|null $started_at
 * @property Carbon|null $completed_at
 */
#[Fillable([
    'project_id',
    'project_intake_id',
    'requested_by',
    'intake_version',
    'input_snapshot',
    'status',
    'result',
    'failure_reason',
    'started_at',
    'completed_at',
])]
class DiscoveryRun extends Model
{
    protected function casts(): array
    {
        return [
            'intake_version' => 'integer',
            'input_snapshot' => 'array',
            'result' => 'array',
            'status' => DiscoveryRunStatus::class,
            'started_at' => 'datetime',
            'completed_at' => 'datetime',
        ];
    }

    /** @return BelongsTo<Project, $this> */
    public function project(): BelongsTo
    {
        return $this->belongsTo(Project::class);
    }

    /** @return BelongsTo<ProjectIntake, $this> */
    public function intake(): BelongsTo
    {
        return $this->belongsTo(ProjectIntake::class, 'project_intake_id');
    }

    /** @return BelongsTo<User, $this> */
    public function requester(): BelongsTo
    {
        return $this->belongsTo(User::class, 'requested_by');
    }
}
