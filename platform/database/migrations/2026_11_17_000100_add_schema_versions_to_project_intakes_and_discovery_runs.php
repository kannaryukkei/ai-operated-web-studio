<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('project_intakes', function (Blueprint $table): void {
            // Existing intake rows keep the legacy 26-field payload as schema v1.
            $table->unsignedSmallInteger('schema_version')->default(1);
        });

        Schema::table('discovery_runs', function (Blueprint $table): void {
            // Preserve the exact intake schema used to create each discovery snapshot.
            $table->unsignedSmallInteger('intake_schema_version')->default(1);
        });
    }

    public function down(): void
    {
        Schema::table('discovery_runs', function (Blueprint $table): void {
            $table->dropColumn('intake_schema_version');
        });

        Schema::table('project_intakes', function (Blueprint $table): void {
            $table->dropColumn('schema_version');
        });
    }
};
