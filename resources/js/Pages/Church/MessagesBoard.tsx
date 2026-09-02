import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';

interface ChurchMessage {
    id: number;
    full_name: string;
    email: string;
    subject: string;
    message: string;
    status: 'open' | 'resolved';
    created_at: string;
}

export default function MessagesBoard({ messages, flash }: { messages: ChurchMessage[]; flash?: { success?: string } }) {
    const [filter, setFilter] = useState<'all' | ChurchMessage['status']>('all');
    const visibleMessages = filter === 'all' ? messages : messages.filter((message) => message.status === filter);
    const openCount = messages.filter((message) => message.status === 'open').length;

    return (
        <AuthenticatedLayout>
            <Head title="Church Messages" />
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="mb-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-red-600">Member communications</p>
                    <h1 className="mt-2 text-3xl font-bold text-slate-900">Church Message Inbox</h1>
                    <p className="mt-2 text-sm text-slate-600">Review enquiries and follow up with people who contact the church.</p>
                </div>
                {flash?.success && <div className="mb-6 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">{flash.success}</div>}

                <div className="mb-8 grid gap-4 sm:grid-cols-2">
                    <div className="rounded-2xl border border-red-100 bg-white p-5 shadow-sm"><p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">All messages</p><p className="mt-3 text-3xl font-bold text-slate-900">{messages.length}</p></div>
                    <div className="rounded-2xl border border-amber-100 bg-amber-50 p-5 shadow-sm"><p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-700">Open messages</p><p className="mt-3 text-3xl font-bold text-slate-900">{openCount}</p></div>
                </div>

                <div className="mb-6 flex gap-2">
                    {(['all', 'open', 'resolved'] as const).map((value) => <button key={value} type="button" onClick={() => setFilter(value)} className={`rounded-full border px-4 py-2 text-sm font-semibold capitalize transition ${filter === value ? 'border-red-600 bg-red-600 text-white' : 'border-slate-200 bg-white text-slate-600 hover:border-red-300 hover:text-red-700'}`}>{value === 'all' ? 'All messages' : value}</button>)}
                </div>

                <div className="space-y-4">
                    {visibleMessages.map((message) => <article key={message.id} className="rounded-3xl border border-red-100 bg-white p-5 shadow-sm sm:p-6"><div className="flex flex-col gap-4 lg:flex-row lg:justify-between"><div><div className="flex flex-wrap items-center gap-3"><h2 className="text-lg font-bold text-slate-900">{message.subject}</h2><span className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${message.status === 'open' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'}`}>{message.status}</span></div><p className="mt-1 text-xs uppercase tracking-[0.18em] text-red-600">{message.full_name} · {new Date(message.created_at).toLocaleDateString()}</p><p className="mt-4 text-sm leading-relaxed text-slate-700">{message.message}</p><a href={`mailto:${message.email}`} className="mt-3 inline-block text-sm text-red-700 hover:text-red-500">{message.email}</a></div><select value={message.status} onChange={(event) => router.post(`/church-admin/messages/${message.id}/status`, { status: event.target.value })} className="h-fit rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm lg:w-36"><option value="open">Open</option><option value="resolved">Resolved</option></select></div></article>)}
                    {!visibleMessages.length && <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 px-6 py-12 text-center text-sm text-slate-500">No messages match this filter.</div>}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
