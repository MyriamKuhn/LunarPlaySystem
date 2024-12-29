/**********/

/* MUR */

/**********/
export class Wall {
  constructor(x, y, game) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.width = this.game.cellSize;
    this.height = this.game.cellSize;
  }

  draw() {
    this.game.context.strokeStyle = 'rgba(255, 0, 0, 0.64)';
    this.game.context.strokeRect(this.x, this.y, this.width, this.height);
  }
}