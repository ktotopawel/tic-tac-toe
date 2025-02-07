function GameController(player1 = 1, player2 = 2) {
  let board = Gameboard();

  console.log(board.getCellValues());

  let activePlayer = player1;

  function playRound(col, row) {
    if (board.getCellValues()[col][row] === 0){
        board.changeCellValue(activePlayer, col, row);
    } else {
        console.log('spot taken');
        return;
    }
    checkForWin();
    newRound();
    console.log(board.getCellValues());
  }

  function switchPlayer() {
    if (activePlayer === player1) {
      activePlayer = player2;
    } else {
      activePlayer = player1;
    }
  }

  function newRound() {
    switchPlayer();
    console.log(`${activePlayer}'s turn.`);
    board.getCellValues;
  }

  function checkForWin() {
    let boardArray = board.getCellValues();

    console.log(`checkForWinFn`);
    console.log(boardArray);

    if (
      (boardArray[0][0] === boardArray[0][1] &&
        boardArray[0][1] === boardArray[0][2]) && boardArray[0][0] !== 0 ||
      (boardArray[1][0] === boardArray[1][1] &&
        boardArray[1][1] === boardArray[1][2]) && boardArray[1][1] !== 0  ||
      (boardArray[2][0] === boardArray[2][1] &&
        boardArray[2][1] === boardArray[2][2]) && boardArray[2][1] !== 0  ||
      (boardArray[0][0] === boardArray[1][0] &&
        boardArray[1][0] === boardArray[2][0]) && boardArray[1][0] !== 0  ||
      (boardArray[0][1] === boardArray[1][1] &&
        boardArray[1][1] === boardArray[2][1]) && boardArray[1][1] !== 0  ||
      (boardArray[0][2] === boardArray[1][2] &&
        boardArray[1][2] === boardArray[2][2]) && boardArray[1][2] !== 0  ||
      (boardArray[0][0] === boardArray[1][1] &&
        boardArray[1][1] === boardArray[2][2]) && boardArray[1][1] !== 0  ||
      (boardArray[0][2] === boardArray[1][1] && 
        boardArray[1][1] === boardArray[2][0]) && boardArray[1][1] !== 0
    ) {
      console.log(`Game over ${activePlayer} wins`);
      resetGame();
    } else if (!boardArray.some((val) => val !== 0)) {
      console.log("Tie!");
      resetGame();
    }
  }

  function resetGame() {
    board = Gameboard();
    activePlayer = player1;
  }

  return {
    resetGame,
    playRound
  };
}

function Gameboard() {
  const rows = 3;
  const cols = 3;
  const board = [];

  for (let i = 0; i < rows; i++) {
    board[i] = [];

    for (let j = 0; j < cols; j++) {
      board[i].push(Cell());
    }
  }

  function getBoard() {
    return board;
  }

  function getCellValues() {
    const boardWithCellValues = board.map((row) =>
      row.map((cell) => cell.getValue())
    );
    // console.log(boardWithCellValues);
    return boardWithCellValues;
  }

  function changeCellValue(value, row, col) {
    board[row][col].changeValue(value);
  }

  return {
    getCellValues,
    changeCellValue,
    getBoard,
  };
}

function Cell() {
  let value = 0;

  const changeValue = (playerValue) => {
    value = playerValue;
  };

  const getValue = () => {
    return value;
  };

  return {
    getValue,
    changeValue,
  };
}

// function Player(playerName, playerSymbol) {playerName, playerSymbol};

game = GameController();

// gameboard = Gameboard();
