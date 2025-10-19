<?php

namespace App\Providers;

use App\Interface\RolesAndPermissionInterface;
use App\Repositories\RolesAndPermissionRepository;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;
use Route;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        app()->bind(
            RolesAndPermissionInterface::class,
            RolesAndPermissionRepository::class
        );

    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);
        Inertia::share([
            'currentRouteName' => function () {
                return Route::currentRouteName();
            }
        ]);
    }
}
