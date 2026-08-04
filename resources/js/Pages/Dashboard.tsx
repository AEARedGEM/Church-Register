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

function BalancesDropdown({ user }: { user: User }) {
    const [open, setOpen] = useState(false);

    return (
        <div className="relative">
            <button
                type="button"
                onClick={() => setOpen((s) => !s)}
                className="flex items-center gap-2 rounded-md border border-slate-700 bg-slate-950/80 px-3 py-2 text-sm font-medium text-white hover:bg-slate-900"
            >
                USD
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {open && (
                <div className="absolute right-0 mt-2 w-64 rounded-lg bg-slate-950/90 border border-slate-800/80 p-3 shadow-lg shadow-slate-950/40 z-50">
                    <div className="py-2 flex justify-between text-sm text-slate-200">
                        <span>Industrial Naira</span>
                        <span className="font-semibold text-white">{user.wallet.ngn ? `₦${user.wallet.ngn}` : '₦0.00'}</span>
                    </div>
                    <div className="py-2 flex justify-between text-sm text-emerald-200">
                        <span>Industrial USD</span>
                        <span className="font-semibold text-white">{user.wallet.usdi ? `$${user.wallet.usdi}` : '$0.00'}</span>
                    </div>
                    <div className="py-2 flex justify-between text-sm text-emerald-200">
                        <span>Industrial Fund</span>
                        <span className="font-semibold text-white">{user.wallet.ind ?? '0.00'}</span>
                    </div>
                    <div className="py-2 flex justify-between text-sm text-slate-200">
                        <span>Industrial NGN</span>
                        <span className="font-semibold text-white">{user.wallet.ngni ?? '0.00'}</span>
                    </div>
                </div>
            )}
        </div>
    );
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
    napsCompleted: number;
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
            id: 'funding',
            name: 'Startup Tokenization',
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

    ];

    const sidebarItems = [
        {
            id: 'overview',
            label: 'Overview',
            type: 'tab',
            target: 'overview',
            icon: 'M3 7V5C3 3.9 3.9 3 5 3H19C20.1 3 21 3.9 21 5V7M3 7L12 12L21 7M3 7V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V7'
        },
        {
            id: 'naps',
            label: 'NAP Survey',
            type: 'route',
            route: 'naps.public',
            icon: 'M9 12L11 14.5L21 4.5M3 3H21V21H3V3Z'
        },
        {
            id: 'startup-tokenization',
            label: 'Startup Tokenization',
            type: 'route',
            route: 'funding',
            icon: 'M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 4L13.5 7H7V9H13.5L15 12L21 9ZM7 12V22H9V18H11V22H13V12H7Z'
        },
        {
            id: 'tradefi-tokenization',
            label: 'TradeFi Tokenization',
            type: 'route',
            route: 'funding',
            icon: 'M3 3H21V21H3V3Z'
        },
        {
            id: 'training',
            label: 'Training',
            type: 'route',
            route: 'training.dashboard',
            icon: 'M12 3L1 9L5 11.18V17.18L12 21L19 17.18V11.18L21 10.09V17H23V9L12 3Z'
        },
        {
            id: 'community',
            label: 'Community',
            type: 'route',
            route: 'community.index',
            icon: 'M16 4C18.2 4 20 5.8 20 8S18.2 12 16 12 12 10.2 12 8 13.8 4 16 4M16 14C18.7 14 24 15.3 24 18V20H8V18C8 15.3 13.3 14 16 14M8 6C9.1 6 10 6.9 10 8S9.1 10 8 10 6 9.1 6 8 6.9 6 8 6M8 12C10.7 12 16 13.3 16 16V18H0V16C0 13.3 5.3 12 8 12Z'
        },
    ];

    const featureCards = [
        {
            id: 'naps',
            title: 'NAP Survey',
            description: 'Open the public survey dashboard and review community insights.',
            route: 'naps.public',
            color: 'emerald',
            icon: 'M9 12L11 14.5L21 4.5M3 3H21V21H3V3Z'
        },
        {
            id: 'startup-tokenization',
            title: 'Startup Tokenization',
            description: 'Apply for startup funding and tokenization support.',
            route: 'funding',
            color: 'emerald',
            icon: 'M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 4L13.5 7H7V9H13.5L15 12L21 9ZM7 12V22H9V18H11V22H13V12H7Z'
        },
        {
            id: 'tradefi-tokenization',
            title: 'TradeFi Tokenization',
            description: 'Explore TradeFi tokenization opportunities and market access.',
            route: 'funding',
            color: 'purple',
            icon: 'M3 3H21V21H3V3Z'
        },
        {
            id: 'training',
            title: 'Training',
            description: 'Access training courses and learning resources.',
            route: 'training.dashboard',
            color: 'teal',
            icon: 'M12 3L1 9L5 11.18V17.18L12 21L19 17.18V11.18L21 10.09V17H23V9L12 3Z'
        },
        {
            id: 'community',
            title: 'Community',
            description: 'Join the community and connect with peers and mentors.',
            route: 'community.index',
            color: 'orange',
            icon: 'M16 4C18.2 4 20 5.8 20 8S18.2 12 16 12 12 10.2 12 8 13.8 4 16 4M16 14C18.7 14 24 15.3 24 18V20H8V18C8 15.3 13.3 14 16 14M8 6C9.1 6 10 6.9 10 8S9.1 10 8 10 6 9.1 6 8 6.9 6 8 6M8 12C10.7 12 16 13.3 16 16V18H0V16C0 13.3 5.3 12 8 12Z'
        },
    ];

    const handleSidebarClick = (item: { type: string; target?: string; route?: string }) => {
        if (item.type === 'tab' && item.target) {
            setActiveTab(item.target as ActiveTab);
            return;
        }

        if (item.type === 'route' && item.route) {
            router.visit(route(item.route));
        }
    };

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
            info: 'bg-slate-100 text-slate-800 dark:bg-slate-900 dark:text-slate-100',
        }[status] || 'bg-slate-100 text-slate-900 dark:bg-slate-900 dark:text-slate-100';
    };

    const getActionColorClasses = (color: string) => {
        // Use softer slate backgrounds with emerald accent text for actions
        const slateAction = 'bg-slate-100 dark:bg-slate-900 group-hover:bg-slate-200 dark:group-hover:bg-slate-800 text-slate-700 dark:text-slate-300';
        return slateAction;
    };

    return (
        <AuthenticatedLayout
            mobileNavItems={sidebarItems}
            header={
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h2 className="text-xl font-semibold leading-tight text-slate-900 dark:text-white">
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
                        className="w-full text-sm bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition duration-150 ease-in-out"
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

    <div className="grid grid-cols-1 gap-6">
        <aside className="hidden lg:block">
            <div className="fixed top-[132px] left-0 bottom-0 z-30 h-[calc(100vh-132px)] w-[260px] overflow-auto border-r border-slate-800/70 bg-slate-950 text-slate-200 shadow-lg shadow-slate-950/40">
                <div className="px-4 pt-8 pb-3" />
                <nav className="space-y-2 px-4 pb-4 pt-2">
                    {sidebarItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => handleSidebarClick(item)}
                            className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-medium transition ${activeTab === item.target ? 'bg-slate-700/20 text-emerald-300 shadow-inner' : 'text-slate-300 hover:bg-slate-900/80 hover:text-white'}`}
                        >
                            <svg className={`w-5 h-5 shrink-0 ${activeTab === item.target ? 'text-emerald-300' : 'text-slate-300'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                            </svg>
                            <span className="truncate">{item.label}</span>
                        </button>
                    ))}
                </nav>
            </div>
        </aside>

        <section className="space-y-6 lg:ml-[calc(260px+2rem)]">
            <div className="grid gap-6">
                <div className="bg-slate-950 border border-slate-800 rounded-3xl p-6 shadow-sm text-white">
                    {/* Compact Account Balance card (wide, short) with dropdown metrics */}
                    <div className="relative flex items-center justify-between gap-4 h-28">
                        <div>
                            <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Account Balance</p>
                            <p className="mt-1 text-3xl font-semibold text-white">{user.wallet.ngn ? `₦${user.wallet.ngn}` : '₦0.00'}</p>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <BalancesDropdown user={user} />
                            </div>

                            <button className="rounded-full border border-slate-700 bg-slate-950/80 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-900">Rates</button>
                            <button className="rounded-full bg-emerald-500 px-3 py-2 text-sm font-semibold text-white transition hover:bg-emerald-400">+ Add</button>
                            <button className="rounded-full border border-slate-700 bg-slate-950/80 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-900">Send</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {featureCards.map((feature) => (
                    <button
                        key={feature.id}
                        onClick={() => router.visit(route(feature.route))}
                        className={`rounded-3xl border border-slate-200 bg-white/90 dark:border-slate-800 dark:bg-slate-950/90 p-5 text-left text-slate-900 dark:text-slate-100 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md hover:border-emerald-200/70`}
                    >
                        <div className="flex items-center justify-between gap-4">
                            <div>
                                <p className="text-sm font-semibold text-slate-900 dark:text-white">{feature.title}</p>
                                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{feature.description}</p>
                            </div>
                            <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100 text-slate-700 shadow-sm dark:bg-slate-800 dark:text-slate-200">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={feature.icon} />
                                </svg>
                            </span>
                        </div>
                    </button>
                ))}
            </div>
        </section>
    </div>

    {/* Compact Recent Activity (tabs collapsed) */}
    <div className="bg-slate-950/95 shadow-sm rounded-[24px] border border-slate-800/70 overflow-hidden p-4 md:p-6 lg:ml-[calc(300px+2rem)]">
        <h3 className="text-lg font-medium text-white mb-2">Recent Activity</h3>
        <div className="text-center py-6 md:py-8 text-slate-300">
            <p>No recent activity yet</p>
            <p className="text-sm mt-1 text-slate-400">Start by exploring training or applying for funding</p>
        </div>
    </div>

    {/* NYP Success Story Highlight removed as requested */}
    </div>
    </div>
    </AuthenticatedLayout>
    );
}
