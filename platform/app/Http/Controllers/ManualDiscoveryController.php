<?php

namespace App\Http\Controllers;

use App\Actions\Discovery\CreateDiscoveryRun;
use App\Enums\DiscoveryRunStatus;
use App\Models\DiscoveryRun;
use App\Models\Project;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;
use JsonException;

class ManualDiscoveryController extends Controller
{
    public function show(Request $request, Project $project): Response
    {
        $this->authorizeStudio($request);

        $intake = $project->intakes()
            ->where('status', 'submitted')
            ->latest('version')
            ->first();

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
            'prompt' => $run && $run->status->isActive()
                ? $this->buildPrompt($run->input_snapshot)
                : null,
        ]);
    }

    public function start(
        Request $request,
        Project $project,
        CreateDiscoveryRun $createDiscoveryRun,
    ): RedirectResponse {
        $this->authorizeStudio($request);

        $run = $createDiscoveryRun->handle($project, (int) $request->user()->getKey());

        if ($run->status === DiscoveryRunStatus::Queued) {
            $run->update([
                'status' => DiscoveryRunStatus::Processing,
                'started_at' => now(),
            ]);
        }

        return to_route('projects.discovery.show', $project)
            ->with('success', 'Discovery workspace is ready. Run the prompt in your AI app, then paste the JSON result here.');
    }

    public function complete(
        Request $request,
        Project $project,
        DiscoveryRun $discoveryRun,
    ): RedirectResponse {
        $this->authorizeStudio($request);
        abort_unless($discoveryRun->project_id === $project->getKey(), 404);

        if (! $discoveryRun->status->isActive()) {
            throw ValidationException::withMessages([
                'result_json' => 'This discovery run is no longer active. Start a new run to continue.',
            ]);
        }

        $validated = $request->validate([
            'result_json' => ['required', 'string', 'max:60000', 'json'],
        ]);

        try {
            $decoded = json_decode($validated['result_json'], true, 512, JSON_THROW_ON_ERROR);
        } catch (JsonException) {
            throw ValidationException::withMessages([
                'result_json' => 'The result must be valid JSON. Paste the JSON object without Markdown code fences.',
            ]);
        }

        if (! is_array($decoded) || array_is_list($decoded)) {
            throw ValidationException::withMessages([
                'result_json' => 'The result must be a JSON object with the required discovery fields.',
            ]);
        }

        $validator = Validator::make($decoded, [
            'business_summary' => ['required', 'string', 'max:5000'],
            'primary_audience' => ['required', 'array', 'min:1'],
            'primary_audience.*' => ['required', 'string', 'max:500'],
            'website_goal' => ['required', 'string', 'max:2000'],
            'primary_conversion' => ['required', 'string', 'max:1000'],
            'recommended_tier' => ['required', 'in:starter,business,custom'],
            'recommendation_rationale' => ['required', 'array', 'min:1'],
            'recommendation_rationale.*' => ['required', 'string', 'max:1000'],
            'sections' => ['required', 'array', 'min:1'],
            'sections.*.key' => ['required', 'string', 'max:100'],
            'sections.*.purpose' => ['required', 'string', 'max:1000'],
            'sections.*.visitor_question' => ['required', 'string', 'max:1000'],
            'sections.*.draft_message' => ['required', 'string', 'max:2000'],
            'missing_information' => ['present', 'array'],
            'missing_information.*' => ['required', 'string', 'max:1000'],
            'claims_requiring_approval' => ['present', 'array'],
            'claims_requiring_approval.*' => ['required', 'string', 'max:1000'],
            'scope_risks' => ['present', 'array'],
            'scope_risks.*' => ['required', 'string', 'max:1000'],
            'next_step' => ['required', 'string', 'max:2000'],
        ]);

        if ($validator->fails()) {
            throw ValidationException::withMessages([
                'result_json' => 'The JSON is valid, but its structure is incomplete. Use the required discovery output format shown in the prompt.',
            ]);
        }

        $discoveryRun->update([
            'result' => $validator->validated(),
            'status' => DiscoveryRunStatus::Completed,
            'started_at' => $discoveryRun->started_at ?? now(),
            'completed_at' => now(),
            'failure_reason' => null,
        ]);

        return to_route('projects.discovery.show', $project)
            ->with('success', 'Discovery brief saved successfully.');
    }

    private function authorizeStudio(Request $request): void
    {
        abort_unless($request->user()?->isStudioStaff(), 403);
    }

    /**
     * @param  array<string, mixed>  $inputSnapshot
     */
    private function buildPrompt(array $inputSnapshot): string
    {
        $input = json_encode(
            $inputSnapshot,
            JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE,
        ) ?: '{}';

        return <<<PROMPT
You are the Discovery Strategist for a professional website studio.

TASK
Turn the submitted business intake below into a practical, client-ready website discovery brief.

WORKING RULES
- Use only information supported by the intake. Never invent business facts, credentials, testimonials, results, prices, or guarantees.
- Clearly identify unknown information in missing_information instead of guessing.
- Recommend a Starter, Business, or Custom tier based on actual complexity. This is a recommendation, not a commercial commitment.
- Keep the brief specific to this business. Avoid generic marketing language.
- Make every proposed website section serve a visitor need or business goal.
- Flag factual claims that need client verification and scope risks that need studio review.
- Do not expose private reasoning. Provide concise conclusions and practical rationale only.
- Return one valid JSON object only. Do not use Markdown fences or add explanations outside the JSON.

SUBMITTED BUSINESS INTAKE
{$input}

REQUIRED JSON SHAPE
{
  "business_summary": "string",
  "primary_audience": ["string"],
  "website_goal": "string",
  "primary_conversion": "string",
  "recommended_tier": "starter|business|custom",
  "recommendation_rationale": ["string"],
  "sections": [
    {
      "key": "hero",
      "purpose": "string",
      "visitor_question": "string",
      "draft_message": "string"
    }
  ],
  "missing_information": [],
  "claims_requiring_approval": [],
  "scope_risks": [],
  "next_step": "string"
}

Return all fields, even when one of the list fields is an empty array.
PROMPT;
    }
}
