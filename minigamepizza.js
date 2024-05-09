document.getElementById('minigameButton').addEventListener('click', startGame);

let playerClicks = 10;
let enemyClicks = 10;
const totalSlices = 7; // Adjust as per your setup
let enemyInterval;
let gameTheme = document.getElementById('gameTheme'); // Get the audio element

function startGame() {
    gameTheme.play(); // Start playing the game theme
    document.getElementById('instructionsDiv').style.display = 'none';
    document.getElementById('gameArea').style.display = 'flex';
    document.getElementById('eatSliceButton').style.display = 'block';
    document.getElementById('minigameButton').style.display = 'none'; // Hide the start button
    // Reset clicks at the start of the game
    playerClicks = 15;
    enemyClicks = 10;
    // Reset the pizza images to full
    document.getElementById('playerPizza').src = 'images/pizzafull.png';
    document.getElementById('enemyPizza').src = 'images/pizzafull.png';

     // Start enemy interval
    if (enemyInterval) clearInterval(enemyInterval);  // Clear existing interval if any
    enemyInterval = setInterval(() => {
        enemyClicks++;
        if (!updatePizza('enemyPizza', enemyClicks)) {
            endGame(false);  // Enemy wins if return false
        }
    }, 178); // Enemy eats a slice every 2 seconds
}

// Ensure everything is visible initially
window.onload = () => {
    document.getElementById('playerPizza').src = 'images/pizzafull.png';
    document.getElementById('enemyPizza').src = 'images/pizzafull.png';
    document.getElementById('gameArea').style.display = 'block';
};

function slicePizza() {
    playerClicks++;
    if (!updatePizza('playerPizza', playerClicks)) {
        endGame(true);  // Player wins if return false
    }
}

function updatePizza(pizzaId, clicks) {
    if (clicks % 20 === 0) {  // Now requires 10 clicks per slice
        const slicesLeft = totalSlices - Math.floor(clicks / 20);  // Update to reflect more clicks per slice
        const pizzaImage = document.getElementById(pizzaId);
        pizzaImage.src = slicesLeft > 0 ? `images/pizza${slicesLeft}.png` : 'images/pizza0.png';
        if (slicesLeft <= 0) {
            return false;  // Signal that the game should end
        }
    }
    return true;
}


function endGame(isPlayer) {
    gameTheme.pause(); // Stop playing the game theme
    gameTheme.currentTime = 0; // Reset the audio to the start
    clearInterval(enemyInterval);
    document.getElementById('winnerDiv').innerHTML = (isPlayer ? "Nemz won the game!" : "Nemz lost the game!");
    document.getElementById('winnerDiv').style.display = 'block';
    document.getElementById('gameArea').style.display = 'none';
    document.getElementById('eatSliceButton').style.display = 'none';
    //document.getElementById('minigameButton').style.display = 'block'; // Show the start button again for a new game
}


window.onload = () => {
    document.getElementById('playerPizza').src = 'images/pizzafull.png';
    document.getElementById('enemyPizza').src = 'images/pizzafull.png';
};
