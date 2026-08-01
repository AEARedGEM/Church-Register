import { Head, Link } from '@inertiajs/react';

export default function Cookies() {
    return (
        <>
            <Head title="Cookie Policy - NYP-IP" />
            <div className="min-h-screen bg-white dark:bg-gray-900">
                <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
                    <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                        <Link href="/" className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">NYP-IP</Link>
                        <Link href="/" className="text-gray-600 dark:text-gray-300 hover:text-emerald-600">Back to Home</Link>
                    </div>
                </nav>
                <div className="container mx-auto px-6 py-16 max-w-4xl">
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">Cookie Policy</h1>
                    <div className="prose prose-lg dark:prose-invert max-w-none space-y-6 text-gray-700 dark:text-gray-300">
                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">What Are Cookies?</h2>
                            <p>Cookies are small text files stored on your device that help us provide a better user experience and understand how you use our platform.</p>
                        </section>
                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Types of Cookies We Use</h2>
                            <ul className="list-disc list-inside space-y-2">
                                <li><strong>Essential:</strong> Required for platform functionality and security</li>
                                <li><strong>Performance:</strong> Help us understand usage patterns and improve services</li>
                                <li><strong>Preference:</strong> Remember your settings and preferences</li>
                                <li><strong>Marketing:</strong> Used to track engagement and effectiveness of campaigns</li>
                            </ul>
                        </section>
                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Managing Cookies</h2>
                            <p>You can control cookie settings through your browser. However, disabling essential cookies may impact platform functionality.</p>
                        </section>
                    </div>
                </div>
            </div>
        </>
    );
}
