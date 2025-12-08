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
        Schema::create('naps_survey_responses', function (Blueprint $table) {
            $table->id();
            $table->foreignId('respondent_id')->constrained('naps_respondents')->onDelete('cascade');
            $table->foreignId('question_id')->constrained('naps_survey_questions')->onDelete('cascade');
            $table->longText('answer')->nullable();
            $table->timestamp('answered_at')->nullable();
            $table->timestamps();

            $table->unique(['respondent_id', 'question_id']);
            $table->index('respondent_id');
            $table->index('question_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('naps_survey_responses');
    }
};
