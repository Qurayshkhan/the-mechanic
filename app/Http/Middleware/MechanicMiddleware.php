<?php

namespace App\Http\Middleware;

use App\Enums\UserType;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Symfony\Component\HttpFoundation\Response;

class MechanicMiddleware
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

        // dd($user->type == UserType::MECHANIC->value);

        if ($user->type == UserType::MECHANIC->value) {
            return Redirect::route('mechanic.registrationForm');
        }

        return $next($request);
    }
}
