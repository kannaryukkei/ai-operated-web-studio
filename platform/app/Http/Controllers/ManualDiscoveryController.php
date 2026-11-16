<?php

namespace App\Http\Controllers;

use App\Actions\Discovery\CompleteDiscoveryRun;
use App\Actions\Discovery\CreateDiscoveryRun;
use App\Enums\DiscoveryRunStatus;
use App\Models\DiscoveryRun;
use App\Models\Project;
use App\Services\Discovery\DiscoveryContract;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;

class ManualDiscoveryController extends Controller
{
    public function show(Request $request, Project $project, DiscoveryContract $discoveryContract): Response
    {
        $this->authorizeStudio($request);
        $intake = $project->intakes()->where('status', 'submitted')->latest('version')->first();
        $run = $intake?->discoveryRuns()->latest('id')->first();

        return Inertia::render('projects/discovery', [
            'project' => [
                'id' => $project->getKey(),
                'name' => $project->name,
                'clientName' => $project->clientAccount()->value('business_name'),
            ],
            'hasSubmittedIntake' => $intake !== null,
            'run' => $run ? [
                'id' => $run->getKey(),
                'status' => $run->status->value,
                'intakeVersion' => $run->intake_version,
                'result' => $run->result,
                'failureReason' => $run->failure_reason,
            ] : null,
            'canStart' => $intake !== null && ($run === null || ! $run->status->isActive()),
            'prompt' => $run && $run->status->isActive() ? $discoveryContract->buildPrompt($run->input_snapshot) : null,
        ]);
    }

    public function start(Request $request, Project $project, CreateDiscoveryRun $createDiscoveryRun): RedirectResponse
    {
        $this->authorizeStudio($request);
        $run = $createDiscoveryRun->handle($project, (int) $request->user()->getKey());

        if ($run->status === DiscoveryRunStatus::Queued) {
            $run->update(['status' => DiscoveryRunStatus::Processing, 'started_at' => now()]);
        }

        return to_route('projects.discovery.show', $project)
            ->with('success', 'Discovery workspace is ready. Run the prompt in your AI app, then paste the JSON result here.');
    }

    public function complete(Request $request, Project $project, DiscoveryRun $discoveryRun, CompleteDiscoveryRun $completeDiscoveryRun, DiscoveryContract $discoveryContract): RedirectResponse
    {
        $this->authorizeStudio($request);
        abort_unless($discoveryRun->project_id === $project->getKey(), 404);

        if (! $discoveryRun->status->isActive()) {
            throw ValidationException::withMessages(['result_json' => 'This discovery run is no longer active. Start a new run to continue.']);
        }

        $validated = $request->validate([
            'result_json' => $discoveryContract->resultJsonInputRules(),
        ]);

        $completeDiscoveryRun->handle($project, $discoveryRun, $validated['result_json']);

        return to_route('projects.discovery.show', $project)->with('success', 'Discovery brief saved successfully.');
    }

    private function authorizeStudio(Request $request): void
    {
        abort_unless($request->user()?->isStudioStaff(), 403);
    }

}
