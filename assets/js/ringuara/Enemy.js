/***********/

/* IMPORTS */

/***********/
import { FloatingMessage } from '/assets/js/ringuara/FloatingMessage.js';


/**********/

/* ENNEMI */

/**********/
export class Enemy {
  constructor(game, type) {
    this.game = game;
    this.type = this.game.enemiesTypes[type];
    this.positions = this.game.dotsPositions;
    this.spawnedPositions = this.positions.filter(position => position.spawn === true);
    this.randomIndex = Math.floor(Math.random() * this.spawnedPositions.length);
    this.originX = this.spawnedPositions[this.randomIndex].x;
    this.originY = this.spawnedPositions[this.randomIndex].y;
    this.x = this.originX;
    this.y = this.originY;
    this.originSize = 32;
    this.width = this.game.cellSize;
    this.height = this.game.cellSize;
    this.image = this.type.image;
    this.frameX = 0;
    this.maxFrameX = 9;
    this.frameY = 0;
    this.speed = this.game.cellSize * this.type.speed;
    this.health = this.type.health;
    this.scorePoints = this.type.scorePoints;
    this.state = 'patrolling';
    this.stateTimer = 0;
    this.patrolPath = [];
    for (let i = 0; i < 10; i++) {
      const randomIndex = Math.floor(Math.random() * this.positions.length);
      this.patrolPath.push(this.positions[randomIndex]);
    }
    this.currentPatrolIndex = 0;
    this.path = [];
    this.currentIndex = 0;
    this.chaseDuration = this.type.chaseDuration;
    this.noEffect = false;
    this.noDamages = false;
    this.scored = false;
    this.wasHit = false;
    this.hitExplosions;
  }

  draw() {
    if (this.game.debug) {
      this.game.context.fillStyle = 'red';
      this.game.context.fillRect(this.x, this.y, this.width, this.height);
      if (this.noEffect) {
        this.game.context.fillStyle = 'rgb(0, 255, 85)';
        this.game.context.fillRect(this.x, this.y, this.width, this.height);
      }
    } else {
      this.frameY = this.noEffect ? 1 : 0;
      this.game.context.drawImage(this.image, this.frameX * this.originSize, this.frameY * this.originSize, this.originSize, this.originSize, this.x, this.y, this.width, this.height);
    }
  }

  reset() {
    this.state = 'patrolling';
    this.stateTimer = 0;
    this.patrolPath = [];
    for (let i = 0; i < 10; i++) {
      const randomIndex = Math.floor(Math.random() * this.positions.length);
      this.patrolPath.push(this.positions[randomIndex]);
    }
    this.currentPatrolIndex = 0;
    this.path = [];
    this.currentIndex = 0;
    this.x = this.originX;
    this.y = this.originY;
    this.noEffect = false;
    this.noDamages = false;
    this.game.score += this.scorePoints * 0.25;
    this.game.floatingMessages.push(new FloatingMessage('+ ' + this.scorePoints * 0.25 + ' ' + this.game.pointsTranslation, this.game.player.x, this.game.player.y, this.game.bigFontSize, 'green', this.game));
  }

  findPathTo(target) {
    const targetCell = this.game.gameGrid[Math.floor(target.y / this.width)][Math.floor(target.x / this.width)];
    const enemyCell = this.game.gameGrid[Math.floor(this.y / this.width)][Math.floor(this.x / this.width)];

    this.path = this.game.aStar(enemyCell, targetCell);
    this.currentIndex = 0;
  }
  
  move() {
    if (this.path.length > 0 && this.currentIndex < this.path.length && this.state !== "dead") {
      const targetCell = this.path[this.currentIndex];
      const dx = targetCell.x - this.x;
      const dy = targetCell.y - this.y;

      // Vérifier si l'ennemi a atteint la cellule cible
      if (Math.abs(dx) < this.speed && Math.abs(dy) < this.speed) {
        this.x = targetCell.x;
        this.y = targetCell.y;
        this.currentIndex++;
      } else {
        // Calculer l'angle entre l'ennemi et la cellule cible
        const angle = Math.atan2(dy, dx);
        // Déplacer l'ennemi vers la cellule cible
        this.x += Math.cos(angle) * this.speed;
        this.y += Math.sin(angle) * this.speed;
        // Modifier la frame en fonction de la direction
        this.updateDirection(dx, dy);
      }
    }
  }

