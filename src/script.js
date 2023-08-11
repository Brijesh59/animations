const numCells = 6;
const players = [1, 2];
let currentPlayer = players[0];
let cells = [];

function initializeCells() {
  cells = Array.from({ length: numCells * numCells }, (_, index) => ({
    id: index,
    count: 0,
    player: 0
  }));
}

function updateCell(cell) {
  const cellElement = document.getElementById(`cell-${cell.id}`);
  cellElement.style.backgroundColor =
    cell.player === 0 ? "#ddd" : cell.player === 1 ? "blue" : "green";
  cellElement.innerText = cell.count > 0 ? cell.count : "";
}

// function handleCellClick(cell) {
//   if (cell.player === 0 || cell.player === currentPlayer) {
//     cell.count++;
//     cell.player = currentPlayer;
//     updateCell(cell);

//     if (checkForExplosion(cell)) {
//       handleExplosion(cell);
//     } else {
//       switchPlayer();
//     }
//   }
// }

function checkForExplosion(cell) {
  return cell.count > getAdjacentCells(cell).length;
}

function getAdjacentCells(cell) {
  const adjacentCells = [];
  const row = Math.floor(cell.id / numCells);
  const col = cell.id % numCells;

  if (row > 0) adjacentCells.push(cells[(row - 1) * numCells + col]);
  if (row < numCells - 1) adjacentCells.push(cells[(row + 1) * numCells + col]);
  if (col > 0) adjacentCells.push(cells[row * numCells + (col - 1)]);
  if (col < numCells - 1) adjacentCells.push(cells[row * numCells + (col + 1)]);

  return adjacentCells;
}

function handleExplosion(cell) {
  cell.count = 0;
  cell.player = 0;
  updateCell(cell);

  const adjacentCells = getAdjacentCells(cell);
  adjacentCells.forEach((adjCell) => {
    if (adjCell.count > 0) {
      adjCell.count--;
      adjCell.player = currentPlayer;
      updateCell(adjCell);
      if (checkForExplosion(adjCell)) {
        handleExplosion(adjCell);
      }
    }
  });

  switchPlayer();
}

function switchPlayer() {
  currentPlayer = currentPlayer === players[0] ? players[1] : players[0];
  document.getElementById("current-player").innerText = currentPlayer;
}

function resetGame() {
  initializeCells();
  cells.forEach(updateCell);
  currentPlayer = players[0];
  document.getElementById("current-player").innerText = currentPlayer;
}

function setupCells() {
  const container = document.querySelector(".game-container");
  for (let i = 0; i < cells.length; i++) {
    const cell = cells[i];
    const cellElement = document.createElement("div");
    cellElement.className = "cell";
    cellElement.id = `cell-${cell.id}`;
    cellElement.addEventListener("click", () => handleCellClick(cell));
    container.appendChild(cellElement);
    updateCell(cell);
  }
}

document.getElementById("reset-button").addEventListener("click", resetGame);

initializeCells();
setupCells();

// ... Same as before ...

function checkForWin() {
  const playerCells = cells.filter((cell) => cell.player === currentPlayer);
  if (playerCells.every((cell) => cell.count >= 1)) {
    showWinMessage();
  }
}

// function showWinMessage() {
//   const winOverlay = document.getElementById("win-overlay");
//   const winMessage = document.getElementById("win-message");
//   const winningPlayer = document.getElementById("winning-player");
//   winningPlayer.textContent = currentPlayer;
//   winOverlay.style.display = "flex";
//   winMessage.style.animation = "fadeIn 0.5s";
// }

document.addEventListener("animationend", function (e) {
  if (e.target.classList.contains("win-message")) {
    e.target.style.animation = "";
  }
});

// ... Rest of the code ...

// ... Same as before ...

function handleCellClick(cell) {
  if (cell.player === 0 || cell.player === currentPlayer) {
    cell.count++;
    cell.player = currentPlayer;
    updateCell(cell);

    if (checkForExplosion(cell)) {
      handleExplosion(cell);
    } else {
      switchPlayer();
    }

    if (checkForWin()) {
      showWinMessage();
    }
  }
}

function showWinMessage() {
  const winOverlay = document.getElementById("win-overlay");
  const winMessage = document.getElementById("win-message");
  const winningPlayer = document.getElementById("winning-player");
  winningPlayer.textContent = `Player ${currentPlayer}`;
  winOverlay.style.display = "flex";
  winMessage.style.animation = "fadeIn 0.5s";
}

// ... Rest of the code ...
