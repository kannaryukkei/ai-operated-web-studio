<?php

namespace Tests\Feature;

use App\Enums\UserRole;
use App\Models\ClientAccount;
use App\Models\ClientInvitation;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Str;
use Tests\TestCase;

class ClientInvitationTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        $this->withoutVite();
    }

    public function test_studio_can_create_a_hashed_expiring_client_invitation_without_sending_email(): void
    {
        $studio = $this->createUser(UserRole::StudioOwner);
        $account = $this->createAccount();

        $response = $this->actingAs($studio)->post(route('clients.invitations.store', $account), [
            'email' => 'Client@Example.com',
            'membership_role' => 'member',
        ])->assertRedirect();

        $url = $response->getSession()->get('invitation_url');
        $this->assertIsString($url);
        $token = Str::afterLast($url, '/');

        $invitation = ClientInvitation::query()->firstOrFail();

        $this->assertSame('client@example.com', $invitation->email);
        $this->assertSame(hash('sha256', $token), $invitation->token_hash);
        $this->assertNotSame($token, $invitation->token_hash);
        $this->assertTrue($invitation->expires_at->isFuture());
        $this->assertDatabaseCount('users', 1);
    }

    public function test_invited_person_can_create_a_client_account_and_accept_once(): void
    {
        $studio = $this->createUser(UserRole::StudioOwner);
        $account = $this->createAccount();
        $invitation = $this->createInvitation($account, $studio, 'new-client@example.com', 'owner');
        $token = $this->tokenFor($invitation);

        $this->get(route('invitations.show', $token))
            ->assertOk()
            ->assertInertia(fn ($page) => $page
                ->component('invitations/show')
                ->where('email', 'new-client@example.com')
                ->where('businessName', 'Northstar')
                ->where('existingUser', false));

        $this->post(route('invitations.accept', $token), [
            'name' => 'New Client',
            'password' => 'StrongPassword123!',
            'password_confirmation' => 'StrongPassword123!',
            'existing_account' => '',
        ])->assertRedirect('/dashboard');

        $client = User::query()->where('email', 'new-client@example.com')->firstOrFail();

        $this->assertAuthenticatedAs($client);
        $this->assertTrue($client->isClient());
        $this->assertDatabaseHas('client_account_user', [
            'client_account_id' => $account->getKey(),
            'user_id' => $client->getKey(),
            'membership_role' => 'owner',
        ]);
        $this->assertNotNull($invitation->fresh()->accepted_at);

        $this->get(route('invitations.show', $token))->assertNotFound();
    }

    public function test_existing_client_user_must_be_logged_in_with_the_invited_email(): void
    {
        $studio = $this->createUser(UserRole::StudioOwner);
        $account = $this->createAccount();
        $client = $this->createUser(UserRole::Client, 'existing@example.com');
        $invitation = $this->createInvitation($account, $studio, $client->email);
        $token = $this->tokenFor($invitation);

        $this->post(route('invitations.accept', $token), [
            'name' => '',
            'password' => '',
            'password_confirmation' => '',
            'existing_account' => '1',
        ])->assertForbidden();

        $this->actingAs($client)->post(route('invitations.accept', $token), [
            'name' => '',
            'password' => '',
            'password_confirmation' => '',
            'existing_account' => '1',
        ])->assertRedirect('/dashboard');

        $this->assertDatabaseHas('client_account_user', [
            'client_account_id' => $account->getKey(),
            'user_id' => $client->getKey(),
            'membership_role' => 'member',
        ]);
    }

    public function test_studio_staff_cannot_be_invited_as_a_client_member(): void
    {
        $studio = $this->createUser(UserRole::StudioOwner);
        $operator = $this->createUser(UserRole::StudioOperator, 'operator@example.com');
        $account = $this->createAccount();

        $this->actingAs($studio)->post(route('clients.invitations.store', $account), [
            'email' => $operator->email,
            'membership_role' => 'member',
        ])->assertSessionHasErrors('email');

        $this->assertDatabaseCount('client_invitations', 0);
    }

    public function test_expired_and_revoked_invitations_cannot_be_accepted(): void
    {
        $studio = $this->createUser(UserRole::StudioOwner);
        $account = $this->createAccount();

        $expired = $this->createInvitation($account, $studio, 'expired@example.com');
        $expired->forceFill(['expires_at' => now()->subMinute()])->save();

        $revoked = $this->createInvitation($account, $studio, 'revoked@example.com');
        $revoked->forceFill(['revoked_at' => now()])->save();

        $this->get(route('invitations.show', $this->tokenFor($expired)))->assertNotFound();
        $this->get(route('invitations.show', $this->tokenFor($revoked)))->assertNotFound();
    }

    private function createUser(UserRole $role, string $email = 'studio@example.com'): User
    {
        $user = User::factory()->create(['email' => $email]);
        $user->forceFill(['role' => $role])->save();

        return $user->refresh();
    }

    private function createAccount(): ClientAccount
    {
        return ClientAccount::create([
            'business_name' => 'Northstar',
            'slug' => 'northstar',
        ]);
    }

    private function createInvitation(
        ClientAccount $account,
        User $studio,
        string $email,
        string $role = 'member',
    ): ClientInvitation {
        return ClientInvitation::create([
            'client_account_id' => $account->getKey(),
            'invited_by' => $studio->getKey(),
            'email' => $email,
            'membership_role' => $role,
            'token_hash' => hash('sha256', Str::random(64)),
            'expires_at' => now()->addDays(7),
        ]);
    }

    private function tokenFor(ClientInvitation $invitation): string
    {
        $token = Str::random(64);
        $invitation->forceFill(['token_hash' => hash('sha256', $token)])->save();

        return $token;
    }
}
