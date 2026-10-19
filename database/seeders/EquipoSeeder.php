<?php

namespace Database\Seeders;

use App\Models\Equipo;
use Illuminate\Database\Seeder;

// Datos NBA de equipos.sql y clubes argentinos. Se puede ejecutar varias veces sin duplicar.
class EquipoSeeder extends Seeder
{
    public function run(): void
    {
        $equipos = [
            ['id' => 1, 'nombre' => 'Boston Celtics', 'abreviatura' => 'BOS', 'ciudad' => 'Boston', 'estado' => 'MA', 'conferencia' => 'Este', 'division' => 'Atlantic', 'arena' => 'TD Garden', 'fundado' => 1946, 'color_primario' => '#007A33', 'color_secundario' => '#BA9653'],
            ['id' => 2, 'nombre' => 'Brooklyn Nets', 'abreviatura' => 'BKN', 'ciudad' => 'Brooklyn', 'estado' => 'NY', 'conferencia' => 'Este', 'division' => 'Atlantic', 'arena' => 'Barclays Center', 'fundado' => 1967, 'color_primario' => '#000000', 'color_secundario' => '#FFFFFF'],
            ['id' => 3, 'nombre' => 'New York Knicks', 'abreviatura' => 'NYK', 'ciudad' => 'New York', 'estado' => 'NY', 'conferencia' => 'Este', 'division' => 'Atlantic', 'arena' => 'Madison Square Garden', 'fundado' => 1946, 'color_primario' => '#006BB6', 'color_secundario' => '#F58426'],
            ['id' => 4, 'nombre' => 'Philadelphia 76ers', 'abreviatura' => 'PHI', 'ciudad' => 'Philadelphia', 'estado' => 'PA', 'conferencia' => 'Este', 'division' => 'Atlantic', 'arena' => 'Wells Fargo Center', 'fundado' => 1946, 'color_primario' => '#006BB6', 'color_secundario' => '#ED174C'],
            ['id' => 5, 'nombre' => 'Toronto Raptors', 'abreviatura' => 'TOR', 'ciudad' => 'Toronto', 'estado' => 'ON', 'conferencia' => 'Este', 'division' => 'Atlantic', 'arena' => 'Scotiabank Arena', 'fundado' => 1995, 'color_primario' => '#CE1141', 'color_secundario' => '#000000'],
            ['id' => 6, 'nombre' => 'Chicago Bulls', 'abreviatura' => 'CHI', 'ciudad' => 'Chicago', 'estado' => 'IL', 'conferencia' => 'Este', 'division' => 'Central', 'arena' => 'United Center', 'fundado' => 1966, 'color_primario' => '#CE1141', 'color_secundario' => '#000000'],
            ['id' => 7, 'nombre' => 'Cleveland Cavaliers', 'abreviatura' => 'CLE', 'ciudad' => 'Cleveland', 'estado' => 'OH', 'conferencia' => 'Este', 'division' => 'Central', 'arena' => 'Rocket Mortgage FieldHouse', 'fundado' => 1970, 'color_primario' => '#860038', 'color_secundario' => '#FDBB30'],
            ['id' => 8, 'nombre' => 'Detroit Pistons', 'abreviatura' => 'DET', 'ciudad' => 'Detroit', 'estado' => 'MI', 'conferencia' => 'Este', 'division' => 'Central', 'arena' => 'Little Caesars Arena', 'fundado' => 1941, 'color_primario' => '#C8102E', 'color_secundario' => '#1D42BA'],
            ['id' => 9, 'nombre' => 'Indiana Pacers', 'abreviatura' => 'IND', 'ciudad' => 'Indianapolis', 'estado' => 'IN', 'conferencia' => 'Este', 'division' => 'Central', 'arena' => 'Gainbridge Fieldhouse', 'fundado' => 1967, 'color_primario' => '#002D62', 'color_secundario' => '#FDBB30'],
            ['id' => 10, 'nombre' => 'Milwaukee Bucks', 'abreviatura' => 'MIL', 'ciudad' => 'Milwaukee', 'estado' => 'WI', 'conferencia' => 'Este', 'division' => 'Central', 'arena' => 'Fiserv Forum', 'fundado' => 1968, 'color_primario' => '#00471B', 'color_secundario' => '#EEE1C6'],
            ['id' => 11, 'nombre' => 'Atlanta Hawks', 'abreviatura' => 'ATL', 'ciudad' => 'Atlanta', 'estado' => 'GA', 'conferencia' => 'Este', 'division' => 'Southeast', 'arena' => 'State Farm Arena', 'fundado' => 1946, 'color_primario' => '#E03A3E', 'color_secundario' => '#C1D32F'],
            ['id' => 12, 'nombre' => 'Charlotte Hornets', 'abreviatura' => 'CHA', 'ciudad' => 'Charlotte', 'estado' => 'NC', 'conferencia' => 'Este', 'division' => 'Southeast', 'arena' => 'Spectrum Center', 'fundado' => 1988, 'color_primario' => '#1D1160', 'color_secundario' => '#00788C'],
            ['id' => 13, 'nombre' => 'Miami Heat', 'abreviatura' => 'MIA', 'ciudad' => 'Miami', 'estado' => 'FL', 'conferencia' => 'Este', 'division' => 'Southeast', 'arena' => 'Kaseya Center', 'fundado' => 1988, 'color_primario' => '#98002E', 'color_secundario' => '#F9A01B'],
            ['id' => 14, 'nombre' => 'Orlando Magic', 'abreviatura' => 'ORL', 'ciudad' => 'Orlando', 'estado' => 'FL', 'conferencia' => 'Este', 'division' => 'Southeast', 'arena' => 'Kia Center', 'fundado' => 1989, 'color_primario' => '#0077C0', 'color_secundario' => '#C4CED4'],
            ['id' => 15, 'nombre' => 'Washington Wizards', 'abreviatura' => 'WAS', 'ciudad' => 'Washington', 'estado' => 'DC', 'conferencia' => 'Este', 'division' => 'Southeast', 'arena' => 'Capital One Arena', 'fundado' => 1961, 'color_primario' => '#002B5C', 'color_secundario' => '#E31837'],
            ['id' => 16, 'nombre' => 'Denver Nuggets', 'abreviatura' => 'DEN', 'ciudad' => 'Denver', 'estado' => 'CO', 'conferencia' => 'Oeste', 'division' => 'Northwest', 'arena' => 'Ball Arena', 'fundado' => 1967, 'color_primario' => '#0E2240', 'color_secundario' => '#FEC524'],
            ['id' => 17, 'nombre' => 'Minnesota Timberwolves', 'abreviatura' => 'MIN', 'ciudad' => 'Minneapolis', 'estado' => 'MN', 'conferencia' => 'Oeste', 'division' => 'Northwest', 'arena' => 'Target Center', 'fundado' => 1989, 'color_primario' => '#0C2340', 'color_secundario' => '#236192'],
            ['id' => 18, 'nombre' => 'Oklahoma City Thunder', 'abreviatura' => 'OKC', 'ciudad' => 'Oklahoma City', 'estado' => 'OK', 'conferencia' => 'Oeste', 'division' => 'Northwest', 'arena' => 'Paycom Center', 'fundado' => 1967, 'color_primario' => '#007AC1', 'color_secundario' => '#EF3B24'],
            ['id' => 19, 'nombre' => 'Portland Trail Blazers', 'abreviatura' => 'POR', 'ciudad' => 'Portland', 'estado' => 'OR', 'conferencia' => 'Oeste', 'division' => 'Northwest', 'arena' => 'Moda Center', 'fundado' => 1970, 'color_primario' => '#E03A3E', 'color_secundario' => '#000000'],
            ['id' => 20, 'nombre' => 'Utah Jazz', 'abreviatura' => 'UTA', 'ciudad' => 'Salt Lake City', 'estado' => 'UT', 'conferencia' => 'Oeste', 'division' => 'Northwest', 'arena' => 'Delta Center', 'fundado' => 1974, 'color_primario' => '#002B5C', 'color_secundario' => '#F9A01B'],
            ['id' => 21, 'nombre' => 'Golden State Warriors', 'abreviatura' => 'GSW', 'ciudad' => 'San Francisco', 'estado' => 'CA', 'conferencia' => 'Oeste', 'division' => 'Pacific', 'arena' => 'Chase Center', 'fundado' => 1946, 'color_primario' => '#1D428A', 'color_secundario' => '#FFC72C'],
            ['id' => 22, 'nombre' => 'LA Clippers', 'abreviatura' => 'LAC', 'ciudad' => 'Inglewood', 'estado' => 'CA', 'conferencia' => 'Oeste', 'division' => 'Pacific', 'arena' => 'Intuit Dome', 'fundado' => 1970, 'color_primario' => '#C8102E', 'color_secundario' => '#1D428A'],
            ['id' => 23, 'nombre' => 'Los Angeles Lakers', 'abreviatura' => 'LAL', 'ciudad' => 'Los Angeles', 'estado' => 'CA', 'conferencia' => 'Oeste', 'division' => 'Pacific', 'arena' => 'Crypto.com Arena', 'fundado' => 1947, 'color_primario' => '#552583', 'color_secundario' => '#FDB927'],
            ['id' => 24, 'nombre' => 'Phoenix Suns', 'abreviatura' => 'PHX', 'ciudad' => 'Phoenix', 'estado' => 'AZ', 'conferencia' => 'Oeste', 'division' => 'Pacific', 'arena' => 'Footprint Center', 'fundado' => 1968, 'color_primario' => '#1D1160', 'color_secundario' => '#E56020'],
            ['id' => 25, 'nombre' => 'Sacramento Kings', 'abreviatura' => 'SAC', 'ciudad' => 'Sacramento', 'estado' => 'CA', 'conferencia' => 'Oeste', 'division' => 'Pacific', 'arena' => 'Golden 1 Center', 'fundado' => 1945, 'color_primario' => '#5A2D81', 'color_secundario' => '#63727A'],
            ['id' => 26, 'nombre' => 'Dallas Mavericks', 'abreviatura' => 'DAL', 'ciudad' => 'Dallas', 'estado' => 'TX', 'conferencia' => 'Oeste', 'division' => 'Southwest', 'arena' => 'American Airlines Center', 'fundado' => 1980, 'color_primario' => '#00538C', 'color_secundario' => '#002B5E'],
            ['id' => 27, 'nombre' => 'Houston Rockets', 'abreviatura' => 'HOU', 'ciudad' => 'Houston', 'estado' => 'TX', 'conferencia' => 'Oeste', 'division' => 'Southwest', 'arena' => 'Toyota Center', 'fundado' => 1967, 'color_primario' => '#CE1141', 'color_secundario' => '#000000'],
            ['id' => 28, 'nombre' => 'Memphis Grizzlies', 'abreviatura' => 'MEM', 'ciudad' => 'Memphis', 'estado' => 'TN', 'conferencia' => 'Oeste', 'division' => 'Southwest', 'arena' => 'FedExForum', 'fundado' => 1995, 'color_primario' => '#5D76A9', 'color_secundario' => '#12173F'],
            ['id' => 29, 'nombre' => 'New Orleans Pelicans', 'abreviatura' => 'NOP', 'ciudad' => 'New Orleans', 'estado' => 'LA', 'conferencia' => 'Oeste', 'division' => 'Southwest', 'arena' => 'Smoothie King Center', 'fundado' => 1988, 'color_primario' => '#0C2340', 'color_secundario' => '#C8102E'],
            ['id' => 30, 'nombre' => 'San Antonio Spurs', 'abreviatura' => 'SAS', 'ciudad' => 'San Antonio', 'estado' => 'TX', 'conferencia' => 'Oeste', 'division' => 'Southwest', 'arena' => 'Frost Bank Center', 'fundado' => 1967, 'color_primario' => '#C4CED4', 'color_secundario' => '#000000'],
        ];

        Equipo::upsert(
            $equipos,
            ['id'],
            ['nombre', 'abreviatura', 'ciudad', 'estado', 'conferencia', 'division', 'arena', 'fundado', 'color_primario', 'color_secundario']
        );

        Equipo::upsert([
            ['id' => 1001, 'nombre' => 'Boca Juniors', 'abreviatura' => 'BOC', 'ciudad' => 'Buenos Aires', 'estado' => 'CABA', 'conferencia' => 'LNB', 'division' => 'Nacional', 'arena' => 'Microestadio Luis Conde', 'fundado' => 1905, 'color_primario' => '#0033A0', 'color_secundario' => '#F4C400', 'liga' => 'LNB', 'minima' => 54],
            ['id' => 1002, 'nombre' => 'Ferro', 'abreviatura' => 'FER', 'ciudad' => 'Buenos Aires', 'estado' => 'CABA', 'conferencia' => 'LNB', 'division' => 'Nacional', 'arena' => 'Estadio Héctor Etchart', 'fundado' => 1904, 'color_primario' => '#006633', 'color_secundario' => '#FFFFFF', 'liga' => 'LNB', 'minima' => 62],
            ['id' => 1003, 'nombre' => 'Quimsa', 'abreviatura' => 'QUI', 'ciudad' => 'Santiago del Estero', 'estado' => 'SDE', 'conferencia' => 'LNB', 'division' => 'Nacional', 'arena' => 'Estadio Ciudad', 'fundado' => 1989, 'color_primario' => '#111111', 'color_secundario' => '#F5C518', 'liga' => 'LNB', 'minima' => 70],
        ], ['id'], [
            'nombre', 'abreviatura', 'ciudad', 'estado', 'conferencia', 'division',
            'arena', 'fundado', 'color_primario', 'color_secundario', 'liga', 'minima',
        ]);
    }
}
