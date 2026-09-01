import { Head, Link } from '@inertiajs/react';

export default function FAQ() {
    const faqs = [
        { q: 'Who can worship with APGA Worldwide?', a: 'Everyone is welcome to worship with us. We are a Christ-centered church family committed to prayer, discipleship, and genuine community.' },
        { q: 'How do I join the church?', a: 'You can visit our church services, connect with our ministry teams, or register on the website to begin your journey with us.' },
        { q: 'Are there ministry opportunities for new members?', a: 'Yes. We encourage new members to connect with a ministry, serve, and grow through discipleship and practical outreach.' },
        { q: 'Can I submit a prayer request?', a: 'Absolutely. You can submit a prayer request through our public prayer form and our care team will pray with you.' },
        { q: 'Are there events for families and youth?', a: 'Yes. We host worship services, youth gatherings, prayer meetings, community outreach, and special church events throughout the year.' }
    ];

    return (
        <>
            <Head title="FAQ - APGA Worldwide" />
            <div className="min-h-screen bg-slate-950 text-slate-100">
                <nav className="border-b border-red-800/70 bg-slate-950/95 backdrop-blur-sm">
                    <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                        <Link href="/" className="text-2xl font-bold text-red-400">APGA Worldwide</Link>
                        <Link href="/" className="text-red-200 transition hover:text-white">Back to Home</Link>
                    </div>
                </nav>
                <div className="container mx-auto px-6 py-16 max-w-4xl">
                    <h1 className="mb-6 text-4xl font-bold text-white">Frequently Asked Questions</h1>
                    <div className="space-y-4">
                        {faqs.map((faq, idx) => (
                            <div key={idx} className="rounded-lg border border-red-800/70 bg-slate-900/80 p-6">
                                <h3 className="mb-2 font-semibold text-white">{faq.q}</h3>
                                <p className="text-slate-300">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                    <div className="mt-8 rounded-lg border border-red-700/60 bg-red-900/20 p-6">
                        <p className="text-red-100">
                            <strong>Need a personal response?</strong> Visit our <Link href="/support" className="underline hover:no-underline">support page</Link> or reach out through the church community channels.
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
