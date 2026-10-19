<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>@yield('title', 'THE ROOKIE')</title>

    <link rel="stylesheet" href="{{ asset('css/style.css') }}">
    @stack('styles')

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com/" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet">
</head>
<body>

    <!-- FONDO -->
    <div class="background"></div>

    <!-- NAVBAR -->
    <header class="navbar">

        <div class="logo">
            <span>THE</span>
            <strong>ROOKIE</strong>
        </div>

        <nav>
            <a href="{{ route('inicio') }}#inicio">INICIO</a>
            <a href="{{ route('inicio') }}#carrera">CARRERA</a>
            <a href="{{ route('inicio') }}#ranking">RANKING</a>
            <a href="{{ route('inicio') }}#como-jugar">CÓMO JUGAR</a>
        </nav>

        <div class="user">
            <div class="user-icon">🏀</div>
            <span>INVITADO</span>
        </div>

    </header>

    @yield('content')

    @yield('footer')

</body>
</html>
