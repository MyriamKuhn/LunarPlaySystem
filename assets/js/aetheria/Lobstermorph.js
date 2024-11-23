/***********/

/* IMPORTS */

/***********/
import { Enemy } from '/assets/js/aetheria/Enemy.js';


/****************/

/* LOBSTERMORPH */

/****************/
export class LobstermorphOne extends Enemy {
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
    this.image = document.getElementById('lobstermorph');
    this.lastFrame = 14;
  }

  start() {
    super.start();
    this.speedX = 0;
    this.speedY = Math.random() * 0.5 + 0.2;
    this.lives = 3;
    this.maxlives = 3;
    this.frameY = 0;
    this.sound = this.game.sound.boom3;
  }

  update() {
    super.update();
    if (!this.free) {
      if (this.lives >= 3) {
        this.maxFrame = 0;
      } else if (this.lives === 2) {
        this.maxFrame = 3;
      } else if (this.lives === 1) {
        this.maxFrame = 7;
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

export class LobstermorphTwo extends Enemy {
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
    this.image = document.getElementById('lobstermorph');
    this.lastFrame = 14;
  }

  start() {
    super.start();
    this.speedX = 0;
    this.speedY = Math.random() * 0.5 + 0.3;
    this.lives = 3;
    this.maxlives = 3;
    this.frameY = 1;
    this.sound = this.game.sound.boom3;
  }

  update() {
    super.update();
    if (!this.free) {
      if (this.lives >= 3) {
        this.maxFrame = 0;
      } else if (this.lives === 2) {
        this.maxFrame = 3;
      } else if (this.lives === 1) {
        this.maxFrame = 7;
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

export class LobstermorphThree extends Enemy {
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
    this.image = document.getElementById('lobstermorph');
    this.lastFrame = 14;
  }

  start() {
    super.start();
    this.speedX = 0;
    this.speedY = Math.random() * 0.5 + 0.4;
    this.lives = 3;
    this.maxlives = 3;
    this.frameY = 2;
    this.sound = this.game.sound.boom3;
  }

  update() {
    super.update();
    if (!this.free) {
      if (this.lives >= 3) {
        this.maxFrame = 0;
      } else if (this.lives === 2) {
        this.maxFrame = 3;
      } else if (this.lives === 1) {
        this.maxFrame = 7;
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

export class LobstermorphFour extends Enemy {
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
    this.image = document.getElementById('lobstermorph');
    this.lastFrame = 14;
  }

  start() {
    super.start();
    this.speedX = 0;
    this.speedY = Math.random() * 0.5 + 0.5;
    this.lives = 3;
    this.maxlives = 3;
    this.frameY = 3;
    this.sound = this.game.sound.boom3;
  }

  update() {
    super.update();
    if (!this.free) {
      if (this.lives >= 3) {
        this.maxFrame = 0;
      } else if (this.lives === 2) {
        this.maxFrame = 3;
      } else if (this.lives === 1) {
        this.maxFrame = 7;
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