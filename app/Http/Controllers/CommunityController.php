<?php

namespace App\Http\Controllers;

use App\Models\ForumPost;
use App\Models\Mentor;
use Illuminate\Http\Request;

class CommunityController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        return response()->json([
            'userCommunities' => $user->communityMemberships()
                ->with('community')
                ->get(),
            'recentPosts' => ForumPost::with('user', 'community')
                ->latest()
                ->take(10)
                ->get(),
            'mentors' => Mentor::where('is_active', true)
                ->with('user')
                ->get(),
            'userMentorships' => $user->mentorships()
                ->with('mentor.user')
                ->where('status', 'active')
                ->get()
        ]);
    }
}
