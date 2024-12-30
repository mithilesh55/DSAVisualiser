const canvas = document.getElementById('chessboard');
const ctx = canvas.getContext('2d');
const queensContainer = document.getElementById('queens-container');
let boardSize = 4;
let cellSize;
let queens = [];
let queenPositions = [];
let moveHistory = [];

// Start default 4x4 game on page load
window.onload = function() {
    startGame(4);
};

function startGame(size) {
    boardSize = size;
    cellSize = 400 / boardSize;
    canvas.width = cellSize * boardSize;
    canvas.height = cellSize * boardSize;
    queenPositions = Array(boardSize).fill(null);
    queensContainer.innerHTML = '';
    queens = [];
    moveHistory = [];
    drawBoard();
    createQueens();
}

function drawBoard() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let row = 0; row < boardSize; row++) {
        for (let col = 0; col < boardSize; col++) {
            ctx.fillStyle = (row + col) % 2 === 0 ? '#f0d9b5' : '#b58863';
            ctx.fillRect(col * cellSize, row * cellSize, cellSize, cellSize);
        }
    }

    // Draw queens already placed on the board
    for (let pos of queenPositions) {
        if (pos && pos.row !== null && pos.col !== null) {
            drawQueen(pos.col * cellSize + cellSize / 2, pos.row * cellSize + cellSize / 2);
        }
    }
}

function createQueens() {
    for (let i = 0; i < boardSize; i++) {
        const queen = document.createElement('div');
        queen.classList.add('queen');
        queen.innerText = '♛';
        queen.draggable = true;
        queen.dataset.queenIndex = i;
        queen.addEventListener('dragstart', handleDragStart);
        queensContainer.appendChild(queen);
        queens.push(queen);
    }

    canvas.addEventListener('dragover', handleDragOver);
    canvas.addEventListener('drop', handleDropOnBoard);
}

let draggedQueen = null;

function handleDragStart(e) {
    draggedQueen = e.target;
}

function handleDragOver(e) {
    e.preventDefault();
}

function handleDropOnBoard(e) {
    e.preventDefault();

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const col = Math.floor(x / cellSize);
    const row = Math.floor(y / cellSize);

    if (col < boardSize && row < boardSize && isValidMove(row, col)) {
        placeQueenOnBoard(draggedQueen, row, col);
        moveHistory.push({ queen: draggedQueen, row, col });
        checkWinCondition();
    }
}

function placeQueenOnBoard(queen, row, col) {
    const index = parseInt(queen.dataset.queenIndex);
    queenPositions[index] = { row, col };

    if (queensContainer.contains(queen)) {
        queensContainer.removeChild(queen);
    }

    drawBoard();
}

function drawQueen(x, y) {
    ctx.beginPath();
    // ctx.arc(x, y, cellSize / 4, 0, 2 * Math.PI);
    // ctx.fillStyle = 'royalblue';
    ctx.fill();
    ctx.fillStyle = 'black';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = `${cellSize / 1}px Arial`;
    ctx.fillText('♛', x, y);
}

function isValidMove(row, col) {
    for (let pos of queenPositions) {
        if (pos && pos.row !== null && pos.col !== null) {
            const [r, c] = [pos.row, pos.col];
            if (r === row || c === col || Math.abs(r - row) === Math.abs(c - col)) {
                return false;
            }
        }
    }
    return true;
}

function checkWinCondition() {
    if (queenPositions.filter(pos => pos !== null && pos.row !== null).length === boardSize) {
        canvas.style.borderColor = 'green';
        
    } else {
        canvas.style.borderColor = '#333';
    }
}

function undoLastMove() {
    if (moveHistory.length > 0) {
        const lastMove = moveHistory.pop();
        const index = parseInt(lastMove.queen.dataset.queenIndex);

        queenPositions[index] = null;
        queensContainer.appendChild(lastMove.queen);
        drawBoard();
    }
}
