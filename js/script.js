let userScore = 0;
let enemyScore = 0;
let validChoices = ['rock', 'paper', 'scissor'];
let enemyChoice;
let userChoice;

function welcome() {
    console.log("================================================");
    console.log("--- Welcome to the game! -----------------------");
    console.log("--- You have to win 5 times to claim victory ---");
    console.log("--- Do you have what it takes? -----------------");
    console.log("--- Wish you good luck! ------------------------");
    console.log("================================================");
}

function showScore() {
    console.log("=== GAME SCORE =================================");
    console.log("--- You have scored ${userScore} points -------------------");
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
    console.log(`You have chosen ${user} while you enemy chose ${enemy}`);
    if (result == 1)
       console.log(`You won this round!`);
    else if (result == 0)
        console.log(`That's a draw! No one gets points...`);
    else (result == -1)
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


