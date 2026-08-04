import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import napsApi from '@/services/napsApi';
import LgaProductsLinkage from './Naps/Dashboard/LgaProductsLinkage';

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

interface NapsStatsData {
    totalRespondents: number;
    surveysCompleted: number;
    verifiedUsers: number;
    statesReached: number;
}

interface NapsChartData {
    employmentData: any[];
    skillsData: any[];
    productsData: any[];
    fundingData: any[];
    stateData: any[];
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
    const [napsStats, setNapsStats] = useState<NapsStatsData>({
        totalRespondents: 0,
        surveysCompleted: 0,
        verifiedUsers: 0,
        statesReached: 0,
    });
    const [napsCharts, setNapsCharts] = useState<NapsChartData>({
        employmentData: [],
        skillsData: [],
        productsData: [],
        fundingData: [],
        stateData: [],
    });
    const [expandedDataModal, setExpandedDataModal] = useState<string | null>(null);

    useEffect(() => {
        const loadNapsDashboard = async () => {
            try {
                const response = await napsApi.getDashboardStats();
                if (response?.success) {
                    setNapsStats(response.stats);
                    setNapsCharts(response.charts);
                }
            } catch (error) {
                console.error('Failed to load NAPS dashboard data:', error);
            }
        };

        loadNapsDashboard();
    }, []);

