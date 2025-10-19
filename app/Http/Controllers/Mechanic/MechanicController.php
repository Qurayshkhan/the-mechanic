<?php

namespace App\Http\Controllers\Mechanic;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MechanicController extends Controller
{
    public function createGatherInformationForm()
    {
        return Inertia::render('Mechanic/Register/GatherMechanicForm');
    }
}
