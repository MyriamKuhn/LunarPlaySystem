/**************/

/* PROJECTILE */

/**************/
export class Projectile {
  constructor(x, y, game, defender) {
    this.game = game;
    this.defender = defender;
    this.x = x;
    this.y = y;
    this.width = this.game.cellSize / this.game.projectilesTypes[this.defender].size;
    this.height = this.game.cellSize / this.game.projectilesTypes[this.defender].size;
    this.power = this.game.projectilesTypes[this.defender].power;
    this.speed = this.game.projectilesTypes[this.defender].speed;
    this.image = this.game.projectilesTypes[this.defender].element;
  }

  update(deltaTime) {
    this.x += this.speed / deltaTime * 1.5;
  }

  draw() {
    this.game.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    if (this.game.debug) {
      this.game.ctx.fillStyle = 'black';
      this.game.ctx.beginPath();
      this.game.ctx.arc(this.x, this.y, this.width, 0, Math.PI * 2);
      this.game.ctx.fill();
    }
  }
}