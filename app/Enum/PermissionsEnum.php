<?php

namespace App\Enum;

enum PermissionsEnum: string
{
    // System Administration
    case ViewUsers = 'view_users';
    case CreateUsers = 'create_users';
    case EditUsers = 'edit_users';
    case DeleteUsers = 'delete_users';
    case ImpersonateUsers = 'impersonate_users';

    // Role Management
    case ViewRoles = 'view_roles';
    case CreateRoles = 'create_roles';
    case EditRoles = 'edit_roles';
    case DeleteRoles = 'delete_roles';
    case ManageRoles = 'manage_roles';
    case SwitchRoles = 'switch_roles';

    // Permission Management
    case ViewPermissions = 'view_permissions';
    case EditPermissions = 'edit_permissions';

    // Dashboard Access - CPD (Current Primary Dashboard) - Universal Access
    case AccessCPD = 'access_cpd';
    case ViewDashboard = 'view_dashboard';
    case CustomizeDashboard = 'customize_dashboard';

    // Profile Management
    case ViewProfile = 'view_profile';
    case EditProfile = 'edit_profile';
    case UploadProfileImage = 'upload_profile_image';

    // Web3 Wallet Management
    case ViewWallet = 'view_wallet';
    case ManageWallet = 'manage_wallet';
    case SendTokens = 'send_tokens';
    case ReceiveTokens = 'receive_tokens';
    case SwapTokens = 'swap_tokens';
    case ViewTransactions = 'view_transactions';

    // Funding Module Permissions
    case ViewFunding = 'view_funding';
    case ApplyFunding = 'apply_funding';
    case ViewFundingApplications = 'view_funding_applications';
    case ManageFundingApplications = 'manage_funding_applications';
    case ApproveFunding = 'approve_funding';
    case DisburseFunding = 'disburse_funding';

    // TradeFi Specific
    case AccessTradeFi = 'access_tradefi';
    case ApplyTradeFi = 'apply_tradefi';
    case ManageTradeFi = 'manage_tradefi';

    // Startup Specific Permissions
    case AccessStartupDashboard = 'access_startup_dashboard';
    case ManageStartupProfile = 'manage_startup_profile';
    case UploadPitchDeck = 'upload_pitch_deck';
    case AccessIncubation = 'access_incubation';
    case ViewInvestorMatches = 'view_investor_matches';
    case ManageStartupMetrics = 'manage_startup_metrics';

    // SME Specific Permissions
    case AccessSMEDashboard = 'access_sme_dashboard';
    case ManageSMEProfile = 'manage_sme_profile';
    case AccessSMETools = 'access_sme_tools';
    case ViewTradeFinance = 'view_trade_finance';
    case AccessBusinessAdvisory = 'access_business_advisory';

    // Investor Specific Permissions
    case AccessInvestorDashboard = 'access_investor_dashboard';
    case ViewInvestmentOpportunities = 'view_investment_opportunities';
    case ManagePortfolio = 'manage_portfolio';
    case AccessDealRoom = 'access_deal_room';
    case MakeInvestments = 'make_investments';
    case ViewInvestmentReturns = 'view_investment_returns';

    // NYP Senator Specific Permissions
    case AccessSenatorDashboard = 'access_senator_dashboard';
    case ViewOversightReports = 'view_oversight_reports';
    case ManageOversight = 'manage_oversight';
    case ApproveInitiatives = 'approve_initiatives';
    case AccessCaucusTools = 'access_caucus_tools';
    case ViewImpactMetrics = 'view_impact_metrics';

    // Institutional Partner Permissions
    case AccessInstitutionalDashboard = 'access_institutional_dashboard';
    case ManagePartnerships = 'manage_partnerships';
    case UploadMOU = 'upload_mou';
    case AccessResourceSharing = 'access_resource_sharing';
    case ViewPartnershipShowcase = 'view_partnership_showcase';

    // Trainer/Mentor/Expert Permissions
    case AccessTrainerDashboard = 'access_trainer_dashboard';
    case CreateCourses = 'create_courses';
    case ManageCourses = 'manage_courses';
    case ViewLearners = 'view_learners';
    case ManageMentorship = 'manage_mentorship';
    case AccessLearnerAssessment = 'access_learner_assessment';
    case UploadTrainingContent = 'upload_training_content';

