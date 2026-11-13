<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\ProjectIntake;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Carbon;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;

class ProjectIntakeController extends Controller
{
    private const FIELDS = [
        'business_overview',
        'industry',
        'location',
        'target_audience',
        'products_services',
        'differentiators',
        'website_goal',
        'primary_conversion',
        'current_website',
        'competitor_references',
        'brand_direction',
        'required_pages',
        'required_features',
        'constraints',
        'success_metrics',
    ];

    public function show(Project $project): Response
    {
        Gate::authorize('view', $project);

        $intake = $project->intakes()
            ->where(fn (Builder $query) => $query->where('status', 'draft'))
            ->latest('version')
            ->first()
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
            'canEdit' => Gate::allows('update', $project),
        ]);
    }

    public function save(Request $request, Project $project): RedirectResponse
    {
        Gate::authorize('update', $project);

        $validated = $request->validate($this->rules());

        DB::transaction(function () use ($project, $validated): void {
            /** @var Project $lockedProject */
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
        Gate::authorize('update', $project);

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

        return back()->with('success', 'Business intake submitted for studio review.');
    }

    private function currentDraft(Project $project): ?ProjectIntake
    {
        return $project->intakes()
            ->where('status', 'draft')
            ->latest('version')
            ->lockForUpdate()
            ->first();
    }

    /**
     * @return array<string, mixed>
     */
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
            'payload.differentiators' => ['nullable', 'string', 'max:4000'],
            'payload.website_goal' => [$required, 'string', 'max:2000'],
            'payload.primary_conversion' => [$required, 'string', 'max:1000'],
            'payload.current_website' => ['nullable', 'url', 'max:255'],
            'payload.competitor_references' => ['nullable', 'string', 'max:4000'],
            'payload.brand_direction' => ['nullable', 'string', 'max:4000'],
            'payload.required_pages' => ['nullable', 'string', 'max:3000'],
            'payload.required_features' => ['nullable', 'string', 'max:3000'],
            'payload.constraints' => ['nullable', 'string', 'max:4000'],
            'payload.success_metrics' => ['nullable', 'string', 'max:2000'],
        ];
    }
}
