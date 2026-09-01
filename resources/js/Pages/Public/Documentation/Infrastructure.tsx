import { Head, Link } from '@inertiajs/react';

const infrastructurePoints = [
    'Digital registration, funding, and learning systems',
    'Regional industrial hubs and training centres',
    'Secure payment and wallet infrastructure',
    'Real-time monitoring and reporting tools',
];

const otherFrameworks = [
    { title: 'Project Whitepaper', href: '/downloads/whitepaper-framework.pdf' },
    { title: 'Policy & Governance', href: '/downloads/policy-framework.pdf' },
    { title: 'Funding & Engineering', href: '/downloads/funding-framework.pdf' },
    { title: 'Technical Specifications', href: '/downloads/specs-framework.pdf' },
];

export default function Infrastructure() {
    return (
        <>
            <Head title="Infrastructure & Technology Framework - APGA Worldwide" />

            <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900">
                <nav className="border-b border-red-100 bg-white/80 backdrop-blur dark:border-gray-800 dark:bg-gray-900/80">
                    <div className="container mx-auto flex items-center justify-between px-6 py-4">
                        <Link href="/" className="text-2xl font-bold text-red-600 dark:text-red-400">APGA Worldwide</Link>
                        <Link href="/" className="text-gray-600 transition-colors hover:text-red-600 dark:text-gray-300">Back to Home</Link>
                    </div>
                </nav>

                <main className="container mx-auto max-w-6xl px-6 py-12 lg:py-16">
                    <div className="flex flex-col gap-8 rounded-3xl border border-red-100 bg-white/90 p-8 shadow-lg shadow-red-100/60 dark:border-gray-800 dark:bg-gray-900/80 lg:flex-row lg:items-start lg:justify-between">
                        <div className="max-w-3xl">
                            <span className="inline-flex rounded-full border border-red-200 bg-red-100 px-3 py-1 text-sm font-semibold text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-300">
                                Framework 04
                            </span>
                            <h1 className="mt-4 text-4xl font-bold text-gray-900 dark:text-white">Infrastructure & Technology</h1>
                            <p className="mt-4 text-lg leading-8 text-gray-700 dark:text-gray-300">
                                The programme relies on resilient digital and physical infrastructure to support delivery, visibility, and growth.
                            </p>
                        </div>

                        <a
                            href="/downloads/infrastructure-framework.pdf"
                            download
                            className="inline-flex items-center justify-center rounded-full bg-red-600 px-6 py-3 font-semibold text-white transition hover:bg-red-700"
                        >
                            Download PDF
                        </a>
                    </div>

                    <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_0.95fr]">
                        <section className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Technology and systems</h2>
                            <p className="mt-4 text-sm leading-7 text-gray-700 dark:text-gray-300">
                                Secure digital tools, cloud-based operations, and connected field systems make the platform practical for partners, programme teams, and beneficiaries.
                            </p>
                        </section>

                        <section className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Core infrastructure pillars</h2>
                            <ul className="mt-4 space-y-3 text-sm leading-6 text-gray-700 dark:text-gray-300">
                                {infrastructurePoints.map((item) => (
                                    <li key={item} className="rounded-2xl border border-gray-200 bg-gray-50 p-3 dark:border-gray-700 dark:bg-gray-800">{item}</li>
                                ))}
                            </ul>
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
                                    className="rounded-full border border-red-200 px-4 py-2 text-sm font-medium text-red-700 transition hover:bg-red-50 dark:border-red-800 dark:text-red-300 dark:hover:bg-red-950"
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
