/***********/

/* IMPORTS */

/***********/
import { Flying, Phasing, Imploding } from '/assets/js/aetheria/EnemyState.js';


/***********/

/* ENNEMIS */

/***********/
class Enemy {
  /**
   * @param {Game} game - Le jeu dans lequel l'ennemi est créé
   * 
   * @property {Game} game - Le jeu dans lequel l'ennemi est créé
   * @property {number} spriteWidth - La largeur de l'image de l'ennemi
   * @property {number} spriteHeight - La hauteur de l'image de l'ennemi
   * @property {number} width - La largeur de l'ennemi
   * @property {number} height - La hauteur de l'ennemi
   * @property {number} x - La position horizontale de l'ennemi
   * @property {number} y - La position verticale de l'ennemi
   * @property {number} speedX - La vitesse horizontale de l'ennemi
   * @property {number} speedY - La vitesse verticale de l'ennemi
   * @property {number} frameX - La position horizontale de l'image de l'ennemi dans le sprite
   * @property {number} frameY - La position verticale de l'image de l'ennemi dans le sprite
   * @property {number} minFrame - La première frame de l'animation de l'ennemi
   * @property {number} maxFrame - La dernière frame de l'animation de l'ennemi
   * @property {number} lives - Le nombre de vies de l'ennemi
   * @property {boolean} free - L'ennemi est-il libre ?
   * 
   * @method start - Initialise l'ennemi
   * @method reset - Remet l'ennemi dans le pool
   * @method isAlive - L'ennemi est-il en vie ?
   * @method update - Met à jour les propriétés de l'ennemi
   * @method draw - Dessine l'ennemi
   * 
   * @description Constructeur de la classe Enemy
   * L'ennemi sera crée à l'aide d'un object pool design pattern pour éviter les allocations mémoires inutiles et améliorer les performances
   */
  constructor(game) {
    this.game = game;
    this.spriteWidth = 100;
    this.spriteHeight = 100;
    this.sizeModifier = Math.random() * 0.3 + 0.8;
    this.width = this.spriteWidth * this.sizeModifier;
    this.height = this.spriteHeight * this.sizeModifier;
    this.x;
    this.y;
    this.speedX;
    this.speedY;
    this.frameX;
    this.lastFrame;
    this.frameY;
    this.minFrame;
    this.maxFrame;
    this.lives;
    this.free = true;
  }

  start() {
    this.x = Math.random() * this.game.width;
    this.y = -this.height;
    this.frameX = 0;
    this.frameY = Math.floor(Math.random() * 4);
    this.free = false;
  }

  reset() {
    this.free = true;
  }

  isAlive() {
    return this.lives >= 1;
  }

  hit() {
    if (this.game.checkCollision(this, this.game.mouse) && this.game.mouse.pressed && !this.game.mouse.fired) {
      this.lives--;
      this.game.mouse.fired = true;
    }
  }

  update() {
    if (!this.free) {
      // Pour le faire entrer directement à l'intérieur de l'écran
      if (this.y < 0) this.y += 5;
      // Faire en sorte qu'il soit toujours visible au redimensionnement de la fenêtre
      if (this.x > this.game.width - this.width) {
        this.x = this.game.width - this.width;
      }
      this.x += this.speedX;
      this.y += this.speedY;

      if (this.y > this.game.height) {
        this.reset();
        if (!this.game.gameOver) {
          this.game.lives--;
          this.game.sound.scream.play();
        } 
      }

      if (!this.isAlive()) {
        if (this.game.spriteUpdate) {
          this.frameX++;
          if (this.frameX > this.lastFrame) {
            this.reset();
            if (!this.game.gameOver) this.game.score++;
          }
        }
      }
    }
  }

  draw() {
    if (!this.free) {
      this.game.ctx.drawImage(this.image, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
      if (this.game.debug) {
        this.game.ctx.strokeRect(this.x, this.y, this.width, this.height);
        this.game.ctx.fillText(this.lives, this.x + this.width * 0.5, this.y + this.height * 0.5);
      }
    }
  }
}


/***************/

/* BEETLEMORPH */

/***************/
export class Beetlemorph extends Enemy {
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
    this.image = document.getElementById('beetlemorph');
  }

  start() {
    super.start();
    this.speedX = 0;
    this.speedY = Math.random() * 2 + 0.2;
    this.lives = 1;
    this.lastFrame = 3;
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


/****************/

/* LOBSTERMORPH */

/****************/
export class Lobstermorph extends Enemy {
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
    this.lastFrame = 14
  }

  start() {
    super.start();
    this.speedX = 0;
    this.speedY = Math.random() * 0.5 + 0.2;
    this.lives = 3;
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


/****************/

/* PHANTOMMORPH */

/****************/
export class Phantommorph extends Enemy {
  /**
  * @param {Game} game - Le jeu dans lequel l'ennemi est créé
  * 
  * @property {Game} game - Le jeu dans lequel l'ennemi est créé
  * @property {HTMLImageElement} image - L'image de l'ennemi
  * @property {number} lastFrame - La dernière frame de l'animation de l'ennemi
  * @property {Array} states - Les états de l'ennemi
  * @property {EnemyState} currentState - L'état actuel de l'ennemi
  * @property {number} switchTimer - Le timer pour changer d'état
  * @property {number} switchInterval - L'intervalle pour changer d'état
  * 
  * @method start - Initialise l'ennemi
  * @method setState - Définit l'état de l'ennemi
  * @method handleFrames - Gère les frames de l'animation de l'ennemi
  * @method switch - Change l'état de l'ennemi
  * @method update - Met à jour les propriétés de l'ennemi
  * 
  * @description Constructeur de la classe Phantommorph
  * Utilise le State Design Pattern pour gérer les états de l'ennemi
   */
  constructor(game) {
    super(game);
    this.image = document.getElementById('phantommorph');
    this.lastFrame = 14;
    this.states = [new Flying(game, this), new Phasing(game, this), new Imploding(game, this)];
    this.currentState;
    this.switchTimer = 0;
    this.switchInterval = Math.random() * 2000 + 1000; 
  }

  start() {
    super.start();
    this.speedX = Math.random() * 2 - 1;
    this.speedY = Math.random() * 0.5 + 0.2;
    this.lives = 1;
    this.minFrame = 3;
    this.maxFrame = 5;
    this.setState(Math.floor(Math.random() * 2));
  }

  setState(state) {
    this.currentState = this.states[state];
    this.currentState.start();
  }

  handleFrames() {
    if (this.game.spriteUpdate) {
      if (this.frameX < this.maxFrame) {
        this.frameX++;
      } else {
        this.frameX = this.minFrame;
      }
    }
  }

  switch() {
    if (this.currentState === this.states[0]) {
      this.setState(1);
    } else {
      this.setState(0);
    }
  }

  hit() {
    super.hit();
    if (!this.isAlive()) this.setState(2);
  }

  update(deltaTime) {
    super.update();
    if (!this.free) {
      this.currentState.update();
      if (this.x <= 0 || this.x >= this.game.width - this.width) {
        this.speedX *= -1;
      }
      
      if (this.isAlive()) {
        if (this.switchTimer < this.switchInterval) {
          this.switchTimer += deltaTime;
        } else {
          this.switchTimer = 0;
          this.switch();
        }
      }
    }
  }
}


