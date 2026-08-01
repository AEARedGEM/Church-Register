import { Head, Link } from '@inertiajs/react';

export default function Whitepaper() {
    return (
        <>
            <Head title="Project Whitepaper - NYP-IP" />

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
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Project Whitepaper</h1>
                    <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
                        Nigerian Youth Parliament Industrialization Programme (NYP-IP)
                    </p>

                    <div className="prose prose-lg dark:prose-invert max-w-none">
                        <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-900 rounded-lg p-6 mb-8">
                            <p className="text-blue-900 dark:text-blue-100 font-semibold">
                                This whitepaper outlines the strategic framework, objectives, implementation approach, and expected outcomes of the Nigerian Youth Parliament Industrialization Programme.
                            </p>
                        </div>

                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Executive Summary</h2>
                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                            The Nigerian Youth Parliament Industrialization Programme (NYP-IP) represents a comprehensive national initiative to catalyze industrial development, create employment opportunities, and empower youth economically across all regions of Nigeria. By combining institutional support, capital mobilization, skills development, and market linkages, the program creates a sustainable ecosystem for youth-led industrialization.
                        </p>

                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Strategic Pillars</h2>
                        <ol className="list-decimal list-inside space-y-2 text-gray-700 dark:text-gray-300 mb-4">
                            <li>Economic Empowerment through Industrialization</li>
                            <li>Skills Development and Capacity Building</li>
                            <li>Capital Mobilization and Financing</li>
                            <li>Market Development and Linkages</li>
                            <li>Institutional Coordination and Policy Alignment</li>
                        </ol>

                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Implementation Framework</h2>
                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                            The program is implemented through a coordinated approach involving:
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 mb-8">
                            <li>Regional industrial development hubs</li>
                            <li>Needs Assessment and Skills Training (NAP/S) programs</li>
                            <li>Digital financing mechanisms and tokenization</li>
                            <li>Strategic partnerships with government and private sector</li>
                            <li>Monitoring, evaluation, and learning systems</li>
                        </ul>

                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Expected Outcomes</h2>
                        <p className="text-gray-700 dark:text-gray-300">
                            By 2030, the NYP-IP aims to have directly engaged 10,000+ youth in industrialization activities, supported 5,000+ new enterprises, and facilitated the creation of 100,000+ jobs across sectors and regions. This will contribute to Nigeria's broader economic diversification and development goals.
                        </p>
                    </div>

                    <div className="mt-12 bg-gradient-to-r from-emerald-50 to-blue-50 dark:from-emerald-950 dark:to-blue-950 rounded-lg p-8">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Full Documentation</h3>
                        <p className="text-gray-700 dark:text-gray-300 mb-6">
                            Access the complete whitepaper and related documentation frameworks.
                        </p>
                        <div className="flex gap-4 flex-wrap">
                            <Link href="/documentation/policy" className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">
                                Policy Framework
                            </Link>
                            <Link href="/documentation/infrastructure" className="px-6 py-2 border border-emerald-600 text-emerald-600 dark:text-emerald-400 rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-950 transition-colors">
                                Technical Infrastructure
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
