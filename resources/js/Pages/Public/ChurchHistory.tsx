import { Head, Link } from '@inertiajs/react';

export default function ChurchHistory() {
    return (
        <>
            <Head title="Church History - APGA Worldwide" />
            <div className="min-h-screen bg-slate-950 text-slate-100">
                <nav className="border-b border-red-800/70 bg-slate-950/95 backdrop-blur-sm">
                    <div className="container mx-auto flex items-center justify-between px-6 py-4">
                        <Link href="/" className="text-2xl font-bold text-red-400">APGA Worldwide</Link>
                        <Link href="/" className="text-red-200 transition hover:text-white">Back to Home</Link>
                    </div>
                </nav>

                <div className="container mx-auto max-w-4xl px-6 py-16">
                    <h1 className="mb-6 text-4xl font-bold text-white">Church History</h1>
                    <div className="space-y-6 text-lg text-slate-300">
                        <p>
                            APGA Worldwide began with a vision to build a vibrant church fellowship rooted in prayer,
                            worship, discipleship, and community transformation.
                        </p>
                        <p>
                            Over the years, the church has grown through faithful leadership, spiritual commitment,
                            and a passion for seeing people encounter Christ and live purposeful lives.
                        </p>
                        <p>
                            Today, the church continues to expand its ministry footprint through worship gatherings,
                            outreach, leadership development, and service to families and communities.
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
