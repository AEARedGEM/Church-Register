<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // For MySQL, modify the enum
        DB::statement("ALTER TABLE users MODIFY primary_role ENUM('individual', 'startup', 'sme_owner', 'investor', 'nyp_senator', 'institutional_partner', 'trainer_mentor_expert', 'super_admin', 'admin', 'manager', 'support') DEFAULT 'individual'");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Restore to original enum
        DB::statement("ALTER TABLE users MODIFY primary_role ENUM('individual', 'startup', 'sme_owner', 'investor', 'nyp_senator', 'institutional_partner', 'trainer_mentor_expert') DEFAULT 'individual'");
    }
};
