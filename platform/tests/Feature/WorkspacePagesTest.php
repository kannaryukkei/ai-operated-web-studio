<?php

namespace Tests\Feature;

use App\Enums\UserRole;
use App\Models\ClientAccount;
use App\Models\Project;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class WorkspacePagesTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        $this->withoutVite();
    }

    public function test_studio_can_open_workspace_pages_and_create_a_client_account(): void
    {
        $studio = $this->createUser(UserRole::StudioOwner);

        $this->actingAs($studio)->get('/dashboard')->assertOk();
        $this->get('/clients')->assertOk();
        $this->get('/projects')->assertOk();

        $this->post('/clients', [
            'business_name' => 'Northstar Studio',
            'business_category' => 'Professional services',
            'contact_email' => 'hello@northstar.example',
        ])->assertRedirect('/clients');

        $this->assertDatabaseHas('client_accounts', [
            'business_name' => 'Northstar Studio',
            'slug' => 'northstar-studio',
            'contact_email' => 'hello@northstar.example',
        ]);
    }

    public function test_studio_can_create_a_project_for_an_existing_client_account(): void
    {
        $studio = $this->createUser(UserRole::StudioOwner);
        $account = ClientAccount::create([
            'business_name' => 'Northstar Studio',
            'slug' => 'northstar-studio',
        ]);

        $this->actingAs($studio)->post('/projects', [
            'client_account_id' => $account->getKey(),
            'product_tier' => 'business',
            'name' => 'Northstar Website',
            'objective' => 'Generate qualified leads',
        ])->assertRedirect('/projects');

        $this->assertDatabaseHas('projects', [
            'client_account_id' => $account->getKey(),
            'created_by' => $studio->getKey(),
            'product_tier' => 'business',
            'name' => 'Northstar Website',
            'status' => 'draft',
            'current_stage' => 'discovery',
        ]);
    }

    public function test_client_can_open_workspace_pages_but_cannot_create_accounts_or_projects(): void
    {
        $client = $this->createUser(UserRole::Client);
        $account = ClientAccount::create([
            'business_name' => 'Client Workspace',
            'slug' => 'client-workspace',
        ]);
        $account->users()->attach($client, ['membership_role' => 'owner']);

        $this->actingAs($client)->get('/dashboard')->assertOk();
        $this->get('/clients')->assertOk();
        $this->get('/projects')->assertOk()
            ->assertInertia(fn ($page) => $page
                ->component('projects/index')
                ->where('isStudio', false));

        $this->post('/clients', ['business_name' => 'Forbidden Account'])->assertForbidden();
        $this->postJson('/api/v1/client-accounts', ['business_name' => 'Forbidden API Account'])
            ->assertForbidden();
        $this->post('/projects', [
            'client_account_id' => $account->getKey(),
            'product_tier' => 'starter',
            'name' => 'Forbidden Project',
        ])->assertForbidden();
    }

    public function test_client_workspace_lists_do_not_expose_another_accounts_projects(): void
    {
        $client = $this->createUser(UserRole::Client);
        $studio = $this->createUser(UserRole::StudioOwner);

        $ownAccount = ClientAccount::create(['business_name' => 'Own Account', 'slug' => 'own-account']);
        $otherAccount = ClientAccount::create(['business_name' => 'Other Account', 'slug' => 'other-account']);
        $ownAccount->users()->attach($client, ['membership_role' => 'owner']);

        $ownProject = $this->createProject($ownAccount, $studio, 'Own Project');
        $this->createProject($otherAccount, $studio, 'Other Project');

        $response = $this->actingAs($client)->get('/projects')->assertOk();

        $response->assertSee('Own Project');
        $response->assertDontSee('Other Project');
        $this->assertSame(1, Project::query()->whereKey($ownProject->getKey())->count());
    }

    public function test_web_client_creation_ignores_custom_slug_and_generates_a_unique_slug(): void
    {
        $studio = $this->createUser(UserRole::StudioOwner);

        ClientAccount::create([
            'business_name' => 'Existing Northstar Studio',
            'slug' => 'northstar-studio',
        ]);

        $this->actingAs($studio)->post('/clients', [
            'business_name' => 'Northstar Studio',
            'slug' => 'custom-northstar',
        ])->assertRedirect('/clients');

        $this->assertDatabaseHas('client_accounts', [
            'business_name' => 'Northstar Studio',
            'slug' => 'northstar-studio-2',
        ]);
        $this->assertDatabaseMissing('client_accounts', [
            'business_name' => 'Northstar Studio',
            'slug' => 'custom-northstar',
        ]);
    }

    public function test_studio_can_create_a_client_account_through_the_api_with_a_generated_slug(): void
    {
        $studio = $this->createUser(UserRole::StudioOwner);

        $response = $this->actingAs($studio)->postJson('/api/v1/client-accounts', [
            'business_name' => 'API Northstar Studio',
            'business_category' => 'Professional services',
        ]);

        $response->assertCreated()
            ->assertJsonPath('data.business_name', 'API Northstar Studio')
            ->assertJsonPath('data.slug', 'api-northstar-studio');

        $this->assertDatabaseHas('client_accounts', [
            'business_name' => 'API Northstar Studio',
            'slug' => 'api-northstar-studio',
        ]);
    }

    public function test_api_client_account_creation_preserves_a_valid_custom_slug(): void
    {
        $studio = $this->createUser(UserRole::StudioOwner);

        $response = $this->actingAs($studio)->postJson('/api/v1/client-accounts', [
            'business_name' => 'Northstar API Client',
            'slug' => 'northstar-custom',
        ]);

        $response->assertCreated()
            ->assertJsonPath('data.slug', 'northstar-custom');

        $this->assertDatabaseHas('client_accounts', [
            'business_name' => 'Northstar API Client',
            'slug' => 'northstar-custom',
        ]);
    }

    public function test_api_client_account_creation_rejects_a_duplicate_custom_slug(): void
    {
        $studio = $this->createUser(UserRole::StudioOwner);

        ClientAccount::create([
            'business_name' => 'Existing Northstar Studio',
            'slug' => 'northstar-custom',
        ]);

        $this->actingAs($studio)->postJson('/api/v1/client-accounts', [
            'business_name' => 'Another Northstar Studio',
            'slug' => 'northstar-custom',
        ])->assertUnprocessable()
            ->assertJsonValidationErrors('slug');
    }

    public function test_web_and_api_client_creation_share_common_validation_rules(): void
    {
        $studio = $this->createUser(UserRole::StudioOwner);

        $this->actingAs($studio)->from('/clients')->post('/clients', [
            'business_name' => 'Northstar Studio',
            'website' => 'not-a-url',
        ])->assertSessionHasErrors('website');

        $this->actingAs($studio)->postJson('/api/v1/client-accounts', [
            'business_name' => 'Northstar Studio',
            'website' => 'not-a-url',
        ])->assertUnprocessable()
            ->assertJsonValidationErrors('website');

        $this->assertDatabaseCount('client_accounts', 0);
    }

    private function createUser(UserRole $role): User
    {
        $user = User::factory()->create();
        $user->forceFill(['role' => $role])->save();

        return $user->refresh();
    }

    private function createProject(ClientAccount $account, User $creator, string $name): Project
    {
        $project = new Project([
            'client_account_id' => $account->getKey(),
            'product_tier' => 'starter',
            'status' => 'active',
            'name' => $name,
        ]);
        $project->created_by = $creator->getKey();
        $project->save();

        return $project;
    }
}
