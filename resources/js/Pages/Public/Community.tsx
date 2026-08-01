import { Head, Link } from '@inertiajs/react';

export default function Community() {
    return (
        <>
            <Head title="Community Hub - NYP-IP" />
            <div className="min-h-screen bg-white dark:bg-gray-900">
                <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
                    <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                        <Link href="/" className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">NYP-IP</Link>
                        <Link href="/" className="text-gray-600 dark:text-gray-300 hover:text-emerald-600">Back to Home</Link>
                    </div>
                </nav>
                <div className="container mx-auto px-6 py-16 max-w-4xl">
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">Community Hub</h1>
                    <div className="space-y-6">
                        <section className="text-gray-700 dark:text-gray-300">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Connect with Other Participants</h2>
                            <p className="mb-4">Join a vibrant community of young entrepreneurs, innovators, and changemakers across Nigeria.</p>
                            <ul className="list-disc list-inside space-y-2">
                                <li>Networking Events and Forums</li>
                                <li>Peer Learning and Mentorship Groups</li>
                                <li>Success Stories and Case Studies</li>
                                <li>Community Projects and Initiatives</li>
                            </ul>
                        </section>
                        <section className="text-gray-700 dark:text-gray-300">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Engagement Opportunities</h2>
                            <p>Share your experiences, learn from others, and collaborate on impactful projects.</p>
                        </section>
                    </div>
                    <div className="mt-12 text-center">
                        <Link href="/" className="inline-block px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">
                            Back to Home
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
