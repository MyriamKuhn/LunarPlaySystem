/**************/

/* BOSS ENEMY */

/**************/
class Boss {
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
    this.game = game;
    this.spriteWidth = 200;
    this.spriteHeight = 200;
    const referenceWidth = 1920;
    const scalingFactor = Math.min(Math.max(this.game.width / referenceWidth, 0.5), 1.5);
    this.sizeModifier = 1.5;
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
    this.image;
  }
    
  start() {
    this.x = Math.random() * this.game.width;
    this.y = -this.height;
    this.speedX = Math.random() < 0.5 ? -1 : 1;
    this.speedY = Math.random() * 0.5 + 0.2;
    this.lives = 10;
    this.maxlives = 10;
    this.frameX = 0;
    this.frameY = 0;
    this.free = false;
    this.minFrame = 0;
    this.maxFrame = 1;
    this.sound = 'boom4';
    this.lastFrame = 11;
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

  handleFrames() {
    if (this.game.spriteUpdate) {
      if (this.frameX < this.maxFrame) {
        this.frameX++;
      } else {
        this.frameX = this.minFrame;
      }
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
          this.game.lives -= this.maxlives;
        } 
      }

      // Pour le faire rebondir sur les côtés
      if (this.x <= 0 || this.x >= this.game.width - this.width) {
        this.speedX *= -1;
      }
    
      if (this.isAlive()) {
        this.handleFrames();
        this.hit();
      }

      if (!this.isAlive()) {
        if (this.game.spriteUpdate) {
          this.frameX++;
          if (this.frameX > this.lastFrame) {
            this.reset();
            if (!this.game.gameOver) {
              this.game.isBossDead = true;
              this.game.score += this.maxlives * this.game.scoreMultiplier;
            }
          }
        }
      }
    }
  }

  draw() {
    if (!this.free) {
      this.game.ctx.drawImage(this.image, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
      this.game.ctx.save();
      this.game.ctx.textAlign = 'center';
      this.game.ctx.shadowOffsetX = 3;
      this.game.ctx.shadowOffsetY = 3;
      this.game.ctx.shadowColor = 'black';
      this.game.ctx.fillText(this.lives, this.x + this.width * 0.5, this.y + this.height * 0.5);
      this.game.ctx.restore();
    }
  }
}

export class Boss1 extends Boss
{
  constructor(game) {
    super(game);
    this.image = document.getElementById('boss');
  }

  start() {
    super.start();
    this.speedX = Math.random() * 4 - 2;
    this.speedY = Math.random() * 0.8 + 0.5;
    this.lives = 10;
    this.maxlives = 10;
    this.frameY = 0;
  }
}

export class Boss2 extends Boss
{
  constructor(game) {
    super(game);
    this.image = document.getElementById('boss');
  }

  start() {
    super.start();
    this.speedX = Math.random() * 4 - 2;
    this.speedY = Math.random() * 0.8 + 0.5;
    this.lives = 15;
    this.maxlives = 15;
    this.frameY = 1;
  }
}

export class Boss3 extends Boss
{
  constructor(game) {
    super(game);
    this.image = document.getElementById('boss');
  }

  start() {
    super.start();
    this.speedX = Math.random() * 4 - 2;
    this.speedY = Math.random() * 0.8 + 0.5;
    this.lives = 20;
    this.maxlives = 20;
    this.frameY = 2;
  }
}

export class Boss4 extends Boss
{
  constructor(game) {
    super(game);
    this.image = document.getElementById('boss');
  }

  start() {
    super.start();
    this.speedX = Math.random() * 4 - 2;
    this.speedY = Math.random() * 0.8 + 0.5;
    this.lives = 25;
    this.maxlives = 25;
    this.frameY = 3;
  }
}

export class Boss5 extends Boss
{
  constructor(game) {
    super(game);
    this.image = document.getElementById('boss');
  }

  start() {
    super.start();
    this.speedX = Math.random() * 4 - 2;
    this.speedY = Math.random() * 0.8 + 0.5;
    this.lives = 30;
    this.maxlives = 30;
    this.frameY = 4;
  }
}

export class Boss6 extends Boss
{
  constructor(game) {
    super(game);
    this.image = document.getElementById('boss');
  }

  start() {
    super.start();
    this.speedX = Math.random() * 4 - 2;
    this.speedY = Math.random() * 0.8 + 0.5;
    this.lives = 35;
    this.maxlives = 35;
    this.frameY = 5;
  }
}

export class Boss7 extends Boss
{
  constructor(game) {
    super(game);
    this.image = document.getElementById('boss');
  }

  start() {
    super.start();
    this.speedX = Math.random() * 4 - 2;
    this.speedY = Math.random() * 0.8 + 0.5;
    this.lives = 40;
    this.maxlives = 40;
    this.frameY = 6;
  }
}

export class Boss8 extends Boss
{
  constructor(game) {
    super(game);
    this.image = document.getElementById('boss');
  }

  start() {
    super.start();
    this.speedX = Math.random() * 4 - 2;
    this.speedY = Math.random() * 0.8 + 0.5;
    this.lives = 45;
    this.maxlives = 45;
    this.frameY = 7;
  }
}