    const tabs: TabItem[] = [
        {
            id: 'overview',
            name: 'Overview',
            icon: 'M3 7V5C3 3.9 3.9 3 5 3H19C20.1 3 21 3.9 21 5V7M3 7L12 12L21 7M3 7V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V7'
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

    const COLORS = ['#059669', '#10B981', '#34D399', '#6EE7B7', '#A7F3D0'];
    const featuredProducts = [...(napsCharts.productsData || [])]
        .sort((a: any, b: any) => (b.value || 0) - (a.value || 0))
        .slice(0, 6);
    const featuredSkills = [...(napsCharts.skillsData || [])]
        .sort((a: any, b: any) => (b.count || 0) - (a.count || 0))
        .slice(0, 6);
    const featuredFunding = [...(napsCharts.fundingData || [])]
        .sort((a: any, b: any) => (b.value || 0) - (a.value || 0))
        .slice(0, 6);
    const stateSignals = [...(napsCharts.stateData || [])].slice(0, 6);
    const compactSkillItems = featuredSkills.slice(0, 4);
    const extraSkillItems = featuredSkills.slice(4);
    const compactFundingItems = featuredFunding.slice(0, 4);
    const extraFundingItems = featuredFunding.slice(4);
    const compactStateSignals = stateSignals.slice(0, 4);
    const extraStateSignals = stateSignals.slice(4);
    const strategicPillars = [
        {
            title: 'Ward-level intelligence',
            copy: 'Every response helps map local priority products and support needs from ward to national policy.',
        },
        {
            title: 'OWOP readiness',
            copy: 'The strongest product signals are converted into ward-based industrial focus areas with export potential.',
        },
        {
            title: 'Quarterly tokenization pipeline',
            copy: 'The top-performing startups are identified every quarter or half-year for support, visibility and scale-up.',
        },
    ];

    return (
        <AuthenticatedLayout
            mobileNavItems={sidebarItems}
        >
            <Head title="NYP-IP Dashboard" />

        <div className="py-3">
            <div className="mx-auto sm:px-6 lg:px-8 space-y-3">

    <div className="grid grid-cols-1 gap-3">
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

        <section className="space-y-3 lg:ml-[calc(260px+2rem)]">
            <div className="grid gap-3">
                <div className="bg-slate-950 border border-slate-800 rounded-3xl p-4 shadow-sm text-white">
                    {/* Compact Account Balance card (wide, short) with dropdown metrics */}
                    <div className="relative flex items-center justify-between gap-4 h-14">
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

            <div className="space-y-5 rounded-3xl border border-slate-800 bg-slate-950/95 p-5 shadow-sm text-white">
                <section className="rounded-3xl border border-emerald-200/50 bg-slate-950/90 pt-10 pb-6 px-6 text-white shadow-sm">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                            <p className="text-xs uppercase tracking-[0.3em] text-emerald-300">Public Dashboard</p>
                            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                                NAP/S Public Metrics &amp; Ward Intelligence
                            </h2>
                        </div>
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                            <Link
                                href={route('owop-mandate')}
                                className="inline-flex items-center justify-center rounded-full border border-emerald-300/30 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:border-emerald-200 hover:bg-emerald-500/10 hover:text-emerald-100"
                            >
                                Learn About O.W.O.P/NAP
                            </Link>
                        </div>
                    </div>
                </section>

                <section className="grid gap-3 md:grid-cols-4">
                    <div className="rounded-2xl border border-emerald-200 bg-white p-4 shadow-sm dark:border-emerald-800 dark:bg-gray-900">
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-600 dark:text-emerald-400">Total respondents</p>
                        <p className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">{napsStats.totalRespondents.toLocaleString()}</p>
                    </div>
                    <div className="rounded-2xl border border-cyan-200 bg-white p-4 shadow-sm dark:border-cyan-800 dark:bg-gray-900">
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-600 dark:text-cyan-400">States reached</p>
                        <p className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">{napsStats.statesReached}</p>
                    </div>
                    <div className="rounded-2xl border border-violet-200 bg-white p-4 shadow-sm dark:border-violet-800 dark:bg-gray-900">
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-600 dark:text-violet-400">Surveys completed</p>
                        <p className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">{napsStats.surveysCompleted.toLocaleString()}</p>
                    </div>
                    <div className="rounded-2xl border border-amber-200 bg-white p-4 shadow-sm dark:border-amber-800 dark:bg-gray-900">
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-600 dark:text-amber-400">Verified users</p>
                        <p className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">{napsStats.verifiedUsers.toLocaleString()}</p>
                    </div>
                </section>

                <section className="grid gap-5 xl:grid-cols-[1.15fr_0.85fr]">
                    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-gray-900">
                        <div className="flex items-start justify-between gap-3">
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400">Product signals</p>
                                <h3 className="mt-1 text-lg font-semibold text-slate-900 dark:text-white">Strongest ward-level product opportunities</h3>
                            </div>
                            <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">
                                OWOP focus
                            </span>
                        </div>
                        <div className="mt-5 h-60">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={featuredProducts}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                                    <XAxis dataKey="name" tick={{ fontSize: 10 }} interval={0} angle={-15} textAnchor="end" />
                                    <YAxis tick={{ fontSize: 10 }} />
                                    <Tooltip contentStyle={{ fontSize: '12px' }} />
                                    <Bar dataKey="value" fill="#059669" radius={[6, 6, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <details className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-gray-900">
                        <summary className="cursor-pointer text-sm font-semibold uppercase tracking-[0.2em] text-cyan-600 dark:text-cyan-400">
                            Strategic pillars · Learn more
                        </summary>
                        <div className="mt-4 space-y-3">
                            {strategicPillars.map((pillar) => (
                                <div key={pillar.title} className="rounded-xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-800/60">
                                    <h4 className="font-semibold text-sm text-slate-900 dark:text-white">{pillar.title}</h4>
                                    <p className="mt-1 text-xs leading-5 text-slate-600 dark:text-slate-300">{pillar.copy}</p>
                                </div>
                            ))}
                        </div>
                    </details>
                </section>

                <section className="grid gap-5 lg:grid-cols-2">
                    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-gray-900">
                        <div className="flex items-center justify-between gap-3">
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400">Skill clusters</p>
                                <h3 className="mt-1 text-lg font-semibold text-slate-900 dark:text-white">Capabilities across the network</h3>
                            </div>
                        </div>
                        <div className="mt-4 space-y-2">
                            {compactSkillItems.map((skill: any, index: number) => (
                                <div key={skill.name || index} className="flex items-center justify-between rounded-lg border border-slate-200 px-3 py-2 text-sm dark:border-slate-700">
                                    <span className="text-sm font-medium text-slate-700 dark:text-slate-200">{skill.name}</span>
                                    <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">{skill.count} signals</span>
                                </div>
                            ))}
                            {extraSkillItems.length > 0 && (
                                <details className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm dark:border-slate-700 dark:bg-slate-800/60">
                                    <summary className="cursor-pointer font-semibold text-slate-900 dark:text-white">View {extraSkillItems.length} more skills</summary>
                                    <div className="mt-3 space-y-2">
                                        {extraSkillItems.map((skill: any, index: number) => (
                                            <div key={skill.name || index} className="flex items-center justify-between rounded-lg border border-slate-200 px-3 py-2 text-sm dark:border-slate-700">
                                                <span className="text-sm text-slate-700 dark:text-slate-200">{skill.name}</span>
                                                <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">{skill.count} signals</span>
                                            </div>
                                        ))}
                                    </div>
                                </details>
                            )}
                        </div>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-gray-900">
                        <div className="flex items-center justify-between gap-3">
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-600 dark:text-violet-400">Funding signals</p>
                                <h3 className="mt-1 text-lg font-semibold text-slate-900 dark:text-white">Support priorities</h3>
                            </div>
                        </div>
                        <div className="mt-4 space-y-2">
                            {compactFundingItems.map((item: any, index: number) => (
                                <div key={item.name || index} className="flex items-center justify-between rounded-lg border border-slate-200 px-3 py-2 text-sm dark:border-slate-700">
                                    <span className="text-sm font-medium text-slate-700 dark:text-slate-200">{item.name}</span>
                                    <span className="rounded-full bg-violet-50 px-2 py-0.5 text-[11px] font-semibold text-violet-700 dark:bg-violet-900/30 dark:text-violet-300">{item.value} mentions</span>
                                </div>
                            ))}
                            {extraFundingItems.length > 0 && (
                                <details className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm dark:border-slate-700 dark:bg-slate-800/60">
                                    <summary className="cursor-pointer font-semibold text-slate-900 dark:text-white">View {extraFundingItems.length} more funding items</summary>
                                    <div className="mt-3 space-y-2">
                                        {extraFundingItems.map((item: any, index: number) => (
                                            <div key={item.name || index} className="flex items-center justify-between rounded-lg border border-slate-200 px-3 py-2 text-sm dark:border-slate-700">
                                                <span className="text-sm text-slate-700 dark:text-slate-200">{item.name}</span>
                                                <span className="rounded-full bg-violet-50 px-2 py-0.5 text-[11px] font-semibold text-violet-700 dark:bg-violet-900/30 dark:text-violet-300">{item.value} mentions</span>
                                            </div>
                                        ))}
                                    </div>
                                </details>
                            )}
                        </div>
                    </div>
                </section>

                <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-gray-900">
                    <details className="group" open>
                        <summary className="flex cursor-pointer items-center justify-between gap-3 text-sm font-semibold uppercase tracking-[0.18em] text-cyan-600 dark:text-cyan-400">
                            <span>State reach</span>
                            <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs text-slate-600 dark:bg-slate-800 dark:text-slate-300">Top 6 states</span>
                        </summary>
                        <div className="mt-4 grid gap-2 md:grid-cols-2 xl:grid-cols-3">
                            {compactStateSignals.map((state: any) => (
                                <div key={state.state} className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm dark:border-slate-700 dark:bg-slate-800/60">
                                    <div className="flex items-center justify-between gap-2">
                                        <span className="font-semibold text-slate-900 dark:text-white">{state.state}</span>
                                        <span className="rounded-full bg-cyan-50 px-2 py-0.5 text-[11px] font-semibold text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300">{state.respondents}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {extraStateSignals.length > 0 && (
                            <details className="mt-3 rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm dark:border-slate-700 dark:bg-slate-800/60">
                                <summary className="cursor-pointer font-semibold text-slate-900 dark:text-white">View {extraStateSignals.length} more states</summary>
                                <div className="mt-3 grid gap-2 md:grid-cols-2 xl:grid-cols-3">
                                    {extraStateSignals.map((state: any) => (
                                        <div key={state.state} className="rounded-xl border border-slate-200 bg-white p-3 text-sm dark:border-slate-700 dark:bg-slate-900/70">
                                            <div className="flex items-center justify-between gap-2">
                                                <span className="font-semibold text-slate-900 dark:text-white">{state.state}</span>
                                                <span className="rounded-full bg-cyan-50 px-2 py-0.5 text-[11px] font-semibold text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300">{state.respondents}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </details>
                        )}
                    </details>
                </section>

                <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4 border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-lg">
                        <h2 className="text-base font-semibold mb-3 text-gray-800 dark:text-gray-100 line-clamp-2">Employment Distribution</h2>
                        {napsCharts.employmentData && napsCharts.employmentData.length > 0 ? (
                            <>
                                <ResponsiveContainer width="100%" height={140}>
                                    <PieChart>
                                        <Pie
                                            data={napsCharts.employmentData}
                                            dataKey="value"
                                            nameKey="name"
                                            cx="50%"
                                            cy="50%"
                                            outerRadius={55}
                                            isAnimationActive={false}
                                        >
                                            {napsCharts.employmentData.map((_: any, i: number) => (
                                                <Cell key={i} fill={COLORS[i % COLORS.length]} />
                                            ))}
                                        </Pie>
                                    </PieChart>
                                </ResponsiveContainer>
                                <div className="mt-2 space-y-1">
                                    {napsCharts.employmentData.slice(0, 4).map((item: any, i: number) => (
                                        <div key={i} className="flex items-center gap-2 text-xs">
                                            <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                                            <span className="text-gray-700 dark:text-gray-300 truncate flex-1">{item.name}</span>
                                            <span className="text-gray-500 dark:text-gray-400 flex-shrink-0">{item.value}</span>
                                        </div>
                                    ))}
                                </div>
                                {napsCharts.employmentData.length > 4 && (
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setExpandedDataModal('employment');
                                        }}
                                        className="mt-2 w-full text-center text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 py-1 rounded hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors"
                                    >
                                        Visualize All {napsCharts.employmentData.length} Items
                                    </button>
                                )}
                            </>
                        ) : (
                            <p className="text-gray-500 dark:text-gray-400 text-center py-6 text-sm">No data</p>
                        )}
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4 border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-lg">
                        <h2 className="text-base font-semibold mb-3 text-gray-800 dark:text-gray-100 line-clamp-2">Product Distribution</h2>
                        {napsCharts.productsData && napsCharts.productsData.length > 0 ? (
                            <>
                                <ResponsiveContainer width="100%" height={140}>
                                    <PieChart>
                                        <Pie
                                            data={napsCharts.productsData}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={35}
                                            outerRadius={55}
                                            paddingAngle={1}
                                            dataKey="value"
                                            isAnimationActive={false}
                                        >
                                            {napsCharts.productsData.map((_: any, i: number) => (
                                                <Cell key={i} fill={COLORS[i % COLORS.length]} />
                                            ))}
                                        </Pie>
                                    </PieChart>
                                </ResponsiveContainer>
                                <div className="mt-2 space-y-1">
                                    {napsCharts.productsData.slice(0, 4).map((item: any, i: number) => (
                                        <div key={i} className="flex items-center gap-2 text-xs">
                                            <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                                            <span className="text-gray-700 dark:text-gray-300 truncate flex-1">{item.name}</span>
                                            <span className="text-gray-500 dark:text-gray-400 flex-shrink-0">{item.value}</span>
                                        </div>
                                    ))}
                                </div>
                                {napsCharts.productsData.length > 4 && (
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setExpandedDataModal('products');
                                        }}
                                        className="mt-2 w-full text-center text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 py-1 rounded hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors"
                                    >
                                        Visualize All {napsCharts.productsData.length} Items
                                    </button>
                                )}
                            </>
                        ) : (
                            <p className="text-gray-500 dark:text-gray-400 text-center py-6 text-sm">No data</p>
                        )}
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4 border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-lg">
                        <h2 className="text-base font-semibold mb-3 text-gray-800 dark:text-gray-100 line-clamp-2">Skills Distribution</h2>
                        {napsCharts.skillsData && napsCharts.skillsData.length > 0 ? (
                            <>
                                <ResponsiveContainer width="100%" height={140}>
                                    <PieChart>
                                        <Pie
                                            data={napsCharts.skillsData}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={35}
                                            outerRadius={55}
                                            paddingAngle={1}
                                            dataKey="count"
                                            isAnimationActive={false}
                                        >
                                            {napsCharts.skillsData.map((_: any, i: number) => (
                                                <Cell key={i} fill={COLORS[i % COLORS.length]} />
                                            ))}
                                        </Pie>
                                    </PieChart>
                                </ResponsiveContainer>
                                <div className="mt-2 space-y-1">
                                    {napsCharts.skillsData.slice(0, 4).map((item: any, i: number) => (
                                        <div key={i} className="flex items-center gap-2 text-xs">
                                            <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                                            <span className="text-gray-700 dark:text-gray-300 truncate flex-1">{item.name || `Skill ${item.id}`}</span>
                                            <span className="text-gray-500 dark:text-gray-400 flex-shrink-0">{item.count}</span>
                                        </div>
                                    ))}
                                </div>
                                {napsCharts.skillsData.length > 4 && (
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setExpandedDataModal('skills');
                                        }}
                                        className="mt-2 w-full text-center text-xs font-semibold text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 py-1 rounded hover:bg-cyan-50 dark:hover:bg-cyan-900/20 transition-colors"
                                    >
                                        Visualize All {napsCharts.skillsData.length} Items
                                    </button>
                                )}
                            </>
                        ) : (
                            <p className="text-gray-500 dark:text-gray-400 text-center py-6 text-sm">No data</p>
                        )}
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4 border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-lg">
                        <h2 className="text-base font-semibold mb-3 text-gray-800 dark:text-gray-100 line-clamp-2">Funding Support</h2>
                        {napsCharts.fundingData && napsCharts.fundingData.length > 0 ? (
                            <>
                                <ResponsiveContainer width="100%" height={140}>
                                    <PieChart>
                                        <Pie
                                            data={napsCharts.fundingData}
                                            dataKey="value"
                                            nameKey="name"
                                            cx="50%"
                                            cy="50%"
                                            outerRadius={55}
                                            isAnimationActive={false}
                                        >
                                            {napsCharts.fundingData.map((_: any, i: number) => (
                                                <Cell key={i} fill={COLORS[i % COLORS.length]} />
                                            ))}
                                        </Pie>
                                    </PieChart>
                                </ResponsiveContainer>
                                <div className="mt-2 space-y-1">
                                    {napsCharts.fundingData.slice(0, 4).map((item: any, i: number) => (
                                        <div key={i} className="flex items-center gap-2 text-xs">
                                            <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                                            <span className="text-gray-700 dark:text-gray-300 truncate flex-1">{item.name}</span>
                                            <span className="text-gray-500 dark:text-gray-400 flex-shrink-0">{item.value}</span>
                                        </div>
                                    ))}
                                </div>
                                {napsCharts.fundingData.length > 4 && (
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setExpandedDataModal('funding');
                                        }}
                                        className="mt-2 w-full text-center text-xs font-semibold text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 py-1 rounded hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors"
                                    >
                                        Visualize All {napsCharts.fundingData.length} Items
                                    </button>
                                )}
                            </>
                        ) : (
                            <p className="text-gray-500 dark:text-gray-400 text-center py-6 text-sm">No data</p>
                        )}
                    </div>
                </section>

                <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-gray-900">
                    <details className="group" open>
                        <summary className="flex cursor-pointer items-center justify-between gap-3 text-sm font-semibold uppercase tracking-[0.18em] text-emerald-600 dark:text-emerald-400">
                            <span>Ward-to-product linkage</span>
                            <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">Public planning insight</span>
                        </summary>
                        <div className="mt-4 text-sm text-slate-600 dark:text-slate-300">
                            Explore how ward-level demand maps to product demand and LGA industrial priorities.
                        </div>
                        <div className="mt-4">
                            <LgaProductsLinkage />
                        </div>
                    </details>
                </section>
            </div>

        </section>
    </div>

    {/* Compact Recent Activity (tabs collapsed) */}
    <div className="bg-slate-950/95 shadow-sm rounded-[24px] border border-slate-800/70 overflow-hidden p-3 md:p-4 lg:ml-[calc(300px+2rem)]">
        <h3 className="text-lg font-medium text-white mb-2">Recent Activity</h3>
        <div className="text-center py-3 md:py-4 text-slate-300">
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
