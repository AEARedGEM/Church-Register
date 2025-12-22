<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Delete placeholder users created by the factory
        $placeholderEmails = [
            'graciela.ferry@example.com',
            'jaskolski.krystel@example.org',
            'umitchell@example.org',
            'lsauer@example.net',
            'wmertz@example.net',
            'white.destin@example.net',
            'dgusikowski@example.net',
            'tony.pollich@example.org',
            'lupe.kilback@example.com',
            'tdaugherty@example.org',
        ];

        DB::table('users')->whereIn('email', $placeholderEmails)->delete();
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Migrations that delete data cannot be reliably reversed
        // These placeholder users can be recreated by re-seeding if needed
    }
};
