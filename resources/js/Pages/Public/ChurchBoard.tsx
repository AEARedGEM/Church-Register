import { Head, Link } from '@inertiajs/react';

type Trustee = {
    slug: string;
    name: string;
    role: string;
    summary: string;
    title: string;
    avatar: {
        image?: string;
        gradients: string;
        initials: string;
    };
};

export default function ChurchBoard({ trustees }: { trustees: Trustee[] }) {
    return (
        <>
            <Head title="Board of Trustees - APGA Worldwide" />
            <div className="min-h-screen bg-[#020d1f] text-slate-100">
                <div className="mx-auto max-w-7xl px-4 pb-20 pt-10 sm:px-6 lg:px-8">
                    <div className="mb-8 flex items-center justify-between rounded-full border border-cyan-400/30 bg-slate-900/80 px-4 py-3 shadow-[0_0_0_1px_rgba(34,211,238,0.15)] backdrop-blur-sm">
                        <div className="flex items-center gap-3">
                            <span className="h-3 w-3 rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.8)]" />
                            <span className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-300">APGA / Team</span>
                        </div>
                        <div className="flex items-center gap-2 rounded-full border border-cyan-400/30 bg-slate-900/60 px-3 py-1.5 text-xs font-medium text-cyan-200">
                            <span className="text-base">👥</span>
                            <span>{trustees.length} leaders</span>
                        </div>
                    </div>

                    <div className="rounded-[28px] border border-cyan-400/20 bg-[#061526]/90 px-5 py-8 shadow-[0_0_0_1px_rgba(8,145,178,0.15),0_30px_80px_rgba(15,23,42,0.9)] sm:px-8 lg:px-10">
                        <div className="mb-10">
                            <p className="text-sm font-bold uppercase tracking-[0.34em] text-cyan-300">Leadership</p>
                            <h1 className="mt-5 text-4xl font-black tracking-[-0.05em] text-white md:text-6xl">
                                Called to Serve <span className="bg-gradient-to-r from-cyan-300 via-sky-400 to-blue-500 bg-clip-text text-transparent">APGA</span> Mission and Governance
                            </h1>
                            <p className="mt-6 max-w-4xl text-lg leading-relaxed text-slate-300">
                                A spiritual family committed to prayer, pastoral stewardship, discipleship, and faithful service in the vision and mission of the church.
                            </p>
                        </div>

                        <div className="mb-10 flex items-center justify-between gap-4">
                            <h2 className="text-3xl font-black tracking-[-0.04em] text-white md:text-4xl">Church Council (Board Of Trustees)</h2>
                            <span className="inline-flex items-center rounded-full border border-amber-400/40 bg-amber-500/10 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.28em] text-amber-300">
                                Board Of Trustees
                            </span>
                        </div>

                        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-5">
                            {trustees.map((trustee) => (
                                <Link
                                    key={trustee.slug}
                                    href={route('church-board.member', trustee.slug)}
                                    className="group overflow-hidden rounded-[22px] border border-cyan-400/15 bg-[#0b1c2d]/80 shadow-[0_20px_40px_rgba(2,6,23,0.55)] transition duration-300 hover:-translate-y-1 hover:border-cyan-300/40 hover:shadow-[0_24px_60px_rgba(14,165,233,0.18)]"
                                >
                                    <div className={`h-72 bg-gradient-to-br ${trustee.avatar.gradients} p-5`}>
                                        <div className="flex h-full items-center justify-center">
                                            {trustee.avatar.image ? (
                                                <img src={`/images/${trustee.avatar.image}`} alt={trustee.name} className="h-52 w-52 rounded-2xl border-2 border-white/20 object-contain shadow-[0_12px_30px_rgba(2,6,23,0.35)]" />
                                            ) : (
                                                <div className="flex h-52 w-52 items-center justify-center rounded-full border-2 border-white/20 bg-white/5 text-5xl font-black text-white shadow-[inset_0_0_40px_rgba(255,255,255,0.08)] backdrop-blur-sm">
                                                    {trustee.avatar.initials}
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="space-y-2 p-5 text-left">
                                        <h3 className="text-[1.05rem] font-semibold leading-snug tracking-[-0.02em] text-white group-hover:text-cyan-300">
                                            {trustee.name}
                                        </h3>
                                        <p className="text-sm leading-relaxed text-slate-300">{trustee.role}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
