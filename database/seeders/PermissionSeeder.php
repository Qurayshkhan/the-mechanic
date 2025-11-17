<?php

namespace Database\Seeders;

use App\Models\Module;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        $modules = [
            "User Types" => [
                'admin',
                'mechanic',
                'customer',
                'vendor'
            ],
            'Dashboard' => ['view_dashboard'],
            'Roles & Permissions' => [
                'view_role_and_permission',
                'create_role',
                'store_role',
                'edit_role',
                'update_role',
                'delete_role',
                'view_permissions',
                'edit_permissions',
            ],
            'Users Management' => [
                'view_users',
                'create_user',
                'store_user',
                'edit_user',
                'update_user',
                'delete_user',
                'view_mechanics'
            ],
            'Profile Management' => [
                'view_profile',
                'edit_avatar',
                'edit_profile_information',
                'update_profile_password',
                'delete_account',
            ],
        ];


        foreach ($modules as $moduleName => $permissions) {
            $module = Module::firstOrCreate(['name' => $moduleName]);

            foreach ($permissions as $permissionName) {
                Permission::firstOrCreate([
                    'name' => $permissionName,
                    'guard_name' => 'web',
                    'module_id' => $module->id,
                ]);
            }
        }
    }
}
