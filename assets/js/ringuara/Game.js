/***********/

/* IMPORTS */

/***********/
import { Background } from '/assets/js/ringuara/Background.js';
import { Player } from '/assets/js/ringuara/Player.js';
import { Cell } from '/assets/js/ringuara/Cell.js';
import { mapData } from '/assets/js/ringuara/mapData.js';


/******************/

/* MOTEUR DE JEU */

/******************/
export class Game {
  constructor(canvas, context) {
    this.canvas = canvas;
    this.context = context;
    this.width = canvas.width;
    this.height = canvas.height;
    this.maxWidth = 1024;
    this.maxHeight = 1024;
    this.originalWidth = 1024;
    this.originalHeight = 1024;
    this.ratio = this.originalWidth / this.originalHeight;

    this.background;
    this.gameGrid;
    this.cellSize;

    this.touchStartX;
    this.touchStartY;
    this.swipeDistance = 50;

    this.score;
    this.lives;
    this.level;
    this.gameOver;

    this.eventTimer = 0;
    this.eventUpdate = false;
    this.eventInterval = 100;

    this.playerImage = document.getElementById('player');
    this.dotImage = document.getElementById('dot');
    this.player;
    this.direction = null;

    this.debug = false;

    window.addEventListener('resize', () => this.init());

    this.canvas.addEventListener('touchstart', e => {
      this.touchStartX = e.changedTouches[0].pageX;
      this.touchStartY = e.changedTouches[0].pageY;
    }, { passive: false });
    this.canvas.addEventListener('touchmove', e => {
      e.preventDefault();
    });
    this.canvas.addEventListener('touchend', e => {
      if (e.changedTouches[0].pageX - this.touchStartX > this.swipeDistance) {
        this.player.setDirection('ArrowRight');
      } else if (e.changedTouches[0].pageX - this.touchStartX < -this.swipeDistance) {
        this.player.setDirection('ArrowLeft');
      } else if (e.changedTouches[0].pageY - this.touchStartY > this.swipeDistance) {
        this.player.setDirection('ArrowDown');
      } else if (e.changedTouches[0].pageY - this.touchStartY < -this.swipeDistance) {
        this.player.setDirection('ArrowUp');
      } else {
        //TODO: Placer la bombe
      }
    }, { passive: false });

    window.addEventListener('keydown', (e) => {
      if (e.key.toLowerCase() === 'r') this.init();
      if (e.key.toLowerCase() === 'd') this.debug = !this.debug;
      //if (e.key.toLowerCase() === 'm') this.sound.toggleMute();
      if (e.key.toLowerCase() === 'f') this.toggleFullScreen();
      if (e.key.toLowerCase() === 'b') window.location.href = '/' + lang + '/lunarplay/';
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        this.player.setDirection(e.key);
      }
    });
    this.resetButton = document.getElementById('resetButton');
    this.resetButton.addEventListener('click', e => {
      this.init();
    });
    this.resetButton.addEventListener('touchend', e => {
      e.preventDefault();
      this.init();
    }, { passive: false });
    this.fullScreenButton = document.getElementById('fullScreenButton');
    this.fullScreenButton.addEventListener('click', e => {
      this.toggleFullScreen();
    });
    this.fullScreenButton.addEventListener('touchend', e => {
      e.preventDefault();
      this.toggleFullScreen();
    }, { passive: false });
    this.backButton = document.getElementById('backButton');
    this.backButton.addEventListener('click', e => {
      window.location.href = '/' + lang + '/lunarplay/';
    });
    this.backButton.addEventListener('touchend', e => {
      e.preventDefault();
      window.location.href = '/' + lang + '/lunarplay/';
    }, { passive: false });
    this.volumeButton = document.getElementById('volumeButton');
    this.volumeButton.addEventListener('click', e => {
    //  this.sound.toggleMute();
    });
    this.volumeButton.addEventListener('touchend', e => {
      e.preventDefault();
    //  this.sound.toggleMute();
    }, { passive: false });

