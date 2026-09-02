import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';

interface PrayerRequest {
    id: number;
    full_name: string;
    email?: string | null;
    request_type: string;
    message: string;
    is_public: boolean;
    status: 'pending' | 'prayed' | 'closed';
    created_at: string;
}

const statusStyles: Record<PrayerRequest['status'], string> = {
    pending: 'border-amber-200 bg-amber-50 text-amber-800',
    prayed: 'border-emerald-200 bg-emerald-50 text-emerald-800',
    closed: 'border-slate-200 bg-slate-100 text-slate-700',
};

export default function PrayerRequestsBoard({ prayerRequests, flash }: { prayerRequests: PrayerRequest[]; flash?: { success?: string } }) {
    const [filter, setFilter] = useState<'all' | PrayerRequest['status']>('all');
    const visibleRequests = filter === 'all' ? prayerRequests : prayerRequests.filter((request) => request.status === filter);
    const counts = prayerRequests.reduce<Record<string, number>>((total, request) => {
        total[request.status] = (total[request.status] ?? 0) + 1;
        return total;
    }, {});

    const updateStatus = (requestId: number, status: PrayerRequest['status']) => {
        router.post(`/church-admin/prayer-requests/${requestId}/status`, { status });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Prayer Requests" />
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="mb-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-red-600">Pastoral care</p>
                    <h1 className="mt-2 text-3xl font-bold text-slate-900">Prayer Request Board</h1>
                    <p className="mt-2 max-w-2xl text-sm text-slate-600">Review requests received through the church website and keep their prayer-care status up to date.</p>
                </div>

                {flash?.success && (
                    <div className="mb-6 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
                        {flash.success}
                    </div>
                )}

                <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {[
                        ['All requests', prayerRequests.length, 'border-red-100 bg-white'],
                        ['Pending prayer', counts.pending ?? 0, 'border-amber-100 bg-amber-50'],
                        ['Prayed for', counts.prayed ?? 0, 'border-emerald-100 bg-emerald-50'],
                        ['Closed', counts.closed ?? 0, 'border-slate-200 bg-slate-100'],
                    ].map(([label, count, style]) => (
                        <div key={label} className={`rounded-2xl border p-5 shadow-sm ${style}`}>
                            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{label}</p>
                            <p className="mt-3 text-3xl font-bold text-slate-900">{count}</p>
                        </div>
                    ))}
                </div>

                <div className="mb-6 flex flex-wrap gap-2">
                    {(['all', 'pending', 'prayed', 'closed'] as const).map((value) => (
                        <button
                            key={value}
                            type="button"
                            onClick={() => setFilter(value)}
                            className={`rounded-full border px-4 py-2 text-sm font-semibold capitalize transition ${filter === value ? 'border-red-600 bg-red-600 text-white' : 'border-slate-200 bg-white text-slate-600 hover:border-red-300 hover:text-red-700'}`}
                        >
                            {value === 'all' ? 'All requests' : value}
                        </button>
                    ))}
                </div>

                <div className="space-y-4">
                    {visibleRequests.map((request) => (
                        <article key={request.id} className="rounded-3xl border border-red-100 bg-white p-5 shadow-sm sm:p-6">
                            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                                <div className="min-w-0">
                                    <div className="flex flex-wrap items-center gap-3">
                                        <h2 className="text-lg font-bold text-slate-900">{request.full_name}</h2>
                                        <span className={`rounded-full border px-3 py-1 text-xs font-semibold capitalize ${statusStyles[request.status]}`}>{request.status}</span>
                                    </div>
                                    <p className="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-red-600">{request.request_type} · {new Date(request.created_at).toLocaleDateString()}</p>
                                    <p className="mt-4 text-sm leading-relaxed text-slate-700">{request.message}</p>
                                    {request.email && <p className="mt-3 text-xs text-slate-500">{request.email}</p>}
                                </div>

                                <label className="shrink-0 text-sm font-medium text-slate-700">
                                    Prayer-care status
                                    <select
                                        value={request.status}
                                        onChange={(event) => updateStatus(request.id, event.target.value as PrayerRequest['status'])}
                                        className="mt-1 block w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm lg:w-40"
                                    >
                                        <option value="pending">Pending</option>
                                        <option value="prayed">Prayed</option>
                                        <option value="closed">Closed</option>
                                    </select>
                                </label>
                            </div>
                        </article>
                    ))}

                    {!visibleRequests.length && (
                        <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 px-6 py-12 text-center text-sm text-slate-500">
                            No prayer requests match this filter.
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
