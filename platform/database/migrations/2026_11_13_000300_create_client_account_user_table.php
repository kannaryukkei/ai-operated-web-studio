<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('client_account_user', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('client_account_id')->constrained()->cascadeOnDelete();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('membership_role', 32)->default('member');
            $table->timestamps();

            $table->unique(['client_account_id', 'user_id']);
            $table->index(['user_id', 'membership_role']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('client_account_user');
    }
};
