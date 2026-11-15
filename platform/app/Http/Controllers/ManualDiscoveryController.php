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
            'prompt' => $run && $run->status->isActive() ? $this->buildPrompt($run->input_snapshot) : null,
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

    public function complete(Request $request, Project $project, DiscoveryRun $discoveryRun): RedirectResponse
    {
        $this->authorizeStudio($request);
        abort_unless($discoveryRun->project_id === $project->getKey(), 404);

        if (! $discoveryRun->status->isActive()) {
            throw ValidationException::withMessages(['result_json' => 'This discovery run is no longer active. Start a new run to continue.']);
        }

        $validated = $request->validate(['result_json' => ['required', 'string', 'max:60000', 'json']]);

        try {
            $decoded = json_decode($validated['result_json'], true, 512, JSON_THROW_ON_ERROR);
        } catch (JsonException) {
            throw ValidationException::withMessages(['result_json' => 'The result must be valid JSON. Paste the JSON object without Markdown code fences.']);
        }

        if (! is_array($decoded) || array_is_list($decoded)) {
            throw ValidationException::withMessages(['result_json' => 'The result must be a JSON object with the required discovery fields.']);
        }

        $validator = Validator::make($decoded, [
            'business_summary' => ['required', 'string', 'max:5000'],
            'business_model_summary' => ['required', 'string', 'max:4000'],
            'primary_audience' => ['required', 'array', 'min:1'],
            'primary_audience.*' => ['required', 'string', 'max:500'],
            'website_goal' => ['required', 'string', 'max:2000'],
            'primary_conversion' => ['required', 'string', 'max:1000'],
            'recommended_tier' => ['required', 'in:starter,business,custom'],
            'recommendation_rationale' => ['required', 'array', 'min:1'],
            'recommendation_rationale.*' => ['required', 'string', 'max:1000'],
            'offer_matrix' => ['required', 'array', 'min:1'],
            'offer_matrix.*.name' => ['required', 'string', 'max:300'],
            'offer_matrix.*.details' => ['required', 'string', 'max:1500'],
            'offer_matrix.*.pricing' => ['required', 'string', 'max:500'],
            'offer_matrix.*.source' => ['required', 'string', 'max:1000'],
            'offer_matrix.*.evidence_status' => ['required', 'in:VERIFIED,CLIENT-PROVIDED-UNVERIFIED,DEMO-ONLY,ASSUMPTION,MISSING,CONFLICT'],
            'customer_question_map' => ['required', 'array', 'min:1'],
            'customer_question_map.*.question' => ['required', 'string', 'max:1000'],
            'customer_question_map.*.answer_or_gap' => ['required', 'string', 'max:1500'],
            'customer_question_map.*.stage' => ['required', 'in:BEFORE_PURCHASE,DURING_PURCHASE,AFTER_PURCHASE'],
            'customer_question_map.*.answer_status' => ['required', 'in:ANSWERED,GAP,NOT_APPLICABLE'],
            'customer_question_map.*.milestone_priority' => ['required', 'in:PREVIEW_BLOCKER,PRODUCTION_BLOCKER,OPTIONAL_GAP'],
            'customer_question_map.*.source' => ['required', 'string', 'max:1000'],
            'customer_question_map.*.owner_or_action' => ['required', 'string', 'max:500'],
            'fact_register' => ['required', 'array', 'min:1'],
            'fact_register.*.fact' => ['required', 'string', 'max:1000'],
            'fact_register.*.source' => ['required', 'string', 'max:1000'],
            'fact_register.*.evidence_status' => ['required', 'in:VERIFIED,CLIENT-PROVIDED-UNVERIFIED,DEMO-ONLY,ASSUMPTION,MISSING,CONFLICT'],
            'fact_register.*.publication_status' => ['required', 'in:APPROVED,PENDING,NOT_APPROVED'],
            'fact_register.*.notes' => ['required', 'string', 'max:1000'],
            'cta_register' => ['required', 'array', 'min:1'],
            'cta_register.*.action' => ['required', 'string', 'max:300'],
            'cta_register.*.destination' => ['required', 'string', 'max:1000'],
            'cta_register.*.destination_status' => ['required', 'in:APPROVED_REAL_DESTINATION,NOT_CONFIGURED,NEEDS_APPROVAL,DEMO_ONLY'],
            'cta_register.*.expected_behavior' => ['required', 'string', 'max:1000'],
            'asset_register' => ['present', 'array'],
            'asset_register.*.asset_or_need' => ['required', 'string', 'max:500'],
            'asset_register.*.source_or_owner' => ['required', 'string', 'max:1000'],
            'asset_register.*.permission_status' => ['required', 'in:APPROVED,PENDING,NOT_APPROVED,NOT_APPLICABLE'],
            'asset_register.*.permission_evidence_status' => ['required', 'in:VERIFIED,CLIENT-PROVIDED-UNVERIFIED,DEMO-ONLY,ASSUMPTION,MISSING,CONFLICT'],
            'asset_register.*.consent_status' => ['required', 'in:CONFIRMED,PENDING,NOT_APPROVED,NOT_APPLICABLE'],
            'asset_register.*.intended_use' => ['required', 'string', 'max:500'],
            'asset_register.*.credit_or_restrictions' => ['required', 'string', 'max:1000'],
            'buying_journey' => ['required', 'array', 'min:1'],
            'buying_journey.*.stage' => ['required', 'in:BEFORE_PURCHASE,DURING_PURCHASE,AFTER_PURCHASE'],
            'buying_journey.*.customer_need' => ['required', 'string', 'max:1000'],
            'buying_journey.*.website_support' => ['required', 'string', 'max:1000'],
            'trust_register' => ['required', 'array'],
            'trust_register.*.proof' => ['required', 'string', 'max:1000'],
            'trust_register.*.source' => ['required', 'string', 'max:1000'],
            'trust_register.*.evidence_status' => ['required', 'in:VERIFIED,CLIENT-PROVIDED-UNVERIFIED,DEMO-ONLY,ASSUMPTION,MISSING,CONFLICT'],
            'trust_register.*.publication_status' => ['required', 'in:APPROVED,PENDING,NOT_APPROVED'],
            'content_gaps' => ['required', 'array'],
            'content_gaps.*.gap' => ['required', 'string', 'max:1000'],
            'content_gaps.*.owner_or_source' => ['required', 'string', 'max:500'],
            'content_gaps.*.milestone_priority' => ['required', 'in:PREVIEW_BLOCKER,PRODUCTION_BLOCKER,OPTIONAL_GAP'],
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
                'result_json' => 'The JSON is valid, but its structure is incomplete. Include field-level facts and sources, asset permissions, CTA destinations, customer-question statuses, offer matrix, buying journey, trust register and content gaps.',
            ]);
        }

        $discoveryRun->update([
            'result' => $validator->validated(),
            'status' => DiscoveryRunStatus::Completed,
            'started_at' => $discoveryRun->started_at ?? now(),
            'completed_at' => now(),
            'failure_reason' => null,
        ]);

        return to_route('projects.discovery.show', $project)->with('success', 'Discovery brief saved successfully.');
    }

    private function authorizeStudio(Request $request): void
    {
        abort_unless($request->user()?->isStudioStaff(), 403);
    }

    /** @param array<string, mixed> $inputSnapshot */
    private function buildPrompt(array $inputSnapshot): string
    {
        $input = json_encode($inputSnapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE) ?: '{}';

        return <<<PROMPT
You are the Business Discovery Strategist for a professional website studio.

MISSION
Understand the business and its customers before deciding what the website should contain. The goal is a complete, useful customer journey—not a generic attractive landing page.

RULES
- Use only information supported by the submitted intake. Never invent facts, prices, inclusions, policies, credentials, testimonials, reviews, ratings, awards, customer counts, performance metrics, customer stories, results or guarantees — including for portfolio/demo work.
- Label factual support with one evidence status: VERIFIED, CLIENT-PROVIDED-UNVERIFIED, DEMO-ONLY, ASSUMPTION, MISSING or CONFLICT. Keep publication status separately as APPROVED, PENDING or NOT_APPROVED.
- For every fact, record its exact intake field, supplied URL/document, or other traceable source. If no source exists, write MISSING and do not publish the claim.
- Record fact publication status separately from evidence status. Use APPROVED, PENDING or NOT_APPROVED; do not assume that a client-provided fact is approved for publication.
- Record each supplied/proposed asset's permission_status (APPROVED, PENDING, NOT_APPROVED, NOT_APPLICABLE), permission_evidence_status (VERIFIED, CLIENT-PROVIDED-UNVERIFIED, DEMO-ONLY, ASSUMPTION, MISSING, CONFLICT), people-consent status (CONFIRMED, PENDING, NOT_APPROVED, NOT_APPLICABLE), intended use, credit and restrictions. Unknown rights remain permission_status PENDING and evidence MISSING; never infer commercial permission.
- Record every CTA with its exact destination, destination approval status and what actually happens after the visitor clicks. If no real destination is supplied, use NOT_CONFIGURED; do not invent a contact endpoint or imply a working submission.
- Do not treat a missing answer as permission to guess. Record the gap and its owner/source.
- Identify customer questions before proposing sections. Use uppercase journey stages BEFORE_PURCHASE, DURING_PURCHASE or AFTER_PURCHASE; answer_status ANSWERED, GAP or NOT_APPLICABLE; and milestone_priority PREVIEW_BLOCKER, PRODUCTION_BLOCKER or OPTIONAL_GAP. Include source and owner/action.
- Recommend Starter, Business or Custom based on business complexity and visitor tasks, not visual preference or page count alone. Starter is the only active implementation priority until its acceptance gate passes.
- Starter means a complete one-page business presence; Business means deeper multi-page information architecture; Custom means bespoke workflows/data/integrations that need a real business reason.
- Every proposed section must answer a customer question or support a defined business action.
- Return one valid JSON object only. No Markdown fences or prose outside JSON.

SUBMITTED INTAKE
{$input}

REQUIRED JSON SHAPE
{
  "business_summary": "Concise public-facing business summary",
  "business_model_summary": "What is sold, to whom, where, how customers buy and how the business delivers",
  "primary_audience": ["Audience segment and intent"],
  "website_goal": "Primary business outcome",
  "primary_conversion": "Primary visitor action and destination status",
  "recommended_tier": "starter|business|custom",
  "recommendation_rationale": ["Evidence-based reasons and scope boundary"],
  "offer_matrix": [
    {"name":"Offer name","details":"Variants, inclusions, exclusions and best-fit customer; unknowns stay explicit","pricing":"Verified price or pricing method, otherwise Not provided","source":"Exact intake field or supplied source; otherwise MISSING","evidence_status":"VERIFIED|CLIENT-PROVIDED-UNVERIFIED|DEMO-ONLY|ASSUMPTION|MISSING|CONFLICT"}
  ],
  "customer_question_map": [
    {"question":"Real visitor question","answer_or_gap":"Supported answer or explicit gap","stage":"BEFORE_PURCHASE|DURING_PURCHASE|AFTER_PURCHASE","answer_status":"ANSWERED|GAP|NOT_APPLICABLE","source":"Intake field or evidence; otherwise MISSING","owner_or_action":"Client/studio action or N/A reason","milestone_priority":"PREVIEW_BLOCKER|PRODUCTION_BLOCKER|OPTIONAL_GAP"}
  ],
  "fact_register": [
    {"fact":"One material business fact","source":"Exact intake field, URL or document; otherwise MISSING","evidence_status":"VERIFIED|CLIENT-PROVIDED-UNVERIFIED|DEMO-ONLY|ASSUMPTION|MISSING|CONFLICT","publication_status":"APPROVED|PENDING|NOT_APPROVED","notes":"Limitations or approval needed; write None only when genuinely none"}
  ],
  "cta_register": [
    {"action":"CTA label and intent","destination":"Exact URL/number/anchor or NOT_CONFIGURED","destination_status":"APPROVED_REAL_DESTINATION|NOT_CONFIGURED|NEEDS_APPROVAL|DEMO_ONLY","expected_behavior":"What actually happens after click, including limitations"}
  ],
  "asset_register": [
    {"asset_or_need":"Asset name or needed visual","source_or_owner":"Client, URL, studio-created or unknown","permission_status":"APPROVED|PENDING|NOT_APPROVED|NOT_APPLICABLE","permission_evidence_status":"VERIFIED|CLIENT-PROVIDED-UNVERIFIED|DEMO-ONLY|ASSUMPTION|MISSING|CONFLICT","consent_status":"CONFIRMED|PENDING|NOT_APPROVED|NOT_APPLICABLE","intended_use":"Where/how it will appear","credit_or_restrictions":"Required credit, license or restrictions; otherwise None"}
  ],
  "buying_journey": [
    {"stage":"BEFORE_PURCHASE|DURING_PURCHASE|AFTER_PURCHASE","customer_need":"What the customer needs at this stage","website_support":"Content or action the website should provide"}
  ],
  "trust_register": [
    {"proof":"Genuine evidence or transparent non-proof alternative","source":"Exact source or MISSING","evidence_status":"VERIFIED|CLIENT-PROVIDED-UNVERIFIED|DEMO-ONLY|ASSUMPTION|MISSING|CONFLICT","publication_status":"APPROVED|PENDING|NOT_APPROVED"}
  ],
  "content_gaps": [
    {"gap":"Missing information/evidence","owner_or_source":"Client, studio research, or not known","milestone_priority":"PREVIEW_BLOCKER|PRODUCTION_BLOCKER|OPTIONAL_GAP"}
  ],
  "sections": [
    {"key":"section-key","purpose":"Why it exists","visitor_question":"Question answered","draft_message":"Concise content direction"}
  ],
  "missing_information": ["Critical missing facts"],
  "claims_requiring_approval": ["Claims needing client approval"],
  "scope_risks": ["Dependencies, unsupported functionality or delivery risks"],
  "next_step": "One practical next action"
}

All fields are required. Empty arrays are allowed for asset_register, trust_register, content_gaps, missing_information, claims_requiring_approval and scope_risks only when there are genuinely no entries. Offer matrix, customer question map, fact register, CTA register, buying journey and sections must contain at least one useful item. Use explicit MISSING / NOT_CONFIGURED states instead of omitting unknown sources or destinations.
PROMPT;
    }
}
