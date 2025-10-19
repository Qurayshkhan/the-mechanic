<?php


Route::group(['prefix' => 'customer', 'middleware' => ['auth', 'verified']], function () {

});
