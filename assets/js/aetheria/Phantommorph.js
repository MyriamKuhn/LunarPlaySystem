/***********/

/* IMPORTS */

/***********/
import { Enemy } from '/assets/js/aetheria/Enemy.js';
import { Flying, Phasing, Imploding } from '/assets/js/aetheria/EnemyState.js';


/****************/

/* PHANTOMMORPH */

/****************/
export class PhantommorphOne extends Enemy {
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
    this.maxlives = 1;
    this.minFrame = 3;
    this.maxFrame = 5;
    this.setState(Math.floor(Math.random() * 2));
    this.frameY = 0;
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

export class PhantommorphTwo extends Enemy {
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
    this.speedY = Math.random() * 0.5 + 0.3;
    this.lives = 1;
    this.maxlives = 1;
    this.minFrame = 3;
    this.maxFrame = 5;
    this.setState(Math.floor(Math.random() * 2));
    this.frameY = 1;
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

export class PhantommorphThree extends Enemy {
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
    this.speedY = Math.random() * 0.5 + 0.4;
    this.lives = 1;
    this.maxlives = 1;
    this.minFrame = 3;
    this.maxFrame = 5;
    this.setState(Math.floor(Math.random() * 2));
    this.frameY = 2;
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

export class PhantommorphFour extends Enemy {
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
    this.speedY = Math.random() * 0.5 + 0.5;
    this.lives = 1;
    this.maxlives = 1;
    this.minFrame = 3;
    this.maxFrame = 5;
    this.setState(Math.floor(Math.random() * 2));
    this.frameY = 3;
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