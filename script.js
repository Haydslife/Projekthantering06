const whoTurn = document.getElementById("turnAnnouncer");

// if the turn is 1, it's currently the players turn, if the turn is 0, it's the ai's.
var turn = 1;
// you can't play if waiting is true;
var waiting = true;
// put all cells in an array
let cells = document.getElementsByClassName("cell");
// the players sign and the ai's sign
var playerSign = "X", aiSign = "O";
// ways you can win
const lines = [
    ["a1","a2","a3"],
    ["b1","b2","b3"],
    ["c1","c2","c3"],
    ["a1","b1","c1"],
    ["a2","b2","c2"],
    ["a3","b3","c3"],
    ["a1","b2","c3"],
    ["c1","b2","a3"]
];

function newGame() {
    // clear out all cells
    for (var i = cells.length; i > 0; i--) {
        cells[i-1].innerHTML = null;
    }
    // Randomly decide who starts
    turn = Math.floor(Math.random()*2);

    if (turn===1) {playerTurn()} else {aiTurn()}
}

function playerTurn() {
    turn = 1;
    waiting = false;
    whoTurn.innerHTML = "Your turn!";
}

function aiTurn() {
    turn = 0;
    waiting = true;
    whoTurn.innerHTML = "Opponents turn!";

    // wait a bit before playing to mimic thinking
    setTimeout(() => {  
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
    }, Math.random()*500 + 500);
}

function boardPlay(sign, cell) {
    var cellId = document.getElementById(cell);

    // check if it's a valid move before doing anything (it isn't if isn't your turn or if the cell has already been played)
    if (cellId.innerHTML === "" && waiting != true) {
        // show the appropriate sign on the cell that was played
        cellId.innerHTML = sign;

        // check if someone won
        for (var i = 0; i < lines.length; i++) {
            // check if a specific line was achieved
            const line = lines[i]
            // check if the cells with the corresponding id's have the current players sign.
            var a = document.getElementById(line[0]).innerHTML === sign
            var b = document.getElementById(line[1]).innerHTML === sign
            var c = document.getElementById(line[2]).innerHTML === sign
            // if they do, the current player wins
            if (a && b && c) {
                end(turn);
                break;
            }

            // check if any cells have not been played, otherwise it is a draw
            for (var o = 0; o < 9; o++) {
                if (cells[o].innerHTML === "") { 
                    break boardPlay;
                } else if (o === 8 && !a && !b && !c) {
                    end(2);
                }
            }

        }

        // Change who's turn it is
        if (turn === 1) {
            aiTurn();
        } else if (turn === 0){
            playerTurn();
        }

    }
}

function end(victor) {
    // make sure that no more moves can be made
    waiting = true;
    turn = 2;

    // show who the victor is
    switch (victor) {
        case 0:
            whoTurn.innerHTML = "You lost!";
            break;
        case 1:
            whoTurn.innerHTML = "You Won!";
            break;
        case 2:
            whoTurn.innerHTML = "Draw!";
            break;
    }
}