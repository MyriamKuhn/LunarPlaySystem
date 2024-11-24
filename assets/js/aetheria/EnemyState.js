/*********************/

/* ETATS DES ENNEMIS */

/********************/
class EnemyState {
  /**
   * @param {Game} game - Le jeu dans lequel l'ennemi est créé
   * @param {Enemy} enemy - L'ennemi
   * 
   * @property {Game} game - Le jeu dans lequel l'ennemi est créé
   * @property {Enemy} enemy - L'ennemi
   * 
   * @method constructor - Constructeur de la classe EnemyState
   * 
   * @description Constructeur de la classe EnemyState
   * Utilise le State Design Pattern pour gérer les états des ennemis
   */
  constructor(game, enemy) {
    this.game = game;
    this.enemy = enemy;
  }
}

/*****************/

/* L'ENNEMI VOLE */

/*****************/
export class Flying extends EnemyState {
  start() {
    this.enemy.minFrame = 0;
    this.enemy.maxFrame = 2;
    this.enemy.speedX = Math.random() * 2 - 1;
    this.enemy.speedY = Math.random() * 0.5 + 0.2;
    this.enemy.frameX = this.enemy.minFrame;
  }

  update() {
    this.enemy.hit();
    this.enemy.handleFrames();
  }
}


/**************************/

/* L'ENNEMI EST INVISIBLE */

/**************************/
export class Phasing extends EnemyState {
  start() {
    this.enemy.minFrame = 3;
    this.enemy.maxFrame = 5;
    this.enemy.speedX = Math.random() * 2 - 1;
    this.enemy.speedY = Math.random() * 0.5 + 0.2;
    this.enemy.frameX = this.enemy.minFrame;
  }

  update() {
    this.enemy.handleFrames();
    if (this.game.checkCollision(this.enemy, this.game.mouse) && this.game.mouse.pressed) {
      this.enemy.y += 25;
      this.enemy.speedX = 0;
      this.enemy.speedY = 2;
      this.game.sound.play(this.game.sound.slide);
    }
  }
}


/********************/

/* L'ENNEMI EXPLOSE */

/********************/
export class Imploding extends EnemyState {
  start() {
    this.enemy.minFrame = 6;
    this.enemy.maxFrame = this.enemy.lastFrame + 1;
    this.enemy.frameX = this.enemy.minFrame;
    this.game.sound.play(this.game.sound.boomSounds[Math.floor(Math.random() * 4)]);
  }

  update() {
    
  }
}
