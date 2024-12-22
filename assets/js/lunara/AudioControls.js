/*******************/

/* CONTROLEUR SONS */

/*******************/
export class AudioControl {
  constructor(game) {
    this.game = game;
    // Initialiser l'AudioContext à null
    this.audioContext = null;
    this.isAudioContextInitialized = false;

    // Les fichiers audio à jouer
    this.audioFiles = {
      change: '/assets/audio/lunara/change.mp3',
      lose: '/assets/audio/lunara/lose.mp3',
      place: '/assets/audio/lunara/place.wav',
      projectile: '/assets/audio/lunara/projectile.wav',
      wave: '/assets/audio/lunara/wave.mp3',
      win: '/assets/audio/lunara/win.mp3',
      resource: '/assets/audio/lunara/resource.mp3',
      dead: '/assets/audio/lunara/dead.mp3',
      defender: '/assets/audio/lunara/defender.mp3',
    };

    this.volume = 0.1; // volume global par défaut

    // L'objet pour stocker les buffers audio une fois chargés
    this.audioBuffers = {};

    // Attends un clic utilisateur pour initialiser l'AudioContext et charger les fichiers audio
    this.initializeAudioContext();
  }

  /**
   * Initialiser l'AudioContext après une interaction utilisateur (comme un clic)
   */
  initializeAudioContext() {
    if (!this.isAudioContextInitialized) {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const silentBuffer = this.audioContext.createBuffer(1, 1, 22050); // Crée un buffer audio muet
      const source = this.audioContext.createBufferSource();
      source.buffer = silentBuffer;
      source.connect(this.audioContext.destination);
      source.start();
      
      this.isAudioContextInitialized = true;
      this.loadAudioFiles();
    }
  }

  /**
   * Précharge tous les fichiers audio pour éviter les latences au moment du jeu
   */
  loadAudioFiles() {
    this.audioBuffers = {}; // Réinitialise l'objet des buffers audio
    const promises = Object.keys(this.audioFiles).map(key => {
      return fetch(this.audioFiles[key])
        .then(response => {
          if (!response.ok) {
            throw new Error(`Erreur de chargement du fichier: ${this.audioFiles[key]}`);
          }
          return response.arrayBuffer();
        })
        .then(data => this.audioContext.decodeAudioData(data))
        .then(buffer => {
          this.audioBuffers[key] = buffer; // Sauvegarde du buffer audio
        })
        .catch(error => console.error('Erreur de préchargement audio:', error));
    });
    
    // Une fois tous les fichiers chargés, afficher leur contenu
    Promise.all(promises)
      .then(() => {
        console.log('Tous les fichiers audio sont chargés et prêts.');
      })
      .catch(err => console.error('Erreur pendant le chargement des fichiers audio', err));
  }
  

  /**
   * Joue un son spécifique
   * @param {string} soundKey - Clé du son à jouer (par exemple, "newgame")
   */
  play(soundKey) {
    if (!this.isAudioContextInitialized) {
      console.warn('AudioContext non initialisé. Impossible de jouer le son avant l\'interaction utilisateur.');
      return;
    }
  
    const buffer = this.audioBuffers[soundKey];
    if (!buffer) {
      console.error(`Audio pour ${soundKey} non trouvé dans audioBuffers !`);
      return;
    }
  
    const source = this.audioContext.createBufferSource();
    source.buffer = buffer;
    const gainNode = this.audioContext.createGain();
    gainNode.gain.value = this.volume;
  
    source.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    if (!this.game.paused) source.start();
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

  /**
   * Bascule le son entre muet et non muet
   * @returns {number} - Niveau de volume entre 0 et 1
   */
  toggleMute() {
    const volumeButton = document.getElementById('volumeButton');
    if (this.volume === 0) {
      this.volume = 0.3;
      volumeButton.textContent = '🔊';
    } else {
      this.volume = 0;
      volumeButton.textContent = '🔇';
    }
  }
}