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
  },
  'en': {
    'score': 'Score: ',
    'timer': 'Timer: ',
  },
  'de': {
    'score': 'Punktzahl: ',
    'timer': 'Timer: ',
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
    this.sound = new AudioControl();
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

    //this.resize(window.innerWidth, window.innerHeight);

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
      this.resize(e.currentTarget.innerWidth, e.currentTarget.innerHeight);
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

  }

  resize(width, height) {
    this.canvas.width = width;
    this.canvas.height = height;

    this.width = this.canvas.width;
    this.height = this.canvas.height;

    this.ratio = this.height / this.baseHeight;

    this.smallFont = Math.ceil(20 * this.ratio);
    this.largeFont = Math.ceil(40 * this.ratio);

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
    this.createObstacles();
    this.obstacles.forEach(obstacle => {
      obstacle.resize();
    });
    this.score = 0;
    this.gameOver = false;
    this.timer = 0;

    this.debug = false;
  }

  render(deltaTime) {
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

  createObstacles() {
    this.obstacles = [];
    const firstX = this.baseHeight * this.ratio;
    const obstacleSpacing = 600 * this.ratio;
    for (let i = 0; i < this.numberOfObstacles; i++) {
      this.obstacles.push(new Obstacle(this, firstX + i * obstacleSpacing));
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
      if (this.obstacles.length <= 0) {
        this.sound.play('win');
        this.message1 = 'Nailed it!';
        this.message2 = 'Press R to restart';
      } else {
        this.sound.play('lose');
        this.message1 = 'Getting rusty?';
        this.message2 = 'Press R to restart';
      }
    }
  }

  drawStatusText() {
    this.ctx.save();
    this.ctx.fillText(translations[lang].score + ' ' + this.score, this.width - this.smallFont, this.largeFont);
    this.ctx.textAlign = 'left';
    this.ctx.fillText(translations[lang].timer + ' ' + this.formatTimer(), this.smallFont, this.largeFont);
    if (this.gameOver) {
      this.ctx.textAlign = 'center';
      this.ctx.font = this.largeFont + 'px Bungee';
      this.ctx.fillText(this.message1, this.width * 0.5, this.height * 0.5, this.width);
      this.ctx.font = this.smallFont + 'px Bungee';
      this.ctx.fillText(this.message2, this.width * 0.5, this.height * 0.5 + this.largeFont, this.width);
    }
    if (this.player.energy <= this.player.minEnergy) this.ctx.fillStyle = 'red';
    else if (this.player.energy >= this.player.maxEnergy) this.ctx.fillStyle = 'orangered';
    for (let i = 0; i < this.player.energy; i++) {
      this.ctx.fillRect(10, this.height - 10 - this.player.barSize * i, this.player.barSize * 5, this.player.barSize);
    }
    this.ctx.restore();
  }

}