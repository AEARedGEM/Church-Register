import { Head, Link } from '@inertiajs/react';

export default function Resources() {
    return (
        <>
            <Head title="Resources - APGA Worldwide" />
            <div className="min-h-screen bg-slate-950 text-slate-100">
                <nav className="border-b border-red-800/70 bg-slate-950/95 backdrop-blur-sm">
                    <div className="container mx-auto flex items-center justify-between px-6 py-4">
                        <Link href="/" className="text-2xl font-bold text-red-400">APGA Worldwide</Link>
                        <Link href="/" className="text-red-200 transition hover:text-white">Back to Home</Link>
                    </div>
                </nav>
                <div className="container mx-auto max-w-4xl px-6 py-16">
                    <h1 className="mb-6 text-4xl font-bold text-white">Resources</h1>
                    <div className="space-y-6 text-slate-300">
                        <p>
                            We provide resources to help believers grow in faith, understand the Bible, and live with purpose.
                        </p>
                        <ul className="list-disc space-y-2 pl-6">
                            <li>Teaching materials and sermon resources</li>
                            <li>Discipleship guides and study notes</li>
                            <li>Prayer and devotional content</li>
                            <li>Ministry and leadership updates</li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}
