let lastButtons = [];

function checkGamepad() {
  const gp = navigator.getGamepads()[0];
  if (gp) {
    const touches = {
      14: 'ArrowLeft',
      15: 'ArrowRight',
      13: 'ArrowDown',
      12: 'ArrowUp',
      4: 'r',        
      5: 'h',        
      0: ' ',        
      3: 't',        
      9: 'p'         
    };

    for (let btn in touches) {
      if (gp.buttons[btn] && gp.buttons[btn].pressed && !lastButtons[btn]) {
        document.dispatchEvent(new KeyboardEvent('keydown', { key: touches[btn] }));
      }
    }
    lastButtons = gp.buttons.map(b => b.pressed);
  }
  requestAnimationFrame(checkGamepad);
}

window.addEventListener("gamepadconnected", () => {
  checkGamepad();
});