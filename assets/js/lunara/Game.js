/***********/

/* IMPORTS */

/***********/
import { Cell } from '/assets/js/lunara/Cell.js';
import { Defender } from '/assets/js/lunara/Defender.js';
import { Enemy } from '/assets/js/lunara/Enemy.js';
import { Resource } from '/assets/js/lunara/Resource.js';
import { FloatingMessage } from '/assets/js/lunara/FloatingMessage.js';
import { securePlayername, sendScore, shuffleArray } from '/assets/js/utils.js';


/*************/

/* VARIABLES */

/*************/
const lang = sessionStorage.getItem('lang') || document.querySelector('meta[name="language"]').getAttribute('content');

const translations = {
  'fr': {
    'score': 'Score : ',
    'ressources': 'Larves : ',
    'begin': "Contrez l'invasion !", 
    'begin2': "Les envahisseurs tentent d'entrer sur votre territoire !",
    'begin3': "Faites le nécessaire afin qu'ils n'y parviennent pas !",
    'press': '⚔️ Appuyez sur "R" pour commencer ! ⚔️',
    'press2': '👈 Appuyez sur "B" pour revenir au menu ! 👈',
    'press3': '🔊 Appuyez sur "M" pour activer/désactiver le son ! 🔇',
    'press4': '📱 Sur mobile, utilisez les boutons ci-dessous 👇',
    'gameover': "L'un des envahisseurs a réussi à passer !",
    'gameover2': 'Votre score final : ',
  },
  'en': {
    'score': 'Score: ',
    'ressources': 'Larvae: ',
    'begin': 'Prevent the invasion!',
    'begin2': 'The invaders are trying to enter your territory!',
    'begin3': 'Do what is necessary to prevent them from doing so!',
    'press': '⚔️ Press "R" to start! ⚔️',
    'press2': '👈 Press "B" to go back to the menu! 👈',
    'press3': '🔊 Press "M" to toggle sound on/off! 🔇',
    'press4': '📱 On mobile, use the buttons below 👇',
    'gameover': 'One of the invaders managed to get through!',
    'gameover2': 'Your final score: ',
  },
  'de': {
    'score': 'Punktzahl: ',
    'ressources': 'Larven: ',
    'begin': 'Verhindere die Invasion!',
    'begin2': 'Die Eindringlinge versuchen, in dein Territorium einzudringen!',
    'begin3': 'Tue was nötig ist, um sie daran zu hindern!',
    'press': '⚔️ Drück "R", um zu starten! ⚔️',
    'press2': '👈 Drück "B", um zum Menü zurückzukehren! 👈',
    'press3': '🔊 Drück "M", um den Ton ein-/auszuschalten! 🔇',
    'press4': '📱 Auf Mobilgeräten, benutze die Schaltflächen hier unten 👇',
    'gameover': 'Einer der Eindringlinge hat es geschafft durchzukommen!',
    'gameover2': 'Deine Endpunktzahl: ',
  },
};


/******************/

/* MOTEUR DE JEU */

