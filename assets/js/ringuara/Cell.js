/************/

/* CELLULES */

/************/
export class Cell {
  constructor(x, y, game, mapData) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.width = this.game.cellSize;
    this.height = this.game.cellSize;
    this.dotSize = this.game.cellSize;

    switch (mapData) {
      case 0:
        this.type = 'empty';
        break;
      case 1:
        this.type = 'wall';
        break;
      case 2:
        this.type = 'start';
        break;
      case 3:
        this.type = 'dot';
        break;
      default:
        this.type = 'empty';
        break;
    }

    this.isDotEaten = false;
  }

  draw() {
    if (this.game.debug) {
      if (this.type === 'wall') {
        this.game.context.strokeStyle = 'rgba(255, 0, 0, 0.64)';
        this.game.context.strokeRect(this.x, this.y, this.width, this.height);
      }
    }
    if (this.type === 'dot' && !this.isDotEaten) {
      this.game.context.drawImage(this.game.dotImage, this.x, this.y, this.dotSize, this.dotSize);
    }
  }

  update() {
    if (this.type === 'dot') {
      if (this.game.checkCollision(this.game.player, this)) {
        this.isDotEaten = true;
      }
    }
  }

}