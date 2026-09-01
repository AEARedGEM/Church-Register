import { Head, Link } from '@inertiajs/react';

export default function SendMessage() {
    return (
        <>
            <Head title="Send Message - APGA Worldwide" />
            <div className="min-h-screen bg-slate-950 text-slate-100">
                <nav className="border-b border-red-800/70 bg-slate-950/95 backdrop-blur-sm">
                    <div className="container mx-auto flex items-center justify-between px-6 py-4">
                        <Link href="/" className="text-2xl font-bold text-red-400">APGA Worldwide</Link>
                        <Link href="/" className="text-red-200 transition hover:text-white">Back to Home</Link>
                    </div>
                </nav>
                <div className="container mx-auto max-w-4xl px-6 py-16">
                    <h1 className="mb-6 text-4xl font-bold text-white">Send Message</h1>
                    <div className="rounded-2xl border border-red-800/70 bg-slate-900/80 p-8 text-slate-300">
                        <p className="mb-4">You can send a message through the church contact channels or email the team directly.</p>
                        <p><strong className="text-white">Email:</strong> hello@apga-worldwide.org</p>
                    </div>
                </div>
            </div>
        </>
    );
}
