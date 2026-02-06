let playerWins = 0
let playerLosses = 0


//event listeners
document.querySelector("#guessButton").addEventListener("click", guess)

//generate random number between 1 and 99
let randomNumber = Math.floor(Math.random() * 99) + 1
console.log(randomNumber)
let guessCount = 0

function guess() {
    let userGuuess = document.querySelector("#userGuess").value //.value is only for input elements
    //alert(userGuuess)
    let message = document.querySelector("#message")
    document.querySelector("#userGuesses").textContent += userGuuess + " "

    if (userGuuess < 1 || userGuuess > 99) {
        message.textContent = "Invalid input. Please enter a number between 1 and 99."
    }
    else if(userGuuess < randomNumber) {
        document.querySelector("#userGuesses").style.color = "red"
        message.textContent = "Too low! Try again."
        guessCount++
    }
    if (userGuuess < 1 || userGuuess > 99) {
        message.textContent = "Invalid input. Please enter a number between 1 and 99."
    }
    else if(userGuuess > randomNumber) {
        document.querySelector("#userGuesses").style.color = "blue"
        message.textContent = "Too high! Try again."
        guessCount++
    }
    else if (userGuuess == randomNumber) {
        document.querySelector("#userGuesses").style.color = "green"
        message.textContent = "Congratulations! You guessed the number in " + guessCount + " guesses!"
        playerWins++
    }
}

