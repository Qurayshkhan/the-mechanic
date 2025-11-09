<?php

namespace App\Http\Middleware;

use App\Enums\UserType;
use App\Models\MechanicType;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Symfony\Component\HttpFoundation\Response;

class IsVerifiedMechanicMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();
        if (empty($user)) {
            return Redirect::route('login');
        }
        if ($user->type == UserType::MECHANIC->value) {
            if ($user && $user->mechanicInformation->is_verified) {
                return Redirect::route('dashboard');
            }
        }
        return $next($request);
    }
}
