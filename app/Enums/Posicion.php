<?php

namespace App\Enums;

/**
 * Posiciones de básquet disponibles al crear un jugador.
 *
 * Centraliza lo que antes estaba duplicado en crear_jugador.php y
 * guardar_jugador.php ($stats_por_posicion) y en el HTML del formulario.
 */
enum Posicion: string
{
    case PG = 'PG';
    case SG = 'SG';
    case SF = 'SF';
    case PF = 'PF';
    case C  = 'C';

    /** Texto que se muestra debajo de la sigla en el formulario. */
    public function etiqueta(): string
    {
        return match ($this) {
            self::PG => 'BASE',
            self::SG => 'ESCOLTA',
            self::SF => 'ALERO',
            self::PF => 'ALA-PIVOT',
            self::C  => 'PIVOT',
        };
    }

    /**
     * Estadísticas iniciales según la posición.
     *
     * @return array{velocidad:int, tiro:int, rebote:int, pase:int, defensa:int}
     */
    public function statsBase(): array
    {
        return match ($this) {
            self::PG => ['velocidad' => 80, 'tiro' => 65, 'rebote' => 40, 'pase' => 85, 'defensa' => 60],
            self::SG => ['velocidad' => 75, 'tiro' => 85, 'rebote' => 45, 'pase' => 60, 'defensa' => 55],
            self::SF => ['velocidad' => 70, 'tiro' => 70, 'rebote' => 60, 'pase' => 55, 'defensa' => 65],
            self::PF => ['velocidad' => 55, 'tiro' => 55, 'rebote' => 80, 'pase' => 45, 'defensa' => 70],
            self::C  => ['velocidad' => 45, 'tiro' => 45, 'rebote' => 90, 'pase' => 35, 'defensa' => 80],
        };
    }
}
