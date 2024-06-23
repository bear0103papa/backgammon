const boardSize = 15;
const winCondition = 5;
let board = [];
let currentPlayer = 'usa';
let useIcons = true;
const boardElement = document.getElementById('board');
const restartButton = document.getElementById('restart');
const toggleStyleButton = document.getElementById('toggleStyle');

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

  board[row][col] = currentPlayer;
  renderBoard();

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

function renderBoard() {
  const cells = boardElement.querySelectorAll('.cell');
  cells.forEach(cell => {
    const index = cell.dataset.index;
    const row = Math.floor(index / boardSize);
    const col = index % boardSize;

    // Clear cell content
    cell.innerHTML = '';

    // Render piece if exists
    if (board[row][col]) {
      if (useIcons) {
        const weaponImg = document.createElement('img');
        weaponImg.src = board[row][col] === 'usa' ? getRandomWeapon(usaWeapons) : getRandomWeapon(chinaWeapons);
        weaponImg.classList.add('piece-icon');
        cell.appendChild(weaponImg);
      } else {
        const circle = document.createElement('div');
        circle.classList.add('circle');
        circle.classList.add(board[row][col] === 'usa' ? 'usa-circle' : 'china-circle');
        cell.appendChild(circle);
      }
    }
  });
}

toggleStyleButton.addEventListener('click', () => {
  useIcons = !useIcons;
  renderBoard();
});

restartButton.addEventListener('click', () => {
  initBoard();
  currentPlayer = 'usa';
});

initBoard();
