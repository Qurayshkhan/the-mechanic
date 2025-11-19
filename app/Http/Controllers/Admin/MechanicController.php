<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Services\MechanicService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redirect;
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

    public function updateStatus(Request $request, User $user)
    {
        try {
            DB::beginTransaction();
            $this->mechanicService->mechanicUpdateService($user->id, $request->all());
            DB::commit();
            return Redirect::route('admin.mechanics')->with('alert', $request->is_verified ? "Mechanic verified successfully" : "Mechanic unverified successfully.");
        } catch (\Exception $e) {
            Db::rollBack();
            return Redirect::back()->withErrors(['message' => $e->getMessage()]);
        }
    }
}
