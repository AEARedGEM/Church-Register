import { Head, Link } from '@inertiajs/react';

export default function Feedback() {
    return (
        <>
            <Head title="Feedback & Suggestions - NYP-IP" />
            <div className="min-h-screen bg-white dark:bg-gray-900">
                <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
                    <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                        <Link href="/" className="text-2xl font-bold text-red-600 dark:text-red-400">NYP-IP</Link>
                        <Link href="/" className="text-gray-600 dark:text-gray-300 hover:text-red-600">Back to Home</Link>
                    </div>
                </nav>
                <div className="container mx-auto px-6 py-16 max-w-4xl">
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">Feedback & Suggestions</h1>
                    <div className="space-y-6 text-gray-700 dark:text-gray-300">
                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">We Value Your Input</h2>
                            <p className="mb-4">Your feedback helps us improve the NYP-IP program and better serve our participants. We welcome suggestions on all aspects of our work.</p>
                        </section>
                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">How to Submit Feedback</h2>
                            <ul className="list-disc list-inside space-y-2 mb-6">
                                <li>Use our online feedback form</li>
                                <li>Email us directly at feedback@nyp-ip.org</li>
                                <li>Participate in our surveys and focus groups</li>
                                <li>Attend community forums and stakeholder meetings</li>
                            </ul>
                        </section>
                        <div className="bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-900 rounded-lg p-6">
                            <p className="text-red-900 dark:text-red-100">
                                <strong>All feedback is confidential and will be reviewed by our leadership team.</strong> We appreciate your contribution to making the NYP-IP even better.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
