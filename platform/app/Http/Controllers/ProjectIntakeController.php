<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\ProjectIntake;
use App\Services\Intake\ProjectIntakeSchema;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;

class ProjectIntakeController extends Controller
{
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
                'schemaVersion' => $intake?->schema_version ?? ProjectIntakeSchema::CURRENT_VERSION,
                'status' => $intake?->status,
                'payload' => $intake ? $intake->payload : [],
                'submittedAt' => $submittedAt instanceof Carbon ? $submittedAt->toISOString() : null,
            ],
        ]);
    }

    public function save(Request $request, Project $project, ProjectIntakeSchema $schema): RedirectResponse
    {
        Gate::authorize('manageInternalIntake', $project);

        $draft = $this->currentDraft($project);
        $schemaVersion = $this->resolveSchemaVersion($request, $schema, $draft);
        $validated = $request->validate($schema->rules($schemaVersion));

        DB::transaction(function () use ($project, $validated, $schemaVersion): void {
            $lockedProject = Project::query()->whereKey($project->getKey())->lockForUpdate()->firstOrFail();
            $intake = $this->currentDraft($lockedProject);

            if (! $intake) {
                $intake = new ProjectIntake([
                    'project_id' => $lockedProject->getKey(),
                    'version' => ((int) $lockedProject->intakes()->max('version')) + 1,
                    'schema_version' => $schemaVersion,
                    'status' => 'draft',
                ]);
            } elseif ($intake->schema_version !== $schemaVersion) {
                throw ValidationException::withMessages([
                    'schema_version' => 'This draft uses a different schema version. Reload the intake before saving.',
                ]);
            }

            $intake->payload = $validated['payload'];
            $intake->save();
        });

        return back()->with('success', 'Internal intake snapshot saved.');
    }

    public function submit(
        Request $request,
        Project $project,
        ProjectIntakeSchema $schema,
    ): RedirectResponse {
        Gate::authorize('manageInternalIntake', $project);

        $draft = $this->currentDraft($project);
        $schemaVersion = $this->resolveSchemaVersion($request, $schema, $draft);
        $validated = $request->validate($schema->rules($schemaVersion, true));

        DB::transaction(function () use ($project, $request, $validated, $schemaVersion): void {
            $lockedProject = Project::query()->whereKey($project->getKey())->lockForUpdate()->firstOrFail();
            $intake = $this->currentDraft($lockedProject);

            if (! $intake) {
                $intake = new ProjectIntake([
                    'project_id' => $lockedProject->getKey(),
                    'version' => ((int) $lockedProject->intakes()->max('version')) + 1,
                    'schema_version' => $schemaVersion,
                    'status' => 'draft',
                ]);
            } elseif ($intake->schema_version !== $schemaVersion) {
                throw ValidationException::withMessages([
                    'schema_version' => 'This draft uses a different schema version. Reload the intake before submitting.',
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

    private function resolveSchemaVersion(
        Request $request,
        ProjectIntakeSchema $schema,
        ?ProjectIntake $draft,
    ): int {
        $versionInput = $request->validate([
            'schema_version' => ['sometimes', 'required', 'integer', Rule::in($schema->supportedVersions())],
        ]);

        $schemaVersion = (int) (
            $versionInput['schema_version']
            ?? $draft?->schema_version
            ?? ProjectIntakeSchema::CURRENT_VERSION
        );

        if ($draft !== null && $schemaVersion !== $draft->schema_version) {
            throw ValidationException::withMessages([
                'schema_version' => 'A draft keeps the schema version it was created with.',
            ]);
        }

        return $schemaVersion;
    }
}
