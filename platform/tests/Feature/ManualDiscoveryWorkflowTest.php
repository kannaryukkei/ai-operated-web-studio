<?php

namespace Tests\Feature;

use App\Enums\DiscoveryRunStatus;
use App\Enums\UserRole;
use App\Models\ClientAccount;
use App\Models\DiscoveryRun;
use App\Models\Project;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ManualDiscoveryWorkflowTest extends TestCase
{
    use RefreshDatabase;

    public function test_studio_can_start_discovery_from_a_submitted_intake_snapshot(): void
    {
        $studio = $this->createUser(UserRole::StudioOwner);
        $project = $this->createProject($studio);
        $this->createSubmittedIntake($project);

        $response = $this->actingAs($studio)->post(route('projects.discovery.start', $project));
        $response->assertRedirect(route('projects.discovery.show', $project));

        $run = DiscoveryRun::query()->sole();
        $this->assertSame(DiscoveryRunStatus::Processing, $run->status);
        $this->assertSame(1, $run->intake_version);
        $this->assertSame('A local car detailing business.', $run->input_snapshot['business_overview']);
        $this->assertNotNull($run->started_at);
    }

    public function test_studio_can_open_business_first_discovery_prompt_without_an_api_key(): void
    {
        $studio = $this->createUser(UserRole::StudioOwner);
        $project = $this->createProject($studio);
        $this->createSubmittedIntake($project);

        $this->actingAs($studio)->post(route('projects.discovery.start', $project));
        $this->actingAs($studio)->get(route('projects.discovery.show', $project))
            ->assertOk()
            ->assertInertia(fn ($page) => $page
                ->component('projects/discovery')
                ->where('hasSubmittedIntake', true)
                ->where('run.status', 'processing')
                ->has('prompt')
                ->where('prompt', fn ($prompt) => str_contains($prompt, 'offer_matrix') && str_contains($prompt, 'customer_question_map') && str_contains($prompt, 'buying_journey')));
    }

    public function test_client_cannot_access_or_start_studio_discovery(): void
    {
        $studio = $this->createUser(UserRole::StudioOwner);
        $client = $this->createUser(UserRole::Client);
        $project = $this->createProject($studio);
        $this->createSubmittedIntake($project);

        $this->actingAs($client)->get(route('projects.discovery.show', $project))->assertForbidden();
        $this->actingAs($client)->post(route('projects.discovery.start', $project))->assertForbidden();
        $this->assertDatabaseCount('discovery_runs', 0);
    }

    public function test_discovery_cannot_start_without_a_submitted_intake(): void
    {
        $studio = $this->createUser(UserRole::StudioOwner);
        $project = $this->createProject($studio);

        $this->actingAs($studio)->from(route('projects.discovery.show', $project))
            ->post(route('projects.discovery.start', $project))->assertSessionHasErrors('intake');
        $this->assertDatabaseCount('discovery_runs', 0);
    }

    public function test_studio_can_validate_and_save_business_first_discovery_result(): void
    {
        $studio = $this->createUser(UserRole::StudioOwner);
        $project = $this->createProject($studio);
        $this->createSubmittedIntake($project);

        $this->actingAs($studio)->post(route('projects.discovery.start', $project));
        $run = DiscoveryRun::query()->sole();

        $this->actingAs($studio)->post(route('projects.discovery.complete', [$project, $run]), [
            'result_json' => json_encode($this->validResult(), JSON_THROW_ON_ERROR),
        ])->assertRedirect(route('projects.discovery.show', $project));

        $run->refresh();
        $this->assertSame(DiscoveryRunStatus::Completed, $run->status);
        $this->assertSame('starter', $run->result['recommended_tier']);
        $this->assertSame('A customer compares service options.', $run->result['customer_question_map'][0]['question']);
        $this->assertNotNull($run->completed_at);
    }

    public function test_incomplete_business_intelligence_output_is_rejected(): void
    {
        $studio = $this->createUser(UserRole::StudioOwner);
        $project = $this->createProject($studio);
        $this->createSubmittedIntake($project);

        $this->actingAs($studio)->post(route('projects.discovery.start', $project));
        $run = DiscoveryRun::query()->sole();
        $incomplete = $this->validResult();
        unset($incomplete['offer_matrix']);

        $this->actingAs($studio)->from(route('projects.discovery.show', $project))
            ->post(route('projects.discovery.complete', [$project, $run]), [
                'result_json' => json_encode($incomplete, JSON_THROW_ON_ERROR),
            ])->assertSessionHasErrors('result_json');

        $this->assertSame(DiscoveryRunStatus::Processing, $run->fresh()->status);
    }

    public function test_a_discovery_run_cannot_be_completed_through_another_project(): void
    {
        $studio = $this->createUser(UserRole::StudioOwner);
        $firstProject = $this->createProject($studio, 'First project');
        $secondProject = $this->createProject($studio, 'Second project');
        $this->createSubmittedIntake($firstProject);

        $this->actingAs($studio)->post(route('projects.discovery.start', $firstProject));
        $run = DiscoveryRun::query()->sole();

        $this->actingAs($studio)->post(route('projects.discovery.complete', [$secondProject, $run]), [
            'result_json' => json_encode($this->validResult(), JSON_THROW_ON_ERROR),
        ])->assertNotFound();

        $this->assertSame(DiscoveryRunStatus::Processing, $run->fresh()->status);
    }

    private function createUser(UserRole $role): User
    {
        $user = User::factory()->create();
        $user->forceFill(['role' => $role])->save();

        return $user->refresh();
    }

    private function createProject(User $creator, string $name = 'Discovery project'): Project
    {
        $account = ClientAccount::create([
            'business_name' => 'Discovery Client '.$creator->getKey().'-'.$name,
            'slug' => 'discovery-client-'.$creator->getKey().'-'.strtolower(str_replace(' ', '-', $name)),
        ]);
        $project = new Project([
            'client_account_id' => $account->getKey(),
            'product_tier' => 'starter',
            'status' => 'onboarding',
            'name' => $name,
        ]);
        $project->created_by = $creator->getKey();
        $project->save();

        return $project;
    }

    private function createSubmittedIntake(Project $project): void
    {
        $project->intakes()->create([
            'version' => 1,
            'status' => 'submitted',
            'payload' => [
                'business_overview' => 'A local car detailing business.',
                'target_audience' => 'Local vehicle owners.',
                'products_services' => 'Car wash and detailing.',
                'offer_details' => 'Several packages with different scopes.',
                'customer_questions' => 'Which package should I choose?',
                'customer_objections' => 'How much does it cost?',
                'purchase_process' => 'Contact by WhatsApp, confirm scope, schedule service.',
                'operational_policies' => 'Service area and preparation requirements.',
                'trust_evidence' => 'Verified portfolio photos.',
                'website_goal' => 'Generate qualified inquiries.',
                'primary_conversion' => 'Contact the business.',
            ],
        ]);
    }

    /** @return array<string, mixed> */
    private function validResult(): array
    {
        return [
            'business_summary' => 'A local car detailing business serving vehicle owners.',
            'business_model_summary' => 'The business sells detailing packages to local vehicle owners through direct inquiry and scheduled service.',
            'primary_audience' => ['Local vehicle owners'],
            'website_goal' => 'Generate qualified inquiries.',
            'primary_conversion' => 'Contact the business.',
            'recommended_tier' => 'starter',
            'recommendation_rationale' => ['A focused local service journey fits a comprehensive one-page site.'],
            'offer_matrix' => [
                ['name' => 'Detailing packages', 'details' => 'Options and scope must be confirmed against the approved catalog.', 'pricing' => 'Not provided', 'evidence_status' => 'CLIENT-PROVIDED-UNVERIFIED'],
            ],
            'customer_question_map' => [
                ['question' => 'A customer compares service options.', 'answer_or_gap' => 'Explain verified package differences; confirm missing details.', 'stage' => 'before_purchase'],
            ],
            'buying_journey' => [
                ['stage' => 'Evaluation', 'customer_need' => 'Understand the right package.', 'website_support' => 'Provide clear package scope and a guided inquiry path.'],
            ],
            'trust_register' => [
                ['proof' => 'Portfolio evidence', 'status' => 'MISSING'],
            ],
            'content_gaps' => [
                ['gap' => 'Approved current package prices', 'owner_or_source' => 'Client'],
            ],
            'sections' => [
                ['key' => 'hero', 'purpose' => 'Explain the core service.', 'visitor_question' => 'What does this business offer?', 'draft_message' => 'Professional vehicle detailing for local owners.'],
            ],
            'missing_information' => [],
            'claims_requiring_approval' => [],
            'scope_risks' => [],
            'next_step' => 'Review the draft with the client.',
        ];
    }
}
