# THE ROOKIE | Camino a la Leyenda

Simulador de carrera de basquet con estetica retro oscura y acento naranja. El jugador empieza en un club de barrio, avanza semana a semana con decisiones, entrena atributos, juega partidos tacticos y puede firmar contratos hasta llegar a la NBA.

## Entradas

- `juegos/carrera/`: carpeta independiente con la entrada HTML, el CSS y el motor JS del modo carrera. Requiere servir el proyecto desde un servidor PHP para consultar los equipos; el progreso se guarda en `localStorage` con la clave `rookie-jugador`.
- `carrera.html`: redireccion compatible para enlaces anteriores.
- `/carrera`: vista Blade que reutiliza el mismo motor y consulta los equipos mediante Laravel. Las rutas están en `routes/web.php`.

En una instalacion Laravel 13 completa, ejecuta `php artisan migrate --seed` y luego `php artisan serve`; el juego queda en `http://127.0.0.1:8000/carrera`.

## Extensión

Los enlaces de minijuegos se pueden configurar por juego en `window.ROOKIE_API.juegos` desde la vista Blade. Los eventos y atributos de carrera permanecen en `juegos/carrera/js/app.js`; el avance principal no depende de que un minijuego externo esté disponible.