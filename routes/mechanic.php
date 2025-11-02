<?php

use App\Http\Controllers\Mechanic\MechanicController;
use App\Http\Controllers\Mechanic\MechanicOnboardingController;


Route::group(['prefix' => 'mechanic'], function () {

    Route::get('/mechanic-registration-form', [MechanicOnboardingController::class, 'createGatherInformationForm'])->name('mechanic.registrationForm');

    Route::put("mechanic-registration-form", [MechanicOnboardingController::class, 'updateRegistrationForm'])->name('mechanic.updateRegistrationForm');
});

