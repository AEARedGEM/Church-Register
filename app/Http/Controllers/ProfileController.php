<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use App\Enum\RolesEnum;
use App\Enum\PermissionsEnum;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        $user = $request->user();

        // Load the user's profile and roles
        $user->load(['profile', 'roles', 'permissions']);

        // Available sectors for dropdown
        $sectors = [
            ['id' => 'technology', 'name' => 'Technology'],
            ['id' => 'healthcare', 'name' => 'Healthcare'],
            ['id' => 'finance', 'name' => 'Finance'],
            ['id' => 'education', 'name' => 'Education'],
            ['id' => 'agriculture', 'name' => 'Agriculture'],
            ['id' => 'manufacturing', 'name' => 'Manufacturing'],
            ['id' => 'retail', 'name' => 'Retail'],
            ['id' => 'services', 'name' => 'Services'],
            ['id' => 'construction', 'name' => 'Construction'],
            ['id' => 'other', 'name' => 'Other'],
        ];

        // Business types
        $businessTypes = [
            'technology', 'healthcare', 'finance', 'education', 'agriculture',
            'manufacturing', 'retail', 'services', 'construction', 'other'
        ];

        // Business stages for startups
        $businessStages = [
            ['id' => 'idea', 'name' => 'Idea Stage'],
            ['id' => 'mvp', 'name' => 'MVP/Prototype'],
            ['id' => 'growth', 'name' => 'Growth Stage'],
            ['id' => 'expansion', 'name' => 'Expansion Stage'],
            ['id' => 'mature', 'name' => 'Mature Business'],
        ];

        // Investor types
        $investorTypes = [
            ['id' => 'angel', 'name' => 'Angel Investor'],
            ['id' => 'vc', 'name' => 'Venture Capitalist'],
            ['id' => 'institutional', 'name' => 'Institutional Investor'],
            ['id' => 'retail', 'name' => 'Retail Investor'],
            ['id' => 'development', 'name' => 'Development Finance'],
        ];

        // Institution sectors
        $institutionSectors = [
            ['id' => 'finance', 'name' => 'Finance'],
            ['id' => 'education', 'name' => 'Education'],
            ['id' => 'development', 'name' => 'Development'],
            ['id' => 'government', 'name' => 'Government'],
            ['id' => 'ngo', 'name' => 'NGO'],
            ['id' => 'private', 'name' => 'Private Sector'],
        ];

        // Training modes
        $trainingModes = [
            ['id' => 'virtual', 'name' => 'Virtual'],
            ['id' => 'physical', 'name' => 'Physical'],
            ['id' => 'hybrid', 'name' => 'Hybrid'],
        ];

        // Education levels
        $educationLevels = [
            ['id' => 'primary', 'name' => 'Primary Education'],
            ['id' => 'secondary', 'name' => 'Secondary Education'],
            ['id' => 'diploma', 'name' => 'Diploma'],
            ['id' => 'bachelors', 'name' => "Bachelor's Degree"],
            ['id' => 'masters', 'name' => "Master's Degree"],
            ['id' => 'phd', 'name' => 'PhD'],
        ];

        // Nigerian states
        $states = $this->getNigerianStates();

        // Get available roles to apply for
        $availableRoles = collect($user->getAvailableRolesToApply())
            ->map(function ($role) {
                $roleEnum = RolesEnum::from($role);
                return [
                    'id' => $role,
                    'name' => $roleEnum->label(),
                    'description' => $this->getRoleDescription($roleEnum),
                ];
            });

        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $user instanceof MustVerifyEmail,
            'status' => session('status'),
            'user' => $user,
            'dashboardContext' => $user->getDashboardContext(),
            'sectors' => $sectors,
            'businessTypes' => $businessTypes,
            'businessStages' => $businessStages,
            'investorTypes' => $investorTypes,
            'institutionSectors' => $institutionSectors,
            'trainingModes' => $trainingModes,
            'educationLevels' => $educationLevels,
            'states' => $states,
            'availableRoles' => $availableRoles,
        ]);
    }

    /**
     * Update the user's profile information.
     */
  public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $user = $request->user();

        // Update user basic information
        $userData = $request->only([
            'name', 'email', 'phone', 'address', 'sector',
            'date_of_birth', 'education_level', 'skills_of_interest',
            'state', 'lga', 'nin', 'passport_number'
        ]);

        $user->fill($userData);

        // Handle email verification reset
        if ($user->isDirty('email')) {
            $user->email_verified_at = null;
        }

        $user->save();

        // Update or create user profile based on current role
        $this->updateProfileForRole($user, $request);

        return Redirect::route('profile.edit')->with('status', 'profile-updated');
    }

    /**
     * Apply for additional role
     */
    public function applyForRole(Request $request): RedirectResponse
    {
        $request->validate([
            'role' => 'required|string|in:startup,sme_owner,investor,nyp_senator,institutional_partner,trainer_mentor_expert',
        ]);

        $user = $request->user();
        $newRole = RolesEnum::from($request->role);

        // Check if user can apply for this role
        if (!in_array($newRole->value, $user->getAvailableRolesToApply())) {
            return Redirect::route('profile.edit')->withErrors([
                'role' => 'You cannot apply for this role.'
            ]);
        }

        // Check if profile is complete enough for this role
        if (!$user->hasCompletedProfileForRole($newRole)) {
            return Redirect::route('profile.edit')->withErrors([
                'role' => 'Please complete your profile information for this role first.'
            ]);
        }

        // Apply for the role
        if ($user->applyForRole($newRole)) {
            return Redirect::route('profile.edit')->with('status', 'role-applied');
        }

        return Redirect::route('profile.edit')->withErrors([
            'role' => 'Failed to apply for role. Please try again.'
        ]);
    }

    /**
     * Switch to a different role dashboard
     */
    public function switchRole(Request $request): RedirectResponse
    {
        $request->validate([
            'role' => 'required|string',
        ]);

        $user = $request->user();

        try {
            $role = RolesEnum::from($request->role);

            if ($user->switchToRole($role)) {
                return Redirect::route('dashboard')->with('status', 'role-switched');
            }
        } catch (\ValueError $e) {
            // Invalid role
        }

        return Redirect::route('profile.edit')->withErrors([
            'role' => 'Cannot switch to this role.'
        ]);
    }

    /**
     * Upload profile image.
     */
    public function uploadImage(Request $request): RedirectResponse
    {
        $request->validate([
            'image' => ['required', 'image', 'max:2048'], // 2MB max
        ]);

        $user = $request->user();

        // Delete old image if exists
        if ($user->profile && $user->profile->logo_path) {
            Storage::disk('public')->delete($user->profile->logo_path);
        }

        // Store new image
        $path = $request->file('image')->store('profile-images', 'public');

        // Update or create profile with image path
        $user->profile()->updateOrCreate(
            ['user_id' => $user->id],
            ['logo_path' => $path]
        );

        return Redirect::route('profile.edit')->with('status', 'image-uploaded');
    }

    /**
     * Upload documents (pitch deck, CV, etc.)
     */
    public function uploadDocument(Request $request): RedirectResponse
    {
        $request->validate([
            'document' => ['required', 'file', 'max:10240'], // 10MB max
            'type' => ['required', 'string', 'in:pitch_deck,cv,verification_document'],
        ]);

        $user = $request->user();
        $type = $request->type;

        // Delete old document if exists
        $profile = $user->profile;
        if ($profile && isset($profile->{$type . '_path'})) {
            Storage::disk('private')->delete($profile->{$type . '_path'});
        }

        // Store new document
        $path = $request->file('document')->store($type . 's', 'private');

        // Update profile
        $user->profile()->updateOrCreate(
            ['user_id' => $user->id],
            [$type . '_path' => $path]
        );

        return Redirect::route('profile.edit')->with('status', 'document-uploaded');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        // Delete associated files
        if ($user->profile) {
            $this->cleanupUserFiles($user->profile);
        }

        // Soft delete related records or handle cascading deletes
        $this->cleanupUserData($user);

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/')->with('status', 'account-deleted');
    }

    /**
     * Export user data.
     */
    public function exportData(Request $request)
    {
        $user = $request->user();
        $user->load([
            'profile', 'wallets', 'transactions', 'fundingApplications',
            'vcMatches', 'enrollments', 'communityMemberships',
            'forumPosts', 'mentorships', 'activities', 'roles', 'permissions'
        ]);

        $data = [
            'personal_information' => [
                'name' => $user->name,
                'email' => $user->email,
                'phone' => $user->phone,
                'address' => $user->address,
                'primary_role' => $user->primary_role,
                'sector' => $user->sector,
                'registration_status' => $user->registration_status,
                'date_of_birth' => $user->date_of_birth?->toDateString(),
                'education_level' => $user->education_level,
                'skills_of_interest' => $user->skills_of_interest,
                'state' => $user->state,
                'lga' => $user->lga,
                'community_rank' => $user->community_rank,
                'active_roles' => $user->active_roles,
                'created_at' => $user->created_at,
            ],
            'business_profile' => $user->profile ? $user->profile->toArray() : null,
            'roles_and_permissions' => [
                'roles' => $user->roles->pluck('name'),
                'permissions' => $user->getAllPermissions()->pluck('name'),
            ],
            'financial_data' => [
                'wallets' => $user->wallets->toArray(),
                'transactions' => $user->transactions->toArray(),
                'funding_applications' => $user->fundingApplications->toArray(),
                'vc_matches' => $user->vcMatches->toArray(),
            ],
            'education_data' => [
                'enrollments' => $user->enrollments->toArray(),
            ],
            'community_data' => [
                'memberships' => $user->communityMemberships->toArray(),
                'forum_posts' => $user->forumPosts->toArray(),
                'mentorships' => $user->mentorships->toArray(),
            ],
            'activity_log' => $user->activities->toArray(),
            'export_date' => now()->toISOString(),
        ];

        $filename = 'nyp_user_data_' . $user->id . '_' . now()->format('Y_m_d_H_i_s') . '.json';

        return response()->json($data)
            ->header('Content-Disposition', 'attachment; filename="' . $filename . '"')
            ->header('Content-Type', 'application/json');
    }

    /**
     * Get user dashboard data for profile context.
     */
    public function getDashboardData(Request $request)
    {
        $user = $request->user();

        return response()->json([
            'stats' => [
                'total_funding' => $user->fundingApplications()
                    ->where('status', 'approved')
                    ->sum('amount_requested'),
                'active_applications' => $user->fundingApplications()
                    ->whereIn('status', ['pending', 'under_review'])
                    ->count(),
                'completed_training' => $user->enrollments()
                    ->where('status', 'completed')
                    ->count(),
                'community_rank' => $user->calculateCommunityRank(),
                'profile_completion' => $this->getProfileCompletion($user),
            ],
            'recent_activity' => $this->getRecentProfileActivity($user),
            'dashboard_context' => $user->getDashboardContext(),
        ]);
    }

        /**
         * Update profile based on current role
         */
        private function updateProfileForRole($user, $request): void
        {
            $currentRole = $user->primary_role;
            $profileData = [];

            $commonFields = [
                'business_name', 'description', 'website', 'logo_path'
            ];

            foreach ($commonFields as $field) {
                if ($request->has($field)) {
                    $profileData[$field] = $request->input($field);
                }
            }

            // Role-specific fields
            $roleSpecificFields = $this->getRoleSpecificFields($currentRole);

            // Add role-specific fields
            foreach ($roleSpecificFields as $field) {
                if ($request->has($field)) {
                    $value = $request->input($field);

                    // Handle array fields that come as comma-separated strings
                    if (in_array($field, ['preferred_sectors', 'ticket_sizes', 'expertise_areas', 'specialization'])) {
                        if (is_string($value) && !empty($value)) {
                            $profileData[$field] = array_filter(
                                array_map('trim', explode(',', $value)),
                                function($item) { return !empty($item); }
                            );
                        } elseif (is_array($value)) {
                            $profileData[$field] = $value;
                        }
                    } else {
                        $profileData[$field] = $value;
                    }
                }
            }

            // Remove empty values
            $profileData = array_filter($profileData, function ($value) {
                return $value !== null && $value !== '' && $value !== [];
            });

            if (!empty($profileData)) {
                $profile = $user->profile()->updateOrCreate(
                    ['user_id' => $user->id],
                    $profileData
                );

                // Check if profile is complete and mark accordingly
                if ($profile->isCompleteForRole($currentRole)) {
                    $profile->markAsComplete();
                }
            }
        }

    /**
     * Get profile completion percentage
     */
    private function getProfileCompletion($user): array
    {
        $profile = $user->profile;
        $currentRole = $user->primary_role;

        if (!$profile) {
            return [
                'percentage' => 0,
                'missing_fields' => [],
                'is_complete' => false,
            ];
        }

        $percentage = $profile->getCompletionPercentage($currentRole);
        $missingFields = $profile->getMissingFieldsForRole($currentRole);

        return [
            'percentage' => $percentage,
            'missing_fields' => $missingFields,
            'is_complete' => $percentage === 100,
        ];
    }

    /**
     * Clean up user data before deletion.
     */
    private function cleanupUserData($user): void
    {
        // Handle profile deletion
        if ($user->profile) {
            $user->profile->delete();
        }

        // Revoke all roles and permissions
        $user->roles()->detach();
        $user->permissions()->detach();

        // Handle other cleanup operations
        // Note: Consider anonymizing forum posts, transferring community ownership, etc.
    }

    /**
     * Clean up user files
     */
    private function cleanupUserFiles($profile): void
    {
        $fileFields = ['logo_path', 'pitch_deck_path', 'cv_path'];

        foreach ($fileFields as $field) {
            if ($profile->$field) {
                Storage::disk('public')->delete($profile->$field);
            }
        }

        // Clean up verification documents
        if ($profile->verification_documents) {
            foreach ($profile->verification_documents as $document) {
                Storage::disk('private')->delete($document);
            }
        }
    }

    /**
     * Get Nigerian states
     */
    private function getNigerianStates(): array
    {
        return [
            ['id' => 'abia', 'name' => 'Abia'],
            ['id' => 'adamawa', 'name' => 'Adamawa'],
            ['id' => 'akwa_ibom', 'name' => 'Akwa Ibom'],
            ['id' => 'anambra', 'name' => 'Anambra'],
            ['id' => 'bauchi', 'name' => 'Bauchi'],
            ['id' => 'bayelsa', 'name' => 'Bayelsa'],
            ['id' => 'benue', 'name' => 'Benue'],
            ['id' => 'borno', 'name' => 'Borno'],
            ['id' => 'cross_river', 'name' => 'Cross River'],
            ['id' => 'delta', 'name' => 'Delta'],
            ['id' => 'ebonyi', 'name' => 'Ebonyi'],
            ['id' => 'edo', 'name' => 'Edo'],
            ['id' => 'ekiti', 'name' => 'Ekiti'],
            ['id' => 'enugu', 'name' => 'Enugu'],
            ['id' => 'fct', 'name' => 'Federal Capital Territory'],
            ['id' => 'gombe', 'name' => 'Gombe'],
            ['id' => 'imo', 'name' => 'Imo'],
            ['id' => 'jigawa', 'name' => 'Jigawa'],
            ['id' => 'kaduna', 'name' => 'Kaduna'],
            ['id' => 'kano', 'name' => 'Kano'],
            ['id' => 'katsina', 'name' => 'Katsina'],
            ['id' => 'kebbi', 'name' => 'Kebbi'],
            ['id' => 'kogi', 'name' => 'Kogi'],
            ['id' => 'kwara', 'name' => 'Kwara'],
            ['id' => 'lagos', 'name' => 'Lagos'],
            ['id' => 'nasarawa', 'name' => 'Nasarawa'],
            ['id' => 'niger', 'name' => 'Niger'],
            ['id' => 'ogun', 'name' => 'Ogun'],
            ['id' => 'ondo', 'name' => 'Ondo'],
            ['id' => 'osun', 'name' => 'Osun'],
            ['id' => 'oyo', 'name' => 'Oyo'],
            ['id' => 'plateau', 'name' => 'Plateau'],
            ['id' => 'rivers', 'name' => 'Rivers'],
            ['id' => 'sokoto', 'name' => 'Sokoto'],
            ['id' => 'taraba', 'name' => 'Taraba'],
            ['id' => 'yobe', 'name' => 'Yobe'],
            ['id' => 'zamfara', 'name' => 'Zamfara'],
        ];
    }

    /**
     * Get role description for UI
     */
    private function getRoleDescription(RolesEnum $role): string
    {
        return match($role) {
            RolesEnum::Startup => 'Access incubation, mentorship, and seed funding for your startup.',
            RolesEnum::SMEOwner => 'Get trade financing, working capital support, and digital tools.',
            RolesEnum::Investor => 'Fund startups and SMEs, earn returns, and track your portfolio.',
            RolesEnum::NYPSenator => 'Access oversight tools to track impact and provide policy direction.',
            RolesEnum::InstitutionalPartner => 'Collaborate, fund, and support NYP-IP initiatives.',
            RolesEnum::TrainerMentorExpert => 'Offer training and guidance to youths, startups, and SMEs.',
            default => 'Join the NYP Industrialization Program.',
        };
    }

    /**
     * Get recent profile activity
     */
    private function getRecentProfileActivity($user): array
    {
        return $user->activities()
            ->with(['subject'])
            ->where('subject_type', 'App\\Models\\User')
            ->where('subject_id', $user->id)
            ->latest()
            ->take(5)
            ->get()
            ->map(function ($activity) {
                return [
                    'description' => $activity->description,
                    'created_at' => $activity->created_at->diffForHumans(),
                    'properties' => $activity->properties,
                ];
            })
            ->toArray();
    }

    private function getRoleSpecificFields($role): array
    {
        return match($role) {
            'startup' => [
                'cac_registration', 'business_type', 'business_stage',
                'years_in_business', 'employee_count', 'annual_revenue',
                'founded_date', 'funding_needs', 'funding_history'
            ],
            'sme_owner' => [
                'cac_registration', 'business_type', 'years_in_business',
                'employee_count', 'annual_turnover', 'market_reach',
                'loan_request_details'
            ],
            'investor' => [
                'investor_type', 'preferred_sectors', 'ticket_sizes',
                'accreditation_status', 'kyc_documents'
            ],
            'nyp_senator' => [
                'district', 'office_address', 'official_id', 'contact_channels'
            ],
            'institutional_partner' => [
                'institution_name', 'institution_registration', 'institution_sector',
                'contact_persons', 'commitment_areas'
            ],
            'trainer_mentor_expert' => [
                'bio', 'cv_path', 'linkedin_profile', 'expertise_areas',
                'certifications', 'references', 'training_mode', 'title', 'specialization'
            ],
            default => []
        };
    }
}
