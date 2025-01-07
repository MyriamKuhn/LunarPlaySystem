/******/

/* UI */

/******/
export class Ui {
  constructor(game) {
    this.game = game;
    //display the score
    this.score1 = document.getElementById('score1');
    this.score2 = document.getElementById('score2');
    this.score3 = document.getElementById('score3');
    this.score4 = document.getElementById('score4');
    //buttons
    this.startButton = document.getElementById('resetButton');
    this.startButton.addEventListener('click', () => this.game.start());
    this.startButton.addEventListener('touchend', e => {
      e.preventDefault();
      this.game.start();
    }, { passive: false });

    this.fullscreenButton = document.getElementById('fullScreenButton');
    this.fullscreenButton.addEventListener('click', () => this.game.toggleFullScreen());
    this.fullscreenButton.addEventListener('touchend', e => {
      e.preventDefault();
      this.game.toggleFullScreen();
    }, { passive: false });

    this.backButton = document.getElementById('backButton');
    this.backButton.addEventListener('click', () => this.game.goBack());
    this.backButton.addEventListener('touchend', e => {
      e.preventDefault();
      this.game.goBack();
    }, { passive: false });

    this.gameOverScreen = document.getElementById('gameover');
  }

  update() {
    this.score1.textContent = this.game.player1.name + ' ' + this.game.player1.score;
    this.score2.textContent = this.game.player2.name + ' ' + this.game.player2.score;
    this.score3.textContent = this.game.player3.name + ' ' + this.game.player3.score;
    this.score4.textContent = this.game.player4.name + ' ' + this.game.player4.score;
  }

  triggerGameOver() {
    this.game.gameOver = true;
    this.gameplayUi();
  }

  gameplayUi() {
    const controls = document.querySelector('.controls');
    controls.style.pointerEvents = 'none';
    controls.classList.add('hidden');
    this.gameOverScreen.classList.add('hidden');
  }

  gameOverUi() {
    const controls = document.querySelector('.controls');
    controls.style.pointerEvents = 'auto';
    controls.classList.remove('hidden');
    this.gameOverScreen.classList.remove('hidden');
  }
}