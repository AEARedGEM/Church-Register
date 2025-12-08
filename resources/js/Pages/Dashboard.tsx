import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';

interface User {
    id: number;
    name: string;
    email: string;
    type: string;
    primary_role: string;
    sector: string;
    registrationStatus: string;
    isVerified: boolean;
    needsProfileCompletion: boolean;
    communityRank: number;
    activeRoles: string[];
    wallet: {
        usdi: string;
        ind: string;
        ngn: string;
        ngni: string;
    };
}

interface DashboardContext {
    current_role: string;
    role_label: string;
    available_roles: string[];
    can_switch_roles: boolean;
    active_roles: string[];
    has_cpd_access: boolean;
}

interface Stats {
    totalFunding: string;
    activeFunds: number;
    trainingCompleted: number;
    communityRank: number;
    [key: string]: any;
}

interface RecentActivity {
    type: string;
    message: string;
    time: string;
    status: 'success' | 'pending' | 'info' | 'failed';
    amount?: string;
}

interface UpcomingEvent {
    id: number;
    title: string;
    date: string;
    type: string;
    location?: string;
    is_registered: boolean;
    registration_deadline?: string;
}

interface WalletData {
    overview: {
        total_balance_ngn: number;
        total_balance_usdi: number;
        total_balance_ind: number;
        recent_transactions_count: number;
    };
    transactions: Transaction[];
}

interface Transaction {
    id: number;
    type: string;
    amount: string;
    description: string;
    time: string;
    status: string;
    currency: string;
}

interface QuickAction {
    id: string;
    title: string;
    description: string;
    icon: string;
    color: string;
    permission: string;
    route: string;
}

interface TabItem {
    id: string;
    name: string;
    icon: string;
}

type ActiveTab = 'overview' | 'wallet' | 'funding' | 'training' | 'community' | 'naps';

interface DashboardProps {
    user: User;
    dashboardContext: DashboardContext;
    currentRole: string;
    roleLabel: string;
    stats: Stats;
    recentActivity: RecentActivity[];
    upcomingEvents: UpcomingEvent[];
    walletData: WalletData;
    fundingData: any;
    trainingData: any;
    communityData: any;
    quickActions: QuickAction[];
}

