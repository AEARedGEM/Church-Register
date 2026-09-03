<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('church_invitations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('inviter_id')->constrained('users')->cascadeOnDelete();
            $table->foreignId('invitee_id')->constrained('users')->cascadeOnDelete();
            $table->string('referral_code', 20);
            $table->timestamp('registered_at');
            $table->timestamp('validated_at')->nullable();
            $table->foreignId('validation_attendance_id')->nullable()->constrained('attendance_records')->nullOnDelete();
            $table->timestamps();

            $table->unique('invitee_id');
            $table->index(['inviter_id', 'validated_at']);
            $table->index('referral_code');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('church_invitations');
    }
};
