        const board = document.getElementById("board");

const message = document.getElementById("message");

const roundDisplay = document.getElementById("round");

const sequenceLengthDisplay =
    document.getElementById("sequence-length");

const recordDisplay =
    document.getElementById("record");

const startButton =
    document.getElementById("start-button");


// --------------------------------------------------
// CONFIGURACIÓN DEL JUEGO
// --------------------------------------------------

// 16 cuadros
const colors = [
    "red",
    "blue",
    "green",
    "yellow",

    "purple",
    "orange",
    "pink",
    "cyan",

    "red",
    "blue",
    "green",
    "yellow",

    "purple",
    "orange",
    "pink",
    "cyan"
];


// Las 8 rondas
// 1, 2, 3, 4, 5, 6, 6, 6
const rounds = [
    1,
    2,
    3,
    4,
    5,
    6,
    6,
    6
];


// --------------------------------------------------
// VARIABLES
// --------------------------------------------------

let buttons = [];

let sequence = [];

let playerSequence = [];

let currentRound = 0;

let playerTurn = false;

let record = 0;


// --------------------------------------------------
// CREAR LOS 16 CUADROS
// --------------------------------------------------

function createBoard() {

    board.innerHTML = "";

    buttons = [];

    colors.forEach((color, index) => {

        const button = document.createElement("button");

        button.classList.add(
            "color-button",
            color
        );

        button.dataset.index = index;

        button.addEventListener(
            "click",
            () => playerClick(index)
        );

        board.appendChild(button);

        buttons.push(button);
    });
}


// --------------------------------------------------
// COMENZAR JUEGO
// --------------------------------------------------

function startGame() {

    currentRound = 0;

    sequence = [];

    playerSequence = [];

    playerTurn = false;

    startButton.disabled = true;

    record = 0;

    recordDisplay.textContent = record;

    nextRound();
}


// --------------------------------------------------
// SIGUIENTE RONDA
// --------------------------------------------------

function nextRound() {

    playerTurn = false;

    playerSequence = [];

    // Pasar a la siguiente ronda
    currentRound++;

    // Si terminó las 8 rondas
    if (currentRound > rounds.length) {

        winGame();

        return;
    }


    // Cantidad de colores de esta ronda
    const sequenceLength =
        rounds[currentRound - 1];


    // Crear nueva secuencia
    sequence = [];


    for (let i = 0; i < sequenceLength; i++) {

        const randomIndex =
            Math.floor(Math.random() * buttons.length);

        sequence.push(randomIndex);
    }


    // Actualizar información
    roundDisplay.textContent =
        `${currentRound}/${rounds.length}`;

    sequenceLengthDisplay.textContent =
        sequenceLength;


    message.textContent =
        "👀 Mirá la secuencia...";


    // Mostrar secuencia
    setTimeout(() => {

        showSequence();

    }, 800);
}


// --------------------------------------------------
// MOSTRAR SECUENCIA
// --------------------------------------------------

async function showSequence() {

    playerTurn = false;

    for (let i = 0; i < sequence.length; i++) {

        const index = sequence[i];

        await sleep(500);

        buttons[index].classList.add("active");

        await sleep(450);

        buttons[index].classList.remove("active");
    }


    // Ahora juega el usuario
    playerTurn = true;

    message.textContent =
        "🎯 ¡Ahora repetí la secuencia!";
}


// --------------------------------------------------
// JUGADOR PRESIONA UN CUADRO
// --------------------------------------------------

function playerClick(index) {

    // No hacer nada si Simón está mostrando
    // la secuencia
    if (!playerTurn) {
        return;
    }


    // Mostrar brevemente el botón
    buttons[index].classList.add("active");

    setTimeout(() => {

        buttons[index].classList.remove("active");

    }, 150);


    // Guardar elección
    playerSequence.push(index);


    // Posición actual
    const position =
        playerSequence.length - 1;


    // Comprobar si es correcto
    if (
        playerSequence[position] !==
        sequence[position]
    ) {

        gameOver();

        return;
    }


    // ¿Terminó correctamente?
    if (
        playerSequence.length ===
        sequence.length
    ) {

        playerTurn = false;

        // Actualizar récord
        if (currentRound > record) {

            record = currentRound;

            recordDisplay.textContent = record;
        }


        message.textContent =
            "✅ ¡Correcto!";

        // Esperar antes de la siguiente ronda
        setTimeout(() => {

            nextRound();

        }, 1000);
    }
}


// --------------------------------------------------
// GAME OVER
// --------------------------------------------------

function gameOver() {

    playerTurn = false;

    message.textContent =
        `❌ ¡Te equivocaste! Llegaste a la ronda ${currentRound}.`;

    startButton.disabled = false;

    startButton.textContent =
        "🔄 Jugar de nuevo";
}


// --------------------------------------------------
// GANAR
// --------------------------------------------------

function winGame() {

    playerTurn = false;

    message.textContent =
        "🏆 ¡GANASTE! Completaste las 8 rondas.";

    startButton.disabled = false;

    startButton.textContent =
        "🔄 Jugar de nuevo";

    record = 8;

    recordDisplay.textContent = record;
}


// --------------------------------------------------
// FUNCIÓN PARA ESPERAR
// --------------------------------------------------

function sleep(milliseconds) {

    return new Promise(resolve => {

        setTimeout(resolve, milliseconds);

    });
}


// --------------------------------------------------
// BOTÓN COMENZAR
// --------------------------------------------------

startButton.addEventListener(
    "click",
    startGame
);


// --------------------------------------------------
// INICIAR TABLERO
// --------------------------------------------------

createBoard();
    
