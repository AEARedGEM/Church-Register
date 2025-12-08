import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import { Transition } from '@headlessui/react';
import { useForm, router } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';

interface User {
    id: number;
    name: string;
    primary_role: string;
    active_roles?: string[];
    profile?: any;
}

interface DashboardContext {
    current_role: string;
    role_label: string;
    available_roles: string[];
    can_switch_roles: boolean;
    active_roles: string[];
    has_cpd_access: boolean;
}

interface SelectOption {
    id: string;
    name: string;
    description?: string;
}

interface RoleApplicationFormProps {
    className?: string;
    user: User;
    dashboardContext: DashboardContext;
    availableRoles: SelectOption[];
}

export default function RoleApplicationForm({
    className = '',
    user,
    dashboardContext,
    availableRoles,
}: RoleApplicationFormProps) {
    const [selectedRole, setSelectedRole] = useState<string>('');
    const [showApplication, setShowApplication] = useState<boolean>(false);

    const { data, setData, post, errors, processing, recentlySuccessful } = useForm({
        role: '',
    });

    const handleRoleSelection = (roleId: string) => {
        setSelectedRole(roleId);
        setData('role', roleId);
        setShowApplication(true);
    };

    const submitApplication: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('profile.apply-for-role'), {
            onSuccess: () => {
                setShowApplication(false);
                setSelectedRole('');
            },
        });
    };

    const switchRole = (roleId: string) => {
        router.post(route('profile.switch-role'), { role: roleId });
    };

    const getRoleIcon = (roleId: string) => {
        const icons = {
            startup: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z',
            sme_owner: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4',
            investor: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
            nyp_senator: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
            institutional_partner: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4',
            trainer_mentor_expert: 'M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z',
        };
        return icons[roleId as keyof typeof icons] || 'M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4';
    };

    const getRoleColor = (roleId: string) => {
        const colors = {
            startup: 'bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-900/20 dark:text-purple-300 dark:border-purple-800',
            sme_owner: 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800',
            investor: 'bg-green-100 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800',
            nyp_senator: 'bg-indigo-100 text-indigo-700 border-indigo-200 dark:bg-indigo-900/20 dark:text-indigo-300 dark:border-indigo-800',
            institutional_partner: 'bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-900/20 dark:text-orange-300 dark:border-orange-800',
            trainer_mentor_expert: 'bg-teal-100 text-teal-700 border-teal-200 dark:bg-teal-900/20 dark:text-teal-300 dark:border-teal-800',
        };
        return colors[roleId as keyof typeof colors] || 'bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-900/20 dark:text-gray-300 dark:border-gray-800';
    };

    const getRoleRequirements = (roleId: string) => {
        const requirements = {
            startup: [
                'Business name and description',
                'Business stage (idea, MVP, growth, etc.)',
                'Funding needs assessment',
                'Pitch deck upload (optional but recommended)'
            ],
            sme_owner: [
                'CAC registration number',
                'Business operations details',
                'Employee count and annual turnover',
                'Market reach information'
            ],
            investor: [
                'Investor type classification',
                'Preferred investment sectors',
                'Investment ticket sizes',
                'KYC documentation for verification'
            ],
            nyp_senator: [
                'District/constituency information',
                'Official ID verification',
                'Office address and contact details',
                'Valid NYP membership credentials'
            ],
            institutional_partner: [
                'Institution registration details',
                'Sector of operation',
                'Contact person information',
                'Areas of commitment and partnership'
            ],
            trainer_mentor_expert: [
                'Professional bio and experience',
                'Expertise areas and certifications',
                'Training delivery mode preferences',
                'References or portfolio (recommended)'
            ],
        };
        return requirements[roleId as keyof typeof requirements] || [];
    };

    const getSelectedRoleData = () => {
        return availableRoles.find(role => role.id === selectedRole);
    };

    return (
        <section className={className}>
            <header className="mb-6">
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    Role Applications & Management
                </h2>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Apply for additional roles to access specialized dashboards and features.
                </p>
            </header>

            {/* Current Role Status */}
            <div className="mb-8 p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg border border-emerald-200 dark:border-emerald-800">
                <div className="flex items-start gap-3">
                    <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-800 rounded-lg flex items-center justify-center">
                            <svg className="w-5 h-5 text-emerald-600 dark:text-emerald-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-sm font-medium text-emerald-800 dark:text-emerald-200">
                            Current Active Role: {dashboardContext.role_label}
                        </h3>
                        <p className="text-sm text-emerald-700 dark:text-emerald-300 mt-1">
                            You currently have access to the {dashboardContext.role_label} dashboard and its features.
                        </p>
                        {dashboardContext.active_roles.length > 1 && (
                            <div className="mt-2">
                                <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium mb-2">
                                    Switch to other active roles:
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {dashboardContext.active_roles
                                        .filter(role => role !== dashboardContext.current_role)
                                        .map((role) => (
                                            <button
                                                key={role}
                                                onClick={() => switchRole(role)}
                                                className="inline-flex items-center px-2.5 py-1 bg-white dark:bg-gray-800 text-emerald-700 dark:text-emerald-300 text-xs font-medium rounded border border-emerald-200 dark:border-emerald-700 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors"
                                            >
                                                Switch to {role.replace('_', ' ')}
                                            </button>
                                        ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Available Roles */}
            {availableRoles.length > 0 ? (
                <>
                    <div className="mb-6">
                        <h3 className="text-base font-medium text-gray-900 dark:text-white mb-4">
                            Available Roles to Apply For
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {availableRoles.map((role) => (
                                <div
                                    key={role.id}
                                    className={`p-4 rounded-lg border transition-all cursor-pointer hover:shadow-md ${
                                        selectedRole === role.id
                                            ? getRoleColor(role.id)
                                            : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                                    }`}
                                    onClick={() => handleRoleSelection(role.id)}
                                >
                                    <div className="flex items-start gap-3">
                                        <div className="flex-shrink-0">
                                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                                                selectedRole === role.id
                                                    ? 'bg-white/20'
                                                    : 'bg-gray-100 dark:bg-gray-700'
                                            }`}>
                                                <svg
                                                    className={`w-5 h-5 ${
                                                        selectedRole === role.id
                                                            ? 'text-current'
                                                            : 'text-gray-600 dark:text-gray-300'
                                                    }`}
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={getRoleIcon(role.id)} />
                                                </svg>
                                            </div>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="text-sm dark:text-white font-medium">
                                                {role.name}
                                            </h4>
                                            <p className="text-xs dark:text-gray-300 opacity-75 mt-1">
                                                {role.description}
                                            </p>
                                            {selectedRole === role.id && (
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setShowApplication(true);
                                                    }}
                                                    className="mt-3 text-xs font-medium underline hover:no-underline"
                                                >
                                                    View Requirements & Apply →
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Application Form */}
                    {showApplication && selectedRole && (
                        <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                                <div className="mb-6">
                                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                                        Apply for {getSelectedRoleData()?.name}
                                    </h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        {getSelectedRoleData()?.description}
                                    </p>
                                </div>

                                {/* Requirements */}
                                <div className="mb-6">
                                    <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
                                        Requirements for this role:
                                    </h4>
                                    <ul className="space-y-2">
                                        {getRoleRequirements(selectedRole).map((requirement, index) => (
                                            <li key={index} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                                                <svg className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                                {requirement}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Profile Completion Check */}
                                <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                                    <div className="flex items-start gap-3">
                                        <svg className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                        </svg>
                                        <div>
                                            <h5 className="text-sm font-medium text-blue-800 dark:text-blue-200">
                                                Profile Requirements
                                            </h5>
                                            <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                                                Make sure you've completed your business profile with the required information for this role.
                                                You can update your profile in the "Business Profile" section.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Application Form */}
                                <form onSubmit={submitApplication}>
                                    <div className="mb-6">
                                        <InputLabel htmlFor="role_confirmation" value="Confirm Role Application" />
                                        <div className="mt-2 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                            <p className="text-sm text-gray-700 dark:text-gray-300">
                                                I confirm that I want to apply for the <strong>{getSelectedRoleData()?.name}</strong> role
                                                and understand that my profile will be reviewed for eligibility.
                                            </p>
                                        </div>
                                    </div>

                                    <InputError className="mt-2" message={errors.role} />

                                    <div className="flex items-center gap-4">
                                        <PrimaryButton disabled={processing}>
                                            {processing ? 'Submitting Application...' : 'Submit Application'}
                                        </PrimaryButton>

                                        <SecondaryButton
                                            type="button"
                                            onClick={() => {
                                                setShowApplication(false);
                                                setSelectedRole('');
                                            }}
                                        >
                                            Cancel
                                        </SecondaryButton>

                                        <Transition
                                            show={recentlySuccessful}
                                            enter="transition ease-in-out"
                                            enterFrom="opacity-0"
                                            leave="transition ease-in-out"
                                            leaveTo="opacity-0"
                                        >
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                Application submitted successfully!
                                            </p>
                                        </Transition>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}
                </>
            ) : (
                <div className="text-center py-8">
                    <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                        No Additional Roles Available
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                        You currently have access to all available roles in the NYP-IP system.
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Complete your profile to unlock additional opportunities as they become available.
                    </p>
                </div>
            )}
        </section>
    );
}
