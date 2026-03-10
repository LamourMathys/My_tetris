const COLS = 10;
const ROWS = 40;
const VISIBLE_ROWS = 20;
const CELL_SIZE = 24;

const field = Array.from({ length: ROWS }, () => Array(COLS).fill(null));

function createPiece() {
  const pieces = [
    { shape: [[1,1],[1,1]], color: 'yellow' },       // O piece
    { shape: [[0,1,0],[1,1,1]], color: 'purple' },   // T piece
    { shape: [[1,1,0],[0,1,1]], color: 'green' },    // S piece
    { shape: [[0,1,1],[1,1,0]], color: 'red' },      // Z piece
    { shape: [[1,0,0],[1,1,1]], color: 'blue' },     // J piece
    { shape: [[0,0,1],[1,1,1]], color: 'orange' },   // L piece
    { shape: [[1,1,1,1]], color: 'cyan' },           // I piece
   
    /* huge Creeper easter egg 
    { shape: [[1,1,0,0,1,1],
              [1,1,0,0,1,1],
              [0,0,1,1,0,0],
              [0,1,1,1,1,0],
              [0,1,1,1,1,0],
              [0,1,0,0,1,0]], color: 'black' }, */
  ];       
  
  const index = Math.floor(Math.random() * pieces.length);
  const p = pieces[index];
  
  return {
    x: 3, 
    y: ROWS - VISIBLE_ROWS - p.shape.length,
    shape: p.shape,
    color: p.color,
  };
}

let piece = createPiece();
let holdPiece = null;
let holdUsed = false; 
let score = 0;

function Collision(dx = 0, dy = 0, testShape = piece.shape) {
    for (let y = 0; y < testShape.length; y++) {
      for (let x = 0; x < testShape[y].length; x++) {
        if (testShape[y][x] === 0) continue;
  
        const nx = piece.x + x + dx;
        const ny = piece.y + y + dy;
  
        if (nx < 0 || nx >= COLS) return true;
  
        if (ny >= ROWS) return true;
  
        if (ny >= 0 && field[ny][nx] !== null) return true;
      }
    }
    return false;
  }
  
function lockPiece() {
  piece.shape.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value) field[piece.y + y][piece.x + x] = piece.color;
    });
  });
}

function rotateMatrix(matrix) {
  const rotated = [];
  const size = matrix.length;

  for (let i = 0; i < matrix[0].length; i++) {
    rotated.push([]);
  }

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
      rotated[x].unshift(matrix[y][x]);
    }
  }
  
  return rotated;
}

function rotatePiece() {
  const rotated = rotateMatrix(piece.shape);
  if (!Collision(0, 0, rotated)) {
    piece.shape = rotated;
  }
}

function Cline() {
  for (let y = ROWS - 1; y >= 0; y--) {
    if (!field[y].includes(null)) {
      field.splice(y, 1);
      field.unshift(new Array(COLS).fill(null)); 
      y++; 
      
      score += 10;
      document.getElementById('score').innerText = score;
    }
  }
} 

function holdCurrentPiece() {
  if (holdUsed){
    return;
  } 
  
  if (holdPiece === null) {
    holdPiece = piece;
    piece = createPiece(); 
  } else {
    const temp = piece;
    piece = holdPiece;
    holdPiece = temp;
  }
  
  piece.x = 3;
  piece.y = ROWS - VISIBLE_ROWS - piece.shape.length;
  holdUsed = true;
}

