import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

interface Subscriber {
    id: number;
    email: string;
    status: 'active' | 'unsubscribed';
    subscribed_at?: string | null;
    unsubscribed_at?: string | null;
}

export default function NewsletterSubscribersBoard({ subscribers }: { subscribers: Subscriber[] }) {
    const activeCount = subscribers.filter((subscriber) => subscriber.status === 'active').length;

    return (
        <AuthenticatedLayout>
            <Head title="Newsletter Subscribers" />
            <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="mb-8 flex flex-wrap items-end justify-between gap-4"><div><p className="text-xs font-semibold uppercase tracking-[0.25em] text-red-600">Member communications</p><h1 className="mt-2 text-3xl font-bold text-slate-900">Newsletter Subscribers</h1><p className="mt-2 text-sm text-slate-600">Manage consent records for future church newsletter delivery.</p></div><Link href={route('church-admin.newsletter-campaigns')} className="rounded-full bg-red-600 px-4 py-2.5 text-sm font-semibold text-white">Campaigns</Link></div>
                <div className="mb-6 grid gap-4 sm:grid-cols-2"><div className="rounded-2xl border border-red-100 bg-white p-5 shadow-sm"><p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">All subscribers</p><p className="mt-3 text-3xl font-bold text-slate-900">{subscribers.length}</p></div><div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-5"><p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">Active consent</p><p className="mt-3 text-3xl font-bold text-slate-900">{activeCount}</p></div></div>
                <div className="overflow-hidden rounded-3xl border border-red-100 bg-white shadow-sm"><table className="min-w-full divide-y divide-red-100 text-left"><thead className="bg-red-50"><tr><th className="px-4 py-3 text-sm font-semibold text-slate-700">Email</th><th className="px-4 py-3 text-sm font-semibold text-slate-700">Status</th><th className="px-4 py-3 text-sm font-semibold text-slate-700">Subscribed</th></tr></thead><tbody className="divide-y divide-red-50">{subscribers.map((subscriber) => <tr key={subscriber.id}><td className="px-4 py-3 text-sm text-slate-700">{subscriber.email}</td><td className="px-4 py-3 text-sm"><span className={`rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${subscriber.status === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-600'}`}>{subscriber.status}</span></td><td className="px-4 py-3 text-sm text-slate-500">{subscriber.subscribed_at ? new Date(subscriber.subscribed_at).toLocaleDateString() : 'Not recorded'}</td></tr>)}</tbody></table>{!subscribers.length && <p className="p-8 text-center text-sm text-slate-500">No newsletter subscribers yet.</p>}</div>
            </div>
        </AuthenticatedLayout>
    );
}
