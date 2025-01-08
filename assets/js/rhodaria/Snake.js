/**********/
import { sendScore } from '/assets/js/utils.js';

/* PLAYER */

/**********/
export class Snake {
  constructor(game, x, y, speedX, speedY, color, name, image) {
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
    this.lenght = 3;
    this.segments = [];
    for (let i = 0; i < this.lenght; i++) {
      if (i > 0) {
        this.x += this.speedX;
        this.y += this.speedY;
      }
      this.segments.unshift({x: this.x, y: this.y, frameX: 5, frameY: 0});
    }
    this.readyToTurn = true;
    this.name = name;
    this.image = image;
    this.spriteWidth = 200;
    this.spriteHeight = 200;
  }

  update() {
    this.readyToTurn = true;
    //Collision check
    if (this.game.checkCollision(this, this.game.food)) {
      let color;
      if (this.game.food.frameY === 1) { //not edible
        this.score--;
        color = 'black';
        if (this.lenght > 2) {
          this.lenght--;
          if (this.segments.length > this.lenght) {
            this.segments.pop();
          }
        }
      } else { //regular food
        this.score++;
        this.lenght++;
        color = 'gold';
      }
      for (let i = 0; i < 5; i++) {
        const particle = this.game.getParticle();
        if (particle) {
          particle.start(this.game.food.x * this.game.cellSize + this.game.cellSize * 0.5, this.game.food.y * this.game.cellSize + this.game.cellSize * 0.5, color);
        }
      }
      this.game.food.reset();
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
      this.segments.unshift({x: this.x, y: this.y, frameX: 0, frameY: 0});
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
      if (this.game.debug) {
        if (index === 0) this.game.ctx.fillStyle = 'gold';
        else this.game.ctx.fillStyle = this.color;
        this.game.ctx.fillRect(segment.x * this.game.cellSize, segment.y * this.game.cellSize, this.width, this.height);
      }
      this.setSpriteFrame(index);
      this.game.ctx.drawImage(this.image, segment.frameX * this.spriteWidth, segment.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight, segment.x * this.game.cellSize, segment.y * this.game.cellSize, this.width, this.height);
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

  setSpriteFrame(index) {
    const segment = this.segments[index];
    const prevSegment = this.segments[index - 1] || 0;
    const nextSegment = this.segments[index + 1] || 0;

    //head
    if (index === 0) {
      if (segment.y < nextSegment.y) { //up
        if (this.game.food.y === segment.y - 1 && this.game.food.x === segment.x) {
          segment.frameX = 7;
          segment.frameY = 1;
        } else {
          segment.frameX = 1;
          segment.frameY = 2;
        }
      } else if (segment.y > nextSegment.y) { //down
        if (this.game.food.y === segment.y + 1 && this.game.food.x === segment.x) {
          segment.frameX = 7;
          segment.frameY = 3;
        } else {
          segment.frameX = 0;
          segment.frameY = 4;
        }
      } else if (segment.x < nextSegment.x) { //left
        if (this.game.food.x === segment.x - 1 && this.game.food.y === segment.y) {
          segment.frameX = 2;
          segment.frameY = 4;
        } else {
          segment.frameX = 4;
          segment.frameY = 2;
        }
      } else if (segment.x > nextSegment.x) { //right
        if (this.game.food.x === segment.x + 1 && this.game.food.y === segment.y) {
          segment.frameX = 4;
          segment.frameY = 4;
        } else {
          segment.frameX = 6;
          segment.frameY = 3;
        }
      }
    //tail
    } else if (index === this.segments.length - 1) {
      if (prevSegment.y < segment.y) { //up
        segment.frameX = 1;
        segment.frameY = 4;
      } else if (prevSegment.y > segment.y) { //down
        segment.frameX = 0;
        segment.frameY = 2;
      } else if (prevSegment.x < segment.x) { //left
        segment.frameX = 2;
        segment.frameY = 0;
      } else if (prevSegment.x > segment.x) { //right
        segment.frameX = 0;
        segment.frameY = 1;
      }
    //body
    } else {
      if (nextSegment.x < segment.x && prevSegment.x > segment.x) { //horizontal to right
        segment.frameX = 5;
        segment.frameY = 3;
      } else if (nextSegment.x > segment.x && prevSegment.x < segment.x) { //horizontal to left
        segment.frameX = 5;
        segment.frameY = 2;
      } else if (nextSegment.y > segment.y && prevSegment.y < segment.y) { //vertical to up
        segment.frameX = 1;
        segment.frameY = 3;
      } else if (nextSegment.y < segment.y && prevSegment.y > segment.y) { //vertical to down
        segment.frameX = 0;
        segment.frameY = 3;
      //corners counter clockwise
      } else if (nextSegment.y > segment.y && prevSegment.x < segment.x) { //up to left
        segment.frameX = 4;
        segment.frameY = 0;
      } else if (nextSegment.x > segment.x && prevSegment.y > segment.y) { //left to down
        segment.frameX = 3;
        segment.frameY = 0;
      } else if (nextSegment.y < segment.y && prevSegment.x > segment.x) { //down to right
        segment.frameX = 3;
        segment.frameY = 1;
      } else if (nextSegment.x < segment.x && prevSegment.y < segment.y) { //right to up
        segment.frameX = 4;
        segment.frameY = 1;
      //corners clockwise
      } else if (nextSegment.x < segment.x && prevSegment.y > segment.y) { //right to down
        segment.frameX = 3;
        segment.frameY = 2;
      } else if (nextSegment.y < segment.y && prevSegment.x < segment.x) { //down to left
        segment.frameX = 3;
        segment.frameY = 3;
      } else if (nextSegment.x > segment.x && prevSegment.y < segment.y) { //left to up
        segment.frameX = 2;
        segment.frameY = 3;
      } else if (nextSegment.y > segment.y && prevSegment.x > segment.x) { //up to right
        segment.frameX = 2;
        segment.frameY = 2;
      } else {
        segment.frameX = 6;
        segment.frameY = 0;
      }
    }
  }
}