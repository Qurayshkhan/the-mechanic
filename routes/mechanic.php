<?php

use App\Http\Controllers\Mechanic\MechanicController;
use App\Http\Controllers\Mechanic\MechanicOnboardingController;
use Illuminate\Support\Facades\Route;

Route::group(['prefix' => 'mechanic'], function () {

    Route::get('/mechanic-registration-form', [MechanicOnboardingController::class, 'createGatherInformationForm'])->name('mechanic.registrationForm');

    Route::put("mechanic-registration-form", [MechanicOnboardingController::class, 'updateRegistrationForm'])->name('mechanic.updateRegistrationForm');


    Route::prefix('services')->group(function () {
        Route::post('/store', [MechanicOnboardingController::class, 'createService'])->name('mechanic.createService');
    });

    Route::prefix('mechanic-services')->group(function () {
        Route::post('/store', [MechanicOnboardingController::class, 'storeMechanicService'])->name('mechanic.storeMechanicService');
        Route::delete('/{id}', [MechanicOnboardingController::class, 'deleteMechanicService'])->name('mechanic.deleteMechanicService');
    });
});
