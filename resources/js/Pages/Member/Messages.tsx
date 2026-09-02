import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

interface Message {
    id: number;
    subject: string;
    message: string;
    status: 'open' | 'resolved';
    created_at: string;
}

export default function Messages({ messages }: { messages: Message[] }) {
    return (
        <AuthenticatedLayout>
            <Head title="My Church Messages" />
            <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-red-600">Member communications</p>
                    <h1 className="mt-2 text-3xl font-bold text-slate-900">My Church Messages</h1>
                    <p className="mt-2 text-sm text-slate-600">Review your enquiries and see when the church team has resolved them.</p>
                </div>
                <div className="space-y-4">{messages.map((item) => <article key={item.id} className="rounded-3xl border border-red-100 bg-white p-5 shadow-sm sm:p-6"><div className="flex flex-wrap items-center justify-between gap-3"><h2 className="text-lg font-bold text-slate-900">{item.subject}</h2><span className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${item.status === 'open' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'}`}>{item.status}</span></div><p className="mt-2 text-xs uppercase tracking-[0.18em] text-slate-500">Sent {new Date(item.created_at).toLocaleDateString()}</p><p className="mt-4 whitespace-pre-line text-sm leading-relaxed text-slate-700">{item.message}</p></article>)}{!messages.length && <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 px-6 py-12 text-center text-sm text-slate-500">You have not sent any messages to the church team.</div>}</div>
            </div>
        </AuthenticatedLayout>
    );
}
