<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TrainingController;
use App\Http\Controllers\CourseController;

// Route::prefix('training')->group(function () {
//     Route::get('/', [TrainingController::class, 'index']);
//     Route::post('/courses/{course}/enroll', [TrainingController::class, 'enroll']);
//     Route::post('/events/{event}/register', [TrainingController::class, 'registerEvent']);
//     Route::get('/course/detail', [CourseController::class, 'courseDetail']);
//     Route::get('/course/player', [CourseController::class, 'coursePlayer']);

// });



Route::middleware(['auth'])->prefix('training')->name('training.')->group(function () {
    Route::get('/courses', [TrainingController::class, 'myCourses'])->name('courses');

    Route::get('/courses/{course}', [TrainingController::class, 'showCourse'])->name('courses.show');
    Route::post('/courses/{course}/enroll', [TrainingController::class, 'enrollCourse'])->name('courses.enroll');

    // Events
    Route::get('/events', [TrainingController::class, 'events'])->name('events.index');
    Route::post('/events/{event}/register', [TrainingController::class, 'registerEvent'])->name('events.register');

    // Certificates

    Route::get('/certificates/{certificate}', [TrainingController::class, 'showCertificate'])->name('certificates.show');

    // Settings
    Route::get('/settings', [TrainingController::class, 'settings'])->name('settings');
});
