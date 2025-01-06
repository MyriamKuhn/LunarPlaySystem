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
  
  const assets = [
    { id: 'background', src: '/assets/img/rhodaria/forest_margin_repeat.png', type: 'image' },
    { id: 'map2', src: '/assets/img/ringuara/map2.png', type: 'image' },
    { id: 'map3', src: '/assets/img/ringuara/map3.png', type: 'image' },
    { id: 'map4', src: '/assets/img/ringuara/map4.png', type: 'image' },
    { id: 'map5', src: '/assets/img/ringuara/map5.png', type: 'image' },
    { id: 'map6', src: '/assets/img/ringuara/map6.png', type: 'image' },
    { id: 'map7', src: '/assets/img/ringuara/map7.png', type: 'image' },
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
    { id: 'enemy11', src: '/assets/img/ringuara/enemy11.png', type: 'image' },
    { id: 'enemy12', src: '/assets/img/ringuara/enemy12.png', type: 'image' },
    { id: 'enemy13', src: '/assets/img/ringuara/enemy13.png', type: 'image' },
    { id: 'enemy14', src: '/assets/img/ringuara/enemy14.png', type: 'image' },
    { id: 'enemy15', src: '/assets/img/ringuara/enemy15.png', type: 'image' },
    { id: 'enemy16', src: '/assets/img/ringuara/enemy16.png', type: 'image' },
    { id: 'enemy17', src: '/assets/img/ringuara/enemy17.png', type: 'image' },
    { id: 'enemy18', src: '/assets/img/ringuara/enemy18.png', type: 'image' },
    { id: 'enemy19', src: '/assets/img/ringuara/enemy19.png', type: 'image' },
    { id: 'enemy20', src: '/assets/img/ringuara/enemy20.png', type: 'image' },
    { id: 'enemy21', src: '/assets/img/ringuara/enemy21.png', type: 'image' },
    { id: 'bomb', src: '/assets/audio/ringuara/bomb.wav', type: 'audio' },
    { id: 'bonus', src: '/assets/audio/ringuara/bonus.wav', type: 'audio' },
    { id: 'deadenemy1', src: '/assets/audio/ringuara/deadenemy1.wav', type: 'audio' },
    { id: 'deadenemy2', src: '/assets/audio/ringuara/deadenemy2.mp3', type: 'audio' },
    { id: 'dots1', src: '/assets/audio/ringuara/dots1.wav', type: 'audio' },
    { id: 'dots2', src: '/assets/audio/ringuara/dots2.wav', type: 'audio' },
    { id: 'dots3', src: '/assets/audio/ringuara/dots3.wav', type: 'audio' },
    { id: 'dots4', src: '/assets/audio/ringuara/dots4.wav', type: 'audio' },
    { id: 'dots5', src: '/assets/audio/ringuara/dots5.wav', type: 'audio' },
    { id: 'dots6', src: '/assets/audio/ringuara/dots6.wav', type: 'audio' },
    { id: 'dots7', src: '/assets/audio/ringuara/dots7.wav', type: 'audio' },
    { id: 'dots8', src: '/assets/audio/ringuara/dots8.wav', type: 'audio' },
    { id: 'dots9', src: '/assets/audio/ringuara/dots9.wav', type: 'audio' },
    { id: 'dragbomb1', src: '/assets/audio/ringuara/dragbomb1.mp3', type: 'audio' },
    { id: 'dragbomb2', src: '/assets/audio/ringuara/dragbomb2.mp3', type: 'audio' },
    { id: 'levelup', src: '/assets/audio/ringuara/levelup.wav', type: 'audio' },
    { id: 'lose', src: '/assets/audio/ringuara/lose.wav', type: 'audio' },
    { id: 'pacdead', src: '/assets/audio/ringuara/pacdead.wav', type: 'audio' },
    { id: 'pacwin', src: '/assets/audio/ringuara/pacwin.mp3', type: 'audio' },
    { id: 'power1', src: '/assets/audio/ringuara/power1.wav', type: 'audio' },
    { id: 'power2', src: '/assets/audio/ringuara/power2.wav', type: 'audio' },
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

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

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