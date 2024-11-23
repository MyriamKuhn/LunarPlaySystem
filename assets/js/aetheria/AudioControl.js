/*******************/

/* CONTROLEUR SONS */

/*******************/
export class AudioControl {
  constructor() {
    this.newgame = document.getElementById('newgame');
    this.boom1 = document.getElementById('boom1');
    this.boom2 = document.getElementById('boom2');
    this.boom3 = document.getElementById('boom3');
    this.boom4 = document.getElementById('boom4');
    this.slide = document.getElementById('slide');
    this.win = document.getElementById('win');
    this.lose = document.getElementById('lose');
    this.scream = document.getElementById('scream');

    this.boomSounds = [this.boom1, this.boom2, this.boom3, this.boom4];

    // Propriété pour le volume (1 = volume maximum, 0 = muet)
    this.volume = 0.3;
  }

  /**
   * Joue un son spécifique
   * @param {HTMLAudioElement} audio - Élément audio à jouer
   */
  play(audio) {
    audio.volume = this.volume;
    audio.currentTime = 0;
    audio.play();
  }

  /**
   * Définit le volume global
   * @param {number} value - Niveau de volume entre 0 et 1
   */
  setVolume(value) {
    if (value >= 0 && value <= 1) {
      this.volume = value;
    }
  }
}