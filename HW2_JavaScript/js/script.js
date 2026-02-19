let wordlist = ["javascript", "school", "computer", "html", "internet", "programming", "turtwig"];
let maxWrong = 6;

let secretWord = "";
let guessedLetters = [];
let wrong = 0;

let hangmanPic = document.getElementById("hangmanPic");
let wordBox = document.getElementById("wordBox");
let userLetter = document.getElementById("userLetter");
let guessButton = document.getElementById("guessButton");
let newButton = document.getElementById("newButton");
let statusText = document.getElementById("statusText");
let lettersGuessed = document.getElementById("lettersGuessed");

guessButton.addEventListener("click", guessLetter);
newButton.addEventListener("click", newGame);

function randomWord() {
    let randomIndex = Math.floor(Math.random() * wordlist.length);
    return wordlist[randomIndex];
}

function displayWord() {
    let display = "";

    for (let i = 0; i < secretWord.length; i++) {
        let letter = secretWord[i];

        if (guessedLetters.includes(letter)) {
            display += letter + " ";
        } else {
            display += "_ "
        }

    }

    wordBox.textContent = display.trim();
}

function updateGame() {
    lettersGuessed.textContent = "Letters Guessed: " + (guessedLetters.length ? guessedLetters.join(", "): "none");
    hangmanPic.src = "images/hangman" + wrong + ".png";

    displayWord();
}

function checkGame() {
    if (!wordBox.textContent.includes("_")) {
        statusText.textContent = "You got it! The word was " + "'" + secretWord + "'.";
        guessButton.disabled = true;
        userLetter.disabled = true;
    }

    if (wrong >= maxWrong) {
        statusText.textContent = "Game Over, the word was " + "'" + secretWord + "'";
        guessButton.disabled = true;
        userLetter.disabled = true;
    }
}

function guessLetter() {
    let letter = userLetter.value.toLowerCase();
    userLetter.value= "";
    userLetter.focus();

    if (letter == "" || letter.length !== 1) {
        statusText.textContent = "ENTER ONE LETTER";
        return;
    }
    if (guessedLetters.includes(letter)) {
        statusText.textContent = "Already did that one little bro, choose another."
        return;
    }

    guessedLetters.push(letter);

    if (secretWord.includes(letter)) {
        statusText.textContent = "You got one!"
    } else {
        wrong++;
        statusText.textContent = "Nope, wrong!"
    }
    updateGame();
    checkGame();
}

function newGame() {
    secretWord = randomWord();
    guessedLetters = [];
    wrong = 0;

    guessButton.disabled = false;
    userLetter.disabled = false;

    statusText.textContent = "Guess a letter!"
    updateGame()
    userLetter.focus()
}

newGame();




