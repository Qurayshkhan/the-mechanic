<?php

namespace App\Providers;

use App;
use App\Interface\RolesAndPermissionInterface;
use App\Interface\UserInterface;
use App\Repositories\RolesAndPermissionRepository;
use App\Repositories\UserRepository;
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
        $this->app->bind(
            RolesAndPermissionInterface::class,
            RolesAndPermissionRepository::class
        );

        $this->app->bind(
            UserInterface::class,
            UserRepository::class
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
            },
            'locale' => fn() => App::getLocale(),
            'dir' => fn() => App::getLocale() === 'ur' ? 'rtl' : 'ltr',
            'translations' => fn() => __('messages'),
        ]);
    }
}
