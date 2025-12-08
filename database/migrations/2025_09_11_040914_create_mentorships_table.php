<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('mentorships', function (Blueprint $table) {
            $table->id();
            $table->foreignId('mentee_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('mentor_id')->constrained('users')->onDelete('cascade');
            $table->string('specialization');
            $table->text('goals')->nullable();
            $table->enum('status', ['requested', 'active', 'completed', 'paused', 'cancelled'])->default('requested');
            $table->timestamp('started_at')->nullable();
            $table->timestamp('ended_at')->nullable();
            $table->integer('session_count')->default(0);
            $table->timestamp('next_session_at')->nullable();
            $table->text('mentee_feedback')->nullable();
            $table->text('mentor_feedback')->nullable();
            $table->integer('mentee_rating')->nullable();
            $table->integer('mentor_rating')->nullable();
            $table->timestamps();

            $table->index(['mentee_id', 'status']);
            $table->index(['mentor_id', 'status']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('mentorships');
    }
};
