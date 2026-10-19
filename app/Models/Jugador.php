<?php

namespace App\Models;

use App\Enums\Posicion;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;

class Jugador extends Model
{
    // Se conserva la columna original `fecha_creacion` (no hay `updated_at`).
    public const CREATED_AT = 'fecha_creacion';
    public const UPDATED_AT = null;

    // Laravel pluralizaría "Jugador" en inglés ("jugadors"), así que se indica la tabla.
    protected $table = 'jugadores';

    protected $fillable = [
        'nombre',
        'posicion',
        'velocidad',
        'tiro',
        'rebote',
        'pase',
        'defensa',
    ];

    protected function casts(): array
    {
        return [
            'posicion' => Posicion::class,
            'fecha_creacion' => 'datetime',
        ];
    }

    /**
     * Las 5 estadísticas en el orden en que se muestran en pantalla.
     *
     * @return Attribute<array<string,int>, never>
     */
    protected function stats(): Attribute
    {
        return Attribute::get(fn () => [
            'velocidad' => $this->velocidad,
            'tiro'      => $this->tiro,
            'rebote'    => $this->rebote,
            'pase'      => $this->pase,
            'defensa'   => $this->defensa,
        ]);
    }
}
