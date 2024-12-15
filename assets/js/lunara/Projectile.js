/**************/

/* PROJECTILE */

/**************/
export class Projectile {
  constructor(x, y, game, defender) {
    this.game = game;
    this.defender = defender;
    this.x = x;
    this.y = y;
    this.width = this.game.cellSize / this.game.projectilesTypes[this.defender].size;
    this.height = this.game.cellSize / this.game.projectilesTypes[this.defender].size;
    this.power = this.game.projectilesTypes[this.defender].power;
    this.speed = this.game.projectilesTypes[this.defender].speed;
    this.image = this.game.projectilesTypes[this.defender].element;
  }

  update(deltaTime) {
    this.x += this.speed * (deltaTime / 1000);

    const enemy = this.game.enemies.find(enemy => {
      return this.game.checkCollision(this, enemy);
    });

    if (enemy) {
      if (this.defender === 5 && !enemy.slowed) {
        enemy.slowed = true;
        setTimeout(() => {
          if (this.game.enemies.includes(enemy)) enemy.slowed = false;
        }, 5000);
      }

      if (this.defender === 6) {
        enemy.health -= this.power; 
        return;
      }

      if (this.defender === 7 && !enemy.inFire && !enemy.slower) {
        enemy.inFire = true;
        enemy.slower = true;
        const power = this.power;
        const interval = setInterval(() => {
          if (this.game.enemies.includes(enemy)) {
            enemy.health -= power;
          } else {
            clearInterval(interval);
          }
        }, 1000);

        setTimeout(() => {
          if (this.game.enemies.includes(enemy)) {
            enemy.inFire = false;
            enemy.slower = false;
          }
        }, 5000);

        this.removeProjectile();
        return;
      }

      enemy.health -= this.power;
      this.removeProjectile();
    }

    if (this.x > this.game.width - (this.game.cellSize / 10)) {
      this.removeProjectile();
    }
  }

  draw() {
    this.game.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    if (this.game.debug) {
      this.game.ctx.fillStyle = 'black';
      this.game.ctx.beginPath();
      this.game.ctx.arc(this.x, this.y, this.width, 0, Math.PI * 2);
      this.game.ctx.fill();
    }
  }

  removeProjectile() {
    const positionIndex = this.game.projectiles.indexOf(this);
    if (positionIndex !== -1) {
      this.game.projectiles.splice(positionIndex, 1);
    }
  }
}