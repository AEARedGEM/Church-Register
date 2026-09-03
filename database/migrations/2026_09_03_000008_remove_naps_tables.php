<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::dropIfExists('naps_survey_responses');
        Schema::dropIfExists('naps_survey_questions');
        Schema::dropIfExists('naps_sub_skills');
        Schema::dropIfExists('naps_skill_groups');
        Schema::dropIfExists('naps_statistics');
        Schema::dropIfExists('naps_respondents');
    }

    public function down(): void
    {
        // The retired NAPS schema is intentionally not recreated.
    }
};
