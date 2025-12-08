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
        Schema::create('naps_survey_questions', function (Blueprint $table) {
            $table->id();
            $table->text('question');
            $table->string('question_type')->default('text'); // text, select, checkbox, radio, textarea
            $table->json('options')->nullable();
            $table->string('section')->default('basic'); // basic, skills, products, governance
            $table->integer('order')->default(0);
            $table->boolean('is_required')->default(true);
            $table->boolean('is_active')->default(true);
            $table->timestamps();

            $table->index('section');
            $table->index('order');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('naps_survey_questions');
    }
};
