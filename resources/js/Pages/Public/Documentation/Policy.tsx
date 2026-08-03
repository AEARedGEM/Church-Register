import { Head, Link } from '@inertiajs/react';

const policyAreas = [
    { title: 'Eligibility & Participation', desc: 'Clear rules for youth engagement, enterprise entry, and fair access.' },
    { title: 'Financing & Capital Management', desc: 'Governance for fund release, oversight, and risk controls.' },
    { title: 'Dispute Resolution', desc: 'Structured channels for grievance handling and conflict settlement.' },
    { title: 'Environmental & Social Standards', desc: 'Guidelines for sustainability, compliance, and social impact.' },
    { title: 'Data Protection & Privacy', desc: 'Safeguards for participant data and secure digital operations.' },
];

const otherFrameworks = [
    { title: 'Project Whitepaper', href: '/downloads/whitepaper-framework.pdf' },
    { title: 'Funding & Engineering', href: '/downloads/funding-framework.pdf' },
    { title: 'Infrastructure & Technology', href: '/downloads/infrastructure-framework.pdf' },
    { title: 'Technical Specifications', href: '/downloads/specs-framework.pdf' },
];

export default function Policy() {
    return (
        <>
            <Head title="Policy & Governance Framework - NYP-IP" />

            <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900">
                <nav className="border-b border-emerald-100 bg-white/80 backdrop-blur dark:border-gray-800 dark:bg-gray-900/80">
                    <div className="container mx-auto flex items-center justify-between px-6 py-4">
                        <Link href="/" className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                            NYP-IP
                        </Link>
                        <Link href="/" className="text-gray-600 transition-colors hover:text-emerald-600 dark:text-gray-300">
                            Back to Home
                        </Link>
                    </div>
                </nav>

                <main className="container mx-auto max-w-6xl px-6 py-12 lg:py-16">
                    <div className="flex flex-col gap-8 rounded-3xl border border-emerald-100 bg-white/90 p-8 shadow-lg shadow-emerald-100/60 dark:border-gray-800 dark:bg-gray-900/80 lg:flex-row lg:items-start lg:justify-between">
                        <div className="max-w-3xl">
                            <span className="inline-flex rounded-full border border-emerald-200 bg-emerald-100 px-3 py-1 text-sm font-semibold text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                                Framework 02
                            </span>
                            <h1 className="mt-4 text-4xl font-bold text-gray-900 dark:text-white">Policy & Governance Framework</h1>
                            <p className="mt-4 text-lg leading-8 text-gray-700 dark:text-gray-300">
                                This framework creates a transparent and accountable foundation for decision-making, compliance, and inclusive programme delivery.
                            </p>
                        </div>

                        <a
                            href="/downloads/policy-framework.pdf"
                            download
                            className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-6 py-3 font-semibold text-white transition hover:bg-emerald-700"
                        >
                            Download PDF
                        </a>
                    </div>

                    <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
                        <section className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Policy objectives</h2>
                            <ul className="mt-4 space-y-3 text-sm leading-6 text-gray-700 dark:text-gray-300">
                                <li>• Transparent and accountable leadership</li>
                                <li>• Fair access to opportunities and resources</li>
                                <li>• Protection of participant rights and institutional integrity</li>
                                <li>• Strong monitoring, reporting, and continuous improvement</li>
                            </ul>
                        </section>

                        <section className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Key policy areas</h2>
                            <div className="mt-4 space-y-3">
                                {policyAreas.map((item) => (
                                    <div key={item.title} className="rounded-2xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800">
                                        <h3 className="font-semibold text-gray-900 dark:text-white">{item.title}</h3>
                                        <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">{item.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    <section className="mt-8 rounded-3xl border border-gray-200 bg-white p-8 text-center shadow-sm dark:border-gray-800 dark:bg-gray-900">
                        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Download other frameworks</h2>
                        <div className="mt-6 flex flex-wrap justify-center gap-3">
                            {otherFrameworks.map((item) => (
                                <a
                                    key={item.title}
                                    href={item.href}
                                    download
                                    className="rounded-full border border-emerald-200 px-4 py-2 text-sm font-medium text-emerald-700 transition hover:bg-emerald-50 dark:border-emerald-800 dark:text-emerald-300 dark:hover:bg-emerald-950"
                                >
                                    {item.title}
                                </a>
                            ))}
                        </div>
                    </section>
                </main>
            </div>
        </>
    );
}
