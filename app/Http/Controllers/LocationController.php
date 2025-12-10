<?php

namespace App\Http\Controllers;

use App\Services\LocationService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class LocationController extends Controller
{
    public function getStates(): JsonResponse
    {
        return response()->json(LocationService::getStates());
    }

    public function getLGAs(Request $request): JsonResponse
    {
        $state = $request->query('state');

        if (!$state) {
            return response()->json(['error' => 'State parameter is required'], 400);
        }

        $lgas = LocationService::getLGAsByState($state);

        return response()->json($lgas);
    }
}
