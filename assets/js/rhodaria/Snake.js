/**********/
import { sendScore } from '/assets/js/utils.js';

/* PLAYER */

/**********/
export class Snake {
  constructor(game, x, y, speedX, speedY, color, name) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.speedX = speedX;
    this.speedY = speedY;
    this.color = color;
    this.width = this.game.cellSize;
    this.height = this.game.cellSize;
    this.moving = true;
    this.score = 0;
    this.lenght = 2;
    this.segments = [];
    this.readyToTurn = true;
    this.name = name;
  }

  update() {
    this.readyToTurn = true;
    //Collision check
    if (this.game.checkCollision(this, this.game.food)) {
      this.game.food.reset();
      this.score++;
      this.lenght++;
    }

    //Boundary check
    if (this.x <= 0 && this.speedX < 0 || 
        this.x >= this.game.columns - 1 && this.speedX > 0 || 
        this.y <= this.game.topMargin && this.speedY < 0 || 
        this.y >= this.game.rows -1 && this.speedY > 0) {
      this.moving = false;
    } 

    if (this.moving) {
      this.x += this.speedX;
      this.y += this.speedY;
      this.segments.unshift({x: this.x, y: this.y});
      if (this.segments.length > this.lenght) {
        this.segments.pop();
      }
    }

    //Win condition
    if (this.score >= this.game.winningScore) {
      this.game.gameUi.triggerGameOver();
    }
  }

  draw() {
    this.segments.forEach( (segment, index) => {
      if (index === 0) this.game.ctx.fillStyle = 'gold';
      else this.game.ctx.fillStyle = this.color;
      this.game.ctx.fillRect(segment.x * this.game.cellSize, segment.y * this.game.cellSize, this.width, this.height);
    });
  }

  turnUp() {
    if (this.speedY === 0 && this.y > this.game.topMargin && this.readyToTurn) {
      this.speedX = 0;
      this.speedY = -1;
      this.moving = true;
      this.readyToTurn = false;
    }
  }

  turnDown() {
    if (this.speedY === 0 && this.y < this.game.rows - 1 && this.readyToTurn) {
      this.speedX = 0;
      this.speedY = 1;
      this.moving = true;
      this.readyToTurn = false;
    }
  }

  turnLeft() {
    if (this.speedX === 0 && this.x > 0 && this.readyToTurn) {
      this.speedX = -1;
      this.speedY = 0;
      this.moving = true;
      this.readyToTurn = false;
    }
  }

  turnRight() {
    if (this.speedX === 0 && this.x < this.game.columns - 1 && this.readyToTurn) {
      this.speedX = 1;
      this.speedY = 0;
      this.moving = true;
      this.readyToTurn = false;
    }
  }
}