const board = document.getElementById("board");
const statusText = document.getElementById("status");

let gameState = Array(9).fill("");
let currentPlayer = "X";
let gameActive = true;

const winningConditions = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
];

// Create board
function createBoard() {
    board.innerHTML = "";
    gameState.forEach((_, index) => {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.addEventListener("click", () => handleClick(index));
        board.appendChild(cell);
    });
}

function handleClick(index) {
    if (!gameActive || gameState[index] !== "") return;

    gameState[index] = currentPlayer;
    board.children[index].innerText = currentPlayer;

    if (checkWinner()) {
        statusText.innerText = `Player ${currentPlayer} wins!`;
        gameActive = false;
        return;
    }

    if (!gameState.includes("")) {
        statusText.innerText = "It's a draw!";
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.innerText = `Player ${currentPlayer}'s turn`;
}

function checkWinner() {
    return winningConditions.some(condition => {
        return condition.every(index => gameState[index] === currentPlayer);
    });
}

function resetGame() {
    gameState = Array(9).fill("");
    currentPlayer = "X";
    gameActive = true;
    statusText.innerText = "Player X's turn";
    createBoard();
}

createBoard();
