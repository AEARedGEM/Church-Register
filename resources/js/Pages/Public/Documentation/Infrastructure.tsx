import { Head, Link } from '@inertiajs/react';

export default function Infrastructure() {
    return (
        <>
            <Head title="Infrastructure & Technology Framework - NYP-IP" />
            <div className="min-h-screen bg-white dark:bg-gray-900">
                <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
                    <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                        <Link href="/" className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">NYP-IP</Link>
                        <Link href="/" className="text-gray-600 dark:text-gray-300 hover:text-emerald-600">Back to Home</Link>
                    </div>
                </nav>
                <div className="container mx-auto px-6 py-16 max-w-4xl">
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">Infrastructure & Technology</h1>
                    <div className="space-y-6 text-gray-700 dark:text-gray-300">
                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Digital Infrastructure</h2>
                            <p>The portal provides integrated digital infrastructure for registration, financing, training, and market linkage services.</p>
                        </section>
                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Physical Infrastructure</h2>
                            <ul className="list-disc list-inside space-y-2">
                                <li>Regional Industrial Development Hubs</li>
                                <li>Skills Training Centers</li>
                                <li>Manufacturing and Production Facilities</li>
                                <li>Digital Payment and Transaction Systems</li>
                            </ul>
                        </section>
                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Technology Integration</h2>
                            <p>Blockchain-based tokenization, digital wallets, smart contracts, and real-time monitoring systems enable transparent and efficient program delivery.</p>
                        </section>
                    </div>
                </div>
            </div>
        </>
    );
}
