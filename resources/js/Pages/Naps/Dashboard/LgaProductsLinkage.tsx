import React, { useState, useEffect } from 'react';
import napsApi from '@/services/napsApi';

interface LgaProduct {
    lga_id: number;
    lga_name: string;
    state_name: string;
    total_wards: number;
    total_respondents: number;
    top_products: Array<{ name: string; votes: number }>;
}

interface StateData {
    name: string;
    lgaCount: number;
    totalRespondents: number;
    totalWards: number;
    lgaProducts: LgaProduct[];
}

export default function LgaProductsLinkage() {
    const [lgaProducts, setLgaProducts] = useState<LgaProduct[]>([]);
    const [selectedState, setSelectedState] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        loadLgaProducts();
    }, []);

    const loadLgaProducts = async () => {
        try {
            setLoading(true);
            const response = await napsApi.getLgaProductsLinkage();
            if (response.success) {
                setLgaProducts(response.data);
            }
        } catch (err: any) {
            setError(err.message || 'Failed to load LGA products data');
        } finally {
            setLoading(false);
        }
    };

    // Group by state
    const statesList = [...new Set(lgaProducts.map(item => item.state_name))].sort();
    const statesData: StateData[] = statesList.map(stateName => {
        const lgas = lgaProducts.filter(item => item.state_name === stateName);
        return {
            name: stateName,
            lgaCount: lgas.length,
            totalRespondents: lgas.reduce((sum, item) => sum + item.total_respondents, 0),
            totalWards: lgas.reduce((sum, item) => sum + item.total_wards, 0),
            lgaProducts: lgas
        };
    });

    // Get selected state data
    const selectedStateData = selectedState ? statesData.find(s => s.name === selectedState) : null;

    // Filter LGAs in selected state
    const filteredLgasInState = selectedStateData?.lgaProducts.filter(lga =>
        lga.lga_name.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

    if (loading) {
        return <div className="p-8 text-center text-gray-600">Loading LGA products data...</div>;
    }

    if (error) {
        return <div className="p-8 text-center text-red-600">{error}</div>;
    }

    return (
        <div className="space-y-6">
            {/* Global Stats Overview */}
            {!selectedState && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-emerald-300 dark:hover:border-emerald-600 transition-all">
                        <p className="text-emerald-700 dark:text-emerald-400 text-xs font-medium">Total LGAs</p>
                        <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{lgaProducts.length}</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-emerald-300 dark:hover:border-emerald-600 transition-all">
                        <p className="text-emerald-700 dark:text-emerald-400 text-xs font-medium">Total Respondents</p>
                        <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                            {lgaProducts.reduce((sum, item) => sum + item.total_respondents, 0).toLocaleString()}
                        </p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-emerald-300 dark:hover:border-emerald-600 transition-all">
                        <p className="text-emerald-700 dark:text-emerald-400 text-xs font-medium">Total Wards</p>
                        <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                            {lgaProducts.reduce((sum, item) => sum + item.total_wards, 0).toLocaleString()}
                        </p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-emerald-300 dark:hover:border-emerald-600 transition-all">
                        <p className="text-emerald-700 dark:text-emerald-400 text-xs font-medium">Unique Products</p>
                        <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                            {new Set(lgaProducts.flatMap(item => item.top_products.map(p => p.name))).size}
                        </p>
                    </div>
                </div>
            )}

            {/* State Stats Overview (when state selected) */}
            {selectedStateData && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-lg border border-emerald-200 dark:border-emerald-800">
                        <p className="text-emerald-600 dark:text-emerald-400 text-xs font-medium">LGAs in {selectedState}</p>
                        <p className="text-2xl font-bold text-emerald-700 dark:text-emerald-300">{selectedStateData.lgaCount}</p>
                    </div>
                    <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
                        <p className="text-green-600 dark:text-green-400 text-xs font-medium">Total Respondents</p>
                        <p className="text-2xl font-bold text-green-700 dark:text-green-300">
                            {selectedStateData.totalRespondents.toLocaleString()}
                        </p>
                    </div>
                    <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg border border-purple-200 dark:border-purple-800">
                        <p className="text-purple-600 dark:text-purple-400 text-xs font-medium">Total Wards</p>
                        <p className="text-2xl font-bold text-purple-700 dark:text-purple-300">
                            {selectedStateData.totalWards.toLocaleString()}
                        </p>
                    </div>
                    <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg border border-orange-200 dark:border-orange-800">
                        <p className="text-orange-600 dark:text-orange-400 text-xs font-medium">Unique Products</p>
                        <p className="text-2xl font-bold text-orange-700 dark:text-orange-300">
                            {new Set(selectedStateData.lgaProducts.flatMap(item => item.top_products.map(p => p.name))).size}
                        </p>
                    </div>
                </div>
            )}

            {/* Search (when state selected) */}
            {selectedState && (
                <div className="flex gap-4 flex-wrap">
                    <div className="flex-1 min-w-64">
                        <input
                            type="text"
                            placeholder={`Search LGAs in ${selectedState}...`}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:bg-gray-700 dark:text-white"
                        />
                    </div>
                    <button
                        onClick={() => {
                            setSelectedState(null);
                            setSearchTerm('');
                        }}
                        className="px-6 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors font-medium"
                    >
                        ← Back to States
                    </button>
                </div>
            )}

            {/* States Grid (Main View) */}
            {!selectedState && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-3">
                    {statesData.map((state) => (
                        <button
                            key={state.name}
                            onClick={() => setSelectedState(state.name)}
                            className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 border border-gray-200 dark:border-gray-700 hover:shadow-lg hover:border-emerald-500 dark:hover:border-emerald-500 transition-all cursor-pointer group"
                        >
                            <h3 className="text-sm font-bold text-gray-800 dark:text-gray-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors mb-2 line-clamp-2">
                                {state.name}
                            </h3>
                            <div className="space-y-1 text-xs">
                                <div className="flex justify-between">
                                    <span className="text-gray-600 dark:text-gray-400">LGAs:</span>
                                    <span className="font-semibold text-emerald-600 dark:text-emerald-400">{state.lgaCount}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600 dark:text-gray-400">Wards:</span>
                                    <span className="font-semibold text-emerald-600 dark:text-emerald-400">{state.totalWards}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600 dark:text-gray-400">Respondents:</span>
                                    <span className="font-semibold text-purple-600 dark:text-purple-400">{state.totalRespondents}</span>
                                </div>
                            </div>
                            <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                                <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium group-hover:font-bold transition-all">
                                    Click to explore →
                                </p>
                            </div>
                        </button>
                    ))}
                </div>
            )}

            {/* LGAs Detail Grid (when state selected) */}
            {selectedState && (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
                    {filteredLgasInState.map((lga) => (
                        <div
                            key={lga.lga_id}
                            className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow"
                        >
                            <div className="mb-4">
                                <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">{lga.lga_name}</h3>
                                <div className="text-xs text-gray-500 mt-2">
                                    {lga.total_wards} wards • {lga.total_respondents} respondents
                                </div>
                            </div>

                            <div className="space-y-2">
                                <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wide">Top 5 Products</p>
                                {lga.top_products.length > 0 ? (
                                    <div className="space-y-2">
                                        {lga.top_products.map((product, idx) => (
                                            <div key={idx} className="flex items-center gap-2">
                                                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-6 overflow-hidden">
                                                    <div
                                                        className="bg-gradient-to-r from-emerald-500 to-teal-500 h-full flex items-center justify-end pr-2"
                                                        style={{
                                                            width: `${(product.votes / Math.max(...lga.top_products.map(p => p.votes))) * 100}%`
                                                        }}
                                                    >
                                                        <span className="text-xs font-bold text-white">{product.votes}</span>
                                                    </div>
                                                </div>
                                                <span className="text-xs font-medium text-gray-700 dark:text-gray-300 min-w-32 truncate">{product.name}</span>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-xs text-gray-500">No product data available</p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {selectedState && filteredLgasInState.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-gray-500 dark:text-gray-400">No LGAs match your search in {selectedState}</p>
                </div>
            )}
        </div>
    );
}
