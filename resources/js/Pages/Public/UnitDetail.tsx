import { Head, Link } from '@inertiajs/react';

type Unit = {
    slug: string;
    name: string;
    category: string;
    summary: string;
    aim: string;
    objectives: string[];
    duties: string[];
    leadership: Array<{ name: string; role: string }>;
    members: string[];
    highlights: string[];
};

export default function UnitDetail({ unit, allUnits = [] }: { unit: Unit; allUnits?: Unit[] }) {
    return (
        <>
            <Head title={`${unit.name} - APGA Worldwide`} />
            <div className="min-h-screen bg-slate-950 text-slate-100">
                <nav className="border-b border-red-800/70 bg-slate-950/95 backdrop-blur-sm">
                    <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
                        <Link href="/" className="text-2xl font-bold text-red-400">APGA Worldwide</Link>
                        <div className="flex items-center gap-3">
                            <Link href={route('units')} className="rounded-full border border-red-700 px-4 py-2 text-sm text-red-100 transition hover:bg-red-700 hover:text-white">
                                All units
                            </Link>
                            <Link href="/" className="rounded-full border border-slate-700 px-4 py-2 text-sm text-slate-200 transition hover:border-slate-500 hover:text-white">
                                Home
                            </Link>
                        </div>
                    </div>
                </nav>

                <main className="mx-auto max-w-6xl px-6 py-16">
                    <div className="mb-8 flex items-center justify-between gap-4">
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-red-300">{unit.category}</p>
                            <h1 className="mt-4 text-4xl font-bold text-white md:text-5xl">{unit.name}</h1>
                        </div>
                        <div className="rounded-full border border-red-700 bg-red-900/30 px-4 py-2 text-sm text-red-100">
                            {unit.highlights[0] || 'Ministry focus'}
                        </div>
                    </div>

                    <div className="rounded-3xl border border-red-800/70 bg-slate-900/85 p-8 shadow-lg shadow-red-950/20">
                        <p className="text-lg leading-relaxed text-slate-200">{unit.summary}</p>
                    </div>

                    <div className="mt-10 grid gap-6 lg:grid-cols-3">
                        <section className="rounded-3xl border border-red-800/70 bg-slate-900/85 p-6">
                            <h2 className="text-2xl font-bold text-white">Aim</h2>
                            <p className="mt-4 text-base leading-relaxed text-slate-300">{unit.aim}</p>
                        </section>

                        <section className="rounded-3xl border border-red-800/70 bg-slate-900/85 p-6">
                            <h2 className="text-2xl font-bold text-white">Objectives</h2>
                            <ul className="mt-4 list-disc space-y-3 pl-5 text-slate-300">
                                {unit.objectives.map((objective) => (
                                    <li key={objective}>{objective}</li>
                                ))}
                            </ul>
                        </section>

                        <section className="rounded-3xl border border-red-800/70 bg-gradient-to-br from-red-900/20 to-slate-900 p-6">
                            <h2 className="text-2xl font-bold text-white">Key highlights</h2>
                            <ul className="mt-4 space-y-3 text-slate-200">
                                {unit.highlights.map((highlight) => (
                                    <li key={highlight} className="rounded-2xl border border-red-900/60 bg-slate-950/40 p-3">
                                        {highlight}
                                    </li>
                                ))}
                            </ul>
                        </section>
                    </div>

                    <div className="mt-10 grid gap-6 md:grid-cols-2">
                        <section className="rounded-3xl border border-red-800/70 bg-slate-900/85 p-6">
                            <h2 className="text-2xl font-bold text-white">Duties</h2>
                            <ul className="mt-4 list-disc space-y-3 pl-5 text-slate-300">
                                {unit.duties.map((duty) => (
                                    <li key={duty}>{duty}</li>
                                ))}
                            </ul>
                        </section>

                        <section className="rounded-3xl border border-red-800/70 bg-slate-900/85 p-6">
                            <h2 className="text-2xl font-bold text-white">Leadership</h2>
                            <div className="mt-4 space-y-4">
                                {unit.leadership.map((leader) => (
                                    <div key={`${leader.name}-${leader.role}`} className="rounded-2xl border border-red-900/60 bg-slate-950/50 p-4">
                                        <h3 className="text-lg font-semibold text-red-200">{leader.name}</h3>
                                        <p className="mt-1 text-sm text-slate-300">{leader.role}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    <section className="mt-10 rounded-3xl border border-red-800/70 bg-slate-900/85 p-6">
                        <h2 className="text-2xl font-bold text-white">Members & involvement</h2>
                        <div className="mt-4 flex flex-wrap gap-2">
                            {unit.members.map((member) => (
                                <span key={member} className="rounded-full border border-red-700/80 bg-red-900/20 px-3 py-2 text-sm text-red-100">
                                    {member}
                                </span>
                            ))}
                        </div>
                    </section>

                    <div className="mt-10 flex flex-wrap gap-4">
                        <Link href={route('register')} className="rounded-full bg-red-600 px-6 py-3 font-semibold text-white transition hover:bg-red-500">
                            Join this unit
                        </Link>
                        <Link href={route('units')} className="rounded-full border border-red-700 px-6 py-3 font-semibold text-red-100 transition hover:bg-red-700 hover:text-white">
                            Explore all units
                        </Link>
                    </div>
                </main>
            </div>
        </>
    );
}
