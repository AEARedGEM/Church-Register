import { Head, Link } from '@inertiajs/react';

interface ContactDetails {
    email?: string | null;
    phone?: string | null;
    office_hours?: string | null;
}

export default function Contact({ contact = {} }: { contact?: ContactDetails }) {
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
                <main className="container mx-auto max-w-4xl px-6 py-16">
                    <h1 className="mb-6 text-4xl font-bold text-white">Contact</h1>
                    <div className="space-y-6 text-slate-300">
                        <p>We would love to hear from you and support you in your spiritual journey.</p>
                        <div className="rounded-2xl border border-red-800/70 bg-slate-900/80 p-6">
                            <p><strong className="text-white">Email:</strong> {contact.email ? <a href={`mailto:${contact.email}`} className="text-red-300 hover:text-red-200">{contact.email}</a> : 'Email details coming soon'}</p>
                            {contact.phone && <p className="mt-2"><strong className="text-white">Phone:</strong> <a href={`tel:${contact.phone}`} className="text-red-300 hover:text-red-200">{contact.phone}</a></p>}
                            <p className="mt-2"><strong className="text-white">Office Hours:</strong> {contact.office_hours || 'Office hours coming soon'}</p>
                            <Link href={route('send-message')} className="mt-6 inline-block rounded-full bg-red-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-500">
                                Send us a message
                            </Link>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}
