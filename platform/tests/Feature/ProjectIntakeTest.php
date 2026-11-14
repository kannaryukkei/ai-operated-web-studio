<?php

namespace Tests\Feature;

use App\Enums\UserRole;
use App\Models\ClientAccount;
use App\Models\Project;
use App\Models\ProjectIntake;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ProjectIntakeTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->withoutVite();
    }

    public function test_client_owner_can_save_and_resume_an_intake_draft(): void
    {
        $client = $this->createUser(UserRole::Client);
        $project = $this->createProject($client);
        $payload = $this->validPayload();
        $payload['industry'] = 'Professional services';

        $this->actingAs($client)->patch(route('projects.intake.save', $project), ['payload' => $payload])->assertRedirect();
        $this->assertDatabaseHas('project_intakes', ['project_id' => $project->getKey(), 'version' => 1, 'status' => 'draft']);

        $this->get(route('projects.intake.show', $project))->assertOk()
            ->assertInertia(fn ($page) => $page->component('projects/intake')
                ->where('intake.version', 1)
                ->where('intake.payload.industry', 'Professional services')
                ->where('intake.payload.customer_objections', 'Price is too high.')
                ->where('intake.payload.existing_assets', 'https://example.com/logo-and-gallery')
                ->where('intake.payload.asset_permissions', 'Owner-approved for commercial website use.')
                ->where('intake.payload.content_approver', 'Ari — Business owner')
                ->where('canEdit', true));
    }

    public function test_submitted_intake_is_preserved_and_later_edits_create_a_new_version(): void
    {
        $client = $this->createUser(UserRole::Client);
        $project = $this->createProject($client);

        $this->actingAs($client)->post(route('projects.intake.submit', $project), ['payload' => $this->validPayload()])->assertRedirect();
        $this->assertDatabaseHas('project_intakes', ['project_id' => $project->getKey(), 'version' => 1, 'status' => 'submitted']);

        $updated = $this->validPayload();
        $updated['industry'] = 'Updated industry';
        $this->patch(route('projects.intake.save', $project), ['payload' => $updated])->assertRedirect();

        $this->assertDatabaseHas('project_intakes', ['project_id' => $project->getKey(), 'version' => 1, 'status' => 'submitted']);
        $this->assertDatabaseHas('project_intakes', ['project_id' => $project->getKey(), 'version' => 2, 'status' => 'draft']);
        $this->assertSame('Updated industry', ProjectIntake::query()->where('project_id', $project->getKey())->where('version', 2)->firstOrFail()->payload['industry']);
    }

    public function test_submission_requires_core_business_information(): void
    {
        $client = $this->createUser(UserRole::Client);
        $project = $this->createProject($client);

        $this->actingAs($client)->post(route('projects.intake.submit', $project), ['payload' => ['business_overview' => 'A business']])
            ->assertSessionHasErrors(['payload.target_audience', 'payload.products_services', 'payload.website_goal', 'payload.primary_conversion']);
        $this->assertDatabaseCount('project_intakes', 0);
    }

    public function test_client_cannot_view_or_edit_another_accounts_intake(): void
    {
        $clientA = $this->createUser(UserRole::Client);
        $clientB = $this->createUser(UserRole::Client);
        $project = $this->createProject($clientA);

        $this->actingAs($clientB)->get(route('projects.intake.show', $project))->assertForbidden();
        $this->patch(route('projects.intake.save', $project), ['payload' => $this->validPayload()])->assertForbidden();
    }

    public function test_account_member_without_edit_permission_can_view_but_not_change_intake(): void
    {
        $owner = $this->createUser(UserRole::Client);
        $member = $this->createUser(UserRole::Client);
        $project = $this->createProject($owner);
        $project->clientAccount->users()->attach($member, ['membership_role' => 'member']);

        $this->actingAs($member)->get(route('projects.intake.show', $project))->assertOk()
            ->assertInertia(fn ($page) => $page->where('canEdit', false));
        $this->patch(route('projects.intake.save', $project), ['payload' => $this->validPayload()])->assertForbidden();
    }

    /** @return array<string, string> */
    private function validPayload(): array
    {
        return [
            'business_overview' => 'A local professional service business.',
            'industry' => '',
            'location' => '',
            'target_audience' => 'Local customers who need reliable service.',
            'products_services' => 'Core service packages and add-ons.',
            'offer_details' => 'Package inclusions, exclusions and prices.',
            'customer_questions' => 'Which package should I choose?',
            'customer_objections' => 'Price is too high.',
            'purchase_process' => 'Contact, confirm scope, schedule and receive service.',
            'operational_policies' => 'Opening hours and cancellation rules.',
            'trust_evidence' => 'Verified portfolio and customer reviews.',
            'aftercare_support' => 'After-service support where applicable.',
            'differentiators' => '',
            'website_goal' => 'Generate qualified enquiries.',
            'primary_conversion' => 'Request a quote.',
            'public_contact_details' => 'Approved public WhatsApp contact.',
            'current_website' => '',
            'competitor_references' => '',
            'brand_direction' => '',
            'required_pages' => '',
            'required_features' => '',
            'constraints' => '',
            'success_metrics' => '',
            'existing_assets' => 'https://example.com/logo-and-gallery',
            'asset_permissions' => 'Owner-approved for commercial website use.',
            'content_approver' => 'Ari — Business owner',
        ];
    }

    private function createUser(UserRole $role): User
    {
        $user = User::factory()->create();
        $user->forceFill(['role' => $role])->save();

        return $user->refresh();
    }

    private function createProject(User $client): Project
    {
        $account = ClientAccount::create(['business_name' => 'Intake Client '.$client->getKey(), 'slug' => 'intake-client-'.$client->getKey()]);
        $account->users()->attach($client, ['membership_role' => 'owner']);
        $studio = $this->createUser(UserRole::StudioOwner);
        $project = new Project(['client_account_id' => $account->getKey(), 'product_tier' => 'starter', 'status' => 'onboarding', 'name' => 'Website project']);
        $project->created_by = $studio->getKey();
        $project->save();

        return $project;
    }
}
