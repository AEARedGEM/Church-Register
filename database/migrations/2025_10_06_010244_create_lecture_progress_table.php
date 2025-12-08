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
        Schema::create('lecture_progress', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('course_lecture_id')->constrained('course_lectures')->onDelete('cascade');
            $table->boolean('is_completed')->default(false);
            $table->integer('progress_percentage')->default(0);
            $table->timestamp('completed_at')->nullable();
            $table->integer('time_spent_seconds')->default(0);
            $table->integer('last_position_seconds')->default(0);
            $table->timestamps();

            // Unique constraint: one progress record per user per lecture
            $table->unique(['user_id', 'course_lecture_id']);

            // Indexes for performance
            $table->index(['user_id', 'is_completed']);
            $table->index('course_lecture_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('lecture_progress');
    }
};
