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
        Schema::create('investors', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->enum('type', ['angel', 'vc_firm', 'corporate', 'government', 'foundation']);
            $table->text('description');
            $table->json('investment_focus');
            $table->decimal('min_investment', 15, 2)->nullable();
            $table->decimal('max_investment', 15, 2)->nullable();
            $table->json('preferred_stages'); 
            $table->integer('portfolio_companies')->default(0);
            $table->string('contact_email')->nullable();
            $table->string('website')->nullable();
            $table->string('logo_path')->nullable();
            $table->json('geographic_focus')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('investors');
    }
};
