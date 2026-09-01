<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('church_absentees', function (Blueprint $table) {
            $table->id();
            $table->string('member_name');
            $table->text('reason')->nullable();
            $table->string('service_type')->default('main_service');
            $table->date('service_date');
            $table->enum('status', ['absent', 'excused', 'late'])->default('absent');
            $table->timestamps();

            $table->index('service_date');
            $table->index('status');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('church_absentees');
    }
};
