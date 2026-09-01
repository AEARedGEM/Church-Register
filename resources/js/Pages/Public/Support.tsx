import { Head, Link } from '@inertiajs/react';

export default function Support() {
    return (
        <>
            <Head title="Contact & Support - APGA Worldwide" />
            <div className="min-h-screen bg-slate-950 text-slate-100">
                <nav className="border-b border-red-800/70 bg-slate-950/95 backdrop-blur-sm">
                    <div className="container mx-auto flex items-center justify-between px-6 py-4">
                        <Link href="/" className="text-2xl font-bold text-red-400">APGA Worldwide</Link>
                        <Link href="/" className="text-red-200 transition hover:text-white">Back to Home</Link>
                    </div>
                </nav>
                <div className="container mx-auto max-w-4xl px-6 py-16">
                    <h1 className="mb-6 text-4xl font-bold text-white">Contact & Support</h1>
                    <div className="space-y-6 text-slate-300">
                        <section className="rounded-2xl border border-red-800/70 bg-slate-900/80 p-6">
                            <h2 className="mb-3 text-2xl font-bold text-white">Get in Touch</h2>
                            <p className="mb-4">
                                We are glad to help with prayer requests, ministry enquiries, event details, and church family information.
                            </p>
                            <div className="space-y-2 rounded-xl border border-red-800/60 bg-slate-950/60 p-5">
                                <p><strong className="text-white">Email:</strong> hello@apga-worldwide.org</p>
                                <p><strong className="text-white">Phone:</strong> +234 XXX XXX XXXX</p>
                                <p><strong className="text-white">Office Hours:</strong> Monday - Friday, 9:00 AM - 5:00 PM</p>
                            </div>
                        </section>
                        <section className="rounded-2xl border border-red-800/70 bg-slate-900/80 p-6">
                            <h2 className="mb-3 text-2xl font-bold text-white">Ways to Connect</h2>
                            <ul className="list-disc space-y-2 pl-6">
                                <li>Prayer requests and pastoral care</li>
                                <li>Ministry and service enquiries</li>
                                <li>Event information and registrations</li>
                                <li>General church family support</li>
                            </ul>
                        </section>
                    </div>
                </div>
            </div>
        </>
    );
}
