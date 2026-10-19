<?php

use App\Http\Controllers\JugadorController;
use App\Http\Controllers\CarreraController;
use Illuminate\Support\Facades\Route;

// Página principal (antes: página_principal.html)
Route::view('/', 'inicio')->name('inicio');

Route::controller(CarreraController::class)
    ->prefix('carrera')
    ->name('carrera.')
    ->group(function () {
        Route::get('/', 'index')->name('index');
        Route::get('equipos', 'equipos')->name('equipos');
        Route::get('retro.css', 'styles')->name('styles');
        Route::get('app.js', 'script')->name('script');
    });

// Jugadores (antes: crear_jugador.html + guardar_jugador.php)
Route::controller(JugadorController::class)
    ->prefix('jugadores')
    ->name('jugadores.')
    ->group(function () {
        Route::get('/', 'index')->name('index');          // entrar directo -> vuelve al formulario
        Route::get('crear', 'create')->name('create');    // formulario
        Route::post('/', 'store')->name('store');         // guarda
        Route::get('{jugador}', 'show')
            ->whereNumber('jugador')
            ->name('show');                               // pantalla "jugador creado"
    });

// Minijuegos (antes: Juego_de_memoria y Simon_dice_anananshe)
Route::prefix('juegos')->name('juegos.')->group(function () {
    Route::view('memoria', 'juegos.memoria')->name('memoria');
    Route::view('simon', 'juegos.simon')->name('simon');
});
