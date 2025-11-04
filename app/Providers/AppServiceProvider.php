<?php

namespace App\Providers;

use App;
use App\Interface\MechanicInformationInterface;
use App\Interface\MechanicServiceInterface;
use App\Interface\ServiceInterface;
use App\Repositories\MechanicInformationRepository;
use App\Repositories\MechanicServiceRepository;
use App\Repositories\ModuleRepository;
use App\Interface\ModuleInterface;
use App\Interface\PermissionInterface;
use App\Interface\RoleInterface;
use App\Interface\UserInterface;
use App\Repositories\PermissionRepository;
use App\Repositories\RoleRepository;
use App\Repositories\ServiceRepository;
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
        $repositories = [
            RoleInterface::class => RoleRepository::class,
            PermissionInterface::class => PermissionRepository::class,
            UserInterface::class => UserRepository::class,
            ModuleInterface::class => ModuleRepository::class,
            MechanicInformationInterface::class => MechanicInformationRepository::class,
            ServiceInterface::class => ServiceRepository::class,
            MechanicServiceInterface::class => MechanicServiceRepository::class,
        ];

        foreach ($repositories as $interface => $repository) {
            $this->app->bind($interface, $repository);
        }
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
