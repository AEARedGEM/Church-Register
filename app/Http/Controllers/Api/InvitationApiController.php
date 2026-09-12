<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ChurchInvitation;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class InvitationApiController extends Controller
{
    public function stats(Request $request): JsonResponse
    {
        $query = $this->filteredQuery($request);
        $validated = (clone $query)->whereNotNull('validated_at')->count();

        return response()->json([
            'data' => [
                'total' => $query->count(),
                'pending' => (clone $query)->whereNull('validated_at')->count(),
                'validated' => $validated,
                'validation_rate' => $query->count() > 0 ? (int) round(($validated / $query->count()) * 100) : 0,
            ],
        ]);
    }

    public function leaderboard(Request $request): JsonResponse
    {
        $rows = $this->filteredQuery($request, 'validated_at')
            ->whereNotNull('validated_at')
            ->selectRaw('inviter_id, COUNT(*) as validated_count')
            ->groupBy('inviter_id')
            ->with('inviter:id,name,referral_code')
            ->orderByDesc('validated_count')
            ->get()
            ->values()
            ->map(fn (ChurchInvitation $invitation, int $index) => [
                'rank' => $index + 1,
                'inviter_id' => $invitation->inviter_id,
                'name' => $invitation->inviter?->name ?? 'Unknown member',
                'referral_code' => $invitation->inviter?->referral_code,
                'validated_count' => (int) $invitation->validated_count,
            ]);

        return response()->json(['data' => $rows]);
    }

    private function filteredQuery(Request $request, string $dateColumn = 'registered_at')
    {
        $validated = $request->validate([
            'from' => ['nullable', 'date_format:Y-m-d'],
            'to' => ['nullable', 'date_format:Y-m-d', 'after_or_equal:from'],
        ]);
        $query = ChurchInvitation::query();

        if (!empty($validated['from'])) {
            $query->whereDate($dateColumn, '>=', $validated['from']);
        }

        if (!empty($validated['to'])) {
            $query->whereDate($dateColumn, '<=', $validated['to']);
        }

        return $query;
    }
}
