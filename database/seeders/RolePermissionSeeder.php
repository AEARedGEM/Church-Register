<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use App\Enum\RolesEnum;
use App\Enum\PermissionsEnum;

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
        $this->createPermissions();

        // Create roles and assign permissions
        $this->createRoles();

        $this->command->info('APGA Worldwide Roles and Permissions seeded successfully!');
    }

    private function createPermissions(): void
    {
        $this->command->info('Creating permissions...');

        // Create ALL permissions from the enum
        foreach (PermissionsEnum::cases() as $permission) {
            Permission::firstOrCreate([
                'name' => $permission->value,
                'guard_name' => 'web'
            ]);
        }

        $this->command->info('Created ' . count(PermissionsEnum::cases()) . ' permissions.');
    }

    private function createRoles(): void
    {
        $this->command->info('Creating roles and assigning permissions...');

        foreach (RolesEnum::cases() as $roleEnum) {
            $this->command->info("Creating role: {$roleEnum->label()}");

            // Create role
            $role = Role::firstOrCreate([
                'name' => $roleEnum->value,
                'guard_name' => 'web'
            ]);

            // Get permissions for this role
            $permissions = PermissionsEnum::getRolePermissions($roleEnum);

            // Sync permissions to role
            $role->syncPermissions($permissions);

            $this->command->info("  - Assigned " . count($permissions) . " permissions");
        }
    }
}
