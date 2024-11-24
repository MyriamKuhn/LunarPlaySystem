/***********/

/* IMPORTS */

/***********/
import { Enemy } from '/assets/js/aetheria/Enemy.js';


/***************/

/* LOCUSTMORPH */

/***************/
export class LocustmorphOne extends Enemy {
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
    this.image = document.getElementById('locustmorph');
    this.lastFrame = 15;
  }

  start() {
    super.start();
    this.speedX = Math.random() < 0.5 ? -1 : 1;
    this.speedY = Math.random() * 0.3 + 0.2;
    this.lives = 5;
    this.maxlives = 5;
    this.frameY = 0;
    this.sound = this.game.sound.boom2;
  }

  update() {
    super.update();
    if (!this.free) {

      if (this.x <= 0 || this.x >= this.game.width - this.width) {
        this.speedX *= -1;
      }

      if (this.isAlive()) {

        this.hit();

        if (this.lives >= 5) {
          if (this.game.spriteUpdate) {
            if (this.frameX === 0) {
              this.frameX = 1;
            } else {
              this.frameX = 0;
            }
          }
        } else if (this.lives === 4) {
          if (this.game.spriteUpdate) {
            if (this.frameX === 2) {
              this.frameX = 3;
            } else {
              this.frameX = 2;
            }
          }
        } else if (this.lives === 3) {
          if (this.game.spriteUpdate) {
            if (this.frameX === 4) {
              this.frameX = 5;
            } else {
              this.frameX = 4;
            }
          }
        } else if (this.lives === 2) {
          this.maxFrame = 6;
          if (this.frameX < this.maxFrame && this.game.spriteUpdate) {
            this.frameX++;
          }
        } else if (this.lives === 1) {
          this.maxFrame = 7;
          if (this.frameX < this.maxFrame && this.game.spriteUpdate) {
            this.frameX++;
          }
        }
      }
    }
  }
}

export class LocustmorphTwo extends Enemy {
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
    this.image = document.getElementById('locustmorph');
    this.lastFrame = 15;
  }

  start() {
    super.start();
    this.speedX = Math.random() < 0.5 ? -1.5 : 1.5;
    this.speedY = Math.random() * 0.3 + 0.2;
    this.lives = 5;
    this.maxlives = 5;
    this.frameY = 1;
    this.sound = this.game.sound.boom2;
  }

  update() {
    super.update();
    if (!this.free) {

      if (this.x <= 0 || this.x >= this.game.width - this.width) {
        this.speedX *= -1;
      }

      if (this.isAlive()) {

        this.hit();

        if (this.lives >= 5) {
          if (this.game.spriteUpdate) {
            if (this.frameX === 0) {
              this.frameX = 1;
            } else {
              this.frameX = 0;
            }
          }
        } else if (this.lives === 4) {
          if (this.game.spriteUpdate) {
            if (this.frameX === 2) {
              this.frameX = 3;
            } else {
              this.frameX = 2;
            }
          }
        } else if (this.lives === 3) {
          if (this.game.spriteUpdate) {
            if (this.frameX === 4) {
              this.frameX = 5;
            } else {
              this.frameX = 4;
            }
          }
        } else if (this.lives === 2) {
          this.maxFrame = 6;
          if (this.frameX < this.maxFrame && this.game.spriteUpdate) {
            this.frameX++;
          }
        } else if (this.lives === 1) {
          this.maxFrame = 7;
          if (this.frameX < this.maxFrame && this.game.spriteUpdate) {
            this.frameX++;
          }
        }
      }
    }
  }
}

export class LocustmorphThree extends Enemy {
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
    this.image = document.getElementById('locustmorph');
    this.lastFrame = 15;
  }

  start() {
    super.start();
    this.speedX = Math.random() < 0.5 ? -2 : 2;
    this.speedY = Math.random() * 0.3 + 0.2;
    this.lives = 5;
    this.maxlives = 5;
    this.frameY = 2;
    this.sound = this.game.sound.boom2;
  }

  update() {
    super.update();
    if (!this.free) {

      if (this.x <= 0 || this.x >= this.game.width - this.width) {
        this.speedX *= -1;
      }

      if (this.isAlive()) {

        this.hit();

        if (this.lives >= 5) {
          if (this.game.spriteUpdate) {
            if (this.frameX === 0) {
              this.frameX = 1;
            } else {
              this.frameX = 0;
            }
          }
        } else if (this.lives === 4) {
          if (this.game.spriteUpdate) {
            if (this.frameX === 2) {
              this.frameX = 3;
            } else {
              this.frameX = 2;
            }
          }
        } else if (this.lives === 3) {
          if (this.game.spriteUpdate) {
            if (this.frameX === 4) {
              this.frameX = 5;
            } else {
              this.frameX = 4;
            }
          }
        } else if (this.lives === 2) {
          this.maxFrame = 6;
          if (this.frameX < this.maxFrame && this.game.spriteUpdate) {
            this.frameX++;
          }
        } else if (this.lives === 1) {
          this.maxFrame = 7;
          if (this.frameX < this.maxFrame && this.game.spriteUpdate) {
            this.frameX++;
          }
        }
      }
    }
  }
}

export class LocustmorphFour extends Enemy {
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
    this.image = document.getElementById('locustmorph');
    this.lastFrame = 15;
  }

  start() {
    super.start();
    this.speedX = Math.random() < 0.5 ? -2 : 2;
    this.speedY = Math.random() * 0.3 + 0.5;
    this.lives = 5;
    this.maxlives = 5;
    this.frameY = 3;
    this.sound = this.game.sound.boom2;
  }

  update() {
    super.update();
    if (!this.free) {

      if (this.x <= 0 || this.x >= this.game.width - this.width) {
        this.speedX *= -1;
      }

      if (this.isAlive()) {

        this.hit();

        if (this.lives >= 5) {
          if (this.game.spriteUpdate) {
            if (this.frameX === 0) {
              this.frameX = 1;
            } else {
              this.frameX = 0;
            }
          }
        } else if (this.lives === 4) {
          if (this.game.spriteUpdate) {
            if (this.frameX === 2) {
              this.frameX = 3;
            } else {
              this.frameX = 2;
            }
          }
        } else if (this.lives === 3) {
          if (this.game.spriteUpdate) {
            if (this.frameX === 4) {
              this.frameX = 5;
            } else {
              this.frameX = 4;
            }
          }
        } else if (this.lives === 2) {
          this.maxFrame = 6;
          if (this.frameX < this.maxFrame && this.game.spriteUpdate) {
            this.frameX++;
          }
        } else if (this.lives === 1) {
          this.maxFrame = 7;
          if (this.frameX < this.maxFrame && this.game.spriteUpdate) {
            this.frameX++;
          }
        }
      }
    }
  }
}