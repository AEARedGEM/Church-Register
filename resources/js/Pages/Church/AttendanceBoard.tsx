import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';

interface AttendanceRow {
    id: number;
    member: string;
    service_type: string;
    status: string;
    first_timer: boolean;
    service_date: string;
}

interface ChurchMember {
    id: number;
    name: string;
}

interface AttendanceStats {
    total: number;
    present_or_late: number;
    first_timers: number;
    sunday_school: number;
    main_service: number;
    latest_service_date: string | null;
    latest_service_total: number;
}

export default function AttendanceBoard({ attendance, attendanceStats, members, flash }: { attendance: AttendanceRow[]; attendanceStats: AttendanceStats; members: ChurchMember[]; flash?: { success?: string } }) {
    const { data, setData, post, processing } = useForm<{
        member_profile_id: string;
        service_type: string;
        service_date: string;
        status: string;
        first_timer: boolean;
        notes: string;
    }>({
        member_profile_id: '',
        service_type: 'main_service',
        service_date: new Date().toISOString().slice(0, 10),
        status: 'present',
        first_timer: false,
        notes: '',
    });

    const submit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        post('/church-admin/attendance');
    };

    return (
        <AuthenticatedLayout>
            <Head title="Attendance Board" />
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-red-600">Attendance</p>
                        <h1 className="mt-2 text-3xl font-bold text-slate-900">Church Attendance Board</h1>
                    </div>
                </div>

                {flash?.success && (
                    <div className="mb-6 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
                        {flash.success}
                    </div>
                )}

                <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                    {[
                        ['Total records', attendanceStats.total],
                        ['Present or late', attendanceStats.present_or_late],
                        ['First timers', attendanceStats.first_timers],
                        ['Sunday School', attendanceStats.sunday_school],
                        ['Main service', attendanceStats.main_service],
                    ].map(([label, value]) => (
                        <div key={label} className="rounded-2xl border border-red-100 bg-white p-4 shadow-sm">
                            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">{label}</p>
                            <p className="mt-3 text-2xl font-bold text-slate-900">{value}</p>
                        </div>
                    ))}
                </div>

                <div className="mb-8 rounded-3xl border border-red-100 bg-gradient-to-r from-red-50 to-amber-50 p-5 shadow-sm">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-red-700">Latest service snapshot</p>
                    <div className="mt-3 flex flex-wrap items-baseline gap-x-4 gap-y-2">
                        <p className="text-2xl font-bold text-slate-900">{attendanceStats.latest_service_total} recorded attendees</p>
                        <p className="text-sm text-slate-600">{attendanceStats.latest_service_date ?? 'No service date recorded yet'}</p>
                    </div>
                </div>

                <div className="mb-8 rounded-3xl border border-red-100 bg-white p-5 shadow-sm">
                    <h2 className="mb-4 text-lg font-semibold text-slate-900">Record attendance</h2>
                    <form onSubmit={submit} className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
                        <label className="text-sm font-medium text-slate-700">
                            Member
                            <select
                                value={data.member_profile_id}
                                onChange={(event) => setData('member_profile_id', event.target.value)}
                                className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-slate-800 focus:border-red-400 focus:outline-none"
                                required
                            >
                                <option value="">Select member</option>
                                {members.map((member) => (
                                    <option key={member.id} value={member.id}>{member.name}</option>
                                ))}
                            </select>
                        </label>

                        <label className="text-sm font-medium text-slate-700">
                            Service
                            <select
                                value={data.service_type}
                                onChange={(event) => setData('service_type', event.target.value)}
                                className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-slate-800 focus:border-red-400 focus:outline-none"
                            >
                                <option value="main_service">Main Service</option>
                                <option value="sunday_school">Sunday School</option>
                                <option value="workers_meeting">Workers Meeting</option>
                                <option value="prayer_meeting">Prayer Meeting</option>
                            </select>
                        </label>

                        <label className="text-sm font-medium text-slate-700">
                            Date
                            <input
                                type="date"
                                value={data.service_date}
                                onChange={(event) => setData('service_date', event.target.value)}
                                className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-slate-800 focus:border-red-400 focus:outline-none"
                                required
                            />
                        </label>

                        <label className="text-sm font-medium text-slate-700">
                            Status
                            <select
                                value={data.status}
                                onChange={(event) => setData('status', event.target.value)}
                                className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-slate-800 focus:border-red-400 focus:outline-none"
                            >
                                <option value="present">Present</option>
                                <option value="late">Late</option>
                                <option value="absent">Absent</option>
                                <option value="excused">Excused</option>
                            </select>
                        </label>

                        <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
                            <input
                                type="checkbox"
                                checked={data.first_timer}
                                onChange={(event) => setData('first_timer', Boolean(event.target.checked))}
                                className="h-4 w-4 rounded border-slate-300 text-red-600 focus:ring-red-500"
                            />
                            First timer
                        </label>

                        <label className="md:col-span-2 xl:col-span-5 text-sm font-medium text-slate-700">
                            Notes
                            <textarea
                                value={data.notes}
                                onChange={(event) => setData('notes', event.target.value)}
                                rows={3}
                                placeholder="Optional notes about the service"
                                className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-slate-800 focus:border-red-400 focus:outline-none"
                            />
                        </label>

                        <div className="md:col-span-2 xl:col-span-5 flex justify-end">
                            <button
                                type="submit"
                                disabled={processing}
                                className="rounded-full bg-red-600 px-5 py-2.5 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:bg-red-300"
                            >
                                {processing ? 'Saving...' : 'Save Attendance'}
                            </button>
                        </div>
                    </form>
                </div>

                <div className="overflow-hidden rounded-3xl border border-red-100 bg-white shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-red-100 text-left">
                            <thead className="bg-red-50">
                                <tr>
                                    <th className="px-4 py-3 text-sm font-semibold text-slate-700">Member</th>
                                    <th className="px-4 py-3 text-sm font-semibold text-slate-700">Service</th>
                                    <th className="px-4 py-3 text-sm font-semibold text-slate-700">Status</th>
                                    <th className="px-4 py-3 text-sm font-semibold text-slate-700">First Timer</th>
                                    <th className="px-4 py-3 text-sm font-semibold text-slate-700">Date</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-red-50 bg-white">
                                {attendance.length > 0 ? attendance.map((row) => (
                                    <tr key={row.id} className="hover:bg-red-50/50">
                                        <td className="px-4 py-3 text-sm font-medium text-slate-800">{row.member}</td>
                                        <td className="px-4 py-3 text-sm text-slate-600">{row.service_type}</td>
                                        <td className="px-4 py-3 text-sm">
                                            <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${row.status === 'present' ? 'bg-emerald-100 text-emerald-700' : row.status === 'late' ? 'bg-amber-100 text-amber-700' : row.status === 'absent' ? 'bg-rose-100 text-rose-700' : 'bg-slate-200 text-slate-700'}`}>
                                                {row.status}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-sm text-slate-600">{row.first_timer ? 'Yes' : 'No'}</td>
                                        <td className="px-4 py-3 text-sm text-slate-600">{row.service_date}</td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan={5} className="px-4 py-8 text-center text-sm text-slate-500">
                                            No attendance has been recorded yet.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
