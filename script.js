
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
    if(boardWithCellValues[0][0] === boardWithCellValues[1][1] && boardWithCellValues[1][1] === boardWithCellValues[2][2] && boardWithCellValues[0][0] !== ''){
        console.log("Diagonal!");
        return true;
    }

    if(boardWithCellValues[0][2] === boardWithCellValues[1][1] && boardWithCellValues[1][1] === boardWithCellValues[2][0] && boardWithCellValues[0][2] !== ''){
        return true;
    }

    console.log("False");
    return false;
    
}


function gameController( 
    
    playerOneName = "Player One",
    playerTwoName = "Player Two")   {
    const board = gameBoard();
    
    const resultsDiv = document.querySelector('.results');
    var result = document.createElement("h2");
    result.innerHTML = playerOneName + " 0 - 0 " + playerTwoName;
    resultsDiv.appendChild(result); 

    var turnCount = 0;
    var playerOneScore = 0;
    var playerTwoScore = 0;
    
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
        turnCount++;
        board.placeMarker(row,column,getActivePlayer().token);
        console.log(`Dropping ${getActivePlayer().name}'s token into place...`);

        if(checkWinner(board)){
            if(getActivePlayer() === players[0]){
                playerOneScore++;
            }
            else{
                playerTwoScore++;
            }
            result.innerHTML = playerOneName + " " + playerOneScore + " - " + playerTwoScore + " " + playerTwoName;
            resultsDiv.appendChild(result);
            console.log(`${getActivePlayer().name} Wins!`);
            turnCount = 0;
            resetGame();
            console.log("New Game Beginning!");
        }
        else if(turnCount > 8){
            turnCount = 0;
            console.log("It's a Draw!");
            resetGame();
        }
        console.log(turnCount);
        switchPlayerTurn();
        printNewRound();
    };

    const resetGame = () => {
        board.resetBoard();
    }

    printNewRound();


    return {playRound, getActivePlayer, getBoard: board.getBoard};
}

function ScreenController(playerOneName, playerTwoName) {
    const game = gameController(playerOneName,playerTwoName);
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
            // Anything clickable should be a button!!
            const cellButton = document.createElement("button");
            cellButton.classList.add("cell");
            // Create a data attribute to identify the column
            // This makes it easier to pass into our `playRound` function
            cellButton.dataset.row = rindex; 
            cellButton.dataset.column = cindex;
            cellButton.textContent = cell.getValue();
            if(cell.getValue() === "X"){
                cellButton.style.color = "rgb(2, 243, 252)";
            }
            else{
                cellButton.style.color = "rgb(228, 129, 59)";
            }
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
        
      if(game.getBoard()[selectedRow][selectedColumn].getValue() !== "") return;
      game.playRound(selectedRow,selectedColumn);
      updateScreen();
    }
    boardDiv.addEventListener("click", clickHandlerBoard);
  
    // Initial render
    updateScreen();
  
    // We don't need to return anything from this module because everything is encapsulated inside this screen controller.
  }

  const form = document.getElementById("playerForm");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    let playerOneName = document.getElementById("playerOneName").value;
    let playerTwoName = document.getElementById("playerTwoName").value;
  
    if (playerOneName == "" || playerTwoName == "") {
      alert("Ensure you input a value in both fields!");
    } else {
    
      form.reset();
      startUp(playerOneName, playerTwoName)
        
    }
  });
  
  function startUp(playerOneName, playerTwoName){

    const popup = document.querySelector(".popup");
    const main = document.querySelector(".main");
    popup.remove();
    main.style.visibility = "visible";
    ScreenController(playerOneName, playerTwoName);

  }









