<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('small_group_memberships', function (Blueprint $table) {
            $table->id();
            $table->foreignId('small_group_id')->constrained('small_groups')->cascadeOnDelete();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->enum('status', ['active', 'inactive'])->default('active');
            $table->timestamp('joined_at')->nullable();
            $table->timestamps();

            $table->unique(['small_group_id', 'user_id']);
            $table->index(['small_group_id', 'status']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('small_group_memberships');
    }
};
