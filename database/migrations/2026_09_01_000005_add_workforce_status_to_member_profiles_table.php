<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('member_profiles', function (Blueprint $table) {
            if (!Schema::hasColumn('member_profiles', 'workforce_status')) {
                $table->string('workforce_status')->nullable()->after('membership_status');
            }
        });
    }

    public function down(): void
    {
        Schema::table('member_profiles', function (Blueprint $table) {
            if (Schema::hasColumn('member_profiles', 'workforce_status')) {
                $table->dropColumn('workforce_status');
            }
        });
    }
};
