<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
    <meta name="theme-color" content="#08090d">
    <title>THE ROOKIE | Camino a la Leyenda</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700&family=Press+Start+2P&family=Rajdhani:wght@600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="{{ route('carrera.styles') }}">
</head>
<body>
    <div id="app"></div>
    <script>
        window.ROOKIE_API = {
            equipos: @json(route('carrera.equipos')),
            guardar: null,
            root: @json(rtrim(url('/'), '/') . '/'),
            juegos: {
                memoria: @json(route('juegos.memoria')),
                simon: @json(route('juegos.simon')),
                defensa: @json(url('/defensa.html')),
                reflejos: @json(url('/reflejos'))
            }
        };
    </script>
    <script src="{{ route('carrera.script') }}" defer></script>
</body>
</html>