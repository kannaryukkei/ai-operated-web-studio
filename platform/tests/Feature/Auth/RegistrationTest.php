<?php

namespace Tests\Feature\Auth;

use Tests\TestCase;

class RegistrationTest extends TestCase
{
    public function test_public_registration_is_disabled(): void
    {
        $this->get('/register')->assertNotFound();

        $this->post('/register', [
            'name' => 'Untrusted User',
            'email' => 'untrusted@example.com',
            'password' => 'a-secure-password',
            'password_confirmation' => 'a-secure-password',
        ])->assertNotFound();
    }
}
