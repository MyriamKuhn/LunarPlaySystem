/***********/

/* IMPORTS */

/***********/
import { Game } from '/assets/js/aetheria/Game.js';


/******************/

/* INITIALISATION */

/******************/
window.addEventListener('load', function() {
  const canvas = document.getElementById('canvas1');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const game = new Game(canvas, ctx);

  let lastTime = 0;
  function animate(timestamp) {
    const deltaTime = timestamp - lastTime;  // Deltatime en millisecondes (temps écoulé depuis le dernier frame)
    lastTime = timestamp;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    game.render(deltaTime);
    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);
});