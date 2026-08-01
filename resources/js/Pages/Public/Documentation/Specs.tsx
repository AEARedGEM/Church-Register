import { Head, Link } from '@inertiajs/react';

const specs = [
    'Tokenization standards and smart contract design',
    'Stablecoin architecture and wallet security',
    'Real-time reporting and data integrity controls',
    'Interoperability and integration support for partners',
];

const otherFrameworks = [
    { title: 'Project Whitepaper', href: '/downloads/whitepaper-framework.pdf' },
    { title: 'Policy & Governance', href: '/downloads/policy-framework.pdf' },
    { title: 'Funding & Engineering', href: '/downloads/funding-framework.pdf' },
    { title: 'Infrastructure & Technology', href: '/downloads/infrastructure-framework.pdf' },
];

export default function Specs() {
    return (
        <>
            <Head title="Technical Specifications - NYP-IP" />

            <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900">
                <nav className="border-b border-emerald-100 bg-white/80 backdrop-blur dark:border-gray-800 dark:bg-gray-900/80">
                    <div className="container mx-auto flex items-center justify-between px-6 py-4">
                        <Link href="/" className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">NYP-IP</Link>
                        <Link href="/" className="text-gray-600 transition-colors hover:text-emerald-600 dark:text-gray-300">Back to Home</Link>
                    </div>
                </nav>

                <main className="container mx-auto max-w-6xl px-6 py-12 lg:py-16">
                    <div className="flex flex-col gap-8 rounded-3xl border border-emerald-100 bg-white/90 p-8 shadow-lg shadow-emerald-100/60 dark:border-gray-800 dark:bg-gray-900/80 lg:flex-row lg:items-start lg:justify-between">
                        <div className="max-w-3xl">
                            <span className="inline-flex rounded-full border border-emerald-200 bg-emerald-100 px-3 py-1 text-sm font-semibold text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                                Framework 05
                            </span>
                            <h1 className="mt-4 text-4xl font-bold text-gray-900 dark:text-white">Technical Specifications</h1>
                            <p className="mt-4 text-lg leading-8 text-gray-700 dark:text-gray-300">
                                The technical specification framework equips partners with guidance for implementation, integration, and secure digital operations.
                            </p>
                        </div>

                        <a
                            href="/downloads/specs-framework.pdf"
                            download
                            className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-6 py-3 font-semibold text-white transition hover:bg-emerald-700"
                        >
                            Download PDF
                        </a>
                    </div>

                    <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_0.95fr]">
                        <section className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Standards and controls</h2>
                            <p className="mt-4 text-sm leading-7 text-gray-700 dark:text-gray-300">
                                These specifications provide the technical baseline for system design, reporting, and secure collaboration across the programme ecosystem.
                            </p>
                        </section>

                        <section className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">What is included</h2>
                            <ul className="mt-4 space-y-3 text-sm leading-6 text-gray-700 dark:text-gray-300">
                                {specs.map((item) => (
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
