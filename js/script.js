// game variables
let userScore = 0;
let enemyScore = 0;
let display = true;
let validChoices = ['rock', 'paper', 'scissor'];
let enemyChoice;
let userChoice;
let isGameOver = false;
let firstTime = true;

// DOM elements
let playButton = document.querySelector(".play");
let playerOptionsContainer = document.querySelector(".options");
let playerOptionsButtons = playerOptionsContainer.querySelectorAll("button");
let scoreBoard = document.querySelector(".score-board");
let currentChoices = scoreBoard.querySelectorAll(".choice");
let outcome = document.querySelector(".outcome");

// hiding the part of ui that should only be seen while playing
hideGameStage();

// Nothing should happen until this button is pressed
playButton.addEventListener("click", (e) => {
    displayGameStage(e);
    // play();
});

playerOptionsButtons.forEach(button => {
    button.addEventListener("click", (e) => {
        userChoice = e.currentTarget.classList[0];
        enemyChoice = getEnemyChoice();
        gameLoop();
    });
});

function hideGameStage() {
    playerOptionsContainer.setAttribute("style", "display: none");
    scoreBoard.setAttribute("style", "display: none");
    currentChoices.forEach(choice => {
        choice.setAttribute("style", "display: none");
    });
    outcome.textContent = "";
    outcome.setAttribute("style", "display: none");
}

function displayGameStage(playButton) {
    playButton.target.setAttribute("style", "display: none");
    playerOptionsContainer.setAttribute("style", "");
    scoreBoard.setAttribute("style", "");
}

function welcome() {
    console.log("================================================");
    console.log("--- Welcome to the game! -----------------------");
    console.log("--- You have to win 5 times to claim victory ---");
    console.log("--- Do you have what it takes? -----------------");
    console.log("--- Wish you good luck! ------------------------");
    console.log("================================================");
    firstTime = false;
}

function showScore() {
    console.log("=== GAME SCORE =================================");
    console.log(`--- You have scored ${userScore} points -------------------`);
    console.log(`--- Your opponent has scored ${enemyScore} points ----------`);
    if (userScore > enemyScore)
        console.log("--- You are in the lead, let's do this! --------");
    else if (userScore < enemyScore)
        console.log("--- The enemy is leading! Play carefully... ----");
    else if (userScore != 0 && enemyScore != 0)
        console.log("--- You are tied, don't get nervous! -----------");
    console.log("================================================");
}

function getEnemyChoice() {
    return validChoices[Math.floor(Math.random() * 3)];
}

function createChoiceElement(choice) {
    let choiceElement = document.createElement("i");
    switch (choice) {
        case "rock":
            choiceElement.classList.add("fas", "fa-hand-rock");
            break;
        case "paper":
            choiceElement.classList.add("fas", "fa-hand-paper");
            break;
        case "scissor":
            choiceElement.classList.add("fas", "fa-hand-scissors");
            break;
    }

    return choiceElement;
}

function validateInput(input) {
    if (!(typeof input === "string") || input instanceof String)
        return false;
    
    for (let i = 0; i < 3; i++) {
        if (input.toLowerCase() === validChoices[i]) return true;
    }

    return false;
}

function getUserChoice() {
    let input = prompt();
    let isValid = validateInput(input);

    if (!isValid){
        if (input !== "")
            console.log(`--- ERROR: ${input} is not a valid choice!!! `);
        console.log(`--- Please, type "rock", "paper" or "scissor" whithout quotes...`);
        return "invalid";
    }

    return input;
}

function displayChoices(user, enemy, result) {
    // cleaning previous round result
    currentChoices[0].innerHTML = "";
    currentChoices[1].innerHTML = "";

    userElement = createChoiceElement(user);
    enemyElement = createChoiceElement(enemy);

    currentChoices[0].appendChild(userElement);
    currentChoices[1].appendChild(enemyElement);

    // removing the inline css added previously to hide these elements
    currentChoices.forEach(choice => {
        choice.setAttribute("style", "");
    });
    outcome.setAttribute("style", "");

    console.log(`\n\nYou have chosen ${user} while you enemy chose ${enemy}`);
    if (result == 1)
    {
       outcome.innerHTML = "You won this round!";
       updateScoreColors(user);
    }
    else if (result == 0)
    {
       outcome.innerHTML = "That's a draw! No one gets points...";
       updateScoreColors("draw");
    }
    else
    {
       outcome.innerHTML = "You lost this one";
       updateScoreColors(enemy);
    }
}

function updateScoreColors(winner) {
    switch (winner) {
        case validChoices[0]:
            scoreBoard.setAttribute("style","color:#ff5555; border-color:#ff5555");
            outcome.setAttribute("style","color:#ff5555");
            break;
        case validChoices[1]:
            scoreBoard.setAttribute("style", "color: #7788ff; border-color: #7788ff");
            outcome.setAttribute("style","color:#7788ff");
            break;
        case validChoices[2]:
            scoreBoard.setAttribute("style", "color: #77ddaa; border-color: #77ddaa");
            outcome.setAttribute("style","color:#77ddaa");
            break;
        default:
            scoreBoard.setAttribute("style", "color: #6f6a60; border-color: #6f6a60");
            outcome.setAttribute("style","color:#6f6a60");
            break;
    }
}

function compareChoices(user, enemy) {
    let result;

    if (enemy === user)
        result = 0;
    else {
        switch (user) {
            case validChoices[0]:
                // case where user chose rock
                if (enemy === validChoices[1])
                    result = -1;
                else
                    result = 1;
                break;
            case validChoices[1]:
                // case where user chose paper
                if (enemy === validChoices[2])
                    result = -1;
                else
                    result = 1;
                break;
            case validChoices[2]:
                // case where user chose scissor
                if (enemy === validChoices[0])
                    result = -1;
                else
                    result = 1;
                break;
        }
    }
    displayChoices(user, enemy, result);
    return result;
}

function calculateScore(roundResult) {
    if (roundResult > 0)
        userScore++;
    else if (roundResult < 0)
        enemyScore++;
}

function updateScorePoints() {
    let scores = scoreBoard.querySelectorAll(".score");

    scores[0].innerHTML = userScore;
    scores[1].innerHTML = enemyScore;
}

function gameOver() {
    isGameOver = true;

    if (userScore == 5)
        console.log("---------- YOU WIN -----------");
    else
        console.log("---------- YOU LOST ----------");
    console.log("If you would like to play again, type \"playAgain()\"\nwithout quotes but keeping parenthesis...")
}

function gameLoop() {
    let result = compareChoices(userChoice, enemyChoice);
    calculateScore(result);
    updateScorePoints();
    if (userScore == 5 || enemyScore == 5)
        gameOver();
}

function play() {
    while (!isGameOver) {
        gameLoop();
    }
}

function playAgain() {
    isGameOver = false;
    userScore = 0;
    enemyScore = 0;
    play();
}
