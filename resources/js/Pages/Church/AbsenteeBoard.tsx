import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';

interface AbsenteeRecord {
    id: number;
    member_name: string;
    reason?: string;
    service_type: string;
    service_date: string;
    status: string;
}

export default function AbsenteeBoard({ absentees, flash }: { absentees: AbsenteeRecord[]; flash?: { success?: string } }) {
    const { data, setData, post, processing } = useForm({
        member_name: '',
        reason: '',
        service_type: 'main_service',
        service_date: new Date().toISOString().slice(0, 10),
        status: 'absent',
    });

    const submit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        post('/church-admin/absentees');
    };

    return (
        <AuthenticatedLayout>
            <Head title="Absentee Board" />
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="mb-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-red-600">Service Visibility</p>
                    <h1 className="mt-2 text-3xl font-bold text-slate-900">Absentee Board</h1>
                </div>

                {flash?.success && (
                    <div className="mb-6 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
                        {flash.success}
                    </div>
                )}

                <div className="mb-8 rounded-3xl border border-red-100 bg-white p-5 shadow-sm">
                    <h2 className="mb-4 text-lg font-semibold text-slate-900">Record absentee</h2>
                    <form onSubmit={submit} className="grid gap-4 md:grid-cols-2">
                        <label className="text-sm font-medium text-slate-700">
                            Member name
                            <input
                                value={data.member_name}
                                onChange={(event) => setData('member_name', event.target.value)}
                                className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm"
                                required
                            />
                        </label>
                        <label className="text-sm font-medium text-slate-700">
                            Service type
                            <select
                                value={data.service_type}
                                onChange={(event) => setData('service_type', event.target.value)}
                                className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm"
                            >
                                <option value="main_service">Main Service</option>
                                <option value="sunday_school">Sunday School</option>
                                <option value="workers_meeting">Workers Meeting</option>
                                <option value="outreach">Outreach</option>
                            </select>
                        </label>
                        <label className="text-sm font-medium text-slate-700">
                            Service date
                            <input
                                type="date"
                                value={data.service_date}
                                onChange={(event) => setData('service_date', event.target.value)}
                                className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm"
                                required
                            />
                        </label>
                        <label className="text-sm font-medium text-slate-700">
                            Status
                            <select
                                value={data.status}
                                onChange={(event) => setData('status', event.target.value)}
                                className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm"
                            >
                                <option value="absent">Absent</option>
                                <option value="excused">Excused</option>
                                <option value="late">Late</option>
                            </select>
                        </label>
                        <label className="text-sm font-medium text-slate-700 md:col-span-2">
                            Reason
                            <textarea
                                value={data.reason}
                                onChange={(event) => setData('reason', event.target.value)}
                                rows={3}
                                className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm"
                            />
                        </label>
                        <div className="md:col-span-2">
                            <button
                                type="submit"
                                disabled={processing}
                                className="rounded-full bg-red-600 px-5 py-2.5 text-sm font-semibold text-white disabled:bg-red-300"
                            >
                                {processing ? 'Saving...' : 'Record Absence'}
                            </button>
                        </div>
                    </form>
                </div>

                <div className="overflow-hidden rounded-3xl border border-red-100 bg-white shadow-sm">
                    <table className="min-w-full divide-y divide-red-100 text-left">
                        <thead className="bg-red-50">
                            <tr>
                                <th className="px-4 py-3 text-sm font-semibold text-slate-700">Member</th>
                                <th className="px-4 py-3 text-sm font-semibold text-slate-700">Service</th>
                                <th className="px-4 py-3 text-sm font-semibold text-slate-700">Date</th>
                                <th className="px-4 py-3 text-sm font-semibold text-slate-700">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-red-50 bg-white">
                            {absentees.length > 0 ? absentees.map((entry) => (
                                <tr key={entry.id} className="hover:bg-red-50/40">
                                    <td className="px-4 py-3 text-sm font-medium text-slate-800">{entry.member_name}</td>
                                    <td className="px-4 py-3 text-sm text-slate-600 capitalize">{entry.service_type.replace('_', ' ')}</td>
                                    <td className="px-4 py-3 text-sm text-slate-600">{entry.service_date}</td>
                                    <td className="px-4 py-3 text-sm">
                                        <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${entry.status === 'absent' ? 'bg-red-100 text-red-700' : entry.status === 'excused' ? 'bg-amber-100 text-amber-700' : 'bg-slate-200 text-slate-700'}`}>
                                            {entry.status}
                                        </span>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan={4} className="px-4 py-8 text-center text-sm text-slate-500">No absentees have been recorded yet.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
