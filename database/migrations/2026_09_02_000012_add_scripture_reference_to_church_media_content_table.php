<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('church_media_content', function (Blueprint $table) {
            $table->string('scripture_reference')->nullable()->after('summary');
        });
    }

    public function down(): void
    {
        Schema::table('church_media_content', function (Blueprint $table) {
            $table->dropColumn('scripture_reference');
        });
    }
};
