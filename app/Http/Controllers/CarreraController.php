<?php

namespace App\Http\Controllers;

use App\Models\Equipo;
use Illuminate\Http\JsonResponse;
use Illuminate\View\View;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

class CarreraController extends Controller
{
    public function index(): View
    {
        return view('carrera');
    }

    public function styles(): BinaryFileResponse
    {
        return response()->file(base_path('juegos/carrera/css/retro.css'));
    }

    public function script(): BinaryFileResponse
    {
        return response()->file(base_path('juegos/carrera/js/app.js'));
    }

    public function equipos(): JsonResponse
    {
        $equipos = Equipo::query()
            ->select([
                'id',
                'nombre',
                'abreviatura',
                'ciudad',
                'conferencia',
                'division',
                'color_primario',
                'color_secundario',
                'liga',
                'minima',
            ])
            ->orderBy('liga')
            ->orderByDesc('minima')
            ->orderBy('nombre')
            ->get()
            ->map(fn (Equipo $equipo): array => [
                'id' => (int) $equipo->id,
                'nombre' => $equipo->nombre,
                'abreviatura' => $equipo->abreviatura,
                'ciudad' => $equipo->ciudad,
                'conferencia' => $equipo->conferencia,
                'division' => $equipo->division,
                'color_primario' => $equipo->color_primario,
                'color_secundario' => $equipo->color_secundario,
                'liga' => $equipo->liga,
                'minima' => (int) $equipo->minima,
                'logo' => null,
            ]);

        return response()->json($equipos);
    }
}