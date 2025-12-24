import { useForm, router } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';

interface SelectOption {
    id: string;
    name: string;
    description?: string;
}

interface DashboardContext {
    current_role: string;
    role_label: string;
    available_roles: string[];
    can_switch_roles: boolean;
    active_roles: string[];
    has_cpd_access: boolean;
}

interface User {
    id: number;
    name: string;
    primary_role: string;
    active_roles?: string[];
    profile?: any;
}

export default function RoleApplicationForm({
    className = '',
    user,
    dashboardContext,
    availableRoles = [],
}: {
    className?: string;
    user: User;
    dashboardContext: DashboardContext;
    availableRoles: SelectOption[];
}) {
    const [selectedRole, setSelectedRole] = useState('');
    const [showApplication, setShowApplication] = useState(false);
    const { data, setData, post, errors, processing, recentlySuccessful } = useForm({
        role: '',
    });

    // Safely ensure data
    const roles = Array.isArray(availableRoles) ? availableRoles : [];
    const dashCtx = dashboardContext || { role_label: 'Unknown', active_roles: [], current_role: '' };

    const handleRoleSelection = (roleId: string) => {
        setSelectedRole(roleId);
        setData('role', roleId);
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

    return (
        <section className={className}>
            <div className="mb-6">
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    Role Applications & Management
                </h2>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Apply for additional roles to access specialized dashboards and features.
                </p>
            </div>

            {/* Current Role Status */}
            <div className="mb-8 p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg border border-emerald-200 dark:border-emerald-800">
                <h3 className="text-sm font-medium text-emerald-800 dark:text-emerald-200">
                    Current Active Role: {dashCtx.role_label}
                </h3>
                <p className="text-sm text-emerald-700 dark:text-emerald-300 mt-1">
                    You currently have access to the {dashCtx.role_label} dashboard and its features.
                </p>
                {dashCtx.active_roles && dashCtx.active_roles.length > 1 && (
                    <div className="mt-3">
                        <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium mb-2">
                            Switch to other active roles:
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {dashCtx.active_roles
                                .filter(role => role !== dashCtx.current_role)
                                .map((role) => (
                                    <button
                                        key={role}
                                        onClick={() => switchRole(role)}
                                        className="px-2.5 py-1 bg-white dark:bg-gray-800 text-emerald-700 dark:text-emerald-300 text-xs font-medium rounded border border-emerald-200 dark:border-emerald-700 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors"
                                    >
                                        Switch to {role.replace('_', ' ')}
                                    </button>
                                ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Available Roles */}
            {roles.length > 0 ? (
                <div>
                    <h3 className="text-base font-medium text-gray-900 dark:text-white mb-4">
                        Available Roles to Apply For ({roles.length})
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        {roles.map((role) => (
                            <div
                                key={role.id}
                                className="p-4 rounded-lg border bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-all cursor-pointer"
                                onClick={() => handleRoleSelection(role.id)}
                            >
                                <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                                    {role.name}
                                </h4>
                                <p className="text-xs text-gray-600 dark:text-gray-400 opacity-75 mt-1">
                                    {role.description}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Application Form */}
                    {showApplication && selectedRole && (
                        <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                                    Apply for {roles.find(r => r.id === selectedRole)?.name}
                                </h3>

                                <form onSubmit={submitApplication}>
                                    <div className="mb-6">
                                        <p className="text-sm text-gray-700 dark:text-gray-300">
                                            I confirm that I want to apply for this role and understand that my profile will be reviewed for eligibility.
                                        </p>
                                    </div>

                                    {errors.role && (
                                        <div className="mb-4 text-sm text-red-600 dark:text-red-400">
                                            {errors.role}
                                        </div>
                                    )}

                                    <div className="flex items-center gap-4">
                                        <button
                                            type="submit"
                                            disabled={processing}
                                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                                        >
                                            {processing ? 'Submitting...' : 'Submit Application'}
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => {
                                                setShowApplication(false);
                                                setSelectedRole('');
                                            }}
                                            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                                        >
                                            Cancel
                                        </button>

                                        {recentlySuccessful && (
                                            <p className="text-sm text-green-600 dark:text-green-400">
                                                Application submitted successfully!
                                            </p>
                                        )}
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <div className="text-center py-8 bg-gray-50 dark:bg-gray-700 rounded-lg">
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
