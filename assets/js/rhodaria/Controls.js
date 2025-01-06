/***********/

/* IMPORTS */

/***********/
import { Snake } from '/assets/js/rhodaria/Snake.js';


/**********************/

/* GESTION DU CLAVIER */

/**********************/
export class Keyboard1 extends Snake {
  constructor(game, x, y, speedX, speedY, color, name) {
    super(game, x, y, speedX, speedY, color, name);
    
    window.addEventListener('keydown', e => {
      if (e.key === 'ArrowUp') this.turnUp();
      else if (e.key === 'ArrowDown') this.turnDown();
      else if (e.key === 'ArrowLeft') this.turnLeft();
      else if (e.key === 'ArrowRight') this.turnRight();
    });
  }
}

export class Keyboard2 extends Snake {
  constructor(game, x, y, speedX, speedY, color, name) {
    super(game, x, y, speedX, speedY, color, name);
    
    window.addEventListener('keydown', e => {
      if (e.key.toLowerCase() === 'z') this.turnUp();
      else if (e.key.toLowerCase() === 's') this.turnDown();
      else if (e.key.toLowerCase() === 'q') this.turnLeft();
      else if (e.key.toLowerCase() === 'd') this.turnRight();
    });
  }
}

export class ComputerAi extends Snake {
  constructor(game, x, y, speedX, speedY, color, name) {
    super(game, x, y, speedX, speedY, color, name);
    this.turnTimer = 0;
    this.turnInterval;
  }

  update() {
    super.update();
    if (this.turnTimer < this.turnInterval) {
      this.turnTimer++;
    } else {
      this.turnTimer = 0;
      this.turn();
      this.turnInterval = Math.floor(Math.random() * 8) + 1;
    }
  }

  turn() {
    if (this.speedY === 0) {
      Math.random() < 0.5 ? this.turnUp() : this.turnDown();
    } else if (this.speedX === 0) {
      Math.random() < 0.5 ? this.turnLeft() : this.turnRight();
    }
  }
}