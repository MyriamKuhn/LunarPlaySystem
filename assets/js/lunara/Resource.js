/***********/

/* IMPORTS */

/***********/
import { FloatingMessage } from '/assets/js/lunara/FloatingMessage.js';


/************/

/* RESOURCE */

/************/
export class Resource {
  constructor (game, element, power) {
    this.game = game;
    this.x = this.game.cellSize + Math.random() * (this.game.width - this.game.cellSize * 2);
    this.y = (Math.floor(Math.random() * 5) + 1) * this.game.cellSize + 25;
    this.width = this.game.cellSize * 0.6;
    this.height = this.game.cellSize * 0.6;
    this.amount = power;
    this.frameX = 0;
    this.frameY = 0;
    this.minFrame = 0;
    this.maxFrame = 8;
    this.spriteWidth = 150;
    this.spriteHeight = 150;
    this.image = element;
    this.free = true;
  }

  start() {
    this.free = false;
  }

  reset() {
    this.free = true;
  }

  hit() {
    if (!this.free) {
      if (this.game.checkCollision(this, this.game.mouse) && this.game.mouse.clicked) {
        this.game.playerResources += this.amount;
        this.game.floatingMessages.push(new FloatingMessage('+' + this.amount, this.x, this.y, this.game.smallSize, 'green', this.game));
        this.game.floatingMessages.push(new FloatingMessage('+' + this.amount, this.game.textSpaceX + (370 * (this.game.width / 1350)), this.game.textSpaceY + this.game.largerSize - (20 * (this.game.width / 1350)), this.game.smallSize, 'white', this.game));
        this.game.sound.play('resource');
        this.reset();
      }
    }
  }

  draw() {
    if (!this.free) {
      this.game.ctx.drawImage(this.image, this.frameX * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
      if (this.game.debug) {
        this.game.ctx.fillStyle = 'yellow';
        this.game.ctx.fillRect(this.x, this.y, this.width, this.height);
        this.game.ctx.fillStyle = 'black';
        this.game.ctx.font = '20px Rubik Moonrocks';
        this.game.ctx.fillText(this.amount, this.x + 15, this.y + 25);
      }
    }
  }

  update() {
    if (!this.free) {
      if (this.game.spriteUpdate) {
        if (this.frameX < this.maxFrame) this.frameX++;
        else this.frameX = this.minFrame;
      }
      this.hit();
    }
  }
}