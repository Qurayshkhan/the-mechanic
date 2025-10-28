<?php

namespace Database\Seeders;

use App\Models\User;
use Carbon\Carbon;
use Hash;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Spatie\Permission\PermissionRegistrar;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */

    public function run(): void
    {

        app()[PermissionRegistrar::class]->forgetCachedPermissions();


        $adminRole = Role::where('name', 'admin')->firstOrFail();
        $mechanicRole = Role::where('name', 'mechanic')->firstOrFail();
        $customerRole = Role::where('name', 'customer')->firstOrFail();


        $adminPermissions = Permission::all();


        $mechanicPermission = Permission::where('name', 'view_dashboard')->first();
        $customerPermission = Permission::where('name', 'view_dashboard')->first();

        $adminRole->syncPermissions($adminPermissions);
        if ($mechanicPermission)
            $mechanicRole->givePermissionTo($mechanicPermission);
        if ($customerPermission)
            $customerRole->givePermissionTo($customerPermission);

        $adminUser = User::updateOrCreate(
            ['email' => 'admin@gmail.com'],
            [
                'name' => 'Admin',
                'password' => Hash::make('admin123'),
                'type' => User::ADMIN_USER,
                'email_verified_at' => Carbon::now(),
            ]
        );
        $adminUser->assignRole($adminRole);


        $mechanicUser = User::updateOrCreate(
            ['email' => 'mechanic@gmail.com'],
            [
                'name' => 'Mechanic',
                'password' => Hash::make('mechanic123'),
                'type' => User::MECHANIC_USER,
                'email_verified_at' => Carbon::now(),
            ]
        );
        $mechanicUser->assignRole($mechanicRole);


        $customerUser = User::updateOrCreate(
            ['email' => 'customer@gmail.com'],
            [
                'name' => 'Customer',
                'password' => Hash::make('customer123'),
                'type' => User::CUSTOMER_USER,
                'email_verified_at' => Carbon::now(),
            ]
        );
        $customerUser->assignRole($customerRole);
    }
}

