<?php

namespace App\Http\Controllers\Mechanic;

use App\Http\Controllers\Controller;
use App\Services\MechanicService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
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
        $user = $request->user();
        return Inertia::render('Mechanic/Onboarding/Form', [
            'mechanicTypes' => $this->mechanicService->getAllMechanicTypes(),
            'skills' => $this->mechanicService->getSkillsByMechanicType(),
            'services' => $this->mechanicService->getAllServicesByMechanicType($user?->mechanicInformation?->mechanic_type_id),
            'mechanicServices' => $this->mechanicService->getMechanicServices($user?->id ?? null),
            'filters' => [
                'mechanic_type_id' => $request->input('mechanic_type_id', ""),
            ]
        ]);
    }

    public function updateRegistrationForm(Request $request)
    {
        try {
            DB::beginTransaction();
            $this->mechanicService->updateMechanicOnBoardingForm(Auth::id(), $request->all());
            DB::commit();
            return Redirect::route("mechanic.registrationForm");
        } catch (\Exception $e) {
            info($e->getMessage());
            DB::rollBack();
            Redirect::back()->withErrors(['message' => $e->getMessage()]);
        }
    }

    public function createService(Request $request)
    {
        try {
            DB::beginTransaction();
            $this->mechanicService->createMechanicService($request->all());
            DB::commit();
            return Redirect::route('mechanic.registrationForm');
        } catch (\Exception $e) {
            DB::rollBack();
            Redirect::back()->withErrors(['message' => $e->getMessage()]);
        }
    }

    public function storeMechanicService(Request $request)
    {
        try {
            DB::beginTransaction();
            $this->mechanicService->storeMechanicService($request->all());
            DB::commit();
            return Redirect::back();
        } catch (\Exception $e) {
            DB::rollBack();
            return Redirect::back()->withErrors(['message' => $e->getMessage()]);
        }
    }

    public function deleteMechanicService($id)
    {
        try {
            DB::beginTransaction();
            $this->mechanicService->deleteMechanicService($id);
            DB::commit();
            return Redirect::back();
        } catch (\Exception $e) {
            DB::rollBack();
            return Redirect::back()->withErrors(['message' => $e->getMessage()]);
        }
    }

    public function storeDocuments(Request $request)
    {
        try {
            $request->validate([
                'cnic_front' => 'required|image|mimes:jpeg,png,jpg|max:2048',
                'cnic_back' => 'required|image|mimes:jpeg,png,jpg|max:2048',
                'workshop_photo_1' => 'required|image|mimes:jpeg,png,jpg|max:2048',
                'workshop_photo_2' => 'required|image|mimes:jpeg,png,jpg|max:2048',
                'workshop_photo_3' => 'required|image|mimes:jpeg,png,jpg|max:2048',
                'workshop_photo_4' => 'required|image|mimes:jpeg,png,jpg|max:2048',
                'license_number' => 'nullable|string|max:255',
            ]);

            DB::beginTransaction();
            $this->mechanicService->storeMechanicDocuments(Auth::id(), $request->all());
            DB::commit();
            return Redirect::route("mechanic.waitingPage")->with('success', 'Documents uploaded successfully!');
        } catch (\Illuminate\Validation\ValidationException $e) {
            DB::rollBack();
            return Redirect::back()->withErrors($e->errors())->withInput();
        } catch (\Exception $e) {
            DB::rollBack();
            return Redirect::back()->withErrors(['message' => $e->getMessage()])->withInput();
        }
    }

    public function waiting()
    {
        return Inertia::render('Mechanic/Onboarding/Waiting');
    }
}
