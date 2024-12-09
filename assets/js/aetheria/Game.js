/***********/

/* IMPORTS */

/***********/
import { BeetlemorphOne } from '/assets/js/aetheria/Beetlemorph.js';
import { Projectile } from '/assets/js/aetheria/Projectile.js';
import { WaveManager } from '/assets/js/aetheria/WaveManager.js';
import { AudioControl } from '/assets/js/aetheria/AudioControl.js'; 
import { secureInput, securePlayername, sendScore, shuffleArray } from '/assets/js/utils.js';


/*************/

/* VARIABLES */

/*************/
const lang = sessionStorage.getItem('lang') || document.querySelector('meta[name="language"]').getAttribute('content');

const translations = {
  'fr': {
    'gameover': 'Aargh!',
    'gameover2' : 'Tout votre équipage a été mangé !',
    'run': 'Anéantissez les envahisseurs,',
    'eaten': 'avant qu\'ils ne vous dévorent !',
    'press': '⚔️ Appuyez sur "ENTRÉE" ou "R" pour commencer ! ⚔️',
    'press2': '💻 Appuyez sur "ESPACE" ou "F" pour le plein écran ! 💻',
    'press3': '👈 Appuyez sur "B" pour revenir au menu ! 👈',
    'press4': '🔊 Appuyez sur "M" pour activer/désactiver le son ! 🔇',
    'press5': '📱 Sur mobile, utilisez les boutons ci-dessous 👇',
    'score': 'Score : ',
  },
  'en': {
    'gameover': 'Aargh!',
    'gameover2' : 'All your crew has been eaten!',
    'run': 'Destroy the invaders,',
    'eaten': 'before they eat you!',
    'press': '⚔️ Press "ENTER" or "R" to start! ⚔️',
    'press2': '💻 Press "SPACE" or "F" for fullscreen! 💻',
    'press3': '👈 Press "B" to go back to the menu! 👈',
    'press4': '🔊 Press "M" to toggle sound on/off! 🔇',
    'press5': '📱 On mobile, use the buttons below 👇',
    'score': 'Score: ',
  },
  'de': {
    'gameover': 'Aargh!',
    'gameover2' : 'Deine Crew wurde gefressen!',
    'run': 'Zerstöre die Eindringlinge,',
    'eaten': 'bevor sie dich fressen!',
    'press': '⚔️ Drück "ENTER" oder "R", um zu beginnen! ⚔️',
    'press2': '💻 Drück "LEERTASTE" oder "F" für Vollbild! 💻',
    'press3': '👈 Drück "B", um zum Menü zurückzukehren! 👈',
    'press4': '🔊 Drück "M", um den Ton ein-/auszuschalten! 🔇',
    'press5': '📱 Auf Mobilgeräten benutze die Schaltflächen hier unten 👇',
    'score': 'Punkte: ',
  },
};
    


/*****************/

/* MOTEUR DU JEU */

