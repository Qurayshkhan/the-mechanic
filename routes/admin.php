<?php

use App\Http\Controllers\Admin\RoleAndPermissionController;


Route::group(['prefix' => 'admin', 'middleware' => ['auth', 'verified']], function () {
    Route::prefix('roles-permissions')->group(function () {
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
});
