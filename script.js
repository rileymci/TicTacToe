
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
            console.log("New Game Beginning!");
        };
        switchPlayerTurn();
        printNewRound();
    };

    const resetGame = () => {
        board.resetBoard();
    }

    printNewRound();


    return {playRound, getActivePlayer, getBoard: board.getBoard};
}

function ScreenController() {
    const game = gameController();
    const playerTurnDiv = document.querySelector('.turn');
    const boardDiv = document.querySelector('.board');
  
    const updateScreen = () => {
      // clear the board
      boardDiv.textContent = "";
  
      // get the newest version of the board and player turn
      const board = game.getBoard();
      const activePlayer = game.getActivePlayer();
  
      // Display player's turn
      playerTurnDiv.textContent = `${activePlayer.name}'s turn...`
  
      // Render board squares
      board.forEach((row, rindex) => {
        row.forEach((cell, cindex) => {
            console.log("row index: "+rindex);
            console.log("column index: "+cindex);
          // Anything clickable should be a button!!
          const cellButton = document.createElement("button");
          cellButton.classList.add("cell");
          // Create a data attribute to identify the column
          // This makes it easier to pass into our `playRound` function
          cellButton.dataset.row = rindex; 
          cellButton.dataset.column = cindex;
          cellButton.textContent = cell.getValue();
          boardDiv.appendChild(cellButton);
        })
      })
    }
  
    // Add event listener for the board
    function clickHandlerBoard(e) {
      const selectedRow = e.target.dataset.row;
      const selectedColumn = e.target.dataset.column;
      // Make sure I've clicked a column and not the gaps in between
      if (!selectedRow) return;
      
      game.playRound(selectedRow,selectedColumn);
      updateScreen();
    }
    boardDiv.addEventListener("click", clickHandlerBoard);
  
    // Initial render
    updateScreen();
  
    // We don't need to return anything from this module because everything is encapsulated inside this screen controller.
  }
  
  ScreenController();






