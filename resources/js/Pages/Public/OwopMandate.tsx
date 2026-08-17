import { Head, Link } from '@inertiajs/react';

export default function OwopMandate() {
    return (
        <>
            <Head title="OWOP & NAP/S Program - NYP-IP" />

            <div className="min-h-screen bg-white dark:bg-gray-900">
                <nav className="border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
                    <div className="container mx-auto flex items-center justify-between px-6 py-4">
                        <Link href="/" className="text-2xl font-bold text-red-600 dark:text-red-400">
                            NYP-IP
                        </Link>
                        <Link href="/" className="text-gray-600 transition-colors hover:text-red-600 dark:text-gray-300">
                            Back to Home
                        </Link>
                    </div>
                </nav>

                <div className="container mx-auto max-w-5xl px-6 py-16">
                    <div className="mb-10 rounded-2xl border border-red-200 bg-red-50 p-8 shadow-sm dark:border-red-800 dark:bg-red-950/40">
                        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-red-700 dark:text-red-300">
                            O.W.O.P & NAP/S Programme
                        </p>
                        <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
                            One Ward One Product and the Needs Assessment Poll/Survey
                        </h1>
                        <p className="max-w-3xl text-lg text-gray-700 dark:text-gray-300">
                            This page is dedicated to the O.W.O.P (One Ward One Product) and NAP/S (Needs Assessment Poll/Survey) programme. It brings together ward-level economic prioritisation and citizen feedback so communities can identify the products and needs that matter most.
                        </p>
                    </div>

                    <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
                        <div className="space-y-8">
                            <section className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-800/60">
                                <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">What this programme is about</h2>
                                <p className="text-gray-700 dark:text-gray-300">
                                    O.W.O.P helps each ward focus on a practical product or value-chain opportunity that matches its local assets, skills, and market potential. NAP/S complements this by collecting structured feedback from residents, stakeholders, and community leaders so planning is rooted in real needs.
                                </p>
                            </section>

                            <section className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-800/60">
                                <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">Why it matters</h2>
                                <ul className="list-disc space-y-2 pl-6 text-gray-700 dark:text-gray-300">
                                    <li>Promotes local economic development around ward-specific opportunities.</li>
                                    <li>Encourages residents to contribute to planning and policy decisions.</li>
                                    <li>Helps identify the most relevant products, services, and interventions.</li>
                                    <li>Supports better coordination between communities, partners, and programme implementers.</li>
                                </ul>
                            </section>
                        </div>

                        <div className="space-y-8">
                            <section className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-800/60">
                                <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">Programme focus areas</h2>
                                <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                                    <li><strong>Ward-based product prioritisation</strong> for economic growth and job creation.</li>
                                    <li><strong>Needs assessment</strong> through the NAP/S survey to capture public priorities.</li>
                                    <li><strong>Community engagement</strong> so local voices shape development outcomes.</li>
                                    <li><strong>Data-informed implementation</strong> that improves support and follow-up planning.</li>
                                </ul>
                            </section>

                            <section className="rounded-2xl border border-red-200 bg-red-50 p-8 shadow-sm dark:border-red-800 dark:bg-red-950/40">
                                <h2 className="mb-3 text-2xl font-bold text-gray-900 dark:text-white">Take the survey</h2>
                                <p className="mb-6 text-gray-700 dark:text-gray-300">
                                    Visit the NAP/S dashboard to participate in the survey and help shape the priorities for your ward and community.
                                </p>
                                <Link
                                    href={route('dashboard')}
                                    className="inline-flex items-center justify-center rounded-lg bg-red-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-red-700"
                                >
                                    Go to Main Dashboard
                                </Link>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
