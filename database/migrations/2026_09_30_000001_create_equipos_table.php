<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

// Equivale a equipos.sql
return new class extends Migration
{
    public function up(): void
    {
        // Si la tabla ya existe (creada con el .sql viejo) no se vuelve a crear.
        if (Schema::hasTable('equipos')) {
            return;
        }

        Schema::create('equipos', function (Blueprint $table) {
            $table->id();
            $table->string('nombre', 50);
            $table->string('abreviatura', 3);
            $table->string('ciudad', 50);
            $table->string('estado', 5);
            $table->string('conferencia', 5);
            $table->string('division', 20);
            $table->string('arena', 60);
            $table->integer('fundado');
            $table->string('color_primario', 7);
            $table->string('color_secundario', 7);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('equipos');
    }
};