export default function Dashboard({
    user,
    dashboardContext,
    currentRole,
    roleLabel,
    stats,
    recentActivity,
    upcomingEvents,
    walletData,
    fundingData,
    trainingData,
    communityData,
    quickActions
}: DashboardProps) {
    const [activeTab, setActiveTab] = useState<ActiveTab>('overview');

    const tabs: TabItem[] = [
        {
            id: 'overview',
            name: 'Overview',
            icon: 'M3 7V5C3 3.9 3.9 3 5 3H19C20.1 3 21 3.9 21 5V7M3 7L12 12L21 7M3 7V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V7'
        },
        {
            id: 'naps',
            name: 'NAP Survey',
            icon: 'M9 12L11 14.5L21 4.5M3 3H21V21H3V3Z'
        },
        {
            id: 'wallet',
            name: 'Web3 Wallet',
            icon: 'M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1Z'
        },
        {
            id: 'funding',
            name: 'Funding',
            icon: 'M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 4L13.5 7H7V9H13.5L15 12L21 9ZM7 12V22H9V18H11V22H13V12H7Z'
        },
        {
            id: 'training',
            name: 'Training',
            icon: 'M12 3L1 9L5 11.18V17.18L12 21L19 17.18V11.18L21 10.09V17H23V9L12 3Z'
        },
        {
            id: 'community',
            name: 'Community',
            icon: 'M16 4C18.2 4 20 5.8 20 8S18.2 12 16 12 12 10.2 12 8 13.8 4 16 4M16 14C18.7 14 24 15.3 24 18V20H8V18C8 15.3 13.3 14 16 14M8 6C9.1 6 10 6.9 10 8S9.1 10 8 10 6 9.1 6 8 6.9 6 8 6M8 12C10.7 12 16 13.3 16 16V18H0V16C0 13.3 5.3 12 8 12Z'
        },

    ]; // <-- Add this closing bracket and semicolon to end the tabs array

    function formatRoleLabel(label: string) {
        const formatted = label
            .toLowerCase()
            .replace(/\b\w/g, (char) => char.toUpperCase()); // Sentence case

        return formatted
            .replace(/\bSme\b/gi, "SME")
            .replace(/\bNyp\b/gi, "NYP"); // Force SME & NYP to uppercase
        }

    const handleRoleSwitch = (newRole: string) => {
        router.post(route('dashboard.switch-role'), { role: newRole }, {
            onSuccess: () => {
                // Optionally show success message
            },
            onError: (errors) => {
                console.error('Role switch failed:', errors);
            }
        });
    };

//     function formatRoleLabel(label) {
//   return label
//     .toLowerCase()
//     .replace(/\b\w/g, (char) => char.toUpperCase()) // Capitalize each word
//     .replace(/\bSme\b/gi, "SME") // Keep SME uppercase
//     .replace(/\bNyp\b/gi, "NYP"); // Keep NYP uppercase
// }

    const handleQuickAction = (action: QuickAction) => {
        // Check if the route is an external URL
        if (action.route.startsWith('http://') || action.route.startsWith('https://')) {
            window.open(action.route, '_blank');
        } else {
            router.visit(route(action.route));
        }
    };

    const getStatusColor = (status: string): string => {
        return {
            success: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
            pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
            failed: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
            info: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
        }[status] || 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    };

    const getActionColorClasses = (color: string) => {
        const colorMap = {
            emerald: 'bg-emerald-100 dark:bg-emerald-900 group-hover:bg-emerald-200 dark:group-hover:bg-emerald-800 text-emerald-600 dark:text-emerald-400',
            blue: 'bg-blue-100 dark:bg-blue-900 group-hover:bg-blue-200 dark:group-hover:bg-blue-800 text-blue-600 dark:text-blue-400',
            purple: 'bg-purple-100 dark:bg-purple-900 group-hover:bg-purple-200 dark:group-hover:bg-purple-800 text-purple-600 dark:text-purple-400',
            teal: 'bg-teal-100 dark:bg-teal-900 group-hover:bg-teal-200 dark:group-hover:bg-teal-800 text-teal-600 dark:text-teal-400',
            orange: 'bg-orange-100 dark:bg-orange-900 group-hover:bg-orange-200 dark:group-hover:bg-orange-800 text-orange-600 dark:text-orange-400',
            green: 'bg-green-100 dark:bg-green-900 group-hover:bg-green-200 dark:group-hover:bg-green-800 text-green-600 dark:text-green-400',
            indigo: 'bg-indigo-100 dark:bg-indigo-900 group-hover:bg-indigo-200 dark:group-hover:bg-indigo-800 text-indigo-600 dark:text-indigo-400',
            cyan: 'bg-cyan-100 dark:bg-cyan-900 group-hover:bg-cyan-200 dark:group-hover:bg-cyan-800 text-cyan-600 dark:text-cyan-400',
            violet: 'bg-violet-100 dark:bg-violet-900 group-hover:bg-violet-200 dark:group-hover:bg-violet-800 text-violet-600 dark:text-violet-400',
        };
        return colorMap[color as keyof typeof colorMap] || colorMap.emerald;
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                            NYP Industrialization Program
                        </h2>

                    </div>
                    <div className="flex items-center gap-3">
                        {/* Role Switcher */}
                    {dashboardContext.can_switch_roles && dashboardContext.available_roles.length > 0 && (
                    <div className="relative w-56">
                        <select
                        value={currentRole}
                        onChange={(e) => handleRoleSwitch(e.target.value)}
                        className="w-full text-sm bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-gray-700 dark:text-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition duration-150 ease-in-out"
                        >
                        <option value={currentRole}>{formatRoleLabel(roleLabel)}</option>
                        {dashboardContext.available_roles.map((role) => (
                            <option key={role} value={role}>
                            {formatRoleLabel(role.replace('_', ' '))}
                            </option>
                        ))}
                        </select>
                    </div>
                    )}

                    </div>
                </div>
            }
        >
            <Head title="NYP-IP Dashboard" />

        <div className="py-6">
            <div className="mx-auto sm:px-6 lg:px-8 space-y-6">

    {/* Profile Completion Alert */}
    {user.needsProfileCompletion && (
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
            <div className="flex">
                <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <div className="ml-3">
                    <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                        Complete Your Profile To Unlock All Features & Access Specialized Dashboards & Roles
                        (Startup, Investor, NYP Senator, Partner, Trainer, etc.)
                    </h3>
                    {/* <p className="mt-2 text-sm text-yellow-700 dark:text-yellow-300">
                        Complete Your Profile To Access Specialized Dashboards & Roles
                        (Startup, Investor, NYP Senator, Partner, Trainer, etc.).
                    </p> */}
                    <button
                        onClick={() => router.visit(route('profile.edit'))}
                        className="mt-3 text-sm text-yellow-600 dark:text-yellow-400 underline hover:text-yellow-500"
                    >
                        Complete Profile →
                    </button>
                </div>
            </div>
        </div>
            )}

    {/* Quick Stats Cards - Horizontal Scroll on Mobile */}
    <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
        <div className="flex gap-4 sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:gap-6 min-w-max sm:min-w-0">
            {/* Total Funding Card */}
            <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700 p-4 md:p-6 w-72 sm:w-auto flex-shrink-0 sm:flex-shrink">
                <div className="flex items-center">
                    <div className="flex-shrink-0">
                        <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
                            <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 4L13.5 7H7V9H13.5L15 12L21 9ZM7 12V22H9V18H11V22H13V12H7Z"/>
                            </svg>
                        </div>
                    </div>
                    <div className="ml-3 md:ml-4 flex-1 min-w-0">
                        <div className="text-sm md:text-base font-medium text-gray-500 dark:text-gray-400">Total Funding</div>
                        <div className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white truncate">{stats.totalFunding}</div>
                    </div>
                </div>
            </div>

            {/* Active Funds Card */}
            <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700 p-4 md:p-6 w-72 sm:w-auto flex-shrink-0 sm:flex-shrink">
                <div className="flex items-center">
                    <div className="flex-shrink-0">
                        <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
                            <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M16 4C18.2 4 20 5.8 20 8C20 10.2 18.2 12 16 12C13.8 12 12 10.2 12 8C12 5.8 13.8 4 16 4ZM8 6C9.1 6 10 6.9 10 8C10 9.1 9.1 10 8 10C6.9 10 6 9.1 6 8C6 6.9 6.9 6 8 6ZM8 12C10.7 12 16 13.3 16 16V18H0V16C0 13.3 5.3 12 8 12ZM16 14C18.7 14 24 15.3 24 18V20H18V18C18 16.9 17.6 15.4 16 14Z"/>
                            </svg>
                        </div>
                    </div>
                    <div className="ml-3 md:ml-4 flex-1 min-w-0">
                        <div className="text-sm md:text-base font-medium text-gray-500 dark:text-gray-400">Active Funds</div>
                        <div className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">{stats.activeFunds}</div>
                    </div>
                </div>
            </div>

            {/* Training Completed Card */}
            <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700 p-4 md:p-6 w-72 sm:w-auto flex-shrink-0 sm:flex-shrink">
                <div className="flex items-center">
                    <div className="flex-shrink-0">
                        <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
                            <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 3L1 9L5 11.18V17.18L12 21L19 17.18V11.18L21 10.09V17H23V9L12 3ZM18.82 9L12 12.72L5.18 9L12 5.28L18.82 9ZM17 16L12 18.72L7 16V12.27L12 15L17 12.27V16Z"/>
                            </svg>
                        </div>
                    </div>
                    <div className="ml-3 md:ml-4 flex-1 min-w-0">
                        <div className="text-sm md:text-base font-medium text-gray-500 dark:text-gray-400">Training Completed</div>
                        <div className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">{stats.trainingCompleted}</div>
                    </div>
                </div>
            </div>

            {/* Community Rank Card */}
            <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700 p-4 md:p-6 w-72 sm:w-auto flex-shrink-0 sm:flex-shrink">
                <div className="flex items-center">
                    <div className="flex-shrink-0">
                        <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
                            <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M16 4C18.2 4 20 5.8 20 8S18.2 12 16 12 12 10.2 12 8 13.8 4 16 4M16 14C18.7 14 24 15.3 24 18V20H8V18C8 15.3 13.3 14 16 14M8 6C9.1 6 10 6.9 10 8S9.1 10 8 10 6 9.1 6 8 6.9 6 8 6M8 12C10.7 12 16 13.3 16 16V18H0V16C0 13.3 5.3 12 8 12Z"/>
                            </svg>
                        </div>
                    </div>
                    <div className="ml-3 md:ml-4 flex-1 min-w-0">
                        <div className="text-sm md:text-base font-medium text-gray-500 dark:text-gray-400">Community Rank</div>
                        <div className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">#{stats.communityRank}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>


    {/* Navigation Tabs */}
    <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="flex overflow-x-auto px-4" aria-label="Tabs">
                <div className="flex space-x-4 md:space-x-8">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as ActiveTab)}
                            className={`${
                                activeTab === tab.id
                                    ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                            } whitespace-nowrap py-3 md:py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 transition-colors`}
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={tab.icon} />
                            </svg>
                            <span>{formatRoleLabel(tab.name)}</span>
                        </button>
                    ))}
                </div>
            </nav>
        </div>

        <div className="p-4 md:p-6">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
                <div className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Recent Activity */}
                        <div>
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Recent Activity</h3>
                            <div className="space-y-3">
                                {recentActivity.length > 0 ? recentActivity.map((activity, index) => (
                                    <div key={index} className="flex items-start gap-3 p-3 md:p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                        <div className={`flex-shrink-0 w-2 h-2 mt-2 rounded-full ${
                                            activity.status === 'success' ? 'bg-green-500' :
                                            activity.status === 'pending' ? 'bg-yellow-500' :
                                            activity.status === 'failed' ? 'bg-red-500' : 'bg-blue-500'
                                        }`}></div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                                                {activity.message}
                                            </p>
                                            <div className="flex items-center justify-between mt-1">
                                                <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">{activity.time}</p>
                                                {activity.amount && (
                                                    <span className="text-xs md:text-sm font-medium text-emerald-600 dark:text-emerald-400">
                                                        {activity.amount}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )) : (
                                    <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                                        <p>No recent activity yet</p>
                                        <p className="text-sm mt-1">Start by exploring training or applying for funding</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Upcoming Events */}
                        <div>
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Upcoming Events</h3>
                            <div className="space-y-3">
                                {upcomingEvents.length > 0 ? upcomingEvents.map((event, index) => (
                                    <div key={index} className="p-3 md:p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                <h4 className="text-sm font-medium text-gray-900 dark:text-white">{event.title}</h4>
                                                <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 mt-1">
                                                    {event.date} • {event.location || 'Virtual'}
                                                </p>
                                                {event.registration_deadline && (
                                                    <p className="text-xs text-orange-600 dark:text-orange-400 mt-1">
                                                        Registration deadline: {event.registration_deadline}
                                                    </p>
                                                )}
                                            </div>
                                            <div className="flex flex-col items-end gap-2">
                                                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200">
                                                    {event.type}
                                                </span>
                                                {event.is_registered ? (
                                                    <span className="text-xs text-green-600 dark:text-green-400 font-medium">
                                                        ✓ Registered
                                                    </span>
                                                ) : (
                                                    <button className="text-xs text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 font-medium">
                                                        Register →
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )) : (
                                    <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                                        <p>No upcoming events</p>
                                        <p className="text-sm mt-1">Check back later for new opportunities</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                            Quick Actions for {roleLabel}
                        </h3>
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                            {quickActions.map((action) => (
                                <button
                                    key={action.id}
                                    onClick={() => handleQuickAction(action)}
                                    className="p-3 text-center border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors group"
                                >
                                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center mx-auto mb-2 transition-colors ${getActionColorClasses(action.color)}`}>
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                            <path d={action.icon}/>
                                        </svg>
                                    </div>
                                    <span className="text-xs md:text-sm font-medium text-gray-900 dark:text-white block">
                                        {action.title}
                                    </span>
                                    <span className="text-xs text-gray-500 dark:text-gray-400 block mt-1">
                                        {action.description}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}


                {/* Other tab contents would continue here following the same pattern... */}
        {activeTab === 'wallet' && (
        <div className="space-y-6">
        {/* Mobile: 2x2 Grid | Desktop: 4 Column Grid */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
        {/* USDI Balance */}
        <div className="bg-gradient-to-r from-emerald-500 to-pink-600 rounded-xl p-4 md:p-6 text-white">
        <div className="flex items-center justify-between mb-2 md:mb-4">
            <h3 className="text-sm md:text-lg font-medium">Industrial USD</h3>
            <span className="text-xs md:text-sm opacity-80">USDI</span>
        </div>
        <div className="text-xl md:text-3xl font-bold mb-2 md:mb-3">${user.wallet.usdi}</div>
        <div className="flex gap-1 md:gap-2">
            <button className="flex-1 bg-white/20 hover:bg-white/30 py-1.5 md:py-2 px-2 md:px-3 rounded-lg text-xs md:text-sm font-medium transition-colors">
            Send
            </button>
            <button className="flex-1 bg-white/20 hover:bg-white/30 py-1.5 md:py-2 px-2 md:px-3 rounded-lg text-xs md:text-sm font-medium transition-colors">
            Receive
            </button>
            <button className="flex-1 bg-white/20 hover:bg-white/30 py-1.5 md:py-2 px-2 md:px-3 rounded-lg text-xs md:text-sm font-medium transition-colors">
            Swap
            </button>
        </div>
        </div>

        {/* IND Balance */}
        <div className="bg-gradient-to-r from-emerald-500 to-purple-600 rounded-xl p-4 md:p-6 text-white">
        <div className="flex items-center justify-between mb-2 md:mb-4">
            <h3 className="text-sm md:text-lg font-medium">Industrial Fund</h3>
            <span className="text-xs md:text-sm opacity-80">$IND</span>
        </div>
        <div className="text-xl md:text-3xl font-bold mb-2 md:mb-3">{user.wallet.ind}</div>
        <div className="flex gap-1 md:gap-2">
            <button className="flex-1 bg-white/20 hover:bg-white/30 py-1.5 md:py-2 px-2 md:px-3 rounded-lg text-xs md:text-sm font-medium transition-colors">
            Send
            </button>
            <button className="flex-1 bg-white/20 hover:bg-white/30 py-1.5 md:py-2 px-2 md:px-3 rounded-lg text-xs md:text-sm font-medium transition-colors">
            Receive
            </button>
            <button className="flex-1 bg-white/20 hover:bg-white/30 py-1.5 md:py-2 px-2 md:px-3 rounded-lg text-xs md:text-sm font-medium transition-colors">
            Swap
            </button>
        </div>
        </div>

        {/* NGNI Balance */}
        <div className="bg-gradient-to-r from-emerald-500 to-blue-600 rounded-xl p-4 md:p-6 text-white">
        <div className="flex items-center justify-between mb-2 md:mb-4">
            <h3 className="text-sm md:text-lg font-medium">Industrial Naira</h3>
            <span className="text-xs md:text-sm opacity-80">NGNI</span>
        </div>
        <div className="text-xl md:text-3xl font-bold mb-2 md:mb-3">{user.wallet.ngni}</div>
        <div className="flex gap-1 md:gap-2">
            <button className="flex-1 bg-white/20 hover:bg-white/30 py-1.5 md:py-2 px-2 md:px-3 rounded-lg text-xs md:text-sm font-medium transition-colors">
            Send
            </button>
            <button className="flex-1 bg-white/20 hover:bg-white/30 py-1.5 md:py-2 px-2 md:px-3 rounded-lg text-xs md:text-sm font-medium transition-colors">
            Receive
            </button>
            <button className="flex-1 bg-white/20 hover:bg-white/30 py-1.5 md:py-2 px-2 md:px-3 rounded-lg text-xs md:text-sm font-medium transition-colors">
            Swap
            </button>
        </div>
        </div>

        {/* NGN Balance */}
        <div className="bg-gradient-to-r from-emerald-500 to-orange-600 rounded-xl p-4 md:p-6 text-white">
        <div className="flex items-center justify-between mb-2 md:mb-4">
            <h3 className="text-sm md:text-lg font-medium">Naira</h3>
            <span className="text-xs md:text-sm opacity-80">NGN</span>
        </div>
        <div className="text-xl md:text-3xl font-bold mb-2 md:mb-3">₦{user.wallet.ngn}</div>
        <div className="flex gap-1 md:gap-2">
            <button className="flex-1 bg-white/20 hover:bg-white/30 py-1.5 md:py-2 px-2 md:px-3 rounded-lg text-xs md:text-sm font-medium transition-colors">
            Send
            </button>
            <button className="flex-1 bg-white/20 hover:bg-white/30 py-1.5 md:py-2 px-2 md:px-3 rounded-lg text-xs md:text-sm font-medium transition-colors">
            Receive
            </button>
            <button className="flex-1 bg-white/20 hover:bg-white/30 py-1.5 md:py-2 px-2 md:px-3 rounded-lg text-xs md:text-sm font-medium transition-colors">
            Swap
            </button>
        </div>
        </div>
        </div>
        </div>
        )}
            {activeTab === 'funding' && (
                <div className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="space-y-4">
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white">TradeFi Funding</h3>
                            <div className="space-y-3">
                                {[
                                    { title: 'Working Capital Fund', amount: '₦0.00', status: 'Available', date: '' },
                                    { title: 'Expansion Fund', amount: '₦0.00', status: 'Availalbe', date: '' }
                                ].map((app, index) => (
                                    <div key={index} className="p-3 md:p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
                                        <div className="flex items-start justify-between mb-2">
                                            <h4 className="text-sm font-medium text-gray-900 dark:text-white">{app.title}</h4>
                                            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                                                app.status === 'approved' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                                                app.status === 'pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                                                'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                                            }`}>
                                                {app.status.replace('_', ' ')}
                                            </span>
                                        </div>
                                        <div className="text-base md:text-lg font-semibold text-emerald-600 dark:text-emerald-400 mb-1">{app.amount}</div>
                                        <div className="text-xs text-gray-500 dark:text-gray-400">{app.date}</div>
                                    </div>
                                ))}
                            </div>
                            <a
                                href="https://luxuryxtech.org.ng/#financing"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full block"
                            >
                                <button className="w-full py-2 md:py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition-colors">
                                    Apply for New TradeFi Fund
                                </button>
                            </a>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Tokenization Funding</h3>
                            <div className="space-y-3">
                                {[
                                    { title: 'StartUp Funding', amount: '₦0.00', status: 'Available', date: '' },
                                    { title: 'Expansion Fund', amount: '₦0.00', status: 'Available', date: '' }
                                ].map((app, index) => (
                                    <div key={index} className="p-3 md:p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
                                        <div className="flex items-start justify-between mb-2">
                                            <h4 className="text-sm font-medium text-gray-900 dark:text-white">{app.title}</h4>
                                            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                                                app.status === 'approved' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                                                app.status === 'pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                                                'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                                            }`}>
                                                {app.status.replace('_', ' ')}
                                            </span>
                                        </div>
                                        <div className="text-base md:text-lg font-semibold text-emerald-600 dark:text-emerald-400 mb-1">{app.amount}</div>
                                        <div className="text-xs text-gray-500 dark:text-gray-400">{app.date}</div>
                                    </div>
                                ))}
                            </div>
                            <a
                                href="https://luxuryxtech.org.ng/tokenization"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full block"
                            >
                                <button className="w-full py-2 md:py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition-colors">
                                    Kickstart Tokenization Application
                                </button>
                            </a>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Equity & VC Funding</h3>
                            <div className="space-y-3">
                                {[
                                    { investor: 'NYP Industrialization Fund', stage: 'Series A', amount: '₦0.00', status: '', match: '0%' },
                                    { investor: 'Other VC Funds', stage: 'Series A', amount: '₦0.00', status: '', match: '0%' },

                                ].map((vc, index) => (
                                    <div key={index} className="p-3 md:p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
                                        <div className="flex items-start justify-between mb-2">
                                            <h4 className="text-sm font-medium text-gray-900 dark:text-white">{vc.investor}</h4>
                                            <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">{vc.match} match</span>
                                        </div>
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-xs md:text-sm text-gray-600 dark:text-gray-400">{vc.stage}</span>
                                            <span className="text-sm font-semibold text-gray-900 dark:text-white">{vc.amount}</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                                                vc.status === 'matched' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                                                vc.status === 'interested' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                                                'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                                            }`}>
                                                {vc.status}
                                            </span>
                                            {/* <button className="text-xs text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 font-medium">
                                                View Details →
                                            </button> */}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <button className="w-full py-2 md:py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition-colors">
                                Apply for VC Funding
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'training' && (
            <div className="text-center py-12">
                <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
                Checkout Your Training Dashboard
                </p>
                <a
                    href='/training'
                    className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 inline-block"
                >
                    Explore Trainings
                </a>
            </div>
            )}

            {activeTab === 'naps' && (
            <div className="text-center py-12">
                <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
                Checkout NAP Survey
                </p>
                <a
                    href='/naps'
                    className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 inline-block"
                >
                    Explore NAP
                </a>
            </div>
            )}


            {activeTab === 'community' && (
                <div className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Sector Clusters */}
                        <div>
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Your Sector Clusters</h3>
                            <div className="space-y-3">
                                {[
                                    { cluster: 'Technology & Innovation', members: '0', activity: 'Very Active', role: 'Member' },
                                    { cluster: 'Agriculture & Food Processing', members: '0', activity: 'Active', role: 'Contributor' },
                                    { cluster: 'Manufacturing & Trade', members: '0', activity: 'Moderate', role: 'Observer' },
                                    { cluster: 'Finace', members: '0', activity: 'Moderate', role: 'Observer' },
                                    { cluster: 'Logistics', members: '0', activity: 'Active', role: 'Observer' },
                                    { cluster: 'Communications', members: '0', activity: 'Moderate', role: 'Observer' }
                                ].map((cluster, index) => (
                                    <div key={index} className="p-3 md:p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                                        <div className="flex items-start justify-between mb-2">
                                            <h4 className="text-sm font-medium text-gray-900 dark:text-white">{cluster.cluster}</h4>
                                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200">
                                                {cluster.role}
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between text-xs md:text-sm text-gray-600 dark:text-gray-400">
                                            <span>{cluster.members} members</span>
                                            <span className={`${
                                                cluster.activity === 'Very Active' ? 'text-green-600 dark:text-green-400' :
                                                cluster.activity === 'Active' ? 'text-blue-600 dark:text-blue-400' : 'text-yellow-600 dark:text-yellow-400'
                                            }`}>
                                                {cluster.activity}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Recent Forum Activity */}
                        <div>
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Mentorship Program</h3>
                            <div className="space-y-3">
                                    <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                            <div className="p-3 md:p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full flex items-center justify-center">
                                        <span className="text-white font-medium text-xs">AO</span>
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-medium text-gray-900 dark:text-white">Dr. Adunni Okafor</h4>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">Senior Business Strategist</p>
                                    </div>
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">Specializes in scaling tech startups and business model optimization.</p>
                                <button className="w-full py-2 px-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs md:text-sm font-medium rounded-lg transition-colors">
                                    Schedule Session
                                </button>
                            </div>

                            <div className="p-3 md:p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
                                        <span className="text-white font-medium text-xs">EM</span>
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-medium text-gray-900 dark:text-white">Engr. Emeka Mbachu</h4>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">Tech Innovation Lead</p>
                                    </div>
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">Expert in product development, technical architecture, and team building.</p>
                                <button className="w-full py-2 px-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs md:text-sm font-medium rounded-lg transition-colors">
                                    Schedule Session
                                </button>
                            </div>
                            <div className="p-3 md:p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
                                        <span className="text-white font-medium text-xs">EM</span>
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-medium text-gray-900 dark:text-white">Engr. Emeka Mbachu</h4>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">Tech Innovation Lead</p>
                                    </div>
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">Expert in product development, technical architecture, and team building.</p>
                                <button className="w-full py-2 px-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs md:text-sm font-medium rounded-lg transition-colors">
                                    Schedule Session
                                </button>
                            </div>
                        </div>
                            </div>
                        </div>
                    </div>


                </div>
            )}
        </div>
    </div>

    {/* NYP Success Story Highlight */}
    <div className="bg-gradient-to-r from-emerald-500/10 to-teal-500/10 dark:from-emerald-600/20 dark:to-teal-600/20 rounded-xl p-4 md:p-6 border border-emerald-200 dark:border-emerald-800">
        <div className="flex flex-col md:flex-row items-start gap-4">
            <div className="flex-shrink-0">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 md:w-8 md:h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2L2 7V10C2 16 6 20.5 12 22C18 20.5 22 16 22 10V7L12 2Z"/>
                    </svg>
                </div>
            </div>
            <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        NYP Believes in You — We Empower Nation Builders
                    </h3>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200">
                        Testimonials
                    </span>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                    "NYP-IP (Portal) is poised to change the entreprenerial development narrative, the vision is huge and global, an intercourse of StartUp Incubation, Equity Funding, Training Programs, TrdeFi Funding."
                </p>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center">
                            <span className="text-white font-medium text-xs">AT</span>
                        </div>
                        <div>
                            <div className="text-sm font-medium text-gray-900 dark:text-white">Adebayo Ademola</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">Featured Success Story • Tech Entrepreneur</div>
                        </div>
                    </div>
                    <button className="text-sm text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 font-medium">
                        Read Full Story →
                    </button>
                </div>
            </div>
        </div>
    </div>
    </div>
    </div>
    </AuthenticatedLayout>
    );
}
