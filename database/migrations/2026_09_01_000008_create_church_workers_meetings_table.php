<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('church_workers_meetings', function (Blueprint $table) {
            $table->id();
            $table->string('topic');
            $table->date('meeting_date');
            $table->string('leader_name');
            $table->text('summary')->nullable();
            $table->enum('status', ['scheduled', 'completed', 'cancelled'])->default('scheduled');
            $table->timestamps();

            $table->index('meeting_date');
            $table->index('status');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('church_workers_meetings');
    }
};
