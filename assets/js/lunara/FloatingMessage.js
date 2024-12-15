/********************/

/* FLOATING MESSAGE */

/********************/
export class FloatingMessage {
  constructor(value, x, y, size, color, game) {
    this.game = game;
    this.value = value;
    this.x = x;
    this.y = y;
    this.size = size;
    this.lifeSpan = 0;
    this.color = color;
    this.opacity = 1;
  }

  update() {
    if (this.game.eventUpdate) {
      this.y -= 0.3;
      this.lifeSpan += 1;
      if (this.opacity > 0.03) this.opacity -= 0.03
    }
  }

  draw() {
    this.game.ctx.save();
    this.game.ctx.globalAlpha = this.opacity;
    this.game.ctx.fillStyle = this.color;
    this.game.ctx.font = this.size + 'px Rubik Moonrocks';
    this.game.ctx.fillText(this.value, this.x, this.y);
    this.game.ctx.restore();
  }
  
}