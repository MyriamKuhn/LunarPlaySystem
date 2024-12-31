/***********/

/* IMPORTS */

/***********/
import { Background } from '/assets/js/ringuara/Background.js';
import { Player } from '/assets/js/ringuara/Player.js';
import { Cell } from '/assets/js/ringuara/Cell.js';
import { mapData } from '/assets/js/ringuara/mapData.js';
import { Enemy } from '/assets/js/ringuara/Enemy.js';
import { Bomb } from '/assets/js/ringuara/Bomb.js';


/*************/

/* VARIABLES */

/*************/
const lang = sessionStorage.getItem('lang') || document.querySelector('meta[name="language"]').getAttribute('content');

const translations = {
  'fr': {
    'points': 'points',
    'live': 'vie',
    'lives': 'vies',
    'begin': "Contrez l'invasion !", 
    'begin2': "Les envahisseurs tentent d'entrer sur votre territoire !",
    'begin3': "Faites le nécessaire afin qu'ils n'y parviennent pas !",
    'press': '⚔️ Appuyez sur "R" pour commencer ! ⚔️',
    'press2': '👈 Appuyez sur "B" pour revenir au menu ! 👈',
    'press3': '🔊 Appuyez sur "M" pour activer/désactiver le son ! 🔇',
    'press4': '📱 Sur mobile, utilisez les boutons ci-dessous 👇',
    'gameover': "L'un des envahisseurs a réussi à passer !",
    'win': "Vous avez repoussé l'invasion !",
    'gameover2': 'Votre score final : ',
    'resourcesneed': 'Pas assez de larves !',
    'level': 'Prochaine vague',
    'levelend': 'Dernière vague'
  },
  'en': {
    'points': 'points',
    'live': 'life',
    'lives': 'lives',
    'begin': 'Prevent the invasion!',
    'begin2': 'The invaders are trying to enter your territory!',
    'begin3': 'Do what is necessary to prevent them from doing so!',
    'press': '⚔️ Press "R" to start! ⚔️',
    'press2': '👈 Press "B" to go back to the menu! 👈',
    'press3': '🔊 Press "M" to toggle sound on/off! 🔇',
    'press4': '📱 On mobile, use the buttons below 👇',
    'gameover': 'One of the invaders managed to get through!',
    'win': 'You repelled the invasion!',
    'gameover2': 'Your final score: ',
    'resourcesneed': 'Need more larvae!',
    'level': 'Next wave',
    'levelend': 'Last wave'
  },
  'de': {
    'points': 'Punkten',
    'live': 'Leben',
    'lives': 'Leben',
    'begin': 'Verhindere die Invasion!',
    'begin2': 'Die Eindringlinge versuchen, in dein Territorium einzudringen!',
    'begin3': 'Tue was nötig ist, um sie daran zu hindern!',
    'press': '⚔️ Drück "R", um zu starten! ⚔️',
    'press2': '👈 Drück "B", um zum Menü zurückzukehren! 👈',
    'press3': '🔊 Drück "M", um den Ton ein-/auszuschalten! 🔇',
    'press4': '📱 Auf Mobilgeräten, benutze die Schaltflächen hier unten 👇',
    'gameover': 'Einer der Eindringlinge hat es geschafft durchzukommen!',
    'win': 'Du hast die Invasion zurückgeschlagen!',
    'gameover2': 'Deine Endpunktzahl: ',
    'resourcesneed': 'Nicht genug Larven!',
    'level': 'Nächste Welle',
    'levelend': 'Letzte Welle'
  },
};


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

    this.pointsTranslation = translations[lang].points;
    this.liveTranslation = translations[lang].live;
    this.livesTranslation = translations[lang].lives;

    this.background;
    this.gameGrid = [];
    this.cellSize;

    this.touchStartX;
    this.touchStartY;
    this.swipeDistance = 50;

    this.lives = 5;
    this.maxLives = 10;
    this.score = 0;
    this.level = 0;
    this.gameOver;
    this.playerImage = document.getElementById('player');

    this.eventTimer = 0;
    this.eventUpdate = false;
    this.eventInterval = 50;

    this.player;
    this.direction;

    this.enemyPool = [];
    this.bombPool = [];
    this.numberOfBombs;
    this.explosions = [];
    this.bonusCooldown;
    this.bonusCooldownTime;
    this.isBonus;
    this.bonusCooldownRandom;
    this.floatingMessages = [];

    this.debug = false;

    this.bigFontSize;

    this.dotsPositions;

    this.bombsTypes = [
      { image: document.getElementById('bomb0'), cooldown: 0, radius: 0, numberOfBombs: 0 },
      { image: document.getElementById('bomb1'), cooldown: 2000, radius: 5, numberOfBombs: 4 },
      { image: document.getElementById('bomb2'), cooldown: 3000, radius: 5, numberOfBombs: 5 },
      { image: document.getElementById('bomb3'), cooldown: 3000, radius: 4, numberOfBombs: 6 },
      { image: document.getElementById('bomb4'), cooldown: 4000, radius: 4, numberOfBombs: 7 },
      { image: document.getElementById('bomb5'), cooldown: 5000, radius: 3, numberOfBombs: 8 },
      { image: document.getElementById('bomb6'), cooldown: 5000, radius: 3, numberOfBombs: 9 },
      { image: document.getElementById('bomb7'), cooldown: 6000, radius: 2, numberOfBombs: 10 },
    ];

    this.enemiesTypes = [
      { image: document.getElementById('enemy0'), health: 0, chaseDuration: 0, speed: 0, scorePoints: 0 },
      { image: document.getElementById('enemy1'), health: 1, chaseDuration: 3000, speed: 0.02, scorePoints: 100 },
      { image: document.getElementById('enemy2'), health: 2, chaseDuration: 3000, speed: 0.02, scorePoints: 150 },
      { image: document.getElementById('enemy3'), health: 1, chaseDuration: 4000, speed: 0.03, scorePoints: 100 },
    ];

    this.bonusTypes = [
      { image: document.getElementById('meteor1'), type: 'score', value: 10, duration: 16000 },
      { image: document.getElementById('meteor2'), type: 'score', value: 20, duration: 15000 },
      { image: document.getElementById('meteor3'), type: 'score', value: 30, duration: 14000 },
      { image: document.getElementById('meteor4'), type: 'score', value: 40, duration: 13000 },
      { image: document.getElementById('meteor5'), type: 'score', value: 50, duration: 12000 },
      { image: document.getElementById('meteor6'), type: 'score', value: 60, duration: 11500 },
      { image: document.getElementById('meteor7'), type: 'score', value: 70, duration: 11000 },
      { image: document.getElementById('meteor8'), type: 'score', value: 80, duration: 10500 },
      { image: document.getElementById('meteor9'), type: 'score', value: 90, duration: 10000 },
      { image: document.getElementById('meteor10'), type: 'score', value: 100, duration: 9000 },
      { image: document.getElementById('meteor11'), type: 'lives', value: 1, duration: 8000 },
      { image: document.getElementById('meteor12'), type: 'lives', value: 2, duration: 7000 },
    ];

    this.levelDatas = [
      { level: 1, 
        bombType: 1,
        enemies: [
          { type: 1, amount: 5 },
        ], 
        bonusCool: { min: 1000, max: 2000 },
        bonusScore: 0,
        bonusLives: 0,
        map: document.getElementById('map1'),
        mapData: mapData.map1,
        speed: 0.05,
        noEffectDuration: 6000,
      },
      { level: 2, 
        bombType: 1,
        enemies: [
          { type: 1, amount: 8 },
          { type: 2, amount: 2 },
        ], 
        bonusCool: { min: 15000, max: 20000 },
        bonusScore: 500,
        bonusLives: 1,
        map: document.getElementById('map1'),
        mapData: mapData.map1,
        speed: 0.05,
        noEffectDuration: 6000,
      },
      { level: 3, 
        bombType: 1,
        enemies: [
          { type: 1, amount: 10 },
          { type: 2, amount: 5 },
        ], 
        bonusCool: { min: 15000, max: 20000 },
        bonusScore: 500,
        bonusLives: 1,
        map: document.getElementById('map1'),
        mapData: mapData.map1,
        speed: 0.05,
        noEffectDuration: 6000,
      },
    ];

    window.addEventListener('resize', () => this.init());

    this.canvas.addEventListener('touchstart', e => {
      this.touchStartX = e.changedTouches[0].pageX;
      this.touchStartY = e.changedTouches[0].pageY;
    }, { passive: false });
    this.canvas.addEventListener('touchmove', e => {
      e.preventDefault();
    }, { passive: false });
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
        this.player.drawBomb();
      }
    }, { passive: false });

    window.addEventListener('keydown', (e) => {
      if (e.key.toLowerCase() === 'r') this.init();
      if (e.key.toLowerCase() === 'd') this.debug = !this.debug;
      //if (e.key.toLowerCase() === 'm') this.sound.toggleMute();
      if (e.key.toLowerCase() === 'f') this.toggleFullScreen();
      if (e.key.toLowerCase() === 'b') window.location.href = '/' + lang + '/lunarplay/';
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === 'ArrowUp') this.player.setDirection(e.key);
      if (e.key === ' ') this.player.drawBomb();
    });
    window.addEventListener('click', e => {
      this.player.drawBomb();
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
    this.cellSize = this.width / 32;
    this.bigFontSize = 32 * (this.width / this.originalWidth);

    this.debug = false;
    this.gameOver = false;
    this.isBonus = false;

    this.lives = 5;
    this.maxLives = 10;
    this.score = 0;
    this.level = 0;

    this.initLevel();
  }

  initLevel() {
    this.level++;
    const levelData = this.levelDatas.find(data => data.level === this.level);
    if (levelData) {
      this.background = new Background(levelData.map, this, this.width, this.height);
      this.createGrid(levelData.mapData);

      this.direction = null;
      this.score += levelData.bonusScore;
      this.lives += levelData.bonusLives;
      this.floatingMessages = [];
      
      this.numberOfBombs = this.bombsTypes[levelData.bombType].numberOfBombs;
      this.createBombPool(this.bombsTypes[levelData.bombType].image, this.bombsTypes[levelData.bombType].cooldown, this.bombsTypes[levelData.bombType].radius);
      this.explosions = [];
      
      this.isBonus = false;
      this.bonusCooldown = 0;
      this.bonusCooldownTime = [levelData.bonusCool.min, levelData.bonusCool.max];
      this.bonusCooldownRandom = Math.floor(Math.random() * (this.bonusCooldownTime[1] - this.bonusCooldownTime[0] + 1)) + this.bonusCooldownTime[0];
      
      this.dotsPositions = this.findTilePositions('dot');

      this.createEnemyPool(levelData.enemies);

      if (this.player) {
        this.player.init(levelData.speed, levelData.noEffectDuration);
      } else {
        this.player = new Player(this);
        this.player.init(levelData.speed, levelData.noEffectDuration);
      }

      this.isBonus = true;
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
        cell.draw();
      }
    }
  }

  aStar(startCell, endCell) {
    const openSet = [];
    const closedSet = [];
    const maxIterations = 1000; // Limite pour éviter les boucles infinies
    let iterations = 0;
  
    // Initialisation des valeurs pour la cellule de départ
    startCell.g = 0;
    startCell.f = Math.abs(startCell.x - endCell.x) + Math.abs(startCell.y - endCell.y); // Heuristique (distance de Manhattan)
    startCell.parent = null;
  
    // Ajout de la cellule de départ à openSet
    openSet.push(startCell);
  
    // Vérification si le départ ou l'arrivée sont des murs
    if (startCell.type === 'wall' || endCell.type === 'wall') {
      return [];
    }
  
    // Boucle principale de l'algorithme A*
    while (openSet.length > 0) {
      iterations++;
      if (iterations > maxIterations) {
        return [];
      }
  
      // Choisir la cellule avec le coût le plus faible
      let current = openSet.reduce((a, b) => (a.f < b.f ? a : b));
  
      // Vérifier si la cellule actuelle est déjà dans closedSet
      if (closedSet.some(c => c.x === current.x && c.y === current.y)) {
        continue;
      }
    
      // Vérifier si nous avons atteint la cellule de fin
      if (current.x === endCell.x && current.y === endCell.y) {
        const path = [];
        let temp = current;
  
        // Boucle pour reconstruire le chemin
        while (temp) {
          path.push(temp);
          if (!temp.parent && temp !== startCell) {
            // Si la cellule n'a pas de parent et ce n'est pas la cellule de départ, c'est un problème
            return [];
          }
          temp = temp.parent;
        }
  
        return path.reverse();
      }
  
      // Retirer la cellule actuelle de openSet et l'ajouter à closedSet
      openSet.splice(openSet.indexOf(current), 1);
      closedSet.push(current);
  
      // Récupérer les voisins de la cellule actuelle
      const neighbors = this.getNeighbors(current, closedSet);
  
      // Parcourir les voisins
      for (const neighbor of neighbors) {
        const tentativeG = current.g + 1; // Calcul du coût pour atteindre ce voisin
  
        if (!openSet.includes(neighbor)) {
          // Ajouter le voisin à openSet s'il n'y est pas déjà
          neighbor.g = tentativeG;
          neighbor.h = Math.abs(neighbor.x - endCell.x) + Math.abs(neighbor.y - endCell.y); // Heuristique (distance de Manhattan)
          neighbor.f = neighbor.g + neighbor.h;
          neighbor.parent = current; // Assigner la cellule actuelle comme parent du voisin
          openSet.push(neighbor);
        } else if (tentativeG < neighbor.g) {
          // Si le chemin vers ce voisin est plus court, mettre à jour ses valeurs
          neighbor.g = tentativeG;
          neighbor.f = neighbor.g + neighbor.h;
          neighbor.parent = current; // Mettre à jour le parent
        }
      }
    } 
    // Si aucun chemin n'a été trouvé
    return [];
  }
  
  getNeighbors(cell, closedSet) {
    const neighbors = [];
    const row = Math.floor(cell.y / this.cellSize);
    const col = Math.floor(cell.x / this.cellSize);
  
    const directions = [
      { x: 0, y: -1 }, // Haut
      { x: 0, y: 1 },  // Bas
      { x: -1, y: 0 }, // Gauche
      { x: 1, y: 0 }   // Droite
    ];
  
    for (const dir of directions) {
      const neighborRow = row + dir.y;
      const neighborCol = col + dir.x;
  
      // Vérifier si le voisin est dans les limites de la grille
      if (
        neighborRow >= 0 &&
        neighborRow < this.gameGrid.length &&
        neighborCol >= 0 &&
        neighborCol < this.gameGrid[0].length
      ) {
        const neighbor = this.gameGrid[neighborRow][neighborCol];
        // Vérifier si le voisin est "walkable" et n'est pas déjà dans closedSet
        if (neighbor.walkable && !this.isInClosedSet(neighbor, closedSet)) {
          neighbors.push(neighbor);
        }
      }
    }
    return neighbors;
  }
  
  isInClosedSet(neighbor, closedSet) {
    return closedSet.some(cell => cell.x === neighbor.x && cell.y === neighbor.y);
  }

  checkCollision(a, b) {
    return a.x < b.x + b.width &&
      a.x + a.width > b.x &&
      a.y < b.y + b.height &&
      a.y + a.height > b.y;
  }

  findTilePositions(type) {
    const positions = [];
    for (let row = 0; row < this.gameGrid.length; row++) {
      for (let col = 0; col < this.gameGrid[row].length; col++) {
        const cell = this.gameGrid[row][col];
        if (cell.type === type) {
          const x = col * this.cellSize; // Colonne
          const y = row * this.cellSize; // Ligne
          const spawn = cell.spawn;
          positions.push({ x, y, spawn, cell });
        }
      }
    }
    return positions;
  }

  createEnemyPool(datas) {
    this.enemyPool = [];
    const enemies = datas || this.levelDatas.find(data => data.level === this.level).enemies;
    for (const enemyData of enemies) {
      for (let i = 0; i < enemyData.amount; i++) {
        this.enemyPool.push(new Enemy(this, enemyData.type));
      }
    }
  }

  handleEnemies(deltaTime) {
    for (let i = 0; i < this.enemyPool.length; i++) {
      const enemy = this.enemyPool[i];
      enemy.update(deltaTime);
      enemy.draw();
    }
  }

  createBombPool(image, cooldown, radius) {
    this.bombPool = [];
    for (let i = 0; i < this.numberOfBombs; i++) {
      this.bombPool.push(new Bomb(this, 0, 0, image, cooldown, radius));
    }
  }

  handleBomb(deltaTime) {
    for (let i = 0; i < this.bombPool.length; i++) {
      const bomb = this.bombPool[i];
      bomb.update();
      bomb.draw();
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

  handleBonus(deltaTime) {
    if (this.bonusCooldown < this.bonusCooldownRandom) {
      this.bonusCooldown += deltaTime;
    } else {
      this.isBonus = false;
      const bonusCell = this.dotsPositions[Math.floor(Math.random() * this.dotsPositions.length)]; 
      const bonusTypeIndex = Math.floor(Math.random() * this.bonusTypes.length);
      bonusCell.cell.setBonus(this.bonusTypes[bonusTypeIndex].type, this.bonusTypes[bonusTypeIndex].value, this.bonusTypes[bonusTypeIndex].duration, this.bonusTypes[bonusTypeIndex].image);
      this.bonusCooldownRandom = Math.floor(Math.random() * (this.bonusCooldownTime[1] - this.bonusCooldownTime[0] + 1)) + this.bonusCooldownTime[0];
      this.bonusCooldown = 0;
    }
  }

  handleGameOver() {
    if (!this.gameOver) {
      this.gameOver = true;
      this.bonusCooldown = 0;
      this.isBonus = false;
    }
  }

  drawStatusText() {
    this.context.save();
    this.context.font = this.bigFontSize + 'px Atma';
    this.context.fillStyle = 'white';
    this.context.textAlign = 'right';
    this.context.fillText(this.score, this.width - this.bigFontSize, this.bigFontSize - 5 * (this.width / this.originalWidth));
    if (this.lives < 0) this.lives = 0;
    if (this.lives > this.maxLives) this.lives = this.maxLives;
    for (let i = 0; i < this.lives; i++) {
      this.context.drawImage(this.playerImage, 0, 0, 32, 32, i * this.bigFontSize + this.bigFontSize, -2 * (this.width / this.originalWidth), this.bigFontSize, this.bigFontSize);
    }
    this.context.restore();
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

  render(deltaTime) {
    this.context.clearRect(0, 0, this.width, this.height);
    this.background.draw();
    this.drawStatusText();
    this.handleGameGrid();
    this.handlePeriodicEvents(deltaTime);
    this.handleEnemies(deltaTime);
    this.handleBomb(deltaTime);
    if (this.player) this.player.update();
    if (this.player) this.player.draw(); 
    if (this.isBonus) this.handleBonus(deltaTime);
    this.handleFloatingMessages();
  }
  
}