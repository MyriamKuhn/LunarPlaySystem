/***********/

/* IMPORTS */

/***********/
import { Enemy } from '/assets/js/aetheria/Enemy.js';


/**************/

/* PROJECTILE */

/**************/
export class Projectile extends Enemy {
  /**
   * @param {Game} game - Le jeu dans lequel l'ennemi est créé
   * 
   * @property {HTMLImageElement} image - L'image de l'ennemi
   * 
   * @method start - Initialise l'ennemi
   * @method update - Met à jour les propriétés de l'ennemi
   * 
   * @description Constructeur de la classe Beetlemorph
   */
  constructor(game) {
    super(game);
    this.spriteWidth = 142.75;
    this.spriteHeight = 100;
    const referenceWidth = 1920;
    const scalingFactor = Math.min(Math.max(this.game.width / referenceWidth, 0.5), 1.5);
    this.sizeModifier = 0.5;
    this.width = this.spriteWidth * this.sizeModifier * scalingFactor;
    this.height = this.spriteHeight * this.sizeModifier * scalingFactor;
    this.image = document.getElementById('projectile');
  }

  start(x, y) {
    super.start();
    this.speedX = 0;
    this.speedY = Math.random() * 0.5 + 0.5;
    this.lives = 1;
    this.maxlives = 1;
    this.lastFrame = 0;
    this.sound = 'boom3';
    this.frameY = Math.floor(Math.random() * 2);
    this.frameX = Math.floor(Math.random() * 4);;
    this.x = x - this.width * 0.5;  
    this.y = y;  
  }

  update() {
    super.update();
    if (!this.free) {
      if (this.isAlive()) {
        this.hit();
      }
    }
  }
}