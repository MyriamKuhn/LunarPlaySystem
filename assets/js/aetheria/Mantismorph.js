/***********/

/* IMPORTS */

/***********/
import { Enemy } from '/assets/js/aetheria/Enemy.js';


/****************/

/* MANTISMORPH */

/****************/
export class MantismorphOne extends Enemy {
  /**
   * @param {Game} game - Le jeu dans lequel l'ennemi est créé
   * 
   * @property {Game} game - Le jeu dans lequel l'ennemi est créé
   * @property {HTMLImageElement} image - L'image de l'ennemi
   * @property {number} lastFrame - La dernière frame de l'animation de l'ennemi
   * 
   * @method start - Initialise l'ennemi
   * @method update - Met à jour les propriétés de l'ennemi
   * 
   * @description Constructeur de la classe Lobstermorph
   */
  constructor(game) {
    super(game);
    this.image = document.getElementById('mantismorph');
    this.lastFrame = 11;
  }

  start() {
    super.start();
    this.speedX = Math.random() < 0.5 ? -1 : 1;
    this.speedY = Math.random() * 0.5 + 0.2;
    this.lives = 4;
    this.maxlives = 4;
    this.frameY = 0;
    this.sound = 'boom3';
    this.maxFrame = 0;
  }

  update() {
    super.update();
    if (!this.free) {

      if (this.x <= 0 || this.x >= this.game.width - this.width) {
        this.speedX *= -1;
      }
      
      if (this.isAlive()) {

        this.hit();

        if (this.lives >= 4) {
          if (this.game.spriteUpdate) {
            if (this.frameX === 0) {
              this.frameX = 1;
            } else {
              this.frameX = 0;
            }
          }
        } else if (this.lives === 3) {
          this.maxFrame = 2;
          if (this.frameX < this.maxFrame && this.game.spriteUpdate) {
            this.frameX++;
          }
        } else if (this.lives === 2) {
          this.maxFrame = 3;
          if (this.frameX < this.maxFrame && this.game.spriteUpdate) {
            this.frameX++;
          }
        } else if (this.lives === 1) {
          this.maxFrame = 4;
          if (this.frameX < this.maxFrame && this.game.spriteUpdate) {
            this.frameX++;
          }
        }
      }
    }
  }
}

export class MantismorphTwo extends Enemy {
  /**
   * @param {Game} game - Le jeu dans lequel l'ennemi est créé
   * 
   * @property {Game} game - Le jeu dans lequel l'ennemi est créé
   * @property {HTMLImageElement} image - L'image de l'ennemi
   * @property {number} lastFrame - La dernière frame de l'animation de l'ennemi
   * 
   * @method start - Initialise l'ennemi
   * @method update - Met à jour les propriétés de l'ennemi
   * 
   * @description Constructeur de la classe Lobstermorph
   */
  constructor(game) {
    super(game);
    this.image = document.getElementById('mantismorph');
    this.lastFrame = 11;
  }

  start() {
    super.start();
    this.speedX = Math.random() < 0.5 ? -1 : 1;
    this.speedY = Math.random() * 0.5 + 0.3;
    this.lives = 4;
    this.maxlives = 4;
    this.frameY = 1;
    this.sound = 'boom3';
    this.maxFrame = 0;
  }

  update() {
    super.update();
    if (!this.free) {

      if (this.x <= 0 || this.x >= this.game.width - this.width) {
        this.speedX *= -1;
      }
      
      if (this.isAlive()) {

        this.hit();

        if (this.lives >= 4) {
          if (this.game.spriteUpdate) {
            if (this.frameX === 0) {
              this.frameX = 1;
            } else {
              this.frameX = 0;
            }
          }
        } else if (this.lives === 3) {
          this.maxFrame = 2;
          if (this.frameX < this.maxFrame && this.game.spriteUpdate) {
            this.frameX++;
          }
        } else if (this.lives === 2) {
          this.maxFrame = 3;
          if (this.frameX < this.maxFrame && this.game.spriteUpdate) {
            this.frameX++;
          }
        } else if (this.lives === 1) {
          this.maxFrame = 4;
          if (this.frameX < this.maxFrame && this.game.spriteUpdate) {
            this.frameX++;
          }
        }
      }
    }
  }
}

