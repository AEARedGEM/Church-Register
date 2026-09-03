<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('small_group_meetings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('small_group_id')->constrained('small_groups')->cascadeOnDelete();
            $table->string('title');
            $table->dateTime('starts_at');
            $table->dateTime('ends_at')->nullable();
            $table->string('location')->nullable();
            $table->text('notes')->nullable();
            $table->enum('status', ['scheduled', 'completed', 'cancelled'])->default('scheduled');
            $table->timestamps();

            $table->index(['small_group_id', 'starts_at']);
            $table->index('status');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('small_group_meetings');
    }
};
