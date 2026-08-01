import { Head, Link } from '@inertiajs/react';

export default function FundingFramework() {
    return (
        <>
            <Head title="Funding & Financial Engineering Framework - NYP-IP" />
            <div className="min-h-screen bg-white dark:bg-gray-900">
                <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
                    <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                        <Link href="/" className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">NYP-IP</Link>
                        <Link href="/" className="text-gray-600 dark:text-gray-300 hover:text-emerald-600">Back to Home</Link>
                    </div>
                </nav>
                <div className="container mx-auto px-6 py-16 max-w-4xl">
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">Funding & Financial Engineering</h1>
                    <div className="space-y-6 text-gray-700 dark:text-gray-300">
                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Financial Architecture</h2>
                            <p>The program employs innovative financing mechanisms including revolving funds, equity investments, debt instruments, and digital asset-based financing.</p>
                        </section>
                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Funding Windows</h2>
                            <ul className="list-disc list-inside space-y-2">
                                <li>Seed Stage Financing for startups</li>
                                <li>Growth Stage Capital for scaling enterprises</li>
                                <li>Infrastructure Investment for industrial development</li>
                                <li>Working Capital Support for operations</li>
                            </ul>
                        </section>
                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Risk Management</h2>
                            <p>Comprehensive risk assessment, portfolio diversification, and insurance mechanisms protect fund integrity while supporting youth enterprises.</p>
                        </section>
                    </div>
                </div>
            </div>
        </>
    );
}
