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
        { label: 'Total Members', value: churchData.totalMembers, tone: 'bg-red-600' },
        { label: 'Active Users', value: churchData.totalUsers, tone: 'bg-rose-600' },
        { label: 'Attendance Today', value: churchData.attendanceToday, tone: 'bg-orange-500' },
        { label: 'First Timers', value: churchData.firstTimersToday, tone: 'bg-red-700' },
    ];

    const birthdayItems = churchData.upcomingBirthdays ?? [];

    return (
        <AuthenticatedLayout>
            <Head title="Church Admin Dashboard" />
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="mb-8 rounded-3xl border border-red-200 bg-gradient-to-r from-red-700 via-red-600 to-rose-700 p-6 text-white shadow-lg">
                    <p className="text-xs font-semibold uppercase tracking-[0.35em] text-red-100">APGA Church Ops</p>
                    <h1 className="mt-3 text-3xl font-bold">Church Administration Dashboard</h1>
                    <p className="mt-2 text-red-50">{churchData.serviceName} overview and ministry operations</p>
                </div>

                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                    {statCards.map((card) => (
                        <div key={card.label} className="rounded-2xl border border-red-100 bg-white p-5 shadow-sm">
                            <div className={`mb-4 h-2.5 rounded-full ${card.tone}`} />
                            <p className="text-sm text-slate-500">{card.label}</p>
                            <p className="mt-3 text-3xl font-bold text-slate-900">{card.value}</p>
                        </div>
                    ))}
                </div>

                <div className="mt-8 grid gap-6 lg:grid-cols-2">
                    <div className="rounded-3xl border border-red-100 bg-white p-6 shadow-sm">
                        <h2 className="text-xl font-bold text-slate-900">Ministry Snapshot</h2>
                        <ul className="mt-5 space-y-3 text-sm text-slate-600">
                            <li className="rounded-xl bg-red-50 px-4 py-3">President Welcome Speech ready for review</li>
                            <li className="rounded-xl bg-red-50 px-4 py-3">Attendance board is active for Sunday services</li>
                            <li className="rounded-xl bg-red-50 px-4 py-3">Members directory is ready for onboarding</li>
                            <li className="rounded-xl bg-red-50 px-4 py-3">Reports and invitation league scorecards are now available</li>
                            <li className="rounded-xl bg-red-50 px-4 py-3"><a href={route('church-admin.units')} className="font-semibold text-red-700 underline">Open Unit & Department Management</a></li>
                            <li className="rounded-xl bg-red-50 px-4 py-3"><a href={route('church-admin.scorecards')} className="font-semibold text-red-700 underline">Open Scorecards Dashboard</a></li>
                            <li className="rounded-xl bg-red-50 px-4 py-3"><a href={route('church-admin.absentees')} className="font-semibold text-red-700 underline">Open Absentee Board</a></li>
                            <li className="rounded-xl bg-red-50 px-4 py-3"><a href={route('church-admin.workers-meetings')} className="font-semibold text-red-700 underline">Open Workers Meetings</a></li>
                            <li className="rounded-xl bg-red-50 px-4 py-3"><a href={route('church-admin.media')} className="font-semibold text-red-700 underline">Open Media & Interviews</a></li>
                            <li className="rounded-xl bg-red-50 px-4 py-3"><a href={route('church-admin.announcements')} className="font-semibold text-red-700 underline">Open Church Announcements</a></li>
                        </ul>
                    </div>

                    <div className="rounded-3xl border border-red-100 bg-white p-6 shadow-sm">
                        <h2 className="text-xl font-bold text-slate-900">Upcoming Birthdays</h2>
                        {birthdayItems.length > 0 ? (
                            <ul className="mt-5 space-y-3 text-sm text-slate-600">
                                {birthdayItems.map((birthday) => (
                                    <li key={birthday.id} className="rounded-xl bg-amber-50 px-4 py-3">
                                        <div className="flex items-center justify-between gap-3">
                                            <div>
                                                <p className="font-semibold text-slate-800">{birthday.name}</p>
                                                <p className="text-xs text-slate-500">{birthday.department ?? 'Member'}</p>
                                            </div>
                                            <span className="rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-amber-700">
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
