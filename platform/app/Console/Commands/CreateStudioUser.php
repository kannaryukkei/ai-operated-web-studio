<?php

namespace App\Console\Commands;

use App\Enums\UserRole;
use App\Models\User;
use Illuminate\Console\Command;

class CreateStudioUser extends Command
{
    protected $signature = 'studio:create-user {--role=client : One of studio_owner, studio_operator, or client}';

    protected $description = 'Create a platform user with a server-assigned role.';

    public function handle(): int
    {
        $role = UserRole::tryFrom((string) $this->option('role'));

        if ($role === null) {
            $this->error('Invalid role. Use studio_owner, studio_operator, or client.');

            return self::FAILURE;
        }

        $name = trim((string) $this->ask('Name'));
        $email = strtolower(trim((string) $this->ask('Email')));

        if ($name === '' || ! filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $this->error('A valid name and email address are required.');

            return self::FAILURE;
        }

        if (User::query()->where('email', $email)->exists()) {
            $this->error('A user with this email address already exists.');

            return self::FAILURE;
        }

        $password = (string) $this->secret('Password (minimum 12 characters)');

        if (strlen($password) < 12) {
            $this->error('The password must contain at least 12 characters.');

            return self::FAILURE;
        }

        $confirmation = (string) $this->secret('Confirm password');

        if (! hash_equals($password, $confirmation)) {
            $this->error('Password confirmation does not match.');

            return self::FAILURE;
        }

        $user = User::create([
            'name' => $name,
            'email' => $email,
            'password' => $password,
            'email_verified_at' => now(),
        ]);

        $user->forceFill(['role' => $role])->save();

        $this->info("Created {$role->value} user: {$user->email}");

        return self::SUCCESS;
    }
}
