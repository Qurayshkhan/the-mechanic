<?php

use App\Http\Controllers\Admin\RoleAndPermissionController;
use App\Http\Controllers\Admin\UserController;


Route::group(['prefix' => 'admin', 'middleware' => ['auth', 'verified', 'permission:admin']], function () {
    // admin manage role and permissions
    Route::prefix('manage-roles-permissions')->group(function () {
        Route::get('/', [RoleAndPermissionController::class, 'index'])->name('admin.rolesAndPermissions');
        Route::get('/create', [RoleAndPermissionController::class, 'create'])->name('admin.roles.create');
        Route::post('/store', [RoleAndPermissionController::class, 'store'])->name('admin.roles.store');
        Route::get('/{role}', [RoleAndPermissionController::class, 'show'])->name('admin.roles.show');
        Route::get('/{role}/edit', [RoleAndPermissionController::class, 'edit'])->name('admin.roles.edit');
        Route::get('/permission/{role}/edit', [RoleAndPermissionController::class, 'editPermission'])->name('admin.roles.editPermissions');
        Route::put('permission/{role}/edit', [RoleAndPermissionController::class, 'updatePermission'])->name('admin.roles.updatePermissions');
        Route::put('/{role}', [RoleAndPermissionController::class, 'update'])->name('admin.roles.update');
        Route::delete('/{role}', [RoleAndPermissionController::class, 'destroy'])->name('admin.roles.destroy');
    });

    // admin manage users

    Route::prefix('manage-users')->group(function () {
        Route::get('/', [UserController::class, 'index'])->name('admin.users');
        Route::get('/{user}/edit', [UserController::class, 'edit'])->name('admin.users.edit');
        Route::put('/{user}/update', [UserController::class, 'edit'])->name('admin.users.update');
        Route::delete('/{user}/delete', [UserController::class, 'delete'])->name('admin.users.destroy');
    });

});
