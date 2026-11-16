<?php

namespace Tests\Feature;

use App\Actions\Discovery\CompleteDiscoveryRun;
use App\Enums\DiscoveryRunStatus;
use App\Enums\UserRole;
use App\Models\ClientAccount;
use App\Models\DiscoveryRun;
use App\Models\Project;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Tests\TestCase;

class ManualDiscoveryWorkflowTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        $this->withoutVite();
    }

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
                ->where('prompt', fn ($prompt) => str_contains($prompt, 'offer_matrix')
                    && str_contains($prompt, 'customer_question_map')
                    && str_contains($prompt, 'buying_journey')
                    && str_contains($prompt, 'fact_register')
                    && str_contains($prompt, 'publication_status')
                    && str_contains($prompt, 'permission_evidence_status')
                    && str_contains($prompt, 'consent_status')
                    && str_contains($prompt, 'answer_status')
                    && str_contains($prompt, 'PREVIEW_BLOCKER')
                    && str_contains($prompt, 'NOT_CONFIGURED')
                    && str_contains($prompt, 'including for portfolio/demo work')));
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
        $this->assertSame('APPROVED', $run->result['fact_register'][0]['publication_status']);
        $this->assertSame('APPROVED_REAL_DESTINATION', $run->result['cta_register'][0]['destination_status']);
        $this->assertSame('APPROVED', $run->result['asset_register'][0]['permission_status']);
        $this->assertSame('ANSWERED', $run->result['customer_question_map'][0]['answer_status']);
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

        $run->refresh();
        $this->assertSame(DiscoveryRunStatus::Processing, $run->status);
        $this->assertNull($run->result);
        $this->assertNull($run->completed_at);
    }

    public function test_discovery_rejects_results_without_fact_and_cta_provenance(): void
    {
        $studio = $this->createUser(UserRole::StudioOwner);
        $project = $this->createProject($studio);
        $this->createSubmittedIntake($project);

        $this->actingAs($studio)->post(route('projects.discovery.start', $project));
        $run = DiscoveryRun::query()->sole();
        $incomplete = $this->validResult();
        unset($incomplete['fact_register'], $incomplete['cta_register']);

        $this->actingAs($studio)->from(route('projects.discovery.show', $project))
            ->post(route('projects.discovery.complete', [$project, $run]), [
                'result_json' => json_encode($incomplete, JSON_THROW_ON_ERROR),
            ])->assertSessionHasErrors('result_json');

        $this->assertSame(DiscoveryRunStatus::Processing, $run->fresh()->status);
    }

    public function test_discovery_rejects_legacy_mixed_evidence_and_publication_status_values(): void
    {
        $studio = $this->createUser(UserRole::StudioOwner);
        $project = $this->createProject($studio);
        $this->createSubmittedIntake($project);

        $this->actingAs($studio)->post(route('projects.discovery.start', $project));
        $run = DiscoveryRun::query()->sole();
        $legacyResult = $this->validResult();
        $legacyResult['fact_register'][0]['evidence_status'] = 'APPROVED-FOR-PUBLICATION';
        $legacyResult['fact_register'][0]['publication_status'] = 'NEEDS_CLIENT_APPROVAL';

        $this->actingAs($studio)->from(route('projects.discovery.show', $project))
            ->post(route('projects.discovery.complete', [$project, $run]), [
                'result_json' => json_encode($legacyResult, JSON_THROW_ON_ERROR),
            ])->assertSessionHasErrors('result_json');

        $this->assertSame(DiscoveryRunStatus::Processing, $run->fresh()->status);
    }

    public function test_discovery_rejects_unverified_rights_as_an_asset_permission_decision(): void
    {
        $studio = $this->createUser(UserRole::StudioOwner);
        $project = $this->createProject($studio);
        $this->createSubmittedIntake($project);

        $this->actingAs($studio)->post(route('projects.discovery.start', $project));
        $run = DiscoveryRun::query()->sole();
        $legacyResult = $this->validResult();
        $legacyResult['asset_register'][0]['permission_status'] = 'CLIENT_PROVIDED_UNVERIFIED';

        $this->actingAs($studio)->from(route('projects.discovery.show', $project))
            ->post(route('projects.discovery.complete', [$project, $run]), [
                'result_json' => json_encode($legacyResult, JSON_THROW_ON_ERROR),
            ])->assertSessionHasErrors('result_json');

        $this->assertSame(DiscoveryRunStatus::Processing, $run->fresh()->status);
    }

    public function test_discovery_rejects_lowercase_legacy_customer_journey_values(): void
    {
        $studio = $this->createUser(UserRole::StudioOwner);
        $project = $this->createProject($studio);
        $this->createSubmittedIntake($project);

        $this->actingAs($studio)->post(route('projects.discovery.start', $project));
        $run = DiscoveryRun::query()->sole();
        $legacyResult = $this->validResult();
        $legacyResult['customer_question_map'][0]['stage'] = 'before_purchase';

        $this->actingAs($studio)->from(route('projects.discovery.show', $project))
            ->post(route('projects.discovery.complete', [$project, $run]), [
                'result_json' => json_encode($legacyResult, JSON_THROW_ON_ERROR),
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

    public function test_a_completed_run_cannot_be_overwritten_by_a_repeated_completion_action(): void
    {
        $studio = $this->createUser(UserRole::StudioOwner);
        $project = $this->createProject($studio);
        $this->createSubmittedIntake($project);

        $this->actingAs($studio)->post(route('projects.discovery.start', $project));
        $run = DiscoveryRun::query()->sole();
        $originalResult = ['recommended_tier' => 'business'];
        $completedAt = now()->subMinute();
        $run->update([
            'result' => $originalResult,
            'status' => DiscoveryRunStatus::Completed,
            'completed_at' => $completedAt,
        ]);

        try {
            app(CompleteDiscoveryRun::class)->handle(
                $project,
                $run,
                json_encode($this->validResult(), JSON_THROW_ON_ERROR),
            );
            $this->fail('A completed run must not accept another completion.');
        } catch (ValidationException $exception) {
            $this->assertSame(
                'This discovery run is no longer active. Start a new run to continue.',
                $exception->errors()['result_json'][0],
            );
        }

        $run->refresh();
        $this->assertSame($originalResult, $run->result);
        $this->assertSame(DiscoveryRunStatus::Completed, $run->status);
        $this->assertSame(
            $completedAt->format('Y-m-d H:i:s'),
            $run->completed_at?->format('Y-m-d H:i:s'),
        );
    }

    public function test_completion_action_rechecks_project_ownership(): void
    {
        $studio = $this->createUser(UserRole::StudioOwner);
        $project = $this->createProject($studio, 'Run project');
        $otherProject = $this->createProject($studio, 'Other project');
        $this->createSubmittedIntake($project);

        $this->actingAs($studio)->post(route('projects.discovery.start', $project));
        $run = DiscoveryRun::query()->sole();
        $originalStatus = $run->status;
        $originalResult = $run->result;

        try {
            app(CompleteDiscoveryRun::class)->handle(
                $otherProject,
                $run,
                json_encode($this->validResult(), JSON_THROW_ON_ERROR),
            );
            $this->fail('A run cannot be completed for a different project.');
        } catch (HttpException $exception) {
            $this->assertSame(404, $exception->getStatusCode());
        }

        $run->refresh();
        $this->assertSame($originalStatus, $run->status);
        $this->assertSame($originalResult, $run->result);
        $this->assertNull($run->completed_at);
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
                ['name' => 'Detailing packages', 'details' => 'Options and scope must be confirmed against the approved catalog.', 'pricing' => 'Not provided', 'source' => 'Submitted intake: products_services and offer_details.', 'evidence_status' => 'CLIENT-PROVIDED-UNVERIFIED'],
            ],
            'customer_question_map' => [
                ['question' => 'A customer compares service options.', 'answer_or_gap' => 'Explain verified package differences; confirm missing details.', 'stage' => 'BEFORE_PURCHASE', 'answer_status' => 'ANSWERED', 'milestone_priority' => 'PREVIEW_BLOCKER', 'source' => 'Submitted intake: offer_details and customer_questions.', 'owner_or_action' => 'Studio to verify the current offer matrix with the owner.'],
            ],
            'buying_journey' => [
                ['stage' => 'BEFORE_PURCHASE', 'customer_need' => 'Understand the right package.', 'website_support' => 'Provide clear package scope and a guided inquiry path.'],
            ],
            'trust_register' => [
                ['proof' => 'Portfolio evidence', 'source' => 'No approved portfolio asset provided.', 'evidence_status' => 'MISSING', 'publication_status' => 'PENDING'],
            ],
            'fact_register' => [
                ['fact' => 'The business provides car detailing services.', 'source' => 'Submitted intake: business_overview and products_services.', 'evidence_status' => 'CLIENT-PROVIDED-UNVERIFIED', 'publication_status' => 'APPROVED', 'notes' => 'A separate client publication approval is recorded for this fixture.'],
            ],
            'cta_register' => [
                ['action' => 'Request a consultation', 'destination' => 'https://wa.me/6280000000000', 'destination_status' => 'APPROVED_REAL_DESTINATION', 'expected_behavior' => 'Opens WhatsApp with a prepared consultation message; it does not confirm a booking.'],
            ],
            'asset_register' => [
                ['asset_or_need' => 'Portfolio photos', 'source_or_owner' => 'Client supplied photo folder.', 'permission_status' => 'APPROVED', 'permission_evidence_status' => 'VERIFIED', 'consent_status' => 'CONFIRMED', 'intended_use' => 'Portfolio gallery.', 'credit_or_restrictions' => 'Client confirmed commercial website permission.'],
            ],
            'content_gaps' => [
                ['gap' => 'Approved current package prices', 'owner_or_source' => 'Client', 'milestone_priority' => 'PRODUCTION_BLOCKER'],
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
