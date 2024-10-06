let loseStreak = 0;
let winStreak = 0;
let lastChoices = []; // Array to keep track of the last three choices
let winScore = 0;
let loseScore = 0;
let tieScore = 0;

function play(playerChoice) {
    const clickSound = document.getElementById('clickSound');
    clickSound.play(); // Play sound on button click
    // Add the current choice to the last choices array
    lastChoices.push(playerChoice);
    if (lastChoices.length > 3) {
        lastChoices.shift(); // Keep only the last three choices
    }

    // Determine computer's choice based on the player's last three choices
    let computerChoice = getComputerChoice(lastChoices);
    let result;

    if (playerChoice === computerChoice) {
        tieScore++;
        console.log(`Player chose: ${playerChoice}\nComputer chose: ${computerChoice}`);
        result = `It's a tie!\nYou Choose: ${playerChoice}\nComputer Choose: ${computerChoice}`;
        loseStreak = 0;
        winStreak = 0;
    } else if (
        (playerChoice === 'rock' && computerChoice === 'scissors') ||
        (playerChoice === 'paper' && computerChoice === 'rock') ||
        (playerChoice === 'scissors' && computerChoice === 'paper')
    ) {
        loseStreak = 0;
        winStreak++;
        winScore++;
        console.log(`Player chose: ${playerChoice}\nComputer chose: ${computerChoice}`);
        result = `Player wins!\nYou Choose: ${playerChoice}\nComputer Choose: ${computerChoice}`;
    } else {
        winStreak = 0;
        loseStreak++;
        loseScore++;
        console.log(`Player chose: ${playerChoice}\nComputer chose: ${computerChoice}`);
        result = `You suck, computer wins!\nYou Choose: ${playerChoice}\nComputer Choose: ${computerChoice}`;
    }

    const resultSound = document.getElementById('resultSound');
    resultSound.play(); // Play sound on result

    handleStreakAlerts();
    handleBanMessage();
    
    // Update the display
    updateDisplay(result);
}

function handleStreakAlerts() {
    // Alert messages for lose streak
    if (loseStreak === 3) {
        alert("Imagine losing to a bot, LOL.");
    } else if (loseStreak === 5) {
        alert("Really?");
    } else if (loseStreak === 10) {
        alert("Even a monkey is smarter than you!");
    } else if (loseStreak === 20) {
        alert("Alright, seems like you're just trolling.");
    } else if (loseStreak === 30) {
        alert("STOP!!!");
    } else if (loseStreak === 40) {
        alert("What do you even try to do actually?");
    } else if (loseStreak === 50) {
        alert("You are just a joke, aren't you?");
    } else if (loseStreak === 100) {
        alert("I've never seen any dedication for losing that much like you, or maybe you're just a moron?!");
    } else if (loseStreak === 150) {
        alert("Alright, enough. One more time and you will be banned!");
    }

    // Alert messages for win streak
    if (winStreak === 3) {
        alert("Not bad for a moron.");
    } else if (winStreak === 5) {
        alert("Alright, seems like you're not as bad as I thought.");
    } else if (winStreak === 7) {
        alert("Bruh, how is this possible?");
    } else if (winStreak === 10) {
        alert("Seriously? Cheating in a child game?");
    } else if (winStreak === 15) {
        alert("One more time and you got banned!");
    }
}

function handleBanMessage() {
    if (winStreak === 16 || loseStreak === 151) {
        document.getElementById('container').innerText = "BANNED YOU CHEATER!\nNah, just kidding. Just restart the page.";
    }
}

function updateDisplay(result) {
    document.getElementById('result').innerText = result;
    document.getElementById('streakInfo').innerText = `Win Streak: ${winStreak}\nLose Streak: ${loseStreak}`;
    document.getElementById('winScore').innerText = `${winScore}`;
    document.getElementById('loseScore').innerText = `${loseScore}`;
    document.getElementById('tieScore').innerText = `${tieScore}`;
    document.getElementById('winPercentage').innerText = `Win Percentage: ${calculateWinPercentage()}%`;
}

function calculateWinPercentage() {
    const totalGames = winScore + loseScore + tieScore;
    return totalGames === 0 ? 0 : Math.floor((winScore / totalGames) * 100);
}

function getComputerChoice(lastChoices) {
    // Check if the last three choices are the same
    const lastChoice = lastChoices[lastChoices.length - 1]; // Get the last player's choice
    if (lastChoices.length === 3 && lastChoices.every(choice => choice === lastChoice)) {
        // If the player has chosen the same option three times
        if (lastChoice === 'rock') {
            return 'paper'; // Paper beats rock
        } else if (lastChoice === 'paper') {
            return 'scissors'; // Scissors beat paper
        } else if (lastChoice === 'scissors') {
            return 'rock'; // Rock beats scissors
        }
    }
    
    // Otherwise, choose randomly
    const choices = ['rock', 'paper', 'scissors'];
    return choices[Math.floor(Math.random() * 3)];
} 