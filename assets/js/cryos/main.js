/***********/

/* IMPORTS */

/***********/
import { Game } from '/assets/js/cryos/Game.js';


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

    canvas.width = 720;
    canvas.height = 720;

    const game = new Game(canvas, ctx);

    let lastTime = 0;
    function animate(timeStamp) {
      const deltaTime = timeStamp - lastTime;
      lastTime = timeStamp;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
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
