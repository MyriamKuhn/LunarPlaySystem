/************/

/* CELLULES */

/************/
export class Cell {
  constructor(x, y, game, mapData) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.width = this.game.cellSize;
    this.height = this.game.cellSize;
    this.dotSize = this.game.cellSize / 4;

    // Propriétés pour l'algorithme A*
    this.g = 0; // Coût du départ au nœud courant
    this.h = 0; // Estimation heuristique (distance au but)
    this.f = 0; // Somme de g + h
    this.parent = null; // Pour remonter le chemin

    switch (mapData) {
      case 0:
        this.type = 'empty';
        this.walkable = false;
        this.spawn = false;
        break;
      case 1:
        this.type = 'wall';
        this.walkable = false;
        this.spawn = false;
        break;
      case 2:
        this.type = 'start';
        this.walkable = true;
        this.spawn = false;
        break;
      case 3:
        this.type = 'dot';
        this.walkable = true;
        this.spawn = true;
        break;
      case 4:
        this.type = 'teleport';
        this.walkable = true;
        this.spawn = false;
        break;
      case 5:
        this.type = 'bigDot';
        this.walkable = true;
        this.spawn = false;
        break;
      case 6:
        this.type = 'dot';
        this.walkable = true;
        this.spawn = false;
        break;
      default:
        this.type = 'empty';
        this.walkable = false;
        this.spawn = false;
        break;
    }

    this.isDotEaten = false;
  }

  draw() {
    if (this.game.debug) {
      if (this.type === 'wall' || this.type === 'empty') {
        this.game.context.strokeStyle = 'rgba(255, 0, 0, 0.64)';
        this.game.context.strokeRect(this.x, this.y, this.width, this.height);
      } 
      if (this.type === 'teleport') {
        this.game.context.strokeStyle = 'rgba(0, 255, 0, 0.64)';
        this.game.context.strokeRect(this.x, this.y, this.width, this.height);
      }
    }
    if (this.type === 'dot' && !this.isDotEaten) {
      this.game.context.fillStyle = 'rgba(255, 255, 255, 0.64)';
      this.game.context.beginPath();
      this.game.context.arc(this.x + this.width / 2, this.y + this.height / 2, this.dotSize / 2, 0, Math.PI * 2);
      this.game.context.fill();
    }
    if (this.type === 'bigDot' && !this.isDotEaten) {
      this.game.context.fillStyle = 'rgba(255, 174, 0, 0.64)';
      this.game.context.beginPath();
      this.game.context.arc(this.x + this.width / 2, this.y + this.height / 2, this.dotSize, 0, Math.PI * 2);
      this.game.context.fill();
    }
  }
}