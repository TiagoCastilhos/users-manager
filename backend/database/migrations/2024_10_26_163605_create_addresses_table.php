<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Models\Address;
use App\Models\User;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('addresses', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('country', 50);
            $table->string('state', 50);
            $table->string('city', 100);
            $table->foreignIdFor(User::class)->constrained()->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('addresses');
    }
};
