import { Head, Link } from '@inertiajs/react';

export default function Support() {
    return (
        <>
            <Head title="Contact & Support - NYP-IP" />
            <div className="min-h-screen bg-white dark:bg-gray-900">
                <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
                    <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                        <Link href="/" className="text-2xl font-bold text-red-600 dark:text-red-400">NYP-IP</Link>
                        <Link href="/" className="text-gray-600 dark:text-gray-300 hover:text-red-600">Back to Home</Link>
                    </div>
                </nav>
                <div className="container mx-auto px-6 py-16 max-w-4xl">
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">Contact & Support</h1>
                    <div className="space-y-6 text-gray-700 dark:text-gray-300">
                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Get in Touch</h2>
                            <p className="mb-4">Our support team is available to assist you with program-related inquiries and technical support.</p>
                            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                                <p><strong>Email:</strong> support@nyp-ip.org</p>
                                <p><strong>Phone:</strong> +234 XXX XXX XXXX</p>
                                <p><strong>Office Hours:</strong> Monday - Friday, 9:00 AM - 5:00 PM WAT</p>
                            </div>
                        </section>
                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Support Channels</h2>
                            <ul className="list-disc list-inside space-y-2">
                                <li>Email Support</li>
                                <li>Phone Support</li>
                                <li>Live Chat</li>
                                <li>Ticketing System</li>
                            </ul>
                        </section>
                    </div>
                </div>
            </div>
        </>
    );
}
