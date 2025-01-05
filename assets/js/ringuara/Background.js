/**************/

/* BACKGROUND */

/**************/
export class Background {
  constructor(image, game, width, height) {
    this.image = image;
    this.game = game;
    this.width = width;
    this.height = height;
  }

  draw() {
    this.game.context.drawImage(this.image, 0, 0, this.width, this.height);
  }
}