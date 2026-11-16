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

    public function test_studio_staff_can_save_and_resume_an_internal_intake_draft(): void
    {
        $clientOwner = $this->createUser(UserRole::Client);
        $project = $this->createProject($clientOwner);
        $studio = $this->createUser(UserRole::StudioOwner);
        $payload = $this->validPayload();
        $payload['industry'] = 'Professional services';

        $this->actingAs($studio)
            ->patch(route('projects.intake.save', $project), ['payload' => $payload])
            ->assertRedirect();

        $this->assertDatabaseHas('project_intakes', [
            'project_id' => $project->getKey(),
            'version' => 1,
            'schema_version' => 2,
            'status' => 'draft',
        ]);

        $this->get(route('projects.intake.show', $project))->assertOk()
            ->assertInertia(fn ($page) => $page->component('projects/intake')
                ->where('intake.version', 1)
                ->where('intake.schemaVersion', 2)
                ->where('intake.payload.industry', 'Professional services')
                ->where('intake.payload.customer_objections', 'Price is too high.')
                ->where('intake.payload.existing_assets', 'https://example.com/logo-and-gallery')
                ->where('intake.payload.asset_permissions', 'Owner-approved for commercial website use.'));
    }

    public function test_studio_operator_can_manage_the_internal_intake(): void
    {
        $clientOwner = $this->createUser(UserRole::Client);
        $project = $this->createProject($clientOwner);
        $operator = $this->createUser(UserRole::StudioOperator);

        $this->actingAs($operator)
            ->get(route('projects.intake.show', $project))
            ->assertOk()
            ->assertInertia(fn ($page) => $page->component('projects/intake'));

        $this->patch(route('projects.intake.save', $project), [
            'payload' => $this->validPayload(),
        ])->assertRedirect();
    }

    public function test_submitted_intake_is_preserved_and_later_studio_edits_create_a_new_version(): void
    {
        $clientOwner = $this->createUser(UserRole::Client);
        $project = $this->createProject($clientOwner);
        $studio = $this->createUser(UserRole::StudioOwner);

        $this->actingAs($studio)
            ->post(route('projects.intake.submit', $project), ['payload' => $this->validPayload()])
            ->assertRedirect();

        $this->assertDatabaseHas('project_intakes', [
            'project_id' => $project->getKey(),
            'version' => 1,
            'status' => 'submitted',
        ]);

        $updated = $this->validPayload();
        $updated['industry'] = 'Updated industry';

        $this->patch(route('projects.intake.save', $project), ['payload' => $updated])
            ->assertRedirect();

        $this->assertDatabaseHas('project_intakes', [
            'project_id' => $project->getKey(),
            'version' => 1,
            'status' => 'submitted',
        ]);
        $this->assertDatabaseHas('project_intakes', [
            'project_id' => $project->getKey(),
            'version' => 2,
            'status' => 'draft',
        ]);
        $this->assertSame(
            'Updated industry',
            ProjectIntake::query()
                ->where('project_id', $project->getKey())
                ->where('version', 2)
                ->firstOrFail()
                ->payload['industry'],
        );
    }

    public function test_schema_v1_accepts_the_legacy_26_field_payload(): void
    {
        $clientOwner = $this->createUser(UserRole::Client);
        $project = $this->createProject($clientOwner);
        $studio = $this->createUser(UserRole::StudioOwner);

        $this->actingAs($studio)
            ->post(route('projects.intake.submit', $project), [
                'schema_version' => 1,
                'payload' => $this->validPayload(),
            ])
            ->assertRedirect();

        $intake = ProjectIntake::query()->sole();

        $this->assertSame(1, $intake->schema_version);
        $this->assertSame($this->validPayload(), $intake->payload);

        $this->get(route('projects.intake.show', $project))
            ->assertOk()
            ->assertInertia(fn ($page) => $page
                ->where('intake.schemaVersion', 1)
                ->where('intake.payload.business_overview', 'A local professional service business.'));
    }

    public function test_schema_v2_accepts_the_additive_business_model_summary_field(): void
    {
        $clientOwner = $this->createUser(UserRole::Client);
        $project = $this->createProject($clientOwner);
        $studio = $this->createUser(UserRole::StudioOwner);
        $payload = $this->validPayload();
        $payload['business_model_summary'] = 'The business sells service packages to local customers and fulfils booked work.';

        $this->actingAs($studio)
            ->post(route('projects.intake.submit', $project), [
                'schema_version' => 2,
                'payload' => $payload,
            ])
            ->assertRedirect();

        $intake = ProjectIntake::query()->sole();

        $this->assertSame(2, $intake->schema_version);
        $this->assertSame($payload, $intake->payload);
    }

    public function test_schema_v2_validates_the_business_model_summary_length(): void
    {
        $clientOwner = $this->createUser(UserRole::Client);
        $project = $this->createProject($clientOwner);
        $studio = $this->createUser(UserRole::StudioOwner);
        $payload = $this->validPayload();
        $payload['business_model_summary'] = str_repeat('a', 4001);

        $this->actingAs($studio)
            ->from(route('projects.intake.show', $project))
            ->post(route('projects.intake.submit', $project), [
                'schema_version' => 2,
                'payload' => $payload,
            ])
            ->assertSessionHasErrors('payload.business_model_summary');

        $this->assertDatabaseCount('project_intakes', 0);
    }

    public function test_unsupported_intake_schema_versions_are_rejected(): void
    {
        $clientOwner = $this->createUser(UserRole::Client);
        $project = $this->createProject($clientOwner);
        $studio = $this->createUser(UserRole::StudioOwner);

        $this->actingAs($studio)
            ->from(route('projects.intake.show', $project))
            ->post(route('projects.intake.submit', $project), [
                'schema_version' => 3,
                'payload' => $this->validPayload(),
            ])
            ->assertSessionHasErrors('schema_version');

        $this->assertDatabaseCount('project_intakes', 0);
    }

    public function test_existing_drafts_keep_their_schema_version_when_saved_again(): void
    {
        $clientOwner = $this->createUser(UserRole::Client);
        $project = $this->createProject($clientOwner);
        $studio = $this->createUser(UserRole::StudioOwner);
        $legacyPayload = $this->validPayload();

        $this->actingAs($studio)
            ->patch(route('projects.intake.save', $project), [
                'schema_version' => 1,
                'payload' => $legacyPayload,
            ])
            ->assertRedirect();

        $newPayload = $this->validPayload();
        $newPayload['business_model_summary'] = 'New schema content';

        $this->patch(route('projects.intake.save', $project), [
            'schema_version' => 2,
            'payload' => $newPayload,
        ])->assertSessionHasErrors('schema_version');

        $intake = ProjectIntake::query()->sole();
        $this->assertSame(1, $intake->schema_version);
        $this->assertSame($legacyPayload, $intake->payload);
    }

    public function test_existing_intake_rows_default_to_legacy_schema_v1(): void
    {
        $clientOwner = $this->createUser(UserRole::Client);
        $project = $this->createProject($clientOwner);

        $intake = $project->intakes()->create([
            'version' => 1,
            'status' => 'draft',
            'payload' => $this->validPayload(),
        ]);

        $this->assertSame(1, $intake->fresh()->schema_version);
    }

    public function test_submission_requires_exactly_five_core_business_fields(): void
    {
        $clientOwner = $this->createUser(UserRole::Client);
        $project = $this->createProject($clientOwner);
        $studio = $this->createUser(UserRole::StudioOwner);

        $this->actingAs($studio)
            ->post(route('projects.intake.submit', $project), [
                'payload' => ['business_overview' => 'A business'],
            ])
            ->assertSessionHasErrors([
                'payload.target_audience',
                'payload.products_services',
                'payload.website_goal',
                'payload.primary_conversion',
            ]);

        $this->assertDatabaseCount('project_intakes', 0);
    }

    public function test_all_twenty_one_non_core_fields_remain_optional(): void
    {
        $clientOwner = $this->createUser(UserRole::Client);
        $project = $this->createProject($clientOwner);
        $studio = $this->createUser(UserRole::StudioOwner);
        $payload = [
            'business_overview' => 'A business',
            'target_audience' => 'Local customers',
            'products_services' => 'Core services',
            'website_goal' => 'Generate qualified enquiries',
            'primary_conversion' => 'Contact the business',
        ];

        $this->actingAs($studio)
            ->post(route('projects.intake.submit', $project), ['payload' => $payload])
            ->assertRedirect();

        $this->assertDatabaseHas('project_intakes', [
            'project_id' => $project->getKey(),
            'version' => 1,
            'status' => 'submitted',
        ]);
    }

    public function test_client_account_owner_cannot_view_save_or_submit_internal_intake(): void
    {
        $clientOwner = $this->createUser(UserRole::Client);
        $project = $this->createProject($clientOwner);
        $studio = $this->createUser(UserRole::StudioOwner);

        $this->actingAs($studio)->patch(route('projects.intake.save', $project), [
            'payload' => array_merge($this->validPayload(), [
                'business_overview' => 'CONFIDENTIAL INTERNAL SNAPSHOT',
            ]),
        ])->assertRedirect();

        $this->actingAs($clientOwner)
            ->get(route('projects.intake.show', $project))
            ->assertForbidden()
            ->assertDontSee('CONFIDENTIAL INTERNAL SNAPSHOT');

        $this->patch(route('projects.intake.save', $project), [
            'payload' => $this->validPayload(),
        ])->assertForbidden();

        $this->post(route('projects.intake.submit', $project), [
            'payload' => $this->validPayload(),
        ])->assertForbidden();

        $this->assertDatabaseHas('project_intakes', [
            'project_id' => $project->getKey(),
            'status' => 'draft',
        ]);
    }

    public function test_client_account_admin_and_member_cannot_access_internal_intake(): void
    {
        $owner = $this->createUser(UserRole::Client);
        $admin = $this->createUser(UserRole::Client);
        $member = $this->createUser(UserRole::Client);
        $project = $this->createProject($owner);
        $project->clientAccount->users()->attach($admin, ['membership_role' => 'admin']);
        $project->clientAccount->users()->attach($member, ['membership_role' => 'member']);

        foreach ([$admin, $member] as $client) {
            $this->actingAs($client)
                ->get(route('projects.intake.show', $project))
                ->assertForbidden();

            $this->patch(route('projects.intake.save', $project), [
                'payload' => $this->validPayload(),
            ])->assertForbidden();

            $this->post(route('projects.intake.submit', $project), [
                'payload' => $this->validPayload(),
            ])->assertForbidden();
        }
    }

    public function test_client_project_owner_editor_and_viewer_cannot_access_internal_intake(): void
    {
        $accountOwner = $this->createUser(UserRole::Client);
        $project = $this->createProject($accountOwner);
        $projectOwner = $this->createUser(UserRole::Client);
        $projectEditor = $this->createUser(UserRole::Client);
        $projectViewer = $this->createUser(UserRole::Client);

        $project->members()->attach($projectOwner, ['role' => 'owner']);
        $project->members()->attach($projectEditor, ['role' => 'editor']);
        $project->members()->attach($projectViewer, ['role' => 'viewer']);

        foreach ([$projectOwner, $projectEditor, $projectViewer] as $client) {
            $this->actingAs($client)
                ->get(route('projects.intake.show', $project))
                ->assertForbidden();

            $this->patch(route('projects.intake.save', $project), [
                'payload' => $this->validPayload(),
            ])->assertForbidden();

            $this->post(route('projects.intake.submit', $project), [
                'payload' => $this->validPayload(),
            ])->assertForbidden();
        }
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
        $account = ClientAccount::create([
            'business_name' => 'Intake Client '.$client->getKey(),
            'slug' => 'intake-client-'.$client->getKey(),
        ]);
        $account->users()->attach($client, ['membership_role' => 'owner']);

        $studio = $this->createUser(UserRole::StudioOwner);
        $project = new Project([
            'client_account_id' => $account->getKey(),
            'product_tier' => 'starter',
            'status' => 'onboarding',
            'name' => 'Website project',
        ]);
        $project->created_by = $studio->getKey();
        $project->save();

        return $project;
    }
}
