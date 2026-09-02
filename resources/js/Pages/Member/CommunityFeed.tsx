import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';

interface Community {
    id: number;
    name: string;
}

interface Post {
    id: number;
    title?: string | null;
    content: string;
    created_at: string;
    user?: { name: string };
    community?: { name: string };
}

export default function CommunityFeed({ communities, posts }: { communities: Community[]; posts: Post[] }) {
    const { data, setData, post, processing, reset, errors } = useForm({ community_id: communities[0]?.id || '', title: '', content: '' });
    const submit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        post(route('community.posts.store'), { onSuccess: () => reset('title', 'content') });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Community Feed" />
            <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="mb-8"><p className="text-xs font-semibold uppercase tracking-[0.25em] text-red-600">Member community</p><h1 className="mt-2 text-3xl font-bold text-slate-900">Community Feed</h1><p className="mt-2 text-sm text-slate-600">Share encouragement, questions, and updates with the communities you belong to.</p></div>
                {communities.length > 0 && <form onSubmit={submit} className="mb-8 space-y-4 rounded-3xl border border-red-100 bg-white p-5 shadow-sm sm:p-6"><h2 className="text-lg font-semibold text-slate-900">Start a conversation</h2><label className="block text-sm font-medium text-slate-700">Community<select value={data.community_id} onChange={(event) => setData('community_id', Number(event.target.value))} className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm">{communities.map((community) => <option key={community.id} value={community.id}>{community.name}</option>)}</select></label><label className="block text-sm font-medium text-slate-700">Title<input value={data.title} onChange={(event) => setData('title', event.target.value)} className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm" /></label><label className="block text-sm font-medium text-slate-700">Message<textarea value={data.content} onChange={(event) => setData('content', event.target.value)} rows={4} className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm" required />{errors.content && <span className="text-xs text-red-600">{errors.content}</span>}</label><button type="submit" disabled={processing} className="rounded-full bg-red-600 px-5 py-2.5 text-sm font-semibold text-white disabled:bg-red-300">{processing ? 'Posting...' : 'Post to community'}</button></form>}
                {!communities.length && <div className="mb-8 rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-sm text-slate-500">Join a community to participate in member conversations.</div>}
                <div className="space-y-4">{posts.map((item) => <article key={item.id} className="rounded-3xl border border-red-100 bg-white p-5 shadow-sm"><p className="text-xs font-semibold uppercase tracking-[0.18em] text-red-600">{item.community?.name || 'Community'} · {item.user?.name || 'Member'}</p>{item.title && <h2 className="mt-2 text-lg font-bold text-slate-900">{item.title}</h2>}<p className="mt-3 whitespace-pre-line text-sm leading-6 text-slate-700">{item.content}</p><p className="mt-3 text-xs text-slate-500">{new Date(item.created_at).toLocaleString()}</p></article>)}{!posts.length && <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-sm text-slate-500">No conversations in your communities yet.</div>}</div>
            </div>
        </AuthenticatedLayout>
    );
}
