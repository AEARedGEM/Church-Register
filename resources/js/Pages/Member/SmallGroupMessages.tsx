import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

interface Group {
    id: number;
    name: string;
}

interface Message {
    id: number;
    body: string;
    created_at: string;
    user?: { name?: string | null };
}

export default function SmallGroupMessages({ group, messages, flash }: { group: Group; messages: Message[]; flash?: { success?: string } }) {
    const { data, setData, post, processing, reset, errors } = useForm({ body: '' });

    const submit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        post(`/small-groups/${group.id}/messages`, { onSuccess: () => reset('body') });
    };

    return (
        <AuthenticatedLayout>
            <Head title={`${group.name} Messages`} />
            <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-red-600">Small group</p>
                        <h1 className="mt-2 text-3xl font-bold text-slate-900">{group.name}</h1>
                        <p className="mt-2 text-sm text-slate-600">Private group conversation</p>
                    </div>
                    <Link href={route('small-groups')} className="text-sm font-semibold text-red-600 hover:text-red-500">All groups</Link>
                </div>

                {flash?.success && <div className="mb-6 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">{flash.success}</div>}

                <form onSubmit={submit} className="mb-8 rounded-3xl border border-red-100 bg-white p-5 shadow-sm">
                    <label className="block text-sm font-medium text-slate-700">Share with your group<textarea value={data.body} onChange={(event) => setData('body', event.target.value)} rows={4} className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm" required /></label>
                    {errors.body && <p className="mt-2 text-xs text-red-600">{errors.body}</p>}
                    <button type="submit" disabled={processing} className="mt-4 rounded-full bg-red-600 px-5 py-2.5 text-sm font-semibold text-white disabled:bg-red-300">{processing ? 'Posting...' : 'Post message'}</button>
                </form>

                <div className="space-y-4">
                    {messages.length > 0 ? messages.map((message) => (
                        <article key={message.id} className="rounded-3xl border border-red-100 bg-white p-5 shadow-sm">
                            <div className="flex flex-wrap items-center justify-between gap-2">
                                <p className="text-sm font-semibold text-slate-900">{message.user?.name || 'Member'}</p>
                                <time className="text-xs text-slate-500">{new Date(message.created_at).toLocaleString()}</time>
                            </div>
                            <p className="mt-3 whitespace-pre-line text-sm leading-6 text-slate-700">{message.body}</p>
                        </article>
                    )) : <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-sm text-slate-500">No messages in this group yet.</div>}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
