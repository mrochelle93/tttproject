const statusDisplay = document.querySelector(".game--status"); //here i am declaring a const variable "statusDisplay" to keep track of the game state

let gameActive = true; //boolean value to indicate the start up/initializing of the game and to pause the game if neccessary
let currentPlayer = "X"; // here i am declaring the variable "currentPlayer" to store the current player
let gameState = ["", "", "", "", "", "", "", "", ""]; //storing the game state here.. the empty strings keeps track of the played cells

const winningMessage = () => `Player ${currentPlayer} has won!`; // lines 7-10 I have declared variables that contain messages the user will see
const drawMessage = () => `Game ended in a draw!`;
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;

statusDisplay.innerHTML = currentPlayerTurn(); //the initial message is here to let the user know whose turn it is

const winningConditions = [
  //here declaring the variable "winningConditions" .. then create an object that contains the cell numbers for the winning conditions
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function handleCellPlayed(clickedCell, clickedCellIndex) {
  //here creating a function that stores click depending on the current player
  gameState[clickedCellIndex] = currentPlayer;
  clickedCell.innerHTML = currentPlayer;
}

function handlePlayerChange() {
  // function that alternates between player "X" and player "O"
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusDisplay.innerHTML = currentPlayerTurn(); //this references line 9 and the display message depending on the player turn
}

function handleResultValidation() {
  // this function helps to determine which player actually won the game
  let roundWon = false;
  for (let i = 0; i <= 7; i++) {
    // this for-loop goes through each element (there are three because you must get three in a row to win) of the game to determine win, lose, or draw
    const winCondition = winningConditions[i];
    let a = gameState[winCondition[0]];
    let b = gameState[winCondition[1]];
    let c = gameState[winCondition[2]];
    if (a === "" || b === "" || c === "") {
      continue;
    }
    if (a === b && b === c) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    statusDisplay.innerHTML = winningMessage(); //if the user wins this message will display (using boolean (true or false) and if statements here )
    gameActive = false;
    return;
  }

  let roundDraw = !gameState.includes("");
  if (roundDraw) {
    statusDisplay.innerHTML = drawMessage();
    gameActive = false;
    return;
  }

  handlePlayerChange(); //referencing the function declared above
}

function handleCellClick(clickedCellEvent) {
  const clickedCell = clickedCellEvent.target;
  const clickedCellIndex = parseInt(
    clickedCell.getAttribute("data-cell-index")
  );

  if (gameState[clickedCellIndex] !== "" || !gameActive) {
    return;
  }

  handleCellPlayed(clickedCell, clickedCellIndex);
  handleResultValidation();
}

function handleRestartGame() {
  //setting the tracking variables back to the blank default and clearing the board hence the empty strings in the array
  gameActive = true;
  currentPlayer = "X";
  gameState = ["", "", "", "", "", "", "", "", ""];
  statusDisplay.innerHTML = currentPlayerTurn();
  document.querySelectorAll(".cell").forEach((cell) => (cell.innerHTML = ""));
}

document // lines 88-93 are event listeners added to each cell
  .querySelectorAll(".cell")
  .forEach((cell) => cell.addEventListener("click", handleCellClick));
document
  .querySelector(".game--restart")
  .addEventListener("click", handleRestartGame);
