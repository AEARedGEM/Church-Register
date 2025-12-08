<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\NapsApiController;

Route::prefix('api')->group(function () {
    Route::get('/naps/survey-questions', [NapsApiController::class, 'getSurveyQuestions']);
    Route::get('/naps/states', [NapsApiController::class, 'getStates']);
    Route::get('/naps/skill-groups', [NapsApiController::class, 'getSkillGroups']);
    Route::get('/naps/skills-distribution', [NapsApiController::class, 'getSkillsDistribution']);
    Route::get('/naps/sectors', [NapsApiController::class, 'getOwopSectors']);
    Route::get('/naps/sectors/{sectorId}/products', [NapsApiController::class, 'getSectorProducts']);

    Route::middleware(['auth'])->group(function () {
        Route::post('/naps/submit-survey', [NapsApiController::class, 'submitSurvey']);

        Route::get('/naps/dashboard-stats', [NapsApiController::class, 'getDashboardStats']);
        Route::get('/naps/respondents', [NapsApiController::class, 'getRespondents']);
        Route::get('/naps/respondents/{id}', [NapsApiController::class, 'getRespondent']);
        Route::get('/naps/ward-priorities/{state}/{lga}/{ward}', [NapsApiController::class, 'getWardOwopPriorities']);

        Route::middleware(['role:admin|super_admin'])->group(function () {
            Route::get('/naps/export-respondents', [NapsApiController::class, 'exportRespondents']);
        });
    });
});

Route::middleware(['auth'])->group(function () {
    Route::get('/naps', [NapsApiController::class, 'dashboard'])->name('naps.dashboard');
    Route::get('/naps/dashboard', [NapsApiController::class, 'dashboard'])->name('naps.index');
});
