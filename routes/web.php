<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\LocalizationController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/language/{locale}', [LocalizationController::class, 'index'])->name('language.switch');

Route::get('/', [DashboardController::class, 'home'])->name('home');
Route::get('/dashboard', [DashboardController::class, 'dashboard'])->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});
require __DIR__ . '/auth.php';
require __DIR__ . '/mechanic.php';
require __DIR__ . '/admin.php';
