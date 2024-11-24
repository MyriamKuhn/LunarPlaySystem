/***********/

/* IMPORTS */

/***********/
import { Enemy } from '/assets/js/aetheria/Enemy.js';


/***************/

/* SQUIDMORPH */

/***************/
export class SquidmorphOne extends Enemy {
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
    this.image = document.getElementById('squidmorph');
    this.lastFrame = 17;
  }

  start() {
    super.start();
    this.speedX = Math.random() < 0.5 ? -1 : 1;
    this.speedY = Math.random() * 0.3 + 0.2;
    this.lives = 6;
    this.maxlives = 6;
    this.frameY = 0;
    this.sound = 'boom3';
  }

  update() {
    super.update();
    if (!this.free) {

      if (this.x <= 0 || this.x >= this.game.width - this.width) {
        this.speedX *= -1;
      }

      if (this.isAlive()) {

        this.hit();

        if (this.lives >= 6) {
          if (this.game.spriteUpdate) {
            if (this.frameX === 0) {
              this.frameX = 1;
            } else {
              this.frameX = 0;
            }
          }
        } else if (this.lives === 5) {
          this.maxFrame = 2;
          if (this.frameX < this.maxFrame && this.game.spriteUpdate) {
            this.frameX++;
          }
        } else if (this.lives === 4) {
          this.maxFrame = 4;
          if (this.frameX < this.maxFrame && this.game.spriteUpdate) {
            this.frameX++;
          }
        } else if (this.lives === 3) {
          this.maxFrame = 6;
          if (this.frameX < this.maxFrame && this.game.spriteUpdate) {
            this.frameX++;
          }
        } else if (this.lives === 2) {
          this.maxFrame = 8;
          if (this.frameX < this.maxFrame && this.game.spriteUpdate) {
            this.frameX++;
          }
        } else if (this.lives === 1) {
          this.maxFrame = 10;
          if (this.frameX < this.maxFrame && this.game.spriteUpdate) {
            this.frameX++;
          }
        }
      }
    }
  }
}

export class SquidmorphTwo extends Enemy {
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
    this.image = document.getElementById('squidmorph');
    this.lastFrame = 17;
  }

  start() {
    super.start();
    this.speedX = Math.random() < 0.5 ? -1.5 : 1.5;
    this.speedY = Math.random() * 0.3 + 0.2;
    this.lives = 6;
    this.maxlives = 6;
    this.frameY = 1;
    this.sound = 'boom3';
  }

  update() {
    super.update();
    if (!this.free) {

      if (this.x <= 0 || this.x >= this.game.width - this.width) {
        this.speedX *= -1;
      }

      if (this.isAlive()) {

        this.hit();

        if (this.lives >= 6) {
          if (this.game.spriteUpdate) {
            if (this.frameX === 0) {
              this.frameX = 1;
            } else {
              this.frameX = 0;
            }
          }
        } else if (this.lives === 5) {
          this.maxFrame = 2;
          if (this.frameX < this.maxFrame && this.game.spriteUpdate) {
            this.frameX++;
          }
        } else if (this.lives === 4) {
          this.maxFrame = 4;
          if (this.frameX < this.maxFrame && this.game.spriteUpdate) {
            this.frameX++;
          }
        } else if (this.lives === 3) {
          this.maxFrame = 6;
          if (this.frameX < this.maxFrame && this.game.spriteUpdate) {
            this.frameX++;
          }
        } else if (this.lives === 2) {
          this.maxFrame = 8;
          if (this.frameX < this.maxFrame && this.game.spriteUpdate) {
            this.frameX++;
          }
        } else if (this.lives === 1) {
          this.maxFrame = 10;
          if (this.frameX < this.maxFrame && this.game.spriteUpdate) {
            this.frameX++;
          }
        }
      }
    }
  }
}

export class SquidmorphThree extends Enemy {
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
    this.image = document.getElementById('squidmorph');
    this.lastFrame = 17;
  }

  start() {
    super.start();
    this.speedX = Math.random() < 0.5 ? 2 : 2;
    this.speedY = Math.random() * 0.3 + 0.2;
    this.lives = 6;
    this.maxlives = 6;
    this.frameY = 2;
    this.sound = 'boom3';
  }

  update() {
    super.update();
    if (!this.free) {

      if (this.x <= 0 || this.x >= this.game.width - this.width) {
        this.speedX *= -1;
      }

      if (this.isAlive()) {

        this.hit();

        if (this.lives >= 6) {
          if (this.game.spriteUpdate) {
            if (this.frameX === 0) {
              this.frameX = 1;
            } else {
              this.frameX = 0;
            }
          }
        } else if (this.lives === 5) {
          this.maxFrame = 2;
          if (this.frameX < this.maxFrame && this.game.spriteUpdate) {
            this.frameX++;
          }
        } else if (this.lives === 4) {
          this.maxFrame = 4;
          if (this.frameX < this.maxFrame && this.game.spriteUpdate) {
            this.frameX++;
          }
        } else if (this.lives === 3) {
          this.maxFrame = 6;
          if (this.frameX < this.maxFrame && this.game.spriteUpdate) {
            this.frameX++;
          }
        } else if (this.lives === 2) {
          this.maxFrame = 8;
          if (this.frameX < this.maxFrame && this.game.spriteUpdate) {
            this.frameX++;
          }
        } else if (this.lives === 1) {
          this.maxFrame = 10;
          if (this.frameX < this.maxFrame && this.game.spriteUpdate) {
            this.frameX++;
          }
        }
      }
    }
  }
}

export class SquidmorphFour extends Enemy {
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
    this.image = document.getElementById('squidmorph');
    this.lastFrame = 17;
  }

  start() {
    super.start();
    this.speedX = Math.random() < 0.5 ? 2 : 2;
    this.speedY = Math.random() * 0.3 + 0.5;
    this.lives = 6;
    this.maxlives = 6;
    this.frameY = 3;
    this.sound = 'boom3';
  }

  update() {
    super.update();
    if (!this.free) {

      if (this.x <= 0 || this.x >= this.game.width - this.width) {
        this.speedX *= -1;
      }

      if (this.isAlive()) {

        this.hit();

        if (this.lives >= 6) {
          if (this.game.spriteUpdate) {
            if (this.frameX === 0) {
              this.frameX = 1;
            } else {
              this.frameX = 0;
            }
          }
        } else if (this.lives === 5) {
          this.maxFrame = 2;
          if (this.frameX < this.maxFrame && this.game.spriteUpdate) {
            this.frameX++;
          }
        } else if (this.lives === 4) {
          this.maxFrame = 4;
          if (this.frameX < this.maxFrame && this.game.spriteUpdate) {
            this.frameX++;
          }
        } else if (this.lives === 3) {
          this.maxFrame = 6;
          if (this.frameX < this.maxFrame && this.game.spriteUpdate) {
            this.frameX++;
          }
        } else if (this.lives === 2) {
          this.maxFrame = 8;
          if (this.frameX < this.maxFrame && this.game.spriteUpdate) {
            this.frameX++;
          }
        } else if (this.lives === 1) {
          this.maxFrame = 10;
          if (this.frameX < this.maxFrame && this.game.spriteUpdate) {
            this.frameX++;
          }
        }
      }
    }
  }
}