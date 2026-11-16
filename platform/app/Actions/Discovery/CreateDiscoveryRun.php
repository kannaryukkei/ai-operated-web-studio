<?php

namespace App\Actions\Discovery;

use App\Enums\DiscoveryRunStatus;
use App\Models\DiscoveryRun;
use App\Models\Project;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class CreateDiscoveryRun
{
    public function handle(Project $project, int $requestedBy): DiscoveryRun
    {
        return DB::transaction(function () use ($project, $requestedBy): DiscoveryRun {
            /** @var Project $lockedProject */
            $lockedProject = Project::query()
                ->whereKey($project->getKey())
                ->lockForUpdate()
                ->firstOrFail();

            $intake = $lockedProject->intakes()
                ->where('status', 'submitted')
                ->latest('version')
                ->first();

            if ($intake === null) {
                throw ValidationException::withMessages([
                    'intake' => 'A submitted business intake is required before discovery can start.',
                ]);
            }

            $activeRun = $lockedProject->discoveryRuns()
                ->where('project_intake_id', $intake->getKey())
                ->whereIn('status', [
                    DiscoveryRunStatus::Queued->value,
                    DiscoveryRunStatus::Processing->value,
                ])
                ->latest('id')
                ->first();

            if ($activeRun !== null) {
                return $activeRun;
            }

            return $lockedProject->discoveryRuns()->create([
                'project_intake_id' => $intake->getKey(),
                'requested_by' => $requestedBy,
                'intake_version' => $intake->version,
                'intake_schema_version' => $intake->schema_version,
                'input_snapshot' => $intake->payload,
                'status' => DiscoveryRunStatus::Queued,
            ]);
        });
    }
}
