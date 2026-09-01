import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';

interface Meeting {
    id: number;
    topic: string;
    meeting_date: string;
    leader_name: string;
    summary?: string;
    status: string;
}

export default function WorkersMeetingBoard({ meetings, flash }: { meetings: Meeting[]; flash?: { success?: string } }) {
    const { data, setData, post, processing } = useForm({
        topic: '',
        meeting_date: new Date().toISOString().slice(0, 10),
        leader_name: '',
        summary: '',
        status: 'scheduled',
    });

    const submit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        post('/church-admin/workers-meetings');
    };

    return (
        <AuthenticatedLayout>
            <Head title="Workers Meetings" />
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="mb-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-red-600">Workers</p>
                    <h1 className="mt-2 text-3xl font-bold text-slate-900">Workers Meeting Board</h1>
                </div>

                {flash?.success && (
                    <div className="mb-6 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
                        {flash.success}
                    </div>
                )}

                <div className="mb-8 rounded-3xl border border-red-100 bg-white p-5 shadow-sm">
                    <h2 className="mb-4 text-lg font-semibold text-slate-900">Schedule meeting</h2>
                    <form onSubmit={submit} className="grid gap-4 md:grid-cols-2">
                        <label className="text-sm font-medium text-slate-700">
                            Topic
                            <input
                                value={data.topic}
                                onChange={(event) => setData('topic', event.target.value)}
                                className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm"
                                required
                            />
                        </label>
                        <label className="text-sm font-medium text-slate-700">
                            Leader name
                            <input
                                value={data.leader_name}
                                onChange={(event) => setData('leader_name', event.target.value)}
                                className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm"
                                required
                            />
                        </label>
                        <label className="text-sm font-medium text-slate-700">
                            Meeting date
                            <input
                                type="date"
                                value={data.meeting_date}
                                onChange={(event) => setData('meeting_date', event.target.value)}
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
                                <option value="scheduled">Scheduled</option>
                                <option value="completed">Completed</option>
                                <option value="cancelled">Cancelled</option>
                            </select>
                        </label>
                        <label className="text-sm font-medium text-slate-700 md:col-span-2">
                            Summary
                            <textarea
                                value={data.summary}
                                onChange={(event) => setData('summary', event.target.value)}
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
                                {processing ? 'Saving...' : 'Schedule Meeting'}
                            </button>
                        </div>
                    </form>
                </div>

                <div className="overflow-hidden rounded-3xl border border-red-100 bg-white shadow-sm">
                    <table className="min-w-full divide-y divide-red-100 text-left">
                        <thead className="bg-red-50">
                            <tr>
                                <th className="px-4 py-3 text-sm font-semibold text-slate-700">Topic</th>
                                <th className="px-4 py-3 text-sm font-semibold text-slate-700">Leader</th>
                                <th className="px-4 py-3 text-sm font-semibold text-slate-700">Date</th>
                                <th className="px-4 py-3 text-sm font-semibold text-slate-700">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-red-50 bg-white">
                            {meetings.length > 0 ? meetings.map((meeting) => (
                                <tr key={meeting.id} className="hover:bg-red-50/40">
                                    <td className="px-4 py-3 text-sm font-medium text-slate-800">{meeting.topic}</td>
                                    <td className="px-4 py-3 text-sm text-slate-600">{meeting.leader_name}</td>
                                    <td className="px-4 py-3 text-sm text-slate-600">{meeting.meeting_date}</td>
                                    <td className="px-4 py-3 text-sm">
                                        <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${meeting.status === 'scheduled' ? 'bg-amber-100 text-amber-700' : meeting.status === 'completed' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-700'}`}>
                                            {meeting.status}
                                        </span>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan={4} className="px-4 py-8 text-center text-sm text-slate-500">No workers meetings have been scheduled yet.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
