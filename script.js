class GameController {
  constructor() {
    this.board = new Gameboard();

    this.player1 = {
      i: 1,
      playerDisplay: document.querySelector(".p1"),
    };

    this.player2 = {
      i: 2,
      playerDisplay: document.querySelector(".p2"),
    };

    this.result = document.querySelector(".result");

    this.p1Counter = document.querySelector(".p1-score");
    this.p2Counter = document.querySelector(".p2-score");

    this.cellArray = DomHandler().gameboardHandler().cellArray;

    this.player1.score = 0;

    this.player2.score = 0;

    this.activePlayer = this.player1;

    this.boardArray = this.board.getCellValues();
  }

  playRound(col, row) {
    if (this.board.getCellValues()[col][row] === 0) {
      this.board.changeCellValue(this.activePlayer.i, col, row);
    } else {
      console.log("spot taken");
      return;
    }
    this.checkForWin();
    this.renderBoard();

    this.newRound();
  }

  switchPlayer() {
    console.log(this.activePlayer.playerDisplay.querySelector(".player"));

    this.activePlayer.playerDisplay
      .querySelector(".player")
      .classList.remove("current");

    if (this.activePlayer === this.player1) {
      this.activePlayer = this.player2;
    } else {
      this.activePlayer = this.player1;
    }

    this.activePlayer.playerDisplay
      .querySelector(".player")
      .classList.add("current");
  }

  newRound() {
    this.switchPlayer();
    console.log(`${this.activePlayer.i}'s turn.`);
    this.renderBoard();
  }

  checkForWin() {
    this.boardArray = this.board.getCellValues();

    if (
      (this.boardArray[0][0] === this.boardArray[0][1] &&
        this.boardArray[0][1] === this.boardArray[0][2] &&
        this.boardArray[0][0] !== 0) ||
      (this.boardArray[1][0] === this.boardArray[1][1] &&
        this.boardArray[1][1] === this.boardArray[1][2] &&
        this.boardArray[1][1] !== 0) ||
      (this.boardArray[2][0] === this.boardArray[2][1] &&
        this.boardArray[2][1] === this.boardArray[2][2] &&
        this.boardArray[2][1] !== 0) ||
      (this.boardArray[0][0] === this.boardArray[1][0] &&
        this.boardArray[1][0] === this.boardArray[2][0] &&
        this.boardArray[1][0] !== 0) ||
      (this.boardArray[0][1] === this.boardArray[1][1] &&
        this.boardArray[1][1] === this.boardArray[2][1] &&
        this.boardArray[1][1] !== 0) ||
      (this.boardArray[0][2] === this.boardArray[1][2] &&
        this.boardArray[1][2] === this.boardArray[2][2] &&
        this.boardArray[1][2] !== 0) ||
      (this.boardArray[0][0] === this.boardArray[1][1] &&
        this.boardArray[1][1] === this.boardArray[2][2] &&
        this.boardArray[1][1] !== 0) ||
      (this.boardArray[0][2] === this.boardArray[1][1] &&
        this.boardArray[1][1] === this.boardArray[2][0] &&
        this.boardArray[1][1] !== 0)
    ) {
      this.result.textContent = `Game Over! ${this.activePlayer.i} wins!`;

      this.activePlayer.score++;

      setTimeout(() => {
        this.resetGame();
      }, 1500);
    } else if (this.boardArray.flat().includes(0) !== true) {
      this.result.textContent = `Game Over! Tie!`;
      setTimeout(() => {
        resetGame();
      }, 1500);
    }
  }

  resetGame() {
    this.result.textContent = "";

    this.p1Counter.textContent = this.player1.score;
    this.p2Counter.textContent = this.player2.score;

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        this.board.changeCellValue(0, i, j);
      }
    }
    this.switchPlayer();

    this.renderBoard();

    console.log(this.board.getCellValues());
  }

  renderBoard() {
    this.boardArray = this.board.getCellValues();

    let boardStateArray = this.boardArray.reduce((arr, row) => {
      arr = arr.concat(row);
      return arr;
    }, []);

    for (let i = 0; i < this.cellArray.length; i++) {
      if (this.cellArray[i].firstChild) {
        this.cellArray[i].removeChild(this.cellArray[i].firstChild);
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
          this.cellArray[i].appendChild(x);
          break;
        case 2:
          const o = document.createElement("img");
          o.src = "src/o.svg";
          o.classList.add("icon");
          this.cellArray[i].appendChild(o);
          break;
      }
    }
  }
}

class Gameboard {
  constructor() {
    this.rows = 3;

    this.cols = 3;

    this.board = [];
    for (let i = 0; i < this.rows; i++) {
      this.board[i] = [];

      for (let j = 0; j < this.cols; j++) {
        this.board[i].push(new Cell());
      }
    }
  }

  getBoard() {
    return this.board;
  }

  getCellValues() {
    const boardWithCellValues = this.board.map((row) =>
      row.map((cell) => cell.getValue())
    );
    return boardWithCellValues;
  }

  changeCellValue(value, row, col) {
    this.board[row][col].changeValue(value);
  }
}

class Cell {
  constructor() {
    this.value = 0;
  }

  changeValue(playerValue) {
    this.value = playerValue;
  }

  getValue() {
    return this.value;
  }
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
      player2NameDisplay,
    };
  }

  return {
    gameboardHandler,
    buttonHandler,
    playerNameDisplay,
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

    DomHandler().playerNameDisplay().player1NameDisplay.textContent =
      p1Input.value;
    DomHandler().playerNameDisplay().player2NameDisplay.textContent =
      p2Input.value;
  });

game = new GameController();
