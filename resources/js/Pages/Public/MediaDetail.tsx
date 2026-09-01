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

export default function MediaDetail({ media }: { media: MediaItem }) {
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

                <main className="mx-auto max-w-4xl px-6 py-16">
                    <div className="rounded-3xl border border-red-800/70 bg-slate-900/80 p-8 shadow-lg shadow-red-950/20">
                        <div className="mb-4 inline-flex rounded-full bg-red-700/20 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-red-200">
                            {media.content_type}
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
                </main>
            </div>
        </>
    );
}
