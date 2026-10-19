<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Equipo extends Model
{
    protected $table = 'equipos';

    // La tabla original no tiene created_at / updated_at.
    public $timestamps = false;

    protected $fillable = [
        'nombre',
        'abreviatura',
        'ciudad',
        'estado',
        'conferencia',
        'division',
        'arena',
        'fundado',
        'color_primario',
        'color_secundario',
        'liga',
        'minima',
    ];
}
