<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('small_group_attendances', function (Blueprint $table) {
            $table->id();
            $table->foreignId('small_group_meeting_id')->constrained('small_group_meetings')->cascadeOnDelete();
            $table->foreignId('small_group_membership_id')->constrained('small_group_memberships')->cascadeOnDelete();
            $table->enum('status', ['present', 'absent', 'excused'])->default('present');
            $table->text('notes')->nullable();
            $table->foreignId('recorded_by')->constrained('users');
            $table->timestamps();

            $table->unique(['small_group_meeting_id', 'small_group_membership_id']);
            $table->index(['small_group_meeting_id', 'status']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('small_group_attendances');
    }
};
