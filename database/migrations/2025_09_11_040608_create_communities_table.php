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
        Schema::create('communities', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('sector');
            $table->text('description');
            $table->integer('member_count')->default(0);
            $table->enum('activity_level', ['very_active', 'active', 'moderate', 'inactive'])->default('moderate');
            $table->string('cover_image')->nullable();
            $table->json('rules')->nullable();
            $table->json('tags')->nullable();
            $table->boolean('is_private')->default(false);
            $table->boolean('is_active')->default(true);
            $table->foreignId('created_by')->constrained('users')->onDelete('cascade');
            $table->timestamps();

            $table->index(['sector', 'is_active']);
            $table->index('activity_level');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('communities');
    }
};
