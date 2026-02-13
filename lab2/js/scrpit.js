//Global variables
let randomNumber;
let attempts = 0;
let wins = 0;
let losses = 0;
const MAX_ATTEMPTS = 7;

//Event Listeners
document.querySelector("#guessBtn").addEventListener("click", checkGuess);
document.querySelector("#resetBtn").addEventListener("click", initializeGame);

initializeGame();

function initializeGame() {
    attempts = 0;
    updateAttemptsLeft();
    updateWinLoss();
    randomNumber = Math.floor(Math.random() * 99) + 1;
    console.log("Random number:" + randomNumber);

    //hiding the Reset button
    document.querySelector("#resetBtn").style.display = "none";

    //showing the Guess button
    document.querySelector("#guessBtn").style.display = "inline";

    let playerGuess = document.querySelector("#playerGuess");
    playerGuess.focus(); //adding focus to textbox
    playerGuess.value = ""; //clearing the textbox

    let feedback = document.querySelector("#feedback");
    feedback.textContent = ""; //clearing the feedback

    //clearing previous guesses
    document.querySelector("#guesses").textContent = "";
}

function checkGuess() {
    let feedback = document.querySelector("#feedback");
    feedback.textContent = "";

    let guess = document.querySelector("#playerGuess").value;
    console.log("player guess: " + guess);

    if (guess < 1 || guess > 99) {
        feedback.textContent = "Enter a number between 1 and 99";
        feedback.style.color = "red";
        return;
    }
    attempts++;
    updateAttemptsLeft();
    console.log("Attempts:" + attempts);
    feedback.style.color = "orange";
    if (guess == randomNumber) {
        feedback.textContent = "You guessed it! You Won!";
        feedback.style.color = "darkgreen";
        wins++;
        updateWinLoss();
        gameOver();
        return;
    } else {
        document.querySelector("#guesses").textContent += guess + " ";
        if (attempts >= MAX_ATTEMPTS) {
            feedback.textContent = "You Lost";
            feedback.style.color = "red";
            losses++;
            updateWinLoss();
            gameOver();
            return;
        } else if (guess > randomNumber) {
            feedback.textContent = "Guess was high";
        } else {
            feedback.textContent = "Guess was low";
        }
    }
}

//all this happens after a gameover
function gameOver() {
    let guessBtn = document.querySelector("#guessBtn");
    let resetBtn = document.querySelector("#resetBtn");
    guessBtn.style.display = "none"; //hides button
    resetBtn.style.display = "inline"; //displays button
}

function updateAttemptsLeft() {
    const remaining = Math.max(0, MAX_ATTEMPTS - attempts);
    document.querySelector("#attemptsLeft").textContent = remaining;
}

function updateWinLoss() {
    document.querySelector("#winsCount").textContent = wins;
    document.querySelector("#lossesCount").textContent = losses;
}

