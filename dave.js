let currDaveTile; 
let currOtherTile;
let score = 0;
let gameOver = false;
let timer; // Variable to keep track of the timer
let countdownInterval; // Variable for countdown update interval
const Images = [
  "imgs/Jerry.png",
  "imgs/Kevin.png",
  "imgs/Phil.png",
  "imgs/stuart.png",
  "imgs/Tom.png",
  "imgs/Tim.png"
];

window.onload = function() {
  setupGame();
}

function setupGame() {
  // Create the game board
  const board = document.getElementById("board");
  board.innerHTML = ""; // Clear any existing tiles
  for (let i = 0; i < 3; i++) {
    let tile = document.createElement("div");
    tile.id = i.toString();
    tile.addEventListener("click", selectTile);
    board.appendChild(tile);
  }

  // Add event listener to the start button
  document.getElementById("startButton").addEventListener("click", startGame);
}

function startGame() {
  // Reset game state
  score = 0;
  gameOver = false;
  document.getElementById("score").innerText = score.toString();
  document.getElementById("timer").innerText = "10"; // Reset timer display

  // Start the timer
  startTimer();

  // Begin updating tiles
  setInterval(updateTile, 800); // Update tile every 1 second
}

function getRandomTile() {
  return Math.floor(Math.random() * 3).toString();
}

function getRandomImage() {
  return Images[Math.floor(Math.random() * Images.length)];
}

function updateTile() {
  if (gameOver) {
    return;
  }

  // Determine whether to show a dave or a minion
  let showDave = Math.random() > 0.5;

  // Clear the current tiles
  if (currDaveTile) {
    currDaveTile.innerHTML = "";
  }
  if (currOtherTile) {
    currOtherTile.innerHTML = "";
  }

  // Get a new tile and set either a dave or minion
  let num = getRandomTile();
  if (showDave) {
    currDaveTile = document.getElementById(num);
    let dave = document.createElement("img");
    dave.src = "imgs/Dave.png"; // Use dave image
    dave.classList.add("dave"); // Add class for dave
    currDaveTile.appendChild(dave);
  } else {
    currOtherTile = document.getElementById(num);
    let minion = document.createElement("img");
    minion.src = getRandomImage();
    currOtherTile.appendChild(minion);
  }
}

function selectTile() {
  if (gameOver) {
    return;
  }

  // Only reset the timer if the tile contains a dave
  if (this == currDaveTile) {
    resetTimer();
    score += 1;
    document.getElementById("score").innerText = score.toString();
  } else if (this == currOtherTile) {
    endGame(); // Call endGame function on incorrect click
  }
}

function startTimer() {
  let timeLeft = 10; // Initial countdown time
  document.getElementById("timer").innerText = timeLeft.toString(); // Initialize display

  timer = setTimeout(() => {
    if (!gameOver) {
      endGame(); // Call endGame function on timeout
    }
  }, 10000); // 10 seconds

  countdownInterval = setInterval(() => {
    if (timeLeft <= 0) {
      clearInterval(countdownInterval);
    } else {
      timeLeft--;
      document.getElementById("timer").innerText = timeLeft.toString();
    }
  }, 1000); // Update countdown every second
}

function resetTimer() {
  clearTimeout(timer); // Clear the existing timeout
  clearInterval(countdownInterval); // Clear the countdown interval
  startTimer(); // Restart the timer
}

function endGame() {
  if (gameOver) return; // Prevent multiple calls

  clearInterval(countdownInterval); // Stop countdown
  clearTimeout(timer); // Stop timeout

  document.getElementById("score").innerText = "Game Over - You Found Dave: " + score.toString() + " times";
  gameOver = true;
}
