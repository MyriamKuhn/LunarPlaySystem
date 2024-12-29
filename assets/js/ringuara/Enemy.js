/**********/

/* ENNEMI */

/**********/
export class Enemy {
  constructor(game) {
    this.game = game;
    this.positions = this.game.findTilePositions('dot');
    this.randomIndex = Math.floor(Math.random() * this.positions.length);
    this.originX = this.positions[this.randomIndex].x;
    this.originY = this.positions[this.randomIndex].y;
    this.x = this.originX;
    this.y = this.originY;
    this.width = this.game.cellSize;
    this.height = this.game.cellSize;
    this.frameX = 0;
    this.frameY = 0;
    this.speed = this.game.cellSize * 0.04;
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
    this.chaseDuration = 3000;
    this.noEffect = false;
    this.noEffectDuration = 5000;
    this.noDamages = false;
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
      //this.game.context.drawImage(this.game.enemyImage, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height);
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
  }

  findPathToPatrolPoint() {
    const targetPoint = this.patrolPath[this.currentPatrolIndex];
    const targetCell = this.game.gameGrid[Math.floor(targetPoint.y / this.game.cellSize)][Math.floor(targetPoint.x / this.game.cellSize)];
    const enemyCell = this.game.gameGrid[Math.floor(this.y / this.game.cellSize)][Math.floor(this.x / this.game.cellSize)];

    this.path = this.game.aStar(enemyCell, targetCell);
    this.currentIndex = 0;
  }

  findPathToPlayer() {
    const playerCell = this.game.gameGrid[Math.floor(this.game.player.y / this.game.cellSize)][Math.floor(this.game.player.x / this.game.cellSize)];
    const enemyCell = this.game.gameGrid[Math.floor(this.y / this.game.cellSize)][Math.floor(this.x / this.game.cellSize)];
  
    this.path = this.game.aStar(enemyCell, playerCell);
    this.currentIndex = 0;
  }
  
  move() {
    if (this.path.length > 0 && this.currentIndex < this.path.length) {
      const targetCell = this.path[this.currentIndex];
      const dx = targetCell.x - this.x;
      const dy = targetCell.y - this.y;
  
      if (Math.abs(dx) < this.speed && Math.abs(dy) < this.speed) {
        this.x = targetCell.x;
        this.y = targetCell.y;
        this.currentIndex++;
      } else {
        const angle = Math.atan2(dy, dx);
        this.x += Math.cos(angle) * this.speed;
        this.y += Math.sin(angle) * this.speed;
      }
    }
  }

  updateState(deltaTime) {
    this.stateTimer += deltaTime;

    if (this.state === "patrolling") {
      if (this.stateTimer > Math.random() * 10000 + 5000) { // Changer d'état aléatoirement après 3-8 secondes
        this.state = "chasing";
        this.stateTimer = 0;
        this.findPathToPlayer();
      }
    } else if (this.state === "chasing") {
      if (this.stateTimer > this.chaseDuration) { // Revenir à la patrouille après 3 secondes
        this.state = "patrolling";
        this.stateTimer = 0;
        this.findPathToPatrolPoint();
      }
    }
  }

  patrol() {
    if (this.path.length === 0 || this.currentIndex >= this.path.length) {
      this.currentPatrolIndex = (this.currentPatrolIndex + 1) % this.patrolPath.length; // Passer au prochain point
      this.findPathToPatrolPoint();
    }
    this.move();
  }

  chase() {
    if (this.path.length === 0 || this.currentIndex >= this.path.length) {
      this.findPathToPlayer();
    }
    this.move();
  }

  hitPlayer() {
    if (this.game.checkCollision(this, this.game.player)) {
      if (!this.noEffect) {
        this.game.lives--;
        this.game.score -= 100;
        this.noDamages = true;
        setTimeout(() => {
          this.noDamages = false;
        }, 1000);
      } else if (this.noEffect) {
        this.game.score += 50;
        this.reset();
      }
    }
  }

  update(deltaTime) {
    this.updateState(deltaTime);

    if (this.state === "patrolling") {
      this.patrol();
    } else if (this.state === "chasing") {
      this.chase();
    }

    if (!this.noDamages) this.hitPlayer();
  }
}