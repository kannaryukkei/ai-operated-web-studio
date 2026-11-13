<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('client_accounts', function (Blueprint $table): void {
            $table->id();
            $table->string('business_name', 160);
            $table->string('slug', 180)->unique();
            $table->string('business_category', 120)->nullable();
            $table->string('website')->nullable();
            $table->string('contact_name', 160)->nullable();
            $table->string('contact_email')->nullable();
            $table->string('contact_phone', 40)->nullable();
            $table->string('profile_status', 32)->default('draft');
            $table->timestamps();

            $table->index('profile_status');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('client_accounts');
    }
};
