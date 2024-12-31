/**************/

/* EXPLOSIONS */

/**************/
export class Explosion {
  constructor(game, x, y, radius) {
    this.game = game;
    this.image = document.getElementById('explosion');
    this.x = x;
    this.y = y;
    this.width = this.game.cellSize;
    this.height = this.game.cellSize;
    this.explosionRadius = radius;
    this.explosionWidth = (this.game.cellSize * this.explosionRadius) * 2 + this.game.cellSize;
    this.explosionHeightBig = this.game.cellSize * 0.3;
    this.explosionHeightSmall = this.game.cellSize * 0.1;
    this.offsetX = this.explosionWidth / 2 - this.game.cellSize / 2;
    this.offsetYBig = (this.height - this.explosionHeightBig) / 2;
    this.offsetYSmall = (this.height - this.explosionHeightSmall) / 2;

    this.isActive = true;
    setTimeout(() => {
      this.isActive = false;
    }, 1000);
  }

  draw() {
    if (this.isActive) {
      if (this.game.debug) {
        this.game.context.fillStyle = 'gold';
        this.game.context.fillRect(this.x - this.offsetX, this.y + this.offsetYBig, this.explosionWidth, this.explosionHeightBig);
        this.game.context.fillRect(this.x + this.offsetYBig, this.y - this.offsetX, this.explosionHeightBig, this.explosionWidth);
        this.game.context.fillStyle = 'white';
        this.game.context.fillRect(this.x - this.offsetX, this.y + this.offsetYSmall, this.explosionWidth, this.explosionHeightSmall);
        this.game.context.fillRect(this.x + this.offsetYSmall, this.y - this.offsetX, this.explosionHeightSmall, this.explosionWidth);
      } else {
        this.game.context.drawImage(this.image, 0, 0, 352, 352, this.x - this.offsetX, this.y - this.offsetX, this.explosionWidth, this.explosionWidth);
      }
    } 
  }
}