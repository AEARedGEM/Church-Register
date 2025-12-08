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
        Schema::create('user_profiles', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');

            // Business/Organization Information
            $table->string('business_name')->nullable();
            $table->string('cac_registration')->nullable(); // Corporate Affairs Commission
            $table->enum('business_type', [
                'technology', 'healthcare', 'finance', 'education', 'agriculture',
                'manufacturing', 'retail', 'services', 'construction', 'other'
            ])->nullable();
            $table->enum('business_stage', [
                'idea', 'mvp', 'growth', 'expansion', 'mature'
            ])->nullable(); // For startups
            $table->integer('years_in_business')->nullable();
            $table->integer('employee_count')->nullable();
            $table->decimal('annual_revenue', 15, 2)->nullable();
            $table->decimal('annual_turnover', 15, 2)->nullable(); // For SMEs
            $table->text('description')->nullable();
            $table->string('website')->nullable();
            $table->date('founded_date')->nullable();
            $table->string('logo_path')->nullable();

            // Startup Specific Fields
            $table->string('pitch_deck_path')->nullable();
            $table->decimal('funding_needs', 15, 2)->nullable();
            $table->json('funding_history')->nullable(); // Track previous funding rounds

            // SME Specific Fields
            $table->string('market_reach')->nullable(); // Local, Regional, National, International
            $table->json('loan_request_details')->nullable();

            // Investor Specific Fields
            $table->enum('investor_type', [
                'angel', 'vc', 'institutional', 'retail', 'development'
            ])->nullable();
            $table->json('preferred_sectors')->nullable();
            $table->json('ticket_sizes')->nullable(); // Min/Max investment amounts
            $table->string('accreditation_status')->nullable();
            $table->json('kyc_documents')->nullable();

            // NYP Senator Fields
            $table->string('district')->nullable();
            $table->string('office_address')->nullable();
            $table->string('official_id')->nullable();
            $table->json('contact_channels')->nullable(); // WhatsApp, Email, Office phone

            // Institutional Partner Fields
            $table->string('institution_name')->nullable();
            $table->string('institution_registration')->nullable();
            $table->enum('institution_sector', [
                'finance', 'education', 'development', 'government', 'ngo', 'private'
            ])->nullable();
            $table->json('contact_persons')->nullable();
            $table->json('commitment_areas')->nullable(); // Funding, Infrastructure, Training, Policy

            // Trainer/Mentor/Expert Fields
            $table->text('bio')->nullable();
            $table->string('cv_path')->nullable();
            $table->string('linkedin_profile')->nullable();
            $table->json('expertise_areas')->nullable();
            $table->json('certifications')->nullable();
            $table->json('references')->nullable();
            $table->enum('training_mode', ['virtual', 'physical', 'hybrid'])->nullable();
            $table->string('title')->nullable(); // Professional title
            $table->json('specialization')->nullable();

            // Common verification fields
            $table->boolean('profile_complete')->default(false);
            $table->timestamp('profile_completed_at')->nullable();
            $table->json('verification_documents')->nullable();
            $table->timestamp('documents_verified_at')->nullable();

            // Additional metadata for flexibility
            $table->json('metadata')->nullable();

            $table->timestamps();

            // Add indices
            $table->index('business_type');
            $table->index('business_stage');
            $table->index('investor_type');
            $table->index('institution_sector');
            $table->index('profile_complete');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_profiles');
    }
};
