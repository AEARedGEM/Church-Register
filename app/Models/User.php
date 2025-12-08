<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Spatie\Permission\Traits\HasRoles;
use App\Enum\RolesEnum;
use App\Enum\PermissionsEnum;

class User extends Authenticatable
{
    use HasFactory, Notifiable, HasRoles;

    protected $fillable = [
        'name',
        'email',
        'password',
        'primary_role',
        'sector',
        'registration_status',
        'community_rank',
        'phone',
        'address',
        'date_of_birth',
        'education_level',
        'skills_of_interest',
        'state',
        'lga',
        'nin',
        'passport_number',
        'verified_at',
        'verification_documents',
        'active_roles',
    ];

    protected $hidden = [
        'password',
        'remember_token',
        'nin', // Sensitive information
        'passport_number',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'verified_at' => 'datetime',
            'date_of_birth' => 'date',
            'password' => 'hashed',
            'skills_of_interest' => 'array',
            'active_roles' => 'array',
        ];
    }

    // Profile relationship
    public function profile()
    {
        return $this->hasOne(UserProfile::class);
    }

    // Wallet relationships
    public function wallets()
    {
        return $this->hasMany(Wallet::class);
    }

    public function transactions()
    {
        return $this->hasMany(Transaction::class);
    }

    // Funding relationships
    public function fundingApplications()
    {
        return $this->hasMany(FundingApplication::class);
    }

    public function vcMatches()
    {
        return $this->hasMany(VcMatch::class);
    }

    // Training relationships
    public function enrollments()
    {
        return $this->hasMany(CourseEnrollment::class);
    }

    public function eventRegistrations()
    {
        return $this->hasMany(EventRegistration::class);
    }

    // Community relationships
    public function communityMemberships()
    {
        return $this->hasMany(CommunityMembership::class);
    }

    public function forumPosts()
    {
        return $this->hasMany(ForumPost::class);
    }

    // Mentorship relationships
    public function mentorships()
    {
        return $this->hasMany(Mentorship::class, 'mentee_id');
    }

    public function mentorProfile()
    {
        return $this->hasOne(Mentor::class);
    }

    public function mentoring()
    {
        return $this->hasMany(Mentorship::class, 'mentor_id');
    }

    // Activity relationship
    public function activities()
    {
        return $this->hasMany(Activity::class);
    }

    // Communities the user created
    public function createdCommunities()
    {
        return $this->hasMany(Community::class, 'created_by');
    }

    // Courses the user created (if they're instructors)
    public function createdCourses()
    {
        return $this->hasMany(Course::class, 'created_by');
    }

    // Role Management Methods for NYP-IP Portal

    /**
     * Initialize user with CPD access and Individual role
     */
    public function initializeWithCPDAccess(): void
    {
        if (!$this->hasRole(RolesEnum::Individual->value)) {
            $this->assignRole(RolesEnum::Individual->value);
        }

        // Ensure CPD permissions
        $cpdPermissions = [
            PermissionsEnum::AccessCPD->value,
            PermissionsEnum::ViewDashboard->value,
            PermissionsEnum::ViewProfile->value,
            PermissionsEnum::EditProfile->value,
            PermissionsEnum::NavigateApplication->value,
        ];

        $this->givePermissionTo($cpdPermissions);
    }

    /**
     * Apply for additional role (role switching functionality)
     */
    public function applyForRole(RolesEnum $newRole): bool
    {
        // Check if user can apply for additional roles
        $currentRole = RolesEnum::from($this->primary_role);
        if (!$currentRole->canApplyForAdditionalRoles()) {
            return false;
        }

        // Don't allow duplicate role applications
        if ($this->hasRole($newRole->value)) {
            return false;
        }

        // Add to active roles tracking
        $activeRoles = $this->active_roles ?? [];
        if (!in_array($newRole->value, $activeRoles)) {
            $activeRoles[] = $newRole->value;
            $this->update(['active_roles' => $activeRoles]);
        }

        // Assign the new role and its permissions
        $this->assignRole($newRole->value);
        $rolePermissions = PermissionsEnum::getRolePermissions($newRole);
        $this->givePermissionTo($rolePermissions);

        return true;
    }

    /**
     * Switch to a different role dashboard
     */
    public function switchToRole(RolesEnum $role): bool
    {
        if (!$this->hasRole($role->value)) {
            return false;
        }

        // Update current active role (for dashboard context)
        $this->update(['primary_role' => $role->value]);
        return true;
    }

    /**
     * Get available roles user can apply for
     */
    public function getAvailableRolesToApply(): array
    {
        $currentRole = RolesEnum::from($this->primary_role);
        if (!$currentRole->canApplyForAdditionalRoles()) {
            return [];
        }

        $specializedRoles = RolesEnum::getSpecializedRoles();
        $currentRoles = $this->roles->pluck('name')->toArray();

        return array_diff($specializedRoles, $currentRoles);
    }

    /**
     * Check if user has completed required profile for role
     */
    public function hasCompletedProfileForRole(RolesEnum $role): bool
    {
        $profile = $this->profile;
        if (!$profile) {
            return false;
        }

        return match($role) {
            RolesEnum::Startup => $this->hasStartupProfile(),
            RolesEnum::SMEOwner => $this->hasSMEProfile(),
            RolesEnum::Investor => $this->hasInvestorProfile(),
            RolesEnum::NYPSenator => $this->hasSenatorProfile(),
            RolesEnum::InstitutionalPartner => $this->hasInstitutionalProfile(),
            RolesEnum::TrainerMentorExpert => $this->hasTrainerProfile(),
            default => true,
        };
    }

    /**
     * Get user's dashboard context based on current role
     */
    public function getDashboardContext(): array
    {
        $currentRole = RolesEnum::from($this->primary_role);

        return [
            'current_role' => $currentRole->value,
            'role_label' => $currentRole->label(),
            'available_roles' => $this->getAvailableRolesToApply(),
            'can_switch_roles' => $this->can(PermissionsEnum::SwitchRoles->value),
            'active_roles' => $this->active_roles ?? [],
            'has_cpd_access' => $this->can(PermissionsEnum::AccessCPD->value),
        ];
    }

    // Profile Completion Checks

    private function hasStartupProfile(): bool
    {
        $profile = $this->profile;
        return $profile &&
               $profile->business_name &&
               $profile->business_stage &&
               $profile->pitch_deck_path &&
               $profile->funding_needs;
    }

    private function hasSMEProfile(): bool
    {
        $profile = $this->profile;
        return $profile &&
               $profile->business_name &&
               $profile->cac_registration &&
               $profile->employee_count &&
               $profile->annual_turnover;
    }

    private function hasInvestorProfile(): bool
    {
        $profile = $this->profile;
        return $profile &&
               $profile->investor_type &&
               $profile->preferred_sectors &&
               $profile->ticket_sizes &&
               $profile->kyc_documents;
    }

    private function hasSenatorProfile(): bool
    {
        $profile = $this->profile;
        return $profile &&
               $profile->district &&
               $profile->office_address &&
               $profile->official_id &&
               $profile->contact_channels;
    }

    private function hasInstitutionalProfile(): bool
    {
        $profile = $this->profile;
        return $profile &&
               $profile->institution_name &&
               $profile->institution_registration &&
               $profile->institution_sector &&
               $profile->contact_persons;
    }

    private function hasTrainerProfile(): bool
    {
        $profile = $this->profile;
        return $profile &&
               $profile->bio &&
               $profile->expertise_areas &&
               $profile->certifications &&
               $profile->training_mode;
    }

    // Utility Methods

    /**
     * Check if user is verified
     */
    public function isVerified(): bool
    {
        return $this->registration_status === 'verified';
    }

    /**
     * Check if user needs profile completion
     */
    public function needsProfileCompletion(): bool
    {
        return !$this->profile || !$this->profile->profile_complete;
    }

    /**
     * Get user type label
     */
    public function getUserTypeLabel(): string
    {
        return RolesEnum::from($this->primary_role)->label();
    }

    /**
     * Get wallet balance for currency
     */
    public function getWalletBalance(string $currency): float
    {
        $wallet = $this->wallets()->where('currency_type', $currency)->first();
        return $wallet ? $wallet->balance : 0.0;
    }

    /**
     * Calculate community rank based on activities
     */
    public function calculateCommunityRank(): int
    {
        $score = $this->activities()->count() +
                $this->enrollments()->where('status', 'completed')->count() * 2 +
                $this->fundingApplications()->where('status', 'approved')->count() * 5;

        // Get users with higher scores
        $higherRankedCount = self::selectRaw('
            users.id,
            (SELECT COUNT(*) FROM activities WHERE activities.user_id = users.id) +
            (SELECT COUNT(*) FROM course_enrollments WHERE course_enrollments.user_id = users.id AND status = "completed") * 2 +
            (SELECT COUNT(*) FROM funding_applications WHERE funding_applications.user_id = users.id AND status = "approved") * 5 as score
        ')
        ->havingRaw('score > ?', [$score])
        ->count();

        $rank = $higherRankedCount + 1;
        $this->update(['community_rank' => $rank]);

        return $rank;
    }
}
