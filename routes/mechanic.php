<?php

use App\Http\Controllers\Mechanic\MechanicController;


Route::group(['prefix' => 'mechanic'], function () {

    // mechanic onboarding
    Route::get('/mechanic-registration-form', [MechanicController::class, 'createGatherInformationForm'])->name('mechanic.registrationForm');

    Route::put("mechanic-registration-form", [MechanicController::class, 'updateRegistrationForm'])->name('mechanic.updateRegistrationForm');
});