    // Training Module Permissions (All Users)
    case AccessTraining = 'access_training';
    case EnrollCourses = 'enroll_courses';
    case ViewCourses = 'view_courses';
    case CompleteCourses = 'complete_courses';
    case ViewCertificates = 'view_certificates';
    case DownloadCertificates = 'download_certificates';
    case AccessHackathons = 'access_hackathons';
    case RegisterEvents = 'register_events';

    // Community Module Permissions
    case AccessCommunity = 'access_community';
    case JoinCommunities = 'join_communities';
    case CreateCommunities = 'create_communities';
    case ManageCommunities = 'manage_communities';
    case PostInForums = 'post_in_forums';
    case ModerateForums = 'moderate_forums';
    case AccessMentorship = 'access_mentorship';
    case RequestMentor = 'request_mentor';
    case BecomeMentor = 'become_mentor';

    // Document Management
    case ViewDocuments = 'view_documents';
    case UploadDocuments = 'upload_documents';
    case EditDocuments = 'edit_documents';
    case DeleteDocuments = 'delete_documents';
    case DownloadDocuments = 'download_documents';

    // Reporting and Analytics
    case ViewReports = 'view_reports';
    case GenerateReports = 'generate_reports';
    case ExportReports = 'export_reports';
    case ViewAnalytics = 'view_analytics';
    case ViewSystemMetrics = 'view_system_metrics';

    // Compliance and KYC
    case ViewKYC = 'view_kyc';
    case ManageKYC = 'manage_kyc';
    case VerifyAccounts = 'verify_accounts';
    case AccessAuditLogs = 'access_audit_logs';

    // Settings and System
    case ViewSettings = 'view_settings';
    case EditSettings = 'edit_settings';
    case ViewSystemLogs = 'view_system_logs';
    case ManageSystemSettings = 'manage_system_settings';

    // Basic Navigation
    case NavigateApplication = 'navigate_application';

    /**
     * Get permissions grouped by categories
     */
    public static function getPermissionGroups(): array
    {
        return [
            'System Administration' => [
                self::ViewUsers,
                self::CreateUsers,
                self::EditUsers,
                self::DeleteUsers,
                self::ImpersonateUsers,
                self::ViewRoles,
                self::CreateRoles,
                self::EditRoles,
                self::DeleteRoles,
                self::ManageRoles,
            ],
            'Dashboard & Profile' => [
                self::AccessCPD,
                self::ViewDashboard,
                self::CustomizeDashboard,
                self::ViewProfile,
                self::EditProfile,
                self::UploadProfileImage,
            ],
            'Web3 Wallet' => [
                self::ViewWallet,
                self::ManageWallet,
                self::SendTokens,
                self::ReceiveTokens,
                self::SwapTokens,
                self::ViewTransactions,
            ],
            'Funding' => [
                self::ViewFunding,
                self::ApplyFunding,
                self::ViewFundingApplications,
                self::ManageFundingApplications,
                self::AccessTradeFi,
                self::ApplyTradeFi,
            ],
            'Training' => [
                self::AccessTraining,
                self::EnrollCourses,
                self::ViewCourses,
                self::CompleteCourses,
                self::ViewCertificates,
                self::AccessHackathons,
            ],
            'Community' => [
                self::AccessCommunity,
                self::JoinCommunities,
                self::PostInForums,
                self::AccessMentorship,
                self::RequestMentor,
            ],
        ];
    }

