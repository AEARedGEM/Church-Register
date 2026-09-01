import { Head, Link } from '@inertiajs/react';

export default function Disclaimer() {
    return (
        <>
            <Head title="Disclaimer - APGA Worldwide" />
            <div className="min-h-screen bg-white dark:bg-gray-900">
                <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
                    <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                        <Link href="/" className="text-2xl font-bold text-red-600 dark:text-red-400">APGA Worldwide</Link>
                        <Link href="/" className="text-gray-600 dark:text-gray-300 hover:text-red-600">Back to Home</Link>
                    </div>
                </nav>
                <div className="container mx-auto px-6 py-16 max-w-4xl">
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">Disclaimer</h1>
                    <div className="prose prose-lg dark:prose-invert max-w-none space-y-6 text-gray-700 dark:text-gray-300">
                        <div className="bg-yellow-50 dark:bg-yellow-950/30 border border-yellow-200 dark:border-yellow-900 rounded-lg p-4 mb-6">
                            <p className="text-yellow-900 dark:text-yellow-100 font-semibold">
                                Important: This is not investment advice. All participants must understand and accept the risks associated with participation in this program.
                            </p>
                        </div>

                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">General Disclaimer</h2>
                            <p>The information provided on this platform is for informational purposes only. While we strive for accuracy, we do not guarantee the completeness or accuracy of all content.</p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Investment & Financial Risk</h2>
                            <ul className="list-disc list-inside space-y-2">
                                <li>Participation in tokenized assets and digital securities carries significant risks</li>
                                <li>Potential loss of investment, including complete loss of capital</li>
                                <li>Market volatility and price fluctuations</li>
                                <li>Regulatory changes may affect program operations</li>
                                <li>Past performance does not guarantee future results</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Regulatory Compliance</h2>
                            <p>All participants must comply with applicable national and international laws, regulations, and guidelines. Consult relevant authorities and legal advisors before participation.</p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">External Links</h2>
                            <p>Our platform may contain links to external websites. We are not responsible for the content, accuracy, or practices of external sites.</p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Changes to Disclaimer</h2>
                            <p>We reserve the right to modify this disclaimer at any time. Continued use of the platform constitutes acceptance of any changes.</p>
                        </section>
                    </div>
                </div>
            </div>
        </>
    );
}
