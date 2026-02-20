// Event Listener
document.querySelector("button").addEventListener("click", gradeQuiz);

function gradeQuiz() {
    let totalScore = 0;
    let attempts = localStorage.getItem("quizAttemps");
    
    attempts = attempts ? Number(attempts) : 0;
    attempts++;
    localStorage.setItem("quizAttemps", attempts);

    document.querySelector("#attempts").textContent = "Attempts: " + attempts;

    // Question 1 (Radio)
    let answerQ1 = "Fire and Flying";
    let selected = document.querySelector("input[name=q1]:checked");
    let userAnswer1 = selected ? selected.value : "";

    if (userAnswer1 === answerQ1) {
        showFeedback("q1Feedback", true);
        totalScore += 20;
    } else {
        showFeedback("q1Feedback", false);
    }

    // Question 2 (Dropdown)
    let answerQ2 = "Grass and Poison";
    let userAnswer2 = document.querySelector("#q2Select").value;

    if (userAnswer2 === answerQ2) {
        showFeedback("q2Feedback", true);
        totalScore += 20;
    } else {
        showFeedback("q2Feedback", false);
    }

    // Question 3 (Text)
    let answerQ3 = "25";
    let userAnswer3 = document.querySelector("#q3Text").value.trim();

    if (userAnswer3 === answerQ3) {
        showFeedback("q3Feedback", true);
        totalScore += 20;
    } else {
        showFeedback("q3Feedback", false);
    }

    // Question 4 (Number)
    let answerQ4 = 8;
    let userAnswer4 = Number(document.querySelector("#q4Number").value);

    if (userAnswer4 === answerQ4) {
        showFeedback("q4Feedback", true);
        totalScore += 20;
    } else {
        showFeedback("q4Feedback", false);
    }

    //Question 5 (checkbox)
    let correct = ["Pikachu", "Magnemite", "Zapdos"].sort();
    let check = Array.from(document.querySelectorAll("input[name=q5]:checked")).map(x => x.value).sort();

    let isCorrect = (check.length === correct.length) && check.every((v, i) => v === correct[i]);

    if (isCorrect) {
        showFeedback("q5Feedback", true);
        totalScore += 20;
    } else {
        showFeedback("q5Feedback", false);
    }

    document.querySelector("#totalScore").textContent =
        "Total Score: " + totalScore + " / 100";

    let congratsEl = document.querySelector("#message");
    if (totalScore > 80) {
        congratsEl.textContent = "Congrats! You scored above 80!";
    } else {
        congratsEl.textContent = "";
    }
}

function showFeedback(id, isCorrect) {
    let element = document.querySelector("#" + id);

    if (isCorrect) {
    element.innerHTML = "✅ Correct!";
    element.className = "feedback correct";
    } else {
        element.innerHTML = "❌ Incorrect!";
        element.className = "feedback wrong";
    }
}


shuffleQ1Choices();
function shuffleQ1Choices() {
    let q1Choices = ["Fire and Flying", "Fire", "Fire and Dragon", "Dragon"];
    q1Choices = _.shuffle(q1Choices);

    for (let i of q1Choices) {
        let radioElement = document.createElement("input");
        radioElement.type = "radio";
        radioElement.name = "q1";
        radioElement.value = i;

        let labelElement = document.createElement("label");
        labelElement.textContent = i;
        labelElement.prepend(radioElement);

        document.querySelector("#q1ChoicesDiv").append(labelElement);
        document.querySelector("#q1ChoicesDiv").append(document.createElement("br"));
    }
}

shuffleQ5Choices();
function shuffleQ5Choices() {
    let q5Choices = ["Pikachu", "Gengar", "Magnemite", "Mewtwo", "Rhydon", "Zapdos"];
    q5Choices = _.shuffle(q5Choices);

    for (let i of q5Choices) {
        let checkBox = document.createElement("input");
        checkBox.type = "checkbox";
        checkBox.name = "q5"; 
        checkBox.value = i;

        let labelELement = document.createElement("label");
        labelELement.append(checkBox);
        labelELement.append(" " + i);

        document.querySelector("#q5ChoicesDiv").append(labelELement);
        document.querySelector("#q5ChoicesDiv").append(document.createElement("br"));
    }
}
