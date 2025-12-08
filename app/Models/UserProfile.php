<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class UserProfile extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'business_name',
        'cac_registration',
        'business_type',
        'business_stage',
        'years_in_business',
        'employee_count',
        'annual_revenue',
        'annual_turnover',
        'description',
        'website',
        'founded_date',
        'logo_path',
        'pitch_deck_path',
        'funding_needs',
        'funding_history',
        'market_reach',
        'loan_request_details',
        'investor_type',
        'preferred_sectors',
        'ticket_sizes',
        'accreditation_status',
        'kyc_documents',
        'district',
        'office_address',
        'official_id',
        'contact_channels',
        'institution_name',
        'institution_registration',
        'institution_sector',
        'contact_persons',
        'commitment_areas',
        'bio',
        'cv_path',
        'linkedin_profile',
        'expertise_areas',
        'certifications',
        'references',
        'training_mode',
        'title',
        'specialization',
        'profile_complete',
        'profile_completed_at',
        'verification_documents',
        'documents_verified_at',
        'metadata',
    ];

    protected function casts(): array
    {
        return [
            'founded_date' => 'date',
            'funding_history' => 'array',
            'loan_request_details' => 'array',
            'preferred_sectors' => 'array',
            'ticket_sizes' => 'array',
            'kyc_documents' => 'array',
            'contact_channels' => 'array',
            'contact_persons' => 'array',
            'commitment_areas' => 'array',
            'expertise_areas' => 'array',
            'certifications' => 'array',
            'references' => 'array',
            'specialization' => 'array',
            'verification_documents' => 'array',
            'metadata' => 'array',
            'annual_revenue' => 'decimal:2',
            'annual_turnover' => 'decimal:2',
            'funding_needs' => 'decimal:2',
            'profile_complete' => 'boolean',
            'profile_completed_at' => 'datetime',
            'documents_verified_at' => 'datetime',
        ];
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Check if profile is complete based on user role
     */
    public function isCompleteForRole(string $role): bool
    {
        return match($role) {
            'individual' => $this->isIndividualProfileComplete(),
            'startup' => $this->isStartupProfileComplete(),
            'sme_owner' => $this->isSMEProfileComplete(),
            'investor' => $this->isInvestorProfileComplete(),
            'nyp_senator' => $this->isSenatorProfileComplete(),
            'institutional_partner' => $this->isInstitutionalProfileComplete(),
            'trainer_mentor_expert' => $this->isTrainerProfileComplete(),
            default => false,
        };
    }

    /**
     * Mark profile as complete
     */
    public function markAsComplete(): void
    {
        $this->update([
            'profile_complete' => true,
            'profile_completed_at' => now(),
        ]);
    }

    /**
     * Get completion percentage
     */
    public function getCompletionPercentage(string $role): int
    {
        $requiredFields = $this->getRequiredFieldsForRole($role);
        $completedFields = 0;

        foreach ($requiredFields as $field) {
            if (!empty($this->$field)) {
                $completedFields++;
            }
        }

        return $requiredFields ? round(($completedFields / count($requiredFields)) * 100) : 0;
    }

    /**
     * Get missing fields for role completion
     */
    public function getMissingFieldsForRole(string $role): array
    {
        $requiredFields = $this->getRequiredFieldsForRole($role);
        $missingFields = [];

        foreach ($requiredFields as $field) {
            if (empty($this->$field)) {
                $missingFields[] = $field;
            }
        }

        return $missingFields;
    }

    /**
     * Private methods for role-specific completion checks
     */
    private function isIndividualProfileComplete(): bool
    {
        return !empty($this->description);
    }

    private function isStartupProfileComplete(): bool
    {
        return !empty($this->business_name) &&
               !empty($this->business_stage) &&
               !empty($this->business_type) &&
               !empty($this->pitch_deck_path) &&
               !empty($this->funding_needs) &&
               !empty($this->description);
    }

    private function isSMEProfileComplete(): bool
    {
        return !empty($this->business_name) &&
               !empty($this->cac_registration) &&
               !empty($this->business_type) &&
               !empty($this->employee_count) &&
               !empty($this->annual_turnover) &&
               !empty($this->market_reach);
    }

    private function isInvestorProfileComplete(): bool
    {
        return !empty($this->investor_type) &&
               !empty($this->preferred_sectors) &&
               !empty($this->ticket_sizes) &&
               !empty($this->kyc_documents);
    }

    private function isSenatorProfileComplete(): bool
    {
        return !empty($this->district) &&
               !empty($this->office_address) &&
               !empty($this->official_id) &&
               !empty($this->contact_channels);
    }

    private function isInstitutionalProfileComplete(): bool
    {
        return !empty($this->institution_name) &&
               !empty($this->institution_registration) &&
               !empty($this->institution_sector) &&
               !empty($this->contact_persons) &&
               !empty($this->commitment_areas);
    }

    private function isTrainerProfileComplete(): bool
    {
        return !empty($this->bio) &&
               !empty($this->expertise_areas) &&
               !empty($this->certifications) &&
               !empty($this->training_mode);
    }

    /**
     * Get required fields for each role
     */
    private function getRequiredFieldsForRole(string $role): array
    {
        return match($role) {
            'individual' => ['description'],
            'startup' => [
                'business_name', 'business_stage', 'business_type',
                'pitch_deck_path', 'funding_needs', 'description'
            ],
            'sme_owner' => [
                'business_name', 'cac_registration', 'business_type',
                'employee_count', 'annual_turnover', 'market_reach'
            ],
            'investor' => [
                'investor_type', 'preferred_sectors', 'ticket_sizes', 'kyc_documents'
            ],
            'nyp_senator' => [
                'district', 'office_address', 'official_id', 'contact_channels'
            ],
            'institutional_partner' => [
                'institution_name', 'institution_registration', 'institution_sector',
                'contact_persons', 'commitment_areas'
            ],
            'trainer_mentor_expert' => [
                'bio', 'expertise_areas', 'certifications', 'training_mode'
            ],
            default => [],
        };
    }

    /**
     * Get formatted business stage
     */
    public function getFormattedBusinessStage(): string
    {
        return match($this->business_stage) {
            'idea' => 'Idea Stage',
            'mvp' => 'MVP/Prototype',
            'growth' => 'Growth Stage',
            'expansion' => 'Expansion Stage',
            'mature' => 'Mature Business',
            default => 'Not Specified',
        };
    }

    /**
     * Get formatted investor type
     */
    public function getFormattedInvestorType(): string
    {
        return match($this->investor_type) {
            'angel' => 'Angel Investor',
            'vc' => 'Venture Capitalist',
            'institutional' => 'Institutional Investor',
            'retail' => 'Retail Investor',
            'development' => 'Development Finance',
            default => 'Not Specified',
        };
    }

    /**
     * Get employee count range label
     */
    public function getEmployeeCountLabel(): string
    {
        $count = $this->employee_count;
        if (!$count) return 'Not Specified';

        return match(true) {
            $count <= 10 => '1-10 employees',
            $count <= 50 => '11-50 employees',
            $count <= 100 => '51-100 employees',
            $count <= 500 => '101-500 employees',
            default => '500+ employees',
        };
    }

    /**
     * Get logo URL
     */
    public function getLogoUrl(): ?string
    {
        return $this->logo_path ? asset('storage/' . $this->logo_path) : null;
    }

    /**
     * Get pitch deck URL
     */
    public function getPitchDeckUrl(): ?string
    {
        return $this->pitch_deck_path ? asset('storage/' . $this->pitch_deck_path) : null;
    }

    /**
     * Get CV URL
     */
    public function getCvUrl(): ?string
    {
        return $this->cv_path ? asset('storage/' . $this->cv_path) : null;
    }
}
