<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Event;
use App\Models\Activity;
use App\Models\FundingApplication;
use App\Models\Course;
use App\Models\CourseEnrollment;
use App\Models\VcMatch;
use App\Models\Community;
use App\Models\CommunityMembership;
use App\Models\ForumPost;
use App\Models\Mentorship;
use App\Models\Transaction;
use App\Models\Wallet;
use App\Enum\RolesEnum;
use App\Enum\PermissionsEnum;
use Carbon\Carbon;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        $user->load(['profile', 'roles']);

        // Get current role context
        $currentRole = RolesEnum::from($user->primary_role);
        $dashboardContext = $user->getDashboardContext();

        // Ensure user has CPD access
        if (!$user->can(PermissionsEnum::AccessCPD->value)) {
            $user->initializeWithCPDAccess();
        }

        return Inertia::render('Dashboard', [
            'user' => $this->getUserData($user),
            'dashboardContext' => $dashboardContext,
            'currentRole' => $currentRole->value,
            'roleLabel' => $currentRole->label(),
            'stats' => $this->getDashboardStats($user),
            'recentActivity' => $this->getRecentActivity($user),
            'upcomingEvents' => $this->getUpcomingEvents($user),
            'walletData' => $this->getWalletData($user),
            'fundingData' => $this->getFundingData($user),
            'trainingData' => $this->getTrainingData($user),
            'communityData' => $this->getCommunityData($user),
            'quickActions' => $this->getQuickActions($user, $currentRole),
        ]);
    }

    /**
     * Handle role switching
     */
    public function switchRole(Request $request)
    {
        $request->validate([
            'role' => 'required|string',
        ]);

        $user = $request->user();

        try {
            $newRole = RolesEnum::from($request->role);

            if ($user->switchToRole($newRole)) {
                return redirect()->route('dashboard')
                    ->with('success', "Switched to {$newRole->label()} dashboard");
            }
        } catch (\ValueError $e) {
            return redirect()->back()->withErrors(['role' => 'Invalid role specified']);
        }

        return redirect()->back()->withErrors(['role' => 'Cannot switch to this role']);
    }

    private function getUserData($user)
    {
        return [
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'type' => $user->getUserTypeLabel(),
            'primary_role' => $user->primary_role,
            'sector' => $user->sector ?? 'Technology',
            'registrationStatus' => ucfirst($user->registration_status),
            'isVerified' => $user->isVerified(),
            'needsProfileCompletion' => $user->needsProfileCompletion(),
            'communityRank' => $user->community_rank,
            'wallet' => $this->getWalletBalances($user),
            'profile' => $user->profile,
            'activeRoles' => $user->active_roles ?? [],
        ];
    }

    private function getDashboardStats($user)
    {
        $stats = [
            'totalFunding' => $user->fundingApplications()
                ->where('status', 'approved')
                ->sum('amount_requested'),
            'activeFunds' => $user->fundingApplications()
                ->whereIn('status', ['approved', 'disbursed'])
                ->count(),
            'trainingCompleted' => $user->enrollments()
                ->where('status', 'completed')
                ->count(),
            'communityRank' => $user->calculateCommunityRank(),
        ];

        // Role-specific stats
        $currentRole = RolesEnum::from($user->primary_role);

        switch ($currentRole) {
            case RolesEnum::Startup:
                $stats = array_merge($stats, $this->getStartupStats($user));
                break;
            case RolesEnum::SMEOwner:
                $stats = array_merge($stats, $this->getSMEStats($user));
                break;
            case RolesEnum::Investor:
                $stats = array_merge($stats, $this->getInvestorStats($user));
                break;
            case RolesEnum::NYPSenator:
                $stats = array_merge($stats, $this->getSenatorStats($user));
                break;
            case RolesEnum::InstitutionalPartner:
                $stats = array_merge($stats, $this->getInstitutionalStats($user));
                break;
            case RolesEnum::TrainerMentorExpert:
                $stats = array_merge($stats, $this->getTrainerStats($user));
                break;
        }

        // Format currency values
        $stats['totalFunding'] = '₦' . number_format($stats['totalFunding'], 0);

        return $stats;
    }

    private function getStartupStats($user): array
    {
        return [
            'pitchViews' => $user->profile?->pitch_views ?? 0,
            'investorMatches' => $user->vcMatches()->count(),
            'fundingRounds' => count($user->profile?->funding_history ?? []),
            'activeIncubation' => $user->hasRole('incubator_member'),
        ];
    }

    private function getSMEStats($user): array
    {
        return [
            'loanApplications' => $user->fundingApplications()
                ->whereHas('fundType', fn($q) => $q->where('category', 'tradefi'))
                ->count(),
            'businessGrowth' => $this->calculateBusinessGrowth($user),
            'supplierNetwork' => $user->supplierConnections()->count() ?? 0,
        ];
    }

    private function getInvestorStats($user): array
    {
        return [
            'portfolioValue' => $this->calculatePortfolioValue($user),
            'activeInvestments' => $user->investments()->where('status', 'active')->count() ?? 0,
            'roi' => $this->calculateROI($user),
        ];
    }

    private function getSenatorStats($user): array
    {
        return [
            'oversight_reports' => $user->oversightReports()->count() ?? 0,
            'initiatives_approved' => $user->approvedInitiatives()->count() ?? 0,
            'youth_impacted' => $this->calculateYouthImpact($user),
        ];
    }

    private function getInstitutionalStats($user): array
    {
        return [
            'active_partnerships' => $user->partnerships()->where('status', 'active')->count() ?? 0,
            'programs_supported' => $user->supportedPrograms()->count() ?? 0,
            'beneficiaries' => $this->calculateBeneficiaries($user),
        ];
    }

    private function getTrainerStats($user): array
    {
        return [
            'courses_created' => $user->createdCourses()->count(),
            'students_taught' => $user->enrollments()->distinct('user_id')->count('user_id') ?? 0,
            'completion_rate' => $this->calculateCompletionRate($user),
            'active_mentees' => $user->mentoring()->where('status', 'active')->count(),
        ];
    }

    private function getWalletBalances($user)
    {
        $wallets = $user->wallets()->get()->keyBy('currency_type');

        return [
            'usdi' => number_format($wallets->get('USDI')?->balance ?? 0, 2),
            'ind' => number_format($wallets->get('IND')?->balance ?? 0, 2),
            'ngn' => number_format($wallets->get('NGN')?->balance ?? 0, 2),
            'ngni' => number_format($wallets->get('NGNI')?->balance ?? 0, 2),
        ];
    }

    private function getRecentActivity($user)
    {
        $activities = collect();

        // Get recent funding activities
        $fundingActivities = $user->fundingApplications()
            ->with('fundType')
            ->latest()
            ->take(3)
            ->get()
            ->map(function ($application) {
                return [
                    'type' => 'funding',
                    'message' => $application->title . ' ' . $this->getStatusText($application->status),
                    'amount' => '₦' . number_format($application->amount_requested),
                    'time' => $application->created_at->diffForHumans(),
                    'status' => $this->mapStatus($application->status),
                ];
            });

        // Get recent training activities
        $trainingActivities = $user->enrollments()
            ->with('course')
            ->whereIn('status', ['completed', 'in_progress'])
            ->latest('updated_at')
            ->take(2)
            ->get()
            ->map(function ($enrollment) {
                return [
                    'type' => 'training',
                    'message' => $enrollment->course->title . ' ' .
                        ($enrollment->status === 'completed' ? 'completed' : 'in progress'),
                    'time' => ($enrollment->completed_at ?? $enrollment->updated_at)->diffForHumans(),
                    'status' => $enrollment->status === 'completed' ? 'success' : 'pending',
                ];
            });

        // Get recent community activities
        $communityActivities = $user->communityMemberships()
            ->with('community')
            ->latest()
            ->take(2)
            ->get()
            ->map(function ($membership) {
                return [
                    'type' => 'community',
                    'message' => 'Joined ' . $membership->community->name . ' community',
                    'time' => $membership->created_at->diffForHumans(),
                    'status' => 'info',
                ];
            });

        // Get role switching activities
        $roleActivities = collect([]);
        if (count($user->active_roles ?? []) > 1) {
            $roleActivities = collect([
                [
                    'type' => 'role',
                    'message' => 'Applied for additional dashboard access',
                    'time' => $user->updated_at->diffForHumans(),
                    'status' => 'info',
                ]
            ]);
        }

        // Merge and sort all activities
        return $activities
            ->merge($fundingActivities)
            ->merge($trainingActivities)
            ->merge($communityActivities)
            ->merge($roleActivities)
            ->sortByDesc('time')
            ->take(5)
            ->values()
            ->toArray();
    }

    private function getUpcomingEvents($user)
    {
        return Event::where('start_date', '>', now())
            ->where('status', 'registration_open')
            ->when($user->sector, function($query, $sector) {
                return $query->where('target_sector', $sector)
                    ->orWhereNull('target_sector');
            })
            ->orderBy('start_date')
            ->take(3)
            ->get()
            ->map(function ($event) use ($user) {
                $isRegistered = $event->registrations()
                    ->where('user_id', $user->id)
                    ->exists();

                return [
                    'id' => $event->id,
                    'title' => $event->title,
                    'date' => $event->start_date->format('M d, Y'),
                    'type' => ucfirst(str_replace('_', ' ', $event->event_type)),
                    'location' => $event->location,
                    'is_registered' => $isRegistered,
                    'registration_deadline' => $event->registration_deadline?->format('M d, Y'),
                ];
            })
            ->toArray();
    }

    private function getWalletData($user)
    {
        $transactions = $user->transactions()
            ->latest()
            ->take(5)
            ->get()
            ->map(function ($transaction) {
                return [
                    'id' => $transaction->id,
                    'type' => ucfirst($transaction->transaction_type),
                    'amount' => $this->formatTransactionAmount($transaction),
                    'description' => $transaction->description,
                    'time' => $transaction->created_at->diffForHumans(),
                    'status' => $transaction->status,
                    'currency' => $transaction->currency,
                ];
            });

        // Get wallet overview
        $walletOverview = [
            'total_balance_ngn' => $user->getWalletBalance('NGN'),
            'total_balance_usdi' => $user->getWalletBalance('USDI'),
            'total_balance_ind' => $user->getWalletBalance('IND'),
            'recent_transactions_count' => $transactions->count(),
        ];

        return [
            'overview' => $walletOverview,
            'transactions' => $transactions->toArray(),
        ];
    }

    private function getFundingData($user)
    {
        // TradeFi applications
        $tradefiApplications = $user->fundingApplications()
            ->with('fundType')
            ->whereHas('fundType', function($query) {
                $query->where('category', 'tradefi');
            })
            ->latest()
            ->take(5)
            ->get()
            ->map(function ($application) {
                return [
                    'id' => $application->id,
                    'title' => $application->title,
                    'amount' => '₦' . number_format($application->amount_requested),
                    'status' => ucfirst($application->status),
                    'date' => 'Applied: ' . $application->created_at->format('M d, Y'),
                    'fund_type' => $application->fundType->name ?? 'General',
                ];
            });

        // VC/Equity matches
        $vcMatches = $user->vcMatches()
            ->with('investor')
            ->latest()
            ->take(5)
            ->get()
            ->map(function ($match) {
                return [
                    'id' => $match->id,
                    'investor' => $match->investor->name,
                    'stage' => ucfirst(str_replace('_', ' ', $match->funding_stage)),
                    'amount' => $match->amount_offered ? '₦' . number_format($match->amount_offered) : 'TBD',
                    'status' => ucfirst($match->status),
                    'match_percentage' => $match->match_percentage . '%',
                    'date' => $match->created_at->format('M d, Y'),
                ];
            });

        return [
            'tradefi_applications' => $tradefiApplications->toArray(),
            'vc_matches' => $vcMatches->toArray(),
            'funding_summary' => [
                'total_applied' => $user->fundingApplications()->sum('amount_requested'),
                'total_approved' => $user->fundingApplications()->where('status', 'approved')->sum('amount_requested'),
                'pending_applications' => $user->fundingApplications()->whereIn('status', ['pending', 'under_review'])->count(),
            ],
        ];
    }

    private function getTrainingData($user)
    {
        $enrollments = $user->enrollments()
            ->with('course')
            ->get()
            ->groupBy('course.category');

        $trainingStats = [
            'total_enrolled' => $enrollments->flatten()->count(),
            'completed' => $enrollments->flatten()->where('status', 'completed')->count(),
            'in_progress' => $enrollments->flatten()->where('status', 'in_progress')->count(),
        ];

        // Get upcoming events
        $events = Event::whereIn('event_type', ['hackathon', 'bootcamp'])
            ->where('registration_deadline', '>', now())
            ->orderBy('start_date')
            ->take(4)
            ->get()
            ->map(function ($event) use ($user) {
                $userRegistered = $event->registrations()
                    ->where('user_id', $user->id)
                    ->exists();

                return [
                    'id' => $event->id,
                    'event' => $event->title,
                    'date' => $event->start_date->format('F d') . '-' . $event->end_date->format('d, Y'),
                    'prize' => $event->prize_description ?? ('₦' . number_format($event->prize_amount ?? 0)),
                    'status' => $userRegistered ? 'Registered' : 'Open',
                    'type' => $event->event_type,
                    'location' => $event->location,
                ];
            });

        return [
            'stats' => $trainingStats,
            'enrollments' => [
                'soft_skills' => $enrollments->get('soft_skills', collect())->map($this->formatEnrollment())->toArray(),
                'tech_skills' => $enrollments->get('tech_skills', collect())->map($this->formatEnrollment())->toArray(),
                'vocational_skills' => $enrollments->get('vocational_skills', collect())->map($this->formatEnrollment())->toArray(),
            ],
            'events' => $events->toArray(),
        ];
    }

    private function getCommunityData($user)
    {
        $userCommunities = $user->communityMemberships()
            ->with('community')
            ->get()
            ->map(function ($membership) {
                return [
                    'id' => $membership->community->id,
                    'cluster' => $membership->community->name,
                    'members' => number_format($membership->community->member_count ?? 0),
                    'activity' => ucfirst(str_replace('_', ' ', $membership->community->activity_level ?? 'moderate')),
                    'role' => ucfirst($membership->role ?? 'member'),
                    'joined_at' => $membership->created_at->format('M Y'),
                    'description' => $membership->community->description,
                ];
            });

        $recentPosts = ForumPost::with(['user', 'community'])
            ->whereHas('community.memberships', function($query) use ($user) {
                $query->where('user_id', $user->id);
            })
            ->latest()
            ->take(4)
            ->get()
            ->map(function ($post) {
                return [
                    'id' => $post->id,
                    'title' => $post->title,
                    'author' => $post->user->name,
                    'community' => $post->community->name,
                    'replies' => $post->reply_count ?? 0,
                    'time' => $post->created_at->diffForHumans(),
                    'excerpt' => Str::limit($post->content, 100),
                ];
            });

        $mentors = $user->mentorships()
            ->with('mentor.user')
            ->where('status', 'active')
            ->take(3)
            ->get()
            ->map(function ($mentorship) {
                $mentor = $mentorship->mentor;
                return [
                    'id' => $mentor->id,
                    'name' => $mentor->user->name,
                    'title' => $mentor->title ?? 'Mentor',
                    'specialization' => implode(', ', $mentor->specialization ?? []),
                    'initials' => $this->getInitials($mentor->user->name),
                    'next_session' => $mentorship->next_session_at?->format('M d, Y'),
                ];
            });

        return [
            'user_communities' => $userCommunities->toArray(),
            'recent_posts' => $recentPosts->toArray(),
            'mentors' => $mentors->toArray(),
            'community_stats' => [
                'total_communities' => $userCommunities->count(),
                'total_posts' => $user->forumPosts()->count(),
                'mentorship_sessions' => $user->mentorships()->where('status', 'completed')->count(),
            ],
        ];
    }

    private function getQuickActions($user, RolesEnum $currentRole): array
    {
        $baseActions = [
            [
                'id' => 'apply_tradefi',
                'title' => 'Apply TradeFi',
                'description' => 'Apply for trade financing',
                'icon' => 'M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 4L13.5 7H7V9H13.5L15 12L21 9ZM7 12V22H9V18H11V22H13V12H7Z',
                'color' => 'emerald',
                'permission' => PermissionsEnum::ApplyTradeFi->value,
                'route' => 'funding.tradefi.create',
            ],
            [
                'id' => 'browse_courses',
                'title' => 'Browse Courses',
                'description' => 'Explore training opportunities',
                'icon' => 'M12 3L1 9L5 11.18V17.18L12 21L19 17.18V11.18L21 10.09V17H23V9L12 3ZM18.82 9L12 12.72L5.18 9L12 5.28L18.82 9ZM17 16L12 18.72L7 16V12.27L12 15L17 12.27V16Z',
                'color' => 'blue',
                'permission' => PermissionsEnum::AccessTraining->value,
                'route' => 'training.courses',
            ],
            [
                'id' => 'join_community',
                'title' => 'Join Community',
                'description' => 'Connect with sector clusters',
                'icon' => 'M16 4C18.2 4 20 5.8 20 8S18.2 12 16 12 12 10.2 12 8 13.8 4 16 4M16 14C18.7 14 24 15.3 24 18V20H8V18C8 15.3 13.3 14 16 14M8 6C9.1 6 10 6.9 10 8S9.1 10 8 10 6 9.1 6 8 6.9 6 8 6M8 12C10.7 12 16 13.3 16 16V18H0V16C0 13.3 5.3 12 8 12Z',
                'color' => 'teal',
                'permission' => PermissionsEnum::JoinCommunities->value,
                'route' => 'community.index',
            ],
        ];

        // Role-specific actions
        $roleActions = match($currentRole) {
            RolesEnum::Startup => [
                [
                    'id' => 'upload_pitch_deck',
                    'title' => 'Upload Pitch Deck',
                    'description' => 'Update your pitch presentation',
                    'icon' => 'M9 12L11 14L15 10M21 12C21 16.97 16.97 21 12 21C7.03 21 3 16.97 3 12C3 7.03 7.03 3 12 3C16.97 3 21 7.03 21 12Z',
                    'color' => 'purple',
                    'permission' => PermissionsEnum::UploadPitchDeck->value,
                    'route' => 'profile.upload-document',
                ],
                [
                    'id' => 'view_investor_matches',
                    'title' => 'View Investor Matches',
                    'description' => 'See potential investors',
                    'icon' => 'M17 8C17 10.76 14.76 13 12 13S7 10.76 7 8C7 5.24 9.24 3 12 3S17 5.24 17 8ZM12 15C16.42 15 20 16.79 20 19V21H4V19C4 16.79 7.58 15 12 15Z',
                    'color' => 'indigo',
                    'permission' => PermissionsEnum::ViewInvestorMatches->value,
                    'route' => 'startup.investor-matches',
                ],
            ],
            RolesEnum::SMEOwner => [
                [
                    'id' => 'access_sme_tools',
                    'title' => 'SME Tools',
                    'description' => 'Inventory & e-commerce tools',
                    'icon' => 'M20 6L9 17L4 12L5.41 10.59L9 14.17L18.59 4.59L20 6Z',
                    'color' => 'orange',
                    'permission' => PermissionsEnum::AccessSMETools->value,
                    'route' => 'sme.tools.index',
                ],
            ],
            RolesEnum::Investor => [
                [
                    'id' => 'investment_opportunities',
                    'title' => 'Investment Opportunities',
                    'description' => 'Browse investment deals',
                    'icon' => 'M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 4L13.5 7H7V9H13.5L15 12L21 9ZM7 12V22H9V18H11V22H13V12H7Z',
                    'color' => 'green',
                    'permission' => PermissionsEnum::ViewInvestmentOpportunities->value,
                    'route' => 'investor.opportunities.index',
                ],
                [
                    'id' => 'portfolio_dashboard',
                    'title' => 'Portfolio Dashboard',
                    'description' => 'Track your investments',
                    'icon' => 'M3 3H21C21.55 3 22 3.45 22 4V20C22 20.55 21.55 21 21 21H3C2.45 21 2 20.55 2 20V4C2 3.45 2.45 3 3 3ZM4 5V19H20V5H4Z',
                    'color' => 'emerald',
                    'permission' => PermissionsEnum::ManagePortfolio->value,
                    'route' => 'investor.portfolio.index',
                ],
            ],
            RolesEnum::TrainerMentorExpert => [
                [
                    'id' => 'create_course',
                    'title' => 'Create Course',
                    'description' => 'Develop new training content',
                    'icon' => 'M12 2L2 7V10C2 16 6 20.5 12 22C18 20.5 22 16 22 10V7L12 2Z',
                    'color' => 'cyan',
                    'permission' => PermissionsEnum::CreateCourses->value,
                    'route' => 'trainer.courses.create',
                ],
                [
                    'id' => 'manage_mentees',
                    'title' => 'Manage Mentees',
                    'description' => 'View and guide mentees',
                    'icon' => 'M16 4C18.2 4 20 5.8 20 8C20 10.2 18.2 12 16 12C13.8 12 12 10.2 12 8C12 5.8 13.8 4 16 4ZM8 6C9.1 6 10 6.9 10 8C10 9.1 9.1 10 8 10C6.9 10 6 9.1 6 8C6 6.9 6.9 6 8 6ZM8 12C10.7 12 16 13.3 16 16V18H0V16C0 13.3 5.3 12 8 12ZM16 14C18.7 14 24 15.3 24 18V20H18V18C18 16.9 17.6 15.4 16 14Z',
                    'color' => 'violet',
                    'permission' => PermissionsEnum::ManageMentorship->value,
                    'route' => 'trainer.mentees.index',
                ],
            ],
            default => [],
        };

        // Filter actions based on user permissions
        $allActions = array_merge($baseActions, $roleActions);

        return array_values(array_filter($allActions, function ($action) use ($user) {
            return $user->can($action['permission']);
        }));
    }

    // Helper methods
    private function formatTransactionAmount($transaction): string
    {
        $sign = in_array($transaction->transaction_type, ['received', 'deposit']) ? '+' : '-';
        $symbol = $transaction->currency === 'NGN' ? '₦' : '';

        return $sign . $symbol . number_format($transaction->amount, 2) . ' ' . $transaction->currency;
    }

    private function formatEnrollment(): \Closure
    {
        return function ($enrollment) {
            return [
                'id' => $enrollment->id,
                'course' => $enrollment->course->title,
                'progress' => $enrollment->progress_percentage ?? 0,
                'status' => $enrollment->status,
                'instructor' => $enrollment->course->instructor_name ?? 'NYP Instructor',
                'category' => $enrollment->course->category,
                'duration' => $enrollment->course->duration_hours . ' hours',
            ];
        };
    }

    private function getInitials($name): string
    {
        $words = explode(' ', $name);
        return strtoupper(substr($words[0], 0, 1) . (isset($words[1]) ? substr($words[1], 0, 1) : ''));
    }

    private function getStatusText($status): string
    {
        return match($status) {
            'pending' => 'application submitted',
            'under_review' => 'under review',
            'approved' => 'application approved',
            'rejected' => 'application rejected',
            'disbursed' => 'funds disbursed',
            'matched' => 'has been matched',
            'interested' => 'showing interest',
            'reviewing' => 'under review',
            default => 'status updated'
        };
    }

    private function mapStatus($status): string
    {
        return match($status) {
            'approved', 'disbursed', 'completed', 'matched', 'active' => 'success',
            'pending', 'under_review', 'reviewing', 'interested', 'in_progress' => 'pending',
            'rejected', 'failed', 'cancelled', 'suspended' => 'failed',
            default => 'info'
        };
    }

    // Calculation helper methods
    private function calculateBusinessGrowth($user): string
    {
        // This would calculate based on revenue comparison
        // For now, return a placeholder
        return '+12.5%';
    }

    private function calculatePortfolioValue($user): string
    {
        // Calculate total portfolio value
        return '₦' . number_format(0); // Placeholder
    }

    private function calculateROI($user): string
    {
        // Calculate return on investment
        return '+8.7%'; // Placeholder
    }

    private function calculateYouthImpact($user): int
    {
        // Calculate total youth impacted through senator's initiatives
        return 1250; // Placeholder
    }

    private function calculateBeneficiaries($user): int
    {
        // Calculate beneficiaries of institutional partnerships
        return 850; // Placeholder
    }

    private function calculateCompletionRate($user): string
    {
        $totalEnrollments = $user->enrollments()->count();
        if ($totalEnrollments === 0) return '0%';

        $completed = $user->enrollments()->where('status', 'completed')->count();
        return round(($completed / $totalEnrollments) * 100) . '%';
    }
}
