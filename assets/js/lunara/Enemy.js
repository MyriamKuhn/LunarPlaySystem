/**********/

/* ENEMIS */

/**********/
export class Enemy {
  constructor(verticalPosition, game) {
    this.game = game;
    this.x = this.game.width;
    this.y = verticalPosition;
    this.width = this.game.cellSize - this.game.cellGap * 2;
    this.height = this.game.cellSize - this.game.cellGap * 2;
    this.speed = Math.random() * 0.2 + 0.4;
    this.movement = this.speed;
    this.health = 100;
    this.maxHealth = this.health;
    this.enemyType = this.game.enemyTypes[Math.floor(Math.random() * this.game.enemyTypes.length)];
    this.frameX = 0;
    this.frameY = 0;
    this.minFrame = 0;
    this.maxFrame = 8;
    this.spriteWidth = 235;
    this.spriteHeight = 235;
  }

  update() {
    this.x -= this.movement;
    if (this.game.frame % 10 === 0) {
      if (this.frameX < this.maxFrame) this.frameX++;
      else this.frameX = this.minFrame;
    }
  }

  draw() {
    //this.game.ctx.fillStyle = 'red';
    //this.game.ctx.fillRect(this.x, this.y, this.width, this.height);
    this.game.ctx.fillStyle = 'black';
    this.game.ctx.font = '20px Orbitron';
    this.game.ctx.fillText(Math.floor(this.health), this.x + 15, this.y + 30);
    this.game.ctx.drawImage(this.enemyType, this.frameX * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
  }
}