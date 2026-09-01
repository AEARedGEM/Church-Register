import { Head, Link } from '@inertiajs/react';

export default function KnowledgeBase() {
    return (
        <>
            <Head title="Knowledge Base - APGA Worldwide" />
            <div className="min-h-screen bg-white dark:bg-gray-900">
                <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
                    <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                        <Link href="/" className="text-2xl font-bold text-red-600 dark:text-red-400">APGA Worldwide</Link>
                        <Link href="/" className="text-gray-600 dark:text-gray-300 hover:text-red-600">Back to Home</Link>
                    </div>
                </nav>
                <div className="container mx-auto px-6 py-16 max-w-4xl">
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">Knowledge Base</h1>
                    <div className="space-y-6 text-gray-700 dark:text-gray-300">
                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Learning Resources</h2>
                            <ul className="list-disc list-inside space-y-2">
                                <li>Business Development Guides</li>
                                <li>Industry Best Practices</li>
                                <li>Technology Tutorials</li>
                                <li>Financial Management Resources</li>
                                <li>Marketing and Sales Strategies</li>
                            </ul>
                        </section>
                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Research & Insights</h2>
                            <p>Access data-driven insights, market reports, and sector analysis to inform your business decisions.</p>
                        </section>
                    </div>
                </div>
            </div>
        </>
    );
}
