<?php

namespace App\Http\Controllers;

use App\Models\FundType;
use Illuminate\Http\Request;

class FundingController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        return response()->json([
            'tradefiApplications' => $user->fundingApplications()
                ->with('fundType')
                ->where('category', 'tradefi')
                ->get(),
            'vcMatches' => $user->vcMatches()
                ->with('investor')
                ->get(),
            'availableFunds' => FundType::where('is_active', true)->get()
        ]);
    }

    public function apply(FundingApplicationRequest $request)
    {
        $application = $request->user()->fundingApplications()->create([
            'fund_type_id' => $request->fund_type_id,
            'title' => $request->title,
            'amount_requested' => $request->amount,
            'purpose' => $request->purpose,
            'business_plan' => $request->business_plan,
            'status' => 'pending',
            'applied_at' => now()
        ]);

        return redirect()->back()->with('success', 'Application submitted successfully');
    }
}