  updateDirection(dx, dy) {
    const directionMap = {
      right: 2,
      left: 1,
      down: 4,
      up: 3,
    };
    
    if (dx > 0) this.frameX = directionMap.right;
    else if (dx < 0) this.frameX = directionMap.left;
    else if (dy > 0) this.frameX = directionMap.down;
    else if (dy < 0) this.frameX = directionMap.up;
  }

  updateState(deltaTime) {
    this.stateTimer += deltaTime;

    switch (this.state) {
      case 'patrolling':
        if (this.stateTimer > Math.random() * 10000 + 5000) {
          this.state = 'chasing';
          this.stateTimer = 0;
          this.findPathTo(this.game.player);
        }
        break;
      case 'chasing':
        if (this.stateTimer > this.chaseDuration || this.noEffect) {
          this.state = 'patrolling';
          this.stateTimer = 0;
          this.findPathTo(this.patrolPath[this.currentPatrolIndex]);
        }
        break;
      case 'dead':
        if (this.game.eventUpdate) {
          if (this.frameX < this.maxFrameX) {
            this.frameX++;
          } else {
            // Supprimer l'ennemi une fois l'animation terminée
            const index = this.game.enemyPool.indexOf(this);
            if (index !== -1) this.game.enemyPool.splice(index, 1);
          }
        }
        break;
      default:
        break;
    }
  }

  patrol() {
    if (this.path.length === 0 || this.currentIndex >= this.path.length) {
      this.currentPatrolIndex = (this.currentPatrolIndex + 1) % this.patrolPath.length; // Passer au prochain point
      this.findPathTo(this.patrolPath[this.currentPatrolIndex]);
    }
    this.move();
  }

  chase() {
    if (this.path.length === 0 || this.currentIndex >= this.path.length) {
      this.findPathTo(this.game.player);
    }
    this.move();
  }

  hitPlayer() {
    if (this.game.checkCollision(this, this.game.player)) {
      if (!this.noEffect) {
        this.game.lives--;
        this.game.floatingMessages.push(new FloatingMessage('- 1 ' + this.game.liveTranslation, this.game.player.x, this.game.player.y, this.game.bigFontSize, 'orangered', this.game));
        this.noDamages = true;
        setTimeout(() => {
          this.noDamages = false;
        }, 1000);
      } else if (this.noEffect) {
        this.reset();
      }
    }
  }

  bombHit() {
    if (this.game.explosions.length > 0) {
      for (const explosion of this.game.explosions) {
        if (explosion.isActive && this.checkCollision(this, explosion)) {
          if (!this.hitExplosions) {
            this.hitExplosions = new Set(); // Initialiser si non défini
          }
          if (!this.hitExplosions.has(explosion)) { // Vérifier si cette explosion a déjà touché
            this.hitExplosions.add(explosion); // Ajouter cette explosion à la liste
            this.health--;
            if (this.health <= 0) {
              this.state = "dead"; // Passer à l'état mort
              if (!this.scored) { // Vérifier si les points ont déjà été donnés
                this.game.score += this.scorePoints; // Donner les points
                this.game.floatingMessages.push(new FloatingMessage('+ ' + this.scorePoints + ' ' + this.game.pointsTranslation, this.game.player.x, this.game.player.y, this.game.bigFontSize, 'green', this.game));
                this.scored = true; // Empêcher de redonner les points
              }
            }
          }
        break; // Quitter la boucle après avoir trouvé une collision
        }
      }
    }
  }

  checkCollision(enemy, explosion) {
    // Calculer les limites de l'explosion dans les quatre directions
    const explosionLeft = explosion.x - explosion.explosionRadius * this.game.cellSize;
    const explosionRight = explosion.x + explosion.explosionRadius * this.game.cellSize;
    const explosionTop = explosion.y - explosion.explosionRadius * this.game.cellSize;
    const explosionBottom = explosion.y + explosion.explosionRadius * this.game.cellSize;

    // Vérifier si l'ennemi touche directement l'explosion (dans la direction de l'explosion)
    const isEnemyInExplosion = (
      (enemy.x === explosion.x && enemy.y >= explosionTop && enemy.y <= explosionBottom) || // Haut-Bas
      (enemy.y === explosion.y && enemy.x >= explosionLeft && enemy.x <= explosionRight)     // Gauche-Droite
    );
  
    return isEnemyInExplosion;
  }

  update(deltaTime) {
    this.updateState(deltaTime);

    if (this.state !== "dead") {
      if (this.state === "patrolling") {
        this.patrol();
      } else if (this.state === "chasing") {
        this.chase();
      } 
  
      if (!this.noDamages) this.hitPlayer();
      if (!this.noEffect) this.bombHit();
    }
  }
}