const whoTurn = document.getElementById("turnAnnouncer");

// if the turn is 1, it's currently the players turn, if the turn is 0, it's the ai's.
var turn = 1;
// you can't play if waiting is true;
var waiting = true;
// put all cells in an array
let cells = document.getElementsByClassName("cell");
// the players sign and the ai's sign
var playerSign = "X", aiSign = "O";

function newGame() {
    // clear out all cells
    for (var i = cells.length; i > 0; i--) {
        cells[i-1].innerHTML = null;
    }
    // Randomly decide who starts
    turn = Math.floor(Math.random()*2);

    if (turn===1) {playerTurn()} else {aiTurn()}

    console.log("1");
}

function playerTurn() {
    turn = 1;
    waiting = false;
    whoTurn.innerHTML = "Your turn!";

    console.log("2");
}

function aiTurn() {
    turn = 0;
    waiting = true;
    whoTurn.innerHTML = "Opponents turn!";

    while (turn === 0) {
        // randomly decide which cell to play
        play = Math.floor(Math.random()*9);
        cell = document.getElementById(cells[play].id);

        // play the cell, but only if it hasn't been played before
        if (cell.innerHTML === "") {
            waiting = false;
            boardPlay("O", cell.id);
        }
    }

    console.log("3");

}

function boardPlay(Sign, cell) {
    var cellId = document.getElementById(cell);

    // check if it's a valid move before doing anything (it isn't if isn't your turn or if the cell has already been played)
    if (cellId.innerHTML === "" && waiting != true) {
        // show the appropriate sign on the cell that was played
        cellId.innerHTML = Sign;

        // Change who's turn it is
        if (turn == 1) {
            aiTurn();
        } else {
            playerTurn();
        }

    }


    console.log("4");
}

function end(victor) {
    // victor is 0 if the ai wins, 1 if the player wins, and 2 if it's a stalemate.
}