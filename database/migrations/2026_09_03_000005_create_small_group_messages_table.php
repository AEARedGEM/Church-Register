<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('small_group_messages', function (Blueprint $table) {
            $table->id();
            $table->foreignId('small_group_id')->constrained('small_groups')->cascadeOnDelete();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->text('body');
            $table->timestamps();

            $table->index(['small_group_id', 'created_at']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('small_group_messages');
    }
};
