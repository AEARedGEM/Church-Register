import { Head, Link } from '@inertiajs/react';

export default function Funding() {
    const fundingSources = [
        { name: 'NYP-IP Fund', desc: 'Central revolving fund for youth enterprise development', amount: 'Multi-billion Naira' },
        { name: 'Tokenized Assets', desc: 'Digital asset-based financing mechanisms', amount: 'Variable' },
        { name: 'Stablecoin Issuance', desc: 'Digital currencies backed by development assets', amount: 'Scalable' },
        { name: 'Government Allocations', desc: 'Budget support and fiscal allocations', amount: 'Annual' }
    ];

    return (
        <>
            <Head title="Funding & Capital - NYP-IP" />

            <div className="min-h-screen bg-white dark:bg-gray-900">
                <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
                    <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                        <Link href="/" className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                            NYP-IP
                        </Link>
                        <Link href="/" className="text-gray-600 dark:text-gray-300 hover:text-emerald-600">
                            Back to Home
                        </Link>
                    </div>
                </nav>

                <div className="container mx-auto px-6 py-16 max-w-4xl">
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">Funding & Capital</h1>

                    <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
                        <p className="text-gray-700 dark:text-gray-300">
                            The NYP-IP mobilizes capital through multiple channels to ensure youth entrepreneurs and enterprises have access to the resources needed for growth and scaling.
                        </p>
                    </div>

                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Funding Sources</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                        {fundingSources.map((source, idx) => (
                            <div key={idx} className="bg-gradient-to-br from-emerald-50 to-emerald-50 dark:from-gray-800 dark:to-gray-900 rounded-lg p-6 border border-emerald-200 dark:border-emerald-900/30">
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{source.name}</h3>
                                <p className="text-gray-700 dark:text-gray-300 text-sm mb-3">{source.desc}</p>
                                <p className="text-emerald-600 dark:text-emerald-400 font-semibold text-sm">Amount: {source.amount}</p>
                            </div>
                        ))}
                    </div>

                    <div className="space-y-8">
                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Startup Tokenization</h2>
                            <p className="text-gray-700 dark:text-gray-300 mb-4">
                                Top startup and project candidates from the NAP/S public dashboard are selected through state and partner networks. These initiatives are grouped by state, LGA and ward before tokenization support is offered.
                            </p>
                            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                                <li>Top 3 startup/projects from each state cluster are surfaced for support.</li>
                                <li>Partner networks and community squads advance applications together.</li>
                                <li>Forms and proposals are submitted through state or community-led channels.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">TradeFi Tokenization</h2>
                            <p className="text-gray-700 dark:text-gray-300 mb-4">
                                Support for working capital and trade finance is provided through three tokenized product variants, making finance more affordable and accessible for existing businesses and growth-stage ventures.
                            </p>
                            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                                <li>Tokenized Invoice Financing for receivable-backed liquidity.</li>
                                <li>Tokenized Export Financing for export-ready producers and supply chains.</li>
                                <li>Tokenized Import Financing for materials sourcing and working capital.</li>
                            </ul>
                            <p className="mt-4 text-sm text-gray-600 dark:text-gray-300">
                                Fees are designed to be competitive, with an objective of roughly half the cost of comparable market providers, including LuxuryX-type services.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Community & Partner-led Applications</h2>
                            <p className="text-gray-700 dark:text-gray-300 mb-4">
                                Individual entrepreneurs cannot submit tokenization applications on their own. The program encourages coordinated proposals through mentors, incubators, state networks and community hubs.
                            </p>
                            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                                <li>Partner-led teams ensure projects are market-ready and compliant.</li>
                                <li>Community hubs help identify the highest-impact local proposals.</li>
                                <li>State / LGA / ward-based alignment helps connect finance to production.</li>
                            </ul>
                        </section>
                    </div>

                    <div className="mt-12 bg-gradient-to-r from-emerald-50 to-emerald-50 dark:from-emerald-950 dark:to-emerald-950 rounded-lg p-8 text-center">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Ready to Apply?</h3>
                        <p className="text-gray-700 dark:text-gray-300 mb-6">
                            Access our documentation and funding frameworks to understand the process.
                        </p>
                        <Link href="/documentation/funding-framework" className="inline-block px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">
                            View Funding Framework
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
