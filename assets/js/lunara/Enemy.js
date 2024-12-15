/***********/

/* IMPORTS */

/***********/
import { FloatingMessage } from '/assets/js/lunara/FloatingMessage.js';


/**********/

/* ENEMIS */

/**********/
export class Enemy {
  constructor(verticalPosition, game, enemyType) {
    this.game = game;
    this.enemyType = this.game.enemiesTypes[enemyType];
    this.x = this.game.width;
    this.y = verticalPosition;
    this.width = this.game.cellSize - this.game.cellGap * 2;
    this.height = this.game.cellSize - this.game.cellGap * 2;
    this.speed = 15;
    this.movement = this.speed;
    this.health = this.enemyType.health;
    this.maxHealth = this.health;
    this.image = this.enemyType.element;
    this.frameX = 0;
    this.frameY = 0;
    this.minFrame = 0;
    this.maxFrame = 8;
    this.spriteWidth = 235;
    this.spriteHeight = 235;
    this.slowed = false;
    this.inFire = false;
    this.slower = false;
    this.stoppers = [];
    this.power = this.enemyType.power;
    this.free = true;
  }

  start() {
    this.free = false;
  }

  update(deltaTime) {
    if (this.free) return;

    const defender = this.game.defenders.find(defender => {
      return this.game.checkCollision(this, defender);
    });

    if (defender) {
      defender.health -= this.power;
      this.addStopper(defender);

      if (defender.health <= 0) {
        defender.removeDefender();
      }
    }

    if (this.movement === 0) {
      this.x -= 0;
    } else {
      this.x -= this.movement * (deltaTime / 1000);
    }

    if (this.movement !== 0) {
      if (this.slowed) {
        this.movement = this.speed * 0.5;
      } else if (this.slower) {
        this.movement = this.speed * 0.75;
      } else {
        this.movement = this.speed;
      }
    }

    if (this.game.spriteUpdate) {
      if (this.frameX < this.maxFrame) this.frameX++;
      else this.frameX = this.minFrame;
    }

    if (this.x < 0) {
      this.game.handleGameOver();
    }

    if (this.health <= 0) {
      const gainedResources = this.maxHealth / 10;
      this.game.floatingMessages.push(new FloatingMessage('+' + gainedResources, this.x, this.y, this.smallSize, 'green', this.game));
      this.game.floatingMessages.push(new FloatingMessage('+' + gainedResources, this.game.textSpaceX + (370 * (this.game.width / 1350)), this.game.textSpaceY + this.game.largerSize - (20 * (this.game.width / 1350)), this.game.smallSize, 'white', this.game));
      this.game.playerResources += gainedResources;
      this.game.score += gainedResources;
      const enemyIndex = this.game.enemies.indexOf(this);
      this.game.enemies.splice(enemyIndex, 1);
    }
  }

  draw() {
    if (this.free) return;

    if (this.game.debug) {
      this.game.ctx.fillStyle = 'black';
      this.game.ctx.font = '20px Rubik Moonrocks';
      this.game.ctx.fillText(Math.floor(this.health), this.x + 15, this.y + 30);
    }
    if (this.slowed) {
      this.game.ctx.save();
      this.game.ctx.shadowBlur = 20;
      this.game.ctx.shadowColor = 'blue';
      this.game.ctx.drawImage(this.image, this.frameX * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
      this.game.ctx.restore();
    } else if (this.inFire) {
      this.game.ctx.save();
      this.game.ctx.shadowBlur = 20;
      this.game.ctx.shadowColor = 'orangered';
      this.game.ctx.drawImage(this.image, this.frameX * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
      this.game.ctx.restore();
    } else {
      this.game.ctx.drawImage(this.image, this.frameX * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
    }
  }

  addStopper(defender) {
    if (!this.stoppers.includes(defender)) {
      this.stoppers.push(defender);
      this.movement = 0; 
    }
  }

  removeStopper(defender) {
    const index = this.stoppers.indexOf(defender);
    if (index !== -1) this.stoppers.splice(index, 1);

    if (this.stoppers.length === 0) {
      this.movement = this.speed;
    }
  }
}