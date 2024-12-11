/***********/

/* IMPORTS */

/***********/
import { Projectile } from '/assets/js/lunara/Projectile.js';


/**************/

/* DEFENDEURS */

/**************/
export class Defender {
  constructor(x, y, game) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.width = this.game.cellSize - this.game.cellGap * 2;
    this.height = this.game.cellSize - this.game.cellGap * 2;
    this.shooting = false;
    this.shootNow = false;
    this.health = 100;
    this.projectiles = [];
    this.timer = 0;
    this.frameX = 6;
    this.frameY = 0;
    this.spriteWidth = 225;
    this.spriteHeight = 225;
    this.minFrame = 6;
    this.maxFrame = 7;
    this.updateFrame = 50;
  }

  draw() {
    //this.game.ctx.fillStyle = 'blue';
    //this.game.ctx.fillRect(this.x, this.y, this.width, this.height);
    this.game.ctx.fillStyle = 'gold';
    this.game.ctx.font = '20px Orbitron';
    this.game.ctx.fillText(Math.floor(this.health), this.x + 15, this.y + 30);
    this.game.ctx.drawImage(this.game.defender1, this.frameX * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
  }

  update() {
    if (this.shooting) {
      this.minFrame = 0;
      this.maxFrame = 5;
      this.updateFrame = 20;
    } else {
      this.minFrame = 6;
      this.maxFrame = 7;
      this.updateFrame = 50;
    }

    if (this.game.frame % this.updateFrame === 0) {
      if (this.frameX < this.maxFrame) this.frameX++;
      else this.frameX = this.minFrame;
      if (this.frameX === 5) this.shootNow = true;
    }

    if (this.shooting && this.shootNow) {
        this.game.projectiles.push(new Projectile(this.x + 70, this.y + 50, this.game));
        this.shootNow = false;
    }
  }
}