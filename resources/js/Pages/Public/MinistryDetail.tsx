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

export default function MinistryDetail({ ministry }: { ministry: Ministry }) {
    return (
        <>
            <Head title={`${ministry.name} - APGA Worldwide`} />
            <div className="min-h-screen bg-slate-950 text-slate-100">
                <nav className="border-b border-red-800/70 bg-slate-950/95 backdrop-blur-sm">
                    <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
                        <Link href="/" className="text-2xl font-bold text-red-400">APGA Worldwide</Link>
                        <div className="flex items-center gap-3">
                            <Link href={route('ministries')} className="rounded-full border border-red-700 px-4 py-2 text-sm text-red-100 transition hover:bg-red-700 hover:text-white">
                                All ministries
                            </Link>
                            <Link href="/" className="rounded-full border border-slate-700 px-4 py-2 text-sm text-slate-200 transition hover:border-slate-500 hover:text-white">
                                Home
                            </Link>
                        </div>
                    </div>
                </nav>

                <main className="mx-auto max-w-5xl px-6 py-16">
                    <div className="mb-8 flex items-center justify-between gap-4">
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-red-300">Ministry focus</p>
                            <h1 className="mt-4 text-4xl font-bold text-white md:text-5xl">{ministry.name}</h1>
                        </div>
                        <div className="rounded-full border border-red-700 bg-red-900/30 px-4 py-2 text-sm text-red-100">
                            {ministry.leader_name || 'Leadership team forming'}
                        </div>
                    </div>

                    <div className="rounded-3xl border border-red-800/70 bg-slate-900/85 p-8 shadow-lg shadow-red-950/20">
                        <p className="text-lg leading-relaxed text-slate-200">
                            {ministry.description || 'This ministry is committed to discipleship, fellowship, outreach, and practical kingdom impact for the church community.'}
                        </p>
                    </div>

                    <div className="mt-10 grid gap-6 md:grid-cols-2">
                        <div className="rounded-3xl border border-red-800/70 bg-slate-900/85 p-6">
                            <h2 className="text-2xl font-bold text-white">Leadership</h2>
                            <div className="mt-5 space-y-4">
                                {(ministry.leadership_profiles && ministry.leadership_profiles.length > 0) ? ministry.leadership_profiles.map((leader) => (
                                    <div key={leader.id} className="rounded-2xl border border-red-900/60 bg-slate-950/60 p-4">
                                        <h3 className="text-lg font-semibold text-red-200">{leader.name}</h3>
                                        {leader.title && <p className="mt-1 text-sm text-slate-300">{leader.title}</p>}
                                        {leader.bio && <p className="mt-3 text-sm leading-relaxed text-slate-300">{leader.bio}</p>}
                                        <div className="mt-3 space-y-1 text-sm text-slate-400">
                                            {leader.email && <p>{leader.email}</p>}
                                            {leader.phone && <p>{leader.phone}</p>}
                                        </div>
                                    </div>
                                )) : (
                                    <p className="text-sm text-slate-300">Leadership information will be assigned for this ministry soon.</p>
                                )}
                            </div>
                        </div>

                        <div className="rounded-3xl border border-red-800/70 bg-gradient-to-br from-red-900/20 to-slate-900 p-6">
                            <h2 className="text-2xl font-bold text-white">Ministry impact</h2>
                            <ul className="mt-5 space-y-4 text-slate-200">
                                <li className="rounded-2xl border border-red-900/60 bg-slate-950/40 p-4">Discipleship and spiritual growth through biblical teaching and prayer.</li>
                                <li className="rounded-2xl border border-red-900/60 bg-slate-950/40 p-4">Fellowship, small-group connection, and caring pastoral support.</li>
                                <li className="rounded-2xl border border-red-900/60 bg-slate-950/40 p-4">Community engagement, service opportunities, and church-wide collaboration.</li>
                            </ul>
                        </div>
                    </div>

                    <div className="mt-10 flex flex-wrap gap-4">
                        <Link href={route('register')} className="rounded-full bg-red-600 px-6 py-3 font-semibold text-white transition hover:bg-red-500">
                            Join this ministry
                        </Link>
                        <Link href={route('ministries')} className="rounded-full border border-red-700 px-6 py-3 font-semibold text-red-100 transition hover:bg-red-700 hover:text-white">
                            Explore all ministries
                        </Link>
                    </div>
                </main>
            </div>
        </>
    );
}
