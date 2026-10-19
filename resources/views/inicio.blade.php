@extends('layouts.app')

@section('title', 'THE ROOKIE | Camino a la Leyenda')

@section('content')
    <main id="inicio">

        <section class="hero">

            <div class="hero-content">

                <p class="small-title">TU HISTORIA. TU EQUIPO. TU LEGADO.</p>

                <h1>
                    CAMINO A LA
                    <span>LEYENDA</span>
                </h1>

                <p class="description">
                    Comenzá desde abajo, desarrollá tus habilidades,
                    llegá a la NBA y convertite en uno de los mejores
                    jugadores de la historia.
                </p>

                <div class="buttons">

                    <a href="{{ route('carrera.index') }}" class="btn primary">
                        COMENZAR CARRERA
                    </a>

                    <a href="#como-jugar" class="btn secondary">
                        ¿CÓMO JUGAR?
                    </a>

                </div>

            </div>

            <div class="hero-ball">
                <div class="ball">🏀</div>
            </div>

        </section>


        <!-- CARRERA -->
        <section id="carrera" class="career">

            <div class="section-title">
                <p>EL CAMINO</p>
                <h2>CONSTRUÍ TU CARRERA</h2>
            </div>

            <div class="career-grid">

                <div class="career-card active">
                    <div class="number">01</div>

                    <div class="card-icon">🎓</div>

                    <h3>COLLEGE</h3>

                    <p>
                        Demostrá tu talento y convertite
                        en uno de los mejores prospectos.
                    </p>

                    <span class="status">DISPONIBLE</span>
                </div>


                <div class="career-card">
                    <div class="number">02</div>

                    <div class="card-icon">📋</div>

                    <h3>NBA DRAFT</h3>

                    <p>
                        Tus actuaciones determinarán
                        tu posición en el Draft.
                    </p>

                    <span class="status locked">BLOQUEADO</span>
                </div>


                <div class="career-card">
                    <div class="number">03</div>

                    <div class="card-icon">🏀</div>

                    <h3>NBA</h3>

                    <p>
                        Llegá a la liga y comenzá
                        tu verdadera carrera.
                    </p>

                    <span class="status locked">BLOQUEADO</span>
                </div>


                <div class="career-card">
                    <div class="number">04</div>

                    <div class="card-icon">🏆</div>

                    <h3>LEGADO</h3>

                    <p>
                        Ganá campeonatos, premios
                        y convertite en una leyenda.
                    </p>

                    <span class="status locked">BLOQUEADO</span>
                </div>

            </div>

        </section>


        <!-- CREAR JUGADOR -->
        <section class="player-section">

            <div class="player-image">
                <div class="silhouette">🏀</div>
            </div>

            <div class="player-info">

                <p class="small-title">TU CARRERA COMIENZA AHORA</p>

                <h2>CREÁ A TU<br><span>JUGADOR</span></h2>

                <p>
                    Elegí tu posición, definí tu estilo de juego
                    y comenzá a desarrollar las habilidades que
                    te llevarán hasta la NBA.
                </p>

                <div class="positions">

                    <div class="position">
                        <strong>PG</strong>
                        <span>BASE</span>
                    </div>

                    <div class="position">
                        <strong>SG</strong>
                        <span>ESCOLTA</span>
                    </div>

                    <div class="position">
                        <strong>SF</strong>
                        <span>ALERO</span>
                    </div>

                    <div class="position">
                        <strong>PF</strong>
                        <span>ALA-PÍVOT</span>
                    </div>

                    <div class="position">
                        <strong>C</strong>
                        <span>PÍVOT</span>
                    </div>

                </div>

                <a href="{{ route('jugadores.create') }}" class="btn primary">
                    CREAR JUGADOR
                </a>

            </div>

        </section>


        <!-- ESTADISTICAS -->
        <section class="stats-section">

            <div class="section-title">
                <p>DESARROLLO</p>
                <h2>MEJORÁ TUS HABILIDADES</h2>
            </div>

            <div class="stats-container">

                <div class="stat">
                    <div class="stat-header">
                        <span>TIRO</span>
                        <strong>65</strong>
                    </div>
                    <div class="bar">
                        <div style="width:65%"></div>
                    </div>
                </div>


                <div class="stat">
                    <div class="stat-header">
                        <span>MANEJO</span>
                        <strong>60</strong>
                    </div>
                    <div class="bar">
                        <div style="width:60%"></div>
                    </div>
                </div>


                <div class="stat">
                    <div class="stat-header">
                        <span>PASE</span>
                        <strong>62</strong>
                    </div>
                    <div class="bar">
                        <div style="width:62%"></div>
                    </div>
                </div>


                <div class="stat">
                    <div class="stat-header">
                        <span>VELOCIDAD</span>
                        <strong>68</strong>
                    </div>
                    <div class="bar">
                        <div style="width:68%"></div>
                    </div>
                </div>


                <div class="stat">
                    <div class="stat-header">
                        <span>DEFENSA</span>
                        <strong>58</strong>
                    </div>
                    <div class="bar">
                        <div style="width:58%"></div>
                    </div>
                </div>


                <div class="stat">
                    <div class="stat-header">
                        <span>SALTO</span>
                        <strong>70</strong>
                    </div>
                    <div class="bar">
                        <div style="width:70%"></div>
                    </div>
                </div>

            </div>

        </section>


        <!-- RANKING -->
        <section id="ranking" class="ranking">

            <div class="section-title">
                <p>COMPETENCIA</p>
                <h2>RANKING DE JUGADORES</h2>
            </div>

            <div class="ranking-table">

                <div class="ranking-header">
                    <span>#</span>
                    <span>JUGADOR</span>
                    <span>POS</span>
                    <span>OVR</span>
                </div>

                <div class="ranking-row">
                    <span>01</span>
                    <strong>THE KING</strong>
                    <span>SF</span>
                    <b>94</b>
                </div>

                <div class="ranking-row">
                    <span>02</span>
                    <strong>THE SNIPER</strong>
                    <span>SG</span>
                    <b>92</b>
                </div>

                <div class="ranking-row">
                    <span>03</span>
                    <strong>THE TOWER</strong>
                    <span>C</span>
                    <b>90</b>
                </div>

                <div class="ranking-row">
                    <span>04</span>
                    <strong>ROOKIE_23</strong>
                    <span>PG</span>
                    <b>86</b>
                </div>

            </div>

        </section>


        <!-- COMO JUGAR -->
        <section id="como-jugar" class="how">

            <div class="section-title">
                <p>EMPEZÁ TU HISTORIA</p>
                <h2>¿CÓMO JUGAR?</h2>
            </div>

            <div class="steps">

                <div class="step">
                    <span>01</span>
                    <h3>CREÁ</h3>
                    <p>Diseñá tu jugador y elegí tu posición.</p>
                </div>

                <div class="step">
                    <span>02</span>
                    <h3>ENTRENÁ</h3>
                    <p>Mejorá tus estadísticas y habilidades.</p>
                </div>

                <div class="step">
                    <span>03</span>
                    <h3>COMPETÍ</h3>
                    <p>Jugá partidos y ganá experiencia.</p>
                </div>

                <div class="step">
                    <span>04</span>
                    <h3>TRIUNFÁ</h3>
                    <p>Conseguí títulos y construí tu legado.</p>
                </div>

            </div>

        </section>

    </main>
@endsection

@section('footer')
    <footer>

        <div class="logo">
            <span>THE</span>
            <strong>ROOKIE</strong>
        </div>

        <p>
            CAMINO A LA LEYENDA
        </p>

        <small>
            Proyecto inspirado en el mundo del básquet.
        </small>

    </footer>
@endsection
