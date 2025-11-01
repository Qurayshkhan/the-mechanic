<?php

use App\Models\MechanicType;
use App\Models\Skill;
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
        Schema::create('mechanic_information', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(User::class, 'mechanic_id')->nullable()->constrained('users')->cascadeOnDelete();
            $table->foreignIdFor(MechanicType::class)->nullable()->constrained('mechanic_types')->cascadeOnDelete();
            $table->string('work_shop_name')->nullable();
            $table->string('work_shop_address')->nullable();
            $table->boolean('is_verified')->default(false);
            $table->tinyInteger('step_position')->default(1);
            $table->string('years_of_experience')->nullable();
            $table->string('certificate')->nullable();
            $table->string('license_number')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('mechanic_information');
    }
};
