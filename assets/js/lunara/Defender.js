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
    this.projectiles = [];
    this.timer = 0;
    this.frameX = 0;
    this.frameY = 0;
    this.spriteWidth = 225;
    this.spriteHeight = 225; 
    this.minFrame;
    this.maxFrame;
    this.chosenDefender = this.game.chosenDefender;
    this.image = this.game.defendersTypes[this.chosenDefender].element;
    this.health = this.game.defendersTypes[this.chosenDefender].health;
  }

  draw() {
    if (this.game.debug) {
      this.game.ctx.fillStyle = 'gold';
      this.game.ctx.font = '20px Rubik Moonrocks';
      this.game.ctx.fillText(Math.floor(this.health), this.x + 15, this.y + 30);
    }
    this.game.ctx.drawImage(this.image, this.frameX * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
  }

  update() {
    if (this.chosenDefender === 0) {
      this.minFrame = 0;
      this.maxFrame = 14;
    } else if (this.chosenDefender === 3) {
      this.minFrame = 0;
      this.maxFrame = 0;
    } else {
      if (this.shooting) {
        this.minFrame = 8;
        this.maxFrame = 14;
      } else {
        this.minFrame = 0;
        this.maxFrame = 7;
      }
    }

    if (this.chosenDefender === 0) {
      if (this.game.spriteUpdate) {
        if (this.frameX < this.maxFrame) this.frameX++;
        if (this.frameX === this.maxFrame) {
          const resource = this.game.getResource(); 
          if (resource) resource.start();
          this.health -= 50;
          this.frameX = this.minFrame;
        }
      }
    } else if (this.chosenDefender === 3) {
      return;
    } else {
      if (this.game.spriteUpdate) {
        if (this.frameX < this.maxFrame) this.frameX++;
        else this.frameX = this.minFrame;
        
        if (this.frameX === 11) this.shootNow = true;
      }

      if (this.shooting && this.shootNow) {
        this.game.projectiles.push(new Projectile(this.x + (80 * this.game.width / 1350), this.y + (60 * this.game.width / 1350), this.game, this.chosenDefender));
        if (this.chosenDefender === 4) {
          setTimeout(() => {
            this.game.projectiles.push(new Projectile(this.x + (80 * this.game.width / 1350), this.y + (30 * this.game.width / 1350), this.game, this.chosenDefender));
          }, 500);
        }
        this.shootNow = false;
        
      }
    }
  }
}