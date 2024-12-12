/***********/

/* IMPORTS */

/***********/
import { Cell } from '/assets/js/lunara/Cell.js';
import { Defender } from '/assets/js/lunara/Defender.js';
import { Enemy } from '/assets/js/lunara/Enemy.js';
import { Resource } from '/assets/js/lunara/Resource.js';
import { FloatingMessage } from '/assets/js/lunara/FloatingMessage.js';


/******************/

/* MOTEUR DE JEU */

/******************/
export class Game {
  constructor(canvas, context) {
    this.canvas = canvas;
    this.ctx = context;
    this.width = this.canvas.width;
    this.height = this.canvas.height;

    this.cellSize = 150;
    this.cellGap = 3;
    this.gameGrid = [];

    this.createGrid();

    this.controlsBar = {
      width: this.width,
      height: this.cellSize
    };

    this.mouse = {
      x: undefined,
      y: undefined,
      width: 0.1,
      height: 0.1, 
      clicked: false
    };

    this.defenders = [];
    this.numberOfResources = 300;
    this.amounts = [20, 30, 40];
    this.resources = [];
    this.defender1 = document.getElementById('defender1');
    this.defender2 = document.getElementById('defender2');
    this.chosenDefender = 1;

    this.enemies = [];
    this.enemyPositions = [];
    this.enemyTypes = [];
    this.enemy1 = document.getElementById('enemy1');
    this.enemy2 = document.getElementById('enemy2');
    this.enemyTypes.push(this.enemy1);
    this.enemyTypes.push(this.enemy2);
    this.enemiesInterval = 600;
    this.frame = 0;

    this.projectiles = [];

    this.gameOver = false;
    this.score = 0;
    this.winningScore = 50;

    this.floatingMessages = [];

    this.card1 = {
      x: 10,
      y: 10,
      width: 70,
      height: 85,
      stroke: 'black',
    };

    this.card2 = {
      x: 90,
      y: 10,
      width: 70,
      height: 85,
      stroke: 'black',
    };

    this.paused = false;
    this.debug = false;

    this.canvasPosition = this.canvas.getBoundingClientRect();

    this.canvas.addEventListener('mousemove', (e) => {
      this.mouse.x = e.x - this.canvasPosition.left;
      this.mouse.y = e.y - this.canvasPosition.top;
    });
    this.canvas.addEventListener('mouseleave', () => {
      this.mouse.x = undefined;
      this.mouse.y = undefined;
    });
    this.canvas.addEventListener('mousedown', () => {
      this.mouse.clicked = true;
    });
    this.canvas.addEventListener('mouseup', () => {
      this.mouse.clicked = false;
    });
    this.canvas.addEventListener('click', () => {
      const gridPositionX = this.mouse.x - (this.mouse.x % this.cellSize) + this.cellGap;
      const gridPositionY = this.mouse.y - (this.mouse.y % this.cellSize) + this.cellGap;
      if (gridPositionY < this.cellSize) return;
      for (let i = 0; i < this.defenders.length; i++) {
        if (this.defenders[i].x === gridPositionX && this.defenders[i].y === gridPositionY) return;
      }
      let defenderCost = 100;
      if (this.numberOfResources >= defenderCost) {
        this.defenders.push(new Defender(gridPositionX, gridPositionY, this));
        this.numberOfResources -= defenderCost;
      } else {
        this.floatingMessages.push(new FloatingMessage('Need more resources', this.mouse.x, this.mouse.y, 20, 'blue', this));
      }
    });
    window.addEventListener('resize', (e) => {
      this.canvasPosition = this.canvas.getBoundingClientRect();
      this.checkOrientation(e.currentTarget.innerWidth, e.currentTarget.innerHeight);
    });

    this.checkOrientation(window.innerWidth, window.innerHeight);
  }

