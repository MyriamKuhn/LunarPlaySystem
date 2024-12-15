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
    this.speed = Math.random() * 0.4 + 0.6;
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
    this.slowed = false;
    this.inFire = false;
    this.slower = false;
  }

  update(deltaTime) {
    if (this.slowed) this.movement = this.speed * 0.5;
    else if (this.slower) this.movement = this.speed * 0.75;
    else this.movement = this.speed;

    this.x -= this.movement / deltaTime * 1.5;

    if (this.game.spriteUpdate) {
      if (this.frameX < this.maxFrame) this.frameX++;
      else this.frameX = this.minFrame;
    }
  }

  draw() {
    if (this.game.debug) {
      this.game.ctx.fillStyle = 'black';
      this.game.ctx.font = '20px Rubik Moonrocks';
      this.game.ctx.fillText(Math.floor(this.health), this.x + 15, this.y + 30);
    }
    if (this.slowed) {
      this.game.ctx.save();
      this.game.ctx.shadowBlur = 20;
      this.game.ctx.shadowColor = 'blue';
      this.game.ctx.drawImage(this.enemyType, this.frameX * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
      this.game.ctx.restore();
    } else if (this.inFire) {
      this.game.ctx.save();
      this.game.ctx.shadowBlur = 20;
      this.game.ctx.shadowColor = 'orangered';
      this.game.ctx.drawImage(this.enemyType, this.frameX * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
      this.game.ctx.restore();
    } else {
      this.game.ctx.drawImage(this.enemyType, this.frameX * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
    }
  }
}