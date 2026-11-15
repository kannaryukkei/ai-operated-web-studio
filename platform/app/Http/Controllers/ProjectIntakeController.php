<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\ProjectIntake;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;

class ProjectIntakeController extends Controller
{
    private const FIELDS = [
        'business_overview', 'industry', 'location', 'target_audience',
        'products_services', 'offer_details', 'customer_questions',
        'customer_objections', 'purchase_process', 'operational_policies',
        'trust_evidence', 'aftercare_support', 'differentiators',
        'website_goal', 'primary_conversion', 'public_contact_details',
        'current_website', 'competitor_references', 'brand_direction',
        'required_pages', 'required_features', 'constraints', 'success_metrics',
        'existing_assets', 'asset_permissions', 'content_approver',
    ];

    public function show(Project $project): Response
    {
        Gate::authorize('manageInternalIntake', $project);

        $intake = $project->intakes()
            ->where(fn (Builder $query) => $query->where('status', 'draft'))
            ->latest('version')->first()
            ?? $project->intakes()->latest('version')->first();

        $submittedAt = $intake === null ? null : $intake->getAttribute('submitted_at');

        return Inertia::render('projects/intake', [
            'project' => [
                'id' => $project->getKey(),
                'name' => $project->name,
                'clientName' => $project->clientAccount()->value('business_name'),
            ],
            'intake' => [
                'version' => $intake?->version,
                'status' => $intake?->status,
                'payload' => $intake ? $intake->payload : [],
                'submittedAt' => $submittedAt instanceof Carbon ? $submittedAt->toISOString() : null,
            ],
        ]);
    }

    public function save(Request $request, Project $project): RedirectResponse
    {
        Gate::authorize('manageInternalIntake', $project);
        $validated = $request->validate($this->rules());

        DB::transaction(function () use ($project, $validated): void {
            $lockedProject = Project::query()->whereKey($project->getKey())->lockForUpdate()->firstOrFail();
            $intake = $this->currentDraft($lockedProject);

            if (! $intake) {
                $intake = new ProjectIntake([
                    'project_id' => $lockedProject->getKey(),
                    'version' => ((int) $lockedProject->intakes()->max('version')) + 1,
                    'status' => 'draft',
                ]);
            }

            $intake->payload = $validated['payload'];
            $intake->save();
        });

        return back()->with('success', 'Intake progress saved.');
    }

    public function submit(Request $request, Project $project): RedirectResponse
    {
        Gate::authorize('manageInternalIntake', $project);
        $validated = $request->validate($this->rules(true));

        DB::transaction(function () use ($project, $request, $validated): void {
            $lockedProject = Project::query()->whereKey($project->getKey())->lockForUpdate()->firstOrFail();
            $intake = $this->currentDraft($lockedProject);

            if (! $intake) {
                $intake = new ProjectIntake([
                    'project_id' => $lockedProject->getKey(),
                    'version' => ((int) $lockedProject->intakes()->max('version')) + 1,
                ]);
            }

            $intake->payload = $validated['payload'];
            $intake->status = 'submitted';
            $intake->submitted_by = $request->user()->getKey();
            $intake->submitted_at = now();
            $intake->save();
        });

        return back()->with('success', 'Internal intake snapshot submitted for Studio discovery.');
    }

    private function currentDraft(Project $project): ?ProjectIntake
    {
        return $project->intakes()->where('status', 'draft')->latest('version')->lockForUpdate()->first();
    }

    /** @return array<string, array<int, mixed>> */
    private function rules(bool $forSubmission = false): array
    {
        $required = $forSubmission ? 'required' : 'nullable';

        return [
            'payload' => ['required', 'array:'.implode(',', self::FIELDS)],
            'payload.business_overview' => [$required, 'string', 'max:4000'],
            'payload.industry' => ['nullable', 'string', 'max:160'],
            'payload.location' => ['nullable', 'string', 'max:200'],
            'payload.target_audience' => [$required, 'string', 'max:4000'],
            'payload.products_services' => [$required, 'string', 'max:4000'],
            'payload.offer_details' => ['nullable', 'string', 'max:5000'],
            'payload.customer_questions' => ['nullable', 'string', 'max:4000'],
            'payload.customer_objections' => ['nullable', 'string', 'max:4000'],
            'payload.purchase_process' => ['nullable', 'string', 'max:4000'],
            'payload.operational_policies' => ['nullable', 'string', 'max:4000'],
            'payload.trust_evidence' => ['nullable', 'string', 'max:4000'],
            'payload.aftercare_support' => ['nullable', 'string', 'max:3000'],
            'payload.differentiators' => ['nullable', 'string', 'max:4000'],
            'payload.website_goal' => [$required, 'string', 'max:2000'],
            'payload.primary_conversion' => [$required, 'string', 'max:1000'],
            'payload.public_contact_details' => ['nullable', 'string', 'max:2000'],
            'payload.current_website' => ['nullable', 'url', 'max:255'],
            'payload.competitor_references' => ['nullable', 'string', 'max:4000'],
            'payload.brand_direction' => ['nullable', 'string', 'max:4000'],
            'payload.required_pages' => ['nullable', 'string', 'max:3000'],
            'payload.required_features' => ['nullable', 'string', 'max:3000'],
            'payload.constraints' => ['nullable', 'string', 'max:4000'],
            'payload.success_metrics' => ['nullable', 'string', 'max:2000'],
            'payload.existing_assets' => ['nullable', 'string', 'max:5000'],
            'payload.asset_permissions' => ['nullable', 'string', 'max:4000'],
            'payload.content_approver' => ['nullable', 'string', 'max:500'],
        ];
    }
}
