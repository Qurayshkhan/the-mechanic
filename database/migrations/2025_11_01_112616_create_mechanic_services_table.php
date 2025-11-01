<?php

use App\Models\Services;
use App\Models\User;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('mechanic_services', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(User::class, 'mechanic_id')->nullable()->constrained('users')->cascadeOnDelete();
            $table->foreignIdFor(Services::class)->nullable()->constrained('services')->cascadeOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('mechanic_services');
    }
};
