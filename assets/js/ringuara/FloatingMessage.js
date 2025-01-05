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
      this.y -= 0.6;
      this.lifeSpan += 2;
      if (this.opacity > 0.03) this.opacity -= 0.03
    }
  }

  draw() {
    this.game.context.save();
    this.game.context.globalAlpha = this.opacity;
    this.game.context.fillStyle = this.color;
    this.game.context.fontweight = 'bold';
    this.game.context.font = this.size + 'px Atma';
    this.game.context.fillText(this.value, this.x, this.y);
    this.game.context.restore();
  }
  
}