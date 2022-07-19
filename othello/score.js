

var player = 1; //1 for White, 2 for Black
var grid = [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 2, 0, 0, 0],
    [0, 0, 0, 2, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0]
];
var users = JSON.parse(localStorage.getItem("users"));
var gamer = localStorage.getItem("gamer")
var player1 = users[gamer].userName;
var player2 = users[gamer].player2;
document.getElementById("colorTurn").innerHTML = `התור של ${player1}`;
document.getElementById("player1").innerHTML = player1;
document.getElementById("player2").innerHTML = player2;
document.getElementById('resetButton').addEventListener('click', resetGrid)

// conti()
function conti() {
    let con = localStorage.getItem('cont')
    let log = localStorage.getItem('log') || 0
    if (con == 1) {
        var game1 = JSON.parse(localStorage.getItem(users[gamer].userName));
        console.log(users[gamer].userName);
        grid = game1;
        console.log(game1);
        refreshGrid(game1)
        localStorage.removeItem('cont')
        localStorage.removeItem('log')
    } else {
        if (log == 1) {
            localStorage.removeItem('log')
            refreshGrid()
        }else{
            window.open('../login.html', '_self')
            // console.log('11');
        }
        
    }
}


function selectCell(row, col) {
    //A function used to add a disc
    //This function is incomplete
    //It should check that the player is allowed to place their disc on the selected cell.

    if ((player == 1) && (grid[row][col] == 0)) {
        grid[row][col] = 1;



        // player=2;
        document.getElementById("colorTurn").innerHTML = `התור של ${player2}`;
    } else if ((player == 2) && (grid[row][col] == 0)) {
        grid[row][col] = 2;
        // player=1;
        document.getElementById("colorTurn").innerHTML = `התור של ${player1}`;
    } else {
        return
    }

    //Complete the code here to flip existing disc following the rules of the game

    //Then calculate and display the score by counting the number of white discs and the number of black discs (Note: You can do this in the refreshGrid() function)

    line(row, col);
    befor(row, col);
    column(row, col);
    alacsonPlusUp(row, col)
    alacsonPlusDown(row, col)
    alacsonMinusUp(row, col)
    alacsonMinusDown(row, col)
    if (player == 1) {
        player = 2
    } else {
        player = 1
    }
    refreshGrid();
}

let style1
//A function used to refresh the Othello grid on screen
function refreshGrid(x) {
    console.log(x);
    for (var row = 0; row < 8; row++) {
        for (var col = 0; col < 8; col++) {
            style1 = document.getElementById("cell" + row + col).style.borderRadius = '50%'
            style1.borderRadius = '50%';
            style1.width = '31px'
            style1.height = '31px'
            style1.padding = '2px'
            if (grid[row][col] == 0) {
                document.getElementById("cell" + row + col).style.backgroundColor = "#129104";

            } else if (grid[row][col] == 1) { //1 for white
                document.getElementById("cell" + row + col).style.backgroundColor = "#FFFFFF";

            } else if (grid[row][col] == 2) { //2 for black
                document.getElementById("cell" + row + col).style.backgroundColor = "#000000";

            }
        }
    }
    // let info = JSON.parse(localStorage.getItem('players'))
    // console.log(info);
    // let player1 = {userName:info[1].userName,score:sum (1)}
    // // let player2 = {userName:info[2].userName,score:sum (2)}
    // let players = [{player1},{player2}]
    // localStorage.setItem("players", JSON.stringify(players))

    // document.getElementById('name1').innerHTML = 
    // document.getElementById('name1').innerHTML = 
    winner()
    document.getElementById('player1Score').innerHTML = sum(1)
    document.getElementById('player2Score').innerHTML = sum(2)
    saveGame()
}


function sum(player) {
    let sumrow = 0;
    grid.forEach(row =>
        sumrow += row.filter((v) => (v === player)).length)
    return sumrow
}


function resetGrid() {
    grid = [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 1, 2, 0, 0, 0],
        [0, 0, 0, 2, 1, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0]
    ];
    document.getElementById('win').style.display = 'none'
    refreshGrid()
}



let bool = true;

function line(row, col) {
    let next = grid[row].indexOf(player, col + 1)
    for (let i = col + 1; i < next; i++) {
        if (grid[row][i] == 0) {
            bool = false
            return
        }
    }
    for (let i = col + 1; i < next; i++) {
        grid[row][i] = player
    }
}

