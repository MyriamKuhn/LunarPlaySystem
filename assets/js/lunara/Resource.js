/************/

/* RESOURCE */

/************/
export class Resource {
  constructor (game) {
    this.game = game;
    this.x = Math.random() * this.game.width - this.game.cellSize;
    this.y = (Math.floor(Math.random() * 5) + 1) * this.game.cellSize + 25;
    this.width = this.game.cellSize * 0.6;
    this.height = this.game.cellSize * 0.6;
    this.amount = this.game.amounts[Math.floor(Math.random() * this.game.amounts.length)];
  }

  draw() {
    this.game.ctx.fillStyle = 'yellow';
    this.game.ctx.fillRect(this.x, this.y, this.width, this.height);
    this.game.ctx.fillStyle = 'black';
    this.game.ctx.font = '20px Orbitron';
    this.game.ctx.fillText(this.amount, this.x + 15, this.y + 25);
  }

  
}