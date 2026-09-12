import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

interface BirthdayEntry {
    id: number;
    name: string;
    date_of_birth: string;
    next_birthday: string;
    department?: string;
}

interface ChurchData {
    totalMembers: number;
    totalUsers: number;
    attendanceToday: number;
    firstTimersToday: number;
    serviceName: string;
    upcomingBirthdays: BirthdayEntry[];
}

export default function AdminDashboard({ churchData }: { churchData: ChurchData }) {
    const statCards = [
        { label: 'Total Members', value: churchData.totalMembers, tone: 'from-red-600 to-red-500', accent: 'text-red-600', glow: 'shadow-red-200/80' },
        { label: 'Active Users', value: churchData.totalUsers, tone: 'from-rose-600 to-pink-500', accent: 'text-rose-600', glow: 'shadow-rose-200/80' },
        { label: 'Attendance Today', value: churchData.attendanceToday, tone: 'from-orange-500 to-amber-400', accent: 'text-orange-600', glow: 'shadow-orange-200/80' },
        { label: 'First Timers', value: churchData.firstTimersToday, tone: 'from-red-700 to-rose-600', accent: 'text-red-700', glow: 'shadow-red-200/80' },
    ];

    const birthdayItems = churchData.upcomingBirthdays ?? [];

    const quickActions = [
        { label: 'Service register', description: 'Track Sunday attendance', href: route('church-admin.service-register'), tone: 'from-red-600 to-rose-500' },
        { label: 'Reports', description: 'Leadership analytics', href: route('church-admin.reports'), tone: 'from-orange-500 to-amber-400' },
        { label: 'Scorecards', description: 'Invitation and conversion stats', href: route('church-admin.scorecards'), tone: 'from-violet-600 to-indigo-500' },
        { label: 'Absentees', description: 'Follow-up and recovery', href: route('church-admin.absentees'), tone: 'from-slate-700 to-slate-500' },
        { label: 'Workers meeting', description: 'Team coordination', href: route('church-admin.workers-meetings'), tone: 'from-emerald-600 to-teal-500' },
        { label: 'Media board', description: 'Stories and interviews', href: route('church-admin.media'), tone: 'from-pink-600 to-rose-500' },
        { label: 'Announcements', description: 'Public church updates', href: route('church-admin.announcements'), tone: 'from-cyan-600 to-sky-500' },
        { label: 'Newsletter', description: 'Subscribers and campaigns', href: route('church-admin.newsletter-subscribers'), tone: 'from-fuchsia-600 to-purple-500' },
    ];

    return (
        <AuthenticatedLayout>
            <Head title="Church Admin Dashboard" />
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="mb-8 overflow-hidden rounded-[28px] border border-red-200 bg-gradient-to-r from-red-700 via-red-600 to-rose-700 p-6 text-white shadow-[0_30px_80px_rgba(153,27,27,0.28)]">
                    <div className="absolute inset-0" aria-hidden="true" />
                    <div className="relative">
                        <div className="flex items-center justify-between gap-4">
                            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-red-100">APGA Church Ops</p>
                            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-red-50">
                                <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-300" />
                                live overview
                            </span>
                        </div>
                        <h1 className="mt-4 text-3xl font-bold md:text-4xl">Church Administration Dashboard</h1>
                        <p className="mt-3 max-w-2xl text-red-50">{churchData.serviceName} overview and ministry operations</p>
                    </div>
                </div>

                <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                    {statCards.map((card, index) => (
                        <div key={card.label} className={`group relative overflow-hidden rounded-[26px] border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl ${card.glow}`}>
                            <div className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${card.tone}`} />
                            <div className="flex items-start justify-between gap-3">
                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">{card.label}</p>
                                    <p className={`mt-4 text-3xl font-black ${card.accent}`}>{card.value}</p>
                                </div>
                                <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${card.tone} text-lg font-bold text-white shadow-lg`}>
                                    {index + 1}
                                </div>
                            </div>
                            <div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-100">
                                <div className={`h-full rounded-full bg-gradient-to-r ${card.tone} transition-all duration-500`} style={{ width: `${Math.min((Number(card.value) / Math.max(Number(card.value) + 12, 12)) * 100, 100)}%` }} />
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-8 overflow-hidden rounded-[30px] border border-red-200 bg-gradient-to-br from-red-50 via-white to-amber-50 p-6 shadow-[0_18px_60px_rgba(153,27,27,0.08)]">
                    <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-red-600">Sunday service</p>
                            <h2 className="mt-2 text-2xl font-bold text-slate-900">Take attendance</h2>
                            <p className="mt-2 max-w-2xl text-sm text-slate-600">Open the monthly service register and mark each member present or late as they arrive.</p>
                        </div>
                        <a href={route('church-admin.service-register')} className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-red-700 to-red-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-red-200 transition duration-300 hover:-translate-y-0.5 hover:shadow-red-300">
                            Open attendance register
                            <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                        </a>
                    </div>
                </div>

                <div className="mt-8 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
                    <div className="rounded-[28px] border border-red-100 bg-white p-6 shadow-[0_18px_45px_rgba(15,23,42,0.04)]">
                        <div className="flex items-center justify-between gap-3">
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-red-600">Operations</p>
                                <h2 className="mt-2 text-xl font-bold text-slate-900">Quick admin actions</h2>
                            </div>
                            <span className="rounded-full bg-red-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-red-700">Live</span>
                        </div>
                        <div className="mt-5 grid gap-4 sm:grid-cols-2">
                            {quickActions.map((action) => (
                                <a
                                    key={action.label}
                                    href={action.href}
                                    className="group relative overflow-hidden rounded-[22px] border border-slate-200 bg-slate-50 p-4 transition duration-300 hover:-translate-y-1 hover:border-red-200 hover:shadow-xl"
                                >
                                    <div className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${action.tone}`} />
                                    <div className="flex items-start justify-between gap-3">
                                        <div>
                                            <p className="text-base font-bold text-slate-900">{action.label}</p>
                                            <p className="mt-2 text-sm text-slate-600">{action.description}</p>
                                        </div>
                                        <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white text-sm font-bold text-slate-700 shadow-sm transition group-hover:translate-x-0.5 group-hover:text-red-700">
                                            →
                                        </span>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>

                    <div className="rounded-[28px] border border-amber-100 bg-gradient-to-br from-amber-50 via-white to-yellow-50 p-6 shadow-[0_18px_45px_rgba(217,119,6,0.08)]">
                        <h2 className="text-xl font-bold text-slate-900">Upcoming Birthdays</h2>
                        {birthdayItems.length > 0 ? (
                            <ul className="mt-5 space-y-3 text-sm text-slate-600">
                                {birthdayItems.map((birthday) => (
                                    <li key={birthday.id} className="rounded-2xl border border-amber-200 bg-white/80 px-4 py-3 shadow-sm transition hover:-translate-y-0.5">
                                        <div className="flex items-center justify-between gap-3">
                                            <div>
                                                <p className="font-semibold text-slate-800">{birthday.name}</p>
                                                <p className="text-xs text-slate-500">{birthday.department ?? 'Member'}</p>
                                            </div>
                                            <span className="rounded-full bg-amber-100 px-2.5 py-1 text-xs font-semibold text-amber-700">
                                                {birthday.date_of_birth}
                                            </span>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="mt-5 text-sm text-slate-500">No member birthdays are currently scheduled.</p>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