/*****************/
export class Game {
  /**
   * @param {HTMLCanvasElement} canvas - Le canvas sur lequel le jeu sera dessiné
   * @param {CanvasRenderingContext2D} ctx - Le contexte 2D du canvas
   *
   * @property {HTMLCanvasElement} canvas - Le canvas sur lequel le jeu sera dessiné
   * @property {CanvasRenderingContext2D} ctx - Le contexte 2D du canvas
   * @property {number} width - La largeur du canvas
   * @property {number} height - La hauteur du canvas
   * @property {Array} enemyPool - Le pool d'ennemis
   * @property {number} numberOfEnemies - Le nombre d'ennemis
   * @property {number} enemyTimer - Le timer pour les ennemis
   * @property {number} enemyInterval - L'intervalle entre chaque ennemi
   * @property {WaveManager} waveManager - Le gestionnaire des vagues
   * @property {number} score - Le score du joueur
   * @property {number} scoreMultiplier - Le multiplicateur de score
   * @property {number} scoreToCheck - Le score à vérifier
   * @property {number} nextLevelScore - Le score pour passer au niveau suivant
   * @property {number} level - Le niveau du joueur
   * @property {number} lives - Le nombre de vies du joueur
   * @property {string} message1 - Le premier message
   * @property {string} message2 - Le deuxième message
   * @property {string} message3 - Le troisième message
   * @property {string} message4 - Le quatrième message
   * @property {string} message5 - Le cinquième message
   * @property {HTMLImageElement} crewImage - L'image du joueur
   * @property {Array} crewMember - Les membres de l'équipage
   * @property {boolean} gameOver - Le jeu est-il terminé ?
   * @property {boolean} debug - Le mode debug est-il activé ?
   * @property {boolean} hasTriggeredWin - Le joueur a-t-il gagné ?
   * @property {boolean} hasTriggeredGameOver - Le joueur a-t-il perdu ?
   * @property {boolean} hasTriggeredNextLevel - Le joueur est-il passé au niveau suivant ?
   * @property {number} spriteTimer - Le timer pour les sprites
   * @property {number} spriteInterval - L'intervalle entre chaque sprite
   * @property {boolean} spriteUpdate - Le sprite a-t-il été mis à jour ?
   * @property {AudioControl} sound - Le contrôleur des sons
   * @property {Object} mouse - Les coordonnées de la souris
   * @property {number} dynamicFontSize - La taille de la police dynamique
   * @property {number} smallFontSize - La taille de la police petite
   * @property {number} lineSpacing - L'espacement entre les lignes de texte
   * @property {number} lineSpacingSmall - L'espacement entre les lignes de texte petites
   * @property {number} w - La largeur de l'image
   * @property {number} h - La hauteur de l'image
   * @property {number} spacing - L'espacement entre les membres de l'équipage
   * 
   * @method start - Initialise le jeu
   * @method generateCrew - Génère l'équipage
   * @method resize - Redimensionne le canvas
   * @method toggleFullScreen - Active ou désactive le mode plein écran
   * @method checkCollision - Vérifie s'il y a une collision entre deux objets
   * @method createEnemyPool - Crée un pool d'ennemis
   * @method getEnemy - Récupère un ennemi libre
   * @method handleEnemies - Gère les ennemis du jeu
   * @method triggerGameOver - Déclenche la fin du jeu
   * @method handleSpriteTimer - Gère le timer des sprites
   * @method drawStatusText - Dessine le texte du jeu
   * @method render - Dessine le jeu, appelé à chaque frame du jeu
   * 
   * @description Constructeur de la classe Game
   * On définit les propriétés générales du jeu
   * On appelle la méthode start pour initialiser le jeu
   * On ajoute un event listener pour redimensionner le canvas
   */
  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.width = this.canvas.width;
    this.height = this.canvas.height;

    this.enemyPool = [];
    this.numberOfEnemies = 50;
    this.createEnemyPool();
    this.projectilePool = [];
    this.numberOfProjectiles = 50;
    this.createProjectilePool();
    this.enemyTimer = 0;
    this.enemyInterval = 1000;
    this.waveManager = new WaveManager();
    this.isBossDead = false;

    this.score = 0;
    this.scoreMultiplier = 1;
    this.scoreToCheck = 0;
    this.nextLevelScore = 0;
    this.level = 1;
    this.lives;
    this.message1 = translations[lang].run;
    this.message2 = translations[lang].eaten;
    this.message3 = translations[lang].press;
    this.message4 = translations[lang].press2;
    this.message5 = translations[lang].press3;
    this.message6 = translations[lang].press4;
    this.message7 = translations[lang].press5;
    this.crewImage = document.getElementById('crewSprite');
    this.crewMembers = [];
    this.gameOver = true;
    this.debug = false;
    this.hasTriggeredWin = false;
    this.hasTriggeredGameOver = false;
    this.hasTriggeredNextLevel = false;

    this.spriteTimer = 0;
    this.spriteInterval = 120;
    this.spriteUpdate = false;

    this.sound = new AudioControl();

    this.mouse = {
      x: undefined,
      y: undefined,
      width: 1,
      height: 1,
      pressed: false,
      fired: false,
    };

    this.dynamicFontSize;
    this.smallFontSize;
    this.lineSpacing;
    this.lineSpacingSmall;
    this.w;
    this.h;
    this.spacing;

    this.resize(window.innerWidth, window.innerHeight);

