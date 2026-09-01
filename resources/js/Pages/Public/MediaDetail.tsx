import { Head, Link } from '@inertiajs/react';

type MediaItem = {
    id: number;
    title: string;
    summary?: string | null;
    speaker_name?: string | null;
    content_type: string;
    published_at?: string;
    video_url?: string | null;
    featured?: boolean;
    status?: string;
};

export default function MediaDetail({ media, relatedMedia = [] }: { media: MediaItem; relatedMedia?: MediaItem[] }) {
    const formatType = (type: string) => type.charAt(0).toUpperCase() + type.slice(1);

    return (
        <>
            <Head title={`${media.title} - APGA Worldwide`} />
            <div className="min-h-screen bg-slate-950 text-slate-100">
                <nav className="border-b border-red-800/70 bg-slate-950/95 backdrop-blur-sm">
                    <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
                        <Link href="/" className="text-2xl font-bold text-red-400">APGA Worldwide</Link>
                        <div className="flex items-center gap-3">
                            <Link href={route('media')} className="rounded-full border border-red-700 px-4 py-2 text-sm text-red-100 transition hover:bg-red-700 hover:text-white">
                                All media
                            </Link>
                            <Link href={route('events')} className="rounded-full border border-slate-700 px-4 py-2 text-sm text-slate-200 transition hover:border-slate-500 hover:text-white">
                                Events
                            </Link>
                        </div>
                    </div>
                </nav>

                <main className="mx-auto max-w-6xl px-6 py-16">
                    <div className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr]">
                        <div className="rounded-3xl border border-red-800/70 bg-slate-900/80 p-8 shadow-lg shadow-red-950/20">
                            <div className="mb-4 inline-flex rounded-full bg-red-700/20 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-red-200">
                                {formatType(media.content_type)}
                            </div>
                            <h1 className="text-4xl font-bold text-white md:text-5xl">{media.title}</h1>
                            <p className="mt-4 text-sm uppercase tracking-[0.22em] text-slate-400">
                                {media.speaker_name || 'APGA Worldwide'} · {media.published_at ? new Date(media.published_at).toLocaleDateString() : 'Recently shared'}
                            </p>

                            <div className="mt-8 rounded-2xl border border-red-900/60 bg-slate-950/70 p-6">
                                <p className="text-lg leading-relaxed text-slate-200">{media.summary || 'This message is part of our church teaching and worship experience.'}</p>
                            </div>

                            {media.video_url && (
                                <div className="mt-8 overflow-hidden rounded-2xl border border-red-800/70 bg-black">
                                    <a href={media.video_url} target="_blank" rel="noreferrer" className="block p-5 text-center text-red-200 hover:text-white">
                                        Watch or open the media resource
                                    </a>
                                </div>
                            )}

                            <div className="mt-8 flex flex-wrap gap-4">
                                <Link href={route('media')} className="rounded-full bg-red-600 px-6 py-3 font-semibold text-white transition hover:bg-red-500">
                                    Explore more media
                                </Link>
                                <Link href={route('register')} className="rounded-full border border-red-700 px-6 py-3 font-semibold text-red-100 transition hover:bg-red-700 hover:text-white">
                                    Join the church community
                                </Link>
                            </div>
                        </div>

                        <aside className="space-y-6">
                            <div className="rounded-3xl border border-red-800/70 bg-slate-900/85 p-6 shadow-lg shadow-red-950/20">
                                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-red-300">Message details</p>
                                <dl className="mt-4 space-y-3 text-sm text-slate-300">
                                    <div className="flex items-center justify-between gap-3 border-b border-slate-800 pb-2">
                                        <dt className="text-slate-400">Type</dt>
                                        <dd className="font-medium text-white">{formatType(media.content_type)}</dd>
                                    </div>
                                    <div className="flex items-center justify-between gap-3 border-b border-slate-800 pb-2">
                                        <dt className="text-slate-400">Speaker</dt>
                                        <dd className="font-medium text-white">{media.speaker_name || 'APGA Worldwide'}</dd>
                                    </div>
                                    <div className="flex items-center justify-between gap-3 border-b border-slate-800 pb-2">
                                        <dt className="text-slate-400">Published</dt>
                                        <dd className="font-medium text-white">{media.published_at ? new Date(media.published_at).toLocaleDateString() : 'Recently'}</dd>
                                    </div>
                                    <div className="flex items-center justify-between gap-3">
                                        <dt className="text-slate-400">Status</dt>
                                        <dd className="font-medium text-emerald-300">{media.status || 'Published'}</dd>
                                    </div>
                                </dl>
                            </div>

                            {relatedMedia.length > 0 && (
                                <div className="rounded-3xl border border-red-800/70 bg-slate-900/85 p-6 shadow-lg shadow-red-950/20">
                                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-red-300">Related media</p>
                                    <div className="mt-4 space-y-4">
                                        {relatedMedia.map((item) => (
                                            <Link key={item.id} href={route('media.detail', item.id)} className="block rounded-2xl border border-slate-800 bg-slate-950/70 p-4 transition hover:border-red-700 hover:bg-slate-900">
                                                <p className="text-xs uppercase tracking-[0.2em] text-red-300">{formatType(item.content_type)}</p>
                                                <h3 className="mt-2 text-lg font-semibold text-white">{item.title}</h3>
                                                <p className="mt-2 text-sm text-slate-400">{item.speaker_name || 'APGA Worldwide'}</p>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </aside>
                    </div>
                </main>
            </div>
        </>
    );
}
