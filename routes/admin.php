<?php

use App\Http\Controllers\Admin\PermissionController;
use App\Http\Controllers\Admin\RoleController;
use App\Http\Controllers\Admin\UserController;


Route::group(['prefix' => 'admin', 'middleware' => ['auth', 'verified', 'permission:admin']], function () {
    // admin manage role and permissions
    Route::prefix('roles')->group(function () {

        // Roles
        Route::get('/', [RoleController::class, 'index'])->name('admin.roles');
        Route::get('/create', [RoleController::class, 'create'])->name('admin.roles.create');
        Route::post('/store', [RoleController::class, 'store'])->name('admin.roles.store');
        Route::get('/{role}/edit', [RoleController::class, 'edit'])->name('admin.roles.edit');
        Route::put('/{role}', [RoleController::class, 'update'])->name('admin.roles.update');
        Route::delete('/{role}', [RoleController::class, 'destroy'])->name('admin.roles.destroy');

        // Permissions
        Route::get('/permission/{role}/edit', [PermissionController::class, 'editPermission'])->name('admin.roles.editPermissions');
        Route::put('permission/{role}/edit', [PermissionController::class, 'updatePermission'])->name('admin.roles.updatePermissions');


    });

    // admin manage users

    Route::prefix('users')->group(function () {
        Route::get('/', [UserController::class, 'index'])->name('admin.users');
        Route::get('/create', [UserController::class, 'create'])->name('admin.user.create');
        Route::post('/store', [UserController::class, 'store'])->name('admin.user.store');
        Route::get('/{user}/edit', [UserController::class, 'edit'])->name('admin.users.edit');
        Route::put('/{user}/update', [UserController::class, 'edit'])->name('admin.users.update');
        Route::delete('/{user}/delete', [UserController::class, 'delete'])->name('admin.users.destroy');
    });
});