/******************/
export class Game {
  constructor(canvas, context) {
    this.canvas = canvas;
    this.ctx = context;
    this.maxWidth = 1350;
    this.maxHeight = 900;
    this.originalWidth = 1350;
    this.originalHeight = 900;
    this.ratio = this.originalWidth / this.originalHeight;
    this.width = this.canvas.width;
    this.height = this.canvas.height;

    this.cellSize;
    this.cellGap;
    this.gameGrid;
    this.controlsBar;
    this.smallSize;
    this.normalSize;
    this.largeSize;

    this.gameOver;
    this.score;
    this.playerResources;
    this.floatingMessages;
    this.debug = false;

    this.level;
    this.message1 = translations[lang].begin;
    this.message2 = translations[lang].begin2;
    this.message3 = translations[lang].begin3;
    this.message4 = translations[lang].press;
    this.message5 = translations[lang].press2;
    this.message6 = translations[lang].press3;
    this.message7 = translations[lang].press4;

    this.spaceCard;
    this.cardWidth;
    this.cardHeight;
    this.imageSize;
    this.imageSpace;
    this.imageSpace2;
    this.spaceText;
    this.textHeight;
    this.textSpaceX;
    this.textSpaceY;

    this.card0;
    this.card1;
    this.card2;
    this.card3;
    this.card4;
    this.card5;
    this.card6;
    this.card7;
    
    this.eventTimer = 0;
    this.eventUpdate = false;
    this.eventInterval = 40;
    this.spriteTimer = 0;
    this.spriteUpdate = false;
    this.spriteInterval = 120;

    this.mouse = {
      x: undefined,
      y: undefined,
      width: 0.1,
      height: 0.1, 
      clicked: false,
    };

    this.resourcesPowers = [
      { element: document.getElementById("larva1"), power: 20 },
      { element: document.getElementById("larva2"), power: 30 },
      { element: document.getElementById("larva3"), power: 40 }
    ];
    this.resourcesPool;
    this.resourcesInterval;
    this.resourcesTimer = 0;
    this.amountOfResources;

    this.defenders;
    this.defendersTypes = [
      { element: document.getElementById("defender0"), costs: 50, health: 200 },
      { element: document.getElementById("defender1"), costs: 100, health: 100 },
      { element: document.getElementById("defender2"), costs: 200, health: 200 },
      { element: document.getElementById("defender3"), costs: 300, health: 600 },
      { element: document.getElementById("defender4"), costs: 300, health: 300 },
      { element: document.getElementById("defender5"), costs: 200, health: 200 },
      { element: document.getElementById("defender6"), costs: 350, health: 200 },
      { element: document.getElementById("defender7"), costs: 400, health: 200 }
    ];
    this.projectiles;
    this.projectilesTypes = [
      { element: document.getElementById("projectile0"), power: 0, size: 0, speed: 0 },
      { element: document.getElementById("projectile1"), power: 10, size: 10, speed: 300 },
      { element: document.getElementById("projectile2"), power: 40, size: 8, speed: 250 },
      { element: document.getElementById("projectile3"), power: 0, size: 0, speed: 0 },
      { element: document.getElementById("projectile4"), power: 25, size: 10, speed: 400 },
      { element: document.getElementById("projectile5"), power: 5, size: 5, speed: 250 },
      { element: document.getElementById("projectile6"), power: 1, size: 5, speed: 300 },
      { element: document.getElementById("projectile7"), power: 25, size: 5, speed: 250 }
    ];
    this.chosenDefender = 0;

    this.enemiesTypes = [
      { element: document.getElementById("enemy1"), power: 0.5, speed: 15, health: 100 },
      { element: document.getElementById("enemy2"), power: 0.5, speed: 15, health: 150 },
    ];
    this.enemiesForLevel = [
      { level: 1, 
        enemies: [
          { type: 0, amount: 10 },
        ], 
        ressources: { min: 10000, max: 15000 },
        interval: { min: 8000, max: 10000 },
      },
      { level: 2,
        enemies: [
          { type: 0, amount: 10 },
          { type: 1, amount: 10 },
        ],
        ressources: { min: 10000, max: 15000 },
        interval: { min: 5000, max: 8000 }
      }
    ];
    this.enemies;
    this.enemyInterval;
    this.enemyTimer = 0;

    this.canvasPosition = this.canvas.getBoundingClientRect();

    this.canvas.addEventListener('mousedown', (e) => {
      e.preventDefault();
      this.mouse.x = e.x - this.canvasPosition.left;
      this.mouse.y = e.y - this.canvasPosition.top;
      this.handleCanvasClick();
      this.mouse.clicked = true;
    });
    this.canvas.addEventListener('mouseup', (e) => {
      e.preventDefault();
      this.mouse.x = e.x - this.canvasPosition.left;
      this.mouse.y = e.y - this.canvasPosition.top;
      this.mouse.clicked = false;
    });
    this.canvas.addEventListener('touchstart', (e) => {
      e.preventDefault();
      this.mouse.x = e.changedTouches[0].pageX - this.canvasPosition.left;
      this.mouse.y = e.changedTouches[0].pageY - this.canvasPosition.top;
      this.mouse.clicked = true;
      this.handleCanvasClick();
    }, { passive: false });
    this.canvas.addEventListener('touchend', (e) => {
      this.mouse.clicked = false;
      this.mouse.x = e.changedTouches[0].pageX - this.canvasPosition.left;
      this.mouse.y = e.changedTouches[0].pageY - this.canvasPosition.top;
    }, { passive: false });
    window.addEventListener('resize', (e) => {
      this.canvasPosition = this.canvas.getBoundingClientRect();
      this.checkOrientation(e.currentTarget.innerWidth, e.currentTarget.innerHeight);
      this.paused = true;
      this.start(true);
    });
    window.addEventListener('keydown', e => {
      if (e.key.toLowerCase() === 'r') this.start();
      if (e.key.toLowerCase() === 'd') this.debug = !this.debug;
      //if (e.key.toLowerCase() === 'm') this.sound.toggleMute();
      if (e.key.toLowerCase() === 'b') window.location.href = '/' + lang + '/lunarplay/';
    });
    this.resetButton = document.getElementById('resetButton');
    this.resetButton.addEventListener('click', e => {
      this.start();
    });
    this.resetButton.addEventListener('touchend', e => {
      e.preventDefault();
      this.start();
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
      //this.sound.toggleMute();
    });
    this.volumeButton.addEventListener('touchend', e => {
      e.preventDefault();
      //this.sound.toggleMute();
    }, { passive: false });

    this.start(true);
    this.paused = true;
  }

