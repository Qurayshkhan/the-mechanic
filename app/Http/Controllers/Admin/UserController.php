<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Repositories\UserRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    protected $userRepository;

    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }
    public function index(Request $request)
    {
        return Inertia::render('Admin/Users/Report', [
            'users' => Inertia::defer(fn() => $this->userRepository->users($request)),
        ]);
    }
}
