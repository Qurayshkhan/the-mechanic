<?php

namespace App\Providers;

use App;
use App\Interface\MechanicInformationInterface;
use App\Repositories\MechanicInformationRepository;
use App\Repositories\ModuleRepository;
use App\Interface\ModuleInterface;
use App\Interface\PermissionInterface;
use App\Interface\RoleInterface;
use App\Interface\UserInterface;
use App\Repositories\PermissionRepository;
use App\Repositories\RoleRepository;
use App\Repositories\UserRepository;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;
use Illuminate\Support\Facades\Lang;
use Route;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(
            RoleInterface::class,
            RoleRepository::class
        );
        $this->app->bind(
            PermissionInterface::class,
            PermissionRepository::class
        );

        $this->app->bind(
            UserInterface::class,
            UserRepository::class
        );
        $this->app->bind(
            ModuleInterface::class,
            ModuleRepository::class
        );
        $this->app->bind(
            MechanicInformationInterface::class,
            MechanicInformationRepository::class
        );
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        URL::forceRootUrl(config('app.url'));
        Vite::prefetch(concurrency: 3);
        Inertia::share([
            'currentRouteName' => function () {
                return Route::currentRouteName();
            },
            'locale' => fn() => App::getLocale(),
            'dir' => fn() => App::getLocale() === 'ur' ? 'rtl' : 'ltr',
            'translations' => fn() => Lang::get('messages'),
        ]);
    }
}
