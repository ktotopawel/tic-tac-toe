const cell1 = document.getElementById("cell1");
const cell2 = document.getElementById("cell2");
const cell3 = document.getElementById("cell3");
const cell4 = document.getElementById("cell4");
const cell5 = document.getElementById("cell5");
const cell6 = document.getElementById("cell6");
const cell7 = document.getElementById("cell7");
const cell8 = document.getElementById("cell8");
const cell9 = document.getElementById("cell9");

const cellBoard = document.querySelector(".gameboard");

function GameController(player1 = 1, player2 = 2) {
  let board = Gameboard();


  let cellArray = [
    cell1,
    cell2,
    cell3,
    cell4,
    cell5,
    cell6,
    cell7,
    cell8,
    cell9,
  ];

  console.log(board.getCellValues());

  let activePlayer = player1;

  let boardArray = board.getCellValues();

  function playRound(col, row) {
    if (board.getCellValues()[col][row] === 0) {
      board.changeCellValue(activePlayer, col, row);
    } else {
      console.log("spot taken");
      return;
    }
    checkForWin();
    renderBoard();

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
    boardArray = board.getCellValues();

    console.log(`checkForWinFn`);
    console.log(boardArray);

    if (
      (boardArray[0][0] === boardArray[0][1] &&
        boardArray[0][1] === boardArray[0][2] &&
        boardArray[0][0] !== 0) ||
      (boardArray[1][0] === boardArray[1][1] &&
        boardArray[1][1] === boardArray[1][2] &&
        boardArray[1][1] !== 0) ||
      (boardArray[2][0] === boardArray[2][1] &&
        boardArray[2][1] === boardArray[2][2] &&
        boardArray[2][1] !== 0) ||
      (boardArray[0][0] === boardArray[1][0] &&
        boardArray[1][0] === boardArray[2][0] &&
        boardArray[1][0] !== 0) ||
      (boardArray[0][1] === boardArray[1][1] &&
        boardArray[1][1] === boardArray[2][1] &&
        boardArray[1][1] !== 0) ||
      (boardArray[0][2] === boardArray[1][2] &&
        boardArray[1][2] === boardArray[2][2] &&
        boardArray[1][2] !== 0) ||
      (boardArray[0][0] === boardArray[1][1] &&
        boardArray[1][1] === boardArray[2][2] &&
        boardArray[1][1] !== 0) ||
      (boardArray[0][2] === boardArray[1][1] &&
        boardArray[1][1] === boardArray[2][0] &&
        boardArray[1][1] !== 0)
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
    renderBoard();
  }

  function renderBoard() {
    let boardStateArray = boardArray.reduce((arr, row) => {
      arr = arr.concat(row);
      return arr;
    }, []);

    console.log(boardStateArray);

    for (let i = 0; i < cellArray.length; i++) {
      if (cellArray[i].firstChild) {
        cellArray[i].removeChild(cellArray[i].firstChild);
      }
    }

    for (let i = 0; i < boardStateArray.length; i++) {
      switch (boardStateArray[i]) {
        case 0:
          break;
        case 1:
          const x = document.createElement("img");
          x.src = "src/x.svg";
          x.classList.add("icon");
          cellArray[i].appendChild(x);
          break;
        case 2:
          const o = document.createElement("img");
          o.src = "src/o.svg";
          o.classList.add("icon");
          cellArray[i].appendChild(o);
          break;
      }
    }
  }

  return {
    resetGame,
    playRound,
    renderBoard,
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

game.playRound(0, 0);
game.playRound(1, 2);
game.playRound(0, 1);
game.playRound(1, 1)

console.log(cellBoard);



cellBoard.addEventListener("click", (event) => {
    let target = event.target;
    switch (target.id) {
      case "cell1":
        game.playRound(0, 0);
        break;
      case "cell2":
        game.playRound(0, 1);
        break;
      case "cell3":
        game.playRound(0, 2);
        break;
      case "cell4":
        game.playRound(1, 0);
        break;
      case "cell5":
        game.playRound(1, 1);
        break;
      case "cell6":
        game.playRound(1, 2);
        break;
      case "cell7":
        game.playRound(2, 0);
        break;
      case "cell8":
        game.playRound(2, 1);
        break;
      case "cell9":
        game.playRound(2, 2);
        break;

      default:
        break;
    }
  });