let userScore = 0;
let enemyScore = 0;

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
