<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Course;
use App\Models\CourseCategory;
use App\Models\SkillType;
use Carbon\Carbon;

class CourseSeeder extends Seeder
{
    public function run(): void
    {
        // Get categories and skill types
        $softSkills = CourseCategory::where('slug', 'soft-skills')->first();
        $techSkills = CourseCategory::where('slug', 'tech-skills')->first();
        $vocationalSkills = CourseCategory::where('slug', 'vocational-skills')->first();
        $businessSkills = CourseCategory::where('slug', 'business-skills')->first();
        $creativeSkills = CourseCategory::where('slug', 'creative-skills')->first();

        $leadership = SkillType::where('slug', 'leadership')->first();
        $communication = SkillType::where('slug', 'communication')->first();
        $technical = SkillType::where('slug', 'technical')->first();
        $business = SkillType::where('slug', 'business')->first();
        $creative = SkillType::where('slug', 'creative')->first();
        $analytical = SkillType::where('slug', 'analytical')->first();
        $digitalMarketing = SkillType::where('slug', 'digital-marketing')->first();
        $financial = SkillType::where('slug', 'financial')->first();

        $courses = [
            // Soft Skills Courses
            [
                'title' => 'Public Speaking Mastery',
                'slug' => 'public-speaking-mastery',
                'description' => 'Master the art of public speaking and overcome your fear of speaking in front of crowds. Learn techniques used by professional speakers and build confidence in your communication skills.',
                'short_description' => 'Overcome fear and master the art of public speaking with proven techniques.',
                'course_category_id' => $softSkills->id,
                'skill_type_id' => $communication->id,
                'duration_hours' => 20,
                'duration_minutes' => 0,
                'difficulty_level' => 'beginner',
                'price' => 99.99,
                'discount_price' => 79.99,
                'prerequisites' => [],
                'learning_objectives' => [
                    'Overcome fear of public speaking',
                    'Structure compelling presentations',
                    'Use body language effectively',
                    'Handle Q&A sessions confidently',
                    'Engage different types of audiences'
                ],
                'curriculum' => [
                    [
                        'module' => 1,
                        'title' => 'Understanding Fear and Anxiety',
                        'lessons' => ['Root causes of speaking anxiety', 'Mindset shifts', 'Breathing techniques']
                    ],
                    [
                        'module' => 2,
                        'title' => 'Speech Structure and Content',
                        'lessons' => ['Opening hooks', 'Main content organization', 'Memorable closings']
                    ],
                    [
                        'module' => 3,
                        'title' => 'Delivery Techniques',
                        'lessons' => ['Voice modulation', 'Body language', 'Eye contact strategies']
                    ]
                ],
                'skills_gained' => ['Confidence building', 'Presentation skills', 'Communication', 'Leadership presence'],
                'tools_software' => ['PowerPoint', 'Canva', 'Teleprompter apps'],
                'is_featured' => true,
                'status' => 'published',
                'published_at' => now(),
                'tags' => ['communication', 'confidence', 'presentation', 'leadership'],
                'meta_title' => 'Public Speaking Mastery Course - Overcome Fear & Build Confidence',
                'meta_description' => 'Learn public speaking skills from experts. Overcome anxiety and deliver powerful presentations.',
            ],

            [
                'title' => 'Emotional Intelligence for Leaders',
                'slug' => 'emotional-intelligence-for-leaders',
                'description' => 'Develop your emotional intelligence to become a more effective leader. Learn to manage emotions, build empathy, and create positive team dynamics.',
                'short_description' => 'Develop EQ skills to become a more effective and empathetic leader.',
                'course_category_id' => $softSkills->id,
                'skill_type_id' => $leadership->id,
                'duration_hours' => 15,
                'duration_minutes' => 30,
                'difficulty_level' => 'intermediate',
                'price' => 149.99,
                'prerequisites' => ['Basic management experience'],
                'learning_objectives' => [
                    'Understand the five components of EQ',
                    'Develop self-awareness techniques',
                    'Manage emotions under pressure',
                    'Build empathy and social skills',
                    'Apply EQ in leadership scenarios'
                ],
                'curriculum' => [
                    ['module' => 1, 'title' => 'Self-Awareness', 'lessons' => ['Emotional self-awareness', 'Accurate self-assessment', 'Self-confidence']],
                    ['module' => 2, 'title' => 'Self-Management', 'lessons' => ['Emotional self-control', 'Adaptability', 'Achievement orientation']],
                    ['module' => 3, 'title' => 'Social Awareness', 'lessons' => ['Empathy', 'Organizational awareness', 'Service orientation']],
                    ['module' => 4, 'title' => 'Relationship Management', 'lessons' => ['Influence', 'Coach and mentor', 'Conflict management']]
                ],
                'is_featured' => true,
                'status' => 'published',
                'published_at' => now()->subDays(5),
                'tags' => ['leadership', 'emotional intelligence', 'management', 'soft skills'],
            ],

            // Tech Skills Courses


        [
        'title' => 'Blockchain: Concepts & Application',
        'slug' => 'blockchain-concepts-application',
        'description' => 'Gain a comprehensive understanding of blockchain technology, from core concepts to practical implementation. Learn how decentralized systems work, explore smart contracts, and build blockchain-based applications with real-world use cases.',
        'short_description' => 'Understand blockchain fundamentals and learn to build secure, decentralized applications with hands-on projects.',
        'course_category_id' => $techSkills->id,
        'skill_type_id' => $technical->id,
        'duration_hours' => 80,
        'duration_minutes' => 0,
        'difficulty_level' => 'intermediate',
        'price' => 149.99,
        'discount_price' => 99.99,
        'prerequisites' => [
            'Basic programming knowledge (JavaScript or Python recommended)',
            'Familiarity with web technologies',
            'Understanding of basic networking concepts'
        ],
        'learning_objectives' => [
            'Understand the principles of decentralized systems and distributed ledgers',
            'Learn the structure and function of blockchain networks such as Bitcoin and Ethereum',
            'Develop and deploy smart contracts using Solidity',
            'Build decentralized applications (DApps) with practical examples',
            'Explore blockchain use cases across industries such as finance, supply chain, and identity management'
        ],
        'curriculum' => [
            [
                'module' => 1,
                'title' => 'Blockchain Fundamentals',
                'lessons' => [
                    'Introduction to Blockchain Technology',
                    'History and Evolution of Blockchain',
                    'Decentralization and Distributed Ledgers',
                    'Consensus Mechanisms (Proof of Work, Proof of Stake)',
                    'Cryptographic Hash Functions'
                ]
            ],
            [
                'module' => 2,
                'title' => 'Smart Contracts and Ethereum',
                'lessons' => [
                    'Introduction to Ethereum and EVM',
                    'Writing Smart Contracts with Solidity',
                    'Deploying Smart Contracts on Test Networks',
                    'Interacting with Smart Contracts using Web3.js'
                ]
            ],
            [
                'module' => 3,
                'title' => 'Building Decentralized Applications (DApps)',
                'lessons' => [
                    'Understanding DApp Architecture',
                    'Frontend Integration with Smart Contracts',
                    'Wallets and Transactions (MetaMask, Infura)',
                    'Security Best Practices in DApps'
                ]
            ],
            [
                'module' => 4,
                'title' => 'Blockchain Use Cases and Future Trends',
                'lessons' => [
                    'Blockchain in Finance (DeFi & Payments)',
                    'Supply Chain and Logistics Applications',
                    'NFTs and Digital Ownership',
                    'Enterprise Blockchain Solutions (Hyperledger, Corda)',
                    'The Future of Blockchain and Web3'
                ]
            ]
        ],
        'skills_gained' => [
            'Blockchain architecture',
            'Smart contract development',
            'Decentralized app (DApp) development',
            'Solidity programming',
            'Web3 integration',
            'Distributed ledger technology (DLT)'
        ],
        'tools_software' => [
            'Remix IDE',
            'MetaMask',
            'Ganache',
            'Truffle Suite',
            'Node.js',
            'Web3.js',
            'Git'
        ],
        'max_students' => 60,
        'is_featured' => true,
        'is_premium' => true,
        'status' => 'published',
        'published_at' => now()->subDays(5),
        'tags' => [
            'blockchain',
            'ethereum',
            'smart contracts',
            'web3',
            'cryptocurrency',
            'solidity',
            'dapps'
        ],
        'meta_title' => 'Blockchain: Concepts & Application Course - Learn Decentralized Systems & Smart Contracts',
        'meta_description' => 'Master blockchain fundamentals and learn to build real-world decentralized applications using Ethereum and Solidity. Get hands-on experience with Web3, smart contracts, and DApps.'
    ],
    [
    'title' => 'Blockchain Development',
    'slug' => 'blockchain-development',
    'description' => 'Become a professional blockchain developer by mastering the tools, frameworks, and languages used to build decentralized applications (DApps) and blockchain systems. This course provides hands-on experience in smart contract development, blockchain security, and scalable architecture design.',
    'short_description' => 'Build production-ready blockchain applications using Solidity, Web3.js, and popular development frameworks.',
    'course_category_id' => $techSkills->id,
    'skill_type_id' => $technical->id,
    'duration_hours' => 100,
    'duration_minutes' => 0,
    'difficulty_level' => 'advanced',
    'price' => 199.99,
    'discount_price' => 149.99,
    'prerequisites' => [
        'Understanding of blockchain fundamentals',
        'Basic proficiency in JavaScript or TypeScript',
        'Experience with web development (frontend and backend basics)',
        'Familiarity with Git and command-line tools'
    ],
    'learning_objectives' => [
        'Develop and deploy secure smart contracts using Solidity and Hardhat',
        'Build full-stack decentralized applications (DApps) using Web3.js or Ethers.js',
        'Implement blockchain APIs, wallets, and token standards (ERC-20, ERC-721)',
        'Understand blockchain architecture, transactions, and gas optimization',
        'Apply best practices for blockchain security and auditing',
        'Deploy and interact with blockchain networks like Ethereum and Polygon'
    ],
    'curriculum' => [
        [
            'module' => 1,
            'title' => 'Blockchain Development Environment Setup',
            'lessons' => [
                'Installing Node.js, Truffle, and Hardhat',
                'Setting up a Local Blockchain with Ganache',
                'Exploring Ethereum Test Networks (Goerli, Sepolia)',
                'Using MetaMask for Development'
            ]
        ],
        [
            'module' => 2,
            'title' => 'Smart Contract Engineering with Solidity',
            'lessons' => [
                'Writing and Compiling Smart Contracts',
                'Functions, Events, and Mappings',
                'Token Standards: ERC-20, ERC-721, ERC-1155',
                'Gas Optimization and Contract Efficiency',
                'Error Handling and Security Considerations'
            ]
        ],
        [
            'module' => 3,
            'title' => 'Full-Stack DApp Development',
            'lessons' => [
                'Connecting Frontend to Smart Contracts with Web3.js and Ethers.js',
                'Building a Token Dashboard',
                'Wallet Integration and Transaction Management',
                'State Management with React and Context API',
                'Deploying a DApp on Ethereum and Polygon'
            ]
        ],
        [
            'module' => 4,
            'title' => 'Blockchain Testing, Deployment, and Security',
            'lessons' => [
                'Unit Testing Smart Contracts with Hardhat and Mocha',
                'Automating Deployment Scripts',
                'Auditing Smart Contracts for Vulnerabilities',
                'Integrating Oracles and Chainlink Feeds',
                'Continuous Integration (CI/CD) for Blockchain Projects'
            ]
        ],
        [
            'module' => 5,
            'title' => 'Advanced Topics and Career Development',
            'lessons' => [
                'Building DAOs (Decentralized Autonomous Organizations)',
                'Cross-Chain Development and Interoperability',
                'Layer 2 Scaling Solutions (Optimism, Arbitrum)',
                'Getting Started with Blockchain Freelancing and Open Source Projects'
            ]
        ]
    ],
    'skills_gained' => [
        'Solidity programming',
        'Smart contract deployment',
        'Web3.js and Ethers.js integration',
        'Token and NFT development',
        'Blockchain testing and auditing',
        'Full-stack DApp architecture'
    ],
    'tools_software' => [
        'Remix IDE',
        'Hardhat',
        'Truffle Suite',
        'Ganache',
        'MetaMask',
        'Ethers.js',
        'Web3.js',
        'Solhint',
        'OpenZeppelin',
        'GitHub Actions'
    ],
    'max_students' => 80,
    'is_featured' => true,
    'is_premium' => true,
    'status' => 'published',
    'published_at' => now(),
    'tags' => [
        'blockchain',
        'ethereum',
        'smart contracts',
        'solidity',
        'web3',
        'dapps',
        'polygon',
        'crypto development'
    ],
    'meta_title' => 'Blockchain Development Course - Build Smart Contracts & DApps Professionally',
    'meta_description' => 'Become a blockchain developer. Learn Solidity, Web3.js, and smart contract engineering to build secure decentralized apps and deploy on Ethereum and Polygon.'
],


            [
                'title' => 'Full-Stack Web Development Bootcamp',
                'slug' => 'full-stack-web-development-bootcamp',
                'description' => 'Comprehensive web development course covering front-end and back-end technologies. Build real-world projects and get job-ready skills.',
                'short_description' => 'Learn full-stack development with hands-on projects and industry-relevant skills.',
                'course_category_id' => $techSkills->id,
                'skill_type_id' => $technical->id,
                'duration_hours' => 120,
                'duration_minutes' => 0,
                'difficulty_level' => 'beginner',
                'price' => 299.99,
                'discount_price' => 199.99,
                'prerequisites' => ['Basic computer skills'],
                'learning_objectives' => [
                    'Master HTML, CSS, and JavaScript',
                    'Learn React and Node.js',
                    'Build database-driven applications',
                    'Deploy applications to the cloud',
                    'Create a professional portfolio'
                ],
                'curriculum' => [
                    ['module' => 1, 'title' => 'Frontend Fundamentals', 'lessons' => ['HTML5', 'CSS3', 'JavaScript ES6+', 'Responsive Design']],
                    ['module' => 2, 'title' => 'React Development', 'lessons' => ['Components', 'State Management', 'Hooks', 'React Router']],
                    ['module' => 3, 'title' => 'Backend Development', 'lessons' => ['Node.js', 'Express.js', 'RESTful APIs', 'Authentication']],
                    ['module' => 4, 'title' => 'Database & Deployment', 'lessons' => ['MongoDB', 'PostgreSQL', 'AWS/Heroku', 'CI/CD']]
                ],
                'skills_gained' => ['JavaScript', 'React', 'Node.js', 'Database design', 'Cloud deployment'],
                'tools_software' => ['VS Code', 'Git', 'Node.js', 'MongoDB', 'AWS'],
                'max_students' => 50,
                'is_featured' => true,
                'is_premium' => true,
                'status' => 'published',
                'published_at' => now()->subDays(10),
                'tags' => ['web development', 'javascript', 'react', 'nodejs', 'fullstack'],
            ],

            [
                'title' => 'Data Science with Python',
                'slug' => 'data-science-with-python',
                'description' => 'Learn data science fundamentals using Python. Master data analysis, visualization, and machine learning techniques.',
                'short_description' => 'Master data science with Python, from basics to machine learning.',
                'course_category_id' => $techSkills->id,
                'skill_type_id' => $analytical->id,
                'duration_hours' => 80,
                'duration_minutes' => 0,
                'difficulty_level' => 'intermediate',
                'price' => 199.99,
                'prerequisites' => ['Basic Python knowledge', 'High school mathematics'],
                'learning_objectives' => [
                    'Master pandas and numpy libraries',
                    'Create compelling data visualizations',
                    'Apply statistical analysis techniques',
                    'Build machine learning models',
                    'Work with real-world datasets'
                ],
                'curriculum' => [
                    ['module' => 1, 'title' => 'Python for Data Science', 'lessons' => ['Pandas basics', 'NumPy arrays', 'Data cleaning', 'Data manipulation']],
                    ['module' => 2, 'title' => 'Data Visualization', 'lessons' => ['Matplotlib', 'Seaborn', 'Plotly', 'Dashboard creation']],
                    ['module' => 3, 'title' => 'Statistical Analysis', 'lessons' => ['Descriptive statistics', 'Hypothesis testing', 'Correlation analysis', 'Regression']],
                    ['module' => 4, 'title' => 'Machine Learning', 'lessons' => ['Supervised learning', 'Unsupervised learning', 'Model evaluation', 'Feature engineering']]
                ],
                'tools_software' => ['Python', 'Jupyter Notebook', 'Pandas', 'Scikit-learn', 'Matplotlib'],
                'status' => 'published',
                'published_at' => now()->subDays(15),
                'tags' => ['data science', 'python', 'machine learning', 'analytics'],
            ],

            // Vocational Skills Courses
            [
                'title' => 'Agro-processing and Value Addition',
                'slug' => 'agro-processing-value-addition',
                'description' => 'Learn modern agro-processing techniques to add value to agricultural products. From farm to market strategies.',
                'short_description' => 'Transform raw agricultural products into profitable value-added goods.',
                'course_category_id' => $vocationalSkills->id,
                'skill_type_id' => $business->id,
                'duration_hours' => 40,
                'duration_minutes' => 0,
                'difficulty_level' => 'beginner',
                'price' => 79.99,
                'prerequisites' => [],
                'learning_objectives' => [
                    'Understand agro-processing fundamentals',
                    'Learn preservation techniques',
                    'Master packaging and branding',
                    'Develop market strategies',
                    'Ensure quality control standards'
                ],
                'curriculum' => [
                    ['module' => 1, 'title' => 'Processing Fundamentals', 'lessons' => ['Food safety', 'Processing equipment', 'Preservation methods']],
                    ['module' => 2, 'title' => 'Product Development', 'lessons' => ['Recipe formulation', 'Quality testing', 'Nutritional labeling']],
                    ['module' => 3, 'title' => 'Business Aspects', 'lessons' => ['Cost analysis', 'Pricing strategies', 'Market research', 'Distribution channels']]
                ],
                'skills_gained' => ['Food processing', 'Quality control', 'Business planning', 'Marketing'],
                'status' => 'published',
                'published_at' => now()->subDays(20),
                'tags' => ['agriculture', 'food processing', 'entrepreneurship', 'value addition'],
            ],

            // Business Skills Courses
            [
                'title' => 'Digital Marketing Masterclass',
                'slug' => 'digital-marketing-masterclass',
                'description' => 'Complete guide to digital marketing including SEO, social media, content marketing, and paid advertising strategies.',
                'short_description' => 'Master all aspects of digital marketing from SEO to social media advertising.',
                'course_category_id' => $businessSkills->id,
                'skill_type_id' => $digitalMarketing->id,
                'duration_hours' => 60,
                'duration_minutes' => 0,
                'difficulty_level' => 'intermediate',
                'price' => 179.99,
                'discount_price' => 129.99,
                'prerequisites' => ['Basic marketing knowledge'],
                'learning_objectives' => [
                    'Develop comprehensive digital strategies',
                    'Master SEO and content marketing',
                    'Create effective social media campaigns',
                    'Run profitable paid advertising',
                    'Analyze and optimize performance'
                ],
                'curriculum' => [
                    ['module' => 1, 'title' => 'Digital Strategy', 'lessons' => ['Strategy development', 'Customer personas', 'Competitive analysis']],
                    ['module' => 2, 'title' => 'SEO & Content', 'lessons' => ['On-page SEO', 'Content marketing', 'Link building', 'Analytics']],
                    ['module' => 3, 'title' => 'Social Media Marketing', 'lessons' => ['Platform strategies', 'Content creation', 'Community management', 'Influencer marketing']],
                    ['module' => 4, 'title' => 'Paid Advertising', 'lessons' => ['Google Ads', 'Facebook Ads', 'Campaign optimization', 'ROI measurement']]
                ],
                'tools_software' => ['Google Analytics', 'Google Ads', 'Facebook Business', 'Hootsuite', 'SEMrush'],
                'is_featured' => true,
                'status' => 'published',
                'published_at' => now()->subDays(7),
                'tags' => ['digital marketing', 'seo', 'social media', 'advertising', 'analytics'],
            ],

            // Creative Skills Courses
            [
                'title' => 'Graphic Design Fundamentals',
                'slug' => 'graphic-design-fundamentals',
                'description' => 'Learn the principles of graphic design and master industry-standard tools. Create stunning visual designs for print and digital media.',
                'short_description' => 'Master graphic design principles and create stunning visual content.',
                'course_category_id' => $creativeSkills->id,
                'skill_type_id' => $creative->id,
                'duration_hours' => 45,
                'duration_minutes' => 0,
                'difficulty_level' => 'beginner',
                'price' => 129.99,
                'prerequisites' => [],
                'learning_objectives' => [
                    'Understand design principles and theory',
                    'Master Adobe Creative Suite',
                    'Create brand identity systems',
                    'Design for various media types',
                    'Build a professional portfolio'
                ],
                'curriculum' => [
                    ['module' => 1, 'title' => 'Design Principles', 'lessons' => ['Color theory', 'Typography', 'Layout and composition', 'Visual hierarchy']],
                    ['module' => 2, 'title' => 'Adobe Tools', 'lessons' => ['Photoshop basics', 'Illustrator fundamentals', 'InDesign layouts']],
                    ['module' => 3, 'title' => 'Brand Design', 'lessons' => ['Logo design', 'Brand guidelines', 'Marketing materials', 'Digital assets']],
                    ['module' => 4, 'title' => 'Portfolio Development', 'lessons' => ['Project presentation', 'Client communication', 'Freelancing basics']]
                ],
                'tools_software' => ['Adobe Photoshop', 'Adobe Illustrator', 'Adobe InDesign', 'Canva'],
                'status' => 'published',
                'published_at' => now()->subDays(12),
                'tags' => ['graphic design', 'adobe', 'branding', 'visual design'],
            ]
        ];

        foreach ($courses as $courseData) {
            // Add default values
            $courseData = array_merge([
                'instructor_id' => 1, // Assuming user ID 1 exists
                'created_by' => 1,
                'offers_certificate' => true,
                'is_active' => true,
                'rating' => rand(40, 50) / 10, // Random rating between 4.0 and 5.0
                'reviews_count' => rand(10, 100),
                'enrolled_count' => rand(5, 45),
                'completion_rate' => rand(70, 95),
            ], $courseData);

            Course::create($courseData);
        }
    }
}
