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
    this.score;
    this.gameOver;
    this.timer;

    this.resize(window.innerWidth, window.innerHeight);

    window.addEventListener('resize', (e) => {
      this.resize(e.currentTarget.innerWidth, e.currentTarget.innerHeight);
    });

    this.canvas.addEventListener('mousedown', (e) => {
      this.player.flap();
    });

    window.addEventListener('keydown', (e) => {
      if(e.key === ' ' || e.key === 'Enter') {
        this.player.flap();
      }
    });

    this.canvas.addEventListener('touchstart', (e) => {
      this.player.flap();
    });
  }

  resize(width, height) {
    this.canvas.width = width;
    this.canvas.height = height;

    this.ctx.fillStyle = 'blue';
    const fontSize = 30 * this.ratio;
    this.ctx.font = fontSize + 'px Bungee';
    this.ctx.textAlign = 'right';

    this.width = this.canvas.width;
    this.height = this.canvas.height;

    this.ratio = this.height / this.baseHeight;

    this.gravity = 0.15 * this.ratio;
    this.speed = 2 * this.ratio;
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

  formatTimer() {
    return (this.timer * 0.001).toFixed(1);
  }

  drawStatusText() {
    this.ctx.save();
    this.ctx.fillText(translations[lang].score + ' ' + this.score, this.width - 10, 30);
    this.ctx.textAlign = 'left';
    this.ctx.fillText(translations[lang].timer + ' ' + this.formatTimer(), 10, 30);
    if (this.gameOver) {
      this.ctx.textAlign = 'center';
      const fontSize = 60 * this.ratio;
      this.ctx.font = fontSize + 'px Bungee';
      this.ctx.fillText('Game Over', this.width * 0.5, this.height * 0.5);
    }
    this.ctx.restore();
  }

}