/***********/

/* IMPORTS */

/***********/
import { Snake } from '/assets/js/rhodaria/Snake.js';


/**********************/

/* GESTION DU CLAVIER */

/**********************/
export class Keyboard1 extends Snake {
  constructor(game, x, y, speedX, speedY, color, name, image) {
    super(game, x, y, speedX, speedY, color, name, image);
    
    window.addEventListener('keydown', e => {
      if (e.key === 'ArrowUp') this.turnUp();
      else if (e.key === 'ArrowDown') this.turnDown();
      else if (e.key === 'ArrowLeft') this.turnLeft();
      else if (e.key === 'ArrowRight') this.turnRight();
    });
  }
}

export class Keyboard2 extends Snake {
  constructor(game, x, y, speedX, speedY, color, name, image) {
    super(game, x, y, speedX, speedY, color, name, image);
    
    window.addEventListener('keydown', e => {
      if (e.key.toLowerCase() === 'z') this.turnUp();
      else if (e.key.toLowerCase() === 's') this.turnDown();
      else if (e.key.toLowerCase() === 'q') this.turnLeft();
      else if (e.key.toLowerCase() === 'd') this.turnRight();
    });
  }
}

export class ComputerAi extends Snake {
  constructor(game, x, y, speedX, speedY, color, name, image) {
    super(game, x, y, speedX, speedY, color, name, image);
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
      this.turnInterval = Math.floor(Math.random() * 15) + 1; // greater number = slower turn = easier
    }
  }

  turn() {
    //don't turn if moving towards food
    const food = this.game.food;
    if (food.x === this.x && food.y < this.y && this.speedY < 0) return;
    else if (food.x === this.x && food.y > this.y && this.speedY > 0) return;
    else if (food.y === this.y && food.x < this.x && this.speedX < 0) return;
    else if (food.y === this.y && food.x > this.x && this.speedX > 0) return;

    if (food.x < this.x && this.speedX === 0) {
      this.turnLeft();
    } else if (food.x > this.x && this.speedX === 0) {
      this.turnRight();
    } else if (food.y < this.y && this.speedY === 0) {
      this.turnUp();
    } else if (food.y > this.y && this.speedY === 0) {
      this.turnDown();
    } else {
      if (this.speedY === 0) Math.random() < 0.5 ? this.turnUp() : this.turnDown();
      else if (this.speedX === 0) Math.random() < 0.5 ? this.turnLeft() : this.turnRight();
    }
  }
}