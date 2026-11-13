<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('projects', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('client_account_id')->constrained()->cascadeOnDelete();
            $table->foreignId('created_by')->constrained('users')->restrictOnDelete();
            $table->string('product_tier', 24);
            $table->string('status', 32)->default('draft');
            $table->string('name', 160);
            $table->text('objective')->nullable();
            $table->date('target_launch_date')->nullable();
            $table->string('current_stage', 64)->default('onboarding');
            $table->text('next_action')->nullable();
            $table->string('next_action_owner', 32)->nullable();
            $table->timestamps();

            $table->index(['client_account_id', 'status']);
            $table->index('product_tier');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};