    /**
     * Get role-specific permissions
     */
    public static function getRolePermissions(RolesEnum $role): array
    {
        return match($role) {
            RolesEnum::SuperAdmin => array_map(fn($case) => $case->value, self::cases()),

            RolesEnum::Admin => [
                // System management
                self::ViewUsers->value,
                self::EditUsers->value,
                self::ManageRoles->value,
                // All dashboard access
                self::AccessCPD->value,
                self::ViewDashboard->value,
                // All reporting
                self::ViewReports->value,
                self::GenerateReports->value,
                self::ViewAnalytics->value,
                // KYC and compliance
                self::ManageKYC->value,
                self::VerifyAccounts->value,
                self::AccessAuditLogs->value,
            ],

            RolesEnum::Individual => [
                // Basic access
                self::AccessCPD->value,
                self::ViewDashboard->value,
                self::ViewProfile->value,
                self::EditProfile->value,
                self::NavigateApplication->value,
                self::SwitchRoles->value,

                // Web3 wallet
                self::ViewWallet->value,
                self::ManageWallet->value,
                self::SendTokens->value,
                self::ReceiveTokens->value,
                self::ViewTransactions->value,

                // Funding access
                self::ViewFunding->value,
                self::ApplyFunding->value,

                // Training access
                self::AccessTraining->value,
                self::EnrollCourses->value,
                self::ViewCourses->value,
                self::CompleteCourses->value,
                self::ViewCertificates->value,
                self::AccessHackathons->value,
                self::RegisterEvents->value,

                // Community access
                self::AccessCommunity->value,
                self::JoinCommunities->value,
                self::PostInForums->value,
                self::AccessMentorship->value,
                self::RequestMentor->value,
            ],

            RolesEnum::Startup => [
                // Inherits all Individual permissions plus:
                ...self::getRolePermissions(RolesEnum::Individual),

                // Startup specific
                self::AccessStartupDashboard->value,
                self::ManageStartupProfile->value,
                self::UploadPitchDeck->value,
                self::AccessIncubation->value,
                self::ViewInvestorMatches->value,
                self::ManageStartupMetrics->value,
            ],

            RolesEnum::SMEOwner => [
                // Inherits all Individual permissions plus:
                ...self::getRolePermissions(RolesEnum::Individual),

                // SME specific
                self::AccessSMEDashboard->value,
                self::ManageSMEProfile->value,
                self::AccessSMETools->value,
                self::ViewTradeFinance->value,
                self::AccessBusinessAdvisory->value,
                self::AccessTradeFi->value,
                self::ApplyTradeFi->value,
            ],

            RolesEnum::Investor => [
                // Basic access
                self::AccessCPD->value,
                self::ViewDashboard->value,
                self::ViewProfile->value,
                self::EditProfile->value,

                // Investor specific
                self::AccessInvestorDashboard->value,
                self::ViewInvestmentOpportunities->value,
                self::ManagePortfolio->value,
                self::AccessDealRoom->value,
                self::MakeInvestments->value,
                self::ViewInvestmentReturns->value,

                // Web3 wallet for investment
                self::ViewWallet->value,
                self::ManageWallet->value,
                self::SendTokens->value,
                self::ReceiveTokens->value,
            ],

            RolesEnum::NYPSenator => [
                // Basic access
                self::AccessCPD->value,
                self::ViewDashboard->value,
                self::ViewProfile->value,
                self::EditProfile->value,

                // Senator specific
                self::AccessSenatorDashboard->value,
                self::ViewOversightReports->value,
                self::ManageOversight->value,
                self::ApproveInitiatives->value,
                self::AccessCaucusTools->value,
                self::ViewImpactMetrics->value,

                // Reporting access
                self::ViewReports->value,
                self::GenerateReports->value,
                self::ViewAnalytics->value,
            ],

            RolesEnum::InstitutionalPartner => [
                // Basic access
                self::AccessCPD->value,
                self::ViewDashboard->value,
                self::ViewProfile->value,
                self::EditProfile->value,

                // Institutional specific
                self::AccessInstitutionalDashboard->value,
                self::ManagePartnerships->value,
                self::UploadMOU->value,
                self::AccessResourceSharing->value,
                self::ViewPartnershipShowcase->value,

                // Document management
                self::ViewDocuments->value,
                self::UploadDocuments->value,
            ],

            RolesEnum::TrainerMentorExpert => [
                ...array_intersect(
                    self::getRolePermissions(RolesEnum::Individual),
                    [
                        self::AccessCPD->value,
                        self::ViewDashboard->value,
                        self::ViewProfile->value,
                        self::EditProfile->value,
                        self::AccessCommunity->value,
                    ]
                ),

                // Trainer specific
                self::AccessTrainerDashboard->value,
                self::CreateCourses->value,
                self::ManageCourses->value,
                self::ViewLearners->value,
                self::ManageMentorship->value,
                self::AccessLearnerAssessment->value,
                self::UploadTrainingContent->value,
                self::BecomeMentor->value,
                self::ModerateForums->value,
            ],

            default => [
                self::NavigateApplication->value,
                self::ViewProfile->value,
            ],
        };
    }
}
