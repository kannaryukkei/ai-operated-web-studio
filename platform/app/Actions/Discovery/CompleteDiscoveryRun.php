<?php

namespace App\Actions\Discovery;

use App\Enums\DiscoveryRunStatus;
use App\Models\DiscoveryRun;
use App\Models\Project;
use App\Services\Discovery\DiscoveryContract;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class CompleteDiscoveryRun
{
    public function __construct(private readonly DiscoveryContract $discoveryContract)
    {
    }

    public function handle(Project $project, DiscoveryRun $discoveryRun, string $resultJson): void
    {
        DB::transaction(function () use ($project, $discoveryRun, $resultJson): void {
            $lockedRun = DiscoveryRun::query()
                ->whereKey($discoveryRun->getKey())
                ->lockForUpdate()
                ->firstOrFail();

            abort_unless($lockedRun->project_id === $project->getKey(), 404);

            if (! $lockedRun->status->isActive()) {
                throw ValidationException::withMessages([
                    'result_json' => 'This discovery run is no longer active. Start a new run to continue.',
                ]);
            }

            $lockedRun->update([
                'result' => $this->discoveryContract->validateResultJson($resultJson),
                'status' => DiscoveryRunStatus::Completed,
                'started_at' => $lockedRun->started_at ?? now(),
                'completed_at' => now(),
                'failure_reason' => null,
            ]);
        });
    }
}
