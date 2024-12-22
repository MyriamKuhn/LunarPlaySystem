/***********/

/* IMPORTS */

/***********/
import { Game } from '/assets/js/lunara/Game.js';


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
    { id: 'background', src: '/assets/img/cryos/background_single.png', type: 'image' },
    { id: 'enemy1', src: '/assets/img/lunara/enemy1.png', type: 'image' },
    { id: 'enemy2', src: '/assets/img/lunara/enemy2.png', type: 'image' },
    { id: 'enemy3', src: '/assets/img/lunara/enemy3.png', type: 'image' },
    { id: 'enemy4', src: '/assets/img/lunara/enemy4.png', type: 'image' },
    { id: 'enemy5', src: '/assets/img/lunara/enemy5.png', type: 'image' },
    { id: 'enemy6', src: '/assets/img/lunara/enemy6.png', type: 'image' },
    { id: 'enemy7', src: '/assets/img/lunara/enemy7.png', type: 'image' },
    { id: 'enemy8', src: '/assets/img/lunara/enemy8.png', type: 'image' },
    { id: 'enemy9', src: '/assets/img/lunara/enemy9.png', type: 'image' },
    { id: 'defender0', src: '/assets/img/lunara/defender0.png', type: 'image' },
    { id: 'defender1', src: '/assets/img/lunara/defender1.png', type: 'image' },
    { id: 'defender2', src: '/assets/img/lunara/defender2.png', type: 'image' },
    { id: 'defender3', src: '/assets/img/lunara/defender3.png', type: 'image' },
    { id: 'defender4', src: '/assets/img/lunara/defender4.png', type: 'image' },
    { id: 'defender5', src: '/assets/img/lunara/defender5.png', type: 'image' },
    { id: 'defender6', src: '/assets/img/lunara/defender6.png', type: 'image' },
    { id: 'defender7', src: '/assets/img/lunara/defender7.png', type: 'image' },
    { id: 'larva1', src: '/assets/img/lunara/larva1.png', type: 'image' },
    { id: 'larva2', src: '/assets/img/lunara/larva2.png', type: 'image' },
    { id: 'larva3', src: '/assets/img/lunara/larva3.png', type: 'image' },
    { id: 'projectile1', src: '/assets/img/lunara/projectile1.png', type: 'image' },
    { id: 'projectile2', src: '/assets/img/lunara/projectile2.png', type: 'image' },
    { id: 'projectile4', src: '/assets/img/lunara/projectile4.png', type: 'image' },
    { id: 'projectile5', src: '/assets/img/lunara/projectile5.png', type: 'image' },
    { id: 'projectile6', src: '/assets/img/lunara/projectile6.png', type: 'image' },
    { id: 'projectile7', src: '/assets/img/lunara/projectile7.png', type: 'image' },
    { id: 'change', src: '/assets/audio/lunara/change.mp3', type: 'audio' },
    { id: 'lose', src: '/assets/audio/lunara/lose.mp3', type: 'audio' },
    { id: 'place', src: '/assets/audio/lunara/place.wav', type: 'audio' },
    { id: 'projectile', src: '/assets/audio/lunara/projectile.wav', type: 'audio' },
    { id: 'wave', src: '/assets/audio/lunara/wave.mp3', type: 'audio' },
    { id: 'win', src: '/assets/audio/lunara/win.mp3', type: 'audio' },
    { id: 'resource', src: '/assets/audio/lunara/resource.mp3', type: 'audio' },
    { id: 'dead', src: '/assets/audio/lunara/dead.mp3', type: 'audio' },
    { id: 'defender', src: '/assets/audio/lunara/defender.mp3', type: 'audio' },
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

    canvas.width = 1350;
    canvas.height = 900;

    const game = new Game(canvas, ctx);

    let lastTime = 0;
    function animate(timestamp) {
      const deltaTime = timestamp - lastTime;
      lastTime = timestamp;
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