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

// Nothing should happen until this button is pressed
playButton.addEventListener("click", (e) => {
    play();
});

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
    console.log(`\n\nYou have chosen ${user} while you enemy chose ${enemy}`);
    if (result == 1)
       console.log(`You won this round!`);
    else if (result == 0)
        console.log(`That's a draw! No one gets points...`);
    else
        console.log(`You lost this one!`);
}

function compareChoices(user, enemy) {
    let result;
    switch (user) {
        case validChoices[0]:
            // case where user chose rock
            if (enemy === user) {
                result = 0;
            } else if (enemy === validChoices[1]) {
                result = -1;
            } else {
                result = 1;
            }
            break;
        case validChoices[1]:
            // case where user chose paper
            if (enemy === user) {
                result = 0;
            } else if (enemy === validChoices[2]) {
                result = -1;
            } else {
                result = 1;
            }
            break;
        case validChoices[2]:
            // case where user chose scissor
            if (enemy === user) {
                result = 0;
            } else if (enemy === validChoices[0]) {
                result = -1;
            } else {
                result = 1;
            }
            break;
    }
    displayChoices(user, enemy, result);
    return result;
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
    if (firstTime)
        welcome();
    if (display)
        showScore();

    display = true;
    enemyChoice = getEnemyChoice();
    userChoice = getUserChoice();
    if (userChoice === "invalid") {
        display = false;
        return;
    }

    let result = compareChoices(userChoice, enemyChoice);
    if (result > 0)
        userScore++;
    else if (result < 0)
        enemyScore++;
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
