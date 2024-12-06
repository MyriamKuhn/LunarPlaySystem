/***********/

/* IMPORTS */

/***********/
import { Player } from '/assets/js/cryos/Player.js';
import { Background } from '/assets/js/cryos/Background.js';
import { Obstacle } from '/assets/js/cryos/Obstacle.js';


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
    this.obstacles = [];
    this.numberOfObstacles = 10;
    this.gravity;
    this.speed;
    this.minSpeed;
    this.maxSpeed;
    this.score;
    this.gameOver;
    this.timer;
    this.message1;
    this.message2;
    this.eventTimer = 0;
    this.eventInterval = 150;
    this.eventUpdate = false;

    this.touchStartX;
    this.swipeDistance = 50;

    this.resize(window.innerWidth, window.innerHeight);

    window.addEventListener('resize', (e) => {
      this.resize(e.currentTarget.innerWidth, e.currentTarget.innerHeight);
    });

    this.canvas.addEventListener('mousedown', (e) => {
      this.player.flap();
    });

    window.addEventListener('keydown', (e) => {
      if(e.key === ' ' || e.key === 'Enter') this.player.flap();
      if(e.key === 'Shift' || e.key.toLowerCase() === 'c') this.player.startCharge();
    });

    this.canvas.addEventListener('touchstart', (e) => {
      this.player.flap();
    });

    this.canvas.addEventListener('touchmove', (e) => {
      if (e.changedTouches[0].pageX - this.touchStartX > this.swipeDistance) {
        this.player.startCharge();
      }
    });
  }

  resize(width, height) {
    this.canvas.width = width;
    this.canvas.height = height;

    const fontSize = 30 * this.ratio;
    this.ctx.font = fontSize + 'px Bungee';
    this.ctx.textAlign = 'right';
    this.ctx.lineWidth = 2;
    this.ctx.strokeStyle = 'white';

    this.width = this.canvas.width;
    this.height = this.canvas.height;

    this.ratio = this.height / this.baseHeight;

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

  drawStatusText() {
    this.ctx.save();
    this.ctx.fillText(translations[lang].score + ' ' + this.score, this.width - 10, 30);
    this.ctx.textAlign = 'left';
    this.ctx.fillText(translations[lang].timer + ' ' + this.formatTimer(), 10, 30);
    if (this.gameOver) {
      if (this.player.collided) {
        this.message1 = 'Getting rusty?';
        this.message2 = 'Press R to restart';
      } else if (this.obstacles.length <= 0) {
        this.message1 = 'Nailed it!';
        this.message2 = 'Press R to restart';
      }
      this.ctx.textAlign = 'center';
      const fontSize1 = 60 * this.ratio;
      this.ctx.font = fontSize1 + 'px Bungee';
      this.ctx.fillText(this.message1, this.width * 0.5, this.height * 0.5);
      const fontSize2 = 30 * this.ratio;
      this.ctx.font = fontSize2 + 'px Bungee';
      this.ctx.fillText(this.message2, this.width * 0.5, this.height * 0.5 + fontSize1);
    }
    if (this.player.energy <= 20) this.ctx.fillStyle = 'red';
    else if (this.player.energy >= this.player.maxEnergy) this.ctx.fillStyle = 'orangered';
    for (let i = 0; i < this.player.energy; i++) {
      this.ctx.fillRect(10, this.height - 10 - this.player.barSize * i, this.player.barSize * 5, this.player.barSize);
    }
    this.ctx.restore();
  }

}