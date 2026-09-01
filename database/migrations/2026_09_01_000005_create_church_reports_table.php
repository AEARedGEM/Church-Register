<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('church_reports', function (Blueprint $table) {
            $table->id();
            $table->string('period_type');
            $table->string('title');
            $table->date('report_date');
            $table->text('summary')->nullable();
            $table->unsignedInteger('attendance_count')->default(0);
            $table->unsignedInteger('first_timers_count')->default(0);
            $table->unsignedInteger('new_members_count')->default(0);
            $table->unsignedInteger('prayer_requests_count')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('church_reports');
    }
};
