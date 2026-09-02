import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';

interface Announcement {
    id: number;
    title: string;
    body: string;
    published_at?: string | null;
    status: string;
}

export default function AnnouncementsBoard({ announcements, flash }: { announcements: Announcement[]; flash?: { success?: string } }) {
    const { data, setData, post, processing, reset } = useForm<{
        title: string;
        body: string;
        published_at: string;
        status: string;
    }>({
        title: '',
        body: '',
        published_at: new Date().toISOString().slice(0, 10),
        status: 'draft',
    });

    const submit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        post(route('church-admin.announcements.store'), { onSuccess: () => reset() });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Church Announcements" />
            <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="mb-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-red-600">Church communications</p>
                    <h1 className="mt-2 text-3xl font-bold text-slate-900">Announcements</h1>
                    <p className="mt-2 text-sm text-slate-600">Prepare notices for services, ministries, and the church community.</p>
                </div>
                {flash?.success && <div className="mb-6 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">{flash.success}</div>}
                <form onSubmit={submit} className="mb-8 space-y-4 rounded-3xl border border-red-100 bg-white p-5 shadow-sm sm:p-6">
                    <h2 className="text-lg font-semibold text-slate-900">Create an announcement</h2>
                    <label className="block text-sm font-medium text-slate-700">Title<input value={data.title} onChange={(event) => setData('title', event.target.value)} className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm" required /></label>
                    <label className="block text-sm font-medium text-slate-700">Message<textarea value={data.body} onChange={(event) => setData('body', event.target.value)} rows={5} className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm" required /></label>
                    <div className="grid gap-4 md:grid-cols-2">
                        <label className="text-sm font-medium text-slate-700">Publish date<input type="date" value={data.published_at} onChange={(event) => setData('published_at', event.target.value)} className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm" /></label>
                        <label className="text-sm font-medium text-slate-700">Status<select value={data.status} onChange={(event) => setData('status', event.target.value)} className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm"><option value="draft">Draft</option><option value="published">Published</option><option value="archived">Archived</option></select></label>
                    </div>
                    <button type="submit" disabled={processing} className="rounded-full bg-red-600 px-5 py-2.5 text-sm font-semibold text-white disabled:bg-red-300">{processing ? 'Saving...' : 'Save announcement'}</button>
                </form>
                <div className="space-y-4">{announcements.map((announcement) => <article key={announcement.id} className="rounded-2xl border border-red-100 bg-white p-5 shadow-sm"><div className="flex flex-wrap items-start justify-between gap-3"><div><h2 className="text-lg font-semibold text-slate-900">{announcement.title}</h2><p className="mt-1 text-xs text-slate-500">{announcement.published_at || 'No publish date'}</p></div><span className="rounded-full bg-red-50 px-3 py-1 text-xs font-semibold capitalize text-red-700">{announcement.status}</span></div><p className="mt-4 whitespace-pre-line text-sm leading-6 text-slate-600">{announcement.body}</p></article>)}{!announcements.length && <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-sm text-slate-500">No announcements have been created yet.</div>}</div>
            </div>
        </AuthenticatedLayout>
    );
}
