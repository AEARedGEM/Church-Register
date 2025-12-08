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
        Schema::create('event_registrations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('event_id')->constrained()->onDelete('cascade');
            $table->timestamp('registered_at')->useCurrent();
            $table->enum('status', ['registered', 'confirmed', 'attended', 'no_show', 'cancelled'])->default('registered');
            $table->string('team_name')->nullable();
            $table->json('team_members')->nullable();
            $table->text('project_description')->nullable();
            $table->string('project_submission')->nullable(); 
            $table->integer('final_rank')->nullable();
            $table->timestamps();

            $table->unique(['user_id', 'event_id']);
            $table->index(['event_id', 'status']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('event_registrations');
    }
};
