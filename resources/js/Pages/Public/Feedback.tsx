import { Head, Link } from '@inertiajs/react';

export default function Feedback() {
    return (
        <>
            <Head title="Feedback & Suggestions - APGA Worldwide" />
            <div className="min-h-screen bg-slate-950 text-slate-100">
                <nav className="border-b border-red-800/70 bg-slate-950/95 backdrop-blur-sm">
                    <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                        <Link href="/" className="text-2xl font-bold text-red-400">APGA Worldwide</Link>
                        <Link href="/" className="text-red-200 transition hover:text-white">Back to Home</Link>
                    </div>
                </nav>
                <div className="container mx-auto px-6 py-16 max-w-4xl">
                    <h1 className="mb-6 text-4xl font-bold text-white">Feedback & Suggestions</h1>
                    <div className="space-y-6 text-slate-300">
                        <section>
                            <h2 className="mb-3 text-2xl font-bold text-white">We value your input</h2>
                            <p className="mb-4">Your feedback helps us improve the church experience and better serve our members and community. We welcome ideas, comments, and suggestions that help us grow in love, discipleship, and service.</p>
                        </section>
                        <section>
                            <h2 className="mb-3 text-2xl font-bold text-white">How to share feedback</h2>
                            <ul className="mb-6 list-disc list-inside space-y-2">
                                <li>Use the church contact channels or prayer/support desks</li>
                                <li>Email the church leadership team directly</li>
                                <li>Participate in fellowship discussions and member surveys</li>
                                <li>Share ideas with ministry leaders and pastoral teams</li>
                            </ul>
                        </section>
                        <div className="rounded-lg border border-red-800/70 bg-red-900/20 p-6">
                            <p className="text-red-100">
                                <strong>Your feedback is valued and prayerfully reviewed by the church leadership.</strong> We are committed to improving every part of our worship, discipleship, and community life.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
