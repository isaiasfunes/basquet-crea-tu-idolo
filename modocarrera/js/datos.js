// Datos copiados (solo lectura) de guardar_jugador.php y sql/ligas.sql + equipos.sql.
// Vive en la carpeta "Modo carrera": los originales no se tocan.
const STATS_POR_POSICION = {
    PG: { velocidad: 80, tiro: 65, rebote: 40, pase: 85, defensa: 60 },
    SG: { velocidad: 75, tiro: 85, rebote: 45, pase: 60, defensa: 55 },
    SF: { velocidad: 70, tiro: 70, rebote: 60, pase: 55, defensa: 65 },
    PF: { velocidad: 55, tiro: 55, rebote: 80, pase: 45, defensa: 70 },
    C:  { velocidad: 45, tiro: 45, rebote: 90, pase: 35, defensa: 80 }
};

const POS_NOMBRE = { PG: "BASE", SG: "ESCOLTA", SF: "ALERO", PF: "ALA-PIVOT", C: "PIVOT" };

// Entrenamientos (copias en entrenamientos/) y qué stat suben.
const ENTRENO = {
    memoria: { titulo: "MEMORIA DE BÁSQUET", desc: "8 parejas · 5 vidas", stat: "tiro", archivo: "entrenamientos/memoria.html" },
    simon: { titulo: "SIMÓN DICE", desc: "7 rondas de secuencias", stat: "pase", archivo: "entrenamientos/simon.html" },
    defensa: { titulo: "DEFENSA DEL ARO", desc: "Tapá 20 pelotas", stat: "defensa", archivo: "entrenamientos/defensa.html" },
    reflejos: { titulo: "DESAFÍO DE REFLEJOS", desc: "30 segundos de reacción", stat: "velocidad", archivo: "entrenamientos/reflejos.html" }
};

// Clubes LNB de sql/ligas.sql (sorteo inicial). Sin logo: se usa monograma con sus colores.
const CLUBES_LNB = [
    { id: 1001, nombre: "Boca Juniors", abrev: "BOC", ciudad: "Buenos Aires", arena: "Microestadio Luis Conde", c1: "#0033A0", c2: "#F4C400", liga: "LNB", min: 72 },
    { id: 1002, nombre: "San Lorenzo", abrev: "SLO", ciudad: "Buenos Aires", arena: "Polideportivo Roberto Pando", c1: "#E30613", c2: "#0033A0", liga: "LNB", min: 71 },
    { id: 1003, nombre: "Quimsa", abrev: "QUI", ciudad: "Santiago del Estero", arena: "Estadio Ciudad", c1: "#111111", c2: "#F5C518", liga: "LNB", min: 70 },
    { id: 1004, nombre: "Gimnasia (Comodoro)", abrev: "GCR", ciudad: "Comodoro Rivadavia", arena: "Socios Fundadores", c1: "#007A33", c2: "#FFFFFF", liga: "LNB", min: 70 },
    { id: 1005, nombre: "Instituto", abrev: "INS", ciudad: "Córdoba", arena: "Gimnasio Ángel Sandrín", c1: "#C8102E", c2: "#FFFFFF", liga: "LNB", min: 68 },
    { id: 1006, nombre: "Ferro", abrev: "FER", ciudad: "Buenos Aires", arena: "Estadio Héctor Etchart", c1: "#006633", c2: "#FFFFFF", liga: "LNB", min: 66 },
    { id: 1007, nombre: "Regatas Corrientes", abrev: "REG", ciudad: "Corrientes", arena: "Sede del club", c1: "#003366", c2: "#FFFFFF", liga: "LNB", min: 66 },
    { id: 1008, nombre: "Peñarol (Mar del Plata)", abrev: "PEN", ciudad: "Mar del Plata", arena: "Polideportivo Islas Malvinas", c1: "#111111", c2: "#F4C400", liga: "LNB", min: 65 },
    { id: 1009, nombre: "Oberá Tenis Club", abrev: "OTC", ciudad: "Oberá", arena: "Sede del club", c1: "#1B4F9C", c2: "#FFFFFF", liga: "LNB", min: 64 },
    { id: 1010, nombre: "Atenas", abrev: "ATE", ciudad: "Córdoba", arena: "Polideportivo Carlos Cerutti", c1: "#007A33", c2: "#FFFFFF", liga: "LNB", min: 64 },
    { id: 1011, nombre: "San Martín (Corrientes)", abrev: "SMC", ciudad: "Corrientes", arena: "Sede del club", c1: "#C8102E", c2: "#111111", liga: "LNB", min: 63 },
    { id: 1012, nombre: "Olímpico (La Banda)", abrev: "OLI", ciudad: "La Banda", arena: "Sede del club", c1: "#F5C518", c2: "#111111", liga: "LNB", min: 62 },
    { id: 1013, nombre: "Platense", abrev: "PLA", ciudad: "Buenos Aires", arena: "Microestadio Platense", c1: "#6B2C3E", c2: "#FFFFFF", liga: "LNB", min: 61 },
    { id: 1014, nombre: "La Unión (Formosa)", abrev: "LUF", ciudad: "Formosa", arena: "Sede del club", c1: "#C8102E", c2: "#FFFFFF", liga: "LNB", min: 60 },
    { id: 1015, nombre: "Argentino (Junín)", abrev: "AJU", ciudad: "Junín", arena: "El Fortín de las Morochas", c1: "#7BAFD4", c2: "#FFFFFF", liga: "LNB", min: 60 },
    { id: 1016, nombre: "Independiente (Oliva)", abrev: "IDO", ciudad: "Oliva", arena: "Sede del club", c1: "#C8102E", c2: "#FFFFFF", liga: "LNB", min: 58 },
    { id: 1017, nombre: "Racing (Chivilcoy)", abrev: "RCH", ciudad: "Chivilcoy", arena: "Sede del club", c1: "#7BA7D4", c2: "#FFFFFF", liga: "LNB", min: 56 },
    { id: 1018, nombre: "Lanús", abrev: "LAN", ciudad: "Lanús", arena: "Microestadio Antonio Rotili", c1: "#6B0F1A", c2: "#FFFFFF", liga: "LNB", min: 54 }
];

