import { Head, Link } from '@inertiajs/react';

export default function Specs() {
    return (
        <>
            <Head title="Technical Specifications - NYP-IP" />
            <div className="min-h-screen bg-white dark:bg-gray-900">
                <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
                    <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                        <Link href="/" className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">NYP-IP</Link>
                        <Link href="/" className="text-gray-600 dark:text-gray-300 hover:text-emerald-600">Back to Home</Link>
                    </div>
                </nav>
                <div className="container mx-auto px-6 py-16 max-w-4xl">
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">Technical Specifications</h1>
                    <div className="space-y-6 text-gray-700 dark:text-gray-300">
                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Digital Asset Standards</h2>
                            <ul className="list-disc list-inside space-y-2">
                                <li>Tokenization Standards (ERC-20, BEP-20)</li>
                                <li>Smart Contract Specifications</li>
                                <li>Stablecoin Architecture</li>
                                <li>Wallet and Key Management</li>
                            </ul>
                        </section>
                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Data & Reporting Standards</h2>
                            <ul className="list-disc list-inside space-y-2">
                                <li>Real-time Reporting Formats</li>
                                <li>Data Quality and Verification Procedures</li>
                                <li>Interoperability Requirements</li>
                                <li>Security and Encryption Standards</li>
                            </ul>
                        </section>
                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">System Requirements</h2>
                            <p>API documentation, integration guidelines, and technical support resources are available for partners and developers.</p>
                        </section>
                    </div>
                </div>
            </div>
        </>
    );
}
