/* ÍDOLO DEL ARO — carrera larga estilo Potrero. Solo vive en "Modo carrera". */
(function () {
    const KEY = "idolo-carrera-v2";
    const KEY_ENTRENO = "idolo-entreno";
    const root = document.getElementById("app");
    const MAX_TEMP = 15, EDAD_RETIRO = 38;

    let S = base();
    let grlVisto = 0;

    function base() {
        return {
            fase: "inicio", nombre: "", posicion: "", stats: null,
            tez: "#a96f48", cabello: "style1", dorsal: 11, origen: "",
            edad: 18, temporada: 1, momento: 0, club: null,
            xp: 40, forma: 70, hinchada: 60, puntos: 0, titulos: 0,
            rival: 18, rivalTit: 0, historial: [], usados: [],
            espera: null, jugados: [], flash: "", error: "",
            resultado: null, draftClub: null
        };
    }

    // Lee el jugador creado en el proyecto original (crearjugador2.html):
    // ese botón CONFIRMAR ya guarda {nombre, posicion, tez, cabello} en sessionStorage.
    function leerImportado() {
        try {
            const j = JSON.parse(sessionStorage.getItem("jugador") || "null");
            if (j && j.nombre && POS_NOMBRE[j.posicion]) return {
                nombre: String(j.nombre).slice(0, 50),
                posicion: j.posicion,
                tez: TEZ.includes(j.tez) ? j.tez : TEZ[1],
                cabello: CABELLOS.includes(j.cabello) ? j.cabello : CABELLOS[0]
            };
        } catch (e) {}
        return null;
    }

    function aplicarImportado(imp) {
        const f = base();
        f.nombre = imp.nombre; f.posicion = imp.posicion;
        f.tez = imp.tez; f.cabello = imp.cabello;
        f.dorsal = 1 + Math.floor(Math.random() * 98);
        f.stats = Object.assign({}, STATS_POR_POSICION[imp.posicion]);
        f.origen = "proyecto";
        f.fase = "draft";
        f.flash = "Jugador traído del proyecto original. Sorteá tu club.";
        S = f;
        guardar();
        render();
    }

    function guardar() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} }
    function cargar() {
        let tieneSave = false;
        try {
            const g = JSON.parse(localStorage.getItem(KEY) || "null");
            if (g && g.nombre && g.posicion) { S = Object.assign(base(), g); tieneSave = true; }
        } catch (e) {}
        // Si venís del botón CONFIRMAR del proyecto y no hay carrera empezada,
        // el jugador entra directo al sorteo, sin crear de nuevo.
        if (!tieneSave) {
            const imp = leerImportado();
            if (imp) {
                S.nombre = imp.nombre; S.posicion = imp.posicion;
                S.tez = imp.tez; S.cabello = imp.cabello;
                S.dorsal = 1 + Math.floor(Math.random() * 98);
                S.stats = Object.assign({}, STATS_POR_POSICION[imp.posicion]);
                S.origen = "proyecto";
                S.fase = "draft";
                S.flash = "Jugador traído del proyecto original. Sorteá tu club.";
                guardar();
            }
        }
        grlVisto = grl();
    }

    function esc(v) {
        return String(v ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
    }
    function clamp(n, a, b) { return Math.max(a, Math.min(b, n)); }
    function rnd(a, b) { return a + Math.random() * (b - a); }
    function club() { return clubPorAbrev(S.club); }
    function grl() {
        if (!S.stats) return 0;
        const s = S.stats;
        return Math.round((s.velocidad + s.tiro + s.rebote + s.pase + s.defensa) / 5);
    }

    // ---------- Avatar pixel art ( postes de crearjugador2.html ) ----------
    function avatarHTML(mini) {
        const eq = S.club ? club() : null;
        const jersey = eq ? eq.c1 : "#ff7518";
        return `<div class="avatar-wrap"><div class="avatar ${mini ? "mini" : ""}" style="--skin:${S.tez};--jersey:${jersey}">
            <div class="ahair ${S.cabello}"></div>
            <div class="ahead"><div class="aeyes"><i></i><i></i></div></div>
            <div class="abody"><b>${S.dorsal}</b></div>
            <div class="ashorts"></div>
            <div class="aleg l"></div><div class="aleg r"></div>
        </div></div>`;
    }

    // ---------- Trash talk: referentes ficticios de la NBA ----------
    const TWEETS = {
        bien: [
            { u: "EL ELEGIDO", h: "@ElElegido23", t: "Ok, metió 20. Contra suplentes igual. Cuando quiera hablamos en serio." },
            { u: "Voz NBA", h: "@VozNBA", t: "El pibe tiene algo. Hay que verlo igual en playoffs, ahí se ven los hombres." },
            { u: "HINCHA DEL BARRIO", h: "@HinchaDelBarrio", t: "VAMOOO ES NUESTRO ÍDOLO, DE LA LIGA LOCAL A LA NBA" },
            { u: "Ex Pívot", h: "@ExPivotTV", t: "Buen partido del rookie. Que no se la crea: esto recién empieza." }
        ],
        mal: [
            { u: "EL ELEGIDO", h: "@ElElegido23", t: "Jaja ¿ese es el futuro? Yo a su edad ya era titular indiscutido." },
            { u: "Skip del Aro", h: "@SkipDelAro", t: "Noche para el olvido del rookie. La liga es larga, pero hoy fue un cono." },
            { u: "HINCHA DEL BARRIO", h: "@HinchaDelBarrio", t: "Banca total igual, el próximo la mete. El barrio no abandona." },
            { u: "Voz NBA", h: "@VozNBA", t: "Partido malo. Lo preocupante no es el tiro, es el lenguaje corporal." }
        ],
        neutro: [
            { u: "EL ELEGIDO", h: "@ElElegido23", t: "Partido correcto del pibe. Correcto no gana anillos igual." },
            { u: "Voz NBA", h: "@VozNBA", t: "Ni fu ni fa. La regularidad es lo que separa al bueno del ídolo." },
            { u: "HINCHA DEL BARRIO", h: "@HinchaDelBarrio", t: "Partido parejo, seguimos sumando. VAMOS PIBE" }
        ]
    };
    function tweets(outcome) {
        const pool = TWEETS[outcome] || TWEETS.neutro;
        const rival = pool[0];
        const otro = pool[1 + Math.floor(Math.random() * (pool.length - 1))];
        return [rival, otro];
    }

    function irResultado(titulo, detalle, outcome, pend) {
        S.resultado = { titulo, detalle, tweets: tweets(outcome), pend };
        S.fase = "resultado";
        S.flash = "";
        guardar();
        render();
    }

    // ---------- Decisiones ----------
    const DEBUT = [
        { t: "LLEGADA AL CLUB", d: "Primer día en el club. El vestuario te mide de arriba abajo.", op: [
            { t: "Romperla en la práctica", fx: () => { S.xp += 8; S.forma = clamp(S.forma - 5, 0, 100); return { det: "+8 XP. El DT anotó tu nombre.", out: "bien" }; }, res: "ENTRENO COMPLETADO" },
            { t: "Perfil bajo, laburo", fx: () => { S.hinchada = clamp(S.hinchada + 6, 0, 100); S.xp += 4; return { det: "+6 hinchada, +4 XP. Humildad.", out: "neutro" }; }, res: "DÍA TRANQUILO" } ] },
        { t: "DEBUT", d: "Primer partido oficial. Cancha llena en el barrio.", op: [
            { t: "Jugar para la hinchada", fx: () => { S.hinchada = clamp(S.hinchada + 12, 0, 100); S.puntos += 20; S.xp += 8; return { det: "+20 pts, +8 XP. La gente coreó tu nombre.", out: "bien" }; }, res: "¡DEBUT SOÑADO!" },
            { t: "Cuidarte para el contrato", fx: () => { S.puntos += 10; S.xp += 6; return { det: "+10 pts, +6 XP. Partido correcto.", out: "neutro" }; }, res: "DEBUT CORRECTO" } ] },
        { t: "PRIMER CLÁSICO LOCAL", d: "Clásico del barrio. Se juega con los dientes apretados.", op: [
            { t: "Pedir la última bola", st: "tiro", res: "¡LA METISTE!" },
            { t: "Moverla para el compañero", st: "pase", res: "¡ASISTENCIA CLAVE!" } ] },
        { t: "SEMANA LARGA", d: "Tres partidos en siete días. El físico avisa.", op: [
            { t: "Gym extra de tiro", fx: () => { S.stats.tiro = Math.min(99, S.stats.tiro + 2); S.forma = clamp(S.forma - 8, 0, 100); return { det: "Tiro +2. Las piernas pesan.", out: "neutro" }; }, res: "ENTRENO COMPLETADO" },
            { t: "Descansar", fx: () => { S.forma = clamp(S.forma + 14, 0, 100); return { det: "Forma +. Llegás fresco.", out: "neutro" }; }, res: "DESCANSO TOMADO" } ] },
        { t: "CIERRE DE AÑO", d: "Último partido antes del draft de la NBA. Scouts en la tribuna.", op: [
            { t: "Cargar al equipo al hombro", st: "tiro", res: "¡NOCHE DE DRAFT!" },
            { t: "Jugar para el equipo", st: "pase", res: "¡Noche sólida!" } ] }
    ];

    const PERSONALES = [
        { t: "DÍA LIBRE", d: "Mañana hay partido. El cuerpo pide una cosa y la cabeza otra.", op: [
            { t: "Gym extra de tiro", fx: () => { S.stats.tiro = Math.min(99, S.stats.tiro + 2); S.forma = clamp(S.forma - 8, 0, 100); return { det: "Tiro +2. Las piernas pesan.", out: "neutro" }; }, res: "ENTRENO COMPLETADO" },
            { t: "Descansar", fx: () => { S.forma = clamp(S.forma + 14, 0, 100); S.hinchada = clamp(S.hinchada + 3, 0, 100); return { det: "Forma +. La gente banca.", out: "neutro" }; }, res: "DESCANSO TOMADO" } ] },
        { t: "NOCHE PREVIA AL CLÁSICO", d: "El Elegido declaró que tu equipo no existe.", op: [
            { t: "Video hasta tarde", fx: () => { S.xp += 8; S.forma = clamp(S.forma - 5, 0, 100); return { det: "+8 XP. Le encontraste la maña.", out: "neutro" }; }, res: "ESTUDIO COMPLETADO" },
            { t: "Dormir temprano", fx: () => { S.forma = clamp(S.forma + 10, 0, 100); return { det: "Forma +. Fresco para el salto inicial.", out: "neutro" }; }, res: "DESCANSO TOMADO" } ] },
        { t: "PEDIDO DEL DT", d: "El DT quiere que labures el físico esta semana.", op: [
            { t: "Meterle al rebote", fx: () => { S.stats.rebote = Math.min(99, S.stats.rebote + 2); S.forma = clamp(S.forma - 6, 0, 100); return { det: "Rebote +2.", out: "neutro" }; }, res: "ENTRENO COMPLETADO" },
            { t: "Guardarte para el partido", fx: () => { S.forma = clamp(S.forma + 8, 0, 100); return { det: "Forma +. Llegás entero.", out: "neutro" }; }, res: "DESCANSO TOMADO" } ] },
        { t: "ENTREVISTA DE TV", d: "Te ponen el micrófono después de la práctica. Todo el país mira.", op: [
            { t: "Hablar como ídolo", fx: () => { S.hinchada = clamp(S.hinchada + 10, 0, 100); S.rival += 4; return { det: "+10 hinchada. El Elegido tomó nota.", out: "bien" }; }, res: "DECLARACIONES PICANTES" },
            { t: "Perfil bajo", fx: () => { S.forma = clamp(S.forma + 6, 0, 100); S.xp += 4; return { det: "+4 XP. Sin titulares mañana.", out: "neutro" }; }, res: "DÍA TRANQUILO" } ] },
        { t: "DOLOR EN LA RODILLA", d: "Molestia en la rodilla. El médico no se decide.", op: [
            { t: "Infiltrarte y jugar", fx: () => { S.forma = clamp(S.forma - 12, 0, 100); S.xp += 8; S.hinchada = clamp(S.hinchada + 5, 0, 100); return { det: "+8 XP. El dolor pasa, la historia queda.", out: "bien" }; }, res: "SACRIFICIO TOTAL" },
            { t: "Parar una semana", fx: () => { S.forma = clamp(S.forma + 18, 0, 100); S.hinchada = clamp(S.hinchada - 4, 0, 100); return { det: "Forma +18. Algunos dudan de vos.", out: "mal" }; }, res: "RECUPERACIÓN" } ] },
        { t: "COMPAÑERO NUEVO", d: "Llegó un rookie al vestuario y nadie le habla.", op: [
            { t: "Integrarlo al grupo", fx: () => { S.hinchada = clamp(S.hinchada + 8, 0, 100); S.xp += 3; return { det: "+8 hinchada. Líder dentro y fuera.", out: "bien" }; }, res: "LIDERAZGO" },
            { t: "Ignorarlo, foco en lo tuyo", fx: () => { S.xp += 6; S.hinchada = clamp(S.hinchada - 3, 0, 100); return { det: "+6 XP. Frío, pero efectivo.", out: "neutro" }; }, res: "MODO NEGOCIOS" } ] },
        { t: "HATERS EN REDES", d: "Un video tuyo fallando se hizo viral. Los comentarios arden.", op: [
            { t: "Responder en la cancha", fx: () => { S.hinchada = clamp(S.hinchada + 7, 0, 100); S.xp += 5; return { det: "+5 XP. La mejor respuesta es jugar.", out: "bien" }; }, res: "MENTALIDAD" },
            { t: "Borrar las apps una semana", fx: () => { S.forma = clamp(S.forma + 8, 0, 100); return { det: "Forma +8. Cero ruido.", out: "neutro" }; }, res: "DESCONEXIÓN" } ] },
        { t: "INVITACIÓN AL BOLICHE", d: "Víspera de partido. Los veteranos salen y te invitan.", op: [
            { t: "Salir un rato", fx: () => { S.hinchada = clamp(S.hinchada + 6, 0, 100); S.forma = clamp(S.forma - 10, 0, 100); return { det: "+6 hinchada. El grupo te acepta.", out: "neutro" }; }, res: "NOCHE DE EQUIPO" },
            { t: "Quedarte a dormir", fx: () => { S.forma = clamp(S.forma + 10, 0, 100); return { det: "Forma +10. Profesional.", out: "neutro" }; }, res: "PROFESIONAL" } ] },
        { t: "FIRMA DE AUTÓGRAFOS", d: "200 pibes te esperan a la salida del entrenamiento.", op: [
            { t: "Firmar todo", fx: () => { S.hinchada = clamp(S.hinchada + 10, 0, 100); S.xp += 2; return { det: "+10 hinchada. Ídolo del barrio.", out: "bien" }; }, res: "ÍDOLO TOTAL" },
            { t: "Esquivar a la prensa", fx: () => { S.hinchada = clamp(S.hinchada - 6, 0, 100); S.forma = clamp(S.forma + 6, 0, 100); return { det: "Forma +6. La prensa no perdona.", out: "mal" }; }, res: "DÍA FRÍO" } ] },
        { t: "CLÍNICA PARA PIBES", d: "El club te pide dar una clínica en una escuela.", op: [
            { t: "Ir y darlo todo", fx: () => { S.hinchada = clamp(S.hinchada + 9, 0, 100); S.xp += 4; S.forma = clamp(S.forma - 4, 0, 100); return { det: "+9 hinchada. Los pibes no lo olvidan.", out: "bien" }; }, res: "EJEMPLO" },
            { t: "Mandar un video", fx: () => { S.xp += 3; return { det: "+3 XP. Cumpliste a medias.", out: "neutro" }; }, res: "CUMPLIDO" } ] }
    ];

    const PARTIDOS = [
        { t: "ÚLTIMA POSESIÓN: ABAJO POR 1", d: "10 segundos, pelota tuya. ¿Qué hacés?", op: [
            { t: "TIRAR", stat: "tiro" }, { t: "PENETRAR", stat: "velocidad" }, { t: "PASAR AL COMPAÑERO", stat: "pase" } ] },
        { t: "TE MARCAN DOBLE", d: "Dos encima tuyo en el perímetro.", op: [
            { t: "PASAR", stat: "pase" }, { t: "TIRAR IGUAL", stat: "tiro" }, { t: "ROMPER POR VELOCIDAD", stat: "velocidad" } ] },
        { t: "EL RIVAL ESTÁ EN RACHA", d: "Parcial 12-0 en contra. Hay que frenarlo atrás.", op: [
            { t: "DEFENDER", stat: "defensa" }, { t: "CERRAR EL REBOTE", stat: "rebote" }, { t: "PRESIONAR TODA LA CANCHA", stat: "velocidad" } ] },
        { t: "TÉCNICO A FAVOR", d: "Falta técnica, elegís tirador. ¿Vas vos?", op: [
            { t: "TIRAR", stat: "tiro" }, { t: "DEJAR AL BASE", stat: "pase" }, { t: "PELEAR EL REBOTE", stat: "rebote" } ] },
        { t: "ARRANCÁS EN EL BANCO", d: "El DT te deja en el banco. Entrás en el segundo cuarto.", op: [
            { t: "ENTRAR A CORRER", stat: "velocidad" }, { t: "LEER EL PARTIDO", stat: "pase" }, { t: "CALENTAR LA MANO", stat: "tiro" } ] },
        { t: "FALTA DURA RECIBIDA", d: "Te bajaron de un golpe. La tribuna pide sangre.", op: [
            { t: "RESPONDER DEFENDIENDO", stat: "defensa" }, { t: "SEGUIR ATACANDO", stat: "tiro" }, { t: "CALMAR AL EQUIPO", stat: "pase" } ] },
        { t: "PÉRDIDA DE PELOTA", d: "Perdiste una bola infantil. Contraataque rival.", op: [
            { t: "CORRER ATRÁS", stat: "velocidad" }, { t: "CORTAR CON FALTA", stat: "defensa" }, { t: "CERRAR EL ARO", stat: "rebote" } ] },
        { t: "ZONA RIVAL", d: "Defensa en zona, nadie encuentra el hueco.", op: [
            { t: "TIRAR DE AFUERA", stat: "tiro" }, { t: "PENETRAR EL HUECO", stat: "velocidad" }, { t: "MOVER HASTA EL HUECO", stat: "pase" } ] },
        { t: "REBOTE OFENSIVO CLAVE", d: "Tiro errado, pelota boyando. Momento del partido.", op: [
            { t: "SALTAR CON TODO", stat: "rebote" }, { t: "PALMEARLA", stat: "tiro" }, { t: "BLOQUEAR AL RIVAL", stat: "defensa" } ] },
        { t: "PICK AND ROLL", d: "Cortina perfecta del pivote. La defensa duda.", op: [
            { t: "TIRAR", stat: "tiro" }, { t: "DOBLAR EL PASE", stat: "pase" }, { t: "IR HASTA LA CANASTA", stat: "velocidad" } ] },
        { t: "CIERRE DEFENSIVO", d: "Últimos 2 minutos, arriba por 3. Hay que cerrarlo atrás.", op: [
            { t: "PEGARTE A TU MARCA", stat: "defensa" }, { t: "ASEGURAR EL REBOTE", stat: "rebote" }, { t: "NEGAR CADA PASE", stat: "velocidad" } ] },
        { t: "LIBRES CON PRESIÓN", d: "Dos libres con el estadio en silencio. Todo tuyo.", op: [
            { t: "TIRAR CON RUTINA", stat: "tiro" }, { t: "RESPIRAR Y ENFOCAR", stat: "pase" }, { t: "PENSAR EN EL REBOTE", stat: "rebote" } ] }
    ];

    function elegir(pool, pref) {
        const disp = pool.map((_, i) => i).filter(i => !S.usados.includes(pref + i));
        const lista = disp.length ? disp : pool.map((_, i) => i);
        const idx = lista[Math.floor(Math.random() * lista.length)];
        S.usados.push(pref + idx);
        return pool[idx];
    }
    let MOMENTO = null;

    function prob(stat) {
        return clamp(Math.round(20 + stat * 0.62 + (S.forma - 50) * 0.2 + (S.hinchada - 50) * 0.08), 12, 93);
    }

    function jugadaPartido(stat, clave, final, pend) {
        const p = prob(S.stats[stat]);
        const gano = Math.random() * 100 < p;
        const mult = final ? 1.5 : 1;
        let det, out;
        if (gano) {
            const pts = Math.round(rnd(20, 30) * mult), xp = Math.round(rnd(8, 13) * mult);
            S.puntos += pts; S.xp += xp;
            S.hinchada = clamp(S.hinchada + (final ? 10 : 6), 0, 100);
            if (final) { S.titulos += 1; det = "¡ENTRÓ! +" + pts + " pts, +" + xp + " XP. ¡TÍTULO DE LIGA!"; }
            else det = "¡ENTRÓ! +" + pts + " pts, +" + xp + " XP.";
            out = "bien";
        } else {
            S.puntos += Math.round(rnd(3, 7)); S.xp += 3;
            S.hinchada = clamp(S.hinchada - 4, 0, 100);
            det = "NO ENTRÓ. +3 XP. El equipo te banca igual.";
            out = "mal";
        }
        S.forma = clamp(S.forma - rnd(4, 8), 0, 100);
        S.rival += Math.round(rnd(8, 14));
        irResultado(gano ? (final ? "¡CAMPEONES!" : "¡ENTRÓ!") : "NO ENTRÓ", clave + " · " + p + "% · " + det, out, pend);
    }

    function ofertas() {
        const g = grl();
        // Una vez que salís de la liga local no volvés más: solo NBA.
        const pool = club().liga === "NBA" ? EQUIPOS_NBA : TODOS_CLUBES;
        return pool
            .filter(c => c.abrev !== S.club && g >= c.min)
            .sort((a, b) => b.min - a.min)
            .slice(0, 3);
    }

    function draftNBA() {
        const g = grl();
        const aptos = EQUIPOS_NBA.filter(c => g >= c.min).sort((a, b) => b.min - a.min);
        const lista = aptos.length ? aptos.slice(0, 3)
            : EQUIPOS_NBA.slice().sort((a, b) => a.min - b.min).slice(0, 3);
        return lista;
    }

    function leyenda() {
        const score = grl() * 10 + S.hinchada + S.titulos * 40 + S.puntos;
        if (S.titulos >= 3 && S.puntos >= S.rival) return ["LEYENDA DEL ARO", "Más títulos y más puntos que El Elegido (" + S.rival + "). Tu camiseta cuelga del techo.", score];
        if (S.titulos > 0) return ["CAMPEÓN", "Te fuiste con " + S.titulos + " título(s). El Elegido cerró con " + S.rival + " pts.", score];
        if (S.puntos > S.rival) return ["GOLEADOR SIN ANILLO", "Más puntos que El Elegido, pero el anillo quedó lejos.", score];
        return ["BUEN PASO", "El Elegido cerró con " + S.rival + " pts. Quedaste a un paso.", score];
    }

    // ---------- Recompensa de entrenamientos: solo XP ----------
    const MAPA_ENTRENO = { memoria: "tiro", simon: "pase", defensa: "defensa", reflejos: "velocidad" };
    function consumirEntreno() {
        let r = null;
        try { r = JSON.parse(localStorage.getItem(KEY_ENTRENO) || "null"); } catch (e) {}
        if (r && S.espera && r.juego === S.espera) {
            const xp = r.gano ? 20 : 8;
            S.xp += xp;
            if (!S.jugados.includes(r.juego)) S.jugados.push(r.juego);
            S.flash = ENTRENO[r.juego].titulo + ": " + (r.gano ? "victoria" : "derrota") + ". +" + xp + " XP para el tablero.";
            try { localStorage.removeItem(KEY_ENTRENO); } catch (e) {}
            S.espera = null;
            guardar();
        }
    }

    // ---------- Vistas ----------
    function navbar() {
        return `<header class="navbar"><div class="logo"><span>THE</span><strong>ROOKIE</strong></div><nav><a href="#" data-nav="inicio">INICIO</a><a href="#" data-nav="carrera">CARRERA</a></nav><div class="user"><div class="user-icon">🏀</div><span>${esc(S.nombre || "INVITADO")}</span></div></header>`;
    }

    function tableroHTML(editable) {
        const eq = club();
        const logo = logoDe(eq);
        const marca = logo
            ? `<img class="team-logo" src="${logo}" alt="${esc(eq.abrev)}" onerror="this.style.display='none'">`
            : `<div class="team-mono" style="background:${eq.c1};color:${eq.c2}">${esc(eq.abrev.slice(0, 3))}</div>`;
        const filas = [["velocidad", "⚡ VELOCIDAD"], ["tiro", "🎯 TIRO"], ["rebote", "🏋️ REBOTE"], ["pase", "🏀 PASE"], ["defensa", "🛡️ DEFENSA"]]
            .map(([k, label]) => `<div class="stat-item"><div class="stat-item-header"><span>${label}</span><strong>${S.stats[k]}</strong></div><div class="stat-bar-container"><div class="stat-bar-fill" style="width:${S.stats[k]}%"></div></div>${editable ? `<div class="stat-controls"><button data-stat="${k}" data-d="-1">-</button><span>10 XP</span><button data-stat="${k}" data-d="1">+</button></div>` : ""}</div>`).join("");
        return `<section class="pixel-box tablero" style="--team-primary:${eq.c1};--team-secondary:${eq.c2}">
            <div class="player-header">${avatarHTML(true)}<div class="ovr-badge"><span id="grlNum">${grlVisto}</span><sub>GRL</sub></div>
            <div class="player-names"><h2>${esc(S.nombre)} • ${esc(S.posicion)}</h2><p>${esc(eq.nombre.toUpperCase())} · ${esc(eq.liga)}</p><p class="sub">TEMP ${S.temporada} · ${S.edad} AÑOS · ${esc(eq.ciudad)}</p></div>
            <div class="team-side">${marca}</div></div>
            <div class="game-stats-row">
                <div class="game-stat-box"><label>GRL</label><span>${grl()}</span></div>
                <div class="game-stat-box"><label>XP</label><span>${S.xp}</span></div>
                <div class="game-stat-box"><label>FORMA</label><span>${Math.round(S.forma)}</span></div>
                <div class="game-stat-box"><label>HINCHADA</label><span>${S.hinchada}</span></div>
                <div class="game-stat-box"><label>TÍTULOS</label><span>${S.titulos}</span></div>
            </div>
            ${S.flash ? `<p class="flash">${esc(S.flash)}</p>` : ""}
            <div class="stats-upgrade-grid">${filas}</div>
        </section>`;
    }

    function pInicio() {
        const imp = leerImportado();
        const btnImportar = (imp && S.nombre)
            ? `<button class="btn secondary" data-acc="importar">JUGAR CON ${esc(String(imp.nombre).toUpperCase())} (DEL PROYECTO)</button>` : "";
        return `${navbar()}<main><section class="hero anim-in"><div class="hero-content"><p class="small-title">TU HISTORIA. TU EQUIPO. TU LEGADO.</p><h1>EL ÍDOLO<br><span>DEL ARO</span></h1><p class="description">Carrera larga: 1 año en la liga local, draft NBA, temporadas de 3 momentos, 1 entrenamiento por pretemporada y ofertas según tu GRL. Si venís de crear tu jugador en el proyecto, entra directo.</p><div class="buttons"><button class="btn primary" data-acc="crear">COMENZAR CARRERA</button><button class="btn secondary" data-acc="como">¿CÓMO JUGAR?</button>${btnImportar}</div></div><div class="hero-ball"><div class="ball">🏀</div></div></section></main>`;
    }

    function pComo() {
        return `${navbar()}<main><section class="how anim-in"><div class="section-title"><p>EMPEZÁ TU HISTORIA</p><h2>¿CÓMO JUGAR?</h2></div><div class="steps">
        <div class="step"><span>01</span><h3>CREÁ</h3><p>Nombre, posición, tez y cabello pixel art. Stats del PHP original.</p></div>
        <div class="step"><span>02</span><h3>LIGA LOCAL</h3><p>1 año y 5 decisiones. Después, draft NBA según tu GRL.</p></div>
        <div class="step"><span>03</span><h3>TEMPORADAS</h3><p>3 momentos por año + 1 entrenamiento que da XP.</p></div>
        <div class="step"><span>04</span><h3>FIRMÁ</h3><p>Ofertas según GRL. Cada decisión muestra su resultado y el trash talk.</p></div>
        </div><div class="buttons"><button class="btn primary" data-acc="crear">CREAR JUGADOR</button></div></section></main>`;
    }

    function pCrear() {
        const pos = Object.entries(POS_NOMBRE).map(([c, n]) =>
            `<label class="position ${S.posicion === c ? "sel" : ""}" data-pos="${c}"><strong>${c}</strong><span>${n}</span></label>`).join("");
        const tez = TEZ.map(t => `<button class="swatch ${S.tez === t ? "sel" : ""}" data-tez="${t}" style="background:${t}"></button>`).join("");
        const pelos = CABELLOS.map((c, i) => `<button class="swatch pelo ${S.cabello === c ? "sel" : ""}" data-cabello="${c}"><i class="ahair ${c}"></i><span>${i + 1}</span></button>`).join("");
        const b = S.posicion ? STATS_POR_POSICION[S.posicion] : null;
        const prev = b ? `<div class="stats-container">${["velocidad", "tiro", "rebote", "pase", "defensa"].map(k =>
            `<div class="stat"><div class="stat-header"><span>${k.toUpperCase()}</span><strong>${b[k]}</strong></div><div class="bar"><div style="width:${b[k]}%"></div></div></div>`).join("")}</div>
            <p class="player-note">Stats base de ${POS_NOMBRE[S.posicion]} · igual que en guardar_jugador.php.</p>`
            : `<p class="player-note">Elegí una posición para ver tus stats base del PHP original.</p>`;
        return `${navbar()}<main><section class="player-section anim-in"><div class="player-image"><div><p class="small-title" style="text-align:center">VISTA PREVIA</p>${avatarHTML(false)}<p class="player-name">${esc(S.nombre || "ROOKIE")}</p><p class="player-position">${esc(S.posicion ? S.posicion + " // " + POS_NOMBRE[S.posicion] : "")}</p></div></div><div class="player-info">
        <p class="small-title">TU CARRERA COMIENZA AHORA</p><h2>CREÁ TU<br><span>JUGADOR</span></h2>
        <label class="form-label">NOMBRE</label><input id="nombre" class="form-input" maxlength="50" value="${esc(S.nombre)}" placeholder="Tu nombre">
        <p class="form-label">POSICIÓN</p><div class="positions">${pos}</div>
        <p class="form-label">TEZ</p><div class="swatches">${tez}</div>
        <p class="form-label">CABELLO</p><div class="swatches">${pelos}</div>${prev}
        <p class="form-error">${esc(S.error)}</p>
        <div class="buttons"><button class="btn primary" data-acc="draft">IR AL SORTEO LNB</button></div>
        </div></section></main>`;
    }

    function pDraft() {
        if (!S.draftClub) {
            return `${navbar()}<main><section class="career anim-in"><div class="section-title"><p>LIGA LOCAL · SORTEO</p><h2>CLUB DE ORIGEN</h2></div>${S.origen === "proyecto" ? `<p class="description"><b>${esc(S.nombre.toUpperCase())} · ${esc(S.posicion)}</b> · jugador importado del proyecto original, con su tez y cabello.</p>` : `<p class="description">Tu carrera arranca 1 año en un club random de ligas.sql...</p>`}<div class="draft-slot"><span id="draftName">???</span></div><div class="buttons"><button class="btn primary" data-acc="sortear">SORTEAR CLUB</button></div></section></main>`;
        }
        const c = S.draftClub;
        return `${navbar()}<main><section class="career anim-in"><div class="section-title"><p>LIGA LOCAL · 1 AÑO</p><h2>¡${esc(c.nombre.toUpperCase())}!</h2></div><div class="draft-reveal" style="--team-primary:${c.c1}"><b>${esc(c.abrev)}</b><p>${esc(c.ciudad)} · ${esc(c.arena)} · PIDE ${c.min} GRL</p></div><div class="buttons"><button class="btn primary" data-acc="debut">ARRANCAR EL AÑO</button></div></section></main>`;
    }

    function pDebut() {
        const ev = DEBUT[S.momento];
        const ops = ev.op.map((o, i) => {
            const extra = o.stat ? ` <small>(${o.stat.toUpperCase()} ${S.stats[o.stat]} · ${prob(S.stats[o.stat])}%)</small>` : "";
            return `<button class="btn ${i === 0 ? "primary" : "secondary"}" data-debut="${i}">${esc(o.t)}${extra}</button>`;
        }).join("");
        return `${navbar()}<main>${tableroHTML(false)}<section class="career anim-in"><div class="section-title"><p>LIGA LOCAL · DECISIÓN ${S.momento + 1}/5 · ${esc(club().nombre.toUpperCase())}</p><h2>${ev.t}</h2></div><p class="description">${ev.d}</p><div class="buttons col">${ops}</div></section></main>`;
    }

    function pDraftNBA() {
        const lista = draftNBA();
        const cards = lista.map((c, i) => `<button class="btn ${i === 0 ? "primary" : "secondary"}" data-pick="${c.abrev}">${esc(c.nombre.toUpperCase())} · PIDE ${c.min}<small>${esc(c.ciudad)} · ${esc(c.arena)}</small></button>`).join("");
        return `${navbar()}<main>${tableroHTML(false)}<section class="career anim-in"><div class="section-title"><p>DRAFT NBA · GRL ${grl()}</p><h2>ELEGÍ TU DESTINO</h2></div><p class="description">Tras el año local, estos equipos te draftean. El tablero va a tomar sus colores y su logo.</p><div class="buttons col">${cards}</div></section></main>`;
    }

    function pTemporada() {
        MOMENTO = (S.momento === 0)
            ? { tipo: "personal", ev: elegir(PERSONALES, "p") }
            : { tipo: "partido", ev: elegir(PARTIDOS, "j" + S.temporada + "-"), final: S.momento === 2 };
        guardar();
        const tag = S.momento === 0 ? "PERSONAL" : (MOMENTO.final ? "FINAL DE LIGA" : "PARTIDO · FECHA " + (S.momento + 1));
        const ops = MOMENTO.tipo === "personal"
            ? MOMENTO.ev.op.map((o, i) => `<button class="btn ${i === 0 ? "primary" : "secondary"}" data-ev="${i}">${esc(o.t)}</button>`).join("")
            : MOMENTO.ev.op.map((o) => `<button class="btn primary" data-jugada="${o.stat}">${esc(o.t)} <small>(${o.stat.toUpperCase()} ${S.stats[o.stat]} · ${prob(S.stats[o.stat])}%)</small></button>`).join("");
        return `${navbar()}<main>${tableroHTML(false)}<section class="career anim-in"><div class="section-title"><p>TEMP ${S.temporada} · MOMENTO ${S.momento + 1}/3 · ${tag}</p><h2>${MOMENTO.ev.t}</h2></div><p class="description">${MOMENTO.ev.d}</p><div class="buttons col">${ops}</div></section></main>`;
    }

    function pOffentreno() {
        consumirEntreno();
        const unoHecho = S.jugados.length > 0;
        const cards = Object.entries(ENTRENO).map(([k, e]) => {
            const hecho = S.jugados.includes(k);
            const dis = unoHecho && !hecho ? "dis" : "";
            return `<a class="entreno-card ${hecho ? "hecho" : ""} ${dis}" ${dis ? "" : `data-entreno="${k}" href="${e.archivo}"`}><strong>${hecho ? "✔ " : ""}${e.titulo}</strong><span>${e.desc}</span><b class="stat">+XP PARA EL TABLERO</b></a>`;
        }).join("");
        return `${navbar()}<main>${tableroHTML(true)}<section class="career anim-in"><div class="section-title"><p>PRETEMPORADA · TEMP ${S.temporada}</p><h2>ENTRENAMIENTO · 1 SOLO</h2></div><p class="description">Elegí 1 minijuego: da XP para gastar arriba en el tablero. Después mirá las ofertas.</p>${S.espera ? `<div class="buttons"><button class="btn secondary" data-acc="omitir">OMITIR ${esc(S.espera.toUpperCase())}</button></div>` : ""}<div class="entreno-grid">${cards}</div><div class="buttons"><button class="btn primary" data-acc="ofertas">VER OFERTAS · GRL ${grl()}</button></div></section></main>`;
    }

    function pOfertas() {
        const lista = ofertas();
        const cards = lista.length ? lista.map((c, i) =>
            `<button class="btn ${i === 0 ? "primary" : "secondary"}" data-firma="${c.abrev}">${esc(c.nombre.toUpperCase())} · ${esc(c.liga)} · PIDE ${c.min}</button>`).join("")
            : `<p class="description">Nadie te llama todavía. Tu GRL es ${grl()}. Entrená y volvé.</p>`;
        const retiro = S.edad >= 33 ? `<button class="btn secondary" data-acc="jubilacion">RETIRARME</button>` : "";
        return `${navbar()}<main>${tableroHTML(false)}<section class="career anim-in"><div class="section-title"><p>MERCADO DE PASES</p><h2>OFERTAS · GRL ${grl()}</h2></div><div class="buttons col">${cards}<button class="btn secondary" data-acc="quedar">QUEDARME EN ${esc(club().nombre.toUpperCase())}</button>${retiro}</div></section></main>`;
    }

    function pResultado() {
        const r = S.resultado;
        const tw = r.tweets.map(t => `<div class="tweet"><div class="thead"><span class="tavatar">${esc(t.u.charAt(0))}</span><div class="twho"><b>${esc(t.u)}</b><span>${esc(t.h)}</span></div></div><p>${esc(t.t)}</p></div>`).join("");
        return `${navbar()}<main>${tableroHTML(false)}<section class="career anim-in"><div class="section-title"><p>RESULTADO</p><h2>${esc(r.titulo)}</h2></div><p class="description">${esc(r.detalle)}</p><p class="tw-head">🐦 TWITTER</p>${tw}<div class="buttons"><button class="btn primary" data-acc="seguir">CONTINUAR ➜</button></div></section></main>`;
    }

    function pRetiro() {
        const [titulo, texto, score] = leyenda();
        const filas = [["Temporadas", S.temporada], ["Puntos de carrera", S.puntos], ["Títulos", S.titulos], ["Hinchada", S.hinchada], ["GRL final", grl()], ["El Elegido", S.rival + " pts"], ["SCORE", score]]
            .map(([k, v]) => `<div class="ranking-row"><span>★</span><strong>${k}</strong><span></span><b>${v}</b></div>`).join("");
        return `${navbar()}<main><section class="ranking anim-in"><div class="section-title"><p>BALANCE FINAL · ${esc(club().nombre.toUpperCase())}</p><h2>${titulo}</h2></div><p class="description">${texto}</p><div class="ranking-table"><div class="ranking-header"><span>#</span><span>DATO</span><span></span><span>VALOR</span></div>${filas}</div><div class="buttons"><button class="btn secondary" data-acc="copiar">COPIAR RESULTADO</button><button class="btn primary" data-acc="otra">JUGAR DE NUEVO</button></div></section></main>`;
    }

    // ---------- Render (sin pantallas negras) ----------
    function render() {
        const eq = S.stats ? club() : { c1: "#ff7518", c2: "#1d428a" };
        document.documentElement.style.setProperty("--team-primary", eq.c1);
        document.documentElement.style.setProperty("--team-secondary", eq.c2);
        let html = pInicio();
        if (S.fase === "como") html = pComo();
        if (S.fase === "crear") html = pCrear();
        if (S.fase === "draft") html = pDraft();
        if (S.fase === "debut") html = pDebut();
        if (S.fase === "draftNBA") html = pDraftNBA();
        if (S.fase === "temporada") html = pTemporada();
        if (S.fase === "offentreno") html = pOffentreno();
        if (S.fase === "ofertas") html = pOfertas();
        if (S.fase === "resultado") html = pResultado();
        if (S.fase === "retiro") html = pRetiro();
        root.innerHTML = html;
        animarGrl();
        ligar();
    }

    function animarGrl() {
        const el = document.getElementById("grlNum");
        if (!el) { grlVisto = grl(); return; }
        const de = grlVisto, a = grl();
        if (de === a) { el.textContent = a; return; }
        const t0 = performance.now(), dur = 400;
        (function paso(t) {
            const k = Math.min(1, (t - t0) / dur);
            el.textContent = Math.round(de + (a - de) * k);
            if (k < 1) requestAnimationFrame(paso);
            else grlVisto = a;
        })(t0);
    }

    function ligar() {
        root.querySelectorAll("[data-acc]").forEach(b => b.addEventListener("click", () => {
            const a = b.dataset.acc;
            if (a === "crear") { S.fase = "crear"; S.error = ""; }
            if (a === "como") S.fase = "como";
            if (a === "draft") {
                const inp = root.querySelector("#nombre");
                S.nombre = ((inp ? inp.value : "") || S.nombre).trim();
                if (!/^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ0-9 ]{2,50}$/.test(S.nombre)) { S.error = "Escribí un nombre de 2 a 50 letras."; S.fase = "crear"; render(); return; }
                if (!S.posicion) { S.error = "Elegí una posición."; S.fase = "crear"; render(); return; }
                S.stats = Object.assign({}, STATS_POR_POSICION[S.posicion]);
                S.dorsal = 1 + Math.floor(Math.random() * 98);
                S.fase = "draft"; S.draftClub = null;
            }
            if (a === "sortear") sortear();
            if (a === "debut") { S.fase = "debut"; S.momento = 0; }
            if (a === "ofertas") { S.fase = "ofertas"; S.flash = ""; }
            if (a === "quedar") {
                S.hinchada = clamp(S.hinchada + 8, 0, 100);
                S.rival += 9;
                S.resultado = { titulo: "TE QUEDASTE", detalle: "+8 hinchada. La hinchada lo valora.", tweets: tweets("neutro"), pend: { f: "sigTemp" } };
                S.fase = "resultado";
            }
            if (a === "jubilacion") {
                S.resultado = { titulo: "EL RETIRO", detalle: "Colgás los botines con " + S.edad + " años.", tweets: tweets("neutro"), pend: { f: "retiro" } };
                S.fase = "resultado";
            }
            if (a === "omitir") { S.espera = null; S.flash = "Entrenamiento omitido."; }
            if (a === "importar") { const imp = leerImportado(); if (imp) aplicarImportado(imp); else render(); return; }
            if (a === "seguir") seguir();
            if (a === "otra") { try { localStorage.removeItem(KEY); } catch (e) {} S = base(); grlVisto = 0; }
            if (a === "copiar") {
                const [t, , score] = leyenda();
                const txt = `EL ÍDOLO DEL ARO 🏀 ${S.nombre} (${S.posicion}) · ${club().nombre} · ${t} · Score ${score} · ${S.puntos}pts ${S.titulos}🏆`;
                if (navigator.clipboard) navigator.clipboard.writeText(txt);
            }
            guardar(); render();
        }));

        root.querySelectorAll("[data-debut]").forEach(b => b.addEventListener("click", () => {
            const o = DEBUT[S.momento].op[Number(b.dataset.debut)];
            if (o.fx) {
                const r = o.fx();
                S.rival += 9;
                irResultado(o.res, r.det, r.out, { f: S.momento < 4 ? "debut" : "draftNBA" });
            } else {
                jugadaPartido(S.stats[o.st], o.st.toUpperCase(), false, { f: S.momento < 4 ? "debut" : "draftNBA" });
            }
        }));

        root.querySelectorAll("[data-ev]").forEach(b => b.addEventListener("click", () => {
            const o = MOMENTO.ev.op[Number(b.dataset.ev)];
            const r = o.fx();
            S.rival += 9;
            irResultado(o.res, r.det, r.out, { f: "avanzar" });
        }));

        root.querySelectorAll("[data-jugada]").forEach(b => b.addEventListener("click", () => {
            const clave = b.dataset.jugada;
            jugadaPartido(S.stats[clave], clave.toUpperCase(), MOMENTO.final, { f: "avanzar" });
        }));

        root.querySelectorAll("[data-pick]").forEach(b => b.addEventListener("click", () => {
            const nuevo = clubPorAbrev(b.dataset.pick);
            S.club = nuevo.abrev;
            S.historial.push(nuevo.nombre);
            S.hinchada = 60;
            S.temporada = 1;
            S.momento = 0; S.usados = []; S.jugados = [];
            S.resultado = { titulo: "DRAFTEADO POR " + nuevo.nombre.toUpperCase(), detalle: "El tablero toma sus colores y su logo. Arranca la NBA.", tweets: tweets("bien"), pend: { f: "temporada" } };
            S.fase = "resultado";
            guardar(); render();
        }));

        root.querySelectorAll("[data-firma]").forEach(b => b.addEventListener("click", () => {
            const nuevo = clubPorAbrev(b.dataset.firma);
            const saltoLiga = nuevo.liga !== club().liga;
            S.club = nuevo.abrev;
            S.historial.push(nuevo.nombre);
            S.hinchada = saltoLiga ? 55 : clamp(S.hinchada + 4, 0, 100);
            S.xp += 10;
            S.rival += 9;
            S.resultado = { titulo: "FICHAJE: " + nuevo.nombre.toUpperCase(), detalle: "Nueva liga (" + nuevo.liga + "), +10 XP. El tablero cambia de color.", tweets: tweets("bien"), pend: { f: "sigTemp" } };
            S.fase = "resultado";
            guardar(); render();
        }));

        root.querySelectorAll("[data-entreno]").forEach(n => n.addEventListener("click", () => {
            S.espera = n.dataset.entreno;
            guardar();
        }));

        root.querySelectorAll("[data-pos]").forEach(l => l.addEventListener("click", () => { S.posicion = l.dataset.pos; S.error = ""; render(); }));
        root.querySelectorAll("[data-tez]").forEach(x => x.addEventListener("click", () => { S.tez = x.dataset.tez; render(); }));
        root.querySelectorAll("[data-cabello]").forEach(x => x.addEventListener("click", () => { S.cabello = x.dataset.cabello; render(); }));
        root.querySelectorAll("[data-nav]").forEach(n => n.addEventListener("click", e => {
            e.preventDefault();
            if (n.dataset.nav === "inicio") S.fase = "inicio";
            if (n.dataset.nav === "carrera" && S.stats) S.fase = S.club ? (S.temporada >= 1 && S.momento <= 2 && S.historial.length > 1 ? "temporada" : "offentreno") : "draft";
            render();
        }));
        const inp = root.querySelector("#nombre");
        if (inp) inp.addEventListener("input", () => { S.nombre = inp.value; });
        root.querySelectorAll("[data-stat]").forEach(btn => btn.addEventListener("click", () => {
            const k = btn.dataset.stat, d = Number(btn.dataset.d);
            if (d > 0 && S.xp >= 10 && S.stats[k] < 99) { S.xp -= 10; S.stats[k] += 1; S.flash = k.toUpperCase() + " +1."; }
            else if (d < 0 && S.stats[k] > 40) { S.xp += 10; S.stats[k] -= 1; S.flash = k.toUpperCase() + " -1. +10 XP."; }
            else S.flash = "Sin XP o stat al límite.";
            guardar(); render();
        }));
    }

    function seguir() {
        const p = S.resultado ? S.resultado.pend : { f: "avanzar" };
        S.resultado = null;
        if (p.f === "debut") {
            if (S.momento < 4) { S.momento += 1; S.fase = "debut"; }
            else { S.fase = "draftNBA"; }
        }
        else if (p.f === "avanzar") {
            if (S.momento < 2) { S.momento += 1; S.fase = "temporada"; }
            else { S.jugados = []; S.fase = "offentreno"; }
        }
        else if (p.f === "draftNBA") S.fase = "draftNBA";
        else if (p.f === "temporada") { S.fase = "temporada"; }
        else if (p.f === "sigTemp") siguienteTemporada();
        else if (p.f === "retiro") S.fase = "retiro";
        guardar(); render();
    }

    function sortear() {
        const el = document.getElementById("draftName");
        if (!el) return;
        let n = 0;
        const iv = setInterval(() => {
            el.textContent = CLUBES_LNB[Math.floor(Math.random() * CLUBES_LNB.length)].nombre.toUpperCase();
            if (++n > 12) {
                clearInterval(iv);
                S.draftClub = CLUBES_LNB[Math.floor(Math.random() * CLUBES_LNB.length)];
                S.club = S.draftClub.abrev;
                S.historial = [S.draftClub.nombre];
                guardar(); render();
            }
        }, 90);
    }

    function siguienteTemporada() {
        S.temporada += 1;
        S.edad += 1;
        S.momento = 0;
        S.usados = [];
        S.jugados = [];
        S.espera = null;
        S.forma = clamp(S.forma + 15, 0, 100);
        S.fase = (S.temporada > MAX_TEMP || S.edad >= EDAD_RETIRO) ? "retiro" : "temporada";
        guardar(); render();
    }

    window.addEventListener("focus", () => {
        if (S.espera && S.fase === "offentreno") render();
    });

    cargar();
    render();
})();
