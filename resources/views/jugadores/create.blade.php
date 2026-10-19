@extends('layouts.app')

@section('title', 'THE ROOKIE | Crear Jugador')

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

                <p class="small-title">TU CARRERA COMIENZA AHORA</p>

                <h2>CREÁ TU<br><span>JUGADOR</span></h2>

                <p>
                    Elegí tu nombre y tu posición. Tus estadísticas
                    iniciales van a depender de la posición que elijas.
                </p>

                @foreach ($errors->unique() as $mensaje)
                    <p class="form-error">{{ $mensaje }}</p>
                @endforeach

                <form method="POST" action="{{ route('jugadores.store') }}">
                    @csrf

                    <label for="nombre" class="form-label">NOMBRE</label>
                    <input
                        type="text"
                        id="nombre"
                        name="nombre"
                        class="form-input"
                        maxlength="50"
                        value="{{ old('nombre') }}"
                        required
                    >

                    <p class="form-label" style="margin-top:20px;">POSICIÓN</p>

                    <div class="positions">
                        @foreach ($posiciones as $posicion)
                            <label class="position">
                                <input
                                    type="radio"
                                    name="posicion"
                                    value="{{ $posicion->value }}"
                                    @checked(old('posicion') === $posicion->value)
                                    @required($loop->first)
                                >
                                <strong>{{ $posicion->value }}</strong>
                                <span>{{ $posicion->etiqueta() }}</span>
                            </label>
                        @endforeach
                    </div>

                    <div class="buttons">
                        <button type="submit" class="btn primary">CREAR JUGADOR</button>
                    </div>

                </form>

            </div>

        </section>
    </main>
@endsection
