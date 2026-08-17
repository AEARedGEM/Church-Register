import { Head, Link } from '@inertiajs/react';

export default function Mission() {
    return (
        <>
            <Head title="Mission & Vision - NYP" />

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
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-12">Our Mission & Vision</h1>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                        <div className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950 dark:to-red-900 rounded-lg p-8 border border-red-200 dark:border-red-900/50">
                            <h2 className="text-2xl font-bold text-red-900 dark:text-red-100 mb-4">Our Mission</h2>
                            <p className="text-red-800 dark:text-red-200 text-lg">
                                To empower Nigerian youth through inclusive dialogue, advocacy, and action toward sustainable development and national transformation.
                            </p>
                        </div>

                        <div className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950 dark:to-red-900 rounded-lg p-8 border border-red-200 dark:border-red-900/50">
                            <h2 className="text-2xl font-bold text-red-900 dark:text-red-100 mb-4">Our Vision</h2>
                            <p className="text-red-800 dark:text-red-200 text-lg">
                                A Nigeria where youth are active participants in governance, economic development, and nation-building at all levels.
                            </p>
                        </div>
                    </div>

                    <div className="space-y-8">
                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Strategic Pillars</h2>
                            <div className="space-y-4">
                                {[
                                    { title: 'Economic Empowerment', desc: 'Creating pathways for youth economic participation through funding, entrepreneurship, and industrialization initiatives.' },
                                    { title: 'Skills Development', desc: 'Building capabilities in technical, vocational, and professional areas to prepare youth for the modern economy.' },
                                    { title: 'Youth Advocacy', desc: 'Amplifying youth voices in policy-making and governance processes at all levels.' },
                                    { title: 'Community Development', desc: 'Supporting grassroots initiatives that drive social and environmental progress.' }
                                ].map((pillar, index) => (
                                    <div key={index} className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{pillar.title}</h3>
                                        <p className="text-gray-700 dark:text-gray-300">{pillar.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Our Commitment</h2>
                            <p className="text-gray-700 dark:text-gray-300 mb-4">
                                The NYP is committed to creating an ecosystem where every young Nigerian can discover their potential, access opportunities, and contribute meaningfully to nation-building. We believe in:
                            </p>
                            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                                <li>Inclusive and equitable access to opportunities for all youth</li>
                                <li>Transparent and accountable operations</li>
                                <li>Sustainable impact that extends beyond immediate outcomes</li>
                                <li>Collaboration with government, private sector, and civil society</li>
                                <li>Continuous innovation and adaptation to emerging challenges</li>
                            </ul>
                        </section>
                    </div>
                </div>
            </div>
        </>
    );
}
