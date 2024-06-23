const boardSize = 15;
const winCondition = 5;
let board = [];
let currentPlayer = 'x';
const boardElement = document.getElementById('board');
const restartButton = document.getElementById('restart');

function initBoard() {
  board = Array(boardSize).fill(null).map(() => Array(boardSize).fill(null));
  boardElement.innerHTML = '';
  for (let i = 0; i < boardSize * boardSize; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.dataset.index = i;
    cell.addEventListener('click', handleCellClick);
    boardElement.appendChild(cell);
  }
}

function handleCellClick(event) {
  const index = event.target.dataset.index;
  const row = Math.floor(index / boardSize);
  const col = index % boardSize;

  if (board[row][col] || checkWin()) return;

  board[row][col] = currentPlayer;
  event.target.classList.add(currentPlayer);

  if (checkWin()) {
    setTimeout(() => alert(`${currentPlayer.toUpperCase()}贏了！`), 100);
    return;
  }

  currentPlayer = currentPlayer === 'x' ? 'o' : 'x';
}

function checkWin() {
  const directions = [
    { x: 0, y: 1 },
    { x: 1, y: 0 },
    { x: 1, y: 1 },
    { x: 1, y: -1 }
  ];

  for (let row = 0; row < boardSize; row++) {
    for (let col = 0; col < boardSize; col++) {
      if (board[row][col]) {
        for (let { x, y } of directions) {
          if (checkDirection(row, col, x, y)) return true;
        }
      }
    }
  }
  return false;
}

function checkDirection(row, col, xDir, yDir) {
  const start = board[row][col];
  let count = 0;

  for (let i = 0; i < winCondition; i++) {
    const r = row + i * xDir;
    const c = col + i * yDir;

    if (r < 0 || r >= boardSize || c < 0 || c >= boardSize || board[r][c] !== start) {
      return false;
    }
    count++;
  }
  return count === winCondition;
}

restartButton.addEventListener('click', initBoard);

initBoard();
