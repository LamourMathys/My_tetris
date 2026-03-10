window.dropInterval = 400; 

let lastTime = 0;
let dropCounter = 0;

function updatePiece() {
  if (!Collision(0, 1)) {
    piece.y += 1;
  } else {
    lockPiece();
    piece = createPiece();
    holdUsed = false;
    
    if (Collision(0, 0)) {
      alert('Game Over! \n LOOSER');
      
      if (window.bgMusic) {
        window.bgMusic.pause();
        window.bgMusic.currentTime = 0;
      }

      window.bgMusic = new Audio('resource/theme.mp3');
      window.bgMusic.loop = true;
      window.bgMusic.volume = 0.5;
      
      for(let y = 0; y < ROWS; y++) field[y].fill(null);
      
      score = 0;
      document.getElementById('score').innerText = score;
      holdPiece = null;
      
    
      window.dropInterval = 400; 
      
      window.isPlaying = false;
      window.isJojoMode = false;
      window.isTimeStopped = false;
      window.canUseTheWorld = true;

      document.getElementById('start-btn').disabled = false;
      document.getElementById('start-btn').innerText = "RETRY";
      
      document.getElementById('pause-btn').disabled = true;
      document.getElementById('pause-btn').innerText = "PAUSE";
      
      document.body.classList.remove('jojo-mode');
      document.body.classList.remove('za-warudo');
      
      return true; 
    }
  }
  return false;
}

let index = 1

function gameLoop(time = 0) {
  if (!window.isPlaying || window.isPaused){
     return;
  }

  if (!lastTime) lastTime = time;
  const delta = time - lastTime;
  lastTime = time;


  if (!window.isTimeStopped) {
    dropCounter += delta;
    
    while (dropCounter > window.dropInterval) {
      const isGameOver = updatePiece();
      if (isGameOver) {
        lastTime = 0; 
        render(); 
        return; 
      }
      if(score >= 300 && index == 1 ){
        alert('use the secret code jojo to go in hard mod')
        index = index - 1
        togglePause() 
      }
        
      
      Cline();
      dropCounter -= window.dropInterval;
    }
  }
   
  render();
  requestAnimationFrame(gameLoop);
}