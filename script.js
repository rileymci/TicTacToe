
function gameBoard() {
    const rows = 3;
    const columns = 3;
    const board = [];

    for (let i = 0; i < rows; i++){
        board[i] = [];
        for(let j = 0; j < columns; j++){
            board[i].push(Cell());
        }
    }

    const getBoard = () => board;

    const placeMarker = (row, column, player) => {
        
        if((board[row][column]).getValue() == ""){
            board[row][column].addMarker(player);
        }
            
    };

    const printBoard = () => {
        const boardWithCellValues = board.map((row) => row.map((cell) => cell.getValue()))
        console.log(boardWithCellValues);
    };

    const resetBoard = () => {
        for (let i = 0; i < rows; i++){
            for(let j = 0; j < columns; j++){
                board[i][j].resetValue();
            }
        }
    }

    return {getBoard, placeMarker, printBoard, resetBoard};

}


function Cell() {
    let value = "";

    const addMarker = (player) => {
        value = player;
    }

    const getValue = () => value;
    const resetValue = () => {
        value = "";
    }

    return {addMarker, getValue, resetValue};
}

function checkWinner(gameBoard){
    
    const boardWithCellValues = gameBoard.getBoard().map((row) => row.map((cell) => cell.getValue()))

    //Check rows
    for (let i = 0; i < 3; i++){
        if(boardWithCellValues[i][0] === boardWithCellValues[i][1] && boardWithCellValues[i][0] === boardWithCellValues[i][2] && boardWithCellValues[i][0] !== ''){
            console.log("true on row iteration: " + i);
            return true;
        }
    }


    //Check columns
    for (let j = 0; j < 3; j++){
        if(boardWithCellValues[0][j] === boardWithCellValues[1][j] && boardWithCellValues[0][j] === boardWithCellValues[2][j] && boardWithCellValues[0][j] !== ''){
            console.log("True on column iteration: " + j);
            return true;
        }
    }
    
    //Check Diagonals
    if(boardWithCellValues[0][0] === boardWithCellValues[1][1] && boardWithCellValues[0][0] === boardWithCellValues[2][2] && boardWithCellValues[0][0] !== ''){
        console.log("Diagonal!");
        return true;
    }

    if(boardWithCellValues[0][2] === boardWithCellValues[1][1] && boardWithCellValues[0][2] === boardWithCellValues[2][2] && boardWithCellValues[0][2] !== ''){
        return true;
    }

    return false;
    
}


function gameController( 
    playerOneName = "Player One",
    playerTwoName = "Player Two"
)   {
    const board = gameBoard();
    
    const players = [
        {
          name: playerOneName,
          token: "X"
        },
        {
          name: playerTwoName,
          token: "O"
        }
      ];

    let activePlayer = players[0];

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };
    const getActivePlayer = () => activePlayer;

    const printNewRound = () => {
        board.printBoard();
        console.log(`${getActivePlayer().name}'s turn`);
    };


    const playRound = (row, column) => {
        console.log(`Dropping ${getActivePlayer().name}'s token into place...`);
        board.placeMarker(row,column,getActivePlayer().token);

        if(checkWinner(board)){
            console.log(`${getActivePlayer().name} Wins!`);
            resetGame();
        };
        switchPlayerTurn();
        printNewRound();
    };

    const resetGame = () => {
        board.resetBoard();
    }

    printNewRound();


    return {playRound, getActivePlayer};
}

const game = gameController();

game.playRound(1,2);
game.playRound(0,1);
game.playRound(2,1);
game.playRound(1,0);
game.playRound(2,2);
game.playRound(2,0);
game.playRound(1,1);
game.playRound(0,2);
game.playRound(0,0);





