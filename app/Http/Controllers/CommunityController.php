<?php

namespace App\Http\Controllers;

use App\Models\ForumPost;
use App\Models\Mentor;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CommunityController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        $communityIds = $user->communityMemberships()
            ->where('is_active', true)
            ->whereHas('community', fn ($query) => $query->where('is_active', true))
            ->pluck('community_id');

        return response()->json([
            'userCommunities' => $user->communityMemberships()
                ->where('is_active', true)
                ->with('community')
                ->get(),
            'recentPosts' => ForumPost::with('user', 'community')
                ->whereIn('community_id', $communityIds)
                ->where('status', 'active')
                ->latest()
                ->take(10)
                ->get(),
            'mentors' => Mentor::query()->where('is_active', true)
                ->with('user')
                ->get(),
            'userMentorships' => $user->mentorships()
                ->with('mentor.user')
                ->where('status', 'active')
                ->get()
        ]);
    }

    public function feed(Request $request)
    {
        $communityIds = $request->user()->communityMemberships()
            ->where('is_active', true)
            ->pluck('community_id');

        return Inertia::render('Member/CommunityFeed', [
            'communities' => \App\Models\Community::query()->whereIn('id', $communityIds, 'and', false)->where('is_active', true)->orderBy('name')->get(['id', 'name']),
            'posts' => ForumPost::with(['user:id,name', 'community:id,name'])
                ->whereIn('community_id', $communityIds)
                ->where('status', 'active')
                ->latest('last_activity_at')
                ->take(30)
                ->get(),
        ]);
    }

    public function storePost(Request $request)
    {
        abort_unless($request->user()->can('post_in_forums'), 403);

        $validated = $request->validate([
            'community_id' => ['required', 'integer', 'exists:communities,id'],
            'title' => ['nullable', 'string', 'max:255'],
            'content' => ['required', 'string', 'min:2', 'max:5000'],
        ]);

        abort_unless($request->user()->communityMemberships()
            ->where('community_id', $validated['community_id'])
            ->where('is_active', true)
            ->exists(), 403);

        ForumPost::create([
            'user_id' => $request->user()->id,
            'community_id' => $validated['community_id'],
            'title' => $validated['title'] ?? null,
            'content' => $validated['content'],
            'status' => 'active',
            'last_activity_at' => now(),
        ]);

        return redirect()->route('community.feed');
    }
}
