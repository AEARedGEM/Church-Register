import { Head, Link } from '@inertiajs/react';

export default function Program() {
    return (
        <>
            <Head title="Church Program Overview - APGA Worldwide" />

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
                    <h1 className="mb-6 text-4xl font-bold text-white">Church Program Overview</h1>

                    <div className="space-y-8 text-lg text-slate-300">
                        <p>
                            At APGA Worldwide, our church life is designed to help people worship God, grow in faith, build relationships, and respond to the needs of our communities with compassion.
                        </p>

                        <h2 className="mt-8 text-2xl font-bold text-white">Program Focus</h2>
                        <ul className="list-disc space-y-3 pl-6">
                            <li>Spirit-filled worship and prayer gatherings</li>
                            <li>Biblical teaching and discipleship for every age group</li>
                            <li>Pastoral care and family support</li>
                            <li>Ministry outreach and community engagement</li>
                            <li>Leadership development and service opportunities</li>
                        </ul>

                        <h2 className="mt-8 text-2xl font-bold text-white">Core Components</h2>
                        <div className="space-y-4">
                            {[
                                { title: 'Sunday Worship', desc: 'A time of praise, prayer, scripture, and spiritual renewal for the church family.' },
                                { title: 'Midweek Prayer', desc: 'Focused prayer and spiritual encouragement for believers and families.' },
                                { title: 'Discipleship Groups', desc: 'Small-group spiritual growth, accountability, and biblical learning.' },
                                { title: 'Community Outreach', desc: 'Practical ministry to families, the vulnerable, and those in need of hope.' }
                            ].map((component, idx) => (
                                <div key={idx} className="rounded-xl border border-red-800/70 bg-slate-900/70 p-5">
                                    <h3 className="mb-2 font-semibold text-white">{component.title}</h3>
                                    <p className="text-sm text-slate-300">{component.desc}</p>
                                </div>
                            ))}
                        </div>

                        <h2 className="mt-8 text-2xl font-bold text-white">Expected Outcomes</h2>
                        <ul className="list-disc space-y-3 pl-6">
                            <li>Stronger spiritual life and deeper prayer culture</li>
                            <li>Families and believers growing in faith together</li>
                            <li>More people serving in ministry and outreach</li>
                            <li>A healthier, more united church community</li>
                        </ul>
                    </div>

                    <div className="mt-12 rounded-3xl bg-gradient-to-r from-red-900/30 to-slate-900 p-8">
                        <h3 className="mb-4 text-xl font-bold text-white">Be Part of the Next Move of God</h3>
                        <p className="mb-6 text-slate-300">
                            Explore our ministries, events, and ways to connect with the church community.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Link href="/ministries" className="rounded-lg bg-red-600 px-6 py-2 font-semibold text-white transition hover:bg-red-500">
                                Ministries
                            </Link>
                            <Link href="/events" className="rounded-lg border border-red-600 px-6 py-2 font-semibold text-red-100 transition hover:bg-red-900/40">
                                Events
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
