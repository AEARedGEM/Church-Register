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
        Schema::create('naps_statistics', function (Blueprint $table) {
            $table->id();
            $table->string('metric_key');
            $table->float('metric_value')->default(0);
            $table->string('category')->default('general');
            $table->json('details')->nullable();
            $table->timestamp('recorded_at')->useCurrent();
            $table->timestamps();

            $table->index('metric_key');
            $table->index('category');
            $table->index('recorded_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('naps_statistics');
    }
};
