<?php

/**
 * One Ward One Product (OWOP) Sector and Product Configuration
 * Used for dynamic product loading based on selected sector
 */

return [
    'sectors' => [
        1 => [
            'id' => 1,
            'name' => 'Agriculture & Agribusiness',
            'description' => 'Farming and agricultural value-added products',
            'icon' => '🌾',
            'products' => [
                'Cassava farming',
                'Maize farming',
                'Rice cultivation',
                'Sorghum/millet',
                'Palm oil',
                'Cocoa',
                'Shea nut',
                'Vegetables',
                'Poultry',
                'Fishery/Aquaculture',
                'Goat/Sheep rearing',
                'Cattle',
                'Beekeeping',
                'Snail farming',
                'Horticulture / flowers',
            ]
        ],
        2 => [
            'id' => 2,
            'name' => 'Food Processing & FMCG',
            'description' => 'Food production and consumer goods manufacturing',
            'icon' => '🍽️',
            'products' => [
                'Garri processing',
                'Cassava flour',
                'Yam flour',
                'Rice milling',
                'Vegetable oil extraction',
                'Palm kernel processing',
                'Poultry feed production',
                'Bottled water production',
                'Bakery products',
                'Noodles & snacks',
                'Fruit juice processing',
                'Spice/seasoning production',
            ]
        ],
        3 => [
            'id' => 3,
            'name' => 'Manufacturing & Light Industry',
            'description' => 'General manufacturing and light industrial products',
            'icon' => '🏭',
            'products' => [
                'Paper products',
                'Plastic recycling & molding',
                'Furniture & carpentry',
                'Household equipment assembly',
                'Aluminum fabrication',
                'Soap & detergent production',
                'Candle making',
                'Packaging materials manufacturing',
            ]
        ],
        4 => [
            'id' => 4,
            'name' => 'Textiles, Fashion & Leatherworks',
            'description' => 'Fashion, textiles and leather products',
            'icon' => '👕',
            'products' => [
                'Tailoring/fashion design',
                'Shoe making',
                'Bag making',
                'Leather tanning',
                'Textile weaving',
                'Embroidery',
                'Adire production',
            ]
        ],
        5 => [
            'id' => 5,
            'name' => 'Construction & Building Materials',
            'description' => 'Building materials and construction products',
            'icon' => '🏗️',
            'products' => [
                'Block molding',
                'Cement-based products',
                'Plaster of Paris (POP)',
                'Roofing sheet manufacturing',
                'Tiles and paving stones',
                'Wood processing',
                'Paint production',
            ]
        ],
        6 => [
            'id' => 6,
            'name' => 'Metals, Machinery & Fabrication',
            'description' => 'Metal work and machinery fabrication',
            'icon' => '⚙️',
            'products' => [
                'Welding and fabrication',
                'Metal doors & windows',
                'Farm tool fabrication',
                'Engine repair & maintenance',
                'Automobile fabrication (e.g., tricycles)',
            ]
        ],
        7 => [
            'id' => 7,
            'name' => 'Oil, Gas & Minerals',
            'description' => 'Oil, gas and mineral extraction/processing',
            'icon' => '⛽',
            'products' => [
                'Lubricant production',
                'Cooking gas retail',
                'Gas cylinder vending',
                'Bitumen processing',
                'Solid minerals (granite, limestone, clay)',
                'Mining value chain products',
            ]
        ],
        8 => [
            'id' => 8,
            'name' => 'Renewable Energy & Electrical Systems',
            'description' => 'Renewable energy and electrical products',
            'icon' => '⚡',
            'products' => [
                'Solar panel installation',
                'Solar lantern assembly',
                'Battery assembly',
                'Inverter maintenance',
                'Solar home system distribution',
                'Mini-grid services',
            ]
        ],
        9 => [
            'id' => 9,
            'name' => 'Digital Economy & ICT',
            'description' => 'Digital services and information technology',
            'icon' => '💻',
            'products' => [
                'Software development',
                'Freelancing/remote work',
                'IT device repair',
                'Data processing centers',
                'Digital marketing',
                'Cybersecurity services',
                'Animation & 3D design',
                'Mobile phone assembly',
                'E-learning & edtech services',
            ]
        ],
        10 => [
            'id' => 10,
            'name' => 'Creative Economy & Entertainment',
            'description' => 'Creative and entertainment services',
            'icon' => '🎬',
            'products' => [
                'Music production',
                'Film production',
                'Photography',
                'Graphics & branding',
                'Content creation',
                'Crafts and artworks',
                'Cultural performances',
            ]
        ],
        11 => [
            'id' => 11,
            'name' => 'Transportation & Logistics',
            'description' => 'Transportation and logistics services',
            'icon' => '🚚',
            'products' => [
                'Delivery services',
                'Motorcycle transport (regulated)',
                'Auto repair',
                'Fleet management',
                'Logistics hubs',
                'Vehicle spare parts',
            ]
        ],
        12 => [
            'id' => 12,
            'name' => 'Healthcare & Life Sciences',
            'description' => 'Health services and life sciences products',
            'icon' => '🏥',
            'products' => [
                'Herbal medicine products',
                'Medical consumables',
                'Drug distribution',
                'Healthtech services',
                'Clinic/outpost services',
            ]
        ],
        13 => [
            'id' => 13,
            'name' => 'Waste Management & Circular Economy',
            'description' => 'Waste management and recycling',
            'icon' => '♻️',
            'products' => [
                'Plastic recycling',
                'Organic fertilizer production',
                'Scrap metal recycling',
                'Waste-to-energy solutions',
                'Paper recycling',
            ]
        ],
        14 => [
            'id' => 14,
            'name' => 'Hospitality & Tourism',
            'description' => 'Hospitality and tourism services',
            'icon' => '🏨',
            'products' => [
                'Local restaurant operations',
                'Event services',
                'Tour guide activities',
                'Accommodation services',
                'Cultural festivals',
            ]
        ],
        15 => [
            'id' => 15,
            'name' => 'Education, Training & Human Capital',
            'description' => 'Education and training services',
            'icon' => '📚',
            'products' => [
                'Coaching/training centers',
                'Vocational training',
                'Digital literacy hubs',
                'Edtech micro-schools',
            ]
        ],
        16 => [
            'id' => 16,
            'name' => 'Water & Environmental Services',
            'description' => 'Water and environmental services',
            'icon' => '💧',
            'products' => [
                'Borehole drilling services',
                'Water purification',
                'Water vending & distribution',
                'Environmental cleanup',
                'Eco-park services',
            ]
        ],
        17 => [
            'id' => 17,
            'name' => 'Financial & Cooperative Services',
            'description' => 'Financial services and cooperatives',
            'icon' => '💰',
            'products' => [
                'Community microfinance',
                'Agent banking (POS)',
                'Cooperative lending groups',
                'Digital savings platforms',
            ]
        ],
        18 => [
            'id' => 18,
            'name' => 'Local Crafts & Cultural Products',
            'description' => 'Traditional crafts and cultural products',
            'icon' => '🎨',
            'products' => [
                'Pottery',
                'Wood carving',
                'Blacksmithing',
                'Cultural cloth weaving',
                'Traditional jewelry',
                'Bronze/metal artworks',
            ]
        ],
    ],

    /**
     * OWOP Prioritization Scoring Model
     * Used to identify top-3 ward products based on multiple factors
     */
    'scoring_model' => [
        'population_interest' => 0.30,        // 30% - Number of respondents interested
        'skill_availability' => 0.25,          // 25% - Relevant skills available in ward
        'natural_resource_alignment' => 0.20, // 20% - Natural resources in the region
        'market_demand' => 0.15,                // 15% - Market demand indicators
        'infrastructure_proximity' => 0.10,    // 10% - Proximity to transport/power
    ],

    /**
     * Region-to-Resource Mapping
     * Map regions to available natural resources for scoring
     */
    'regional_resources' => [
        'Southwest' => ['Cocoa', 'Palm oil', 'Textile weaving', 'Leather tanning'],
        'Southeast' => ['Palm oil', 'Rice cultivation', 'Fishery/Aquaculture', 'Cassava'],
        'Southsouth' => ['Fishing', 'Oil & Gas related', 'Palm products', 'Liquid waste'],
        'Northeast' => ['Millet', 'Livestock', 'Horticulture', 'Groundnuts'],
        'Northwest' => ['Livestock', 'Groundnuts', 'Textile', 'Leather'],
        'North-central' => ['Vegetables', 'Grains', 'Cattle', 'Yam'],
    ]
];
