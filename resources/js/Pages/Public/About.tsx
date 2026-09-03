import { Head, Link } from '@inertiajs/react';

export default function About() {
    return (
        <>
            <Head title="About APGA Worldwide" />

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
                    <h1 className="mb-6 text-4xl font-bold text-white">About APGA Worldwide</h1>

                    <div className="mb-10 overflow-hidden rounded-3xl border border-red-800/70 bg-slate-900/80 p-6 shadow-xl shadow-red-950/20">
                        <div className="grid items-center gap-8 md:grid-cols-[220px_1fr]">
                            <img
                                src="/images/President_GO.jpeg"
                                alt="Prophet (Dr.) Samuel Olugbenga Ilesanmi"
                                className="h-52 w-full rounded-2xl border border-red-700 object-cover md:h-60"
                            />
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-red-300">President &amp; General Overseer, APGAW</p>
                                <h2 className="mt-3 text-2xl font-bold text-white">Prophet (Dr.) Samuel Olugbenga Ilesanmi</h2>
                                <p className="mt-3 text-slate-300">
                                    A visionary church leader committed to prayer, spiritual growth, and building a Christ-centered community rooted in faith, compassion, and purposeful service.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-8 text-lg text-slate-300">
                        <p>
                            APGA Worldwide is a faith-based church family devoted to worship, discipleship, prayer, and kingdom impact. We are committed to helping people encounter God, grow in grace, and live lives that reflect Christ in every sphere of life.
                        </p>

                        <div className="rounded-2xl border border-red-800/70 bg-slate-900/80 p-8">
                            <h2 className="mb-4 text-2xl font-bold text-white">Our Mission</h2>
                            <p>
                                To raise a spiritually vibrant community that worships God sincerely, strengthens believers, reaches the lost, and serves our communities with love and excellence.
                            </p>
                        </div>

                        <div className="rounded-2xl border border-red-800/70 bg-slate-900/80 p-8">
                            <h2 className="mb-4 text-2xl font-bold text-white">Our Vision</h2>
                            <p>
                                To see lives transformed by the power of the Gospel, families restored, ministries strengthened, and the church becoming a beacon of hope across every place we serve.
                            </p>
                        </div>

                        <div className="rounded-2xl border border-red-800/70 bg-slate-900/80 p-8">
                            <h2 className="mb-4 text-2xl font-bold text-white">Core Values</h2>
                            <ul className="list-disc space-y-3 pl-6">
                                <li><strong className="text-white">Faith:</strong> We trust God and follow His leading in every season.</li>
                                <li><strong className="text-white">Prayer:</strong> We believe prayer is the engine of spiritual growth and revival.</li>
                                <li><strong className="text-white">Discipleship:</strong> We nurture believers to grow in Christ and become mature in their walk.</li>
                                <li><strong className="text-white">Service:</strong> We pursue love, compassion, and practical impact in our communities.</li>
                            </ul>
                        </div>

                        <div className="rounded-2xl border border-red-800/70 bg-slate-900/80 p-8">
                            <h2 className="mb-4 text-2xl font-bold text-white">What We Emphasize</h2>
                            <ul className="list-disc space-y-3 pl-6">
                                <li>Spirit-filled worship and prayer gatherings</li>
                                <li>Sound biblical teaching and Christian discipleship</li>
                                <li>Ministry, outreach, and compassion for the community</li>
                                <li>Family life, spiritual growth, and kingdom purpose</li>
                            </ul>
                        </div>
                    </div>

                    <div className="mt-12 rounded-3xl bg-gradient-to-r from-red-900/30 to-slate-900 p-8 text-center">
                        <h3 className="mb-4 text-xl font-bold text-white">Join the Church Family</h3>
                        <p className="mb-6 text-slate-300">
                            Discover our ministries, worship gatherings, and ways to serve and grow in Christ.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Link href="/ministries" className="rounded-lg bg-red-600 px-6 py-2 font-semibold text-white transition hover:bg-red-500">
                                Explore Ministries
                            </Link>
                            <Link href="/events" className="rounded-lg border border-red-600 px-6 py-2 font-semibold text-red-100 transition hover:bg-red-900/40">
                                View Events
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
