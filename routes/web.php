<?php

use App\Http\Controllers\CardController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\WorkspaceController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// Route::get('/dashboard', function () {
//     return Inertia::render('Dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');

Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard')->middleware(['auth']);
Route::get('users', [DashboardController::class, 'index'])->name('users')->middleware(['auth']);
Route::get('task', [DashboardController::class, 'index'])->name('task')->middleware(['auth']);

Route::get('workspaces/create', [WorkspaceController::class, 'create'])->name('workspaces.create')->middleware(['auth']);
Route::post('workspaces/create', [WorkspaceController::class, 'store'])->name('workspaces.store')->middleware(['auth']);
Route::get('workspaces/p/{workspace:slug}', [WorkspaceController::class, 'show'])->name('workspaces.show')->middleware(['auth']);
Route::get('workspaces/edit/{workspace:slug}', [WorkspaceController::class, 'edit'])->name('workspaces.edit')->middleware(['auth']);
Route::put('workspaces/edit/{workspace:slug}', [WorkspaceController::class, 'update'])->name('workspaces.update')->middleware(['auth']);
Route::delete('workspaces/destroy/{workspace:slug}', [WorkspaceController::class, 'destroy'])->name('workspaces.destroy')->middleware(['auth']);

Route::post('workspaces/member/{workspace:slug}/store', [WorkspaceController::class, 'member_store'])->name('workspaces.members.store')->middleware(['auth']);
Route::delete('workspaces/member/{workspace}/destroy/{member}', [WorkspaceController::class, 'member_destroy'])->name('workspaces.member_destroy')->middleware(['auth']);

Route::controller(CardController::class)->group(function () {
    Route::get('card/{workspace:slug}/create', 'create')->name('card.create'); 
    Route::post('card/{workspace:slug}/create', 'store')->name('card.store'); 
    Route::get('card/{workspace:slug}/detai/{card}', 'show')->name('card.show'); 
    Route::get('card/{workspace:slug}/edit/{card}', 'edit')->name('card.edit'); 
    Route::put('card/{workspace:slug}/edit/{card}', 'update')->name('card.update'); 
    Route::post('card/{workspace:slug}/{card}/reorder', 'store')->name('card.reorder'); 
    Route::delete('card/{workspace:slug}/destroy/{card}', 'destroy')->name('card.destroy'); 
});

route::get('testing', function () {
    return Inertia::render('Testing');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
