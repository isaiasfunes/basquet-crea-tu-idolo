const board = document.getElementById("game-board");
const livesText = document.getElementById("lives");
const pairsText = document.getElementById("pairs");
const message = document.getElementById("message");

const restart = document.getElementById("restart");

const startScreen =
    document.getElementById("start-screen");

const startButton =
    document.getElementById("start-button");


// 8 parejas
const symbols = [
    "🏀", "🏀",
    "⛹️", "⛹️",
    "🏆", "🏆",
    "🥇", "🥇",
    "👟", "👟",
    "🎽", "🎽",
    "🔥", "🔥",
    "⭐", "⭐"
];


let firstCard = null;
let secondCard = null;

let lockBoard = true;

let lives = 5;
let pairs = 0;



function shuffle(array) {

    for (let i = array.length - 1; i > 0; i--) {

        const j =
            Math.floor(Math.random() * (i + 1));

        [array[i], array[j]] =
        [array[j], array[i]];
    }

}



function createBoard() {

    board.innerHTML = "";

    firstCard = null;
    secondCard = null;

    lockBoard = true;

    lives = 5;
    pairs = 0;

    livesText.textContent = lives;
    pairsText.textContent = pairs;

    message.textContent =
        "👀 ¡Memorizá las cartas!";

    const cards = [...symbols];

    shuffle(cards);


    cards.forEach(symbol => {

        const card =
            document.createElement("div");

        card.classList.add("card");

        card.innerHTML = `
            <div class="card-inner">

                <div class="card-front">
                    🏀
                </div>

                <div class="card-back">
                    ${symbol}
                </div>

            </div>
        `;

        board.appendChild(card);

    });



    const allCards =
        document.querySelectorAll(".card");

    allCards.forEach(card => {
        card.classList.add("flipped");
    });


  
    setTimeout(() => {

        allCards.forEach(card => {

            if (!card.classList.contains("matched")) {
                card.classList.remove("flipped");
            }

        });

        lockBoard = false;

        message.textContent =
            "🧠 ¡Encontrá todos los pares!";

    }, 1000);

}



function flipCard(card) {

    if (lockBoard) return;

    if (card === firstCard) return;

    if (card.classList.contains("matched")) return;

    card.classList.add("flipped");


    if (!firstCard) {

        firstCard = card;

        return;
    }


    secondCard = card;

    lockBoard = true;

    checkMatch();

}



function checkMatch() {

    const firstSymbol =
        firstCard
        .querySelector(".card-back")
        .textContent
        .trim();

    const secondSymbol =
        secondCard
        .querySelector(".card-back")
        .textContent
        .trim();


    if (firstSymbol === secondSymbol) {

        firstCard.classList.add("matched");
        secondCard.classList.add("matched");

        pairs++;

        pairsText.textContent = pairs;

        firstCard = null;
        secondCard = null;

        lockBoard = false;

        message.textContent =
            "✅ ¡Pareja encontrada!";


        // Ganó
        if (pairs === 8) {

            lockBoard = true;

            message.textContent =
                "🏆 ¡GANASTE! Encontraste todas las parejas.";

        }

    }

    else {

        lives--;

        livesText.textContent = lives;

        message.textContent =
            "❌ No coinciden.";

        setTimeout(() => {

            firstCard.classList.remove("flipped");
            secondCard.classList.remove("flipped");

            firstCard = null;
            secondCard = null;


            if (lives <= 0) {

                lockBoard = true;

                message.textContent =
                    "💥 GAME OVER. Te quedaste sin vidas.";

            }

            else {

                lockBoard = false;

            }

        }, 800);

    }

}



board.addEventListener("click", function(e) {

    const card =
        e.target.closest(".card");

    if (!card) return;

    flipCard(card);

});



startButton.addEventListener("click", function() {

    startScreen.style.display = "none";

    createBoard();

});



restart.addEventListener("click", function() {

    createBoard();

});
