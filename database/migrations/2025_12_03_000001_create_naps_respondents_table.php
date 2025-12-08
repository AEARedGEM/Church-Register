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
        Schema::create('naps_respondents', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable()->constrained()->onDelete('set null');
            $table->string('first_name');
            $table->string('last_name');
            $table->string('phone');
            $table->string('state');
            $table->string('lga');
            $table->string('ward')->nullable();
            $table->string('employment_status')->nullable();
            $table->json('skills')->nullable();
            $table->json('products_interest')->nullable();
            $table->json('funding_needs')->nullable();
            $table->integer('governance_rating')->nullable();
            $table->timestamp('survey_completed_at')->nullable();
            $table->string('ip_address')->nullable();
            $table->text('user_agent')->nullable();
            $table->timestamps();

            $table->index('state');
            $table->index('employment_status');
            $table->index('survey_completed_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('naps_respondents');
    }
};
