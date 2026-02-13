// Event Listener
document.querySelector("button").addEventListener("click", gradeQuiz);

function gradeQuiz() {
    // Question 1 (Radio)
    let answerQ1 = "Fire and Flying";
    let selected = document.querySelector("input[name=q1]:checked");
    let userAnswer1 = selected ? selected.value : "";

    if (userAnswer1 === answerQ1) {
        showFeedback("q1Feedback", true);
    } else {
        showFeedback("q1Feedback", false);
    }

    // Question 2 (Dropdown)
    let answerQ2 = "Grass and Poison";
    let userAnswer2 = document.querySelector("#q2Select").value;

    if (userAnswer2 === answerQ2) {
        showFeedback("q2Feedback", true);
    } else {
        showFeedback("q2Feedback", false);
    }

    // Question 3 (Text)
    let answerQ3 = "25";
    let userAnswer3 = document.querySelector("#q3Text").value.trim();

    if (userAnswer3 === answerQ3) {
        showFeedback("q3Feedback", true);
    } else {
        showFeedback("q3Feedback", false);
    }

    // Question 4 (Number)
    let answerQ4 = 8;
    let userAnswer4 = Number(document.querySelector("#q4Number").value);

    if (userAnswer4 === answerQ4) {
        showFeedback("q4Feedback", true);
    } else {
        showFeedback("q4Feedback", false);
    }
}

function showFeedback(id, isCorrect) {
    let element = document.querySelector("#" + id);
    element.textContent = isCorrect ? "Correct!" : "Wrong!";
    element.className = "feedback " + (isCorrect ? "correct" : "wrong");
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
