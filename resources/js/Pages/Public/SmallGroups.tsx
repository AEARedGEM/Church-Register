import { Head, Link } from '@inertiajs/react';

export default function SmallGroups() {
    return (
        <>
            <Head title="Small Groups - APGA Worldwide" />
            <div className="min-h-screen bg-slate-950 text-slate-100">
                <nav className="border-b border-red-800/70 bg-slate-950/95 backdrop-blur-sm">
                    <div className="container mx-auto flex items-center justify-between px-6 py-4">
                        <Link href="/" className="text-2xl font-bold text-red-400">APGA Worldwide</Link>
                        <Link href="/" className="text-red-200 transition hover:text-white">Back to Home</Link>
                    </div>
                </nav>
                <div className="container mx-auto max-w-4xl px-6 py-16">
                    <h1 className="mb-6 text-4xl font-bold text-white">Small Groups</h1>
                    <div className="space-y-6 text-slate-300">
                        <p>
                            Small groups are where deeper relationships and spiritual growth happen. Through prayer,
                            discussion, and accountability, members build lasting Christian community.
                        </p>
                        <ul className="list-disc space-y-2 pl-6">
                            <li>Weekly Bible study and prayer</li>
                            <li>Discipleship and spiritual mentoring</li>
                            <li>Support for individuals and families</li>
                            <li>Mission-focused outreach and service</li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}
