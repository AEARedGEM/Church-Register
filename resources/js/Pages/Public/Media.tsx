import { Head, Link, useForm } from '@inertiajs/react';
import { FormEvent } from 'react';

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

const fallbackMedia: MediaItem[] = [
    {
        id: 1,
        title: 'Sunday Worship Experience',
        content_type: 'sermon',
        speaker_name: 'Pastor A. Johnson',
        summary: 'A Spirit-filled service focused on prayer, worship, and biblical encouragement for the week ahead.',
        published_at: '2026-09-01',
        featured: true,
        status: 'published',
    },
    {
        id: 2,
        title: 'Women of Faith Testimony Night',
        content_type: 'testimony',
        speaker_name: 'Sister Grace',
        summary: 'Stories of grace, strength, and God’s faithfulness from women across the church community.',
        published_at: '2026-08-25',
        featured: false,
        status: 'published',
    },
    {
        id: 3,
        title: 'Youth Revival Highlights',
        content_type: 'highlight',
        speaker_name: 'Youth Team',
        summary: 'A glimpse into a joyful and powerful gathering of the youth ministry in praise and worship.',
        published_at: '2026-08-18',
        featured: true,
        status: 'published',
    },
    {
        id: 4,
        title: 'Leadership Conversation',
        content_type: 'interview',
        speaker_name: 'Pastor S.O. Ilesanmi',
        summary: 'A thoughtful discussion with church leadership on vision, discipleship, and spiritual growth.',
        published_at: '2026-08-10',
        featured: false,
        status: 'published',
    },
];

