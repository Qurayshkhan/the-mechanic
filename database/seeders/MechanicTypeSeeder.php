<?php

namespace Database\Seeders;

use App\Models\MechanicType;
use DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class MechanicTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        MechanicType::query()->delete();
        MechanicType::insert([
            ['name' => 'Car'],
            ['name' => 'Bike'],
            ['name' => 'Bus'],
            ['name' => 'Truck'],
        ]);
    }
}
