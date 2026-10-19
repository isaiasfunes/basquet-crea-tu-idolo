@extends('layouts.app')

@section('title', 'THE ROOKIE | Jugador Creado')

@push('styles')
    <link rel="stylesheet" href="{{ asset('css/jugador.css') }}">
@endpush

@section('content')
    <main>
        <section class="player-section">

            <div class="player-image">
                <div class="silhouette">🏀</div>
            </div>

            <div class="player-info">

                <p class="small-title">JUGADOR CREADO</p>
                <h2>BIENVENIDO,<br><span>{{ $jugador->nombre }}</span></h2>
                <p>Posición: {{ $jugador->posicion->value }}</p>

                <div class="stats-container result-stats">
                    @foreach ($jugador->stats as $nombreStat => $valor)
                        <div>
                            <div class="stat-header">
                                <span>{{ mb_strtoupper($nombreStat) }}</span>
                                <strong>{{ $valor }}</strong>
                            </div>
                            <div class="bar">
                                <div style="width: {{ $valor }}%;"></div>
                            </div>
                        </div>
                    @endforeach
                </div>

                <div class="buttons">
                    <a href="{{ route('inicio') }}" class="btn primary">IR AL INICIO</a>
                </div>

            </div>

        </section>
    </main>
@endsection
