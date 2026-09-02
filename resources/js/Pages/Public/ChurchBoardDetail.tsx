import { Head, Link } from '@inertiajs/react';

type Trustee = {
    slug: string;
    name: string;
    title: string;
    role: string;
    summary: string;
    biography: string;
    experience: string;
    email: string;
    phone: string;
    areas: string[];
    education: Array<{ degree: string; school: string; year: string }>;
    avatar: {
        image?: string;
        gradients: string;
        initials: string;
    };
};

export default function ChurchBoardDetail({ trustee, trustees }: { trustee: Trustee; trustees: Trustee[] }) {
    return (
        <>
            <Head title={`${trustee.name} - Board of Trustees - APGA Worldwide`} />
            <div className="min-h-screen bg-[#020d1f] text-slate-100">
                <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                    <Link href={route('church-board')} className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-cyan-300 transition hover:text-cyan-200">
                        <span aria-hidden="true">←</span>
                        <span>Back to Board</span>
                    </Link>

                    <div className="grid gap-8 lg:grid-cols-[360px_1fr]">
                        <aside className="space-y-6">
                            <div className="overflow-hidden rounded-[22px] border border-cyan-400/20 bg-[#0a1c2c] p-4 shadow-[0_24px_60px_rgba(8,145,178,0.12)]">
                                <div className={`flex h-[430px] items-center justify-center rounded-[18px] bg-gradient-to-br ${trustee.avatar.gradients}`}>
                                    {trustee.avatar.image ? (
                                        <img src={`/images/${trustee.avatar.image}`} alt={trustee.name} className="h-64 w-64 rounded-2xl border-2 border-white/20 object-contain shadow-[0_16px_36px_rgba(2,6,23,0.4)]" />
                                    ) : (
                                        <div className="flex h-64 w-64 items-center justify-center rounded-full border-2 border-white/20 bg-white/5 text-6xl font-black text-white shadow-[inset_0_0_30px_rgba(255,255,255,0.08)]">
                                            {trustee.avatar.initials}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="rounded-[22px] border border-cyan-400/20 bg-[#0a1c2c] p-6 shadow-[0_24px_60px_rgba(8,145,178,0.12)]">
                                <h2 className="mb-5 text-2xl font-black text-white">Contact Information</h2>

                                <div className="space-y-4 text-slate-200">
                                    <div>
                                        <p className="mb-1 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">Email</p>
                                        <a href={`mailto:${trustee.email}`} className="inline-flex items-center gap-2 text-lg text-slate-100 transition hover:text-cyan-300">
                                            <span>✉</span>
                                            <span>{trustee.email}</span>
                                        </a>
                                    </div>

                                    <div>
                                        <p className="mb-1 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">Phone</p>
                                        <p className="flex items-center gap-2 text-lg text-slate-100">
                                            <span>☎</span>
                                            <span>{trustee.phone}</span>
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-[22px] border border-cyan-400/20 bg-[#0a1c2c] p-6 shadow-[0_24px_60px_rgba(8,145,178,0.12)]">
                                <h2 className="mb-4 text-2xl font-black text-white">Social Media</h2>
                                <div className="flex gap-3">
                                    <a href="#" className="flex h-11 w-11 items-center justify-center rounded-lg bg-cyan-500/10 text-lg text-cyan-200 transition hover:bg-cyan-500/20 hover:text-cyan-100">in</a>
                                    <a href="#" className="flex h-11 w-11 items-center justify-center rounded-lg bg-cyan-500/10 text-lg text-cyan-200 transition hover:bg-cyan-500/20 hover:text-cyan-100">x</a>
                                </div>
                            </div>
                        </aside>

                        <main className="space-y-6">
                            <div>
                                <h1 className="text-4xl font-black tracking-[-0.06em] text-white md:text-6xl">{trustee.name}</h1>
                                <p className="mt-3 text-2xl text-slate-300">{trustee.title}</p>
                                <div className="mt-4 flex items-center gap-3 text-lg text-cyan-300">
                                    <span className="text-xl">⏱</span>
                                    <span>{trustee.experience}</span>
                                </div>
                            </div>

                            <section className="rounded-[22px] border border-cyan-400/20 bg-[#0a1c2c] p-6 shadow-[0_24px_60px_rgba(8,145,178,0.12)]">
                                <h2 className="mb-4 text-3xl font-black text-white">Professional Summary</h2>
                                <div className="rounded-xl border border-cyan-400/10 bg-slate-900/60 p-4 text-lg text-slate-200">
                                    {trustee.summary}
                                </div>
                            </section>

                            <section className="rounded-[22px] border border-cyan-400/20 bg-[#0a1c2c] p-6 shadow-[0_24px_60px_rgba(8,145,178,0.12)]">
                                <h2 className="mb-4 text-3xl font-black text-white">Biography</h2>
                                <p className="text-lg leading-relaxed text-slate-300">{trustee.biography}</p>
                            </section>

                            <section className="rounded-[22px] border border-cyan-400/20 bg-[#0a1c2c] p-6 shadow-[0_24px_60px_rgba(8,145,178,0.12)]">
                                <h2 className="mb-5 text-3xl font-black text-white">Areas of Expertise</h2>
                                <div className="flex flex-wrap gap-3">
                                    {trustee.areas.map((area) => (
                                        <span key={area} className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm font-semibold text-cyan-200">
                                            {area}
                                        </span>
                                    ))}
                                </div>
                            </section>

                            <section className="rounded-[22px] border border-cyan-400/20 bg-[#0a1c2c] p-6 shadow-[0_24px_60px_rgba(8,145,178,0.12)]">
                                <h2 className="mb-5 text-3xl font-black text-white">Educational Background</h2>
                                <div className="space-y-4">
                                    {trustee.education.map((item) => (
                                        <div key={`${item.degree}-${item.school}`} className="rounded-xl border border-cyan-400/10 bg-slate-900/60 p-4">
                                            <div className="text-xl font-bold text-cyan-300">{item.degree}</div>
                                            <div className="mt-1 text-lg text-slate-200">{item.school}</div>
                                            <div className="mt-1 text-sm text-slate-400">{item.year}</div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        </main>
                    </div>
                </div>
            </div>
        </>
    );
}
