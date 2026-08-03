import { Head, Link } from '@inertiajs/react';

export default function Ecosystem() {
    const ecosystemElements = [
        { title: 'Industrial Hubs', desc: 'Regional centers for innovation, manufacturing, and skills transfer' },
        { title: 'Support Services', desc: 'Business development, mentoring, and technical assistance' },
        { title: 'Market Linkages', desc: 'Connections to domestic and international markets' },
        { title: 'Technology & Infrastructure', desc: 'Access to modern equipment, digital tools, and facilities' },
        { title: 'Financing Mechanisms', desc: 'Multiple pathways to capital and financial services' },
        { title: 'Training Programs', desc: 'Skills development aligned with industry demands' }
    ];

    return (
        <>
            <Head title="Industrialization Ecosystem - NYP-IP" />

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
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">Industrialization Ecosystem</h1>

                    <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
                        <p className="text-gray-700 dark:text-gray-300">
                            The NYP-IP has developed a comprehensive ecosystem designed to support youth-led industrialization efforts, combining infrastructure, services, and market opportunities.
                        </p>
                    </div>

                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Ecosystem Components</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                        {ecosystemElements.map((element, idx) => (
                            <div key={idx} className="bg-gradient-to-br from-emerald-50 to-emerald-50 dark:from-gray-800 dark:to-gray-900 rounded-lg p-6 border border-emerald-200 dark:border-emerald-900/30">
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{element.title}</h3>
                                <p className="text-gray-700 dark:text-gray-300 text-sm">{element.desc}</p>
                            </div>
                        ))}
                    </div>

                    <section className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-8 mb-12">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Key Features</h2>
                        <ul className="list-disc list-inside space-y-3 text-gray-700 dark:text-gray-300">
                            <li><strong>Integrated Design:</strong> All ecosystem components work together to maximize youth success</li>
                            <li><strong>Market-Driven:</strong> Aligned with real market demands and industry needs</li>
                            <li><strong>Scalable:</strong> Expandable across regions and sectors</li>
                            <li><strong>Inclusive:</strong> Accessible to youth from diverse backgrounds and experience levels</li>
                            <li><strong>Sustainable:</strong> Built on principles of long-term viability and community benefit</li>
                        </ul>
                    </section>

                    <div className="bg-gradient-to-r from-emerald-50 to-emerald-50 dark:from-emerald-950 dark:to-emerald-950 rounded-lg p-8">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Explore More</h3>
                        <div className="flex gap-4 flex-wrap">
                            <Link href="/program" className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">
                                Program Overview
                            </Link>
                            <Link href="/impact" className="px-6 py-2 border border-emerald-600 text-emerald-600 dark:text-emerald-400 rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-950 transition-colors">
                                See Our Impact
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
