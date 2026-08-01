import { Head, Link } from '@inertiajs/react';

export default function Policy() {
    return (
        <>
            <Head title="Policy & Governance Framework - NYP-IP" />

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
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">Policy & Governance Framework</h1>

                    <div className="space-y-8">
                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Policy Objectives</h2>
                            <p className="text-gray-700 dark:text-gray-300 mb-4">
                                The governance framework establishes principles and mechanisms for:
                            </p>
                            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                                <li>Transparent and accountable decision-making</li>
                                <li>Equitable distribution of opportunities and resources</li>
                                <li>Protection of participants' rights and interests</li>
                                <li>Effective monitoring and evaluation</li>
                                <li>Compliance with national regulations and international best practices</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Key Policy Areas</h2>
                            <div className="space-y-4">
                                {[
                                    { title: 'Eligibility & Participation', desc: 'Criteria and processes for youth engagement and enterprise participation' },
                                    { title: 'Financing & Capital Management', desc: 'Rules governing fund disbursement, monitoring, and risk management' },
                                    { title: 'Dispute Resolution', desc: 'Mechanisms for addressing grievances and conflicts' },
                                    { title: 'Environmental & Social Standards', desc: 'Compliance requirements for sustainability and social responsibility' },
                                    { title: 'Data Protection & Privacy', desc: 'Safeguards for participant information and personal data' }
                                ].map((policy, idx) => (
                                    <div key={idx} className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                                        <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{policy.title}</h3>
                                        <p className="text-gray-700 dark:text-gray-300 text-sm">{policy.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Institutional Arrangements</h2>
                            <p className="text-gray-700 dark:text-gray-300 mb-4">
                                The program operates through a multi-layered governance structure involving:
                            </p>
                            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                                <li>National Steering Committee for strategic direction</li>
                                <li>Technical Implementation Teams at regional and sectoral levels</li>
                                <li>Monitoring and Evaluation Units</li>
                                <li>Stakeholder Engagement Forums</li>
                                <li>Independent Review and Oversight Bodies</li>
                            </ul>
                        </section>
                    </div>

                    <div className="mt-12 bg-gradient-to-r from-emerald-50 to-blue-50 dark:from-emerald-950 dark:to-blue-950 rounded-lg p-8 text-center">
                        <Link href="/documentation/whitepaper" className="inline-block px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">
                            Back to Whitepaper
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