export default function Media({ media = fallbackMedia, flash }: { media?: MediaItem[]; flash?: { success?: string } }) {
    const featured = [...media].filter((item) => item.featured).slice(0, 3);
    const { data, setData, post, processing, reset } = useForm<{
        full_name: string;
        email: string;
        request_type: string;
        message: string;
        is_public: boolean;
    }>({
        full_name: '',
        email: '',
        request_type: 'healing',
        message: '',
        is_public: false,
    });

    const submitPrayerRequest = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        post('/prayer-requests', {
            onSuccess: () => reset(),
        });
    };

    const formatType = (type: string) => type.charAt(0).toUpperCase() + type.slice(1);

    return (
        <>
            <Head title="Media & Sermons - APGA Worldwide" />
            <div className="min-h-screen bg-slate-950 text-slate-100">
                <nav className="border-b border-red-800/70 bg-slate-950/95 backdrop-blur-sm">
                    <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
                        <Link href="/" className="text-2xl font-bold text-red-400">APGA Worldwide</Link>
                        <div className="flex items-center gap-3">
                            <Link href={route('events')} className="rounded-full border border-red-700 px-4 py-2 text-sm text-red-100 transition hover:bg-red-700 hover:text-white">
                                Church Events
                            </Link>
                            <Link href="/" className="rounded-full border border-red-700 px-4 py-2 text-sm text-red-100 transition hover:bg-red-700 hover:text-white">
                                Back to Home
                            </Link>
                        </div>
                    </div>
                </nav>

                <main className="mx-auto max-w-7xl px-6 py-16">
                    {flash?.success && (
                        <div className="mb-6 rounded-2xl border border-emerald-700/50 bg-emerald-900/40 px-4 py-3 text-sm text-emerald-100">
                            {flash.success}
                        </div>
                    )}

                    <div className="mb-12 text-center">
                        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-red-300">Media & teachings</p>
                        <h1 className="mt-4 text-4xl font-bold text-white md:text-5xl">Sermons, testimonies, and church stories</h1>
                    </div>

                    <div className="mb-12 grid gap-6 md:grid-cols-3">
                        {(featured.length ? featured : fallbackMedia.slice(0, 3)).map((item) => (
                            <article key={item.id} className="rounded-3xl border border-red-800/70 bg-slate-900/85 p-6 shadow-lg shadow-red-950/20">
                                <div className="mb-4 inline-flex rounded-full bg-red-700/20 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-red-200">
                                    {formatType(item.content_type)}
                                </div>
                                <h2 className="text-2xl font-bold text-white">{item.title}</h2>
                                <p className="mt-2 text-xs uppercase tracking-[0.2em] text-slate-400">{item.speaker_name || 'APGA Worldwide'}</p>
                                <p className="mt-4 text-sm leading-relaxed text-slate-300">{item.summary}</p>
                                <div className="mt-6 flex items-center justify-between gap-3">
                                    <span className="text-xs text-slate-400">{item.published_at ? new Date(item.published_at).toLocaleDateString() : 'Recent'}</span>
                                    <Link href={route('media.detail', item.id)} className="rounded-full bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-500">
                                        Read more
                                    </Link>
                                </div>
                            </article>
                        ))}
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                        {media.map((item) => (
                            <article key={item.id} className="rounded-3xl border border-red-800/70 bg-slate-900/85 p-6 shadow-lg shadow-red-950/20">
                                <div className="mb-4 inline-flex rounded-full bg-red-700/20 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-red-200">
                                    {formatType(item.content_type)}
                                </div>
                                <h2 className="text-2xl font-bold text-white">{item.title}</h2>
                                <p className="mt-3 text-sm leading-relaxed text-slate-300">{item.summary}</p>
                                <div className="mt-6 flex items-center justify-between gap-3">
                                    <span className="text-xs text-slate-400">{item.speaker_name || 'APGA Worldwide'}</span>
                                    <Link href={route('media.detail', item.id)} className="text-sm font-semibold text-red-300 hover:text-red-200">
                                        Open media
                                    </Link>
                                </div>
                            </article>
                        ))}
                    </div>

                    <div className="mt-14 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
                        <div className="rounded-3xl border border-red-800/70 bg-gradient-to-r from-red-900/20 to-slate-900 p-8">
                            <h3 className="text-2xl font-bold text-white">Stay connected</h3>
                            <p className="mt-3 text-slate-300">Experience the church through worship, messages, testimonies, and community moments.</p>
                            <div className="mt-6 flex flex-wrap gap-3">
                                <Link href={route('register')} className="rounded-full bg-red-600 px-6 py-3 font-semibold text-white transition hover:bg-red-500">
                                    Join the community
                                </Link>
                                <Link href={route('events')} className="rounded-full border border-red-700 px-6 py-3 font-semibold text-red-100 transition hover:bg-red-700 hover:text-white">
                                    Upcoming events
                                </Link>
                            </div>
                        </div>

                        <form onSubmit={submitPrayerRequest} className="rounded-3xl border border-red-800/70 bg-slate-900/85 p-6 shadow-lg shadow-red-950/20">
                            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-red-300">Prayer request</p>
                            <h3 className="mt-3 text-2xl font-bold text-white">We are praying with you</h3>

                            <div className="mt-5 space-y-4">
                                <label className="block text-sm text-slate-200">
                                    Full name
                                    <input
                                        value={data.full_name}
                                        onChange={(event) => setData('full_name', event.target.value)}
                                        className="mt-1 w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-white"
                                        required
                                    />
                                </label>
                                <label className="block text-sm text-slate-200">
                                    Email (optional)
                                    <input
                                        type="email"
                                        value={data.email}
                                        onChange={(event) => setData('email', event.target.value)}
                                        className="mt-1 w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-white"
                                    />
                                </label>
                                <label className="block text-sm text-slate-200">
                                    Prayer type
                                    <select
                                        value={data.request_type}
                                        onChange={(event) => setData('request_type', event.target.value)}
                                        className="mt-1 w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-white"
                                    >
                                        <option value="healing">Healing</option>
                                        <option value="thanksgiving">Thanksgiving</option>
                                        <option value="guidance">Guidance</option>
                                        <option value="deliverance">Deliverance</option>
                                        <option value="other">Other</option>
                                    </select>
                                </label>
                                <label className="block text-sm text-slate-200">
                                    Prayer request
                                    <textarea
                                        rows={4}
                                        value={data.message}
                                        onChange={(event) => setData('message', event.target.value)}
                                        className="mt-1 w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-white"
                                        required
                                    />
                                </label>
                                <label className="flex items-center gap-3 text-sm text-slate-300">
                                    <input
                                        type="checkbox"
                                        checked={Boolean(data.is_public)}
                                        onChange={(event) => setData('is_public', Boolean(event.target.checked))}
                                        className="h-4 w-4 rounded border-slate-600 bg-slate-950"
                                    />
                                    I’m comfortable with this prayer request being shared privately within the church community.
                                </label>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full rounded-full bg-red-600 px-5 py-3 font-semibold text-white transition hover:bg-red-500 disabled:bg-red-400"
                                >
                                    {processing ? 'Submitting...' : 'Submit prayer request'}
                                </button>
                            </div>
                        </form>
                    </div>
                </main>
            </div>
        </>
    );
}