  start(isResizing = false) {
    this.ratio = this.originalWidth / this.originalHeight;
    this.handleResize();
    this.checkOrientation(window.innerWidth, window.innerHeight);
    this.calculateCellSize();
    this.createGrid();

    this.controlsBar = {
      width: this.width,
      height: this.cellSize
    };
    this.gameOver = false;
    this.score = 0;
    this.level = 1;
    this.floatingMessages = [];

    this.smallSize = 30 * this.width / 1350;
    this.normalSize = 30 * this.width / 1350;
    this.largerSize = 40 * this.width / 1350;
    this.largeSize = 80 * this.width / 1350;

    this.spaceCard = 10 * this.width / 1350;
    this.cardWidth = 70 * this.width / 1350;
    this.cardHeight = this.cellSize - this.spaceCard * 2;
    this.imageSize = 80 * this.width / 1350;
    this.imageSpace = 15 * this.width / 1350;
    this.imageSpace2 = 5 * this.width / 1350;
    this.spaceText = this.cardWidth / 2 + this.spaceCard;
    this.textHeight = this.cardHeight - this.imageSpace2;
    this.textSpaceX = 900 * this.width / 1350;
    this.textSpaceY = this.cellSize / 2;

    this.message1 = translations[lang].begin;
    this.message2 = translations[lang].begin2;
    this.message3 = translations[lang].begin3;
    this.message4 = translations[lang].press;
    this.message5 = translations[lang].press2;
    this.message6 = translations[lang].press3;
    this.message7 = translations[lang].press4;

    this.card0 = {
      x: this.spaceCard,
      y: this.spaceCard,
      width: this.cardWidth,
      height: this.cardHeight,
      imageSize: this.imageSize,
      imageSpaceX: this.imageSpace2,
      imageSpaceY: 0,
      fillStyle: 'rgba(255, 255, 255, 0.5)',
    };
    this.card1 = {
      x: 2 * this.spaceCard + this.cardWidth,
      y: this.spaceCard,
      width: this.cardWidth,
      height: this.cardHeight,
      imageSize: this.imageSize,
      imageSpaceX: this.imageSize + this.imageSpace2,
      imageSpaceY: this.imageSpace,
      fillStyle: 'rgba(255, 255, 255, 0.5)',
    };
    this.card2 = {
      x: 3 * this.spaceCard + 2 * this.cardWidth,
      y: this.spaceCard,
      width: this.cardWidth,
      height: this.cardHeight,
      imageSize: this.imageSize,
      imageSpaceX: 2 * this.imageSize + this.imageSpace2,
      imageSpaceY: this.imageSpace,
      fillStyle: 'rgba(255, 255, 255, 0.5)',
    };
    this.card3 = {
      x: 4 * this.spaceCard + 3 * this.cardWidth,
      y: this.spaceCard,
      width: this.cardWidth,
      height: this.cardHeight,
      imageSize: this.imageSize,
      imageSpaceX: 3 * this.imageSize + this.imageSpace2,
      imageSpaceY: this.imageSpace,
      fillStyle: 'rgba(255, 255, 255, 0.5)',
    };
    this.card4 = {
      x: 5 * this.spaceCard + 4 * this.cardWidth,
      y: this.spaceCard,
      width: this.cardWidth,
      height: this.cardHeight,
      imageSize: this.imageSize,
      imageSpaceX: 4 * this.imageSize + this.imageSpace2,
      imageSpaceY: this.imageSpace,
      fillStyle: 'rgba(255, 255, 255, 0.5)',
    };
    this.card5 = {
      x: 6 * this.spaceCard + 5 * this.cardWidth,
      y: this.spaceCard,
      width: this.cardWidth,
      height: this.cardHeight,
      imageSize: this.imageSize,
      imageSpaceX: 5 * this.imageSize + this.imageSpace2,
      imageSpaceY: this.imageSpace,
      fillStyle: 'rgba(255, 255, 255, 0.5)',
    };
    this.card6 = {
      x: 7 * this.spaceCard + 6 * this.cardWidth,
      y: this.spaceCard,
      width: this.cardWidth,
      height: this.cardHeight,
      imageSize: this.imageSize,
      imageSpaceX: 6 * this.imageSize + this.imageSpace2,
      imageSpaceY: this.imageSpace,
      fillStyle: 'rgba(255, 255, 255, 0.5)',
    };
    this.card7 = {
      x: 8 * this.spaceCard + 7 * this.cardWidth,
      y: this.spaceCard,
      width: this.cardWidth,
      height: this.cardHeight,
      imageSize: this.imageSize,
      imageSpaceX: 7 * this.imageSize + this.imageSpace2,
      imageSpaceY: this.imageSpace,
      fillStyle: 'rgba(255, 255, 255, 0.5)',
    };

    this.playerResources = 300;
    this.resourcesPool = [];
    this.resourcesInterval = 10000;
    this.amountOfResources = 20;
    this.createResourcesPool();

    this.defenders = [];
    this.chosenDefender = 0;
    this.projectiles = [];

    this.enemies = [];
    this.createEnemiesPool();
    this.enemyInterval = 1000;

    if (!isResizing) {
      this.paused = false;
      //this.sound.play('win');
    } 
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
    this.canvas.width = newWidth;
    this.canvas.height = newHeight;
    
    this.width = this.canvas.width;
    this.height = this.canvas.height;
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

  calculateCellSize() {
    const rows = 5;  
    const cols = 9; 

    this.cellSize = Math.min(this.width / cols, this.height / rows);
    this.cellGap = this.cellSize / 100;
  }

  createGrid() {
    this.gameGrid = [];
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

  createResourcesPool() {
    for (let i = 0; i < this.amountOfResources; i++) {
      const selectedRessource = this.resourcesPowers[Math.floor(Math.random() * this.resourcesPowers.length)];
      this.resourcesPool.push(new Resource(this, selectedRessource.element, selectedRessource.power));
    }
  }

  getResource() {
    shuffleArray(this.resourcesPool);
    for (let i = 0; i < this.resourcesPool.length; i++) {
      if (this.resourcesPool[i].free) return this.resourcesPool[i];
    }
  }

  handleCanvasClick() {
    if (!this.paused || !this.gameOver) {
      const gridPositionX = this.mouse.x - (this.mouse.x % this.cellSize) + this.cellGap;
      const gridPositionY = this.mouse.y - (this.mouse.y % this.cellSize) + this.cellGap;
      // Vérifier si le clic est sur la barre de contrôle (zone invalide)
      if (gridPositionY < this.cellSize) return;
      // Vérifier si le clic est sur une ressource
      for (const resource of this.resourcesPool) {
        if (!resource.free && this.checkCollision(resource, this.mouse)) {
          return;
        }
      }
      // Gestion des défenseurs
      for (let i = 0; i < this.defenders.length; i++) {
        if (this.defenders[i].x === gridPositionX && this.defenders[i].y === gridPositionY) {
          return; // Défenseur déjà présent sur cette case
        }
      }
      const defenderCost = this.defendersTypes[this.chosenDefender].costs;
      if (this.playerResources >= defenderCost) {
        this.defenders.push(new Defender(gridPositionX, gridPositionY, this));
        this.playerResources -= defenderCost;
      } else {
        this.floatingMessages.push(new FloatingMessage('Need more resources', this.mouse.x, this.mouse.y, this.smallSize, 'orangered', this));
      }
    }
  }

  handleResources(deltaTime) {
    if (this.resourcesTimer < this.resourcesInterval) {
      this.resourcesTimer += deltaTime;
    } else {
      this.resourcesTimer = 0;
      const levelData = this.enemiesForLevel[this.level - 1];
      this.resourcesInterval = Math.floor(Math.random() * (levelData.ressources.max - levelData.ressources.min + 1) + levelData.ressources.min);
      const resource = this.getResource();        
      if (resource) {
        resource.start();
      }
    }
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

  handleSpriteTimer(deltaTime) {
    if (this.spriteTimer < this.spriteInterval) {
      this.spriteTimer += deltaTime;
      this.spriteUpdate = false;
    } else {
      this.spriteTimer = 0;
      this.spriteUpdate = true;
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

  formatTimer() {
    return (this.timer * 0.001).toFixed(1);
  }

  chooseDefender() {
    const cards = [this.card0, this.card1, this.card2, this.card3, this.card4, this.card5, this.card6, this.card7];
    const costs = this.defendersTypes.map(defender => defender.costs);

    // Détecter si l'utilisateur a cliqué sur une carte
    if (this.mouse.clicked) {
      // Chercher l'index de la carte sur laquelle l'utilisateur a cliqué
      const clickedCardIndex = cards.findIndex((card, index) => this.checkCollision(card, this.mouse));

      // Si une carte a été cliquée, la sélectionner, sinon ne rien faire
      if (clickedCardIndex !== -1) {
        this.chosenDefender = clickedCardIndex; // Sélectionner la nouvelle carte
      }
    }

    // Mettre à jour les couleurs des cartes
    cards.forEach((card, index) => {
      card.fillStyle = (index === this.chosenDefender) ? 'rgba(0, 255, 13, 0.5)' : 'rgba(255, 255, 255, 0.5)';
    });

    // Dessiner les cartes
    cards.forEach((card, index) => {
      this.ctx.fillStyle = card.fillStyle;
      this.ctx.fillRect(card.x, card.y, card.width, card.height);
      this.ctx.drawImage(this.defendersTypes[index].element, 0, 0, 225, 225, card.imageSpaceX, card.imageSpaceY, card.imageSize, card.imageSize);
    });

    // Dessiner les coûts
    cards.forEach((_, index) => {
      this.ctx.font = this.normalSize + 'px Rubik Moonrocks';
      this.ctx.fillStyle = 'black';
      this.ctx.textAlign = 'center';
      const xPosition = this.spaceText * (index + 1) + (index * this.cardWidth / 2);
      this.ctx.fillText(costs[index], xPosition, this.textHeight);
    });
    console.log("Chosen defender: " + this.chosenDefender);
  }

  checkCollision(a, b) {
    return a.x < b.x + b.width &&
      a.x + a.width > b.x &&
      a.y < b.y + b.height &&
      a.y + a.height > b.y;
  }

  createEnemiesPool() {
    const levelData = this.enemiesForLevel[this.level - 1];
    levelData.enemies.forEach(enemy => {
      for (let i = 0; i < enemy.amount; i++) {
        const verticalPosition = Math.floor(Math.random() * 5 + 1) * this.cellSize + this.cellGap;
        this.enemies.push(new Enemy(verticalPosition, this, enemy.type));
      }
    });
  }

  getEnemy() {
    shuffleArray(this.enemies);
    for (let i = 0; i < this.enemies.length; i++) {
      if (this.enemies[i].free) return this.enemies[i];
    }
  }

  handleEnemies(deltaTime) {
    this.enemyTimer += deltaTime;

    while (this.enemyTimer > this.enemyInterval) {
      const levelData = this.enemiesForLevel[this.level - 1];

      this.enemyInterval = Math.floor(
        Math.random() * (levelData.interval.max - levelData.interval.min + 1) + levelData.interval.min
      );
      const enemy = this.getEnemy();
      if (enemy) {
        enemy.start();
      }

      this.enemyTimer -= this.enemyInterval;
    }
  }

  drawStatusText() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    
    this.ctx.fillStyle = 'white';
    this.ctx.font = this.largerSize + 'px Rubik Moonrocks';
    this.ctx.textAlign = 'left';

    this.ctx.fillText(translations[lang].score + this.score, this.textSpaceX, this.textSpaceY);
    this.ctx.fillText(translations[lang].ressources + this.playerResources, this.textSpaceX, this.textSpaceY + this.largerSize);

    if (!this.gameOver && this.enemies.length === 0) {
      this.levelUp();
    }
  }

  drawPauseScreen() {
    this.ctx.save();

    this.ctx.fillStyle = 'black';
    this.ctx.fillRect(0, 0, this.width, this.height);

    this.ctx.fillStyle = 'white';
    this.ctx.textAlign = 'center';
    this.ctx.font = this.largeSize + 'px Rubik Moonrocks';

    this.ctx.fillText(this.message1, this.width * 0.5, this.height * 0.2, this.width);
    this.ctx.font = this.largerSize + 'px Rubik Moonrocks';
    this.ctx.fillText(this.message2, this.width * 0.5, this.height * 0.2 + this.largeSize, this.width);
    this.ctx.fillText(this.message3, this.width * 0.5, this.height * 0.2 + this.largeSize + this.largerSize + 5, this.width);
    this.ctx.fillText(this.message4, this.width * 0.5, this.height * 0.2 + this.largeSize + this.largerSize * 3 + 10, this.width);
    this.ctx.fillText(this.message5, this.width * 0.5, this.height * 0.2 + this.largeSize + this.largerSize * 4 + 15, this.width);
    this.ctx.fillText(this.message6, this.width * 0.5, this.height * 0.2 + this.largeSize + this.largerSize * 5 + 20, this.width);
    this.ctx.fillText(this.message7, this.width * 0.5, this.height * 0.2 + this.largeSize + this.largerSize * 6 + 25, this.width);

    this.ctx.restore();
    
    const controls = document.querySelector('.controls');
    controls.style.pointerEvents = 'auto';
    controls.classList.remove('hidden');
  }

  render(deltaTime) {
    if (this.paused) {
      this.drawPauseScreen();
      return;
    }

    if (this.debug) this.handleGameGrid();

    this.drawStatusText();

    this.handlePeriodicEvents(deltaTime);
    this.handleSpriteTimer(deltaTime);

    for (let i = this.defenders.length - 1; i >= 0; i--) {
      const defender = this.defenders[i];
      if (defender) {
        defender.update();
        defender.draw();
      }
    }

    this.handleResources(deltaTime);
    this.resourcesPool.forEach(resource => {
      resource.update();
      resource.draw();
    });

    for (let i = this.projectiles.length - 1; i >= 0; i--) {
      const projectile = this.projectiles[i];
      if (projectile) {
        projectile.update(deltaTime);
        projectile.draw();
      }
    }

    for (let i = this.enemies.length - 1; i >= 0; i--) {
      const enemy = this.enemies[i];
      if (enemy) {
        enemy.update(deltaTime);
        enemy.draw();
      }
    }
    this.handleEnemies(deltaTime);

    this.chooseDefender();

    this.handleFloatingMessages();
  }

  handleGameOver() {
    if (!this.gameOver) {
      this.gameOver = true;

      const finalscore = this.score * 2 + this.playerResources;

      //this.sound.play('lose');
      this.message1 = translations[lang].gameover;
      this.message2 = '';
      this.message3 = translations[lang].gameover2 + ' ' + finalscore;

      this.paused = true;
    }
  }

  levelUp() {
    this.level++;
    console.log("Level Up! Powers updated to level " + this.level);
  }
  
}
