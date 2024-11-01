<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['name']);
            $table->string('first_name', 50);
            $table->string('last_name', 50);
            $table->string('user_name', 16);
            $table->date('birth_date');
            $table->boolean('admin')->default(false);
            // Add other properties as needed
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['first_name', 'last_name', 'user_name', 'birth_date']);
            $table->string('name');
        });
    }
};
