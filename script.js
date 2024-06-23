const boardSize = 15;
const winCondition = 5;
let board = [];
let currentPlayer = 'usa';
const boardElement = document.getElementById('board');
const restartButton = document.getElementById('restart');

const usaWeapons = [
  'usa_weapon1.png',
  'usa_weapon2.png',
  'usa_weapon3.png',
  'usa_weapon4.png',
  'usa_weapon5.png'
];

const chinaWeapons = [
  'china_weapon1.png',
  'china_weapon2.png',
  'china_weapon3.png',
  'china_weapon4.png',
  'china_weapon5.png'
];

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

  const weaponImg = document.createElement('img');
  if (currentPlayer === 'usa') {
    weaponImg.src = getRandomWeapon(usaWeapons);
  } else {
    weaponImg.src = getRandomWeapon(chinaWeapons);
  }

  board[row][col] = currentPlayer;
  event.target.appendChild(weaponImg);

  if (checkWin()) {
    setTimeout(() => alert(`${currentPlayer.toUpperCase()}贏了！`), 100);
    return;
  }

  currentPlayer = currentPlayer === 'usa' ? 'china' : 'usa';
}

function getRandomWeapon(weapons) {
  const index = Math.floor(Math.random() * weapons.length);
  return weapons[index];
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
