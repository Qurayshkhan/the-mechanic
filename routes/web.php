<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\LocalizationController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::middleware(['web', 'auth', 'verified', 'mechanic'])->group(function () {

    Route::get('/language/{locale}', [LocalizationController::class, 'index'])->name('language.switch');

    Route::get('/', [DashboardController::class, 'home'])->name('home');
    Route::get('/dashboard', [DashboardController::class, 'dashboard'])->name('dashboard');

    Route::middleware('auth')->group(function () {
        Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
        Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
        Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
        Route::post('/profile/upload', [ProfileController::class, 'uploadAvatar'])->name('profile.uploadAvatar');
        Route::delete('/profile/avatar', [ProfileController::class, 'removeAvatar'])->name('profile.removeAvatar');
    });
});
require __DIR__ . '/auth.php';
require __DIR__ . '/mechanic.php';
require __DIR__ . '/admin.php';
