<?php

namespace App\Http\Controllers\Mechanic;

use App\Http\Controllers\Controller;
use App\Services\MechanicService;
use Auth;
use DB;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class MechanicOnboardingController extends Controller
{
    protected $mechanicService;

    public function __construct(MechanicService $mechanicService)
    {
        $this->mechanicService = $mechanicService;
    }

    public function createGatherInformationForm(Request $request)
    {

        return Inertia::render('Mechanic/Onboarding/Form', [
            'mechanicTypes' => $this->mechanicService->getAllMechanicTypes(),
            'skills' => $this->mechanicService->getSkillsByMechanicType($request->mechanic_type_id)
        ]);
    }

    public function updateRegistrationForm(Request $request)
    {
        try {
            DB::beginTransaction();
            $this->mechanicService->updateMechanicOnBoardingForm(Auth::id(), $request->all());
            DB::commit();
            return redirect()->route("mechanic.registrationForm");
        } catch (\Exception $e) {
            info($e->getMessage());
            DB::rollBack();
            Redirect::back()->withErrors(['message' => $e->getMessage()]);
        }
    }
}
