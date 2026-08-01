import { Head, Link } from '@inertiajs/react';

export default function Program() {
    return (
        <>
            <Head title="Program Overview - NYP-IP" />

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
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">NYP-IP Program Overview</h1>

                    <div className="prose prose-lg dark:prose-invert max-w-none">
                        <p className="text-gray-700 dark:text-gray-300 mb-6">
                            The Nigerian Youth Parliament Industrialization Programme (NYP-IP) is a comprehensive national initiative designed to catalyze industrialization, accelerate youth economic empowerment, and drive sustainable development across Nigeria.
                        </p>

                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Program Objectives</h2>
                        <ul className="list-disc list-inside space-y-3 text-gray-700 dark:text-gray-300 mb-6">
                            <li>Establish sustainable industrial ecosystems across Nigeria's geopolitical zones</li>
                            <li>Create pathways for youth participation in value-added production and manufacturing</li>
                            <li>Mobilize capital and resources for youth-led enterprises and startups</li>
                            <li>Build institutional and human capacity for sustainable industrialization</li>
                            <li>Foster collaboration between youth entrepreneurs, government, and private sector</li>
                        </ul>

                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Program Components</h2>
                        <div className="space-y-4">
                            {[
                                { title: 'Industrial Development Hubs', desc: 'Establishing regional centers for innovation, manufacturing, and skills development.' },
                                { title: 'Needs Assessment Programme (NAP/S)', desc: 'Comprehensive skills identification and competency development across sectors.' },
                                { title: 'Tokenized Financing', desc: 'Access to capital through digital assets and stablecoin-based funding mechanisms.' },
                                { title: 'Training & Capacity Building', desc: 'Industry-specific skills training and entrepreneurship development programs.' }
                            ].map((component, idx) => (
                                <div key={idx} className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{component.title}</h3>
                                    <p className="text-gray-700 dark:text-gray-300 text-sm">{component.desc}</p>
                                </div>
                            ))}
                        </div>

                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Expected Outcomes</h2>
                        <ul className="list-disc list-inside space-y-3 text-gray-700 dark:text-gray-300">
                            <li>10,000+ youth engaged in industrialization activities annually</li>
                            <li>5,000+ new youth-led enterprises established</li>
                            <li>100,000+ jobs created across sectors</li>
                            <li>Significant increase in Nigeria's manufacturing output and exports</li>
                            <li>Reduced youth unemployment and improved economic participation</li>
                        </ul>
                    </div>

                    <div className="mt-12 bg-gradient-to-r from-emerald-50 to-blue-50 dark:from-emerald-950 dark:to-blue-950 rounded-lg p-8">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Ready to Participate?</h3>
                        <p className="text-gray-700 dark:text-gray-300 mb-6">
                            Learn more about our partner organizations and funding opportunities.
                        </p>
                        <div className="flex gap-4 flex-wrap">
                            <Link href="/partners" className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">
                                Strategic Partners
                            </Link>
                            <Link href="/funding" className="px-6 py-2 border border-emerald-600 text-emerald-600 dark:text-emerald-400 rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-950 transition-colors">
                                Funding Opportunities
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
