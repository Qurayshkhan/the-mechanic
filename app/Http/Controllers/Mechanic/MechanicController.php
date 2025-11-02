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

}
