<?php

namespace App\Http\Controllers;

use App\Enums\Posicion;
use App\Http\Requests\StoreJugadorRequest;
use App\Models\Jugador;
use Illuminate\Database\QueryException;
use Illuminate\Http\RedirectResponse;
use Illuminate\View\View;

class JugadorController extends Controller
{
    /**
     * Antes: guardar_jugador.php redirigía a crear_jugador.html si se entraba
     * sin enviar el formulario. Se mantiene ese comportamiento.
     */
    public function index(): RedirectResponse
    {
        return redirect()->route('jugadores.create');
    }

    /** Formulario (antes: crear_jugador.html). */
    public function create(): View
    {
        return view('jugadores.create', [
            'posiciones' => Posicion::cases(),
        ]);
    }

    /** Guarda el jugador con las stats base de su posición (antes: guardar_jugador.php). */
    public function store(StoreJugadorRequest $request): RedirectResponse
    {
        $posicion = $request->enum('posicion', Posicion::class);

        try {
            $jugador = Jugador::create([
                'nombre'   => $request->validated('nombre'),
                'posicion' => $posicion,
                ...$posicion->statsBase(),
            ]);
        } catch (QueryException $e) {
            report($e);

            return back()
                ->withInput()
                ->withErrors(['general' => 'Hubo un error al guardar el jugador.']);
        }

        return redirect()->route('jugadores.show', $jugador);
    }

    /** Pantalla "JUGADOR CREADO" con sus estadísticas. */
    public function show(Jugador $jugador): View
    {
        return view('jugadores.show', ['jugador' => $jugador]);
    }
}
