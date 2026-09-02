import { Head, Link } from '@inertiajs/react';

interface Announcement {
    id: number;
    title: string;
    body: string;
    published_at?: string | null;
}

export default function Announcements({ announcements }: { announcements: Announcement[] }) {
    return (
        <>
            <Head title="Church Announcements - APGA Worldwide" />
            <div className="min-h-screen bg-slate-950 text-slate-100">
                <nav className="border-b border-red-800/70 bg-slate-950/95">
                    <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
                        <Link href="/" className="text-2xl font-bold text-red-400">APGA Worldwide</Link>
                        <Link href={route('events')} className="rounded-full border border-red-700 px-4 py-2 text-sm text-red-100 transition hover:bg-red-700">Events</Link>
                    </div>
                </nav>
                <main className="mx-auto max-w-5xl px-6 py-16">
                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-red-300">Stay connected</p>
                    <h1 className="mt-3 text-4xl font-bold text-white md:text-5xl">Church announcements</h1>
                    <p className="mt-4 max-w-2xl text-slate-300">The latest notices, service updates, and ministry news from APGA Worldwide.</p>
                    <div className="mt-10 space-y-5">{announcements.map((announcement) => <article key={announcement.id} className="rounded-3xl border border-red-800/70 bg-slate-900/80 p-6 shadow-lg shadow-red-950/20"><div className="flex flex-wrap items-baseline justify-between gap-3"><h2 className="text-2xl font-semibold text-white">{announcement.title}</h2>{announcement.published_at && <time className="text-sm text-red-200">{new Date(announcement.published_at).toLocaleDateString()}</time>}</div><p className="mt-4 whitespace-pre-line leading-7 text-slate-300">{announcement.body}</p></article>)}{!announcements.length && <div className="rounded-3xl border border-dashed border-slate-700 p-10 text-center text-slate-400">There are no current announcements.</div>}</div>
                </main>
            </div>
        </>
    );
}
