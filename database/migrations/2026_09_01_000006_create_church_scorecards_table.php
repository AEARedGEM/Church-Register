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
        Schema::create('church_scorecards', function (Blueprint $table) {
            $table->id();
            $table->enum('period_type', ['weekly', 'monthly', 'quarterly', 'annual'])->default('weekly');
            $table->string('title');
            $table->date('report_date');
            $table->unsignedInteger('invitation_count')->default(0);
            $table->unsignedInteger('new_visitors_count')->default(0);
            $table->unsignedInteger('conversion_count')->default(0);
            $table->unsignedInteger('score')->default(0);
            $table->text('notes')->nullable();
            $table->timestamps();

            $table->index('period_type');
            $table->index('report_date');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('church_scorecards');
    }
};
