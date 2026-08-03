import { Head, Link } from '@inertiajs/react';

export default function FAQ() {
    const faqs = [
        { q: 'Who is eligible to participate?', a: 'Nigerian youth aged 18-45 interested in industrialization and entrepreneurship can participate in the NYP-IP program.' },
        { q: 'How do I register?', a: 'Visit our portal, create an account, and follow the onboarding process to register your interest.' },
        { q: 'What is the application process like?', a: 'Application involves submission of business proposal, skills assessment, and evaluation by our review committee.' },
        { q: 'How can I access funding?', a: 'After successful registration and validation, you can apply for funding through various windows available in the program.' },
        { q: 'Are there training opportunities?', a: 'Yes, we offer comprehensive training in technical skills, business development, and entrepreneurship.' }
    ];

    return (
        <>
            <Head title="FAQ - NYP-IP" />
            <div className="min-h-screen bg-white dark:bg-gray-900">
                <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
                    <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                        <Link href="/" className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">NYP-IP</Link>
                        <Link href="/" className="text-gray-600 dark:text-gray-300 hover:text-emerald-600">Back to Home</Link>
                    </div>
                </nav>
                <div className="container mx-auto px-6 py-16 max-w-4xl">
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">Frequently Asked Questions</h1>
                    <div className="space-y-4">
                        {faqs.map((faq, idx) => (
                            <div key={idx} className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{faq.q}</h3>
                                <p className="text-gray-700 dark:text-gray-300">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                    <div className="mt-8 bg-emerald-50 dark:bg-emerald-950 border border-emerald-200 dark:border-emerald-900 rounded-lg p-6">
                        <p className="text-emerald-900 dark:text-emerald-100">
                            <strong>Can't find your answer?</strong> Visit our <Link href="/support" className="underline hover:no-underline">support page</Link> or contact us directly.
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
