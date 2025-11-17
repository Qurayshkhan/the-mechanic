<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\MechanicService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MechanicController extends Controller
{
    protected $mechanicService;
    public function __construct(MechanicService $mechanicService)
    {
        $this->mechanicService = $mechanicService;
    }


    public function index()
    {
        $mechanics = $this->mechanicService->getMechanics();
        return Inertia::render("Admin/Mechanics/Report", [
            'mechanics' => Inertia::defer(fn() => $mechanics),
        ]);
    }
}
