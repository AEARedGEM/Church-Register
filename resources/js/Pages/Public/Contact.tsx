import { Head, Link } from '@inertiajs/react';

export default function Contact() {
    return (
        <>
            <Head title="Contact - APGA Worldwide" />
            <div className="min-h-screen bg-slate-950 text-slate-100">
                <nav className="border-b border-red-800/70 bg-slate-950/95 backdrop-blur-sm">
                    <div className="container mx-auto flex items-center justify-between px-6 py-4">
                        <Link href="/" className="text-2xl font-bold text-red-400">APGA Worldwide</Link>
                        <Link href="/" className="text-red-200 transition hover:text-white">Back to Home</Link>
                    </div>
                </nav>
                <div className="container mx-auto max-w-4xl px-6 py-16">
                    <h1 className="mb-6 text-4xl font-bold text-white">Contact</h1>
                    <div className="space-y-6 text-slate-300">
                        <p>We would love to hear from you and support you in your spiritual journey.</p>
                        <div className="rounded-2xl border border-red-800/70 bg-slate-900/80 p-6">
                            <p><strong className="text-white">Email:</strong> hello@apga-worldwide.org</p>
                            <p><strong className="text-white">Phone:</strong> +234 (0) 000 000 0000</p>
                            <p><strong className="text-white">Office Hours:</strong> Monday - Friday, 9:00 AM - 5:00 PM</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
