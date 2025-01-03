/***********/

/* IMPORTS */

/***********/
import { Game } from '/assets/js/ringuara/Game.js';


/*************/

/* VARIABLES */

/*************/
const lang = sessionStorage.getItem('lang') || document.querySelector('meta[name="language"]').getAttribute('content');

const translations = {
  'fr': {
    'loading': 'Chargement : ',
    'error': 'Erreur lors du chargement des ressources. Veuillez réessayer.',
  },
  'en': {
    'loading': 'Loading: ',
    'error': 'Error loading resources. Please try again.',
  },
  'de': {
    'loading': 'Laden: ',
    'error': 'Fehler beim Laden der Ressourcen. Bitte versuche es erneut.',
  },
};


/******************/

/* INITIALISATION */

/******************/
window.addEventListener('load', function() {
  const loadingScreen = document.getElementById('loading-screen');
  const loadingText = document.getElementById('loading-text');
  const loadingProgress = document.getElementById('loading-progress');
  const canvas = document.getElementById('canvas1');
  
  const assets = [
    { id: 'map1', src: '/assets/img/ringuara/map1.png', type: 'image' },
    { id: 'map2', src: '/assets/img/ringuara/map2.png', type: 'image' },
    { id: 'bomb1', src: '/assets/img/ringuara/bomb1.png', type: 'image' },
    { id: 'bomb2', src: '/assets/img/ringuara/bomb2.png', type: 'image' },
    { id: 'bomb3', src: '/assets/img/ringuara/bomb3.png', type: 'image' },
    { id: 'bomb4', src: '/assets/img/ringuara/bomb4.png', type: 'image' },
    { id: 'bomb5', src: '/assets/img/ringuara/bomb5.png', type: 'image' },
    { id: 'bomb6', src: '/assets/img/ringuara/bomb6.png', type: 'image' },
    { id: 'bomb7', src: '/assets/img/ringuara/bomb7.png', type: 'image' },
    { id: 'explosion', src: '/assets/img/ringuara/explosion.png', type: 'image' },
    { id: 'meteor1', src: '/assets/img/ringuara/meteor1.png', type: 'image' },
    { id: 'meteor2', src: '/assets/img/ringuara/meteor2.png', type: 'image' },
    { id: 'meteor3', src: '/assets/img/ringuara/meteor3.png', type: 'image' },
    { id: 'meteor4', src: '/assets/img/ringuara/meteor4.png', type: 'image' },
    { id: 'meteor5', src: '/assets/img/ringuara/meteor5.png', type: 'image' },
    { id: 'meteor6', src: '/assets/img/ringuara/meteor6.png', type: 'image' },
    { id: 'meteor7', src: '/assets/img/ringuara/meteor7.png', type: 'image' },
    { id: 'meteor8', src: '/assets/img/ringuara/meteor8.png', type: 'image' },
    { id: 'meteor9', src: '/assets/img/ringuara/meteor9.png', type: 'image' },
    { id: 'meteor10', src: '/assets/img/ringuara/meteor10.png', type: 'image' },
    { id: 'meteor11', src: '/assets/img/ringuara/meteor11.png', type: 'image' },
    { id: 'meteor12', src: '/assets/img/ringuara/meteor12.png', type: 'image' },
    { id: 'player', src: '/assets/img/ringuara/player.png', type: 'image' },
    { id: 'enemy1', src: '/assets/img/ringuara/enemy1.png', type: 'image' },
    { id: 'enemy2', src: '/assets/img/ringuara/enemy2.png', type: 'image' },
    { id: 'enemy3', src: '/assets/img/ringuara/enemy3.png', type: 'image' },
    { id: 'enemy4', src: '/assets/img/ringuara/enemy4.png', type: 'image' },
    { id: 'enemy5', src: '/assets/img/ringuara/enemy5.png', type: 'image' },
    { id: 'enemy6', src: '/assets/img/ringuara/enemy6.png', type: 'image' },
    { id: 'enemy7', src: '/assets/img/ringuara/enemy7.png', type: 'image' },
    { id: 'enemy8', src: '/assets/img/ringuara/enemy8.png', type: 'image' },
    { id: 'enemy9', src: '/assets/img/ringuara/enemy9.png', type: 'image' },
    { id: 'enemy10', src: '/assets/img/ringuara/enemy10.png', type: 'image' },
    { id: 'win', src: '/assets/audio/cryos/winflappy.mp3', type: 'audio' },
    { id: 'lose', src: '/assets/audio/cryos/loseflappy.mp3', type: 'audio' },
    { id: 'charge', src: '/assets/audio/cryos/charge.mp3', type: 'audio' },
    { id: 'flap1', src: '/assets/audio/cryos/flap1.mp3', type: 'audio' },
    { id: 'flap2', src: '/assets/audio/cryos/flap2.mp3', type: 'audio' },
    { id: 'flap3', src: '/assets/audio/cryos/flap3.mp3', type: 'audio' },
    { id: 'flap4', src: '/assets/audio/cryos/flap4.mp3', type: 'audio' },
    { id: 'flap5', src: '/assets/audio/cryos/flap5.mp3', type: 'audio' },
  ];

  let loaded = 0;
  const total = assets.length;

  // Fonction pour charger une ressource
  function loadAsset(asset) {
    return new Promise((resolve, reject) => {
      let element;
  
      if (asset.type === 'image') {
        element = new Image();
      } else if (asset.type === 'audio') {
        element = new Audio();
      }
  
      element.src = asset.src;
  
      element.onload = () => {
        loaded++;
        updateLoadingProgress();
        resolve();
      };
  
      element.oncanplaythrough = () => {
        // On utilise oncanplaythrough pour s'assurer que l'audio est totalement prêt à être joué
        if (asset.type === 'audio') {
          loaded++;
          updateLoadingProgress();
          resolve();
        }
      };
  
      element.onerror = (error) => {
        reject(new Error(`Erreur de chargement de la ressource: ${asset.src} (${error.message})`));
      };
    });
  }
  

  // Mettre à jour la barre de progression
  function updateLoadingProgress() {
    const progress = (loaded / total) * 100;
    loadingProgress.value = progress;
    loadingText.textContent = translations[lang].loading + ' ' + Math.round(progress) + '%';

    if (loaded === total) {
      hideLoadingScreen();
    }
  }

  // Masquer l'écran de chargement et démarrer le jeu
  function hideLoadingScreen() {
    loadingScreen.classList.add('hidden');  
    canvas.classList.remove('hidden');
    initializeGame();
  }

  // Initialiser et démarrer le jeu
  function initializeGame() {
    const ctx = canvas.getContext('2d');

    canvas.width = 1024;
    canvas.height = 1024;

    const game = new Game(canvas, ctx);

    let lastTime = 0;

    function animate(timeStamp) {
      const deltaTime = timeStamp - lastTime;
      lastTime = timeStamp;
      game.render(deltaTime);

      requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);
  }

  // Charger toutes les ressources
  Promise.all(assets.map(loadAsset))
    .catch(error => {
      console.error("Erreur de chargement des ressources:", error);
      loadingText.textContent = translations[lang].error;
    });

});