import { Head, Link } from '@inertiajs/react';

export default function Impact() {
    const impactMetrics = [
        { metric: '10,000+', desc: 'Youth Engaged' },
        { metric: '5,000+', desc: 'Enterprises Established' },
        { metric: '100,000+', desc: 'Jobs Created' },
        { metric: 'Billions', desc: 'Capital Mobilized' }
    ];

    return (
        <>
            <Head title="Impact & Results - NYP-IP" />

            <div className="min-h-screen bg-white dark:bg-gray-900">
                <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
                    <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                        <Link href="/" className="text-2xl font-bold text-red-600 dark:text-red-400">
                            NYP-IP
                        </Link>
                        <Link href="/" className="text-gray-600 dark:text-gray-300 hover:text-red-600">
                            Back to Home
                        </Link>
                    </div>
                </nav>

                <div className="container mx-auto px-6 py-16 max-w-4xl">
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">Our Impact & Results</h1>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
                        {impactMetrics.map((item, idx) => (
                            <div key={idx} className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950 dark:to-red-900 rounded-lg p-6 text-center border border-red-200 dark:border-red-900/50">
                                <p className="text-2xl md:text-3xl font-bold text-red-600 dark:text-red-400 mb-2">{item.metric}</p>
                                <p className="text-sm text-red-800 dark:text-red-200">{item.desc}</p>
                            </div>
                        ))}
                    </div>

                    <div className="space-y-8">
                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Program Achievements</h2>
                            <div className="space-y-4">
                                {[
                                    { title: 'Youth Skills Development', desc: 'Thousands of youth trained in technical and vocational skills across multiple sectors' },
                                    { title: 'Enterprise Creation', desc: 'Over 5,000 youth-led enterprises established and operating successfully' },
                                    { title: 'Market Access', desc: 'Direct linkages created between youth producers and domestic/regional markets' },
                                    { title: 'Capital Mobilization', desc: 'Billions in funding channeled to youth-led businesses and startups' },
                                    { title: 'Regional Expansion', desc: 'Industrial hubs established across all six geopolitical zones' },
                                    { title: 'Policy Influence', desc: 'Youth voices integrated into government industrialization strategies' }
                                ].map((achievement, idx) => (
                                    <div key={idx} className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                                        <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{achievement.title}</h3>
                                        <p className="text-gray-700 dark:text-gray-300 text-sm">{achievement.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Transformational Outcomes</h2>
                            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                                <li>Reduced youth unemployment and underemployment</li>
                                <li>Increased household incomes and wealth creation</li>
                                <li>Enhanced social stability and national security</li>
                                <li>Diversified economic base through industrial growth</li>
                                <li>Sustainable and inclusive economic development</li>
                            </ul>
                        </section>
                    </div>

                    <div className="mt-12 bg-gradient-to-r from-red-50 to-red-50 dark:from-red-950 dark:to-red-950 rounded-lg p-8 text-center">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Be Part of the Story</h3>
                        <p className="text-gray-700 dark:text-gray-300 mb-6">
                            Join thousands of youth transforming Nigeria's economy through industrialization and innovation.
                        </p>
                        <Link href="/program" className="inline-block px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                            Learn More About the Program
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
