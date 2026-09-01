<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('church_leadership_profiles', function (Blueprint $table) {
            $table->id();
            $table->foreignId('church_ministry_id')->nullable()->constrained('church_ministries')->nullOnDelete();
            $table->string('name');
            $table->string('title');
            $table->text('bio')->nullable();
            $table->string('email')->nullable();
            $table->string('phone')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('church_leadership_profiles');
    }
};
