/***********/

/* IMPORTS */

/***********/
import { Enemy } from '/assets/js/aetheria/Enemy.js';


/**************/

/* EAGLEMORPH */

/**************/
export class EaglemorphOne extends Enemy {
  constructor(game) {
    super(game);
    this.image = document.getElementById('eaglemorph');
    this.lastFrame = 9; 
  }

  start() {
    super.start();
    this.speedX = Math.random() * 2 - 1;
    this.speedY = Math.random() * 0.5 + 0.2;
    this.lives = 3;
    this.maxlives = 3;
    this.frameY = 0;
  }

  hit() {
    if (this.game.checkCollision(this, this.game.mouse) && this.game.mouse.pressed && !this.game.mouse.fired) {
      this.game.sound.play('boom1');
      this.lives--;
      this.game.mouse.fired = true;
      this.frameX++;
      const projectile = this.game.getEnemyProjectile();
      if (projectile) {
        projectile.start(this.x + this.width * 0.5, this.y + this.height * 0.5);
      }
    }
  }

  update() {
    super.update();
    if (!this.free) {
      if (this.x <= 0 || this.x >= this.game.width - this.width) {
        this.speedX *= -1;
      }
      if (this.isAlive()) {
        this.hit();
      }
    }
  }
}

export class EaglemorphTwo extends Enemy {
  constructor(game) {
    super(game);
    this.image = document.getElementById('eaglemorph');
    this.lastFrame = 9; 
  }

  start() {
    super.start();
    this.speedX = Math.random() * 2 - 1;
    this.speedY = Math.random() * 0.5 + 0.3;
    this.lives = 3;
    this.maxlives = 3;
    this.frameY = 1;
  }

  hit() {
    if (this.game.checkCollision(this, this.game.mouse) && this.game.mouse.pressed && !this.game.mouse.fired) {
      this.game.sound.play('boom1');
      this.lives--;
      this.game.mouse.fired = true;
      this.frameX++;
      const projectile = this.game.getEnemyProjectile();
      if (projectile) {
        projectile.start(this.x + this.width * 0.5, this.y + this.height * 0.5);
      }
    }
  }

  update() {
    super.update();
    if (!this.free) {
      if (this.x <= 0 || this.x >= this.game.width - this.width) {
        this.speedX *= -1;
      }
      if (this.isAlive()) {
        this.hit();
      }
    }
  }
}

export class EaglemorphThree extends Enemy {
  constructor(game) {
    super(game);
    this.image = document.getElementById('eaglemorph');
    this.lastFrame = 9; 
  }

  start() {
    super.start();
    this.speedX = Math.random() * 2 - 1;
    this.speedY = Math.random() * 0.5 + 0.4;
    this.lives = 3;
    this.maxlives = 3;
    this.frameY = 2;
  }

  hit() {
    if (this.game.checkCollision(this, this.game.mouse) && this.game.mouse.pressed && !this.game.mouse.fired) {
      this.game.sound.play('boom1');
      this.lives--;
      this.game.mouse.fired = true;
      this.frameX++;
      const projectile = this.game.getEnemyProjectile();
      if (projectile) {
        projectile.start(this.x + this.width * 0.5, this.y + this.height * 0.5);
      }
    }
  }

  update() {
    super.update();
    if (!this.free) {
      if (this.x <= 0 || this.x >= this.game.width - this.width) {
        this.speedX *= -1;
      }
      if (this.isAlive()) {
        this.hit();
      }
    }
  }
}

export class EaglemorphFour extends Enemy {
  constructor(game) {
    super(game);
    this.image = document.getElementById('eaglemorph');
    this.lastFrame = 9; 
  }

  start() {
    super.start();
    this.speedX = Math.random() * 2 - 1;
    this.speedY = Math.random() * 0.5 + 0.5;
    this.lives = 3;
    this.maxlives = 3;
    this.frameY = 3;
  }

  hit() {
    if (this.game.checkCollision(this, this.game.mouse) && this.game.mouse.pressed && !this.game.mouse.fired) {
      this.game.sound.play('boom1');
      this.lives--;
      this.game.mouse.fired = true;
      this.frameX++;
      const projectile = this.game.getEnemyProjectile();
      if (projectile) {
        projectile.start(this.x + this.width * 0.5, this.y + this.height * 0.5);
      }
    }
  }

  update() {
    super.update();
    if (!this.free) {
      if (this.x <= 0 || this.x >= this.game.width - this.width) {
        this.speedX *= -1;
      }
      if (this.isAlive()) {
        this.hit();
      }
    }
  }
}