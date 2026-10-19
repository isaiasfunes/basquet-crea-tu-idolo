<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Simón Dice - Colores</title>

    <link rel="stylesheet" href="{{ asset('css/juegos/simon.css') }}">
</head>

<body>

    

    <div class="game">

        <h1>🎨 SIMÓN DICE</h1>
        <p class="subtitle">Memorizá la secuencia y repetila</p>

        <div class="info">
            <div>
                <span>Ronda</span>
                <strong id="round">1/8</strong>
            </div>

            <div>
                <span>Secuencia</span>
                <strong id="sequence-length">1</strong>
            </div>

            <div>
                <span>Récord</span>
                <strong id="record">0</strong>
            </div>
        </div>

        <p id="message">Presioná "Comenzar"</p>

        <div id="board" class="board">
            <!-- Los 16 cuadros se generan con JavaScript -->
        </div>

        <button id="start-button">▶ Comenzar</button>

    </div>


    

<script src="{{ asset('js/juegos/simon.js') }}"></script>

</body>
</html>
