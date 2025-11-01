<?php

namespace Database\Seeders;

use App\Models\Module;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ModuleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $modules = [
            [
                'Profile Management',
            ],
            [
                'name' => 'Dashboard',
            ],
            [
                'name' => 'Roles & Permissions',
            ],
            [
                'name' => 'Users Management',
            ],
        ];

        Module::insert($modules);
    }
}
