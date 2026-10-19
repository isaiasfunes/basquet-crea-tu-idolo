<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

// Equivale a jugadores.sql (CREATE TABLE IF NOT EXISTS)
return new class extends Migration
{
    public function up(): void
    {
        if (Schema::hasTable('jugadores')) {
            return;
        }

        Schema::create('jugadores', function (Blueprint $table) {
            $table->id();
            $table->string('nombre', 50);
            $table->string('posicion', 2);   // PG, SG, SF, PF, C
            $table->integer('velocidad');
            $table->integer('tiro');
            $table->integer('rebote');
            $table->integer('pase');
            $table->integer('defensa');
            $table->timestamp('fecha_creacion')->useCurrent();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('jugadores');
    }
};
