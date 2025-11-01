<?php

namespace App\Http\Controllers\Mechanic;

use App\Http\Controllers\Controller;
use App\Services\UserService;
use Auth;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MechanicController extends Controller
{

    protected $userService;

    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }
    public function createGatherInformationForm()
    {
        return Inertia::render('Mechanic/Onboarding/Form');
    }

    public function updateRegistrationForm(Request $request)
    {
        // dd($request->all());
        if ($request->input('step_position') == 1) {
            $user =
                $this->userService->updateUser($this->userService->getUserById(Auth::id()), $request->all());
        }
    }
}
