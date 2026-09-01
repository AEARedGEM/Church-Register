<?php

namespace App\Enum;

enum RolesEnum: string
{
    // Primary Dashboard Role - Entry point for all users
    case Individual = 'individual';

    // Specialized Roles based on APGA Worldwide requirements
    case Startup = 'startup';
    case SMEOwner = 'sme_owner';
    case Investor = 'investor';
    case NYPSenator = 'nyp_senator';
    case InstitutionalPartner = 'institutional_partner';
    case TrainerMentorExpert = 'trainer_mentor_expert';

    // System Admin Roles
    case SuperAdmin = 'super_admin';
    case Admin = 'admin';
    case Manager = 'manager';
    case Support = 'support';

    public static function labels(): array
    {
        return [
            self::SuperAdmin => 'Super Administrator',
            self::Admin => 'Administrator',
            self::Manager => 'Manager',
            self::Support => 'Support Agent',
            self::Individual => 'Individual (Primary Beneficiary)',
            self::Startup => 'Startup Founder',
            self::SMEOwner => 'SME Owner',
            self::Investor => 'Investor',
            self::NYPSenator => 'NYP Senator',
            self::InstitutionalPartner => 'Institutional Partner',
            self::TrainerMentorExpert => 'Trainer/Mentor/Expert',
        ];
    }

    public function label(): string
    {
        return match($this) {
            self::SuperAdmin => 'Super Administrator',
            self::Admin => 'Administrator',
            self::Manager => 'Manager',
            self::Support => 'Support Agent',
            self::Individual => 'Individual (Primary Beneficiary)',
            self::Startup => 'Startup Founder',
            self::SMEOwner => 'SME Owner',
            self::Investor => 'Investor',
            self::NYPSenator => 'NYP Senator',
            self::InstitutionalPartner => 'Institutional Partner',
            self::TrainerMentorExpert => 'Trainer/Mentor/Expert',
        };
    }

    /**
     * Get roles that have access to specialized dashboards
     */
    public static function getSpecializedRoles(): array
    {
        return [
            self::Startup->value,
            self::SMEOwner->value,
            self::Investor->value,
            self::NYPSenator->value,
            self::InstitutionalPartner->value,
            self::TrainerMentorExpert->value,
        ];
    }

    /**
     * Get primary dashboard roles (everyone starts here)
     */
    public static function getPrimaryDashboardRoles(): array
    {
        return array_keys(self::labels());
    }

    /**
     * Check if role can apply for additional roles
     */
    public function canApplyForAdditionalRoles(): bool
    {
        return match($this) {
            self::SuperAdmin, self::Admin => false, // System roles cannot switch
            default => true,
        };
    }
}
