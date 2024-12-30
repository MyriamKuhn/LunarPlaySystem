/**********/

/* IMPORT */

/**********/
import { Explosion } from "/assets/js/ringuara/Explosion.js";


/**********/

/* BOMBES */

/**********/
export class Bomb {
  constructor(game, x, y) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.width = this.game.cellSize;
    this.height = this.game.cellSize;
    this.frameX = 0;
    this.frameY = 0;
    this.cooldown = 3000;
    this.free = true;
    this.exploding = false;
    this.explosion = null;
  }

  draw() {
    if (!this.free) {
      if (this.game.debug) {
        this.game.context.fillStyle = 'yellow';
        this.game.context.fillRect(this.x, this.y, this.width, this.height);
      } else {
        this.game.context.drawImage(this.game.bombImage, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height);
      }
    }
  }

  start() {
    this.free = false;
    setTimeout(() => {
      this.explode();
    }, this.cooldown);
  }

  reset() {
    this.cooldown = 3000;
    const index = this.game.explosions.indexOf(this.explosion);
    if (index !== -1) {
      this.game.explosions.splice(index, 1);
    }
    this.explosion = null;
    this.free = true;
  }

  explode() {
    this.explosion = new Explosion (this.game, this.x, this.y, 5);
    this.game.explosions.push(this.explosion);
  }

  update() {
    if (!this.free) {
      if (this.explosion && this.explosion.isActive) this.explosion.draw();
      if (this.explosion && !this.explosion.isActive) this.reset();
    }
  }
}