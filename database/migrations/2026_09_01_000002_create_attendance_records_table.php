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
        Schema::create('attendance_records', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('member_profile_id')->nullable()->constrained()->nullOnDelete();
            $table->string('service_type');
            $table->date('service_date');
            $table->enum('status', ['present', 'absent', 'late', 'excused'])->default('present');
            $table->boolean('first_timer')->default(false);
            $table->foreignId('recorded_by')->nullable()->constrained('users')->nullOnDelete();
            $table->text('notes')->nullable();
            $table->timestamp('check_in_time')->nullable();
            $table->timestamps();

            $table->index(['service_type', 'service_date']);
            $table->index('status');
            $table->index('first_timer');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('attendance_records');
    }
};
