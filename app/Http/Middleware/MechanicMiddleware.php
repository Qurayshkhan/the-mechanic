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

        if ($user->type == UserType::MECHANIC->value) {
            $mechanicInfo = $user->mechanicInformation;


            if ((!$mechanicInfo || !$mechanicInfo->is_onboarding_form_complete)
                && !$request->routeIs('mechanic.registrationForm')
            ) {
                return redirect()->route('mechanic.registrationForm');
            }

            if (
                $mechanicInfo && $mechanicInfo->is_onboarding_form_complete && !$mechanicInfo->is_verified
                && !$request->routeIs('mechanic.waitingPage')
            ) {
                return redirect()->route('mechanic.waitingPage');
            }
        }
        return $next($request);
    }
}
