<?php

namespace Tests\Feature;

use App\Enums\UserRole;
use App\Models\ClientAccount;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class SharedProjectCreationTest extends TestCase
{
    use RefreshDatabase;

    public function test_web_and_api_project_creation_share_common_validation_rules(): void
    {
        $studio = $this->createUser(UserRole::StudioOwner);
        $account = $this->createAccount('Northstar Studio');

        $payload = [
            'client_account_id' => $account->getKey(),
            'product_tier' => 'enterprise',
            'name' => 'Northstar Website',
        ];

        $this->actingAs($studio)
            ->from('/projects')
            ->post('/projects', $payload)
            ->assertSessionHasErrors('product_tier');

        $this->actingAs($studio)
            ->postJson('/api/v1/projects', $payload)
            ->assertUnprocessable()
            ->assertJsonValidationErrors('product_tier');

        $this->assertDatabaseCount('projects', 0);
    }

    public function test_web_project_creation_keeps_its_own_workflow_defaults(): void
    {
        $studio = $this->createUser(UserRole::StudioOwner);
        $account = $this->createAccount('Northstar Studio');

        $this->actingAs($studio)->post('/projects', [
            'client_account_id' => $account->getKey(),
            'product_tier' => 'business',
            'name' => 'Northstar Website',
            'status' => 'active',
            'current_stage' => 'launch',
            'next_action' => 'Publish the website',
            'next_action_owner' => 'client',
        ])->assertRedirect('/projects');

        $this->assertDatabaseHas('projects', [
            'client_account_id' => $account->getKey(),
            'created_by' => $studio->getKey(),
            'name' => 'Northstar Website',
            'status' => 'draft',
            'current_stage' => 'discovery',
            'next_action' => null,
            'next_action_owner' => null,
        ]);
    }

    public function test_api_project_creation_keeps_database_defaults_when_workflow_fields_are_omitted(): void
    {
        $studio = $this->createUser(UserRole::StudioOwner);
        $account = $this->createAccount('Northstar Studio');

        $response = $this->actingAs($studio)->postJson('/api/v1/projects', [
            'client_account_id' => $account->getKey(),
            'product_tier' => 'starter',
            'name' => 'Northstar Website',
        ]);

        $response->assertCreated()
            ->assertJsonPath('data.created_by', $studio->getKey())
            ->assertJsonPath('data.status', null)
            ->assertJsonPath('data.current_stage', null);

        $this->assertDatabaseHas('projects', [
            'client_account_id' => $account->getKey(),
            'created_by' => $studio->getKey(),
            'name' => 'Northstar Website',
            'status' => 'draft',
            'current_stage' => 'onboarding',
        ]);
    }

    public function test_api_project_creation_preserves_api_specific_workflow_fields(): void
    {
        $studio = $this->createUser(UserRole::StudioOwner);
        $account = $this->createAccount('Northstar Studio');

        $response = $this->actingAs($studio)->postJson('/api/v1/projects', [
            'client_account_id' => $account->getKey(),
            'product_tier' => 'custom',
            'name' => 'Northstar Website',
            'status' => 'active',
            'current_stage' => 'design',
            'next_action' => 'Prepare the design review',
            'next_action_owner' => 'client',
        ]);

        $response->assertCreated()
            ->assertJsonPath('data.status', 'active')
            ->assertJsonPath('data.current_stage', 'design')
            ->assertJsonPath('data.next_action', 'Prepare the design review')
            ->assertJsonPath('data.next_action_owner', 'client');

        $this->assertDatabaseHas('projects', [
            'client_account_id' => $account->getKey(),
            'created_by' => $studio->getKey(),
            'name' => 'Northstar Website',
            'status' => 'active',
            'current_stage' => 'design',
            'next_action' => 'Prepare the design review',
            'next_action_owner' => 'client',
        ]);
    }

    private function createUser(UserRole $role): User
    {
        $user = User::factory()->create();
        $user->forceFill(['role' => $role])->save();

        return $user->refresh();
    }

    private function createAccount(string $name): ClientAccount
    {
        return ClientAccount::create([
            'business_name' => $name,
            'slug' => str($name)->slug()->toString(),
        ]);
    }
}