function befor(row, col) {
    let previous = grid[row].lastIndexOf(player, col - 1)
    // console.log(previous);
    // console.log(row);
    if (previous == -1) { return }
    // for (let i = col - 1; i > previous; i--) 
    for (let i = previous + 1; i < col; i++) {
        if (grid[row][i] == 0) {
            bool = false
            return
        }
    }
    // console.log("bool" + bool);
    for (let i = previous + 1; i < col; i++) {
        grid[row][i] = player
    }
}
//              1   0
function column(row, col) {
    let arr = []
    for (let i = 0; i <= 7; i++) {
        arr.push(grid[i][col])
    }
    up(row, col)
    down(row, col)
    //[0, 0, 0, 1, 2, 1, 2, 1]
    function up(row, col) {
        let next = arr.indexOf(player, row + 1)
        if (next < 0) {
            return
        }
        for (let i = row + 1; i < next; i++) {
            if (arr[i] == 0) {
                bool = false
                return
            }
        }
        bool = true
        for (let i = row + 1; i < next; i++) {
            grid[i][col] = player
        }
    }

    function down(row, col) {
        let next = arr.lastIndexOf(player, row - 1)
        // console.log(arr);
        // console.log(next);
        if (next < 0) {
            return
        }
        for (let i = next + 1; i < row; i++) {
            if (arr[i] == 0) {
                bool = false
                // console.log(arr[i]);
                return

            }
        }
        bool = true
        for (let i = next + 1; i < row; i++) {
            grid[i][col] = player
        }
    }

}
//                     1    2
function alacsonPlusUp(row, col) {
    let arr = [];
    let r, c;
    for (let i = 1; i <= 7; i++) {
        r = row - i
        c = col + i
        if (r < 0 || c > 7) { break }
        arr.push(grid[r][c])
    }
    // console.log(arr);

    let next = arr.indexOf(player)
    for (let i = 0; i < next; i++) {
        if (arr[i] == 0) {
            bool = false
            return
        }
    }
    bool = true
    for (let i = 0; i < next; i++) {
        arr[i] = player
    }
    // console.log(arr);
    for (let i = 0; i < next + 1; i++) {
        r = row - i
        c = col + i
        grid[r][c] = arr[i]
    }
}
function alacsonPlusDown(row, col) {
    let arr = [];
    let r, c;
    for (let i = 1; i <= 7; i++) {
        r = row + i
        c = col - i
        if (c < 0 || r > 7) { break }
        arr.push(grid[r][c])
    }
    // console.log(arr);

    let next = arr.indexOf(player)
    for (let i = 0; i < next; i++) {
        if (arr[i] == 0) {
            bool = false
            return
        }
    }
    bool = true
    for (let i = 0; i < next; i++) {
        arr[i] = player
    }
    // console.log(arr);
    for (let i = 0; i < next + 1; i++) {
        r = row + i
        c = col - i
        grid[r][c] = arr[i]
    }
}

function alacsonMinusUp(row, col) {
    let arr = [];
    let r, c;
    for (let i = 1; i <= 7; i++) {
        r = row - i
        c = col - i
        if (r < 0 || c < 0) { break }
        arr.push(grid[r][c])
    }
    // console.log(arr);

    let next = arr.indexOf(player)
    for (let i = 0; i < next; i++) {
        if (arr[i] == 0) {
            bool = false
            return
        }
    }
    bool = true
    for (let i = 0; i < next; i++) {
        arr[i] = player
    }
    // console.log(arr);
    for (let i = 0; i < next + 1; i++) {
        r = row - i
        c = col - i
        grid[r][c] = arr[i]
    }
}
function alacsonMinusDown(row, col) {
    let arr = [];
    let r, c;
    for (let i = 1; i <= 7; i++) {
        r = row + i
        c = col + i
        if (c > 7 || r > 7) { break }
        arr.push(grid[r][c])
    }
    // console.log(arr);

    let next = arr.indexOf(player)
    for (let i = 0; i < next; i++) {
        if (arr[i] == 0) {
            bool = false
            return
        }
    }
    bool = true
    for (let i = 0; i < next; i++) {
        arr[i] = player
    }
    // console.log(arr);
    for (let i = 0; i < next + 1; i++) {
        r = row + i
        c = col + i
        grid[r][c] = arr[i]
    }
}
function winner() {
    let score1 = sum(1)
    let score2 = sum(2)

    let winner = document.getElementById('winner')
    let block = document.getElementById('win')
    if (score1 == 0) {
        winner.innerHTML = player2 + ' המנצח'
        block.style.display = 'block'
    } else if (score2 == 0) {
        winner.innerHTML = player1 + ' המנצח'
        block.style.display = 'block'
    }
    if (score1 + score2 == 64) {
        if (score1 < score2) {
            winner.innerHTML = player2 + ' המנצח'
            block.style.display = 'block'
        } else if (score2 < score1) {
            winner.innerHTML = player1 + ' המנצח'
            block.style.display = 'block'
        } else {
            winner.innerHTML = player1 + ' תיקו!! <br> ככה זה כששני אלופים משחקים!!'
            block.style.display = 'block'
        }
    }
    document.getElementById('infoWin').innerHTML = player1 + '=' + score1 + '<br>' + player2 + '=' + score2
}
function saveGame() {
    users[gamer].grid = grid
    localStorage.setItem(users[gamer].userName, JSON.stringify(grid));
    console.log(JSON.stringify(grid));
    var game1 = JSON.parse(localStorage.getItem(users[gamer].userName));
    console.log(game1)

}
// console.log(grid);
//                 grid = users[gamer].grid;
//                 console.log(grid);
//                 refreshGrid()
// ;
// document.body.addEventListener('load', conti)
conti()
// refreshGrid()