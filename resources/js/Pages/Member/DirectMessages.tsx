import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router, useForm } from '@inertiajs/react';

interface Thread {
    peer: { id: number; name: string };
    latest_message: { body: string; created_at: string };
    unread_count: number;
}

interface DirectMessage {
    id: number;
    sender_id: number;
    body: string;
    created_at: string;
}

export default function DirectMessages({ threads, search, searchResults, activeUser, messages }: { threads: Thread[]; search: string; searchResults: { id: number; name: string }[]; activeUser: { id: number; name: string } | null; messages: DirectMessage[] }) {
    const searchForm = useForm({ search });
    const messageForm = useForm({ body: '' });
    const submitSearch = (event: React.FormEvent<HTMLFormElement>) => { event.preventDefault(); router.get(route('member.direct-messages'), { search: searchForm.data.search }, { preserveState: true }); };
    const sendMessage = (event: React.FormEvent<HTMLFormElement>) => { event.preventDefault(); if (activeUser) messageForm.post(route('member.direct-messages.store', activeUser.id), { onSuccess: () => messageForm.reset() }); };

    return (
        <AuthenticatedLayout>
            <Head title="Direct Messages" />
            <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="mb-8"><p className="text-xs font-semibold uppercase tracking-[0.25em] text-red-600">Member communications</p><h1 className="mt-2 text-3xl font-bold text-slate-900">Direct Messages</h1><p className="mt-2 text-sm text-slate-600">Have a private conversation with another member.</p></div>
                <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
                    <aside className="rounded-3xl border border-red-100 bg-white p-5 shadow-sm"><h2 className="text-lg font-semibold text-slate-900">Find a member</h2><form onSubmit={submitSearch} className="mt-4 flex gap-2"><input value={searchForm.data.search} onChange={(event) => searchForm.setData('search', event.target.value)} placeholder="Search by name" className="min-w-0 flex-1 rounded-xl border border-slate-200 px-3 py-2.5 text-sm" /><button type="submit" className="rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white">Search</button></form>{searchResults.length > 0 && <div className="mt-4 space-y-2">{searchResults.map((result) => <Link key={result.id} href={route('member.direct-messages.show', result.id)} className="block rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">Message {result.name}</Link>)}</div>}<h2 className="mt-8 text-lg font-semibold text-slate-900">Recent conversations</h2><div className="mt-4 space-y-2">{threads.map((thread) => <Link key={thread.peer.id} href={route('member.direct-messages.show', thread.peer.id)} className="block rounded-xl border border-slate-100 px-4 py-3 transition hover:border-red-200 hover:bg-red-50"><div className="flex items-center justify-between gap-3"><span className="font-semibold text-slate-800">{thread.peer.name}</span>{thread.unread_count > 0 && <span className="rounded-full bg-red-600 px-2 py-1 text-xs font-semibold text-white">{thread.unread_count}</span>}</div><p className="mt-1 truncate text-xs text-slate-500">{thread.latest_message.body}</p></Link>)}{!threads.length && <p className="text-sm text-slate-500">No conversations yet.</p>}</div></aside>
                    <section className="rounded-3xl border border-red-100 bg-white p-5 shadow-sm sm:p-6">{activeUser ? <><div className="border-b border-slate-100 pb-4"><p className="text-xs font-semibold uppercase tracking-[0.2em] text-red-600">Conversation</p><h2 className="mt-2 text-2xl font-bold text-slate-900">{activeUser.name}</h2></div><div className="min-h-[280px] space-y-3 py-6">{messages.map((message) => <div key={message.id} className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm ${message.sender_id === activeUser.id ? 'bg-slate-100 text-slate-700' : 'ml-auto bg-red-600 text-white'}`}><p className="whitespace-pre-line">{message.body}</p><p className={`mt-2 text-[11px] ${message.sender_id === activeUser.id ? 'text-slate-400' : 'text-red-100'}`}>{new Date(message.created_at).toLocaleString()}</p></div>)}{!messages.length && <p className="text-sm text-slate-500">Start this private conversation.</p>}</div><form onSubmit={sendMessage} className="border-t border-slate-100 pt-4"><textarea value={messageForm.data.body} onChange={(event) => messageForm.setData('body', event.target.value)} rows={4} placeholder="Write a private message" className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm" required /><button type="submit" disabled={messageForm.processing} className="mt-3 rounded-full bg-red-600 px-5 py-2.5 text-sm font-semibold text-white disabled:bg-red-300">{messageForm.processing ? 'Sending...' : 'Send message'}</button></form></> : <div className="flex min-h-[420px] items-center justify-center text-center"><div><h2 className="text-xl font-semibold text-slate-900">Choose a conversation</h2><p className="mt-2 text-sm text-slate-500">Search for a member or select a recent conversation.</p></div></div>}</section>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
