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
        $permissions = ['admin', 'mechanic', 'customer', 'vendor', 'view_dashboard', 'view_profile', 'view_role_and_permission', 'create_role', 'edit_role', 'update_role', 'delete_role', 'view_permissions', 'edit_permissions', 'view_users', 'create_user', 'edit_user', 'update_role', 'delete_user'];


        foreach ($permissions as $permission) {
            Permission::firstOrCreate(['name' => $permission]);
        }
    }
}
