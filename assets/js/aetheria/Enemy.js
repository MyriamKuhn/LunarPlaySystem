/***********/

/* ENNEMIS */

/***********/
export class Enemy {
  /**
   * @param {Game} game - Le jeu dans lequel l'ennemi est créé
   * 
   * @property {Game} game - Le jeu dans lequel l'ennemi est créé
   * @property {HTMLImageElement} image - L'image de l'ennemi
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
   * @property {number} maxlives - Le nombre de vies maximum de l'ennemi
   * @property {boolean} free - L'ennemi est-il libre ?
   * @property {sound} sound - Le son de l'ennemi lorsqu'il est touché
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
    this.image;
    this.spriteWidth = 100;
    this.spriteHeight = 100;
    const referenceWidth = 1920;
    const scalingFactor = Math.min(Math.max(this.game.width / referenceWidth, 0.5), 1.5);
    this.sizeModifier = Math.random() * 0.3 + 0.8;
    this.width = this.spriteWidth * this.sizeModifier * scalingFactor;
    this.height = this.spriteHeight * this.sizeModifier * scalingFactor;
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
    this.maxlives;
    this.free = true;
    this.sound;
  }

  start() {
    this.x = Math.random() * this.game.width;
    this.y = -this.height;
    this.frameX = 0;
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
      if (this.sound) this.game.sound.play(this.sound);
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
          this.game.sound.play('scream');
        } 
      }

      if (!this.isAlive()) {
        if (this.game.spriteUpdate) {
          this.frameX++;
          if (this.frameX > this.lastFrame) {
            this.reset();
            if (!this.game.gameOver) this.game.score += this.maxlives * this.game.scoreMultiplier;
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