  checkOrientation(width, height) {
    const isPortrait = height > width;
    const overlay = document.getElementById('orientation-overlay');
    const controls = document.querySelector('.controls');
    
    if (isPortrait) {
      overlay.style.display = 'flex'; 
      controls.style.pointerEvents = 'auto';
      controls.classList.remove('hidden');
    } else {
      overlay.style.display = 'none'; 
      controls.style.pointerEvents = 'none';
      controls.classList.add('hidden');
    }
  }

  render() {
    if (this.paused || this.gameOver) {
      this.drawPauseScreen();
      return;
    }
    this.drawStatusText();
    this.handleGameGrid();
    this.handleDefenders();
    this.handleResources();
    this.handleProjectiles();
    this.handleEnemies();
    this.chooseDefender();
    this.handleFloatingMessages();
    this.frame++;
  }

  drawStatusText() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    //this.ctx.fillStyle = 'transparent';
    //this.ctx.fillRect(0, 0, this.controlsBar.width, this.controlsBar.height);

    this.ctx.fillStyle = 'gold';
    this.ctx.font = '30px Orbitron';
    this.ctx.fontweight = 'bold';
    this.ctx.fillText('Score: ' + this.score, 180, 40);
    this.ctx.fillText('Resources: ' + this.numberOfResources, 180, 80);

