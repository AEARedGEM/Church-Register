import { Head, Link } from '@inertiajs/react';

export default function Mission() {
    return (
        <>
            <Head title="Mission & Vision - APGA Worldwide" />

            <div className="min-h-screen bg-slate-950 text-slate-100">
                <nav className="border-b border-red-800/70 bg-slate-950/95 backdrop-blur-sm">
                    <div className="container mx-auto flex items-center justify-between px-6 py-4">
                        <Link href="/" className="text-2xl font-bold text-red-400">
                            APGA Worldwide
                        </Link>
                        <Link href="/" className="text-red-200 transition hover:text-white">
                            Back to Home
                        </Link>
                    </div>
                </nav>

                <div className="container mx-auto max-w-4xl px-6 py-16">
                    <h1 className="mb-12 text-4xl font-bold text-white">Our Mission & Vision</h1>

                    <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-2">
                        <div className="rounded-2xl border border-red-800/70 bg-slate-900/80 p-8">
                            <h2 className="mb-4 text-2xl font-bold text-white">Mission</h2>
                            <p className="text-lg text-slate-300">
                                To build a church that worships God in spirit and truth, equips believers for Christlike living, and serves communities with compassion and purpose.
                            </p>
                        </div>

                        <div className="rounded-2xl border border-red-800/70 bg-slate-900/80 p-8">
                            <h2 className="mb-4 text-2xl font-bold text-white">Vision</h2>
                            <p className="text-lg text-slate-300">
                                To see lives transformed by the Gospel, families strengthened, the church united, and the love of Christ reaching every generation.
                            </p>
                        </div>
                    </div>

                    <div className="space-y-8">
                        <section>
                            <h2 className="mb-4 text-2xl font-bold text-white">Our Pillars</h2>
                            <div className="space-y-4">
                                {[
                                    { title: 'Worship', desc: 'Creating a vibrant atmosphere of praise, prayer, and reverence for God.' },
                                    { title: 'Discipleship', desc: 'Helping believers grow in biblical understanding, character, and Christlike maturity.' },
                                    { title: 'Service', desc: 'Meeting needs in the church and the wider community with compassion and practical support.' },
                                    { title: 'Outreach', desc: 'Sharing the Gospel and extending the love of Christ beyond our walls.' }
                                ].map((pillar, index) => (
                                    <div key={index} className="rounded-xl border border-red-800/70 bg-slate-900/70 p-6">
                                        <h3 className="mb-2 text-lg font-bold text-white">{pillar.title}</h3>
                                        <p className="text-slate-300">{pillar.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section>
                            <h2 className="mb-4 text-2xl font-bold text-white">Our Commitment</h2>
                            <p className="mb-4 text-slate-300">
                                We are committed to helping every believer discover purpose, build strong spiritual foundations, and live as a witness of God’s grace and power.
                            </p>
                            <ul className="list-disc space-y-2 pl-6 text-slate-300">
                                <li>Prayerful dependence on God</li>
                                <li>Sound biblical teaching and pastoral care</li>
                                <li>Healthy community and unity in the church</li>
                                <li>Practical love and kingdom impact in society</li>
                            </ul>
                        </section>
                    </div>
                </div>
            </div>
        </>
    );
}