    this.resetButton = document.getElementById('resetButton');
    this.resetButton.addEventListener('click', e => {
      this.start();
    });
    this.resetButton.addEventListener('touchend', e => {
      e.preventDefault();
      this.start();
    }, { passive: false });

    this.fullScreenButton = document.getElementById('fullScreenButton');
    this.fullScreenButton.addEventListener('click', e => {
      this.toggleFullScreen();
    });
    this.fullScreenButton.addEventListener('touchend', e => {
      e.preventDefault();
      this.toggleFullScreen();
    }, { passive: false });

    this.backButton = document.getElementById('backButton');
    this.backButton.addEventListener('click', e => {
      window.location.href = '/' + lang + '/lunarplay/';
    });
    this.backButton.addEventListener('touchend', e => {
      e.preventDefault();
      window.location.href = '/' + lang + '/lunarplay/';
    }, { passive: false });

    this.volumeButton = document.getElementById('volumeButton');
    this.volumeButton.addEventListener('click', e => {
      this.sound.toggleMute();
    });
    this.volumeButton.addEventListener('touchend', e => {
      e.preventDefault();
      this.sound.toggleMute();
    }, { passive: false });

    window.addEventListener('resize', e => {
      this.resize(e.target.innerWidth, e.target.innerHeight);
    });

    window.addEventListener('mousedown', e => {
      e.preventDefault();
      this.mouse.x = e.x;
      this.mouse.y = e.y;
      this.mouse.pressed = true;
      this.mouse.fired = false;
    });

    window.addEventListener('mouseup', e => {
      e.preventDefault();
      this.mouse.x = e.x;
      this.mouse.y = e.y;
      this.mouse.pressed = false;
    }, { passive: false });

    window.addEventListener('touchstart', e => {
      e.preventDefault();
      this.mouse.x = e.changedTouches[0].pageX;
      this.mouse.y = e.changedTouches[0].pageY;
      this.mouse.pressed = true;
      this.mouse.fired = false;
    }, { passive: false });

    window.addEventListener('touchend', e => {
      e.preventDefault();
      this.mouse.x = e.changedTouches[0].pageX;
      this.mouse.y = e.changedTouches[0].pageY;
      this.mouse.pressed = false;
    }, { passive: false });
    
