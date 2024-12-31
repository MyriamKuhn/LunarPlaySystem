/**********/
import { validateJSONStructure } from './../utils';

/* BONUS */

/**********/
export class Bonus {
  constructor(game, type) {
    this.game = game;
    this.type = type;
    this.image = this.type.image;
    this.type = this.type.type;
    this.value = this.type.value;
    this.duration = this.type.duration;
    this.position;
    this.originSize = 32;
    this.width = this.game.cellSize;
    this.height = this.game.cellSize;
    this.x;
    this.y;
  }

  draw() {
    if (this.game.debug) {
      this.game.context.fillStyle = 'orange';
      this.game.context.fillRect(this.x, this.y, this.width, this.height);
    } else {
      this.game.context.drawImage(this.image, 0, 0, this.originSize, this.originSize, this.x, this.y, this.width, this.height);
    }
  }
}
