var modal = document.getElementById('myModal');
var grid = [];
grid[0] = new Array(3);
grid[1] = new Array(3);
grid[2] = new Array(3);
var player = 0;
var gameWon = 0;
var numberMap = new Map();

// Helper function to fill Map data structure
function fillMap() {
    numberMap.set('one', 1);
    numberMap.set('two', 2);
    numberMap.set('three', 3);
    numberMap.set('four', 4);
    numberMap.set('five', 5);
    numberMap.set('six', 6);
    numberMap.set('seven', 7);
    numberMap.set('eight', 8);
    numberMap.set('nine', 9);
}
fillMap();

// Function that maps a number to its place in the grid
// For example, F(1) -> (0,0), F(2) -> (0,1), F(3) -> (0,2)
function evaluateMapping(squareNumber) {
    if (squareNumber >= 1 && squareNumber <= 3) {
        return [0, squareNumber - 1];
    }
    if (squareNumber >= 4 && squareNumber <= 6) {
        return [1, squareNumber - 4];
    }
    if (squareNumber >= 7 && squareNumber <= 9) {
        return [2, squareNumber - 7];
    }
}


// Utility function that handles Click on the Square
function handleSquareClick(squareVal) {
    let x, y, squareNumber;
    squareNumber = numberMap.get(squareVal);
    [x, y] = evaluateMapping(squareNumber);

    if (checkLegalMove(x, y)) {
        if (player == 0) {
            console.log('X turn');
            $(`#square_${squareVal}_text`).html("X");
            grid[x][y] = 'X';
            if (checkWin(1)) {
                endgame(1);
            }
        } else {
            console.log('0 turn');
            $(`#square_${squareVal}_text`).html("0");
            grid[x][y] = '0';
            if (checkWin(2)) {
                endgame(2);
            }
        }
        // Switch player turns
        player = 1 - player;
    }
}

$("#square_one").click(function() { handleSquareClick("one"); });
$("#square_two").click(function() { handleSquareClick("two"); });
$("#square_three").click(function() { handleSquareClick("three"); });
$("#square_four").click(function() { handleSquareClick("four"); });
$("#square_five").click(function() { handleSquareClick("five"); });
$("#square_six").click(function() { handleSquareClick("six"); });
$("#square_seven").click(function() { handleSquareClick("seven"); });
$("#square_eight").click(function() { handleSquareClick("eight"); });
$("#square_nine").click(function() { handleSquareClick("nine"); });

function checkWin(playerNum) {
    // Check horizontal
    for (let i = 0; i < 3; i++) {
        if ((grid[i][0] === grid[i][1] && grid[i][1] === grid[i][2]) && grid[i][0] !== undefined) {
            console.log("horizontal won");
            return true;
        }
    }
    // Check vertical
    for (let i = 0; i < 3; i++) {
        console.log("i is: " + i);
        if ((grid[0][i] === grid[1][i] && grid[1][i] === grid[2][i]) && grid[0][i] !== undefined) {
            console.log("vertical won");
            return true;
        }
    }
    // Check diagonal
    if (((grid[0][0] === grid[1][1] && grid[1][1] === grid[2][2]) || (grid[0][2] === grid[1][1] && grid[1][1] === grid[2][0])) && grid[1][1] !== undefined) {
        console.log("diagonal won");
        return true;
    }

    // Check for tie game
    let tieGame = true;
    for (let i = 0; i < 3; i++) {
        for (let x = 0; x < 3; x++) {
            if (grid[i][x] === null || grid[i][x] === undefined) {
                tieGame = false;
            }
        }
    }
    if (tieGame) {
        endgame(0);
    }
    return false;
}

function checkLegalMove(row, column) {
    console.log(grid[row][column]);
    return (grid[row][column] === undefined || grid[row][column] === null);
}

function endgame(num) {
    if (num === 0) {
        $(".modal_text").html("Tie game!");
    } else if (num === 1) {
        $(".modal_text").html("Player X Wins!");
    } else if (num === 2) {
        $(".modal_text").html("Player 0 Wins!");
    }
    $("#myModal").css("display", "block");
    // Blurs the background when the modal pops up
    $("table").css("filter", "blur(8px)");
}

$("#restartBtn").click(function() {
    grid = [new Array(3), new Array(3), new Array(3)];
    player = 0;
    gameWon = 0;
    $("#square_one_text").html("");
    $("#square_two_text").html("");
    $("#square_three_text").html("");
    $("#square_four_text").html("");
    $("#square_five_text").html("");
    $("#square_six_text").html("");
    $("#square_seven_text").html("");
    $("#square_eight_text").html("");
    $("#square_nine_text").html("");
    $("#myModal").css("display", "none");
    // Remove filter property after game reset
    $("table").css("filter", "");
});