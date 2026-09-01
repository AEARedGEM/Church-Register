import { Head, Link } from '@inertiajs/react';

export default function Community() {
    return (
        <>
            <Head title="Church Community - APGA Worldwide" />
            <div className="min-h-screen bg-slate-950 text-slate-100">
                <nav className="border-b border-red-800/70 bg-slate-950/95 backdrop-blur-sm">
                    <div className="container mx-auto flex items-center justify-between px-6 py-4">
                        <Link href="/" className="text-2xl font-bold text-red-400">APGA Worldwide</Link>
                        <Link href="/" className="text-red-200 transition hover:text-white">Back to Home</Link>
                    </div>
                </nav>
                <div className="container mx-auto px-6 py-16 max-w-5xl">
                    <h1 className="mb-6 text-4xl font-bold text-white">Church Community</h1>
                    <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
                        <article className="space-y-8 text-slate-300">
                            <section>
                                <h2 className="mb-4 text-2xl font-bold text-white">A life of faith, fellowship, and mutual care</h2>
                                <p className="mb-4">At APGA Worldwide, community is not just a gathering; it is a family where believers pray together, grow together, and serve one another with love and purpose.</p>
                                <ul className="list-disc list-inside space-y-3">
                                    <li>Small groups and discipleship circles that build spiritual maturity</li>
                                    <li>Pastoral care, prayer support, and consistent encouragement</li>
                                    <li>Shared service opportunities through ministry and outreach</li>
                                    <li>Meaningful connection for families, youth, and new members</li>
                                </ul>
                            </section>

                            <section>
                                <h3 className="mb-4 text-2xl font-bold text-white">How the church community grows</h3>
                                <p className="mb-4">We believe spiritual growth happens through worship, accountability, prayer, and the practical expression of Christ’s love in everyday life.</p>
                                <div className="space-y-3">
                                    <div className="rounded-2xl border border-red-800/70 bg-slate-900/80 p-5">
                                        <h4 className="font-semibold text-white">Prayer and care</h4>
                                        <p className="mt-2 text-sm text-slate-300">Members are supported through prayer, pastoral guidance, and intentional care during every season of life.</p>
                                    </div>
                                    <div className="rounded-2xl border border-red-800/70 bg-slate-900/80 p-5">
                                        <h4 className="font-semibold text-white">Discipleship and unity</h4>
                                        <p className="mt-2 text-sm text-slate-300">Believers are encouraged to grow in Christ, build healthy relationships, and serve with humility and joy.</p>
                                    </div>
                                </div>
                            </section>
                        </article>

                        <aside className="space-y-6 rounded-3xl border border-red-800/70 bg-slate-900/80 p-8 shadow-lg shadow-red-950/20">
                            <div>
                                <p className="text-xs uppercase tracking-[0.25em] text-red-300">Community first</p>
                                <h2 className="mt-3 text-3xl font-semibold text-white">Belong, grow, and serve</h2>
                            </div>
                            <div className="space-y-4 text-sm text-slate-300">
                                <p>Our church family is built around worship, discipleship, care, and acts of service that make a difference in people's lives.</p>
                                <p className="font-semibold text-white">What we focus on:</p>
                                <ul className="list-disc list-inside space-y-2">
                                    <li>Prayer, mentorship, and spiritual encouragement</li>
                                    <li>Family and youth discipleship</li>
                                    <li>Ministry participation and community outreach</li>
                                </ul>
                            </div>
                            <div className="rounded-3xl border border-red-700/70 bg-red-900/20 p-5">
                                <p className="text-sm uppercase tracking-[0.2em] text-red-200">Join the family</p>
                                <p className="mt-3 text-sm text-slate-200">Be part of a Christ-centered community where faith is lived out in practical love and service.</p>
                            </div>
                            <Link href="/ministries" className="inline-block w-full rounded-xl bg-red-600 px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-red-500">Explore ministries</Link>
                            <Link href="/" className="inline-block w-full rounded-xl border border-slate-700 px-5 py-3 text-center text-sm font-semibold text-slate-200 transition hover:bg-slate-800">Back to church home</Link>
                        </aside>
                    </div>
                </div>
            </div>
        </>
    );
}
