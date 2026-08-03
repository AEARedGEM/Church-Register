import { Head, Link } from '@inertiajs/react';

export default function Leadership() {
    const leaders = [
        {
            role: 'Speaker, Nigerian Youth Parliament',
            name: 'Rt. Hon. Aliyu Idris Zakari',
            bio: 'Visionary leader driving youth representation and nation-building initiatives.'
        },
        {
            role: 'Deputy Speaker',
            name: 'TBD',
            bio: 'Supporting the Speaker in parliamentary functions and member engagement.'
        },
        {
            role: 'Director, NYP-IP Program',
            name: 'TBD',
            bio: 'Leading the industrialization program with strategic focus on youth economic empowerment.'
        },
        {
            role: 'Head of Operations',
            name: 'TBD',
            bio: 'Overseeing day-to-day operations and program implementation across all zones.'
        }
    ];

    return (
        <>
            <Head title="Leadership - NYP" />

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
                <div className="container mx-auto px-6 py-16 max-w-5xl">
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">NYP Leadership</h1>
                    <p className="text-lg text-gray-600 dark:text-gray-400 mb-12">
                        Meet the dedicated leaders driving the Nigerian Youth Parliament's vision for youth empowerment and nation-building.
                    </p>

                    {/* Leadership Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                        {leaders.map((leader, index) => (
                            <div key={index} className="bg-gradient-to-br from-emerald-50 to-emerald-50 dark:from-gray-800 dark:to-gray-900 rounded-lg p-8 border border-emerald-200 dark:border-emerald-900/30">
                                <div className="text-emerald-600 dark:text-emerald-400 font-semibold text-sm mb-2">{leader.role}</div>
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">{leader.name}</h3>
                                <p className="text-gray-700 dark:text-gray-300">{leader.bio}</p>
                            </div>
                        ))}
                    </div>

                    {/* Leadership Message */}
                    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-8 mb-12">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Our Leadership Commitment</h2>
                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                            The leadership of the Nigerian Youth Parliament is committed to creating an inclusive, innovative, and impactful platform where every young Nigerian voice matters. We believe in:
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                            <li>Transparent and accountable governance</li>
                            <li>Youth representation across all sectors and regions</li>
                            <li>Sustainable development and economic empowerment</li>
                            <li>Collaborative partnerships with government and private sector</li>
                        </ul>
                    </div>

                    {/* Explore More */}
                    <div className="bg-gradient-to-r from-emerald-50 to-emerald-50 dark:from-emerald-950 dark:to-emerald-950 rounded-lg p-8 text-center">
                        <Link href="/governance" className="inline-block px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">
                            View Governance Structure
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
