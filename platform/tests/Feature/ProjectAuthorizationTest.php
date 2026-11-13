<?php

namespace Tests\Feature;

use App\Enums\UserRole;
use App\Models\ClientAccount;
use App\Models\Project;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Str;
use Tests\TestCase;

class ProjectAuthorizationTest extends TestCase
{
    use RefreshDatabase;

    public function test_studio_owner_can_create_client_accounts_and_projects(): void
    {
        $owner = $this->createUser(UserRole::StudioOwner);

        $accountResponse = $this->actingAs($owner)->postJson('/api/v1/client-accounts', [
            'business_name' => 'Northstar Studio',
            'business_category' => 'Professional services',
        ]);

        $accountResponse
            ->assertCreated()
            ->assertJsonPath('data.business_name', 'Northstar Studio')
            ->assertJsonPath('data.slug', 'northstar-studio');

        $accountId = $accountResponse->json('data.id');

        $this->postJson('/api/v1/projects', [
            'client_account_id' => $accountId,
            'product_tier' => 'starter',
            'name' => 'Northstar Website',
        ])
            ->assertCreated()
            ->assertJsonPath('data.client_account_id', $accountId)
            ->assertJsonPath('data.created_by', $owner->getKey());
    }

    public function test_client_can_only_list_and_view_projects_for_their_account(): void
    {
        $clientA = $this->createUser(UserRole::Client);
        $clientB = $this->createUser(UserRole::Client);
        $studioOwner = $this->createUser(UserRole::StudioOwner);

        $accountA = $this->createAccount('Client A');
        $accountB = $this->createAccount('Client B');

        $accountA->users()->attach($clientA, ['membership_role' => 'owner']);
        $accountB->users()->attach($clientB, ['membership_role' => 'owner']);

        $projectA = $this->createProject($accountA, $studioOwner, 'Project A');
        $projectB = $this->createProject($accountB, $studioOwner, 'Project B');

        $projectList = $this->actingAs($clientA)->getJson('/api/v1/projects');

        $projectList->assertOk();
        $this->assertCount(1, $projectList->json('data'));
        $this->assertSame($projectA->getKey(), $projectList->json('data.0.id'));

        $this->getJson("/api/v1/projects/{$projectA->getKey()}")->assertOk();
        $this->getJson("/api/v1/projects/{$projectB->getKey()}")->assertForbidden();

        $this->getJson("/api/v1/client-accounts/{$accountA->getKey()}")->assertOk();
        $this->getJson("/api/v1/client-accounts/{$accountB->getKey()}")->assertForbidden();
    }

    public function test_project_member_can_view_only_the_project_they_joined(): void
    {
        $client = $this->createUser(UserRole::Client);
        $owner = $this->createUser(UserRole::StudioOwner);

        $account = $this->createAccount('Project Members');
        $otherAccount = $this->createAccount('Other Account');

        $assignedProject = $this->createProject($account, $owner, 'Assigned Project');
        $otherProject = $this->createProject($otherAccount, $owner, 'Other Project');

        $assignedProject->members()->attach($client, ['role' => 'viewer']);

        $this->actingAs($client)
            ->getJson("/api/v1/projects/{$assignedProject->getKey()}")
            ->assertOk();

        $this->getJson("/api/v1/projects/{$otherProject->getKey()}")
            ->assertForbidden();
    }

    public function test_client_cannot_create_accounts_or_projects(): void
    {
        $client = $this->createUser(UserRole::Client);
        $account = $this->createAccount('Existing Client');

        $this->actingAs($client)
            ->postJson('/api/v1/client-accounts', ['business_name' => 'Not Allowed'])
            ->assertForbidden();

        $this->postJson('/api/v1/projects', [
            'client_account_id' => $account->getKey(),
            'product_tier' => 'starter',
            'name' => 'Not Allowed',
        ])->assertForbidden();
    }

    public function test_studio_can_add_a_client_user_to_an_account_but_not_a_staff_user(): void
    {
        $owner = $this->createUser(UserRole::StudioOwner);
        $client = $this->createUser(UserRole::Client);
        $operator = $this->createUser(UserRole::StudioOperator);
        $account = $this->createAccount('Membership Test');

        $this->actingAs($owner)
            ->postJson("/api/v1/client-accounts/{$account->getKey()}/members", [
                'user_id' => $client->getKey(),
                'membership_role' => 'owner',
            ])
            ->assertCreated();

        $this->postJson("/api/v1/client-accounts/{$account->getKey()}/members", [
            'user_id' => $operator->getKey(),
            'membership_role' => 'member',
        ])->assertUnprocessable();

        $this->assertDatabaseHas('client_account_user', [
            'client_account_id' => $account->getKey(),
            'user_id' => $client->getKey(),
            'membership_role' => 'owner',
        ]);
    }

    public function test_users_cannot_self_assign_a_studio_role_through_mass_assignment(): void
    {
        $client = $this->createUser(UserRole::Client);

        $client->fill(['role' => UserRole::StudioOwner->value]);
        $client->save();

        $this->assertSame(UserRole::Client, $client->fresh()->role);
        $this->get('/register')->assertNotFound();
        $this->post('/register', [
            'name' => 'Untrusted User',
            'email' => 'untrusted@example.com',
            'password' => 'a-secure-password',
            'password_confirmation' => 'a-secure-password',
        ])->assertNotFound();
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
            'slug' => Str::slug($name),
        ]);
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
