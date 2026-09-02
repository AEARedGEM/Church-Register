import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, useForm } from '@inertiajs/react';

interface Campaign {
    id: number;
    subject: string;
    body: string;
    status: string;
    scheduled_at?: string | null;
    total_recipients: number;
    sent_count_current: number;
    pending_count: number;
    failed_count_current: number;
}

export default function NewsletterCampaignsBoard({ campaigns, flash }: { campaigns: Campaign[]; flash?: { success?: string } }) {
    const { data, setData, post, processing, reset } = useForm({ subject: '', body: '', scheduled_at: '' });
    const submit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        post(route('church-admin.newsletter-campaigns.store'), { onSuccess: () => reset() });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Newsletter Campaigns" />
            <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="mb-8"><p className="text-xs font-semibold uppercase tracking-[0.25em] text-red-600">Member communications</p><h1 className="mt-2 text-3xl font-bold text-slate-900">Newsletter Campaigns</h1><p className="mt-2 text-sm text-slate-600">Draft and send updates to members who have active newsletter consent.</p></div>
                {flash?.success && <div className="mb-6 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">{flash.success}</div>}
                <form onSubmit={submit} className="mb-8 space-y-4 rounded-3xl border border-red-100 bg-white p-5 shadow-sm sm:p-6"><h2 className="text-lg font-semibold text-slate-900">Create campaign draft</h2><label className="block text-sm font-medium text-slate-700">Subject<input value={data.subject} onChange={(event) => setData('subject', event.target.value)} className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm" required /></label><label className="block text-sm font-medium text-slate-700">Message<textarea value={data.body} onChange={(event) => setData('body', event.target.value)} rows={6} className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm" required /></label><label className="block text-sm font-medium text-slate-700">Scheduled time (optional)<input type="datetime-local" value={data.scheduled_at} onChange={(event) => setData('scheduled_at', event.target.value)} className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm" /></label><button type="submit" disabled={processing} className="rounded-full bg-red-600 px-5 py-2.5 text-sm font-semibold text-white disabled:bg-red-300">{processing ? 'Saving...' : 'Save draft'}</button></form>
                <div className="space-y-4">{campaigns.map((campaign) => <article key={campaign.id} className="rounded-3xl border border-red-100 bg-white p-5 shadow-sm sm:p-6"><div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between"><div><h2 className="text-lg font-bold text-slate-900">{campaign.subject}</h2><p className="mt-2 whitespace-pre-line text-sm leading-6 text-slate-600">{campaign.body}</p></div><span className="w-fit rounded-full bg-red-50 px-3 py-1 text-xs font-semibold capitalize text-red-700">{campaign.status}</span></div><div className="mt-4 flex flex-wrap items-center gap-4 border-t border-slate-100 pt-4 text-xs text-slate-500"><span>Total: {campaign.total_recipients}</span><span>Sent: {campaign.sent_count_current}</span><span>Pending: {campaign.pending_count}</span><span>Failed: {campaign.failed_count_current}</span>{campaign.status === 'draft' && <button type="button" onClick={() => router.post(route('church-admin.newsletter-campaigns.send', campaign.id))} className="rounded-full bg-red-600 px-4 py-2 text-xs font-semibold text-white">Send campaign</button>}</div></article>)}{!campaigns.length && <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-sm text-slate-500">No newsletter campaigns yet.</div>}</div>
            </div>
        </AuthenticatedLayout>
    );
}
