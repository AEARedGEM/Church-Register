import { Head, Link } from '@inertiajs/react';

export default function Partners() {
    const partnerCategories = [
        {
            title: 'Ministry Partners',
            partners: ['Local pastors and church leaders', 'Community outreach teams', 'Interdenominational partners']
        },
        {
            title: 'Community Partners',
            partners: ['Schools and youth groups', 'Local welfare organizations', 'Volunteer community networks']
        },
        {
            title: 'Support Partners',
            partners: ['Mission supporters', 'Care and welfare sponsors', 'Resource and service partners']
        }
    ];

    return (
        <>
            <Head title="Church Partners - APGA Worldwide" />

            <div className="min-h-screen bg-slate-950 text-slate-100">
                <nav className="border-b border-red-800/70 bg-slate-950/95 backdrop-blur-sm">
                    <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                        <Link href="/" className="text-2xl font-bold text-red-400">APGA Worldwide</Link>
                        <Link href="/" className="text-red-200 transition hover:text-white">Back to Home</Link>
                    </div>
                </nav>

                <div className="container mx-auto px-6 py-16 max-w-4xl">
                    <h1 className="mb-4 text-4xl font-bold text-white">Church Partners</h1>
                    <p className="mb-12 text-lg text-slate-300">
                        We value partnerships that help the church worship faithfully, grow spiritually, and serve communities with compassion and practical love.
                    </p>

                    <div className="mb-12 space-y-8">
                        {partnerCategories.map((category, idx) => (
                            <div key={idx}>
                                <h2 className="mb-4 text-2xl font-bold text-white">{category.title}</h2>
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    {category.partners.map((partner, pidx) => (
                                        <div key={pidx} className="rounded-lg border border-red-800/70 bg-gradient-to-br from-red-900/20 to-slate-900 p-6">
                                            <p className="font-semibold text-white">{partner}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="rounded-lg border border-red-800/70 bg-slate-900/80 p-8">
                        <h2 className="mb-4 text-2xl font-bold text-white">Partnership opportunities</h2>
                        <p className="mb-4 text-slate-300">
                            We welcome partnerships with individuals, churches, and organizations committed to gospel-centered impact, compassion, and community transformation.
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-slate-300">
                            <li>Ministry support and discipleship investment</li>
                            <li>Community outreach and welfare initiatives</li>
                            <li>Events, prayer gatherings, and spiritual engagement</li>
                            <li>Volunteer support and practical service</li>
                        </ul>
                    </div>

                    <div className="mt-8 rounded-lg border border-red-800/70 bg-gradient-to-r from-red-900/20 to-slate-900 p-8 text-center">
                        <p className="mb-4 text-slate-300">Interested in partnering with the church?</p>
                        <Link href="/support" className="inline-block rounded-lg bg-red-600 px-6 py-2 font-semibold text-white transition hover:bg-red-500">
                            Get in touch
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
