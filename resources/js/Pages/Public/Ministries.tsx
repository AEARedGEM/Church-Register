import { Head, Link } from '@inertiajs/react';

type LeadershipProfile = {
    id: number;
    name: string;
    title?: string | null;
    bio?: string | null;
    email?: string | null;
    phone?: string | null;
};

type Ministry = {
    id: number;
    name: string;
    description?: string | null;
    leader_name?: string | null;
    is_active?: boolean;
    leadership_profiles?: LeadershipProfile[];
};

export default function Ministries({ ministries = [] }: { ministries?: Ministry[] }) {
    const visibleMinistries = ministries.filter((ministry) => ministry.is_active !== false);

    return (
        <>
            <Head title="Ministries - APGA Worldwide" />
            <div className="min-h-screen bg-slate-950 text-slate-100">
                <nav className="border-b border-red-800/70 bg-slate-950/95 backdrop-blur-sm">
                    <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
                        <Link href="/" className="text-2xl font-bold text-red-400">APGA Worldwide</Link>
                        <Link href="/" className="rounded-full border border-red-700 px-4 py-2 text-sm text-red-100 transition hover:bg-red-700 hover:text-white">
                            Back to Home
                        </Link>
                    </div>
                </nav>

                <main className="mx-auto max-w-7xl px-6 py-16">
                    <div className="mb-12 text-center">
                        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-red-300">Our ministries</p>
                        <h1 className="mt-4 text-4xl font-bold text-white md:text-5xl">Serving the church, the city, and the world</h1>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                        {visibleMinistries.map((ministry) => (
                            <article key={ministry.id} className="rounded-3xl border border-red-800/70 bg-slate-900/85 p-7 shadow-lg shadow-red-950/20">
                                <div className="mb-4 h-2.5 w-20 rounded-full bg-gradient-to-r from-red-500 to-rose-400"></div>
                                <h2 className="text-2xl font-bold text-white">{ministry.name}</h2>
                                <p className="mt-4 text-sm leading-relaxed text-slate-300">
                                    {ministry.description || 'A ministry committed to discipleship, fellowship, and practical kingdom impact.'}
                                </p>

                                <div className="mt-5 flex items-center justify-between gap-3 border-t border-red-900/60 pt-4 text-sm text-slate-300">
                                    <span>{ministry.leadership_profiles?.length ? `${ministry.leadership_profiles.length} leader(s)` : ministry.leader_name ? 'Leadership assigned' : 'Open to serving'}</span>
                                    <Link href={route('ministries.detail', ministry.id)} className="font-semibold text-red-300 transition hover:text-red-200">
                                        View details →
                                    </Link>
                                </div>
                            </article>
                        ))}
                    </div>

                    <div className="mt-14 rounded-3xl border border-red-800/70 bg-gradient-to-r from-red-900/20 to-slate-900 p-8 text-center">
                        <h3 className="text-2xl font-bold text-white">Want to serve?</h3>
                        <p className="mt-3 text-slate-300">Join a ministry and become part of God’s work in the church and community.</p>
                        <div className="mt-6 flex flex-col items-center justify-center gap-4 sm:flex-row">
                            <Link href={route('register')} className="rounded-full bg-red-600 px-6 py-3 font-semibold text-white transition hover:bg-red-500">
                                Get involved
                            </Link>
                            <Link href={route('units')} className="rounded-full border border-red-700 bg-slate-900 px-6 py-3 font-semibold text-red-100 transition hover:bg-red-700 hover:text-white">
                                Explore church units
                            </Link>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}
