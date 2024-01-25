var cells = document.querySelectorAll('.grid > *');
var messageEl = document.querySelector('.message');
var btnStartEl = document.querySelector('.btn-start');
var bingoGrid = document.getElementById('bingoGrid');

// Game state
var started = false;
var players = ['X', 'O'];
var currentPlayerIndex = 0;
var letters = ['B', 'I', 'N', 'G', 'O'];
var currentLetterIndex = 0;
var state = [];

function speak(message) {
    if ('speechSynthesis' in window) {
        var synth = window.speechSynthesis;
        if (synth && synth.speak) {
            var utterance = new SpeechSynthesisUtterance(message);
            synth.speak(utterance);
        } else {
            console.error('Speech synthesis is not supported');
        }
    } else {
        console.error('Web Speech API is not supported in this browser');
    }
}
// Game over message with voice
function gameOverMessage() {
    var message = 'Ops Game over!';
    messageEl.innerText = message;
    speak(message);
}

// Winning message with voice
function winningMessage(player) {
    var message = player + ' has won!';
    messageEl.innerText = message;
    speak(message);
}


// Winning states
var winningStates = [
    [0, 1, 2, 3, 4],
    [5, 6, 7, 8, 9],
    [10, 11, 12, 13, 14],
    [15, 16, 17, 18, 19],
    [20, 21, 22, 23, 24],
    [0, 5, 10, 15, 20],
    [1, 6, 11, 16, 21],
    [2, 7, 12, 17, 22],
    [3, 8, 13, 18, 23],
    [4, 9, 14, 19, 24],
    [0, 6, 12, 18, 24],
    [4, 8, 12, 16, 20],
    [20, 15, 10, 5, 0],
    [21, 16, 11, 6, 1],
    [22, 17, 12, 7, 2],
    [23, 18, 13, 8, 3],
    [24, 19, 14, 9, 4],
    [24, 18, 12, 6, 0],
    [20, 16, 12, 8, 4],
    [4, 3, 2, 1, 0],
    [9, 8, 7, 6, 5],
    [14, 13, 12, 11, 10],
    [19, 18, 17, 16, 15],
    [24, 23, 22, 21, 20]
];

cells = document.querySelectorAll('.grid > *');


// Initialize game
function startGameWithVoice()
 {
    if (started) {
        alert('The game is already started');
        return;
    }

    started = true;
    currentPlayerIndex = 0;
    currentLetterIndex = 0;
    state = Array(25).fill('');

    clearBoard();
    displayNextPlayer();
}
// Check for BINGO
function checkBingo() {
    for (var i = 0; i < winningStates.length; ++i) {
        var x = winningStates[i][0];
        var y = winningStates[i][1];
        var z = winningStates[i][2];
        var v = winningStates[i][3];
        var w = winningStates[i][4];

        var line = [state[x], state[y], state[z], state[v], state[w]];
        var lineString = line.join('');

        if (lineString === 'BINGO') {
            messageEl.innerText = state[w] + ' has won!';
            return true;
        }
    }

    for (var i = 0; i < state.length; ++i) {
        if (state[i] === '') {
            return false; // game is not over yet
        }
    }

    // game is over
    messageEl.innerText = 'Game over!';
    return true;
}
   
   

// Handle cell click
function onCellClick(index) {
    if (!started) {
        alert('Click on the start button to begin the game');
        return;
    }

    if (state[index] !== '') {
        alert('That cell is taken');
        return;
    }

    state[index] = letters[currentLetterIndex];
    cells[index].innerText = letters[currentLetterIndex];

    if (checkBingo()) {
        started = false;
        return;
    }

    currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
    currentLetterIndex = (currentLetterIndex + 1) % letters.length;
    displayNextPlayer();
}

// Clear the board
function clearBoard() {
    cells.forEach(function (cell) {
        cell.innerText = '';
    });
}

// Display next player
function displayNextPlayer() {
    messageEl.innerText = 'Next turn: ' + players[currentPlayerIndex] + ' (' + letters[currentLetterIndex] + ')';
}

// Setup code to run on cell click
cells.forEach(function (cell, index) {
    cell.addEventListener('click', function () {
        onCellClick(index);
    });
});