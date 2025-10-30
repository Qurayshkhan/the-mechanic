<?php

namespace Database\Seeders;

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
        $permissions = ['admin', 'mechanic', 'customer', 'vendor', 'view_dashboard', 'view_profile', 'view_role_and_permission', 'create_role', 'store_role', 'edit_role', 'update_role', 'delete_role', 'view_permissions', 'edit_permissions', 'view_users', 'create_user', 'store_user', 'edit_user', 'update_user', 'delete_user', 'view_profile', 'edit_avatar', 'edit_profile_information', 'update_profile_password', 'delete_account'];


        foreach ($permissions as $permission) {
            Permission::firstOrCreate(['name' => $permission]);
        }
    }
}