    window.addEventListener('keyup', e => {
      if (e.key === 'Enter' || e.key.toLowerCase() === 'r') {
        this.start();
      } else if (e.key === ' ' || e.key.toLowerCase() === 'f') {
        this.toggleFullScreen();
      } else if (e.key.toLowerCase() === 'b') {
        window.location.href = '/' + lang + '/lunarplay/';
      } else if (e.key.toLowerCase() === 'd') {
        this.debug = !this.debug;
      } else if (e.key.toLowerCase() === 'm') {
        this.sound.toggleMute();
      }
    });
  }

  start() {
    const controls = document.querySelector('.controls');
    controls.style.pointerEvents = 'none';
    controls.classList.add('hidden');
    this.hasTriggeredWin = false;
    this.hasTriggeredGameOver = false;
    this.hasTriggeredNextLevel = false;
    this.scoreMultiplier = 1;
    this.enemyInterval = 1000;
    this.enemyPool = [];
    this.createEnemyPool();
    this.projectilePool = [];
    this.createProjectilePool();
    this.score = 0;
    this.scoreToCheck = 0;
    this.lives = 10;
    this.level = 1;
    this.generateCrew();
    this.gameOver = false;
    this.nextLevelScore = this.scoreToCheck + this.waveManager.getPointsRequired(this.level);
    this.enemyPool.forEach(enemy => {
      enemy.reset();
    });
    for (let i = 0; i < 3; i++) {
      const enemy = this.getEnemy();
      if (enemy) enemy.start();
    }
    this.projectilePool.forEach(projectile => {
      projectile.reset();
    });
    
    this.sound.play('newgame');
  }

  generateCrew() {
    this.crewMembers = [];
    for (let i = 0; i < this.lives; i++) {
      this.crewMembers.push({
        frameX: Math.floor(Math.random() * 5),
        frameY: Math.floor(Math.random() * 5),
      });
    }
  }

  /**
   * @param {number} width - La nouvelle largeur du canvas
   * @param {number} height - La nouvelle hauteur du canvas
   * 
   * @description Redimensionne le canvas
   */
  resize(width, height) {
    this.canvas.width = width;
    this.canvas.height = height;
    this.width = width;
    this.height = height;
    this.ctx.fillStyle = 'white';
    this.ctx.strokeStyle = 'white';
    this.ctx.font = '30px Bangers';
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';

    // Calcul de la taille de la police en fonction de la largeur de l'écran
    const referenceWidth = 1920;
    const scalingFactor = Math.min(Math.max(referenceWidth / this.width, 0.8), 1.3);
    const baseFontSize = Math.min(this.width, this.height) / 20;  
    this.dynamicFontSize = baseFontSize * scalingFactor;

    this.smallFontSize = this.dynamicFontSize / 1.5;

    // Calcul de l'espacement entre les lignes de texte, relatif à la taille de la police
    this.lineSpacing = this.dynamicFontSize * 1.2; 
    this.lineSpacingSmall = this.smallFontSize * 1.2; 

    // Appliquer le facteur de mise à l'échelle uniquement aux dimensions de l'image
    const imageWidth = 20;
    const imageHeight = 45;
    const scalingFactorPics = Math.min(Math.max(this.width / referenceWidth, 0.5), 2.5);
    this.w = imageWidth * scalingFactorPics;
    this.h = imageHeight * scalingFactorPics;
    this.spacing = 16 * scalingFactorPics;  // Ajuster l'espacement entre les coéquipiers
  }

  toggleFullScreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }

  /**
  * @param {Object} a - Objet a
  * @param {Object} b - Objet b
  * 
  * @description Vérifie s'il y a une collision entre les deux objets
   */
  checkCollision(a, b) {
    return a.x < b.x + b.width &&
      a.x + a.width > b.x &&
      a.y < b.y + b.height &&
      a.y + a.height > b.y;
  }

  createEnemyPool() {
    for (let i = 0; i < this.numberOfEnemies; i++) {
      this.enemyPool.push(new BeetlemorphOne(this));
    }
  }

  createProjectilePool() {
    for (let i = 0; i < this.numberOfProjectiles; i++) {
      this.projectilePool.push(new Projectile(this));
    }
  }

  getEnemy() {
    for (let i = 0; i < this.enemyPool.length; i++) {
      if (this.enemyPool[i].free) return this.enemyPool[i];
    }
  }

  getEnemyProjectile() {
    for (let i = 0; i < this.projectilePool.length; i++) {
      if (this.projectilePool[i].free) return this.projectilePool[i];
    }
  }

  /**
   * @param {number} deltaTime - Le temps écoulé depuis le dernier frame
   * 
   * @description Gère les ennemis du jeu en les faisant apparaître à intervalles réguliers pour éviter l'interférence avec certains moniteurs et navigateurs au niveau de leur FPS
   */
  handleEnemies(deltaTime) {
    if (this.enemyTimer < this.enemyInterval) {
      this.enemyTimer += deltaTime;
    } else {
      this.enemyTimer = 0;
      const enemy = this.getEnemy();
      if (enemy) enemy.start();
    }
  }

  triggerGameOver() {
    if (!this.gameOver) {
      this.gameOver = true;
      // Récupérer le nom du joueur depuis la session
      const playerName = securePlayername(sessionStorage.getItem('playername')); 
      const planet = 'aetheria';
      const score = parseInt(this.score, 10); 

      // Vérifier si le nom du joueur est disponible
      if (playerName) {
        // Préparer les données à envoyer
        const data = {
          planet: planet,
          playername: playerName,
          score: score
        };
        if (!data.planet || !data.playername || !data.score) {
          this.enemyPool.forEach(enemy => {
            enemy.reset();
          });
          const controls = document.querySelector('.controls');
          controls.style.pointerEvents = 'auto';
          controls.classList.remove('hidden');
          
          this.message1 = translations[lang].gameover;
          this.message2 = translations[lang].gameover2;
          this.sound.play('lose');
          return;
        }
        // Envoyer la requête fetch pour ajouter le score
        sendScore(data);
      }
      this.enemyPool.forEach(enemy => {
        enemy.reset();
      });

      const controls = document.querySelector('.controls');
      controls.style.pointerEvents = 'auto';
      controls.classList.remove('hidden');

      this.message1 = translations[lang].gameover;
      this.message2 = translations[lang].gameover2;
      this.sound.play('lose');
    }
  }


  triggerNextLevel(level) {
    this.level++;
      
    this.nextLevelScore = this.scoreToCheck + (this.waveManager.getPointsRequired(this.level) * 1.5);
    const currentWave = this.waveManager.getWaveEnemies(level);

    // Liste pour les ennemis non libres
    let notReplacedEnemies = [];
      
    // Remplacement des ennemis dans le pool
    currentWave.enemies.forEach(enemyConfig => {
      const index = this.enemyPool.findIndex(enemy => enemy instanceof enemyConfig.oldType && enemy.free);
      if (index !== -1) {
        this.enemyPool[index] = new enemyConfig.newType(this);
        this.enemyPool[index].reset();
      } else {
        notReplacedEnemies.push(enemyConfig);
      }
    });

    // Si certains ennemis n'ont pas été remplacés, les traiter plus tard
    if (notReplacedEnemies.length > 0) {
      // Attendre que les ennemis deviennent libres
      const intervalId = setInterval(() => {
        for (let ind = notReplacedEnemies.length - 1; ind >= 0; ind--) {
          const enemyConfig = notReplacedEnemies[ind];
          const index = this.enemyPool.findIndex(enemy => enemy instanceof enemyConfig.oldType && enemy.free);
          if (index !== -1) {
            this.enemyPool[index] = new enemyConfig.newType(this);
            this.enemyPool[index].reset();
            notReplacedEnemies.splice(ind, 1);
          }
        }
        // Si tous les ennemis ont été remplacés, arrêter l'intervalle
        if (notReplacedEnemies.length <= 0) {
          clearInterval(intervalId);
          shuffleArray(this.enemyPool);
          currentWave.toActivate.forEach(enemyType => {
            const enemy = this.enemyPool.find(enemy => enemy instanceof enemyType);
            if (enemy && enemy.free) {
              enemy.start();
            }
          });
          this.hasTriggeredNextLevel = false;
          this.isBossDead = false;
        }
      }, 500);
    } else {
      // Mélanger le tableau des ennemis après avoir fait les changements
      shuffleArray(this.enemyPool);
    
      // Activation des ennemis à activer
      currentWave.toActivate.forEach(enemyType => {
        const enemy = this.enemyPool.find(enemy => enemy instanceof enemyType);
        if (enemy && enemy.free) {
          enemy.start();
        }
      });
      // Mise à jour du boss si c'est un boss
      this.isBossDead = false;
      // Permet de déclencher le prochain niveau
      this.hasTriggeredNextLevel = false;

      //console.log('Ennemis:', this.enemyPool);
      //console.log('Vague activée :', currentWave);
      //console.log('Niveau:', this.level);
    }
  }
  
  

  /**
   * @param {number} deltaTime - Le temps écoulé depuis le dernier frame
   * 
   * @description Gère le timer des sprites
   */
  handleSpriteTimer(deltaTime) {
    if (this.spriteTimer < this.spriteInterval) {
      this.spriteTimer += deltaTime;
      this.spriteUpdate = false;
    } else {
      this.spriteTimer = 0;
      this.spriteUpdate = true;
    }
  }

  drawStatusText() {
    if (this.gameOver) {
      this.ctx.save();
      this.ctx.textAlign = 'center';

      // Ajustement de la taille de la police pour les messages principaux
      this.ctx.font = `${this.dynamicFontSize}px Bangers`;
      this.ctx.fillText(this.message1, this.width * 0.5, this.height * 0.25 - this.lineSpacing);
      this.ctx.fillText(this.message2, this.width * 0.5, this.height * 0.25);

      // Ajustement de la taille de la police pour les messages secondaires
      this.ctx.font = `${this.smallFontSize}px Bangers`;
      this.ctx.fillText(this.message3, this.width * 0.5, this.height * 0.25 + this.lineSpacingSmall * 2);
      this.ctx.fillText(this.message4, this.width * 0.5, this.height * 0.25 + this.lineSpacingSmall * 3);
      this.ctx.fillText(this.message5, this.width * 0.5, this.height * 0.25 + this.lineSpacingSmall * 4);
      this.ctx.fillText(this.message6, this.width * 0.5, this.height * 0.25 + this.lineSpacingSmall * 5);
      this.ctx.fillText(this.message7, this.width * 0.5, this.height * 0.25 + this.lineSpacingSmall * 7);

      this.ctx.restore();
    }

    // Affichage du score et des vies, positionné en haut à gauche
    this.ctx.save();
    this.ctx.textAlign = 'left';
    this.ctx.font = `${this.dynamicFontSize}px Bangers`;  // Petite taille pour le score et les vies
    this.ctx.fillText(translations[lang].score + ' ' + this.score, 20, this.lineSpacing);

    // Affichage des vies restantes de l'équipage
    for (let i = 0; i < this.lives; i++) {
      const imageWidth = 20;
      const imageHeight = 45;

      // Dessiner l'image avec la taille ajustée, mais garder la position et les dimensions d'origine pour l'image source
      this.ctx.drawImage(this.crewImage, 
        this.crewMembers[i].frameX * imageWidth, 
        this.crewMembers[i].frameY * imageHeight, 
        imageWidth, 
        imageHeight, 
        20 + i * this.spacing, 
        this.lineSpacing + this.lineSpacingSmall, 
        this.w, 
        this.h
      );
    }

    this.ctx.restore();

    // Affichage du message de fin de jeu si les vies sont épuisées
    if (this.lives < 1 && !this.hasTriggeredGameOver) {
      this.hasTriggeredGameOver = true;
      this.triggerGameOver();
    }

    // Vérification du boss et passage au niveau suivant
    if (this.waveManager.getIsBossCheck(this.level) && !this.isBossDead) {
      return;
    }

    // A partir du level 82, le joueur aura tout le temps les mêmes ennemis mais avec un intervalle de temps qui diminue progressivement jusqu'à 0
    if (this.level >=82 && !this.hasTriggeredWin) {
      this.hasTriggeredWin = true;
      // Appeler immédiatement le code de l'intervalle
      if (this.enemyInterval > 0) {
        this.enemyInterval -= 100;
        this.scoreMultiplier += 0.5;
        this.sound.play('win');
      }
      // Appeler l'intervalle toutes les 60 secondes
      this.intervalId = setInterval(() => {
        if (this.enemyInterval <= 0) {
          clearInterval(this.intervalId); 
        } else {
          this.enemyInterval -= 100;
          this.scoreMultiplier += 0.5;
          this.sound.play('win');
        }
      }, 60000);
      return;
    }

    // Passage au niveau suivant lorsque le score est suffisant
    if (this.nextLevelScore <= this.score && this.level < 82 && !this.hasTriggeredNextLevel) {
      this.hasTriggeredNextLevel = true;
      this.triggerNextLevel(this.level); 
      this.scoreToCheck = this.score;
      //console.log('Score mémorisé:', this.scoreToCheck);
      //console.log('Points requis:', this.waveManager.getPointsRequired(this.level));
      //console.log('Score requis:', this.nextLevelScore);
    }
  }

  /**
   * @param {number} deltaTime - Le temps écoulé depuis le dernier frame
   * 
   * @description Dessine le jeu, appelé à chaque frame du jeu
   */
  render(deltaTime) {
    this.handleSpriteTimer(deltaTime);
    this.drawStatusText();
    if (!this.gameOver) {
      this.handleEnemies(deltaTime);
      // Pour garantir que l'ennemi du dessus soit dessiné en dernier et donc est touché en premier)
      for (let i = this.enemyPool.length - 1; i >= 0; i--) {
        this.enemyPool[i].update(deltaTime);
      }
      this.enemyPool.forEach(enemy => {
        enemy.draw();
      });
      for (let i = this.projectilePool.length - 1; i >= 0; i--) {
        this.projectilePool[i].update(deltaTime);
      };
      this.projectilePool.forEach(projectile => {
        projectile.draw();
      });
    }
  }
}