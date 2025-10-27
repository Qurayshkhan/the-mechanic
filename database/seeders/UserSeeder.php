<?php

namespace Database\Seeders;

use App\Models\User;
use Carbon\Carbon;
use Hash;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */

    public function run(): void
    {

        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();
        $adminPermission = Permission::firstOrCreate(['name' => 'admin']);
        $mechanicPermission = Permission::firstOrCreate(['name' => 'mechanic']);
        $customerPermission = Permission::firstOrCreate(['name' => 'customer']);

        $permissions = ['view_dashboard', 'view_profile', 'view_role_and_permission', 'create_role', 'edit_role', 'update_role', 'delete_role', 'view_permissions', 'edit_permissions', 'view_users', 'create_user', 'edit_user', 'update_role', 'delete_user'];


        foreach ($permissions as $permission) {
            Permission::firstOrCreate(['name' => $permission]);
        }




        $adminRole = Role::firstOrCreate(['name' => 'admin']);
        $mechanicRole = Role::firstOrCreate(['name' => 'mechanic']);
        $customerRole = Role::firstOrCreate(['name' => 'customer']);

        $adminRole->givePermissionTo($adminPermission);
        $adminRole->givePermissionTo($permissions);
        $mechanicRole->givePermissionTo($mechanicPermission);
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
