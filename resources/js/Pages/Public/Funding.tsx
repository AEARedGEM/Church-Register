import { Head, Link } from '@inertiajs/react';

export default function Funding() {
    const givingPaths = [
        { name: 'Tithes & Offerings', desc: 'Regular financial giving to support worship, pastoral care, and ministry operations.', amount: 'Ongoing' },
        { name: 'Project Support', desc: 'Contributions toward church expansion, community outreach, and ministry initiatives.', amount: 'Seasonal' },
        { name: 'Mission & Outreach', desc: 'Support for evangelism, local care, and humanitarian efforts across the church family.', amount: 'Impact-driven' },
        { name: 'Partnership Giving', desc: 'Committed support from partners and sponsors invested in church growth and service.', amount: 'Collaborative' }
    ];

    return (
        <>
            <Head title="Giving & Support - APGA Worldwide" />

            <div className="min-h-screen bg-slate-950 text-slate-100">
                <nav className="border-b border-red-800/70 bg-slate-950/95 backdrop-blur-sm">
                    <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                        <Link href="/" className="text-2xl font-bold text-red-400">APGA Worldwide</Link>
                        <Link href="/" className="text-red-200 transition hover:text-white">Back to Home</Link>
                    </div>
                </nav>

                <div className="container mx-auto px-6 py-16 max-w-4xl">
                    <h1 className="mb-6 text-4xl font-bold text-white">Giving & Support</h1>

                    <div className="mb-12 rounded-2xl border border-red-800/70 bg-slate-900/80 p-8 text-slate-300">
                        <p>
                            At APGA Worldwide, giving is an act of worship and partnership. We believe God calls His people to joyfully support the ministry, the mission, and the communities we serve.
                        </p>
                    </div>

                    <h2 className="mb-6 text-2xl font-bold text-white">Support pathways</h2>
                    <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-2">
                        {givingPaths.map((source, idx) => (
                            <div key={idx} className="rounded-lg border border-red-800/70 bg-gradient-to-br from-red-900/20 to-slate-900 p-6">
                                <h3 className="mb-2 text-lg font-bold text-white">{source.name}</h3>
                                <p className="mb-3 text-sm text-slate-300">{source.desc}</p>
                                <p className="text-red-300 font-semibold text-sm">Focus: {source.amount}</p>
                            </div>
                        ))}
                    </div>

                    <div className="space-y-8">
                        <section>
                            <h2 className="mb-4 text-2xl font-bold text-white">Why we give</h2>
                            <p className="mb-4 text-slate-300">
                                Kingdom giving strengthens the church’s mission, supports pastoral care, and equips believers to serve families, the vulnerable, and the wider community with practical compassion.
                            </p>
                            <ul className="list-disc list-inside space-y-2 text-slate-300">
                                <li>Support worship, discipleship, and pastoral leadership.</li>
                                <li>Fund outreach, events, and church-wide ministry initiatives.</li>
                                <li>Empower renewal, prayer, and practical community impact.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="mb-4 text-2xl font-bold text-white">Partner with the church</h2>
                            <p className="mb-4 text-slate-300">
                                We welcome partners, sponsors, and faithful supporters who want to help the church grow spiritually and serve effectively.
                            </p>
                            <ul className="list-disc list-inside space-y-2 text-slate-300">
                                <li>Partner with ministries, outreach initiatives, and service teams.</li>
                                <li>Sponsor church events, welfare activities, and discipleship programs.</li>
                                <li>Support the broader mission of evangelism and community transformation.</li>
                            </ul>
                        </section>
                    </div>

                    <div className="mt-12 rounded-lg border border-red-800/70 bg-gradient-to-r from-red-900/20 to-slate-900 p-8 text-center">
                        <h3 className="mb-4 text-xl font-bold text-white">Be part of the mission</h3>
                        <p className="mb-6 text-slate-300">Join us in supporting the church’s worship, outreach, and discipleship vision.</p>
                        <Link href="/events" className="inline-block rounded-lg bg-red-600 px-6 py-2 font-semibold text-white transition hover:bg-red-500">
                            View church events
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