    if (this.score >= this.winningScore && this.enemies.length === 0) {
      this.ctx.fillStyle = 'black';
      this.ctx.font = '90px Orbitron';
      this.ctx.fontweight = 'bold';
      this.ctx.fillText('LEVEL COMPLETE', this.width / 2 - 350, this.height / 2);
      this.ctx.font = '50px Orbitron';
      this.ctx.fillText('You win with ' + this.score + ' points!', this.width / 2 - 250, this.height / 2 + 60);
    }
  }

  drawPauseScreen() {
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    this.ctx.fillRect(0, 0, this.width, this.height);
    this.ctx.fillStyle = 'white';
    this.ctx.font = '90px Orbitron';
    this.ctx.fontweight = 'bold';

    if (this.gameOver) {
      this.ctx.fillText('GAME OVER', this.width / 2 - 180, this.height / 2);
    }
    if (this.paused) {
      this.ctx.fillText('PAUSE', this.width / 2 - 100, this.height / 2);
    }
  }

  createGrid() {
    for (let y = this.cellSize; y < this.height; y += this.cellSize) {
      for (let x = 0; x < this.width; x += this.cellSize) {
        this.gameGrid.push(new Cell(x, y, this));
      }
    }
  }

  handleGameGrid() {
    for (let i = 0; i < this.gameGrid.length; i++) {
      this.gameGrid[i].draw();
    }
  }

  handleDefenders() {
    for (let i = 0; i < this.defenders.length; i++) {
      this.defenders[i].draw();
      this.defenders[i].update();
      if (this.enemyPositions.indexOf(this.defenders[i].y) !== -1) {
        this.defenders[i].shooting = true;
      } else {
        this.defenders[i].shooting = false;
      }
      for (let j = 0; j < this.enemies.length; j++) {
        if (this.defenders[i] && this.collision(this.defenders[i], this.enemies[j])) {
          this.enemies[j].movement = 0;
          this.defenders[i].health -= 1;
        }
        if (this.defenders[i] && this.defenders[i].health <= 0) {
          this.defenders.splice(i, 1);
          i--;
          this.enemies[j].movement = this.enemies[j].speed;
        }
      }
    }
  }

  handleEnemies() {
    for (let i = 0; i < this.enemies.length; i++) {
      this.enemies[i].update();
      this.enemies[i].draw();
      if (this.enemies[i].x < 0) {
        this.gameOver = true;
      }
      if (this.enemies[i].health <= 0) {
        let gainedResources = this.enemies[i].maxHealth / 10;
        this.floatingMessages.push(new FloatingMessage('+' + gainedResources, this.enemies[i].x + 20, this.enemies[i].y + 20, 20, 'black', this));
        this.floatingMessages.push(new FloatingMessage('+' + gainedResources, 450, 50, 20, 'gold', this));
        this.numberOfResources += gainedResources;
        this.score += gainedResources;
        const findThisIndex = this.enemyPositions.indexOf(this.enemies[i].y);
        this.enemyPositions.splice(findThisIndex, 1);
        this.enemies.splice(i, 1);
        i--;
      }
    }
    if (this.frame % this.enemiesInterval === 0 && this.score < this.winningScore) {
      let verticalPosition = Math.floor(Math.random() * 5 + 1) * this.cellSize + this.cellGap;
      this.enemies.push(new Enemy(verticalPosition, this));
      this.enemyPositions.push(verticalPosition);
      if (this.enemiesInterval > 120) this.enemiesInterval -= 50;
    }
  }

  handleProjectiles() {
    for (let i = 0; i < this.projectiles.length; i++) {
      this.projectiles[i].update();
      this.projectiles[i].draw();

      for (let j = 0; j < this.enemies.length; j++) {
        if (this.enemies[j] && this.projectiles[i] && this.collision(this.projectiles[i], this.enemies[j])) {
          this.enemies[j].health -= this.projectiles[i].power;
          this.projectiles.splice(i, 1);
          i--;
        }
      }
      
      if (this.projectiles[i] && this.projectiles[i].x > this.width - this.cellSize) {
        this.projectiles.splice(i, 1);
        i--;
      }
    }
  }

  handleResources() {
    if (this.frame % 500 === 0 && this.score < this.winningScore) {
      this.resources.push(new Resource(this));
    }
    for (let i = 0; i < this.resources.length; i++) {
      this.resources[i].draw();
      if (this.resources[i] && this.mouse.x && this.mouse.y && this.collision(this.resources[i], this.mouse)) {
        this.numberOfResources += this.resources[i].amount;
        this.floatingMessages.push(new FloatingMessage('+' + this.resources[i].amount, this.resources[i].x, this.resources[i].y, 20, 'black', this));
        this.floatingMessages.push(new FloatingMessage('+' + this.resources[i].amount, 450, 50, 20, 'gold', this));
        this.resources.splice(i, 1);
        i--;
      }
    }
  }

  handleFloatingMessages() {
    for (let i = 0; i < this.floatingMessages.length; i++) {
      this.floatingMessages[i].update();
      this.floatingMessages[i].draw();
      if (this.floatingMessages[i].lifeSpan >= 50) {
        this.floatingMessages.splice(i, 1);
        i--;
      }
    }
  }

  chooseDefender() {
    if (this.collision(this.card1, this.mouse) && this.mouse.clicked) {
      this.chosenDefender = 1;
    } else if (this.collision(this.card2, this.mouse) && this.mouse.clicked) {
      this.chosenDefender = 2;
    }

    if (this.chosenDefender === 1) {
      this.card1.stroke = 'white';
      this.card2.stroke = 'black';
    } else if (this.chosenDefender === 2) {
      this.card2.stroke = 'white';
      this.card1.stroke = 'black';
    } else {
      this.card1.stroke = 'black';
      this.card2.stroke = 'black';
    }

    this.ctx.lineWidth = 1;
    this.ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
    this.ctx.fillRect(this.card1.x, this.card1.y, this.card1.width, this.card1.height);
    this.ctx.strokeStyle = this.card1.stroke;
    this.ctx.strokeRect(this.card1.x, this.card1.y, this.card1.width, this.card1.height);
    this.ctx.drawImage(this.defender1, 0, 0, 225, 225, 5, 15, 80, 80);
    this.ctx.fillRect(this.card2.x, this.card2.y, this.card2.width, this.card2.height);
    this.ctx.strokeStyle = this.card2.stroke;
    this.ctx.strokeRect(this.card2.x, this.card2.y, this.card2.width, this.card2.height);
    this.ctx.drawImage(this.defender2, 0, 0, 225, 225, 85, 15, 80, 80);
  }

  collision(first, second) {
    if (!(first.x > second.x + second.width || first.x + first.width < second.x || first.y > second.y + second.height || first.y + first.height < second.y)) {
      return true;
    };
  }
}
