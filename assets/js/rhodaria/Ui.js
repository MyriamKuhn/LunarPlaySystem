/******/

/* UI */

/******/
export class Ui {
  constructor(game) {
    this.game = game;
    //display the score
    this.score1 = document.getElementById('score1');
    this.time = document.getElementById('time');
    //messages
    this.message1 = document.getElementById('message1');
    this.message2 = document.getElementById('message2');
    this.message3 = document.getElementById('message3');
    this.message4 = document.getElementById('message4');
    this.message5 = document.getElementById('message5');
    this.message6 = document.getElementById('message6');
    this.message7 = document.getElementById('message7');
    //buttons
    this.startButton = document.getElementById('resetButton');
    this.startButton.addEventListener('click', () => {
      this.game.sound.play('button');
      this.game.start();
    });
    this.startButton.addEventListener('touchend', e => {
      e.preventDefault();
      this.game.sound.play('button');
      this.game.start();
    }, { passive: false });

    this.fullscreenButton = document.getElementById('fullScreenButton');
    this.fullscreenButton.addEventListener('click', () => {
      this.game.sound.play('button');
      this.game.toggleFullScreen();
    });
    this.fullscreenButton.addEventListener('touchend', e => {
      e.preventDefault();
      this.game.sound.play('button');
      this.game.toggleFullScreen();
    }, { passive: false });

    this.backButton = document.getElementById('backButton');
    this.backButton.addEventListener('click', () => {
      this.game.sound.play('button');
      this.game.goBack();
    });
    this.backButton.addEventListener('touchend', e => {
      e.preventDefault();
      this.game.sound.play('button');
      this.game.goBack();
    }, { passive: false });

    this.muteButton = document.getElementById('volumeButton');
    this.muteButton.addEventListener('click', () => {
      this.game.sound.play('button');
      this.game.sound.toggleMute();
    });
    this.muteButton.addEventListener('touchend', e => {
      e.preventDefault();
      this.game.sound.play('button');
      this.game.sound.toggleMute();
    }, { passive: false });

    this.gameOverScreen = document.getElementById('gameover');
  }

  update() {
    this.score1.textContent = this.game.player1.score + ' ' + this.game.translations.points;
    this.time.textContent = this.game.formatTimer() + ' s';
  }

  triggerGameOver(isStarting = false) {
    this.game.gameOver = true;
    this.gameOverUi();
    if (isStarting) {
      this.message1.textContent = this.game.translations.begin;
      this.message2.textContent = this.game.translations.begin2;
      this.message3.textContent = this.game.translations.begin3;
      this.message4.textContent = this.game.translations.press;
      this.message5.textContent = this.game.translations.press2;
      this.message6.textContent = this.game.translations.press3;
      this.message7.textContent = this.game.translations.press4;
    } else {
      this.message1.textContent = this.game.translations.gameover;
      this.message2.textContent = ' ';
      this.message3.textContent = this.game.translations.gameover2 + ' ' + this.game.player1.score;
      this.message4.textContent = this.game.translations.press;
      this.message5.textContent = this.game.translations.press2;
      this.message6.textContent = this.game.translations.press3;
      this.message7.textContent = this.game.translations.press4;
      for (let i = 0; i < this.game.numberOfParticles; i++) {
        const particle = this.game.getParticle();
        if (particle) {
          particle.start(Math.random() * this.game.width, this.game.height * 0.9, 'gold');
        }
      }
    }
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