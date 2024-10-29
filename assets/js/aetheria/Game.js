/***********/

/* IMPORTS */

/***********/
import { Enemy } from '/assets/js/aetheria/Enemy.js';


/*****************/

/* MOTEUR DU JEU */

/*****************/
export class Game {
  /**
   * @param {HTMLCanvasElement} canvas - Le canvas sur lequel le jeu sera dessiné
   * @param {CanvasRenderingContext2D} ctx - Le contexte 2D du canvas
   *
   * @property {HTMLCanvasElement} canvas - Le canvas sur lequel le jeu sera dessiné
   * @property {CanvasRenderingContext2D} ctx - Le contexte 2D du canvas
   * @property {number} width - La largeur du canvas
   * @property {number} height - La hauteur du canvas
   * @property {Array<Enemy>} enemyPool - Le pool d'ennemis
   * @property {number} numberOfEnemies - Le nombre d'ennemis
   * @property {number} enemyTimer - Le timer pour les ennemis
   * @property {number} enemyInterval - L'intervalle entre chaque ennemi
   * @property {number} score - Le score du joueur
   * @property {number} lives - Le nombre de vies du joueur
   * @property {number} winningScore - Le score pour gagner
   * @property {string} message1 - Le premier message
   * @property {string} message2 - Le deuxième message
   * @property {string} message3 - Le troisième message
   * @property {boolean} gameOver - Le jeu est-il terminé ?
   * @property {Object} mouse - Les coordonnées de la souris
   * 
   * @method start - Initialise le jeu
   * @method resize - Redimensionne le canvas
   * @method toggleFullScreen - Active ou désactive le mode plein écran
   * @method checkCollision - Vérifie s'il y a une collision entre deux objets
   * @method createEnemyPool - Crée un pool d'ennemis
   * @method getEnemy - Récupère un ennemi libre
   * @method handleEnemies - Gère les ennemis du jeu
   * @method render - Dessine le jeu, appelé à chaque frame du jeu
   * 
   * @description Constructeur de la classe Game
   * On définit les propriétés générales du jeu
   * On appelle la méthode start pour initialiser le jeu
   * On ajoute un event listener pour redimensionner le canvas
   */
  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.width = this.canvas.width;
    this.height = this.canvas.height;

    this.enemyPool = [];
    this.numberOfEnemies = 50;
    this.createEnemyPool();
    this.enemyTimer = 0;
    this.enemyInterval = 1000;

    this.score = 0;
    this.lives;
    this.winningScore = 3;
    this.message1 = 'Run!';
    this.message2 = 'Or get eaten!';
    this.message3 = 'Press "ENTER" or "R" to start!';
    this.gameOver = true;

    this.mouse = {
      x: undefined,
      y: undefined,
      width: 1,
      height: 1,
      pressed: false,
      fired: false,
    };

    this.resize(window.innerWidth, window.innerHeight);
    this.resetButton = document.getElementById('resetButton');
    this.resetButton.addEventListener('click', e => {
      this.start();
    });
    this.fullScreenButton = document.getElementById('fullScreenButton');
    this.fullScreenButton.addEventListener('click', e => {
      this.toggleFullScreen();
    });

