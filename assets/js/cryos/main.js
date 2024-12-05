/***********/

/* IMPORTS */

/***********/
import { Game } from '/assets/js/aetheria/Game.js';


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
    { id: 'crewSprite', src: '/assets/img/aetheria/crewSprite.png', type: 'image' },
    { id: 'beetlemorph', src: '/assets/img/aetheria/beetlemorph100x100.png', type: 'image' },
    { id: 'rhinomorph', src: '/assets/img/aetheria/rhinomorph100x100.png', type: 'image' },
    { id: 'lobstermorph', src: '/assets/img/aetheria/lobstermorph100x100.png', type: 'image' },
    { id: 'phantommorph', src: '/assets/img/aetheria/phantommorph100x100.png', type: 'image' },
    { id: 'mantismorph', src: '/assets/img/aetheria/mantismorph100x100.png', type: 'image' },
    { id: 'eaglemorph', src: '/assets/img/aetheria/eaglemorph100x100.png', type: 'image' },
    { id: 'projectile', src: '/assets/img/aetheria/projectileLarge.png', type: 'image' },
    { id: 'locustmorph', src: '/assets/img/aetheria/locustmorph100x100.png', type: 'image' },
    { id: 'squidmorph', src: '/assets/img/aetheria/squidmorph100x100.png', type: 'image' },
    { id: 'boss', src: '/assets/img/aetheria/boss8.png', type: 'image' },
    { id: 'newgame', src: '/assets/audio/aetheria/newgame.mp3', type: 'audio' },
    { id: 'boom1', src: '/assets/audio/aetheria/boom1.mp3', type: 'audio' },
    { id: 'boom2', src: '/assets/audio/aetheria/boom2.mp3', type: 'audio' },
    { id: 'boom3', src: '/assets/audio/aetheria/boom3.mp3', type: 'audio' },
    { id: 'boom4', src: '/assets/audio/aetheria/boom4.mp3', type: 'audio' },
    { id: 'slide', src: '/assets/audio/aetheria/slide.mp3', type: 'audio' },
    { id: 'lose', src: '/assets/audio/aetheria/lose.mp3', type: 'audio' },
    { id: 'scream', src: '/assets/audio/aetheria/scream.mp3', type: 'audio' },
    { id: 'win', src: '/assets/audio/aetheria/win.mp3', type: 'audio' }
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
    canvas.width = 1500;
    canvas.height = 500;
  }

  class InputHandler { 
    
  }

});
