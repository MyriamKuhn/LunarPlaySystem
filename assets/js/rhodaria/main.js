/***********/

/* IMPORTS */

/***********/
import { Game } from '/assets/js/rhodaria/Game.js';


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
  const canvas2 = document.getElementById('canvas2');
  
  const assets = [
    { id: 'background', src: '/assets/img/rhodaria/forest_margin_repeat_1600x600.png', type: 'image' },
    { id: 'berry1', src: '/assets/img/rhodaria/magic_berry1.png', type: 'image' },
    { id: 'corgi', src: '/assets/img/rhodaria/snake_corgi.png', type: 'image' },
    { id: 'food', src: '/assets/img/rhodaria/food.png', type: 'image' },
    { id: 'wolf', src: '/assets/img/rhodaria/void_wolf.png', type: 'image' },
    { id: 'hound', src: '/assets/img/rhodaria/sticky_saberhound.png', type: 'image' },
    { id: 'schnoodle', src: '/assets/img/rhodaria/spectral_schnoodle.png', type: 'image' },
    { id: 'basilisk', src: '/assets/img/rhodaria/basilisk.png', type: 'image' },
    { id: 'carni', src: '/assets/img/rhodaria/carni_creeper.png', type: 'image' },
    { id: 'zilla', src: '/assets/img/rhodaria/snake_zilla.png', type: 'image' },
    { id: 'shark', src: '/assets/img/rhodaria/spore_shark.png', type: 'image' },
    { id: 'bad_food', src: '/assets/audio/rhodaria/bad_food.mp3', type: 'audio' },
    { id: 'bite1', src: '/assets/audio/rhodaria/bite1.mp3', type: 'audio' },
    { id: 'bite2', src: '/assets/audio/rhodaria/bite2.mp3', type: 'audio' },
    { id: 'bite3', src: '/assets/audio/rhodaria/bite3.mp3', type: 'audio' },
    { id: 'bite4', src: '/assets/audio/rhodaria/bite4.mp3', type: 'audio' },
    { id: 'bite5', src: '/assets/audio/rhodaria/bite5.mp3', type: 'audio' },
    { id: 'button', src: '/assets/audio/rhodaria/button.mp3', type: 'audio' },
    { id: 'restart', src: '/assets/audio/rhodaria/restart.mp3', type: 'audio' },
    { id: 'start', src: '/assets/audio/rhodaria/start.mp3', type: 'audio' },
    { id: 'win', src: '/assets/audio/rhodaria/win.mp3', type: 'audio' },
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
    canvas2.classList.remove('hidden');
    initializeGame();
  }

  // Initialiser et démarrer le jeu
  function initializeGame() {
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const ctx2 = canvas2.getContext('2d');
    canvas2.width = window.innerWidth;
    canvas2.height = window.innerHeight;
    
    const game = new Game(canvas, ctx, canvas2, ctx2);

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