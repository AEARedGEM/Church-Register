import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';

interface Scorecard {
    id: number;
    period_type: string;
    title: string;
    report_date: string;
    invitation_count: number;
    new_visitors_count: number;
    conversion_count: number;
    score: number;
    notes?: string;
}

export default function ScorecardsDashboard({ scorecards, flash }: { scorecards: Scorecard[]; flash?: { success?: string } }) {
    const { data, setData, post, processing } = useForm({
        period_type: 'weekly',
        title: '',
        report_date: new Date().toISOString().slice(0, 10),
        invitation_count: 0,
        new_visitors_count: 0,
        conversion_count: 0,
        score: 0,
        notes: '',
    });

    const submit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        post('/church-admin/scorecards');
    };

    return (
        <AuthenticatedLayout>
            <Head title="Invitation League & Scorecards" />
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="mb-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-red-600">Scorecards</p>
                    <h1 className="mt-2 text-3xl font-bold text-slate-900">Invitation League & Church Scorecards</h1>
                </div>

                {flash?.success && (
                    <div className="mb-6 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
                        {flash.success}
                    </div>
                )}

                <div className="mb-8 rounded-3xl border border-red-100 bg-white p-5 shadow-sm">
                    <h2 className="mb-4 text-lg font-semibold text-slate-900">Add scorecard entry</h2>
                    <form onSubmit={submit} className="grid gap-4 md:grid-cols-2">
                        <label className="text-sm font-medium text-slate-700">
                            Period type
                            <select
                                value={data.period_type}
                                onChange={(event) => setData('period_type', event.target.value)}
                                className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm"
                            >
                                <option value="weekly">Weekly</option>
                                <option value="monthly">Monthly</option>
                                <option value="quarterly">Quarterly</option>
                                <option value="annual">Annual</option>
                            </select>
                        </label>
                        <label className="text-sm font-medium text-slate-700">
                            Title
                            <input
                                value={data.title}
                                onChange={(event) => setData('title', event.target.value)}
                                className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm"
                                required
                            />
                        </label>
                        <label className="text-sm font-medium text-slate-700">
                            Report date
                            <input
                                type="date"
                                value={data.report_date}
                                onChange={(event) => setData('report_date', event.target.value)}
                                className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm"
                                required
                            />
                        </label>
                        <label className="text-sm font-medium text-slate-700">
                            Score
                            <input
                                type="number"
                                min={0}
                                max={100}
                                value={data.score}
                                onChange={(event) => setData('score', Number(event.target.value) || 0)}
                                className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm"
                            />
                        </label>
                        <label className="text-sm font-medium text-slate-700">
                            Invitations
                            <input
                                type="number"
                                min={0}
                                value={data.invitation_count}
                                onChange={(event) => setData('invitation_count', Number(event.target.value) || 0)}
                                className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm"
                            />
                        </label>
                        <label className="text-sm font-medium text-slate-700">
                            New visitors
                            <input
                                type="number"
                                min={0}
                                value={data.new_visitors_count}
                                onChange={(event) => setData('new_visitors_count', Number(event.target.value) || 0)}
                                className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm"
                            />
                        </label>
                        <label className="text-sm font-medium text-slate-700">
                            Conversions
                            <input
                                type="number"
                                min={0}
                                value={data.conversion_count}
                                onChange={(event) => setData('conversion_count', Number(event.target.value) || 0)}
                                className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm"
                            />
                        </label>
                        <div className="md:col-span-2">
                            <label className="text-sm font-medium text-slate-700">
                                Notes
                                <textarea
                                    value={data.notes}
                                    onChange={(event) => setData('notes', event.target.value)}
                                    rows={3}
                                    className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm"
                                />
                            </label>
                        </div>
                        <div className="md:col-span-2">
                            <button
                                type="submit"
                                disabled={processing}
                                className="rounded-full bg-red-600 px-5 py-2.5 text-sm font-semibold text-white disabled:bg-red-300"
                            >
                                {processing ? 'Saving...' : 'Create Scorecard'}
                            </button>
                        </div>
                    </form>
                </div>

                <div className="overflow-hidden rounded-3xl border border-red-100 bg-white shadow-sm">
                    <table className="min-w-full divide-y divide-red-100 text-left">
                        <thead className="bg-red-50">
                            <tr>
                                <th className="px-4 py-3 text-sm font-semibold text-slate-700">Period</th>
                                <th className="px-4 py-3 text-sm font-semibold text-slate-700">Title</th>
                                <th className="px-4 py-3 text-sm font-semibold text-slate-700">Date</th>
                                <th className="px-4 py-3 text-sm font-semibold text-slate-700">Score</th>
                                <th className="px-4 py-3 text-sm font-semibold text-slate-700">Visitors</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-red-50 bg-white">
                            {scorecards.length > 0 ? scorecards.map((scorecard) => (
                                <tr key={scorecard.id} className="hover:bg-red-50/40">
                                    <td className="px-4 py-3 text-sm font-medium text-slate-800 capitalize">{scorecard.period_type}</td>
                                    <td className="px-4 py-3 text-sm text-slate-600">{scorecard.title}</td>
                                    <td className="px-4 py-3 text-sm text-slate-600">{scorecard.report_date}</td>
                                    <td className="px-4 py-3 text-sm text-slate-600">{scorecard.score}</td>
                                    <td className="px-4 py-3 text-sm text-slate-600">{scorecard.new_visitors_count}</td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan={5} className="px-4 py-8 text-center text-sm text-slate-500">No scorecards have been recorded yet.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
