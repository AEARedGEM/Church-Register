import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
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

interface QuickAction {
    id: string;
    title: string;
    description: string;
    icon: string;
    color: string;
    permission: string;
    route: string;
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

interface DashboardProps {
    user: User;
    dashboardContext: DashboardContext;
    currentRole: string;
    roleLabel: string;
    stats: any;
    recentActivity: any[];
    upcomingEvents: UpcomingEvent[];
    walletData: any;
    fundingData: any;
    trainingData: any;
    communityData: any;
    quickActions: QuickAction[];
    churchSummary?: {
        attendance_total?: number;
        prayer_requests?: number;
        active_ministries?: number;
        upcoming_events?: number;
    };
}

const defaultQuickActions: QuickAction[] = [
    { id: 'attendance', title: 'Record Attendance', description: 'Update today’s service count', icon: '✓', color: 'bg-red-600', permission: 'view_dashboard', route: 'training.dashboard' },
    { id: 'event', title: 'Create Event', description: 'Plan a church gathering', icon: '📅', color: 'bg-rose-600', permission: 'view_dashboard', route: 'community' },
    { id: 'prayer', title: 'Prayer Request', description: 'Share prayer needs', icon: '🙏', color: 'bg-orange-600', permission: 'view_dashboard', route: 'profile.edit' },
    { id: 'members', title: 'Members', description: 'Manage your community', icon: '👥', color: 'bg-red-700', permission: 'view_dashboard', route: 'community' },
];

const defaultEventList: UpcomingEvent[] = [
    { id: 1, title: 'Sunday Worship Service', date: 'This Sunday · 9:00 AM', type: 'Service', location: 'Main Sanctuary', is_registered: true },
    { id: 2, title: 'Prayer & Healing Night', date: 'Friday · 6:30 PM', type: 'Prayer', location: 'Prayer Hall', is_registered: false },
    { id: 3, title: 'Youth Revival', date: 'Saturday · 4:00 PM', type: 'Outreach', location: 'Youth Centre', is_registered: false },
];

const leadershipCards = [
    { name: 'Pastor (Dr.) S.O. Ilesanmi', role: 'President', note: 'Spiritual direction and vision', image: '/images/President_GO.jpeg' },
    { name: 'Pastor A. Johnson', role: 'Admin Pastor', note: 'Operations and pastoral care', image: '' },
    { name: 'Elder F. Adeyemi', role: 'Discipleship Lead', note: 'Member growth and follow-up', image: '' },
];

const smallGroupCards = [
    { name: 'Men’s Fellowship', members: '48 active', time: 'Every Saturday · 7:00 AM' },
    { name: 'Women’s Prayer Circle', members: '62 active', time: 'Every Tuesday · 6:00 PM' },
    { name: 'Youth Ignite', members: '74 active', time: 'Every Friday · 5:30 PM' },
    { name: 'Children’s Sunday School', members: '93 active', time: 'Every Sunday · 9:00 AM' },
];

const recentChurchActivity = [
    { title: 'Attendance recorded for Sunday worship', detail: '312 members joined service', time: '2 hours ago', status: 'success' },
    { title: 'Prayer request submitted', detail: 'A member requested healing prayers', time: 'Today', status: 'info' },
    { title: 'Volunteer rota updated', detail: 'Children’s ministry team scheduled', time: 'Yesterday', status: 'pending' },
];

export default function Dashboard({
    user,
    roleLabel,
    quickActions,
    upcomingEvents,
    churchSummary,
}: DashboardProps) {
    const [activeSection, setActiveSection] = useState<'overview' | 'attendance' | 'events' | 'community'>('overview');

    const isAdminUser = Boolean(user?.email === 'crownpaysme19@gmail.com') || Boolean((user as any)?.is_admin) || Boolean((user as any)?.roles?.includes('admin')) || Boolean((user as any)?.roles?.includes('super-admin')) || Boolean((user as any)?.role === 'admin') || Boolean((user as any)?.primary_role === 'admin');

    const summaryCards = [
        {
            title: 'Attendance',
            value: (churchSummary?.attendance_total ?? 0).toLocaleString(),
            note: 'Recorded attendance entries',
            tone: 'from-red-500 to-red-600',
        },
        {
            title: 'Prayer Requests',
            value: (churchSummary?.prayer_requests ?? 0).toLocaleString(),
            note: 'Open prayer needs',
            tone: 'from-rose-500 to-orange-500',
        },
        {
            title: 'Ministries',
            value: (churchSummary?.active_ministries ?? 0).toLocaleString(),
            note: 'Active fellowships',
            tone: 'from-amber-500 to-red-500',
        },
        {
            title: 'Events',
            value: (churchSummary?.upcoming_events ?? 0).toLocaleString().padStart(2, '0'),
            note: 'Scheduled this quarter',
            tone: 'from-red-600 to-red-800',
        },
    ];

    const actions = quickActions?.length ? quickActions : defaultQuickActions;
    const churchEvents = upcomingEvents?.length ? upcomingEvents.slice(0, 3) : defaultEventList;

    const navItems = [
        { id: 'overview', label: 'Overview' },
        { id: 'attendance', label: 'Attendance' },
        { id: 'events', label: 'Events' },
        { id: 'community', label: 'Community' },
    ];

    const handleQuickAction = (action: QuickAction) => {
        if (action.route.startsWith('http://') || action.route.startsWith('https://')) {
            window.open(action.route, '_blank');
            return;
        }

        router.visit(route(action.route));
    };

    return (
        <AuthenticatedLayout>
            <Head title="APGA Worldwide Dashboard" />

            <div className="min-h-screen bg-[#f8f4ee] text-slate-800">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <div className="mb-6 overflow-hidden rounded-3xl border border-red-200 bg-gradient-to-r from-red-700 via-red-600 to-rose-700 p-6 text-white shadow-lg shadow-red-900/20">
                        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-red-100">APGA Worldwide</p>
                                <h1 className="mt-3 text-3xl font-bold sm:text-4xl">Church Dashboard</h1>
                                <p className="mt-2 max-w-2xl text-sm text-red-50 sm:text-base">
                                    Welcome back, {user.name}. Your ministry operations, attendance, prayer support, and member engagement are all in one place.
                                </p>
                            </div>

                            <div className="flex flex-wrap items-center gap-3">
                                <Link
                                    href={route('community')}
                                    className="rounded-full border border-white/30 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/20"
                                >
                                    View Community
                                </Link>
                                <Link
                                    href={route('training.dashboard')}
                                    className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-red-700 transition hover:bg-red-50"
                                >
                                    Go to Training
                                </Link>
                                {isAdminUser && (
                                    <Link
                                        href={route('church-admin.index')}
                                        className="rounded-full border-2 border-white bg-white px-5 py-2.5 text-sm font-bold text-red-700 shadow-lg shadow-red-900/20 transition hover:bg-red-50"
                                    >
                                        Admin Panel
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="mb-6 flex flex-wrap gap-2 rounded-2xl border border-red-200 bg-white p-2 shadow-sm">
                        {navItems.map((item) => (
                            <button
                                key={item.id}
                                type="button"
                                onClick={() => setActiveSection(item.id as typeof activeSection)}
                                className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
                                    activeSection === item.id
                                        ? 'bg-red-600 text-white shadow-sm'
                                        : 'text-slate-600 hover:bg-red-50 hover:text-red-700'
                                }`}
                            >
                                {item.label}
                            </button>
                        ))}
                    </div>

                    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                        {summaryCards.map((card) => (
                            <div key={card.title} className="rounded-2xl border border-red-100 bg-white p-4 shadow-sm">
                                <div className={`mb-4 h-2.5 rounded-full bg-gradient-to-r ${card.tone}`} />
                                <p className="text-sm font-medium text-slate-500">{card.title}</p>
                                <div className="mt-3 flex items-end justify-between gap-4">
                                    <span className="text-3xl font-bold text-slate-900">{card.value}</span>
                                </div>
                                <p className="mt-2 text-xs text-slate-500">{card.note}</p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-6 grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
                        <div className="rounded-3xl border border-red-100 bg-white p-5 shadow-sm">
                            <div className="mb-5 flex items-center justify-between gap-3">
                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-red-600">Overview</p>
                                    <h2 className="mt-2 text-xl font-bold text-slate-900">Church health at a glance</h2>
                                </div>
                                <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-700">{roleLabel}</span>
                            </div>

                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="rounded-2xl border border-red-100 bg-red-50 p-4">
                                    <div className="flex items-center justify-between text-sm text-red-700">
                                        <span className="font-semibold">Attendance</span>
                                        <span>+18% vs last week</span>
                                    </div>
                                    <div className="mt-4 text-3xl font-bold text-slate-900">312</div>
                                    <p className="mt-2 text-sm text-slate-600">Members present in worship</p>
                                </div>

                                <div className="rounded-2xl border border-amber-100 bg-amber-50 p-4">
                                    <div className="flex items-center justify-between text-sm text-amber-700">
                                        <span className="font-semibold">Prayer coverage</span>
                                        <span>Live</span>
                                    </div>
                                    <div className="mt-4 text-3xl font-bold text-slate-900">86</div>
                                    <p className="mt-2 text-sm text-slate-600">Prayer requests being supported</p>
                                </div>

                                <div className="rounded-2xl border border-red-100 bg-red-50 p-4">
                                    <div className="flex items-center justify-between text-sm text-red-700">
                                        <span className="font-semibold">New visits</span>
                                        <span>This month</span>
                                    </div>
                                    <div className="mt-4 text-3xl font-bold text-slate-900">47</div>
                                    <p className="mt-2 text-sm text-slate-600">Visitors connected to the church</p>
                                </div>

                                <div className="rounded-2xl border border-red-100 bg-red-50 p-4">
                                    <div className="flex items-center justify-between text-sm text-red-700">
                                        <span className="font-semibold">Service plan</span>
                                        <span>Sunday</span>
                                    </div>
                                    <div className="mt-4 text-xl font-bold text-slate-900">Worship, prayer, outreach</div>
                                    <p className="mt-2 text-sm text-slate-600">Flow for today’s gathering</p>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-3xl border border-red-100 bg-white p-5 shadow-sm">
                            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-red-600">Leadership</p>
                            <h2 className="mt-2 text-xl font-bold text-slate-900">Pastoral leadership</h2>

                            <div className="mt-4 space-y-3">
                                {leadershipCards.map((person) => (
                                    <div key={person.name} className="rounded-2xl border border-red-100 bg-red-50 p-3">
                                        <div className="flex items-start gap-3">
                                            {person.image ? (
                                                <img
                                                    src={person.image}
                                                    alt={person.name}
                                                    className="h-12 w-12 rounded-full object-cover border border-red-200"
                                                />
                                            ) : (
                                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-200 text-xs font-bold text-red-700">
                                                    {person.name.split(' ').map((part) => part[0]).slice(0, 2).join('')}
                                                </div>
                                            )}
                                            <div className="min-w-0 flex-1">
                                                <p className="font-semibold text-slate-900">{person.name}</p>
                                                <p className="mt-1 text-sm font-medium text-red-700">{person.role}</p>
                                                <p className="mt-2 text-xs text-slate-600">{person.note}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
                        <div className="rounded-3xl border border-red-100 bg-white p-5 shadow-sm">
                            <div className="mb-4 flex items-center justify-between gap-3">
                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-red-600">Events</p>
                                    <h2 className="mt-2 text-xl font-bold text-slate-900">Upcoming church programs</h2>
                                </div>
                                <button type="button" className="rounded-full bg-red-600 px-3 py-1.5 text-xs font-semibold text-white">
                                    Add Event
                                </button>
                            </div>

                            <div className="space-y-3">
                                {churchEvents.map((event) => (
                                    <div key={event.id} className="flex items-start justify-between gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                                        <div>
                                            <p className="font-semibold text-slate-900">{event.title}</p>
                                            <p className="mt-1 text-sm text-slate-600">{event.date}</p>
                                            <p className="mt-1 text-xs text-slate-500">{event.location}</p>
                                        </div>
                                        <span className="rounded-full bg-red-100 px-2.5 py-1 text-xs font-semibold text-red-700">{event.type}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="rounded-3xl border border-red-100 bg-white p-5 shadow-sm">
                            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-red-600">Actions</p>
                            <h2 className="mt-2 text-xl font-bold text-slate-900">Quick tools</h2>

                            <div className="mt-4 grid gap-3 sm:grid-cols-2">
                                {actions.map((action) => (
                                    <button
                                        key={action.id}
                                        type="button"
                                        onClick={() => handleQuickAction(action)}
                                        className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-left transition hover:border-red-200 hover:bg-red-50"
                                    >
                                        <div className={`mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl text-lg text-white ${action.color}`}>
                                            {action.icon}
                                        </div>
                                        <p className="font-semibold text-slate-900">{action.title}</p>
                                        <p className="mt-1 text-xs text-slate-600">{action.description}</p>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_1fr]">
                        <div className="rounded-3xl border border-red-100 bg-white p-5 shadow-sm">
                            <div className="mb-4 flex items-center justify-between gap-3">
                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-red-600">Community</p>
                                    <h2 className="mt-2 text-xl font-bold text-slate-900">Small groups</h2>
                                </div>
                                <button type="button" className="rounded-full border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-700">
                                    Manage
                                </button>
                            </div>

                            <div className="space-y-3">
                                {smallGroupCards.map((group) => (
                                    <div key={group.name} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                                        <div className="flex items-center justify-between gap-3">
                                            <p className="font-semibold text-slate-900">{group.name}</p>
                                            <span className="rounded-full bg-red-100 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-red-700">
                                                Active
                                            </span>
                                        </div>
                                        <p className="mt-2 text-sm text-slate-600">{group.members}</p>
                                        <p className="mt-1 text-xs text-slate-500">{group.time}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="rounded-3xl border border-red-100 bg-white p-5 shadow-sm">
                            <div className="mb-4 flex items-center justify-between gap-3">
                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-red-600">Latest</p>
                                    <h2 className="mt-2 text-xl font-bold text-slate-900">Recent activity</h2>
                                </div>
                                <button type="button" className="rounded-full bg-red-100 px-3 py-1.5 text-xs font-semibold text-red-700">
                                    View all
                                </button>
                            </div>

                            <div className="space-y-3">
                                {recentChurchActivity.map((item) => (
                                    <div key={item.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                                        <div className="flex items-center justify-between gap-3">
                                            <p className="font-semibold text-slate-900">{item.title}</p>
                                            <span className={`rounded-full px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] ${
                                                item.status === 'success'
                                                    ? 'bg-red-100 text-red-700'
                                                    : item.status === 'pending'
                                                        ? 'bg-amber-100 text-amber-700'
                                                        : 'bg-red-100 text-red-700'
                                            }`}>
                                                {item.status}
                                            </span>
                                        </div>
                                        <p className="mt-2 text-sm text-slate-600">{item.detail}</p>
                                        <p className="mt-2 text-xs text-slate-500">{item.time}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