    window.addEventListener('resize', e => {
      this.resize(e.target.innerWidth, e.target.innerHeight);
    });
    window.addEventListener('mousedown', e => {
      e.preventDefault();
      this.mouse.x = e.x;
      this.mouse.y = e.y;
      this.mouse.pressed = true;
      this.mouse.fired = false;
    });
    window.addEventListener('mouseup', e => {
      e.preventDefault();
      this.mouse.x = e.x;
      this.mouse.y = e.y;
      this.mouse.pressed = false;
    });
    window.addEventListener('touchstart', e => {
      e.preventDefault();
      console.log(e);
      this.mouse.x = e.changedTouches[0].pageX;
      this.mouse.y = e.changedTouches[0].pageY;
      this.mouse.pressed = true;
      this.mouse.fired = false;
    });
    window.addEventListener('touchend', e => {
      e.preventDefault();
      this.mouse.x = e.changedTouches[0].pageX;
      this.mouse.y = e.changedTouches[0].pageY;
      this.mouse.pressed = false;
    });
    window.addEventListener('keyup', e => {
      if (e.key === 'Enter' || e.key.toLowerCase() === 'r') {
        this.start();
      } else if (e.key === ' ' || e.key.toLowerCase() === 'f') {
        this.toggleFullScreen();
      }
    });
  }

  start() {
    this.score = 0;
    this.lives = 10;
    this.gameOver = false;
    this.enemyPool.forEach(enemy => {
      enemy.reset();
    });
    for (let i = 0; i < 2; i++) {
      const enemy = this.getEnemy();
      if (enemy) enemy.start();
    }
  }

  /**
   * @param {number} width - La nouvelle largeur du canvas
   * @param {number} height - La nouvelle hauteur du canvas
   * 
   * @description Redimensionne le canvas
   */
  resize(width, height) {
    this.canvas.width = width;
    this.canvas.height = height;
    this.width = width;
    this.height = height;
    this.ctx.fillStyle = 'white';
    this.ctx.strokeStyle = 'white';
    this.ctx.font = '30px Bangers';
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
  }

  toggleFullScreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }

  /**
  * @param {Object} a - Objet a
  * @param {Object} b - Objet b
  * 
  * @description Vérifie s'il y a une collision entre les deux objets
   */
  checkCollision(a, b) {
    return a.x < b.x + b.width &&
      a.x + a.width > b.x &&
      a.y < b.y + b.height &&
      a.y + a.height > b.y;
  }

  createEnemyPool() {
    for (let i = 0; i < this.numberOfEnemies; i++) {
      this.enemyPool.push(new Enemy(this));
    }
  }

  getEnemy() {
    for (let i = 0; i < this.enemyPool.length; i++) {
      if (this.enemyPool[i].free) return this.enemyPool[i];
    }
  }

  /**
   * @param {number} deltaTime - Le temps écoulé depuis le dernier frame
   * 
   * @description Gère les ennemis du jeu en les faisant apparaître à intervalles réguliers pour éviter l'interférence avec certains moniteurs et navigateurs au niveau de leur FPS
   */
  handleEnemies(deltaTime) {
    if (this.enemyTimer < this.enemyInterval) {
      this.enemyTimer += deltaTime;
    } else {
      this.enemyTimer = 0;
      const enemy = this.getEnemy();
      if (enemy) enemy.start();
    }
  }

  triggerGameOver() {
    if (!this.gameOver) {
      this.gameOver = true;
      if (this.lives < 1) {
        this.message1 = 'Aargh!';
        this.message2 = 'The crew was eaten!';
      } else if (this.score >= this.winningScore) {
        this.message1 ='Well done!';
        this.message2 = 'You escaped the swarm!';
      }
    }
  }

  drawStatusText() {
    this.ctx.save();
    this.ctx.textAlign = 'left';
    this.ctx.fillText('Score: ' + this.score, 20, 40);
    for (let i = 0; i < this.lives; i++) {
      this.ctx.fillText('❤️', 15 + i * 35, 80);
    }
    if (this.lives < 1 || this.score >= this.winningScore) {
      this.triggerGameOver();
    }
    if (this.gameOver) {
      this.ctx.textAlign = 'center';
      this.ctx.font = '80px Bangers';
      this.ctx.fillText(this.message1, this.width * 0.5, this.height * 0.5 - 25);
      this.ctx.font = '20px Bangers';
      this.ctx.fillText(this.message2, this.width * 0.5, this.height * 0.5 + 25);
      this.ctx.fillText(this.message3, this.width * 0.5, this.height * 0.5 + 50);
    }
    this.ctx.restore();
  }

  /**
   * @param {number} deltaTime - Le temps écoulé depuis le dernier frame
   * 
   * @description Dessine le jeu, appelé à chaque frame du jeu
   */
  render(deltaTime) {
    this.drawStatusText();
    if (!this.gameOver) this.handleEnemies(deltaTime);
    this.enemyPool.forEach(enemy => {
      enemy.update();
      enemy.draw();
    });
  }
}