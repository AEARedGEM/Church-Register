import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';

interface MediaContent {
    id: number;
    content_type: string;
    title: string;
    speaker_name?: string;
    published_at: string;
    video_url?: string;
    summary?: string;
    scripture_reference?: string;
    featured: boolean;
    status: string;
}

export default function MediaContentBoard({ media, flash }: { media: MediaContent[]; flash?: { success?: string } }) {
    const { data, setData, post, processing } = useForm<{
        content_type: string;
        title: string;
        speaker_name: string;
        published_at: string;
        video_url: string;
        summary: string;
        scripture_reference: string;
        featured: boolean;
        status: string;
    }>({
        content_type: 'interview',
        title: '',
        speaker_name: '',
        published_at: new Date().toISOString().slice(0, 10),
        video_url: '',
        summary: '',
        scripture_reference: '',
        featured: true,
        status: 'published',
    });

    const submit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        post('/church-admin/media');
    };

    return (
        <AuthenticatedLayout>
            <Head title="Media & Interviews" />
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="mb-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-red-600">Media</p>
                    <h1 className="mt-2 text-3xl font-bold text-slate-900">Interviews & Media Content</h1>
                </div>

                {flash?.success && (
                    <div className="mb-6 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
                        {flash.success}
                    </div>
                )}

                <div className="mb-8 rounded-3xl border border-red-100 bg-white p-5 shadow-sm">
                    <h2 className="mb-4 text-lg font-semibold text-slate-900">Add media content</h2>
                    <form onSubmit={submit} className="grid gap-4 md:grid-cols-2">
                        <label className="text-sm font-medium text-slate-700">
                            Content type
                            <select
                                value={data.content_type}
                                onChange={(event) => setData('content_type', event.target.value)}
                                className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm"
                            >
                                <option value="interview">Interview</option>
                                <option value="sermon">Sermon</option>
                                <option value="testimony">Testimony</option>
                                <option value="highlight">Highlight</option>
                                <option value="music">Music</option>
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
                            Speaker name
                            <input
                                value={data.speaker_name}
                                onChange={(event) => setData('speaker_name', event.target.value)}
                                className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm"
                            />
                        </label>
                        <label className="text-sm font-medium text-slate-700">
                            Published date
                            <input
                                type="date"
                                value={data.published_at}
                                onChange={(event) => setData('published_at', event.target.value)}
                                className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm"
                                required
                            />
                        </label>
                        <label className="text-sm font-medium text-slate-700 md:col-span-2">
                            Video URL
                            <input
                                type="url"
                                value={data.video_url}
                                onChange={(event) => setData('video_url', event.target.value)}
                                className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm"
                            />
                        </label>
                        <label className="text-sm font-medium text-slate-700 md:col-span-2">
                            Summary
                            <textarea
                                value={data.summary}
                                onChange={(event) => setData('summary', event.target.value)}
                                rows={3}
                                className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm"
                            />
                        </label>
                        <label className="text-sm font-medium text-slate-700">
                            Scripture reference
                            <input
                                value={data.scripture_reference}
                                onChange={(event) => setData('scripture_reference', event.target.value)}
                                className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm"
                                placeholder="John 3:16"
                            />
                        </label>
                        <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
                            <input
                                type="checkbox"
                                checked={data.featured}
                                onChange={(event) => setData('featured', Boolean(event.target.checked))}
                                className="h-4 w-4 rounded border-slate-300 text-red-600"
                            />
                            Feature on homepage
                        </label>
                        <label className="text-sm font-medium text-slate-700">
                            Status
                            <select
                                value={data.status}
                                onChange={(event) => setData('status', event.target.value)}
                                className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm"
                            >
                                <option value="draft">Draft</option>
                                <option value="published">Published</option>
                                <option value="archived">Archived</option>
                            </select>
                        </label>
                        <div className="md:col-span-2">
                            <button
                                type="submit"
                                disabled={processing}
                                className="rounded-full bg-red-600 px-5 py-2.5 text-sm font-semibold text-white disabled:bg-red-300"
                            >
                                {processing ? 'Saving...' : 'Save Content'}
                            </button>
                        </div>
                    </form>
                </div>

                <div className="overflow-hidden rounded-3xl border border-red-100 bg-white shadow-sm">
                    <table className="min-w-full divide-y divide-red-100 text-left">
                        <thead className="bg-red-50">
                            <tr>
                                <th className="px-4 py-3 text-sm font-semibold text-slate-700">Type</th>
                                <th className="px-4 py-3 text-sm font-semibold text-slate-700">Title</th>
                                <th className="px-4 py-3 text-sm font-semibold text-slate-700">Speaker</th>
                                <th className="px-4 py-3 text-sm font-semibold text-slate-700">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-red-50 bg-white">
                            {media.length > 0 ? media.map((item) => (
                                <tr key={item.id} className="hover:bg-red-50/40">
                                    <td className="px-4 py-3 text-sm font-medium text-slate-800 capitalize">{item.content_type}</td>
                                    <td className="px-4 py-3 text-sm text-slate-600">{item.title}</td>
                                    <td className="px-4 py-3 text-sm text-slate-600">{item.speaker_name || '—'}</td>
                                    <td className="px-4 py-3 text-sm">
                                        <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${item.status === 'published' ? 'bg-emerald-100 text-emerald-700' : item.status === 'draft' ? 'bg-amber-100 text-amber-700' : 'bg-slate-200 text-slate-700'}`}>
                                            {item.status}
                                        </span>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan={4} className="px-4 py-8 text-center text-sm text-slate-500">No media content has been added yet.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
