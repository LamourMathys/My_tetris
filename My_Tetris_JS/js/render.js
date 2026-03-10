const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

const holdCanvas = document.getElementById('hold-canvas');
const holdCtx = holdCanvas.getContext('2d');

function drawCell(x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
  
  ctx.strokeStyle = '#333';
  ctx.strokeRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
}

function drawField() {
  for (let y = ROWS - VISIBLE_ROWS; y < ROWS; y++) {
    for (let x = 0; x < COLS; x++) {
      const cell = field[y][x];
      drawCell(x, y - (ROWS - VISIBLE_ROWS), cell ? cell : '#000'); 
    }
  }
}

function drawHold() {
  holdCtx.clearRect(0, 0, holdCanvas.width, holdCanvas.height);
  
  if (!holdPiece) return; 

  const offsetX = (4 - holdPiece.shape[0].length) / 2;
  const offsetY = (4 - holdPiece.shape.length) / 2;

  holdPiece.shape.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value) {
        holdCtx.fillStyle = holdPiece.color;
        holdCtx.fillRect((x + offsetX) * CELL_SIZE, (y + offsetY) * CELL_SIZE, CELL_SIZE, CELL_SIZE);
        
        holdCtx.strokeStyle = '#333';
        holdCtx.strokeRect((x + offsetX) * CELL_SIZE, (y + offsetY) * CELL_SIZE, CELL_SIZE, CELL_SIZE);
      }
    });
  });
} 

function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  drawField();

  piece.shape.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value) {
        drawCell(piece.x + x, piece.y + y - (ROWS - VISIBLE_ROWS), piece.color);
      }
    });
  });
  
  drawHold();
}
