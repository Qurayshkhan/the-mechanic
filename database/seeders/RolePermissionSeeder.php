<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RolePermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Reset cached roles and permissions
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // Create permissions
        $permissions = [
            // User Management
            'view users',
            'create users',
            'edit users',
            'delete users',

            // Role Management
            'view roles',
            'create roles',
            'edit roles',
            'delete roles',
            'manage roles',

            // Permission Management
            'view permissions',
            'create permissions',
            'edit permissions',
            'delete permissions',
            'manage permissions',

            // Content Management
            'view posts',
            'create posts',
            'edit posts',
            'delete posts',
            'publish posts',

            // Category Management
            'view categories',
            'create categories',
            'edit categories',
            'delete categories',

            // Comment Management
            'view comments',
            'create comments',
            'edit comments',
            'delete comments',
            'moderate comments',

            // Media Management
            'view media',
            'upload media',
            'edit media',
            'delete media',

            // Settings Management
            'view settings',
            'edit settings',
            'manage settings',

            // Reports Management
            'view reports',
            'create reports',
            'export reports',

            // Dashboard Access
            'view dashboard',
            'view admin dashboard',

            // Profile Management
            'view profile',
            'edit profile',
            'delete profile',
        ];

        foreach ($permissions as $permission) {
            Permission::create(['name' => $permission, 'guard_name' => 'web']);
        }

        // Create roles and assign permissions
        $this->createSuperAdminRole();
        $this->createAdminRole();
        $this->createEditorRole();
        $this->createAuthorRole();
        $this->createModeratorRole();
        $this->createUserRole();
    }

    private function createSuperAdminRole()
    {
        $role = Role::create(['name' => 'super_admin', 'guard_name' => 'web']);
        $role->givePermissionTo(Permission::all());
    }

    private function createAdminRole()
    {
        $role = Role::create(['name' => 'admin', 'guard_name' => 'web']);
        $role->givePermissionTo([
            'view users',
            'create users',
            'edit users',
            'delete users',
            'view roles',
            'create roles',
            'edit roles',
            'delete roles',
            'manage roles',
            'view permissions',
            'create permissions',
            'edit permissions',
            'delete permissions',
            'manage permissions',
            'view posts',
            'create posts',
            'edit posts',
            'delete posts',
            'publish posts',
            'view categories',
            'create categories',
            'edit categories',
            'delete categories',
            'view comments',
            'create comments',
            'edit comments',
            'delete comments',
            'moderate comments',
            'view media',
            'upload media',
            'edit media',
            'delete media',
            'view settings',
            'edit settings',
            'manage settings',
            'view reports',
            'create reports',
            'export reports',
            'view dashboard',
            'view admin dashboard',
            'view profile',
            'edit profile',
        ]);
    }

    private function createEditorRole()
    {
        $role = Role::create(['name' => 'editor', 'guard_name' => 'web']);
        $role->givePermissionTo([
            'view users',
            'view posts',
            'create posts',
            'edit posts',
            'delete posts',
            'publish posts',
            'view categories',
            'create categories',
            'edit categories',
            'view comments',
            'create comments',
            'edit comments',
            'delete comments',
            'moderate comments',
            'view media',
            'upload media',
            'edit media',
            'delete media',
            'view reports',
            'create reports',
            'view dashboard',
            'view profile',
            'edit profile',
        ]);
    }

    private function createAuthorRole()
    {
        $role = Role::create(['name' => 'author', 'guard_name' => 'web']);
        $role->givePermissionTo([
            'view posts',
            'create posts',
            'edit posts',
            'delete posts',
            'view categories',
            'view comments',
            'create comments',
            'edit comments',
            'view media',
            'upload media',
            'edit media',
            'view dashboard',
            'view profile',
            'edit profile',
        ]);
    }

    private function createModeratorRole()
    {
        $role = Role::create(['name' => 'moderator', 'guard_name' => 'web']);
        $role->givePermissionTo([
            'view users',
            'view posts',
            'edit posts',
            'view categories',
            'view comments',
            'create comments',
            'edit comments',
            'delete comments',
            'moderate comments',
            'view media',
            'view reports',
            'view dashboard',
            'view profile',
            'edit profile',
        ]);
    }

    private function createUserRole()
    {
        $role = Role::create(['name' => 'user', 'guard_name' => 'web']);
        $role->givePermissionTo([
            'view posts',
            'view categories',
            'view comments',
            'create comments',
            'edit comments',
            'view media',
            'view dashboard',
            'view profile',
            'edit profile',
        ]);
    }
}