    this.init();
  }

  init() {
    const controls = document.querySelector('.controls');
    controls.style.pointerEvents = 'none';
    controls.classList.add('hidden');

    this.handleResize();

    this.bigFontSize = 32 * (this.width / this.originalWidth);

    this.background = new Background(document.getElementById('map1'), this, this.width, this.height);
    this.cellSize = this.width / 32;
    this.createGrid(mapData.map1);

    this.score = 0;
    this.lives = 3;
    this.level = 1;
    this.gameOver = false;

    this.player = new Player(this);
  }

  handleResize() {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    
    let newWidth = windowWidth;
    let newHeight = windowWidth / this.ratio;
    
    // Si la hauteur dépasse la limite, ajuster en fonction de la hauteur
    if (newHeight > windowHeight) {
      newHeight = windowHeight;
      newWidth = windowHeight * this.ratio;
    }
    
    // Limiter à la taille maximale (1350x900)
    newWidth = Math.min(newWidth, this.maxWidth);
    newHeight = Math.min(newHeight, this.maxHeight);

    // Appliquer les nouvelles dimensions au canevas
    this.width = newWidth;
    this.height = newHeight;

    this.canvas.width = this.width;
    this.canvas.height = this.height;
  }

  toggleFullScreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }

  createGrid(map) {
    const rows = 32; // Nombre de lignes
    const cols = 32; // Nombre de colonnes
    this.gameGrid = [];
  
    // Créer la grille 2D
    for (let i = 0; i < rows; i++) {
      const row = [];
      for (let j = 0; j < cols; j++) {
        const index = i * cols + j;
        const mapData = map[index];
        row.push(new Cell(j * this.cellSize, i * this.cellSize, this, mapData));
      }
      this.gameGrid.push(row); // Ajouter la ligne à la grille 2D
    }
  }

  handleGameGrid() {
    for (let row = 0; row < this.gameGrid.length; row++) {
      for (let col = 0; col < this.gameGrid[row].length; col++) {
        const cell = this.gameGrid[row][col];
        cell.update();
        cell.draw();
      }
    }
  }

  getCellAtPosition(x, y) {
    const col = Math.floor(x / this.cellSize);
    const row = Math.floor(y / this.cellSize);
  
    if (row >= 0 && row < this.gameGrid.length && col >= 0 && col < this.gameGrid[row].length) {
      return this.gameGrid[row][col]; // Accéder à la cellule directement
    }
    return null;
  }

  checkCollision(a, b) {
    return a.x < b.x + b.width &&
      a.x + a.width > b.x &&
      a.y < b.y + b.height &&
      a.y + a.height > b.y;
  }

  checkCircleRectCollision(circle, rect) {
    // Trouver le point le plus proche du centre du cercle sur le rectangle
    const closestX = Math.max(rect.x, Math.min(circle.x, rect.x + rect.width));
    const closestY = Math.max(rect.y, Math.min(circle.y, rect.y + rect.height));
  
    // Calculer la distance entre le centre du cercle et ce point
    const distanceX = circle.x - closestX;
    const distanceY = circle.y - closestY;
  
    // Si la distance est inférieure ou égale au rayon, il y a collision
    return (distanceX ** 2 + distanceY ** 2) <= (circle.radius ** 2);
  }

  findTilePositions(type) {
    const positions = [];
    for (let row = 0; row < this.gameGrid.length; row++) {
      for (let col = 0; col < this.gameGrid[row].length; col++) {
        const cell = this.gameGrid[row][col];
        if (cell.type === type) {
          const x = col * this.cellSize; // Colonne
          const y = row * this.cellSize; // Ligne
          positions.push({ x, y });
        }
      }
    }
    return positions;
  }

  handlePeriodicEvents(deltaTime) {
    if (this.eventTimer < this.eventInterval) {
      this.eventTimer += deltaTime;
      this.eventUpdate = false;
    } else {
      this.eventTimer = 0;
      this.eventUpdate = true;
    }
  }

  render(deltaTime) {
    this.background.draw();
    this.handleGameGrid();
    this.handlePeriodicEvents(deltaTime);
    this.player.update();
    this.player.draw(); 
  }
  
}