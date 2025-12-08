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
        Schema::create('fund_types', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->enum('category', ['tradefi', 'equity', 'grant', 'loan']);
            $table->text('description');
            $table->decimal('min_amount', 15, 2);
            $table->decimal('max_amount', 15, 2);
            $table->decimal('interest_rate', 5, 2)->nullable();
            $table->integer('duration_months')->nullable();
            $table->json('requirements')->nullable();
            $table->json('eligibility_criteria')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('fund_types');
    }
};
