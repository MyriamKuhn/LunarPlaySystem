/***********/

/* IMPORTS */

/***********/
import { Keyboard1 } from '/assets/js/rhodaria/Controls.js';
import { Keyboard2 } from '/assets/js/rhodaria/Controls.js';
import { ComputerAi } from '/assets/js/rhodaria/Controls.js';
import { Food } from '/assets/js/rhodaria/Food.js';
import { Ui } from '/assets/js/rhodaria/Ui.js';
import { Background } from '/assets/js/rhodaria/Background.js';
import { securePlayername, sendScore } from '/assets/js/utils.js';


/*************/

/* VARIABLES */

/*************/
const lang = sessionStorage.getItem('lang') || document.querySelector('meta[name="language"]').getAttribute('content');

const translations = {
  'fr': {
    'points': 'points',
    'live': 'vie',
    'lives': 'vies',
    'begin': "Exterminez les intrus !", 
    'begin2': "Utilisez les flèches pour vous déplacer ou swipez dans la direction souhaitée !",
    'begin3': "Utilisez la barre d'espace, le clic ou le tap pour poser une bombe",
    'press': '⚔️ Appuyez sur "R" pour commencer ! ⚔️',
    'press2': '👈 Appuyez sur "B" pour revenir au menu ! 👈',
    'press3': '🔊 Appuyez sur "M" pour activer/désactiver le son ! 🔇',
    'press4': '📱 Sur mobile, utilisez les boutons ci-dessous 👇',
    'gameover': "Vous n'avez plus de vie !",
    'win': "Félicitations, vous avez réussi à exterminer tous les intrus !",
    'gameover2': 'Votre score final : ',
    'level': 'Prochaine vague',
    'levelend': 'Dernière vague'
  },
  'en': {
    'points': 'points',
    'live': 'life',
    'lives': 'lives',
    'begin': 'Exterminate the intruders!',
    'begin2': 'Use the arrows to move or swipe in the direction you want!',
    'begin3': 'Use the space bar, click or tap to place a bomb',
    'press': '⚔️ Press "R" to start! ⚔️',
    'press2': '👈 Press "B" to go back to the menu! 👈',
    'press3': '🔊 Press "M" to toggle sound on/off! 🔇',
    'press4': '📱 On mobile, use the buttons below 👇',
    'gameover': 'You have no life!',
    'win': "Congratulations, you've successfully exterminated all intruders!",
    'gameover2': 'Your final score: ',
    'resourcesneed': 'Need more larvae!',
    'level': 'Next wave',
    'levelend': 'Last wave'
  },
  'de': {
    'points': 'Punkten',
    'live': 'Leben',
    'lives': 'Leben',
    'begin': 'Vernichte die Eindringlinge!',
    'begin2': 'Benutze die Pfeile, um dich zu bewegen, oder swipe in die gewünschte Richtung!',
    'begin3': 'Benutze die Leertaste, Klick oder Tap, um eine Bombe zu legen',
    'press': '⚔️ Drück "R", um zu starten! ⚔️',
    'press2': '👈 Drück "B", um zum Menü zurückzukehren! 👈',
    'press3': '🔊 Drück "M", um den Ton ein-/auszuschalten! 🔇',
    'press4': '📱 Auf Mobilgeräten, benutze die Schaltflächen hier unten 👇',
    'gameover': 'Du hast kein Leben mehr!',
    'win': 'Herzlichen Glückwunsch, du hast es geschafft, alle Eindringlinge auszurotten!',
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
    this.ctx = context;
    this.width;
    this.height;

    this.cellSize = 50;
    this.columns;
    this.rows;
    this.topMargin = 2;

    this.eventTimer = 0;
    this.eventInterval = 200;
    this.eventUpdate = false;

    this.gameOver = true;
    this.winningScore = 2;
    
    this.player1;
    this.player2;
    this.player3;
    this.player4;
    this.food;
    this.background;
    this.gameObjects;

    this.gameUi = new Ui(this);

    window.addEventListener('resize', e => {
      this.resize(e.currentTarget.innerWidth, e.currentTarget.innerHeight);
    });

    this.resize(window.innerWidth, window.innerHeight);
  }

  resize(width, height) {
    this.canvas.width = width - width % this.cellSize;
    this.canvas.height = height - height % this.cellSize;
    this.width = this.canvas.width;
    this.height = this.canvas.height;

    this.columns = Math.floor(this.width / this.cellSize);
    this.rows = Math.floor(this.height / this.cellSize);

    this.background = new Background(this);

    this.ctx.fillStyle = 'white';
    this.ctx.font = '30px Impact';
    this.ctx.textAlign = 'left';
    this.ctx.textBaseline = 'top';

    this.player1 = new Keyboard1(this, 0, this.topMargin, 1, 0, 'orangered', securePlayername(sessionStorage.getItem('playername')));
    this.player2 = new ComputerAi(this, this.columns - 1, this.topMargin, 0, 1, 'magenta', 'ComputerAi');
    this.player3 = new ComputerAi(this, this.columns - 1, this.rows - 1, -1, 0, 'yellow', 'ComputerAi');
    this.player4 = new ComputerAi(this, 0, this.rows - 1, 0, -1, 'darkblue', 'ComputerAi');
    this.food = new Food(this);
    this.gameObjects = [this.player1, this.player2, this.player3, this.player4, this.food];
  }

  start() {
    if (!this.gameOver) {
      this.gameUi.triggerGameOver();
    } else {
      this.gameOver = false;
      this.gameUi.gameplayUi();
      this.player1 = new Keyboard1(this, 0, this.topMargin, 1, 0, 'orangered', securePlayername(sessionStorage.getItem('playername')));
      this.player2 = new ComputerAi(this, this.columns - 1, this.topMargin, 0, 1, 'magenta', 'ComputerAi');
      this.player3 = new ComputerAi(this, this.columns - 1, this.rows - 1, -1, 0, 'yellow', 'ComputerAi');
      this.player4 = new ComputerAi(this, 0, this.rows - 1, 0, -1, 'darkblue', 'ComputerAi');
      this.food = new Food(this);
      this.gameObjects = [this.player1, this.player2, this.player3, this.player4, this.food];
      this.ctx.clearRect(0, 0, this.width, this.height);
    }
  }

  drawGrid() {
    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.columns; x++) {
        this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
        this.ctx.strokeRect(x * this.cellSize, y * this.cellSize, this.cellSize, this.cellSize);
      }
    }
  }

  checkCollision(a, b) {
    return a.x === b.x && a.y === b.y;
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
    this.handlePeriodicEvents(deltaTime);
    
    if (this.eventUpdate && !this.gameOver) {
      this.ctx.clearRect(0, 0, this.width, this.height);
      this.background.draw();
      this.drawGrid();

      this.gameObjects.forEach(object => {
        object.draw();
        object.update();
      });
      this.gameUi.update();
    }
  }
}