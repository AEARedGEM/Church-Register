import { Head, Link } from '@inertiajs/react';

export default function OwopMandate() {
    return (
        <>
            <Head title="O.W.O.P Mandate - NYP-IP" />

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
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">O.W.O.P Mandate</h1>

                    <div className="prose prose-lg dark:prose-invert max-w-none space-y-6">
                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Overview</h2>
                            <p className="text-gray-700 dark:text-gray-300">
                                The O.W.O.P (One Woman, One Produce) Mandate is a key initiative of the Nigerian Youth Parliament Industrialization Programme, designed to support youth-led agricultural and manufacturing enterprises with focus on value addition and market linkages.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Program Objectives</h2>
                            <ul className="list-disc list-inside space-y-3 text-gray-700 dark:text-gray-300">
                                <li>Empower individual youth producers to develop specialty products</li>
                                <li>Support production standardization and quality assurance</li>
                                <li>Create market access and distribution pathways</li>
                                <li>Build brand value and recognition for youth-produced goods</li>
                                <li>Generate sustainable income and employment opportunities</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Supported Sectors</h2>
                            <div className="space-y-2 text-gray-700 dark:text-gray-300">
                                <p><strong>Agricultural Products:</strong> Processed foods, beverages, spices, and specialty crops</p>
                                <p><strong>Manufacturing:</strong> Textiles, crafts, artisanal products, and light manufacturing</p>
                                <p><strong>Value Addition:</strong> Processing, packaging, and branding services</p>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Key Support Services</h2>
                            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                                <li>Production guidance and technical support</li>
                                <li>Quality certification assistance</li>
                                <li>Packaging and branding support</li>
                                <li>Market linkage facilitation</li>
                                <li>Financial support and working capital</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Participation Benefits</h2>
                            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                                <li>Access to quality assurance and certification programs</li>
                                <li>Connection to regional and national markets</li>
                                <li>Business development and entrepreneurship training</li>
                                <li>Financing support for production equipment and working capital</li>
                                <li>Community recognition and brand building</li>
                            </ul>
                        </section>
                    </div>

                    <div className="mt-12 bg-gradient-to-r from-emerald-50 to-blue-50 dark:from-emerald-950 dark:to-blue-950 rounded-lg p-8 text-center">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Ready to Participate?</h3>
                        <p className="text-gray-700 dark:text-gray-300 mb-6">
                            Contact our support team to learn more about O.W.O.P opportunities in your region.
                        </p>
                        <a href="/support" target="_blank" rel="noopener noreferrer" className="inline-block px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">
                            Contact Support
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
}
