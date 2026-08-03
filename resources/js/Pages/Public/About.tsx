import { Head, Link } from '@inertiajs/react';

export default function About() {
    return (
        <>
            <Head title="About NYP - Nigerian Youth Parliament" />

            <div className="min-h-screen bg-white dark:bg-gray-900">
                {/* Navigation */}
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

                {/* Content */}
                <div className="container mx-auto px-6 py-16 max-w-4xl">
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">About Nigerian Youth Parliament (NYP)</h1>

                    <div className="prose prose-lg dark:prose-invert max-w-none">
                        <p className="text-gray-700 dark:text-gray-300 mb-6">
                            The Nigerian Youth Parliament (NYP) is a dynamic, youth-led institution dedicated to amplifying the voices of young Nigerians and driving meaningful change across the nation. Since its establishment, NYP has served as a vital bridge between Nigeria's youth and key stakeholders in government, industry, and civil society.
                        </p>

                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Our Mission</h2>
                        <p className="text-gray-700 dark:text-gray-300 mb-6">
                            To empower Nigerian youth through inclusive dialogue, advocacy, and action toward sustainable development and national transformation.
                        </p>

                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Our Vision</h2>
                        <p className="text-gray-700 dark:text-gray-300 mb-6">
                            A Nigeria where youth are active participants in governance, economic development, and nation-building at all levels.
                        </p>

                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Core Values</h2>
                        <ul className="list-disc list-inside space-y-3 text-gray-700 dark:text-gray-300 mb-6">
                            <li><strong>Inclusivity:</strong> Representing diverse voices and perspectives across Nigeria</li>
                            <li><strong>Innovation:</strong> Driving creative solutions to youth-centric challenges</li>
                            <li><strong>Integrity:</strong> Operating with transparency and accountability</li>
                            <li><strong>Impact:</strong> Ensuring sustainable outcomes that benefit communities nationwide</li>
                        </ul>

                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Key Initiatives</h2>
                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                            The NYP operates multiple programs focused on youth empowerment, including:
                        </p>
                        <ul className="list-disc list-inside space-y-3 text-gray-700 dark:text-gray-300">
                            <li>Youth advocacy and representation in policy-making processes</li>
                            <li>Skills development and entrepreneurship training programs</li>
                            <li>Economic empowerment through funding and investment opportunities</li>
                            <li>Community engagement and social development projects</li>
                        </ul>
                    </div>

                    {/* CTA */}
                    <div className="mt-12 bg-gradient-to-r from-emerald-50 to-emerald-50 dark:from-emerald-950 dark:to-emerald-950 rounded-lg p-8 text-center">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Learn More About Our Work</h3>
                        <p className="text-gray-700 dark:text-gray-300 mb-6">
                            Explore our leadership, governance structure, and regional presence across Nigeria.
                        </p>
                        <div className="flex gap-4 justify-center flex-wrap">
                            <Link href="/leadership" className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">
                                Meet Our Leadership
                            </Link>
                            <Link href="/governance" className="px-6 py-2 border border-emerald-600 text-emerald-600 dark:text-emerald-400 rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-950 transition-colors">
                                Governance Structure
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
