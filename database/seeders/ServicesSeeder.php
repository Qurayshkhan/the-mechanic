<?php

namespace Database\Seeders;

use App\Models\Services;
use App\Models\MechanicType;
use Illuminate\Database\Seeder;

class ServicesSeeder extends Seeder
{
    public function run(): void
    {
        Services::query()->delete();

        $services = [
            'Bike' => [
                ['name' => 'Bike Engine Tuning', 'charges' => 800, 'description' => 'Fine-tuning engine performance and throttle response for smoother rides.', 'type' => 'onsite'],
                ['name' => 'Oil Change', 'charges' => 500, 'description' => 'Drain old oil, replace oil filter, and refill with premium engine oil.', 'type' => 'home'],
                ['name' => 'Brake Adjustment', 'charges' => 400, 'description' => 'Adjust and test brake levers, pads, and cables for optimal braking power.', 'type' => 'onsite'],
                ['name' => 'Chain & Sprocket Maintenance', 'charges' => 600, 'description' => 'Clean, lubricate, and adjust chain and sprocket for longer lifespan.', 'type' => 'home'],
                ['name' => 'Electrical System Check', 'charges' => 700, 'description' => 'Inspect battery, wiring, and lights for faults or short circuits.', 'type' => 'onsite'],
            ],
            'Car' => [
                ['name' => 'Car Engine Tuning & Diagnostics', 'charges' => 2500, 'description' => 'Electronic tuning and diagnostics to enhance engine efficiency and performance.', 'type' => 'onsite'],
                ['name' => 'Oil & Filter Change', 'charges' => 1500, 'description' => 'Replace engine oil and filter to maintain engine health.', 'type' => 'home'],
                ['name' => 'Brake Inspection & Repair', 'charges' => 1800, 'description' => 'Inspect brake pads, discs, and fluid for safe and responsive braking.', 'type' => 'onsite'],
                ['name' => 'Suspension & Alignment Check', 'charges' => 2500, 'description' => 'Check wheel alignment, shocks, and suspension components.', 'type' => 'onsite'],
                ['name' => 'AC & Cooling System Service', 'charges' => 3000, 'description' => 'Inspect and service AC gas, filters, and cooling components.', 'type' => 'home'],
            ],
            'Bus' => [
                ['name' => 'Bus Diesel Engine Tuning', 'charges' => 5000, 'description' => 'Optimize diesel engine timing and fuel injection for better mileage.', 'type' => 'onsite'],
                ['name' => 'Brake System Overhaul', 'charges' => 4500, 'description' => 'Full brake system service including air and hydraulic lines.', 'type' => 'onsite'],
                ['name' => 'Transmission & Clutch Service', 'charges' => 4000, 'description' => 'Inspect and service clutch plates, gearbox, and fluid levels.', 'type' => 'onsite'],
                ['name' => 'Suspension & Steering Check', 'charges' => 3500, 'description' => 'Ensure smooth handling by checking suspension and steering joints.', 'type' => 'onsite'],
                ['name' => 'Cooling System Maintenance', 'charges' => 3000, 'description' => 'Flush radiator, refill coolant, and check for leaks.', 'type' => 'home'],
            ],
            'Truck' => [
                ['name' => 'Truck Engine Tuning & Calibration', 'charges' => 5500, 'description' => 'Adjust and calibrate heavy-duty engine for optimal power output.', 'type' => 'onsite'],
                ['name' => 'Brake & Air System Inspection', 'charges' => 4500, 'description' => 'Test and maintain air brake systems for safety and compliance.', 'type' => 'onsite'],
                ['name' => 'Oil & Filter Replacement', 'charges' => 3500, 'description' => 'Change oil and filters to extend engine life.', 'type' => 'home'],
                ['name' => 'Transmission & Differential Service', 'charges' => 4000, 'description' => 'Inspect and service transmission and differential fluids.', 'type' => 'onsite'],
                ['name' => 'Suspension & Axle Alignment', 'charges' => 3800, 'description' => 'Adjust and align axles to prevent uneven tire wear.', 'type' => 'onsite'],
            ],
        ];

        foreach ($services as $type => $items) {
            $mechanicType = MechanicType::where('name', $type)->first();

            if ($mechanicType) {
                foreach ($items as $service) {
                    Services::create([
                        'mechanic_type_id' => $mechanicType->id,
                        'name' => $service['name'],
                        'charges' => $service['charges'],
                        'type' => $service['type'],
                        'description' => $service['description'],
                        'status' => true,
                    ]);
                }
            }
        }
    }
}
