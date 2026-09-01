import { Head, Link } from '@inertiajs/react';

export default function Zones() {
    const zones = [
        { name: 'North West', states: ['Kaduna', 'Katsina', 'Kebbi', 'Kano', 'Sokoto', 'Zamfara', 'Jigawa'] },
        { name: 'North East', states: ['Bauchi', 'Borno', 'Gombe', 'Adamawa', 'Taraba', 'Yobe'] },
        { name: 'North Central', states: ['Benue', 'Kogi', 'Kwara', 'Niger', 'Plateau', 'Nasarawa', 'FCT'] },
        { name: 'South West', states: ['Lagos', 'Ogun', 'Oyo', 'Osun', 'Ekiti', 'Ondo'] },
        { name: 'South East', states: ['Abia', 'Anambra', 'Ebonyi', 'Enugu', 'Imo'] },
        { name: 'South South', states: ['Akwa Ibom', 'Cross River', 'Delta', 'Edo', 'Bayelsa', 'Rivers'] }
    ];

    return (
        <>
            <Head title="Geopolitical Zones - NYP" />

            <div className="min-h-screen bg-white dark:bg-gray-900">
                <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
                    <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                        <Link href="/" className="text-2xl font-bold text-red-600 dark:text-red-400">
                            APGA Worldwide
                        </Link>
                        <Link href="/" className="text-gray-600 dark:text-gray-300 hover:text-red-600">
                            Back to Home
                        </Link>
                    </div>
                </nav>

                <div className="container mx-auto px-6 py-16 max-w-5xl">
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Geopolitical Zones</h1>
                    <p className="text-lg text-gray-600 dark:text-gray-400 mb-12">
                        The NYP maintains presence and representation across all six geopolitical zones of Nigeria.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                        {zones.map((zone, index) => (
                            <div key={index} className="bg-gradient-to-br from-red-50 to-red-50 dark:from-gray-800 dark:to-gray-900 rounded-lg p-6 border border-red-200 dark:border-red-900/30">
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{zone.name}</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">States:</p>
                                <div className="flex flex-wrap gap-2">
                                    {zone.states.map((state, idx) => (
                                        <span key={idx} className="bg-white dark:bg-gray-700 px-3 py-1 rounded-full text-sm text-gray-700 dark:text-gray-300 border border-red-200 dark:border-red-900/30">
                                            {state}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-8">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Regional Representation</h2>
                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                            Each geopolitical zone has dedicated representation within the NYP to ensure that youth voices from diverse regions are heard and integrated into our programs and initiatives.
                        </p>
                        <p className="text-gray-700 dark:text-gray-300">
                            Our zonal coordinators work closely with state-level youth organizations to facilitate participation, provide feedback channels, and ensure that program benefits reach young people across the country.
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
