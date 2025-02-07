function GameController() {
  let board = Gameboard();

  let player1 = {
    i: 1,
    playerDisplay: document.querySelector(".p1"),
  };

  let player2 = {
    i: 2,
    playerDisplay: document.querySelector(".p2"),
  };

  const result = document.querySelector(".result");

  const p1Counter = document.querySelector(".p1-score");
  const p2Counter = document.querySelector(".p2-score");

  const cellArray = DomHandler().gameboardHandler().cellArray;

  player1.score = 0;

  player2.score = 0;

  let activePlayer = player1;

  let boardArray = board.getCellValues();

  function playRound(col, row) {
    if (board.getCellValues()[col][row] === 0) {
      board.changeCellValue(activePlayer.i, col, row);
    } else {
      console.log("spot taken");
      return;
    }
    checkForWin();
    renderBoard();

    newRound();
  }

  function switchPlayer() {
    console.log(activePlayer.playerDisplay.querySelector(".player"));

    activePlayer.playerDisplay
      .querySelector(".player")
      .classList.remove("current");

    if (activePlayer === player1) {
      activePlayer = player2;
    } else {
      activePlayer = player1;
    }

    activePlayer.playerDisplay
      .querySelector(".player")
      .classList.add("current");
  }

  function newRound() {
    switchPlayer();
    console.log(`${activePlayer.i}'s turn.`);
    renderBoard();
  }

  function checkForWin() {
    boardArray = board.getCellValues();

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
      result.textContent = `Game Over! ${activePlayer.i} wins!`;

      activePlayer.score++;

      setTimeout(() => {
        resetGame();
      }, 1500);
    } else if (boardArray.flat().includes(0) !== true) {
      result.textContent = `Game Over! Tie!`;
      setTimeout(() => {
        resetGame();
      }, 1500);
    }
  }

  function resetGame() {
    result.textContent = "";

    p1Counter.textContent = player1.score;
    p2Counter.textContent = player2.score;

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        board.changeCellValue(0, i, j);
      }
    }
    switchPlayer();

    renderBoard();

    console.log(board.getCellValues());
  }

  function renderBoard() {
    boardArray = board.getCellValues();

    let boardStateArray = boardArray.reduce((arr, row) => {
      arr = arr.concat(row);
      return arr;
    }, []);

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

function DomHandler() {
  function gameboardHandler() {
    const cell1 = document.getElementById("cell1");
    const cell2 = document.getElementById("cell2");
    const cell3 = document.getElementById("cell3");
    const cell4 = document.getElementById("cell4");
    const cell5 = document.getElementById("cell5");
    const cell6 = document.getElementById("cell6");
    const cell7 = document.getElementById("cell7");
    const cell8 = document.getElementById("cell8");
    const cell9 = document.getElementById("cell9");

    const cellArray = [
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

    const cellBoard = document.querySelector(".gameboard");
    return {
      cellArray,
      cellBoard,
    };
  }

  function buttonHandler() {
    const resetBtn = document.querySelector(".reset");

    const submitBtn = document.querySelector(".submit-btn");
    return {
      resetBtn,
      submitBtn,
    };
  }

  function playerNameDisplay() {
    const player1NameDisplay = document.querySelector("#player-1-name");
    const player2NameDisplay = document.querySelector("#player-2-name");

    return {
        player1NameDisplay,
        player2NameDisplay
    }
  }
  

  return {
    gameboardHandler,
    buttonHandler,
    playerNameDisplay
  };
}

DomHandler()
  .gameboardHandler()
  .cellBoard.addEventListener("click", (event) => {
    let target = event.target;

    if (target.id === "") {
      target = event.target.parentNode;
    }

    console.log(target.id);

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

DomHandler()
  .buttonHandler()
  .resetBtn.addEventListener("click", () => {
    game.resetGame();
  });

DomHandler()
  .buttonHandler()
  .submitBtn.addEventListener("click", () => {
    const p1Input = document.querySelector("#player1-name");
    const p2Input = document.querySelector("#player2-name");

    DomHandler().playerNameDisplay().player1NameDisplay.textContent = p1Input.value;
    DomHandler().playerNameDisplay().player2NameDisplay.textContent = p2Input.value;
  });

game = GameController();