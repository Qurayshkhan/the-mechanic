<?php

use Illuminate\Support\Facades\Route;

Route::group(['prefix' => 'customer', 'middleware' => ['auth', 'verified']], function () {});
