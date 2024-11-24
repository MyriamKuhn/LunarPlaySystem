/***********/

/* IMPORTS */

/***********/
import { Enemy } from '/assets/js/aetheria/Enemy.js';


/**************/

/* RHINOMORPH */

/**************/
export class RhinomorphOne extends Enemy {
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
    this.image = document.getElementById('rhinomorph');
  }

  start() {
    super.start();
    this.speedX = Math.random() * 2 - 1;
    this.speedY = Math.random() * 0.5 + 0.2;
    this.lives = 2;
    this.maxlives = 2;
    this.lastFrame = 6;
    this.sound = 'boom2';
    this.frameY = 0;
  }

  update() {
    super.update();
    if (!this.free) {

      if (this.x <= 0 || this.x >= this.game.width - this.width) {
        this.speedX *= -1;
      }

      if (this.lives > 1) {
        this.maxFrame = 0;
      } else if (this.lives === 1) {
        this.maxFrame = 2;
      }

      if (this.isAlive()) {
        this.hit();
        if (this.frameX < this.maxFrame && this.game.spriteUpdate) {
          this.frameX++;
        }
      }
    }
  }
}

export class RhinomorphTwo extends Enemy {
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
    this.image = document.getElementById('rhinomorph');
  }

  start() {
    super.start();
    this.speedX = Math.random() * 2 - 1;
    this.speedY = Math.random() * 0.8 + 0.5;
    this.lives = 2;
    this.maxlives = 2;
    this.lastFrame = 6;
    this.sound = 'boom2';
    this.frameY = 1;
  }

  update() {
    super.update();
    if (!this.free) {

      if (this.x <= 0 || this.x >= this.game.width - this.width) {
        this.speedX *= -1;
      }

      if (this.lives > 1) {
        this.maxFrame = 0;
      } else if (this.lives === 1) {
        this.maxFrame = 2;
      }

      if (this.isAlive()) {
        this.hit();
        if (this.frameX < this.maxFrame && this.game.spriteUpdate) {
          this.frameX++;
        }
      }
    }
  }
}

export class RhinomorphThree extends Enemy {
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
    this.image = document.getElementById('rhinomorph');
  }

  start() {
    super.start();
    this.speedX = Math.random() * 4 - 2;
    this.speedY = Math.random() * 0.8 + 0.5;
    this.lives = 2;
    this.maxlives = 2;
    this.lastFrame = 6;
    this.sound = 'boom2';
    this.frameY = 2;
  }

  update() {
    super.update();
    if (!this.free) {

      if (this.x <= 0 || this.x >= this.game.width - this.width) {
        this.speedX *= -1;
      }

      if (this.lives > 1) {
        this.maxFrame = 0;
      } else if (this.lives === 1) {
        this.maxFrame = 2;
      }

      if (this.isAlive()) {
        this.hit();
        if (this.frameX < this.maxFrame && this.game.spriteUpdate) {
          this.frameX++;
        }
      }
    }
  }
}

export class RhinomorphFour extends Enemy {
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
    this.image = document.getElementById('rhinomorph');
  }

  start() {
    super.start();
    this.speedX = Math.random() * 6 - 3;
    this.speedY = Math.random() * 1.2 + 0.8;
    this.lives = 2;
    this.maxlives = 2;
    this.lastFrame = 6;
    this.sound = 'boom2';
    this.frameY = 3;
  }

  update() {
    super.update();
    if (!this.free) {

      if (this.x <= 0 || this.x >= this.game.width - this.width) {
        this.speedX *= -1;
      }

      if (this.lives > 1) {
        this.maxFrame = 0;
      } else if (this.lives === 1) {
        this.maxFrame = 2;
      }

      if (this.isAlive()) {
        this.hit();
        if (this.frameX < this.maxFrame && this.game.spriteUpdate) {
          this.frameX++;
        }
      }
    }
  }
}