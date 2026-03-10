window.isPlaying = false; 
window.isPaused = false; 

window.bgMusic = new Audio('resource/theme.mp3');
window.bgMusic.loop = true;  
window.bgMusic.volume = 0.5; 

const startBtn = document.getElementById('start-btn');
const pauseBtn = document.getElementById('pause-btn');
const pauseMenu = document.getElementById('pause-menu');
const resumeBtn = document.getElementById('resume-btn');
const gameCanvas = document.getElementById('game');

function togglePause() {
  if (!window.isPlaying){
    return; 
  } 

  window.isPaused = !window.isPaused;

  if (window.isPaused) {
    pauseMenu.classList.remove('hidden');
    gameCanvas.classList.add('blurred');
    pauseBtn.innerText = "RESUME";
    
    window.bgMusic.pause(); 
  } else {
   
    pauseMenu.classList.add('hidden');
    gameCanvas.classList.remove('blurred');
    pauseBtn.innerText = "PAUSE";
    
  
    window.bgMusic.play(); 
    
    lastTime = 0; 
    requestAnimationFrame(gameLoop); 
  }
}

startBtn.addEventListener('click', () => {
  if (!window.isPlaying) {
    window.isPlaying = true;
    window.isPaused = false;
    
    startBtn.disabled = true;
    pauseBtn.disabled = false; 
    startBtn.innerText = "PLAYING...";
  
    window.bgMusic.currentTime = 0; 
    window.bgMusic.play();
    
    lastTime = 0;
    gameLoop(); 
  }
});

pauseBtn.addEventListener('click', togglePause);
resumeBtn.addEventListener('click', togglePause);

document.addEventListener('keydown', (e) => {
  if (!window.isPlaying){
    return; 
  } 

  if (e.key === 'p' || e.key === 'P' || e.key === 'Escape') {
    togglePause();
    return;
  }

  if (window.isPaused){
    return;
  }  

  if (e.key === 'ArrowLeft' && !Collision(-1, 0)) piece.x -= 1;
  if (e.key === 'ArrowRight' && !Collision(1, 0)) piece.x += 1;
  
  if (e.key === 'ArrowDown' && !Collision(0, 1)) {
    piece.y += 1;
    dropCounter = 0;  
  }
  
  if (e.key === ' ') {
    while (!Collision(0, 1)) piece.y += 1;
    lockPiece();
    piece = createPiece();
    holdUsed = false;
    dropCounter = 0;
  }
      
  if (e.key === 'r' || e.key === 'ArrowUp'|| e.key === 'R') rotatePiece();
  if (e.key === 'h' || e.key === 'H') holdCurrentPiece();
});

