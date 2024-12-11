/************/

/* CELLULES */

/************/
export class Cell {
  constructor(x, y, game) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.width = this.game.cellSize;
    this.height = this.game.cellSize;
  }

  draw() {
    if (this.game.mouse.x && this.game.mouse.y && this.game.collision(this, this.game.mouse)) {
      this.game.ctx.strokeStyle = 'black';
      this.game.ctx.strokeRect(this.x, this.y, this.width, this.height);
    }
  }

}