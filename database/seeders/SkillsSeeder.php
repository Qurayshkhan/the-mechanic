<?php

namespace Database\Seeders;

use App\Models\MechanicType;
use App\Models\Skill;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SkillsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Skill::query()->delete();

        $skills = [
            'Bike' => [
                'Engine Tuning',
                'Chain Adjustment',
                'Brake Pad Replacement',
                'Oil Change',
                'Clutch Repair',
                'Electrical Systems',
                'Tyre Replacement',
            ],
            'Car' => [
                'Engine Repair',
                'Brake Service & Replacement',
                'Transmission Repair',
                'Oil Change & Lubrication',
                'AC & Heating Service',
                'Suspension & Steering',
                'Wheel Alignment & Balancing',
                'Electrical Diagnostics',
            ],
            'Bus' => [
                'Diesel Engine Maintenance',
                'Brake Air System',
                'Transmission Repair',
                'Suspension & Steering',
                'Cooling System Service',
                'Electrical Systems',
            ],
            'Truck' => [
                'Diesel Engine Overhaul',
                'Hydraulic System Maintenance',
                'Clutch & Gearbox Repair',
                'Brake & Air Line Service',
                'Electrical Diagnostics',
                'Wheel Balancing',
            ],
        ];

        foreach ($skills as $typeName => $skillList) {
            $mechanicType = MechanicType::where('name', $typeName)->first();

            if ($mechanicType) {
                foreach ($skillList as $skillName) {
                    Skill::create([
                        'mechanic_type_id' => $mechanicType->id,
                        'name' => $skillName,
                    ]);
                }
            }
        }
    }
}
