/**************/

/* PROJECTILE */

/**************/
export class Projectile {
  constructor(x, y, game) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.width = this.game.cellSize / 10;
    this.height = this.game.cellSize / 10;
    this.power = 20;
    this.speed = 5;
  }

  update() {
    this.x += this.speed;
  }

  draw() {
    this.game.ctx.fillStyle = 'black';
    this.game.ctx.beginPath();
    this.game.ctx.arc(this.x, this.y, this.width, 0, Math.PI * 2);
    this.game.ctx.fill();
  }
}