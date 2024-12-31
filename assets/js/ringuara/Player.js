/**********/

/* JOUEUR */

/**********/
export class Player {
  constructor(game) {
    this.game = game;
    this.position;
    this.originSize = 32;
    this.width = this.game.cellSize;
    this.height = this.game.cellSize;
    this.x;
    this.y;
    this.frameX;
    this.frameY;
    this.speed; 
    this.direction; 
    this.isAligned; 
    this.noEffectDuration;
    this.image = this.game.playerImage;
  }

  init(speed, noEffectDuration) {
    this.position = this.game.findTilePositions('start');
    this.x = this.position[0].x;
    this.y = this.position[0].y;
    this.frameX = 0;
    this.frameY = 0;
    this.isAligned = false;
    this.direction = null; 
    this.speed = this.game.cellSize * speed;
    this.noEffectDuration = noEffectDuration;
  }

  draw() {
    if (this.game.debug) {
      this.game.context.fillStyle = 'blue';
      this.game.context.fillRect(this.x, this.y, this.width, this.height);
    } else {
      this.game.context.drawImage(this.image, this.frameX * this.originSize, this.frameY * this.originSize, this.originSize, this.originSize, this.x, this.y, this.width, this.height);
    }
  }

  move() {
    if (!this.isAligned) {
      this.alignToCell();
      this.isAligned = true;
    }

    switch (this.direction) {
      case 'ArrowUp':
        this.moveUp();
        this.frameX = 3;
        break;
      case 'ArrowDown':
        this.moveDown();
        this.frameX = 4;
        break;
      case 'ArrowLeft':
        this.moveLeft();
        this.frameX = 1;
        break;
      case 'ArrowRight':
        this.moveRight();
        this.frameX = 2;
        break;
      case null:
        this.frameX = 0;
        break;
      default:
        this.frameX = 0;
        break;
    }
  }

  moveLeft() {
    const startX = Math.floor(this.x / this.game.cellSize);  // Calculer la colonne actuelle du joueur
    const startY = Math.floor(this.y / this.game.cellSize);  // Calculer la ligne actuelle du joueur
    
    // Vérifier chaque cellule à gauche de la position actuelle du joueur
    for (let col = startX; col >= 0; col--) {
      const cell = this.game.gameGrid[startY][col];
      if (cell.type === 'wall') {
        // Si on trouve un mur, on arrête de déplacer le joueur et on calcule la position juste avant le mur
        const wallX = col * this.game.cellSize + this.game.cellSize;
        if (this.x - this.speed < wallX) {
          // Si la prochaine position est avant le mur, on place le joueur juste avant ce mur
          this.x = wallX;
          this.direction = null;
        } else {
          // Sinon, on continue de déplacer le joueur normalement
          this.x -= this.speed;
        }
        break;
      }

      if (cell.type === 'teleport') {
        this.x -= this.speed;
        if (this.x < 0) {
          this.x = this.game.width - this.width;  // Réapparaître à droite
        }
        break;
      }

      if (cell.type === 'dot' && !cell.isDotEaten && this.x < cell.x + this.width && this.x + this.width > cell.x) {
        cell.isDotEaten = true;
        cell.type = 'empty';
        cell.walkable = true;
        this.game.score++;
        this.x -= this.speed;
      }

      if (cell.type === 'bigDot' && !cell.isDotEaten && this.x < cell.x + this.width && this.x + this.width > cell.x) {
        cell.isDotEaten = true;
        cell.type = 'empty';
        cell.walkable = true;
        this.game.score += 10;
        this.game.enemyPool.forEach(enemy => {
          enemy.noEffect = true;
          setTimeout(() => {
            enemy.noEffect = false;
          }, this.noEffectDuration);
        });
      }
    }
  }

  moveRight() {
    const startX = Math.floor(this.x / this.game.cellSize);
    const startY = Math.floor(this.y / this.game.cellSize);
  
    // Vérifier chaque cellule à droite de la position actuelle du joueur
    for (let col = startX; col < this.game.gameGrid[0].length; col++) {
      const cell = this.game.gameGrid[startY][col];
      if (cell.type === 'wall') {
        const wallX = col * this.game.cellSize - this.game.cellSize;
        if (this.x + this.speed > wallX) {
          this.x = wallX;
          this.direction = null;
        } else {
          this.x += this.speed;
        }
        break;
      }

      if (cell.type === 'teleport') {
        this.x += this.speed;
        if (this.x + this.width >= this.game.width) {
          this.x = 0;  // Réapparaître à gauche
        }
        break;
      }

      if (cell.type === 'dot' && !cell.isDotEaten && this.x + this.width > cell.x && this.x < cell.x + this.width) {
        cell.isDotEaten = true;
        cell.type = 'empty';
        cell.walkable = true;
        this.game.score++;
        this.x += this.speed;
      }

      if (cell.type === 'bigDot' && !cell.isDotEaten && this.x + this.width > cell.x && this.x < cell.x + this.width) {
        cell.isDotEaten = true;
        cell.type = 'empty';
        cell.walkable = true;
        this.game.score += 10;
        this.game.enemyPool.forEach(enemy => {
          enemy.noEffect = true;
          setTimeout(() => {
            enemy.noEffect = false;
          }, this.noEffectDuration);
        });
      }
    }
  }

