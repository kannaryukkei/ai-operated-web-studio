<?php

namespace Tests\\Feature;

use App\\Enums\\UserRole;
use App\\Models\\ClientAccount;
use App\\Models\\Project;
use App\\Models\\User;
use Illuminate\\Foundation\\Testing\\RefreshDatabase;
use Illuminate\\Support\\Str;
use Tests\\TestCase;

class WorkspacePagesTest extends TestCase
{
    use RefreshDatabase;

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
        $this->get('/projects')->assertOk();

        $this->post('/clients', ['business_name' => 'Forbidden Account'])->assertForbidden();
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
