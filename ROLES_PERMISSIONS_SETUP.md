# Roles & Permissions CRUD System

A comprehensive, professional CRUD system for managing roles and permissions using the Spatie Laravel Permission package.

## Features

### 🎯 Core Functionality

-   **Complete CRUD Operations** for both roles and permissions
-   **Professional UI** with modern design and responsive layout
-   **Advanced Search & Filtering** with real-time results
-   **Pagination** with customizable page sizes
-   **Bulk Operations** for managing multiple items
-   **Role-Permission Assignment** with intuitive modals
-   **Comprehensive Validation** with real-time error handling
-   **Flash Messages** for success/error notifications

### 🔧 Technical Features

-   **Laravel 10+** compatible
-   **Inertia.js** for seamless SPA experience
-   **React 18** with modern hooks
-   **Tailwind CSS** for styling
-   **Heroicons** for consistent iconography
-   **Database Transactions** for data integrity
-   **Middleware Protection** for route security
-   **Comprehensive Error Handling**

## Installation & Setup

### 1. Install Spatie Laravel Permission Package

```bash
composer require spatie/laravel-permission
```

### 2. Publish and Run Migrations

```bash
php artisan vendor:publish --provider="Spatie\Permission\PermissionServiceProvider"
php artisan migrate
```

### 3. Add Trait to User Model

Add the `HasRoles` trait to your User model:

```php
// app/Models/User.php
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    use HasRoles;

    // ... rest of your model
}
```

### 4. Seed Initial Data

Run the seeder to create initial roles and permissions:

```bash
php artisan db:seed --class=RolePermissionSeeder
```

### 5. Configure Middleware (Optional)

If you want to use permission-based middleware, add this to your `app/Http/Kernel.php`:

```php
protected $routeMiddleware = [
    // ... other middleware
    'permission' => \Spatie\Permission\Middlewares\PermissionMiddleware::class,
    'role' => \Spatie\Permission\Middlewares\RoleMiddleware::class,
    'role_or_permission' => \Spatie\Permission\Middlewares\RoleOrPermissionMiddleware::class,
];
```

## File Structure

```
app/Http/Controllers/Admin/
├── RoleAndPermissionController.php    # Main controller with all CRUD operations

resources/js/Pages/Admin/RoleAndPermissions/
├── Report.jsx                         # Main listing page with search/filter
├── Create.jsx                         # Create new role form
├── Edit.jsx                           # Edit existing role form
├── Show.jsx                           # View role details
└── CreatePermission.jsx               # Create new permission form

resources/js/Components/
└── FlashMessages.jsx                  # Reusable flash message component

database/seeders/
└── RolePermissionSeeder.php           # Initial roles and permissions

routes/
└── admin.php                          # Admin routes configuration
```

## Usage

### Accessing the System

Navigate to `/admin/roles-permissions` to access the main interface.

### Creating Roles

1. Click "New Role" button
2. Fill in role name and guard name
3. Select permissions from organized groups
4. Save the role

### Managing Permissions

1. Switch to "Permissions" tab in the main interface
2. Click "New Permission" to create individual permissions
3. Use the assignment modals to assign permissions to roles

### Role-Permission Assignment

-   **From Role View**: Click the shield icon next to any role
-   **From Permission View**: Click the users icon next to any permission
-   Use the intuitive checkbox interface to manage assignments

## API Endpoints

### Roles

-   `GET /admin/roles-permissions` - List roles/permissions
-   `GET /admin/roles-permissions/create` - Show create form
-   `POST /admin/roles-permissions/store` - Store new role
-   `GET /admin/roles-permissions/{role}` - Show role details
-   `GET /admin/roles-permissions/{role}/edit` - Show edit form
-   `PUT /admin/roles-permissions/{role}` - Update role
-   `DELETE /admin/roles-permissions/{role}` - Delete role

### Permissions

-   `GET /admin/roles-permissions/permissions/create` - Show create permission form
-   `POST /admin/roles-permissions/permissions/store` - Store new permission
-   `DELETE /admin/roles-permissions/permissions/{permission}` - Delete permission

### Assignments

-   `PUT /admin/roles-permissions/{role}/permissions` - Update role permissions
-   `PUT /admin/roles-permissions/permissions/{permission}/roles` - Update permission roles

## Security Features

### Validation Rules

-   **Role Names**: Required, unique, max 255 characters
-   **Guard Names**: Required, must be 'web' or 'api'
-   **Permissions**: Array validation with existence checks

### Safety Checks

-   **Deletion Protection**: Prevents deletion of roles/permissions in use
-   **User Assignment Check**: Warns before deleting roles assigned to users
-   **Database Transactions**: Ensures data consistency

### Middleware Protection

```php
// Uncomment in RoleAndPermissionController constructor when ready
$this->middleware('permission:view roles|manage roles', ['only' => ['index', 'show']]);
$this->middleware('permission:create roles', ['only' => ['create', 'store']]);
$this->middleware('permission:edit roles', ['only' => ['edit', 'update']]);
$this->middleware('permission:delete roles', ['only' => ['destroy']]);
```

## Customization

### Adding New Permission Groups

1. Update the `RolePermissionSeeder.php` with new permissions
2. The UI automatically groups permissions by the first word
3. Run the seeder to add new permissions

### Styling Customization

The system uses Tailwind CSS classes. Key customization points:

-   Color scheme: Modify blue/green/red color classes
-   Layout: Adjust grid and spacing classes
-   Components: Update Card, Button, and Modal styles

### Adding New Features

The modular structure makes it easy to extend:

-   Add new controller methods for additional functionality
-   Create new React components for specialized views
-   Extend the seeder for more complex permission structures

## Troubleshooting

### Common Issues

1. **Permission Package Not Found**

    ```bash
    composer require spatie/laravel-permission
    php artisan vendor:publish --provider="Spatie\Permission\PermissionServiceProvider"
    ```

2. **Migration Errors**

    ```bash
    php artisan migrate:fresh
    php artisan db:seed --class=RolePermissionSeeder
    ```

3. **Middleware Not Working**

    - Ensure the middleware is registered in `Kernel.php`
    - Check that users have the required permissions
    - Verify the `HasRoles` trait is added to User model

4. **Flash Messages Not Showing**
    - Ensure `FlashMessages` component is included in layout
    - Check that flash data is being passed from controller

## Contributing

When extending this system:

1. Follow the existing code structure and naming conventions
2. Add proper validation and error handling
3. Include comprehensive comments for complex logic
4. Test all CRUD operations thoroughly
5. Update this documentation for new features

## License

This roles and permissions system is part of your Laravel application and follows the same license terms.
