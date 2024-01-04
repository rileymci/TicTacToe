
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

    return {getBoard, placeMarker, printBoard};

}


function Cell() {
    let value = "";

    const addMarker = (player) => {
        value = player;
    }

    const getValue = () => value;

    return {addMarker, getValue};
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

        switchPlayerTurn();
        printNewRound();
    };

    printNewRound();


    return {playRound, getActivePlayer};
}

const game = gameController();

game.playRound(0,0);



