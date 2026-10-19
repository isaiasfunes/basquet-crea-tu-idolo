<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Memoria de Básquet</title>

    <link rel="stylesheet" href="{{ asset('css/juegos/memoria.css') }}">
</head>

<body>

<div id="start-screen">

    <h1>🏀 Memoria de Básquet 🏀</h1>

    <p>
        Encontrá las 8 parejas.<br>
        Tenés 5 vidas.
    </p>

    <button id="start-button">
        ▶️ Comenzar el juego
    </button>

</div>


<div class="game">

    <h1>🏀 Memoria de Básquet</h1>

    <div class="info">
        <div>❤️ Vidas: <span id="lives">5</span></div>
        <div>🎯 Parejas: <span id="pairs">0</span>/8</div>
    </div>

    <p id="message">
        Presioná "Comenzar el juego"
    </p>

    <div id="game-board" class="game-board"></div>

    <button id="restart">
        🔄 Reiniciar
    </button>

</div>

<script src="{{ asset('js/juegos/memoria.js') }}"></script>

</body>
</html>
