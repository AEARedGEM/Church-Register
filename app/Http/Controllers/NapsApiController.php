<?php

namespace App\Http\Controllers;

use App\Models\NapsRespondent;
use App\Models\NapsSurveyQuestion;
use App\Models\NapsSurveyResponse;
use App\Models\NapsStatistics;
use App\Models\NapsSubSkill;
use App\Models\NapsSkillGroup;
use App\Services\LocationService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Cache;
use Inertia\Inertia;

class NapsApiController extends Controller
{
    /**
     * Get survey questions by section
     */
    public function getSurveyQuestions($section = null)
    {
        $query = NapsSurveyQuestion::where('is_active', true)
            ->orderBy('order')
            ->orderBy('id');

        if ($section) {
            $query->where('section', $section);
        }

        return response()->json([
            'questions' => $query->get(),
            'sections' => ['basic', 'skills', 'products', 'governance']
        ]);
    }

    /**
     * Submit NAPS survey
     */
    public function submitSurvey(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'phone' => 'required|string|max:20',
            'state' => 'required|string',
            'lga' => 'required|string',
            'ward' => 'nullable|string',
            'employment_status' => 'nullable|string',
            'selected_skills' => 'nullable|array',
            'selected_product' => 'nullable|string',
            'funding_needs' => 'nullable|array',
            'governance_rating' => 'nullable|integer|min:1|max:5',
            'responses' => 'nullable|array',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            DB::beginTransaction();

            // Create respondent
            $respondent = NapsRespondent::create([
                'user_id' => Auth::id(),
                'first_name' => $request->first_name,
                'last_name' => $request->last_name,
                'phone' => $request->phone,
                'state' => $request->state,
                'lga' => $request->lga,
                'ward' => $request->ward,
                'employment_status' => $request->employment_status,
                'skills' => $request->selected_skills,
                'products_interest' => [$request->selected_product],
                'funding_needs' => $request->funding_needs,
                'governance_rating' => $request->governance_rating,
                'survey_completed_at' => now(),
                'ip_address' => $request->ip(),
                'user_agent' => $request->userAgent(),
            ]);

            // Store responses if provided
            if ($request->has('responses') && is_array($request->responses)) {
                foreach ($request->responses as $questionId => $answer) {
                    NapsSurveyResponse::create([
                        'respondent_id' => $respondent->id,
                        'question_id' => $questionId,
                        'answer' => is_array($answer) ? json_encode($answer) : $answer,
                        'answered_at' => now(),
                    ]);
                }
            }

            // Update statistics
            $this->updateStatistics($respondent);

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Survey submitted successfully',
                'respondent_id' => $respondent->id
            ], 201);

        } catch (\Exception $e) {
            DB::rollback();
            return response()->json([
                'success' => false,
                'message' => 'Failed to submit survey',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get dashboard statistics
     */
    public function getDashboardStats()
    {
        try {
            $totalRespondents = NapsRespondent::count();
            $surveysCompleted = NapsRespondent::completed()->count();
            $verifiedUsers = NapsRespondent::whereHas('user', function($q) {
                $q->whereNotNull('verified_at');
            })->count();

            $statesReached = NapsRespondent::distinct('state')->count('state');

            // Employment distribution
            $employmentData = NapsRespondent::select('employment_status')
                ->selectRaw('count(*) as count')
                ->groupBy('employment_status')
                ->get()
                ->map(function($item) {
                    return [
                        'name' => ucwords(str_replace('_', ' ', $item->employment_status ?? 'Not Specified')),
                        'value' => (int)$item->count
                    ];
                })
                ->filter(function($item) {
                    return $item['value'] > 0;
                })
                ->values();

            // Skills distribution - Get skill names from database
            $skillsData = [];
            $respondents = NapsRespondent::whereNotNull('skills')->get();
            $skillCounts = [];

            // Get skill ID to name mapping from database (all 65 skills)
            $skillMap = NapsSubSkill::all(['id', 'name'])
                ->pluck('name', 'id')
                ->toArray();

            // If no skills in database, use fallback map for backward compatibility
            if (empty($skillMap)) {
                $skillMap = [
                    1 => 'Web Development',
                    2 => 'Graphic Design',
                    3 => 'Fashion Design',
                    4 => 'Catering',
                    5 => 'Welding',
                    6 => 'Carpentry'
                ];
            }

            foreach ($respondents as $respondent) {
                if (is_array($respondent->skills)) {
                    foreach ($respondent->skills as $skillId) {
                        $skillName = $skillMap[$skillId] ?? "Unknown Skill (ID: $skillId)";
                        $skillCounts[$skillName] = ($skillCounts[$skillName] ?? 0) + 1;
                    }
                } else if (is_string($respondent->skills)) {
                    // Handle JSON string format
                    $skills = json_decode($respondent->skills, true);
                    if (is_array($skills)) {
                        foreach ($skills as $skillId) {
                            $skillName = $skillMap[$skillId] ?? "Unknown Skill (ID: $skillId)";
                            $skillCounts[$skillName] = ($skillCounts[$skillName] ?? 0) + 1;
                        }
                    }
                }
            }

            arsort($skillCounts);
            // Show all skills, not just top 10
            foreach ($skillCounts as $skill => $count) {
                $skillsData[] = [
                    'name' => $skill,
                    'count' => $count
                ];
            }

            // Products interest (Preferred Product)
            $productsData = [];
            $respondents = NapsRespondent::whereNotNull('products_interest')->get();
            $productCounts = [];
            foreach ($respondents as $respondent) {
                if (is_array($respondent->products_interest)) {
                    foreach ($respondent->products_interest as $product) {
                        if (!empty($product)) {
                            $productCounts[$product] = ($productCounts[$product] ?? 0) + 1;
                        }
                    }
                }
            }

            arsort($productCounts);
            foreach (array_slice($productCounts, 0, 12) as $product => $count) {
                $productsData[] = [
                    'name' => $product,
                    'value' => (int)$count
                ];
            }

            // Funding Support Needed distribution
            $fundingData = [];
            $respondents = NapsRespondent::whereNotNull('funding_needs')->get();
            $fundingCounts = [];
            foreach ($respondents as $respondent) {
                if (is_array($respondent->funding_needs)) {
                    foreach ($respondent->funding_needs as $funding) {
                        if (!empty($funding)) {
                            $fundingCounts[$funding] = ($fundingCounts[$funding] ?? 0) + 1;
                        }
                    }
                }
            }

            arsort($fundingCounts);
            foreach ($fundingCounts as $funding => $count) {
                $fundingData[] = [
                    'name' => $funding,
                    'value' => (int)$count
                ];
            }

            // State distribution
            $stateData = NapsRespondent::select('state')
                ->selectRaw('count(*) as count')
                ->groupBy('state')
                ->orderByDesc('count')
                ->limit(10)
                ->get()
                ->map(function($item) {
                    return [
                        'state' => $item->state,
                        'respondents' => $item->count
                    ];
                });

            return response()->json([
                'success' => true,
                'stats' => [
                    'totalRespondents' => (int)$totalRespondents,
                    'surveysCompleted' => (int)$surveysCompleted,
                    'verifiedUsers' => (int)$verifiedUsers,
                    'statesReached' => (int)$statesReached,
                ],
                'charts' => [
                    'employmentData' => $employmentData->toArray(),
                    'skillsData' => $skillsData,
                    'productsData' => $productsData,
                    'fundingData' => $fundingData,
                    'stateData' => $stateData->toArray(),
                ]
            ]);
        } catch (\Exception $e) {
            \Log::error('NAPS Dashboard Stats Error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch statistics',
                'error' => $e->getMessage(),
                'stats' => [
                    'totalRespondents' => 0,
                    'surveysCompleted' => 0,
                    'verifiedUsers' => 0,
                    'statesReached' => 0,
                ],
                'charts' => [
                    'employmentData' => [],
                    'skillsData' => [],
                    'productsData' => [],
                    'fundingData' => [],
                    'stateData' => [],
                ]
            ], 500);
        }
    }

    /**
     * Get respondent data
     */
    public function getRespondents(Request $request)
    {
        try {
            $query = NapsRespondent::query();

            // Apply filters
            if ($request->filled('state')) {
                $query->where('state', $request->state);
            }

            if ($request->filled('employment_status')) {
                $query->where('employment_status', $request->employment_status);
            }

            if ($request->filled('search')) {
                $search = $request->search;
                $query->where(function($q) use ($search) {
                    $q->where('first_name', 'LIKE', "%{$search}%")
                      ->orWhere('last_name', 'LIKE', "%{$search}%")
                      ->orWhere('phone', 'LIKE', "%{$search}%");
                });
            }

            $respondents = $query->with('user:id,name,email,verified_at')
                ->latest()
                ->paginate(20);

            return response()->json([
                'success' => true,
                'respondents' => $respondents
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch respondents',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get single respondent details
     */
    public function getRespondent($id)
    {
        try {
            $respondent = NapsRespondent::with(['user', 'responses.question'])
                ->findOrFail($id);

            return response()->json([
                'success' => true,
                'respondent' => $respondent
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Respondent not found',
                'error' => $e->getMessage()
            ], 404);
        }
    }

    /**
     * Get OWOP sectors with products
     */
    public function getOwopSectors()
    {
        try {
            $config = require base_path('app/Config/OwopSectors.php');

            return response()->json([
                'success' => true,
                'sectors' => array_values($config['sectors'])
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch sectors',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get products for a specific sector
     */
    public function getSectorProducts($sectorId)
    {
        try {
            $config = require base_path('app/Config/OwopSectors.php');

            if (!isset($config['sectors'][$sectorId])) {
                return response()->json([
                    'success' => false,
                    'message' => 'Sector not found'
                ], 404);
            }

            $sector = $config['sectors'][$sectorId];

            return response()->json([
                'success' => true,
                'sector' => [
                    'id' => $sector['id'],
                    'name' => $sector['name'],
                    'description' => $sector['description'],
                    'icon' => $sector['icon'],
                ],
                'products' => $sector['products']
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch sector products',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get OWOP prioritization for a specific ward
     * Returns top-3 products recommended for the ward based on scoring model
     */
    public function getWardOwopPriorities($state, $lga, $ward)
    {
        try {
            $config = require base_path('app/Config/OwopSectors.php');

            // Get all respondents from this ward
            $respondents = NapsRespondent::where('state', $state)
                ->where('lga', $lga)
                ->where('ward', $ward)
                ->get();

            if ($respondents->isEmpty()) {
                return response()->json([
                    'success' => true,
                    'message' => 'No respondent data yet for this ward',
                    'priorities' => [],
                    'summary' => [
                        'total_respondents' => 0,
                        'products_voted' => 0
                    ]
                ]);
            }

            // Calculate scores for all products
            $productScores = [];
            $totalRespondents = $respondents->count();

            foreach ($config['sectors'] as $sector) {
                foreach ($sector['products'] as $product) {
                    $productScores[$product] = [
                        'name' => $product,
                        'sector' => $sector['name'],
                        'sector_id' => $sector['id'],
                        'scores' => []
                    ];
                }
            }

            // Calculate individual scores
            foreach ($respondents as $respondent) {
                // Population Interest Score
                if ($respondent->products_interest && is_array($respondent->products_interest)) {
                    foreach ($respondent->products_interest as $product) {
                        if (isset($productScores[$product])) {
                            $productScores[$product]['scores']['population_interest'] =
                                ($productScores[$product]['scores']['population_interest'] ?? 0) + 1;
                        }
                    }
                }

                // Skills Score
                if ($respondent->skills && is_array($respondent->skills)) {
                    $skillNames = [
                        1 => 'Web Development',
                        2 => 'Graphic Design',
                        3 => 'Fashion Design',
                        4 => 'Catering',
                        5 => 'Welding',
                        6 => 'Carpentry'
                    ];

                    $skillRelatedProducts = [
                        'Web Development' => ['Software development', 'E-learning & edtech services', 'Digital marketing'],
                        'Graphic Design' => ['Graphics & branding', 'Content creation', 'Animation & 3D design'],
                        'Fashion Design' => ['Tailoring/fashion design', 'Shoe making', 'Bag making'],
                        'Catering' => ['Local restaurant operations', 'Bakery products', 'Bottled water production'],
                        'Welding' => ['Welding and fabrication', 'Metal doors & windows', 'Farm tool fabrication'],
                        'Carpentry' => ['Furniture & carpentry', 'Wood processing', 'Wood carving'],
                    ];

                    foreach ($respondent->skills as $skillId) {
                        $skillName = $skillNames[$skillId] ?? null;
                        if ($skillName && isset($skillRelatedProducts[$skillName])) {
                            foreach ($skillRelatedProducts[$skillName] as $relatedProduct) {
                                if (isset($productScores[$relatedProduct])) {
                                    $productScores[$relatedProduct]['scores']['skill_availability'] =
                                        ($productScores[$relatedProduct]['scores']['skill_availability'] ?? 0) + 0.5;
                                }
                            }
                        }
                    }
                }
            }

            // Calculate final scores using the weighting model
            $scoringModel = $config['scoring_model'];
            $finalScores = [];

            foreach ($productScores as $product => $data) {
                $score = 0;

                // Population interest (30%)
                $populationScore = ($data['scores']['population_interest'] ?? 0) / max($totalRespondents, 1);
                $score += $populationScore * $scoringModel['population_interest'] * 100;

                // Skill availability (25%)
                $skillScore = ($data['scores']['skill_availability'] ?? 0) / max($totalRespondents, 1);
                $score += $skillScore * $scoringModel['skill_availability'] * 100;

                // Natural resource alignment (20%)
                $regionProducts = $this->getRegionProducts($state);
                $resourceScore = in_array($product, $regionProducts) ? 1 : 0;
                $score += $resourceScore * $scoringModel['natural_resource_alignment'] * 100;

                // Market demand (15%) - based on overall product popularity
                $marketDemandCount = NapsRespondent::whereJsonContains('products_interest', $product)->count();
                $marketScore = $marketDemandCount / max(NapsRespondent::count(), 1);
                $score += $marketScore * $scoringModel['market_demand'] * 100;

                // Infrastructure proximity (10%) - base score for urban areas
                $infrastructureScore = 0.8; // Default to 80%
                $score += $infrastructureScore * $scoringModel['infrastructure_proximity'] * 100;

                $finalScores[$product] = [
                    'name' => $product,
                    'sector' => $data['sector'],
                    'sector_id' => $data['sector_id'],
                    'score' => round($score, 2),
                    'population_interest' => $data['scores']['population_interest'] ?? 0,
                ];
            }

            // Sort by score and get top 3
            usort($finalScores, function($a, $b) {
                return $b['score'] - $a['score'];
            });

            $topPriorities = array_slice($finalScores, 0, 3);

            return response()->json([
                'success' => true,
                'ward' => "$ward, $lga, $state",
                'priorities' => $topPriorities,
                'summary' => [
                    'total_respondents' => $totalRespondents,
                    'products_voted' => count(array_filter($finalScores, fn($p) => $p['population_interest'] > 0)),
                    'recommendation' => count($topPriorities) > 0
                        ? "Based on {$totalRespondents} respondents, we recommend " .
                          implode(', ', array_map(fn($p) => $p['name'], $topPriorities))
                        : "Not enough data to make recommendations yet"
                ]
            ]);
        } catch (\Exception $e) {
            \Log::error('OWOP Priorities Error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Failed to calculate ward priorities',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Helper function to get region products
     */
    private function getRegionProducts($state)
    {
        $config = require base_path('app/Config/OwopSectors.php');
        $regions = $config['regional_resources'];

        // Map state to region
        $stateToRegion = [
            'Lagos' => 'Southwest',
            'Oyo' => 'Southwest',
            'Osun' => 'Southwest',
            'Ondo' => 'Southwest',
            'Ekiti' => 'Southwest',
            'Ogun' => 'Southwest',
            'Enugu' => 'Southeast',
            'Ebonyi' => 'Southeast',
            'Anambra' => 'Southeast',
            'Imo' => 'Southeast',
            'Abia' => 'Southeast',
            'Rivers' => 'Southsouth',
            'Bayelsa' => 'Southsouth',
            'Delta' => 'Southsouth',
            'Cross River' => 'Southsouth',
            'Akwa Ibom' => 'Southsouth',
            'Borno' => 'Northeast',
            'Yobe' => 'Northeast',
            'Adamawa' => 'Northeast',
            'Taraba' => 'Northeast',
            'Katsina' => 'Northwest',
            'Kano' => 'Northwest',
            'Kaduna' => 'Northwest',
            'Kebbi' => 'Northwest',
            'Sokoto' => 'Northwest',
            'Zamfara' => 'Northwest',
            'Plateau' => 'North-central',
            'Nassarawa' => 'North-central',
            'Niger' => 'North-central',
            'Kwara' => 'North-central',
            'Kogi' => 'North-central',
            'FCT' => 'North-central',
        ];

        $region = $stateToRegion[$state] ?? 'North-central';
        return $regions[$region] ?? [];
    }

    /**
     * Export respondents data to CSV
     */
    public function exportRespondents(Request $request)
    {
        try {
            $query = NapsRespondent::query();

            if ($request->filled('state')) {
                $query->where('state', $request->state);
            }

            if ($request->filled('employment_status')) {
                $query->where('employment_status', $request->employment_status);
            }

            $respondents = $query->get();

            $csv = "First Name,Last Name,Phone,State,LGA,Ward,Employment Status,Skills,Products Interest,Funding Needs,Governance Rating,Survey Completed,Created At\n";

            foreach ($respondents as $respondent) {
                $csv .= "\"{$respondent->first_name}\",";
                $csv .= "\"{$respondent->last_name}\",";
                $csv .= "\"{$respondent->phone}\",";
                $csv .= "\"{$respondent->state}\",";
                $csv .= "\"{$respondent->lga}\",";
                $csv .= "\"{$respondent->ward}\",";
                $csv .= "\"{$respondent->employment_status}\",";
                $csv .= "\"" . json_encode($respondent->skills) . "\",";
                $csv .= "\"" . json_encode($respondent->products_interest) . "\",";
                $csv .= "\"" . json_encode($respondent->funding_needs) . "\",";
                $csv .= "\"{$respondent->governance_rating}\",";
                $csv .= "\"{$respondent->survey_completed_at}\",";
                $csv .= "\"{$respondent->created_at}\"\n";
            }

            return response()->streamDownload(function() use ($csv) {
                echo $csv;
            }, 'naps_respondents_' . date('Y-m-d_H-i-s') . '.csv', [
                'Content-Type' => 'text/csv',
                'Content-Disposition' => 'attachment',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to export data',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update statistics after survey submission
     */
    private function updateStatistics(NapsRespondent $respondent)
    {
        try {
            // Update total respondents
            NapsStatistics::updateOrCreate(
                ['metric_key' => 'total_respondents'],
                [
                    'metric_value' => NapsRespondent::count(),
                    'category' => 'general',
                    'recorded_at' => now()
                ]
            );

            // Update by state
            $stateCount = NapsRespondent::where('state', $respondent->state)->count();
            NapsStatistics::updateOrCreate(
                ['metric_key' => 'respondents_by_state', 'category' => $respondent->state],
                [
                    'metric_value' => $stateCount,
                    'recorded_at' => now()
                ]
            );

            // Update by employment status
            if ($respondent->employment_status) {
                $employmentCount = NapsRespondent::where('employment_status', $respondent->employment_status)->count();
                NapsStatistics::updateOrCreate(
                    ['metric_key' => 'respondents_by_employment', 'category' => $respondent->employment_status],
                    [
                        'metric_value' => $employmentCount,
                        'recorded_at' => now()
                    ]
                );
            }
        } catch (\Exception $e) {
            Log::error('Failed to update statistics: ' . $e->getMessage());
        }
    }

    /**
     * Dashboard page render for Inertia
     */
    public function dashboard()
    {
        $stats = $this->getDashboardStats();
        $statsData = json_decode($stats->getContent(), true);

        return Inertia::render('Naps/Application/Index', [
            'stats' => $statsData['stats'],
            'charts' => $statsData['charts'],
        ]);
    }

    /**
     * Get skill groups with their sub-skills
     */
    public function getSkillGroups()
    {
        try {
            $skillGroups = \App\Models\NapsSkillGroup::with('subSkills')
                ->orderBy('sort_order')
                ->get()
                ->map(function ($group) {
                    return [
                        'id' => $group->id,
                        'name' => $group->name,
                        'description' => $group->description,
                        'sort_order' => $group->sort_order,
                        'sub_skills' => $group->subSkills->map(function ($skill) {
                            return [
                                'id' => $skill->id,
                                'name' => $skill->name,
                                'group_id' => $skill->naps_skill_group_id,
                            ];
                        })->toArray(),
                    ];
                });

            return response()->json([
                'success' => true,
                'skill_groups' => $skillGroups,
                'total_skills' => $skillGroups->sum(fn($g) => count($g['sub_skills']))
            ]);
        } catch (\Exception $e) {
            Log::error('Error fetching skill groups: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'error' => 'Failed to load skill groups'
            ], 500);
        }
    }

    /**
     * Get skills distribution with actual skill names
     */
    public function getSkillsDistribution()
    {
        try {
            $respondents = NapsRespondent::whereNotNull('skills')->get();
            $skillCounts = [];

            // Get skill ID to name mapping from database
            $skillMap = NapsSubSkill::all(['id', 'name'])
                ->pluck('name', 'id')
                ->toArray();

            // Process each respondent's skills
            foreach ($respondents as $respondent) {
                $skills = $respondent->skills;

                // Handle both array and JSON string formats
                if (is_string($skills)) {
                    $skills = json_decode($skills, true) ?: [];
                }

                if (is_array($skills)) {
                    foreach ($skills as $skillId) {
                        $skillName = $skillMap[$skillId] ?? "Skill {$skillId}";
                        $skillCounts[$skillName] = ($skillCounts[$skillName] ?? 0) + 1;
                    }
                }
            }

            // Sort by count descending
            arsort($skillCounts);

            // Calculate total for percentages
            $total = array_sum($skillCounts);

            // Format response data
            $data = array_map(function ($name, $count) use ($total) {
                return [
                    'name' => $name,
                    'count' => $count,
                    'percentage' => $total > 0 ? round(($count / $total) * 100, 1) : 0
                ];
            }, array_keys($skillCounts), array_values($skillCounts));

            return response()->json([
                'success' => true,
                'data' => $data,
                'total' => $total,
                'unique_skills' => count($skillCounts)
            ]);
        } catch (\Exception $e) {
            Log::error('Error fetching skills distribution: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'error' => 'Failed to load skills distribution'
            ], 500);
        }
    }

    /**
     * Get states list from database
     */
    public function getStates()
    {
        try {
            $states = \App\Models\State::orderBy('name')->get(['id', 'name', 'abbreviation']);

            if ($states->isEmpty()) {
                $states = collect(LocationService::getStates())->map(function ($stateName) {
                    return [
                        'id' => $stateName,
                        'name' => $stateName,
                        'abbreviation' => substr($stateName, 0, 2),
                    ];
                });
            }

            return response()->json([
                'success' => true,
                'states' => $states
            ]);
        } catch (\Exception $e) {
            Log::error('Error fetching states: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'error' => 'Failed to load states'
            ], 500);
        }
    }

    /**
     * Get LGAs by state
     */
    public function getLgasByState($stateId)
    {
        try {
            if (!is_numeric($stateId)) {
                $stateName = urldecode($stateId);
                $lgaNames = LocationService::getLGAsByState($stateName);
                $lgas = collect($lgaNames)->map(function ($lgaName, $index) {
                    return [
                        'id' => $lgaName,
                        'name' => $lgaName,
                        'sort_order' => $index + 1,
                    ];
                });
            } else {
                $lgas = \App\Models\LGA::where('state_id', $stateId)
                    ->orderBy('sort_order')
                    ->orderBy('name')
                    ->get(['id', 'name', 'sort_order']);

                if ($lgas->isEmpty()) {
                    $state = \App\Models\State::find($stateId);
                    if ($state) {
                        $lgaNames = LocationService::getLGAsByState($state->name);
                        $lgas = collect($lgaNames)->map(function ($lgaName, $index) {
                            return [
                                'id' => $lgaName,
                                'name' => $lgaName,
                                'sort_order' => $index + 1,
                            ];
                        });
                    }
                }
            }

            return response()->json([
                'success' => true,
                'lgas' => $lgas
            ]);
        } catch (\Exception $e) {
            Log::error('Error fetching LGAs: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'error' => 'Failed to load LGAs'
            ], 500);
        }
    }

    /**
     * Get wards by LGA
     */
    public function getWardsByLga($lgaId, Request $request)
    {
        try {
            if (!is_numeric($lgaId)) {
                $lgaName = urldecode($lgaId);
                $stateName = $request->query('state');
                $wardNames = [];

                if ($stateName) {
                    $wardNames = LocationService::getWardsByStateAndLga($stateName, $lgaName);
                }

                if (empty($wardNames)) {
                    $wardNames = LocationService::getWardsByLga($lgaName);
                }

                $wards = collect($wardNames)->map(function ($wardName, $index) {
                    return [
                        'id' => $wardName,
                        'name' => $wardName,
                        'sort_order' => $index + 1,
                    ];
                });
            } else {
                $wards = \App\Models\Ward::where('lga_id', $lgaId)
                    ->orderBy('sort_order')
                    ->orderBy('name')
                    ->get(['id', 'name', 'sort_order']);

                if ($wards->isEmpty()) {
                    $lga = \App\Models\LGA::find($lgaId);
                    if ($lga) {
                        $wardNames = LocationService::getWardsByStateAndLga($lga->state->name ?? '', $lga->name);
                        $wards = collect($wardNames)->map(function ($wardName, $index) {
                            return [
                                'id' => $wardName,
                                'name' => $wardName,
                                'sort_order' => $index + 1,
                            ];
                        });
                    }
                }
            }

            return response()->json([
                'success' => true,
                'wards' => $wards
            ]);
        } catch (\Exception $e) {
            Log::error('Error fetching wards: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'error' => 'Failed to load wards'
            ], 500);
        }
    }

    /**
     * Get top products for all LGAs (One Ward One Product Linkage)
     */
    public function getLgaProductsLinkage()
    {
        try {
            $lgas = \App\Models\LGA::with('state')
                ->get(['id', 'state_id', 'name']);

            $lgaProducts = [];
            $respondents = NapsRespondent::whereNotNull('products_interest')->get();

            if ($lgas->isEmpty()) {
                $grouped = $respondents->groupBy(function ($respondent) {
                    return trim($respondent->state) . '||' . trim($respondent->lga);
                });

                foreach ($grouped as $groupKey => $group) {
                    [$stateName, $lgaName] = explode('||', $groupKey);

                    $productCounts = [];
                    foreach ($group as $respondent) {
                        if (is_array($respondent->products_interest)) {
                            foreach ($respondent->products_interest as $product) {
                                if (!empty($product)) {
                                    $productCounts[$product] = ($productCounts[$product] ?? 0) + 1;
                                }
                            }
                        }
                    }

                    arsort($productCounts);
                    $topProducts = array_slice($productCounts, 0, 5, true);

                    $wardCount = 0;
                    if ($stateName && $lgaName) {
                        $wardCount = count(LocationService::getWardsByStateAndLga($stateName, $lgaName));
                    }

                    $lgaProducts[] = [
                        'lga_id' => $groupKey,
                        'lga_name' => $lgaName ?: 'Unknown',
                        'state_id' => null,
                        'state_name' => $stateName ?: 'Unknown',
                        'total_wards' => $wardCount,
                        'total_respondents' => $group->count(),
                        'top_products' => collect($topProducts)->map(function($count, $product) {
                            return ['name' => $product, 'votes' => $count];
                        })->values()->all()
                    ];
                }
            } else {
                foreach ($lgas as $lga) {
                    $wardIds = \App\Models\Ward::where('lga_id', $lga->id)->pluck('id');
                    $respondentsForLga = collect();

                    if ($wardIds->isNotEmpty()) {
                        $respondentsForLga = NapsRespondent::whereIn('ward', $wardIds)
                            ->whereNotNull('products_interest')
                            ->get();
                    }

                    if ($respondentsForLga->isEmpty()) {
                        $respondentsForLga = NapsRespondent::where('state', $lga->state->name ?? '')
                            ->where('lga', $lga->name)
                            ->whereNotNull('products_interest')
                            ->get();
                    }

                    $productCounts = [];
                    foreach ($respondentsForLga as $respondent) {
                        if (is_array($respondent->products_interest)) {
                            foreach ($respondent->products_interest as $product) {
                                if (!empty($product)) {
                                    $productCounts[$product] = ($productCounts[$product] ?? 0) + 1;
                                }
                            }
                        }
                    }

                    arsort($productCounts);
                    $topProducts = array_slice($productCounts, 0, 5, true);

                    $wardCount = $wardIds->count();
                    if ($wardCount === 0) {
                        $wardCount = count(LocationService::getWardsByStateAndLga($lga->state->name ?? '', $lga->name));
                    }

                    $lgaProducts[] = [
                        'lga_id' => $lga->id,
                        'lga_name' => $lga->name,
                        'state_id' => $lga->state_id,
                        'state_name' => $lga->state->name ?? 'Unknown',
                        'total_wards' => $wardCount,
                        'total_respondents' => $respondentsForLga->count(),
                        'top_products' => collect($topProducts)->map(function($count, $product) {
                            return ['name' => $product, 'votes' => $count];
                        })->values()->all()
                    ];
                }
            }

            return response()->json([
                'success' => true,
                'data' => $lgaProducts,
                'total_lgas' => count($lgaProducts)
            ]);
        } catch (\Exception $e) {
            Log::error('Error fetching LGA products linkage: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'error' => 'Failed to load LGA products data'
            ], 500);
        }
    }

    /**
     * Get products for a specific LGA
     */
    public function getLgaProducts($lgaId)
    {
        try {
            $lga = \App\Models\LGA::find($lgaId);
            if (!$lga) {
                return response()->json([
                    'success' => false,
                    'error' => 'LGA not found'
                ], 404);
            }

            // Get all wards in this LGA
            $wardIds = \App\Models\Ward::where('lga_id', $lgaId)->pluck('id');

            // Get all respondents from these wards
            $respondents = NapsRespondent::whereIn('ward', $wardIds)
                ->whereNotNull('products_interest')
                ->get();

            $productCounts = [];
            $wardProductData = [];

            foreach ($respondents as $respondent) {
                $wardName = \App\Models\Ward::find($respondent->ward)->name ?? 'Unknown';

                if (is_array($respondent->products_interest)) {
                    foreach ($respondent->products_interest as $product) {
                        if (!empty($product)) {
                            $productCounts[$product] = ($productCounts[$product] ?? 0) + 1;

                            if (!isset($wardProductData[$wardName])) {
                                $wardProductData[$wardName] = [];
                            }
                            $wardProductData[$wardName][$product] = ($wardProductData[$wardName][$product] ?? 0) + 1;
                        }
                    }
                }
            }

            arsort($productCounts);

            return response()->json([
                'success' => true,
                'lga_name' => $lga->name,
                'state_name' => $lga->state->name ?? 'Unknown',
                'total_wards' => $wardIds->count(),
                'total_respondents' => $respondents->count(),
                'all_products' => collect($productCounts)->map(function($count, $product) {
                    return ['name' => $product, 'votes' => $count];
                })->values()->all(),
                'ward_breakdown' => $wardProductData
            ]);
        } catch (\Exception $e) {
            Log::error('Error fetching LGA products: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'error' => 'Failed to load LGA products'
            ], 500);
        }
    }

    /**
     * Get statistics summary for charts
     */
    public function getChartsSummary()
    {
        try {
            $respondents = NapsRespondent::all();

            // Skills data for compact display
            $skillsData = [];
            $skillCounts = [];
            $respondents = NapsRespondent::whereNotNull('skills')->get();

            foreach ($respondents as $respondent) {
                if (is_array($respondent->skills)) {
                    foreach ($respondent->skills as $skillId) {
                        $skillCounts[$skillId] = ($skillCounts[$skillId] ?? 0) + 1;
                    }
                }
            }

            arsort($skillCounts);
            $topSkills = array_slice($skillCounts, 0, 10, true);

            foreach ($topSkills as $skillId => $count) {
                $skillsData[] = [
                    'id' => $skillId,
                    'count' => $count,
                    'percentage' => round(($count / NapsRespondent::count()) * 100, 1)
                ];
            }

            // Products data for compact display
            $productsData = [];
            $productCounts = [];
            $respondents = NapsRespondent::whereNotNull('products_interest')->get();

            foreach ($respondents as $respondent) {
                if (is_array($respondent->products_interest)) {
                    foreach ($respondent->products_interest as $product) {
                        if (!empty($product)) {
                            $productCounts[$product] = ($productCounts[$product] ?? 0) + 1;
                        }
                    }
                }
            }

            arsort($productCounts);
            $topProducts = array_slice($productCounts, 0, 10, true);

            foreach ($topProducts as $product => $count) {
                $productsData[] = [
                    'name' => $product,
                    'count' => $count,
                    'percentage' => round(($count / NapsRespondent::count()) * 100, 1)
                ];
            }

            return response()->json([
                'success' => true,
                'skills' => $skillsData,
                'products' => $productsData
            ]);
        } catch (\Exception $e) {
            Log::error('Error fetching charts summary: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'error' => 'Failed to load charts data'
            ], 500);
        }
    }
}
