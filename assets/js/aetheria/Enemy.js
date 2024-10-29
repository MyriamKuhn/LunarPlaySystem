/***********/

/* ENNEMIS */

/***********/
export class Enemy {
  /**
   * @param {Game} game - Le jeu dans lequel l'ennemi est créé
   * 
   * @property {Game} game - Le jeu dans lequel l'ennemi est créé
   * @property {number} width - La largeur de l'ennemi
   * @property {number} height - La hauteur de l'ennemi
   * @property {number} x - La position horizontale de l'ennemi
   * @property {number} y - La position verticale de l'ennemi
   * @property {number} speedX - La vitesse horizontale de l'ennemi
   * @property {number} speedY - La vitesse verticale de l'ennemi
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
    this.width = 50;
    this.height = 50;
    this.x;
    this.y;
    this.speedX = 0;
    this.speedY = Math.random() * 4 + 1;
    this.lives;
    this.free = true;
  }

  start() {
    this.x = Math.random() * this.game.width;
    this.y = -this.height;
    this.lives = 2;
    this.free = false;
  }

  reset() {
    this.free = true;
  }

  isAlive() {
    return this.lives >= 1;
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

      // Vérifier si il y a une collision avec la souris
      if (this.game.checkCollision(this, this.game.mouse) && this.game.mouse.pressed && !this.game.mouse.fired) {
        this.lives--;
        this.game.mouse.fired = true;
      }
      if (!this.isAlive()) {
        this.reset();
        this.game.score++;
      }
      if (this.y > this.game.height) {
        this.reset();
        this.game.lives--;
      }
    }
  }

  draw() {
    if (!this.free) {
      this.game.ctx.strokeRect(this.x, this.y, this.width, this.height);
      this.game.ctx.fillText(this.lives, this.x + this.width * 0.5, this.y + this.height * 0.5);
    }
  }
}