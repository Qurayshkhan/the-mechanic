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
        Schema::table('mechanic_documents', function (Blueprint $table) {
            $table->string('workshop_photo_4')->nullable()->after('workshop_photo_3');
            $table->string('license_number')->nullable()->after('cnic_back');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('mechanic_documents', function (Blueprint $table) {
            $table->dropColumn(['workshop_photo_4', 'license_number']);
        });
    }
};
