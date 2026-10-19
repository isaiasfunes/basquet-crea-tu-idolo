<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('equipos', function (Blueprint $table) {
            if (!Schema::hasColumn('equipos', 'liga')) {
                $table->string('liga', 8)->default('NBA');
            }

            if (!Schema::hasColumn('equipos', 'minima')) {
                $table->unsignedInteger('minima')->default(78);
            }
        });
    }

    public function down(): void
    {
        Schema::table('equipos', function (Blueprint $table) {
            if (Schema::hasColumn('equipos', 'minima')) {
                $table->dropColumn('minima');
            }

            if (Schema::hasColumn('equipos', 'liga')) {
                $table->dropColumn('liga');
            }
        });
    }
};