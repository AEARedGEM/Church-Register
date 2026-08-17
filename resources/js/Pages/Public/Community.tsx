import { Head, Link } from '@inertiajs/react';

export default function Community() {
    return (
        <>
            <Head title="Community Hub - NYP-IP" />
            <div className="min-h-screen bg-white dark:bg-gray-900">
                <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
                    <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                        <Link href="/" className="text-2xl font-bold text-red-600 dark:text-red-400">NYP-IP</Link>
                        <Link href="/" className="text-gray-600 dark:text-gray-300 hover:text-red-600">Back to Home</Link>
                    </div>
                </nav>
                <div className="container mx-auto px-6 py-16 max-w-5xl">
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">Community Hub</h1>
                    <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
                        <article className="space-y-8 text-gray-700 dark:text-gray-300">
                            <section>
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">A network for collaboration, mentorship and shared opportunity</h2>
                                <p className="mb-4">The NYP-IP Community Hub connects youth entrepreneurs, innovators, partners and state networks so that growth happens together. The hub supports project teams, partner-led applications, mentorship groups and local industrial squads, not solo submissions.</p>
                                <ul className="list-disc list-inside space-y-3">
                                    <li>State and LGA partner networks for coordinated project discovery</li>
                                    <li>Mentorship from industry leaders, incubators and financing partners</li>
                                    <li>Community-led innovation squads, peer learning circles and pitch forums</li>
                                    <li>Visibility for startups, SMEs and industrial clusters across the 36 states + FCT</li>
                                </ul>
                            </section>

                            <section>
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">How community links to tokenization</h3>
                                <p className="mb-4">Community participation is the bridge between local demand signals and tokenization opportunities. The strongest startup and TradeFi candidates are identified through ward, LGA and state-level collaboration, then formalized with partners before capital is deployed.</p>
                                <div className="space-y-3">
                                    <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-5">
                                        <h4 className="font-semibold text-gray-900 dark:text-white">Partner-led applications</h4>
                                        <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">An individual cannot submit an application on their own. All proposals are advanced through community or partner networks, state platforms, and formal joint teams.</p>
                                    </div>
                                    <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-5">
                                        <h4 className="font-semibold text-gray-900 dark:text-white">Local project focus</h4>
                                        <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">Projects are grouped by state, LGA and ward, ensuring that financing and tokenization target the right local production and export potential.</p>
                                    </div>
                                </div>
                            </section>
                        </article>

                        <aside className="space-y-6 rounded-3xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-700 dark:bg-gray-950">
                            <div>
                                <p className="text-xs uppercase tracking-[0.25em] text-red-500">Community First</p>
                                <h2 className="mt-3 text-3xl font-semibold text-gray-900 dark:text-white">Build with peers and partners</h2>
                            </div>
                            <div className="space-y-4 text-sm text-gray-600 dark:text-gray-300">
                                <p>The hub offers partnership pathways, mentorship, and shared access to tokenization-ready financing for networks, startups and growth-oriented businesses.</p>
                                <p className="font-semibold text-gray-900 dark:text-white">Insight topics include:</p>
                                <ul className="list-disc list-inside space-y-2">
                                    <li>Community projects, cluster development and local industrialization</li>
                                    <li>Mentorship, pitch support and partner alignment</li>
                                    <li>Startup discovery, capacity building and market readiness</li>
                                </ul>
                            </div>
                            <div className="rounded-3xl border border-red-200 bg-red-50 p-5 dark:border-red-700 dark:bg-red-950/60">
                                <p className="text-sm uppercase tracking-[0.2em] text-red-700 dark:text-red-300">Join the movement</p>
                                <p className="mt-3 text-sm text-gray-700 dark:text-gray-300">Connect with the NYP-IP community and discover how your network can access startup and TradeFi tokenization.</p>
                            </div>
                            <Link href="/funding" className="inline-block w-full rounded-xl bg-red-600 px-5 py-3 text-center text-sm font-semibold text-white hover:bg-red-700 transition-colors">Explore Funding & Tokenization</Link>
                            <Link href="/" className="inline-block w-full rounded-xl border border-slate-200 px-5 py-3 text-center text-sm font-semibold text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800 transition-colors">Back to NYP-IP Home</Link>
                        </aside>
                    </div>
                </div>
            </div>
        </>
    );
}
