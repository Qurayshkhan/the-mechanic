<?php

use App\Http\Controllers\Mechanic\MechanicController;


Route::group(['prefix' => 'mechanics'], function () {

    Route::get('/gather-information-form', [MechanicController::class, 'createGatherInformationForm'])->name('getherMechanicsForm');
});