// Equipos NBA de equipos.sql + minima de sql/ligas.sql. Logo local en assets/.
const EQUIPOS_NBA = [
    { id: 1, nombre: "Boston Celtics", abrev: "BOS", ciudad: "Boston", conf: "Este", div: "Atlantic", arena: "TD Garden", c1: "#007A33", c2: "#BA9653", liga: "NBA", min: 96 },
    { id: 2, nombre: "Brooklyn Nets", abrev: "BKN", ciudad: "Brooklyn", conf: "Este", div: "Atlantic", arena: "Barclays Center", c1: "#000000", c2: "#FFFFFF", liga: "NBA", min: 82 },
    { id: 3, nombre: "New York Knicks", abrev: "NYK", ciudad: "New York", conf: "Este", div: "Atlantic", arena: "Madison Square Garden", c1: "#006BB6", c2: "#F58426", liga: "NBA", min: 93 },
    { id: 4, nombre: "Philadelphia 76ers", abrev: "PHI", ciudad: "Philadelphia", conf: "Este", div: "Atlantic", arena: "Wells Fargo Center", c1: "#006BB6", c2: "#ED174C", liga: "NBA", min: 87 },
    { id: 5, nombre: "Toronto Raptors", abrev: "TOR", ciudad: "Toronto", conf: "Este", div: "Atlantic", arena: "Scotiabank Arena", c1: "#CE1141", c2: "#000000", liga: "NBA", min: 84 },
    { id: 6, nombre: "Chicago Bulls", abrev: "CHI", ciudad: "Chicago", conf: "Este", div: "Central", arena: "United Center", c1: "#CE1141", c2: "#000000", liga: "NBA", min: 83 },
    { id: 7, nombre: "Cleveland Cavaliers", abrev: "CLE", ciudad: "Cleveland", conf: "Este", div: "Central", arena: "Rocket Mortgage FieldHouse", c1: "#860038", c2: "#FDBB30", liga: "NBA", min: 91 },
    { id: 8, nombre: "Detroit Pistons", abrev: "DET", ciudad: "Detroit", conf: "Este", div: "Central", arena: "Little Caesars Arena", c1: "#C8102E", c2: "#1D42BA", liga: "NBA", min: 82 },
    { id: 9, nombre: "Indiana Pacers", abrev: "IND", ciudad: "Indianapolis", conf: "Este", div: "Central", arena: "Gainbridge Fieldhouse", c1: "#002D62", c2: "#FDBB30", liga: "NBA", min: 87 },
    { id: 10, nombre: "Milwaukee Bucks", abrev: "MIL", ciudad: "Milwaukee", conf: "Este", div: "Central", arena: "Fiserv Forum", c1: "#00471B", c2: "#EEE1C6", liga: "NBA", min: 92 },
    { id: 11, nombre: "Atlanta Hawks", abrev: "ATL", ciudad: "Atlanta", conf: "Este", div: "Southeast", arena: "State Farm Arena", c1: "#E03A3E", c2: "#C1D32F", liga: "NBA", min: 83 },
    { id: 12, nombre: "Charlotte Hornets", abrev: "CHA", ciudad: "Charlotte", conf: "Este", div: "Southeast", arena: "Spectrum Center", c1: "#1D1160", c2: "#00788C", liga: "NBA", min: 78 },
    { id: 13, nombre: "Miami Heat", abrev: "MIA", ciudad: "Miami", conf: "Este", div: "Southeast", arena: "Kaseya Center", c1: "#98002E", c2: "#F9A01B", liga: "NBA", min: 90 },
    { id: 14, nombre: "Orlando Magic", abrev: "ORL", ciudad: "Orlando", conf: "Este", div: "Southeast", arena: "Kia Center", c1: "#0077C0", c2: "#C4CED4", liga: "NBA", min: 84 },
    { id: 15, nombre: "Washington Wizards", abrev: "WAS", ciudad: "Washington", conf: "Este", div: "Southeast", arena: "Capital One Arena", c1: "#002B5C", c2: "#E31837", liga: "NBA", min: 78 },
    { id: 16, nombre: "Denver Nuggets", abrev: "DEN", ciudad: "Denver", conf: "Oeste", div: "Northwest", arena: "Ball Arena", c1: "#0E2240", c2: "#FEC524", liga: "NBA", min: 94 },
    { id: 17, nombre: "Minnesota Timberwolves", abrev: "MIN", ciudad: "Minneapolis", conf: "Oeste", div: "Northwest", arena: "Target Center", c1: "#0C2340", c2: "#236192", liga: "NBA", min: 91 },
    { id: 18, nombre: "Oklahoma City Thunder", abrev: "OKC", ciudad: "Oklahoma City", conf: "Oeste", div: "Northwest", arena: "Paycom Center", c1: "#007AC1", c2: "#EF3B24", liga: "NBA", min: 95 },
    { id: 19, nombre: "Portland Trail Blazers", abrev: "POR", ciudad: "Portland", conf: "Oeste", div: "Northwest", arena: "Moda Center", c1: "#E03A3E", c2: "#000000", liga: "NBA", min: 80 },
    { id: 20, nombre: "Utah Jazz", abrev: "UTA", ciudad: "Salt Lake City", conf: "Oeste", div: "Northwest", arena: "Delta Center", c1: "#002B5C", c2: "#F9A01B", liga: "NBA", min: 81 },
    { id: 21, nombre: "Golden State Warriors", abrev: "GSW", ciudad: "San Francisco", conf: "Oeste", div: "Pacific", arena: "Chase Center", c1: "#1D428A", c2: "#FFC72C", liga: "NBA", min: 93 },
    { id: 22, nombre: "LA Clippers", abrev: "LAC", ciudad: "Inglewood", conf: "Oeste", div: "Pacific", arena: "Intuit Dome", c1: "#C8102E", c2: "#1D428A", liga: "NBA", min: 88 },
    { id: 23, nombre: "Los Angeles Lakers", abrev: "LAL", ciudad: "Los Angeles", conf: "Oeste", div: "Pacific", arena: "Crypto.com Arena", c1: "#552583", c2: "#FDB927", liga: "NBA", min: 92 },
    { id: 24, nombre: "Phoenix Suns", abrev: "PHX", ciudad: "Phoenix", conf: "Oeste", div: "Pacific", arena: "Footprint Center", c1: "#1D1160", c2: "#E56020", liga: "NBA", min: 86 },
    { id: 25, nombre: "Sacramento Kings", abrev: "SAC", ciudad: "Sacramento", conf: "Oeste", div: "Pacific", arena: "Golden 1 Center", c1: "#5A2D81", c2: "#63727A", liga: "NBA", min: 84 },
    { id: 26, nombre: "Dallas Mavericks", abrev: "DAL", ciudad: "Dallas", conf: "Oeste", div: "Southwest", arena: "American Airlines Center", c1: "#00538C", c2: "#002B5E", liga: "NBA", min: 89 },
    { id: 27, nombre: "Houston Rockets", abrev: "HOU", ciudad: "Houston", conf: "Oeste", div: "Southwest", arena: "Toyota Center", c1: "#CE1141", c2: "#000000", liga: "NBA", min: 89 },
    { id: 28, nombre: "Memphis Grizzlies", abrev: "MEM", ciudad: "Memphis", conf: "Oeste", div: "Southwest", arena: "FedExForum", c1: "#5D76A9", c2: "#12173F", liga: "NBA", min: 85 },
    { id: 29, nombre: "New Orleans Pelicans", abrev: "NOP", ciudad: "New Orleans", conf: "Oeste", div: "Southwest", arena: "Smoothie King Center", c1: "#0C2340", c2: "#C8102E", liga: "NBA", min: 82 },
    { id: 30, nombre: "San Antonio Spurs", abrev: "SAS", ciudad: "San Antonio", conf: "Oeste", div: "Southwest", arena: "Frost Bank Center", c1: "#C4CED4", c2: "#000000", liga: "NBA", min: 90 }
];

const TODOS_CLUBES = CLUBES_LNB.concat(EQUIPOS_NBA);

// Personalización pixel art ( postes de crearjugador2.html del proyecto original )
const TEZ = ["#6f432b", "#a96f48", "#d39468", "#efbd91"];
const CABELLOS = ["style1", "style2", "style3", "style4"];

function clubPorAbrev(ab) { return TODOS_CLUBES.find(c => c.abrev === ab) || CLUBES_LNB[0]; }

function logoDe(eq) {
    if (!eq || eq.liga !== "NBA") return null;
    const cod = String(eq.abrev).toLowerCase();
    return "assets/" + cod + (cod === "mia" ? ".gif" : ".png");
}