export class MantismorphThree extends Enemy {
  /**
   * @param {Game} game - Le jeu dans lequel l'ennemi est créé
   * 
   * @property {Game} game - Le jeu dans lequel l'ennemi est créé
   * @property {HTMLImageElement} image - L'image de l'ennemi
   * @property {number} lastFrame - La dernière frame de l'animation de l'ennemi
   * 
   * @method start - Initialise l'ennemi
   * @method update - Met à jour les propriétés de l'ennemi
   * 
   * @description Constructeur de la classe Lobstermorph
   */
  constructor(game) {
    super(game);
    this.image = document.getElementById('mantismorph');
    this.lastFrame = 11;
  }

  start() {
    super.start();
    this.speedX = Math.random() < 0.5 ? -1 : 1;
    this.speedY = Math.random() * 0.5 + 0.4;
    this.lives = 4;
    this.maxlives = 4;
    this.frameY = 2;
    this.sound = 'boom3';
    this.maxFrame = 0;
  }

  update() {
    super.update();
    if (!this.free) {

      if (this.x <= 0 || this.x >= this.game.width - this.width) {
        this.speedX *= -1;
      }
      
      if (this.isAlive()) {

        this.hit();

        if (this.lives >= 4) {
          if (this.game.spriteUpdate) {
            if (this.frameX === 0) {
              this.frameX = 1;
            } else {
              this.frameX = 0;
            }
          }
        } else if (this.lives === 3) {
          this.maxFrame = 2;
          if (this.frameX < this.maxFrame && this.game.spriteUpdate) {
            this.frameX++;
          }
        } else if (this.lives === 2) {
          this.maxFrame = 3;
          if (this.frameX < this.maxFrame && this.game.spriteUpdate) {
            this.frameX++;
          }
        } else if (this.lives === 1) {
          this.maxFrame = 4;
          if (this.frameX < this.maxFrame && this.game.spriteUpdate) {
            this.frameX++;
          }
        }
      }
    }
  }
}

export class MantismorphFour extends Enemy {
  /**
   * @param {Game} game - Le jeu dans lequel l'ennemi est créé
   * 
   * @property {Game} game - Le jeu dans lequel l'ennemi est créé
   * @property {HTMLImageElement} image - L'image de l'ennemi
   * @property {number} lastFrame - La dernière frame de l'animation de l'ennemi
   * 
   * @method start - Initialise l'ennemi
   * @method update - Met à jour les propriétés de l'ennemi
   * 
   * @description Constructeur de la classe Lobstermorph
   */
  constructor(game) {
    super(game);
    this.image = document.getElementById('mantismorph');
    this.lastFrame = 11;
  }

  start() {
    super.start();
    this.speedX = Math.random() < 0.5 ? -1 : 1;
    this.speedY = Math.random() * 0.5 + 0.5;
    this.lives = 4;
    this.maxlives = 4;
    this.frameY = 3;
    this.sound = 'boom3';
    this.maxFrame = 0;
  }

  update() {
    super.update();
    if (!this.free) {

      if (this.x <= 0 || this.x >= this.game.width - this.width) {
        this.speedX *= -1;
      }
      
      if (this.isAlive()) {

        this.hit();

        if (this.lives >= 4) {
          if (this.game.spriteUpdate) {
            if (this.frameX === 0) {
              this.frameX = 1;
            } else {
              this.frameX = 0;
            }
          }
        } else if (this.lives === 3) {
          this.maxFrame = 2;
          if (this.frameX < this.maxFrame && this.game.spriteUpdate) {
            this.frameX++;
          }
        } else if (this.lives === 2) {
          this.maxFrame = 3;
          if (this.frameX < this.maxFrame && this.game.spriteUpdate) {
            this.frameX++;
          }
        } else if (this.lives === 1) {
          this.maxFrame = 4;
          if (this.frameX < this.maxFrame && this.game.spriteUpdate) {
            this.frameX++;
          }
        }
      }
    }
  }
}