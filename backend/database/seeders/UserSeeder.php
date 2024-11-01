<?php

namespace Database\Seeders;

use Date;
use Illuminate\Database\Seeder;
use App\Models\User;
use Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        if (!User::where('email', 'super@admin.com')->exists()) {
            User::factory()->create([
                'first_name' => 'Super',
                'last_name' => 'Admin',
                'user_name' => 'super_admin',
                'email' => 'super@admin.com',
                'password' => Hash::make('1234'),
                'admin' => true,
                'birth_date' => Date::parse("2024-10-26 08:00:00")
            ]);
        }
    }
}
