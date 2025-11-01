<?php

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
        Schema::create('mechanic_documents', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(User::class, 'mechanic_id')->nullable()->constrained('users')->cascadeOnDelete();
            $table->string('workshop_photo_1')->nullable();
            $table->string('workshop_photo_2')->nullable();
            $table->string('workshop_photo_3')->nullable();
            $table->string('cnic_front')->nullable();
            $table->string('cnic_back')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('mechanic_documents');
    }
};
