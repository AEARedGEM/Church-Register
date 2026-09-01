<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('church_prayer_requests', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable()->constrained()->nullOnDelete();
            $table->string('full_name');
            $table->string('email')->nullable();
            $table->enum('request_type', ['healing', 'thanksgiving', 'guidance', 'deliverance', 'other'])->default('healing');
            $table->text('message');
            $table->boolean('is_public')->default(false);
            $table->enum('status', ['pending', 'prayed', 'closed'])->default('pending');
            $table->timestamps();

            $table->index('status');
            $table->index('request_type');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('church_prayer_requests');
    }
};
