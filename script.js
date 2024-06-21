let score = 0;
let timeLeft = 30;
let timer;
let gameInterval;

// Select necessary DOM elements
const startButton = document.getElementById('start-button');
const resetButton = document.getElementById('reset-button');
const scoreTimeContainer = document.getElementById('score-time-container');
const scoreDisplay = document.getElementById('score');
const timeDisplay = document.getElementById('time');
const finalMessage = document.getElementById('final-message');
const finalScore = document.getElementById('final-score');
const messageText = document.getElementById('message-text');
const holes = document.querySelectorAll('.hole');
const faces = document.querySelectorAll('.face');
const bompSound = document.getElementById('bomp-sound');
const highSound = document.getElementById('high-sound');
const endSound = document.getElementById('end-sound');

// Function to start the game
function startGame() {
    score = 0;
    timeLeft = 30;
    scoreDisplay.textContent = score;
    timeDisplay.textContent = timeLeft;
    finalMessage.classList.add('hidden');
    scoreTimeContainer.classList.remove('hidden');
    startButton.classList.add('hidden');
    resetButton.classList.remove('hidden');
    clearInterval(timer);
    clearInterval(gameInterval);
    
    // Start the countdown timer
    timer = setInterval(countDown, 1000);

    // Make faces appear and disappear at random intervals
    gameInterval = setInterval(() => {
        const randomHole = holes[Math.floor(Math.random() * holes.length)];
        const face = randomHole.querySelector('.face');
        face.classList.add('show');

        // Hide the face after a random time between 500ms to 1.5s
        setTimeout(() => {
            face.classList.remove('show');
        }, Math.random() * 1000 + 500);
    }, 1000);
}

// Function to count down the timer
function countDown() {
    timeLeft--;
    timeDisplay.textContent = timeLeft;

    if (timeLeft <= 0) {
        clearInterval(timer);
        clearInterval(gameInterval);
        endGame();
    }
}

// Function to handle clicking on a face
function bonkFace(event) {
    const face = event.target.closest('.face'); // Find the closest .face element

    if (face && face.classList.contains('show')) {
        face.classList.toggle('clicked');
        score++;
        scoreDisplay.textContent = score;
        face.classList.remove('show');
        bompSound.play(); // Play the bomp sound
    }
}

// Function to end the game
function endGame() {
    finalScore.textContent = score;
    scoreTimeContainer.classList.add('hidden');
    finalMessage.classList.remove('hidden');
    resetButton.classList.add('hidden');
    startButton.classList.remove('hidden');
    
    // Hide all holes
    holes.forEach(hole => hole.classList.add('hidden'));

    // Display a fun, witty message based on the score
    let message;
    if (score < 10) {
        message = "Better luck next time!";
    } else if (score < 20) {
        message = "Not bad!";
    } else {
        message = "You're a FaceBomp master!";
        highSound.play(); // Play high score sound
    }
    messageText.textContent = `Your final score is: ${score}. ${message}`;
    endSound.play(); // Play end game sound
}

// Function to reset the game
function resetGame() {
    score = 0;
    timeLeft = 30;
    scoreDisplay.textContent = score;
    timeDisplay.textContent = timeLeft;
    startButton.textContent = "Start Game";
    resetButton.classList.add('hidden'); // Hide reset button
    finalMessage.classList.add('hidden');
    scoreTimeContainer.classList.add('hidden');

    // Show all holes
    holes.forEach(hole => hole.classList.remove('hidden'));

    // Start the game again
    startGame();
}


// Add event listeners
startButton.addEventListener('click', startGame);
resetButton.addEventListener('click', resetGame);
faces.forEach(face => face.addEventListener('click', bonkFace));


