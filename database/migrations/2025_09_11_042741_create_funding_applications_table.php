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
        Schema::create('funding_applications', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('fund_type_id')->constrained()->onDelete('cascade');
            $table->string('title');
            $table->decimal('amount_requested', 15, 2);
            $table->text('purpose');
            $table->text('business_plan')->nullable();
            $table->enum('status', ['pending', 'under_review', 'approved', 'rejected', 'disbursed'])->default('pending');
            $table->timestamp('applied_at');
            $table->timestamp('reviewed_at')->nullable();
            $table->timestamp('approved_at')->nullable();
            $table->timestamp('disbursed_at')->nullable();
            $table->text('rejection_reason')->nullable();
            $table->text('reviewer_notes')->nullable();
            $table->foreignId('reviewed_by')->nullable()->constrained('users');
            $table->json('documents')->nullable();
            $table->timestamps();

            $table->index(['user_id', 'status']);
            $table->index(['fund_type_id', 'status']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('funding_applications');
    }
};
