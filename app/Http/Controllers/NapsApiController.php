<?php

namespace App\Http\Controllers;

use App\Models\NapsRespondent;
use App\Models\NapsSurveyQuestion;
use App\Models\NapsSurveyResponse;
use App\Models\NapsStatistics;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
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
                        'name' => $item->employment_status ?? 'Not Specified',
                        'value' => $item->count
                    ];
                });

            // Skills distribution
            $skillsData = [];
            $respondents = NapsRespondent::whereNotNull('skills')->get();
            $skillCounts = [];

            // Map skill IDs to names
            $skillMap = [
                1 => 'Web Development',
                2 => 'Graphic Design',
                3 => 'Fashion Design',
                4 => 'Catering',
                5 => 'Welding',
                6 => 'Carpentry'
            ];

            foreach ($respondents as $respondent) {
                if (is_array($respondent->skills)) {
                    foreach ($respondent->skills as $skillId) {
                        $skillName = $skillMap[$skillId] ?? "Skill $skillId";
                        $skillCounts[$skillName] = ($skillCounts[$skillName] ?? 0) + 1;
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

            // Products interest
            $productsData = [];
            $respondents = NapsRespondent::whereNotNull('products_interest')->get();
            $productCounts = [];
            foreach ($respondents as $respondent) {
                foreach ($respondent->products_interest as $product) {
                    $productCounts[$product] = ($productCounts[$product] ?? 0) + 1;
                }
            }

            arsort($productCounts);
            foreach (array_slice($productCounts, 0, 10) as $product => $count) {
                $productsData[] = [
                    'name' => $product,
                    'value' => $count
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
                    'totalRespondents' => $totalRespondents,
                    'surveysCompleted' => $surveysCompleted,
                    'verifiedUsers' => $verifiedUsers,
                    'statesReached' => $statesReached,
                ],
                'charts' => [
                    'employmentData' => $employmentData,
                    'skillsData' => $skillsData,
                    'productsData' => $productsData,
                    'stateData' => $stateData,
                ]
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch statistics',
                'error' => $e->getMessage()
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
     * Get states list
     */
    public function getStates()
    {
        $states = [
            'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa',
            'Benue', 'Borno', 'Cross River', 'Delta', 'Ebonyi', 'Edo',
            'Ekiti', 'Enugu', 'Gombe', 'Imo', 'Jigawa', 'Kaduna',
            'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara', 'Lagos',
            'Lasg', 'Nasarawa', 'Niger', 'Ogun', 'Ondo', 'Osun',
            'Oyo', 'Plateau', 'Rivers', 'Sokoto', 'Taraba', 'Yobe', 'Zamfara'
        ];

        return response()->json([
            'success' => true,
            'states' => $states
        ]);
    }
}
