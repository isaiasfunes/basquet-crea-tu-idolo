<?php

namespace App\Http\Requests;

use App\Enums\Posicion;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreJugadorRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'nombre'   => ['required', 'string', 'max:50'],
            'posicion' => ['required', Rule::enum(Posicion::class)],
        ];
    }

    public function messages(): array
    {
        // Mismo mensaje que mostraba guardar_jugador.php
        $generico = 'Completá el nombre y elegí una posición válida.';

        return [
            'nombre.required'   => $generico,
            'nombre.string'     => $generico,
            'nombre.max'        => 'El nombre no puede superar los 50 caracteres.',
            'posicion.required' => $generico,
            'posicion.enum'     => $generico,
        ];
    }
}
