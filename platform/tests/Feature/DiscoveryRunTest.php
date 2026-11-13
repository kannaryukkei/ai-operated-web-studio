<?php

namespace Tests\Feature;

use App\Actions\Discovery\CreateDiscoveryRun;
use App\Enums\DiscoveryRunStatus;
use App\Enums\UserRole;
use App\Models\ClientAccount;
use App\Models\Project;
use App\Models\ProjectIntake;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Validation\ValidationException;
use Tests\TestCase;

class DiscoveryRunTest extends TestCase
{
    use RefreshDatabase;

    public function test_it_creates_a_discovery_run_from_the_latest_submitted_intake_snapshot(): void
    {
        $studio = $this->createUser(UserRole::StudioOwner);
        $project = $this->createProject($studio);
        $first = $this->createIntake($project, 1, 'submitted', ['business_overview' => 'Original brief']);
        $latest = $this->createIntake($project, 2, 'submitted', ['business_overview' => 'Latest brief']);

        $run = app(CreateDiscoveryRun::class)->handle($project, (int) $studio->getKey());

        $this->assertSame($latest->getKey(), $run->project_intake_id);
        $this->assertSame(2, $run->intake_version);
        $this->assertSame(['business_overview' => 'Latest brief'], $run->input_snapshot);
        $this->assertSame(DiscoveryRunStatus::Queued, $run->status);
        $this->assertSame($studio->getKey(), $run->requested_by);
        $this->assertNotSame($first->getKey(), $run->project_intake_id);
        $this->assertDatabaseCount('discovery_runs', 1);
    }

    public function test_it_rejects_projects_without_a_submitted_intake(): void
    {
        $studio = $this->createUser(UserRole::StudioOwner);
        $project = $this->createProject($studio);
        $this->createIntake($project, 1, 'draft', ['business_overview' => 'Draft only']);

        try {
            app(CreateDiscoveryRun::class)->handle($project, (int) $studio->getKey());
            $this->fail('A discovery run should require a submitted intake.');
        } catch (ValidationException $exception) {
            $this->assertArrayHasKey('intake', $exception->errors());
        }

        $this->assertDatabaseCount('discovery_runs', 0);
    }

    public function test_repeated_requests_return_the_existing_active_run_for_the_same_intake(): void
    {
        $studio = $this->createUser(UserRole::StudioOwner);
        $project = $this->createProject($studio);
        $this->createIntake($project, 1, 'submitted', ['business_overview' => 'Submitted brief']);

        $action = app(CreateDiscoveryRun::class);
        $first = $action->handle($project, (int) $studio->getKey());
        $second = $action->handle($project, (int) $studio->getKey());

        $this->assertSame($first->getKey(), $second->getKey());
        $this->assertDatabaseCount('discovery_runs', 1);
    }

    public function test_a_new_run_can_be_created_after_the_previous_run_finishes(): void
    {
        $studio = $this->createUser(UserRole::StudioOwner);
        $project = $this->createProject($studio);
        $this->createIntake($project, 1, 'submitted', ['business_overview' => 'Submitted brief']);

        $action = app(CreateDiscoveryRun::class);
        $first = $action->handle($project, (int) $studio->getKey());
        $first->update(['status' => DiscoveryRunStatus::Completed]);

        $second = $action->handle($project, (int) $studio->getKey());

        $this->assertNotSame($first->getKey(), $second->getKey());
        $this->assertDatabaseCount('discovery_runs', 2);
    }

    public function test_project_and_intake_expose_their_discovery_run_relationships(): void
    {
        $studio = $this->createUser(UserRole::StudioOwner);
        $project = $this->createProject($studio);
        $intake = $this->createIntake($project, 1, 'submitted', ['business_overview' => 'Submitted brief']);
        $run = app(CreateDiscoveryRun::class)->handle($project, (int) $studio->getKey());

        $this->assertTrue($run->project->is($project));
        $this->assertTrue($run->intake->is($intake));
        $this->assertTrue($run->requester->is($studio));
        $this->assertTrue($project->discoveryRuns()->whereKey($run->getKey())->exists());
        $this->assertTrue($intake->discoveryRuns()->whereKey($run->getKey())->exists());
    }

    private function createUser(UserRole $role): User
    {
        $user = User::factory()->create();
        $user->forceFill(['role' => $role])->save();

        return $user->refresh();
    }

    private function createProject(User $creator): Project
    {
        $account = ClientAccount::create([
            'business_name' => 'Discovery Client '.$creator->getKey(),
            'slug' => 'discovery-client-'.$creator->getKey(),
        ]);

        $project = new Project([
            'client_account_id' => $account->getKey(),
            'product_tier' => 'starter',
            'status' => 'onboarding',
            'name' => 'Discovery project',
        ]);
        $project->created_by = $creator->getKey();
        $project->save();

        return $project;
    }

    /**
     * @param  array<string, mixed>  $payload
     */
    private function createIntake(Project $project, int $version, string $status, array $payload): ProjectIntake
    {
        return $project->intakes()->create([
            'version' => $version,
            'payload' => $payload,
            'status' => $status,
        ]);
    }
}