  moveUp() {
    const startX = Math.floor(this.x / this.game.cellSize);
    const startY = Math.floor(this.y / this.game.cellSize);

    // Vérifier chaque cellule vers le haut
    for (let row = startY; row >= 0; row--) {
      const cell = this.game.gameGrid[row][startX];
      if (cell.type === 'wall') {
        const wallY = row * this.game.cellSize + this.game.cellSize;
        if (this.y - this.speed < wallY) {
          this.y = wallY;
          this.direction = null;
        } else {
          this.y -= this.speed;
        }
        break;
      }

      if (cell.type === 'teleport') {
        this.y -= this.speed;
        if (this.y < 0) {
          this.y = this.game.height - this.height;  // Réapparaître en bas
        }
        break;
      }

      if (cell.type === 'dot' && !cell.isDotEaten && this.y < cell.y + this.height && this.y + this.height > cell.y) {
        cell.isDotEaten = true;
        cell.type = 'empty';
        cell.walkable = true;
        this.game.score++;
        this.y -= this.speed;
      }

      if (cell.type === 'bigDot' && !cell.isDotEaten && this.y < cell.y + this.height && this.y + this.height > cell.y) {
        cell.isDotEaten = true;
        cell.type = 'empty';
        cell.walkable = true;
        this.game.score += 10;
        this.game.enemyPool.forEach(enemy => {
          enemy.noEffect = true;
          setTimeout(() => {
            enemy.noEffect = false;
          }, this.noEffectDuration);
        });
      }
    }
  }

  moveDown() {
    const startX = Math.floor(this.x / this.game.cellSize);
    const startY = Math.floor(this.y / this.game.cellSize);
    
    // Vérifier chaque cellule vers le bas
    for (let row = startY; row < this.game.gameGrid.length; row++) {
      const cell = this.game.gameGrid[row][startX];
      if (cell.type === 'wall') {
        const wallY = row * this.game.cellSize - this.game.cellSize;
        if (this.y + this.speed > wallY) {
          this.y = wallY;
          this.direction = null;
        } else {
          this.y += this.speed;
        }
        break;
      }

      if (cell.type === 'teleport') {
        this.y += this.speed;
        if (this.y + this.height >= this.game.height) {
          this.y = 0;  // Réapparaître en haut
        }
        break;
      }

      if (cell.type === 'dot' && !cell.isDotEaten && this.y + this.height > cell.y && this.y < cell.y + this.height) {
        cell.isDotEaten = true;
        cell.type = 'empty';
        cell.walkable = true;
        this.game.score++;
        this.y += this.speed;
      }

      if (cell.type === 'bigDot' && !cell.isDotEaten && this.y + this.height > cell.y && this.y < cell.y + this.height) {
        cell.isDotEaten = true;
        cell.type = 'empty';
        cell.walkable = true;
        this.game.score += 10;
        this.game.enemyPool.forEach(enemy => {
          enemy.noEffect = true;
          setTimeout(() => {
            enemy.noEffect = false;
          }, this.noEffectDuration);
        });
      }
    }
  }

  drawBomb() {
    for (let i = 0; i < this.game.bombPool.length; i++) {
      const bomb = this.game.bombPool[i];
      if (bomb.free) {
        bomb.x = Math.round(this.x / this.game.cellSize) * this.game.cellSize;
        bomb.y = Math.round(this.y / this.game.cellSize) * this.game.cellSize;
        bomb.start();
        break;
      }
    }
  }
  
  // Aligner le joueur immédiatement sur la grille avant d'effectuer tout déplacement
  alignToCell() {
    this.x = Math.round(this.x / this.game.cellSize) * this.game.cellSize;
    this.y = Math.round(this.y / this.game.cellSize) * this.game.cellSize;
  }

  // Méthode pour définir une nouvelle direction
  setDirection(direction) {
      this.direction = direction;
      this.isAligned = false; // Réinitialiser l'alignement
  }

  // Méthode pour mettre à jour le joueur
  update() {
    this.move(); // Met à jour la position du joueur
  }
}