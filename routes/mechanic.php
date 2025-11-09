<?php

use App\Http\Controllers\Mechanic\MechanicOnboardingController;
use Illuminate\Support\Facades\Route;


Route::get('/waiting-page', [MechanicOnboardingController::class, 'waiting'])->name('mechanic.waitingPage')->middleware('is_verified_mechanic');
Route::group(['prefix' => 'mechanic'], function () {

    Route::group(['prefix' => 'onboarding', 'middleware' => 'is_complete_onboarding_form'], function () {
        Route::get('/form', [MechanicOnboardingController::class, 'createGatherInformationForm'])->name('mechanic.registrationForm');
        Route::put("/form", [MechanicOnboardingController::class, 'updateRegistrationForm'])->name('mechanic.updateRegistrationForm');
        Route::prefix('services')->group(function () {
            Route::post('/store', [MechanicOnboardingController::class, 'createService'])->name('mechanic.createService');
        });
        Route::prefix('mechanic-services')->group(function () {
            Route::post('/store', [MechanicOnboardingController::class, 'storeMechanicService'])->name('mechanic.storeMechanicService');
            Route::delete('/{id}', [MechanicOnboardingController::class, 'deleteMechanicService'])->name('mechanic.deleteMechanicService');
        });
        Route::prefix('documents')->group(function () {
            Route::post('/store', [MechanicOnboardingController::class, 'storeDocuments'])->name('mechanic.storeDocuments');
        });
    });
});
Route::group(['prefix' => 'mechanic', 'middleware' => 'mechanic'], function () {});
