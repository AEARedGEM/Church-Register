<?php

use App\Enum\RolesEnum;
use App\Http\Controllers\AdminTrainingController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\NapsController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\WalletController;
use App\Http\Controllers\FundingController;
use App\Http\Controllers\CommunityController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\TrainingController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Public routes
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// Authenticated routes
Route::middleware(['auth'])->group(function () {
    // Dashboard
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    // Profile routes
    Route::prefix('profile')->name('profile.')->group(function () {
        Route::get('/', [ProfileController::class, 'edit'])->name('edit');
        Route::patch('/', [ProfileController::class, 'update'])->name('update');
        Route::delete('/', [ProfileController::class, 'destroy'])->name('destroy');
        Route::get('/export-data', [ProfileController::class, 'export'])->name('export-data');
    });

    // Wallet routes
    Route::prefix('wallet')->name('wallet.')->group(function () {
        Route::get('/', [WalletController::class, 'index'])->name('index');
        Route::post('/transfer', [WalletController::class, 'transfer'])->name('transfer');
        Route::post('/swap', [WalletController::class, 'swap'])->name('swap');
    });

    // Funding routes
    Route::prefix('funding')->name('funding.')->group(function () {
        Route::get('/', [FundingController::class, 'index'])->name('index');
        Route::post('/apply', [FundingController::class, 'apply'])->name('apply');
        Route::get('/types', [FundingController::class, 'fundTypes'])->name('types');
    });

    // Community routes
    Route::prefix('community')->name('community.')->group(function () {
        Route::get('/', [CommunityController::class, 'index'])->name('index');
        Route::post('/join/{community}', [CommunityController::class, 'join'])->name('join');
        Route::post('/mentorship/request', [CommunityController::class, 'requestMentorship'])->name('mentorship.request');
    });

    // Training & Courses routes
    Route::prefix('training')->name('training.')->group(function () {
        // Training dashboard
        Route::get('/', [TrainingController::class, 'dashboard'])->name('dashboard');

        // Courses
        Route::get('/courses', [TrainingController::class, 'coursesPage'])->name('courses');
        Route::get('/courses/my-courses', [TrainingController::class, 'myCourses'])->name('my-courses');
        Route::get('/course/player/{course}', [CourseController::class, 'coursePlayer'])->name('course.player');
        Route::post('/courses/{course}/enroll', [TrainingController::class, 'enroll'])->name('courses.enroll');
        Route::get('/course/detail/{id}', [CourseController::class, 'courseDetail'])->name('course.detail');

        Route::post('/course/lecture/{lecture}/upload-slides',
    [CourseController::class, 'uploadSlides'])->name('lecture.upload-slides');

        Route::get('/course/player/{course}', [CourseController::class, 'coursePlayer'])
        ->name('course.player');

        // Route::post('/course/{course}/lecture/complete', [CourseController::class, 'completelecture'])
        //     ->name('course.lecture.complete');
        Route::post('/courses/{course}/lectures/{lecture}/complete', [CourseController::class, 'completeLecture'])
       ->name('course.lecture.complete');

        // Events
        Route::get('/events', [TrainingController::class, 'events'])->name('events');
        Route::post('/events/{event}/register', [TrainingController::class, 'registerEvent'])->name('events.register');

        // Certificates
        Route::get('/certificates', [TrainingController::class, 'certificates'])
            ->name('certificates');
        Route::get('/certificates/{enrollment}', [TrainingController::class, 'showCertificate'])
            ->name('certificate.show');
        Route::get('/certificates/{enrollment}/verify', [TrainingController::class, 'verifyCertificate'])
            ->name('certificate.verify');
        });

Route::middleware(['auth', 'role:super_admin|admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/training', [AdminTrainingController::class, 'index'])->name('training.index');
    Route::get('/training/create', [AdminTrainingController::class, 'create'])->name('training.create');
    Route::post('/training', [AdminTrainingController::class, 'store'])->name('training.store');
    Route::get('/training/{course}/edit', [AdminTrainingController::class, 'edit'])->name('training.edit');
    Route::put('/training/{course}', [AdminTrainingController::class, 'update'])->name('training.update');
    Route::delete('/training/{course}', [AdminTrainingController::class, 'destroy'])->name('training.destroy');
});

Route::middleware(['auth', 'role:super_admin|admin'])->group(function () {
    Route::resource('users', UserController::class);
    Route::post('users/export', [UserController::class, 'export'])->name('users.export');
});

Route::get('/naps', [NapsController::class, 'dashboard'])->middleware('auth')->name('naps.index');


});

// Include NAPS routes
require __DIR__.'/naps.php';

require __DIR__.'/auth.php';
