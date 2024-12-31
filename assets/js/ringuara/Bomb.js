/**********/

/* IMPORT */

/**********/
import { Explosion } from "/assets/js/ringuara/Explosion.js";


/**********/

/* BOMBES */

/**********/
export class Bomb {
  constructor(game, x, y, image, cooldown, radius) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.width = this.game.cellSize;
    this.height = this.game.cellSize;
    this.image = image;
    this.originSize = 32;
    this.cooldown = cooldown;
    this.radius = radius;
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
        this.game.context.drawImage(this.image, 0, 0, this.originSize, this.originSize, this.x, this.y, this.width, this.height);
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
    this.explosion = new Explosion (this.game, this.x, this.y, this.radius);
    this.game.explosions.push(this.explosion);
  }

  update() {
    if (!this.free) {
      if (this.explosion && this.explosion.isActive) this.explosion.draw();
      if (this.explosion && !this.explosion.isActive) this.reset();
    }
  }
}