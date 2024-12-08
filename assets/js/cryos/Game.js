/***********/

/* IMPORTS */

/***********/
import { Player } from '/assets/js/cryos/Player.js';
import { Background } from '/assets/js/cryos/Background.js';
import { Obstacle } from '/assets/js/cryos/Obstacle.js';
import { AudioControl } from '/assets/js/cryos/AudioControls.js';


/*************/

/* VARIABLES */

/*************/
const lang = sessionStorage.getItem('lang') || document.querySelector('meta[name="language"]').getAttribute('content');

const translations = {
  'fr': {
    'score': 'Score : ',
    'timer': 'Temps : ',
    'begin': 'Evitez les obstacles !',
    'flap': '🪽 Appuyez sur "Espace", sur "Entrée" ou "Tap" sur mobile pour voler 🪽',
    'charge': '🚀 Appuyez sur "Shift", sur "C" ou "Swipe" sur mobile pour charger 🚀',
    'press': '⚔️ Appuyez sur "R" pour commencer ! ⚔️',
    'press2': '💻 Appuyez sur "F" pour le plein écran ! 💻',
    'press3': '👈 Appuyez sur "B" pour revenir au menu ! 👈',
    'press4': '🔊 Appuyez sur "M" pour activer/désactiver le son ! 🔇',
    'press5': '📱 Sur mobile, utilisez les boutons ci-dessous 👇',
    'gameover': '🎮 Perdu ! 🎮',
    'gameover2': 'Votre score final : ',
  },
  'en': {
    'score': 'Score: ',
    'timer': 'Timer: ',
    'begin': 'Avoid the obstacles!',
    'flap': '🪽 Press "Space", "Enter" or "Tap" on mobile to fly 🪽',
    'charge': '🚀 Press "Shift", "C" or "Swipe" on mobile to charge 🚀',
    'press': '⚔️ Press "R" to start! ⚔️',
    'press2': '💻 Press "F" for full screen! 💻',
    'press3': '👈 Press "B" to go back to the menu! 👈',
    'press4': '🔊 Press "M" to toggle sound on/off! 🔇',
    'press5': '📱 On mobile, use the buttons below 👇',
    'gameover': '🎮 Game over! 🎮',
    'gameover2': 'Your final score: ',
  },
  'de': {
    'score': 'Punktzahl: ',
    'timer': 'Timer: ',
    'begin': 'Vermeide die Hindernisse!',
    'flap': '🪽 Drück die "Leertaste", "Enter" oder "Tippen" auf dem Handy, um zu fliegen 🪽',
    'charge': '🚀 Drück "Shift", "C" oder "Wischen" auf dem Handy, um zu laden 🚀',
    'press': '⚔️ Drück "R", um zu starten! ⚔️',
    'press2': '💻 Drück "F" für den Vollbildmodus! 💻',
    'press3': '👈 Drück "B", um zum Menü zurückzukehren! 👈',
    'press4': '🔊 Drück "M", um den Ton ein-/auszuschalten! 🔇',
    'press5': '📱 Auf dem Handy, benutze die untenstehenden Buttons 👇',
    'gameover': '🎮 Spiel vorbei! 🎮',
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
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.baseHeight = 720;
    this.ratio = this.height / this.baseHeight;

    this.background = new Background(this);
    this.player = new Player(this);
    this.sound = new AudioControl(this);
    this.obstacles = [];
    this.numberOfObstacles = 10;
    this.gravity;
    this.speed;
    this.minSpeed;
    this.maxSpeed;
    this.score;
    this.gameOver;
    this.bottomMargin;
    this.timer;
    this.message1;
    this.message2;
    this.smallFont;
    this.largeFont;
    this.eventTimer = 0;
    this.eventInterval = 150;
    this.eventUpdate = false;

    this.touchStartX;
    this.swipeDistance = 50;
    this.debug = false;
    this.isKeyDown = false;

    this.level;
    this.paused;
    this.message1 = translations[lang].begin;
    this.message2 = translations[lang].flap;
    this.message3 = translations[lang].charge;
    this.message4 = translations[lang].press;
    this.message5 = translations[lang].press2;
    this.message6 = translations[lang].press3;
    this.message7 = translations[lang].press4;
    this.message8 = translations[lang].press5;

    this.resize(window.innerWidth, window.innerHeight);

    this.resetButton = document.getElementById('resetButton');
    this.resetButton.addEventListener('click', e => {
      this.resize(window.innerWidth, window.innerHeight);
    });
    this.resetButton.addEventListener('touchend', e => {
      e.preventDefault();
      this.resize(window.innerWidth, window.innerHeight);
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
      this.sound.toggleMute();
    });
    this.volumeButton.addEventListener('touchend', e => {
      e.preventDefault();
      this.sound.toggleMute();
    }, { passive: false });

    window.addEventListener('resize', e => {
      this.resize(e.currentTarget.innerWidth, e.currentTarget.innerHeight, true);
      this.paused = true;
    });

    this.canvas.addEventListener('mousedown', e => {
      this.player.flap();
    });

    this.canvas.addEventListener('mouseup', e => {
      setTimeout(() => {
        this.player.wingsUp();
      }, 50);
    });

    window.addEventListener('keydown', e => {
      if (e.key === ' ' || e.key === 'Enter') this.player.flap();
      if (e.key === 'Shift' || e.key.toLowerCase() === 'c') this.player.startCharge();
      if (e.key.toLowerCase() === 'r') this.resize(window.innerWidth, window.innerHeight);
      if (e.key.toLowerCase() === 'd') this.debug = !this.debug;
      if (e.key.toLowerCase() === 'f') this.toggleFullScreen();
      if (e.key.toLowerCase() === 'm') this.sound.toggleMute();
      if (e.key.toLowerCase() === 'b') window.location.href = '/' + lang + '/lunarplay/';
      this.isKeyDown = true;
    });

    window.addEventListener('keyup', e => {
      this.isKeyDown = false;
      this.player.wingsUp();
    });

    this.canvas.addEventListener('touchstart', e => {
      this.touchStartX = e.changedTouches[0].pageX;
    }, { passive: false });

    this.canvas.addEventListener('touchmove', e => {
      e.preventDefault();
    }, { passive: false });

    this.canvas.addEventListener('touchend', e => {
      if (e.changedTouches[0].pageX - this.touchStartX > this.swipeDistance) {
        this.player.startCharge();
      } else {
        this.player.flap();
      }
    }, { passive: false });

    this.paused = true;
  }

  resize(width, height, isResizing = false) {
    const controls = document.querySelector('.controls');
    controls.style.pointerEvents = 'none';
    controls.classList.add('hidden');

    this.canvas.width = width;
    this.canvas.height = height;

    this.width = this.canvas.width;
    this.height = this.canvas.height;

    this.ratio = this.height / this.baseHeight;

    this.smallFont = Math.ceil(15 * this.ratio);
    this.largeFont = Math.ceil(30 * this.ratio);

    this.ctx.font = this.smallFont + 'px Bungee';
    this.ctx.textAlign = 'right';
    this.ctx.lineWidth = 1;
    this.ctx.strokeStyle = 'white';

    this.bottomMargin = Math.floor(50 * this.ratio);
    this.gravity = 0.15 * this.ratio;
    this.speed = 2 * this.ratio;
    this.minSpeed = this.speed;
    this.maxSpeed = this.speed * 5;
    this.background.resize();
    this.player.resize();
    this.obstacles = [];
    this.createObstacles(0.5);
    this.obstacles.forEach(obstacle => {
      obstacle.resize();
    });
    this.score = 0;
    this.gameOver = false;
    this.timer = 0;
    this.level = 1;

    this.debug = false;
    if (!isResizing) {
      this.paused = false;
      this.sound.play('win');
    } 
  }

  render(deltaTime) {
    if (this.paused) {
      this.drawPauseScreen();
      return;
    }
    if (!this.gameOver) this.timer += deltaTime;
    this.handlePeriodicEvents(deltaTime);
    this.background.update();
    this.background.draw();
    this.drawStatusText();
    this.player.update();
    this.player.draw();
    this.obstacles.forEach(obstacle => {
      obstacle.update();
      obstacle.draw();
    });
  }

  toggleFullScreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }

  createObstacles(speedIncrement) {
    const firstX = this.baseHeight * this.ratio;
    const minSpacing = 400;
    const maxSpacing = 800;

    // Si un obstacle existe déjà, démarrer après le dernier
    const lastObstacle = this.obstacles[this.obstacles.length - 1];
    let startX = lastObstacle ? lastObstacle.x : firstX;

    for (let i = 0; i < this.numberOfObstacles; i++) {
      const randomSpacing = Math.random() * (maxSpacing - minSpacing) + minSpacing;
      const obstacleSpacing = randomSpacing * this.ratio;
      startX += obstacleSpacing;
      this.obstacles.push(new Obstacle(this, startX, speedIncrement));
    }
  }

  addObstacles(speedIncrement) {
    this.createObstacles(speedIncrement);
    this.obstacles.forEach(obstacle => {
      obstacle.resize();
    });
    this.level++;
    if (this.level % 4 === 0) {
      this.sound.play('win');
      this.player.stopCharge();
      this.speed += 1;
      this.minSpeed = this.speed;
      this.maxSpeed = this.speed * 5;
    }
  }

  checkCollision(a, b) {
    const dx = a.collisionX - b.collisionX;
    const dy = a.collisionY - b.collisionY;
    const distance = Math.hypot(dx, dy);
    const sumOfRadii = a.collisionRadius + b.collisionRadius;
    return distance <= sumOfRadii;
  }

  formatTimer() {
    return (this.timer * 0.001).toFixed(1);
  }

  handlePeriodicEvents(deltaTime) {
    if (this.eventTimer < this.eventInterval) {
      this.eventTimer += deltaTime;
      this.eventUpdate = false;
    } else {
      this.eventTimer = this.eventTimer % this.eventInterval;
      this.eventUpdate = true;
    }
  }

  triggerGameOver() {
    if (!this.gameOver) {
      this.gameOver = true;
      if (this.player.collided) {
        const finalscore = this.calculateFinalScore(this.formatTimer(), this.score);
        this.sound.play('lose');
        this.message1 = translations[lang].gameover;
        this.message2 = '';
        this.message3 = translations[lang].gameover2 + ' ' + finalscore;
      }
      this.paused = true;
    }
  }

  calculateFinalScore(totalTimeInSeconds, totalObstaclesCleared) {
    const timeWeight = 2; 
    const obstacleWeight = 3; 

    // Calcul du score de base
    const baseTimeScore = totalTimeInSeconds * timeWeight;
    const baseObstacleScore = totalObstaclesCleared * obstacleWeight;

    // Calcul de la vitesse (obstacles par seconde)
    const obstaclesPerSecond = totalObstaclesCleared / totalTimeInSeconds;

    // Multiplier la vitesse pour récompenser un meilleur temps
    const speedBonus = Math.max(1, obstaclesPerSecond * 15); 

    // Facteur de difficulté basé sur les paliers d'obstacles franchis
    const difficultyMultiplier = 1 + (totalObstaclesCleared / 10) ** 1.1;

    // Score final ajusté
    const finalScore = (baseTimeScore + baseObstacleScore) * difficultyMultiplier * speedBonus;

    return Math.floor(finalScore);
  }

  drawStatusText() {
    this.ctx.save();
    this.ctx.fillText(translations[lang].score + ' ' + this.score, this.width - this.smallFont, this.largeFont);
    this.ctx.textAlign = 'left';
    this.ctx.fillText(translations[lang].timer + ' ' + this.formatTimer(), this.smallFont, this.largeFont);
    
    if (this.player.energy <= this.player.minEnergy) this.ctx.fillStyle = 'red';
    else if (this.player.energy >= this.player.maxEnergy) this.ctx.fillStyle = 'orangered';
    for (let i = 0; i < this.player.energy; i++) {
      this.ctx.fillRect(10, this.height - 10 - this.player.barSize * i, this.player.barSize * 5, this.player.barSize);
    }
    this.ctx.restore();
  }

  drawPauseScreen() {
    const pauseScreen = new Background(this);
    pauseScreen.resize();
    pauseScreen.draw();
    this.ctx.save();
    this.ctx.fillStyle = 'white';
    this.ctx.shadowColor = 'black';
    this.ctx.shadowBlur = 10;
    this.ctx.textAlign = 'center';
    this.ctx.font = this.largeFont + 'px Bungee';
    this.ctx.fillText(this.message1, this.width * 0.5, this.height * 0.2, this.width);
    this.ctx.font = this.smallFont + 'px Bungee';
    this.ctx.fillText(this.message2, this.width * 0.5, this.height * 0.2 + this.largeFont, this.width);
    this.ctx.fillText(this.message3, this.width * 0.5, this.height * 0.2 + this.largeFont + this.smallFont + 10, this.width);
    this.ctx.fillText(this.message4, this.width * 0.5, this.height * 0.2 + this.largeFont + this.smallFont * 3 + 20, this.width);
    this.ctx.fillText(this.message5, this.width * 0.5, this.height * 0.2 + this.largeFont + this.smallFont * 4 + 30, this.width);
    this.ctx.fillText(this.message6, this.width * 0.5, this.height * 0.2 + this.largeFont + this.smallFont * 5 + 40, this.width);
    this.ctx.fillText(this.message7, this.width * 0.5, this.height * 0.2 + this.largeFont + this.smallFont * 6 + 50, this.width);
    this.ctx.fillText(this.message8, this.width * 0.5, this.height * 0.2 + this.largeFont + this.smallFont * 7 + 60, this.width);
    this.ctx.restore();
    const controls = document.querySelector('.controls');
    controls.style.pointerEvents = 'auto';
    controls.classList.remove('hidden');
  }


}