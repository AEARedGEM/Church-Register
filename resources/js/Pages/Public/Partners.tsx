import { Head, Link } from '@inertiajs/react';

export default function Partners() {
    const partnerCategories = [
        {
            title: 'Government Partners',
            partners: ['Ministry of Industry, Trade and Investment', 'State Governments', 'Development Agencies']
        },
        {
            title: 'Private Sector Partners',
            partners: ['Leading Technology Companies', 'Financial Institutions', 'Manufacturing Enterprises']
        },
        {
            title: 'Development Partners',
            partners: ['International Organizations', 'Donor Agencies', 'Civil Society Organizations']
        }
    ];

    return (
        <>
            <Head title="Strategic Partners - NYP-IP" />

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
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Strategic Partners</h1>
                    <p className="text-lg text-gray-600 dark:text-gray-400 mb-12">
                        The NYP-IP collaborates with leading organizations across government, private sector, and development community to achieve its mission.
                    </p>

                    <div className="space-y-8 mb-12">
                        {partnerCategories.map((category, idx) => (
                            <div key={idx}>
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{category.title}</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {category.partners.map((partner, pidx) => (
                                        <div key={pidx} className="bg-gradient-to-br from-emerald-50 to-emerald-50 dark:from-gray-800 dark:to-gray-900 rounded-lg p-6 border border-emerald-200 dark:border-emerald-900/30">
                                            <p className="font-semibold text-gray-900 dark:text-white">{partner}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-8">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Partnership Opportunities</h2>
                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                            We welcome partnerships from organizations committed to youth empowerment and sustainable industrialization. Partnership models include:
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                            <li>Funding and Capital Support</li>
                            <li>Technical Capacity Building</li>
                            <li>Market Access and Linkages</li>
                            <li>Policy Advocacy and Coordination</li>
                            <li>Research and Knowledge Sharing</li>
                        </ul>
                    </div>

                    <div className="mt-8 bg-gradient-to-r from-emerald-50 to-emerald-50 dark:from-emerald-950 dark:to-emerald-950 rounded-lg p-8 text-center">
                        <p className="text-gray-700 dark:text-gray-300 mb-4">Interested in partnering with us?</p>
                        <Link href="/support" className="inline-block px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">
                            Get in Touch
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
