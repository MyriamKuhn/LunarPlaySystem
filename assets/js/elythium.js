/***********/

/* PLANETE */

/***********/
class Planet {
  /**
   * @param {Game} game - Instance de la classe Game
   * 
   * @property {Game} game - Instance de la classe Game
   * @property {number} x - Position horizontale de la planète
   * @property {number} y - Position verticale de la planète
   * @property {number} radius - Rayon de la planète
   * @property {HTMLImageElement} image - Image de la planète
   * 
   * @method draw - Dessine la planète
   * 
   * @description Constructeur de la classe Planet
   */
  constructor(game){
    this.game = game;
    this.x = this.game.width * 0.5;
    this.y = this.game.height * 0.5;
    this.radius = 80;
    this.image = document.getElementById('planet');
  }

  /**
   * @param {CanvasRenderingContext2D} context - Contexte 2D du canvas
   * 
   * @description Dessine la planète
   * On commence par dessiner l'image de la planète avec drawImage() et les paramètres suivants :
   * - this.image : image de la planète
   * - this.x - 100 : position horizontale de la planète - 100 (un peu plus que le rayon de la planète à cause des nuages autour de la planète)
   * - this.y - 100 : position verticale de la planète - 100 (un peu plus que le rayon de la planète à cause des nuages autour de la planète)
   * Si le mode debug est activé on dessine un cercle de collision autour de la planète avec beginPath() et arc() avec les paramètres suivants :
   * - this.x : position horizontale de la planète
   * - this.y : position verticale de la planète
   * - this.radius : rayon de la planète
   * - 0 : angle de départ
   * - Math.PI * 2 : angle de fin (cercle complet)
   */
  draw(context){
    context.drawImage(this.image, this.x - 100, this.y - 100);
    if (this.game.debug) {
      context.beginPath();
      context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      context.stroke();
    }
  }
}


/**********/

/* JOUEUR */

/**********/
class Player {
  /**
   * @param {Game} game - Instance de la classe Game
   * 
   * @property {Game} game - Instance de la classe Game
   * @property {number} x - Position horizontale du joueur
   * @property {number} y - Position verticale du joueur
   * @property {number} radius - Rayon du joueur
   * @property {HTMLImageElement} image - Image du joueur
   * @property {array} aim - Direction du regard (x, y, dx, dy)
   * @property {number} angle - Angle du joueur
   * 
   * @method draw - Dessine le joueur
   * @method update - Met à jour le joueur
   * @method shoot - Tire un projectile
   * 
   * @description Constructeur de la classe Player
   */
  constructor(game){
    this.game = game;
    this.x = this.game.width * 0.5;
    this.y = this.game.height * 0.5;
    this.radius = 40;
    this.image = document.getElementById('player');
    this.aim;
    this.angle = 0;
  }

  /**
   * @param {CanvasRenderingContext2D} context - Contexte 2D du canvas
   * 
   * @description Dessine le joueur
   * On commence par sauvegarder le contexte avec save() pour ne pas affecter les autres éléments
   * On déplace le contexte au centre du joueur avec translate(this.x, this.y)
   * On fait tourner le contexte en fonction de l'angle du joueur avec rotate(this.angle)
   * On dessine l'image du joueur avec drawImage() et les paramètres suivants :
   * - this.image : image du joueur
   * - -this.radius : position horizontale du joueur
   * - -this.radius : position verticale du joueur
   * Si le mode debug est activé on dessine un cercle de collision autour du joueur avec beginPath() et arc() avec les paramètres suivants :
   * - 0 : position horizontale du joueur
   * - 0 : position verticale du joueur
   * - this.radius : rayon du joueur
   * - 0 : angle de départ
   * - Math.PI * 2 : angle de fin (cercle complet)
   * On restaure le contexte avec restore() pour ne pas affecter les autres éléments
   */
  draw(context){
    context.save();  
    context.translate(this.x, this.y);  
    context.rotate(this.angle);  
    context.drawImage(this.image, -this.radius, -this.radius);
    if (this.game.debug) {
      context.beginPath();
      context.arc(0, 0, this.radius, 0, Math.PI * 2);
      context.stroke();
    }
    context.restore();  
  }

  update(){
    this.aim = this.game.calcAim(this.game.planet, this.game.mouse);
    this.x = this.game.planet.x + (this.game.planet.radius + this.radius) * this.aim[0];  // x = x de la planète + (rayon de la planète + rayon du joueur) * direction du regard
    this.y = this.game.planet.y + (this.game.planet.radius + this.radius) * this.aim[1];  // y = y de la planète + (rayon de la planète + rayon du joueur) * direction du regard
    this.angle = Math.atan2(this.aim[3], this.aim[2]);  // angle = atan2(dy, dx) = atan2(y de la planète - y du joueur, x de la planète - x du joueur)
  }

  shoot(){
    const projectile = this.game.getProjectile();
    if (projectile) projectile.start(this.x + this.radius * this.aim[0], this.y + this.radius * this.aim[1], this.aim[0], this.aim[1]);
  }
}


/***************/

/* PROJECTILES */

/***************/
class Projectile {
  /**
   * @param {Game} game - Instance de la classe Game
   * 
   * @property {Game} game - Instance de la classe Game
   * @property {number} x - Position horizontale du projectile
   * @property {number} y - Position verticale du projectile
   * @property {number} radius - Rayon du projectile
   * @property {number} speedX - Vitesse horizontale du projectile
   * @property {number} speedY - Vitesse verticale du projectile
   * @property {number} speedModifier - Modificateur de vitesse du projectile
   * @property {boolean} free - Projectile libre ou non
   * 
   * @method start - Démarre le projectile
   * @method reset - Réinitialise le projectile
   * @method draw - Dessine le projectile
   * @method update - Met à jour le projectile
   * 
   * @description Constructeur de la classe Projectile
   * Il s'agit d'un pattern object pool de projectiles
   */
  constructor(game){
    this.game = game;
    this.x;
    this.y;
    this.radius = 5;
    this.speedX = 1;
    this.speedY = 1;
    this.speedModifier = 5;
    this.free = true;
  }

  /**
   * @param {number} x - Position horizontale du projectile
   * @param {number} y - Position verticale du projectile
   * @param {number} speedX - Vitesse horizontale du projectile
   * @param {number} speedY - Vitesse verticale du projectile
   * 
   * @description Démarre le projectile
   */
  start(x, y, speedX, speedY){
    this.free = false;
    this.x = x;
    this.y = y;
    this.speedX = speedX * this.speedModifier;
    this.speedY = speedY * this.speedModifier;
  }

  reset(){
    this.free = true;
  }

  /**
   * @param {CanvasRenderingContext2D} context - Contexte 2D du canvas
   * 
   * @description Dessine le projectile
   */
  draw(context){
    if (!this.free) {
      context.save();  // On sauvegarde le contexte pour ne pas affecter les autres éléments
      context.beginPath();
      context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      context.fillStyle = 'gold';
      context.fill();
      context.restore();  // On restaure le contexte pour ne pas affecter les autres éléments
    }
  }

  update(){
    if (!this.free) {
      this.x += this.speedX;
      this.y += this.speedY;
      // Si le projectile sort du canvas on le réinitialise
      if (this.x < 0 || this.x > this.game.width || this.y < 0 || this.y > this.game.height) {
        this.reset();
      }
    }
  }
}


/***********/

/* ENNEMIS */

/***********/
class Enemy {
  /**
   * @param {Game} game - Instance de la classe Game
   * 
   * @property {Game} game - Instance de la classe Game
   * @property {number} x - Position horizontale de l'ennemi
   * @property {number} y - Position verticale de l'ennemi
   * @property {number} radius - Rayon de l'ennemi
   * @property {number} width - Largeur de l'ennemi
   * @property {number} height - Hauteur de l'ennemi
   * @property {number} speedX - Vitesse horizontale de l'ennemi
   * @property {number} speedY - Vitesse verticale de l'ennemi
   * @property {number} speedModifier - Modificateur de vitesse de l'ennemi
   * @property {number} angle - Angle de rotation de l'ennemi
   * @property {boolean} collided - Collision ou non
   * @property {boolean} free - Ennemi libre ou non
   * 
   * @method start - Démarre l'ennemi
   * @method reset - Réinitialise l'ennemi
   * @method hit - Ennemi touché
   * @method draw - Dessine l'ennemi
   * @method update - Met à jour l'ennemi
   * 
   * @description Constructeur de la classe Enemy
   * Il s'agit d'un pattern object pool d'ennemis
   */
  constructor(game){
    this.game = game;
    this.x = 100;
    this.y = 100;
    this.radius = 40;
    this.width = this.radius * 2;
    this.height = this.radius * 2;
    this.speedX = 0;
    this.speedY = 0;
    this.speedModifier = Math.random() * 0.5 + 0.1;
    this.angle = 0;
    this.collided = false;
    this.free = true;
  }

  start(){
    this.free = false;
    // Réinitialisation des données de l'ennemi
    this.collided = false;
    this.frameX = 0;
    this.lives = this.maxLives;
    this.frameY = Math.floor(Math.random() * 4);
    // On choisit une position aléatoire pour l'ennemi
    if (Math.random() < 0.5) {
      this.x = Math.random() * this.game.width;
      this.y = Math.random() < 0.5 ? -this.radius : this.game.height + this.radius;
    } else {
      this.x = Math.random() < 0.5 ? -this.radius : this.game.width + this.radius;
      this.y = Math.random() * this.game.height;
    }
    // On calcule la direction du regard de l'ennemi
    const aim = this.game.calcAim(this, this.game.planet);
    this.speedX = aim[0] * this.speedModifier;
    this.speedY = aim[1] * this.speedModifier;
    this.angle = Math.atan2(aim[3], aim[2]) + Math.PI * 0.5;
  }

  reset(){
    this.free = true;
  }

  /**
   * @param {number} damage - Dégâts infligés
   * 
   * @description Ennemi touché
   * On soustrait les dégâts aux points de vie de l'ennemi
   */
  hit(damage) {
    this.lives -= damage;
    if (this.lives >= 1) this.frameX++;
  }

  /**
   * @param {CanvasRenderingContext2D} context - Contexte 2D du canvas
   * 
   * @description Dessine l'ennemi
   * Si l'ennemi n'est pas libre :
   * On sauvegarde le contexte avec save() pour ne pas affecter les autres éléments
   * On déplace le contexte à la position de l'ennemi avec translate(this.x, this.y)
   * On fait tourner le contexte en fonction de l'angle de l'ennemi avec rotate(this.angle)
   * On dessine l'image de l'ennemi avec drawImage() et les paramètres suivants :
   * (image, source x, source y, source width, source height, destination x, destination y, destination width, destination height)
   * Si le mode debug est activé on dessine un cercle de collision autour de l'ennemi avec beginPath() et arc() avec les paramètres suivants :
   *  on dessine un cercle de collision autour de l'ennemi avec beginPath() et arc() avec les paramètres suivants :
   * - this.x : position horizontale de l'ennemi
   * - this.y : position verticale de l'ennemi
   * - this.radius : rayon de l'ennemi
   * - 0 : angle de départ
   * - Math.PI * 2 : angle de fin (cercle complet)
   * On dessine les points de vie de l'ennemi avec fillText()
   * On restaure le contexte avec restore() pour ne pas affecter les autres éléments
   */
  draw(context){
    if (!this.free) {
      context.save();
      context.translate(this.x, this.y);
      context.rotate(this.angle);
      context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, -this.radius, -this.radius, this.width, this.height);
      if (this.game.debug) {
        context.beginPath();
        context.arc(0, 0, this.radius, 0, Math.PI * 2);
        context.stroke();
        context.fillText(this.lives, 0, 0);
      }
      context.restore();
    }
  }

  update(){
    if (!this.free) {
      this.x += this.speedX;
      this.y += this.speedY;
      // Si l'ennemi collisionne avec la planète 
      if (this.game.checkCollision(this, this.game.planet) && this.lives >= 1) {
        this.lives = 0;
        this.speedX = 0;
        this.speedY = 0;
        this.collided = true;
        this.game.lives--;
      }
      // Si l'ennemi collisionne avec le joueur 
      if (this.game.checkCollision(this, this.game.player) && this.lives >= 1) {
        this.lives = 0;
        this.collided = true;
        this.game.lives--;
      }
      // Si l'ennemi collisionne avec un projectile 
      this.game.projectilePool.forEach(projectile => {
        if (!projectile.free && this.game.checkCollision(this, projectile) && this.lives >= 1) {
          projectile.reset();
          this.hit(1);
        }
      });
      // Si l'ennemi n'a plus de points de vie on le réinitialise
      if (this.lives < 1 && this.game.spriteUpdate) {
        this.frameX++;
      }
      if (this.frameX > this.maxFrame) {
        this.reset();
        if (!this.collided && !this.game.gameOver) this.game.score += this.maxLives;
      }

    }
  }
}

/************/

/* ASTEROID */

/************/
class Asteroid extends Enemy {
  /**
   * @param {Game} game - Instance de la classe Game
   * 
   * @property {HTMLImageElement} image - Image de l'astéroïde
   * @property {number} frameX - Frame horizontale de l'astéroïde
   * @property {number} frameY - Frame verticale de l'astéroïde
   * @property {number} maxFrame - Frames maximales de l'astéroïde
   * @property {number} lives - Points de vie de l'astéroïde
   * @property {number} maxLives - Points de vie maximaux de l'astéroïde
   * 
   * @description Constructeur de la classe Asteroid
   */
  constructor(game){
    super(game);
    this.image = document.getElementById('asteroid');
    this.frameX = 0;
    this.frameY = Math.floor(Math.random() * 4);
    this.maxFrame = 7;
    this.lives = 1;
    this.maxLives = this.lives;
  }
}

/****************/

/* LOBSTERMORPH */

/****************/
class Lobstermorph extends Enemy {
  /**
   * @param {Game} game - Instance de la classe Game
   * 
   * @property {HTMLImageElement} image - Image de l'astéroïde
   * @property {number} frameX - Frame horizontale de l'astéroïde
   * @property {number} frameY - Frame verticale de l'astéroïde
   * @property {number} maxFrame - Frames maximales de l'astéroïde
   * @property {number} lives - Points de vie de l'astéroïde
   * @property {number} maxLives - Points de vie maximaux de l'astéroïde
   * 
   * @description Constructeur de la classe Asteroid
   */
  constructor(game){
    super(game);
    this.image = document.getElementById('lobstermorph');
    this.frameX = 0;
    this.frameY = Math.floor(Math.random() * 4);
    this.maxFrame = 14;
    this.lives = 8;
    this.maxLives = this.lives;
  }
}

/****************/

/* BEETLEMORPH */

/****************/
class Beetlemorph extends Enemy {
  /**
   * @param {Game} game - Instance de la classe Game
   * 
   * @property {HTMLImageElement} image - Image de l'astéroïde
   * @property {number} frameX - Frame horizontale de l'astéroïde
   * @property {number} frameY - Frame verticale de l'astéroïde
   * @property {number} maxFrame - Frames maximales de l'astéroïde
   * @property {number} lives - Points de vie de l'astéroïde
   * @property {number} maxLives - Points de vie maximaux de l'astéroïde
   * 
   * @description Constructeur de la classe Asteroid
   */
  constructor(game){
    super(game);
    this.image = document.getElementById('beetlemorph');
    this.frameX = 0;
    this.frameY = Math.floor(Math.random() * 4);
    this.maxFrame = 3;
    this.lives = 1;
    this.maxLives = this.lives;
  }
}

/****************/

/* RHINOMORPH */

/****************/
class Rhinomorph extends Enemy {
  /**
   * @param {Game} game - Instance de la classe Game
   * 
   * @property {HTMLImageElement} image - Image de l'astéroïde
   * @property {number} frameX - Frame horizontale de l'astéroïde
   * @property {number} frameY - Frame verticale de l'astéroïde
   * @property {number} maxFrame - Frames maximales de l'astéroïde
   * @property {number} lives - Points de vie de l'astéroïde
   * @property {number} maxLives - Points de vie maximaux de l'astéroïde
   * 
   * @description Constructeur de la classe Asteroid
   */
  constructor(game){
    super(game);
    this.image = document.getElementById('rhinomorph');
    this.frameX = 0;
    this.frameY = Math.floor(Math.random() * 4);
    this.maxFrame = 6;
    this.lives = 4;
    this.maxLives = this.lives;
  }
}


/*****************/

/* MOTEUR DE JEU */

/*****************/
class Game {
  /**
   * @param {HTMLCanvasElement} canvas - Canvas du jeu
   * 
   * @property {HTMLCanvasElement} canvas - Canvas du jeu
   * @property {number} width - Largeur du canvas
   * @property {number} height - Hauteur du canvas
   * @property {Planet} planet - Instanciation de la classe Planet
   * @property {Player} player - Instanciation de la classe Player
   * @property {boolean} debug - Mode debug
   * @property {array} projectilePool - Pool de projectiles
   * @property {number} numberOfProjectiles - Nombre de projectiles
   * @property {array} enemyPool - Pool d'ennemis
   * @property {number} numberOfEnemies - Nombre d'ennemis
   * @property {number} enemyTimer - Timer de l'ennemi
   * @property {number} enemyInterval - Intervalle de l'ennemi
   * @property {boolean} spriteUpdate - Mise à jour du sprite
   * @property {number} spriteTimer - Timer du sprite
   * @property {number} spriteInterval - Intervalle du sprite
   * @property {number} score - Score du jeu
   * @property {number} winningScore - Score gagnant
   * @property {number} lives - Vies du joueur
   * @property {object} mouse - Position de la souris
   * 
   * @method render - Rendu du jeu, constamment appelé pour mettre à jour le jeu
   * @method drawStatusText - Dessine le texte du statut
   * @method calcAim - Calcule la direction du regard 
   * @method checkCollision - Vérifie la collision entre deux éléments
   * @method createProjectiles - Crée un pool de projectiles
   * @method getProjectile - Récupère un projectile libre du pool
   * @method createEnemies - Crée un pool d'ennemis
   * @method getEnemy - Récupère un ennemi libre du pool
   * 
   * @description Constructeur de la classe Game
   * On définit les propriétés de la classe Game
   * On crée un pool de projectiles avec this.createProjectiles() et this.numberOfProjectiles qui définit le nombre de projectiles
   * On crée un pool d'ennemis avec this.createEnemies() et this.numberOfEnemies qui définit le nombre d'ennemis
   * On démarre le premier ennemi
   * On définit le timer de l'ennemi avec this.enemyTimer à 0
   * On définit l'intervalle de l'ennemi avec this.enemyInterval à 1000
   * On écoute les événements
   */
  constructor(canvas){
    this.canvas = canvas;
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.planet = new Planet(this);
    this.player = new Player(this);
    this.debug = false;

    this.projectilePool = [];
    this.numberOfProjectiles = 20;
    this.createProjectiles();

    this.enemyPool = [];
    this.numberOfEnemies = 20;
    this.createEnemies();
    this.enemyPool[0].start();
    this.enemyTimer = 0;
    this.enemyInterval = 1200;

    this.spriteUpdate = false;
    this.spriteTimer = 0;
    this.spriteInterval = 120;

    this.score = 0;
    this.winningScore = 50;
    this.lives = 10;

    this.mouse = {x: 0, y: 0};

    window.addEventListener('mousemove', e => {
      this.mouse.x = e.offsetX;
      this.mouse.y = e.offsetY;
    });
    window.addEventListener('mousedown', e => {
      this.mouse.x = e.offsetX;
      this.mouse.y = e.offsetY;
      this.player.shoot();
    });
    window.addEventListener('keyup', e => {
      if(e.key === 'd') this.debug = !this.debug;
      else if (e.key === '1') this.player.shoot();
    });
  }

  /**
   * @param {CanvasRenderingContext2D} context - Contexte 2D du canvas
   * 
   * @description Rendu du jeu, constamment appelé pour mettre à jour le jeu
   * On commence par dessiner la planète avec this.planet.draw(context)
   * On dessine le texte du statut avec this.drawStatusText(context
   * On dessine le joueur avec this.player.draw(context)
   * On met à jour le joueur avec this.player.update()
   * Pour chaque projectile dans le pool de projectiles on dessine le projectile avec projectile.draw(context) et on met à jour le projectile avec projectile.update()
   * Pour chaque ennemi dans le pool d'ennemis on dessine l'ennemi avec enemy.draw(context) et on met à jour l'ennemi avec enemy.update()
   * LIMITATION DU SPAWN DES ENNEMIS : Si le timer de l'ennemi est inférieur à l'intervalle de l'ennemi on incrémente le timer de l'ennemi avec deltaTime
   * Sinon on réinitialise le timer de l'ennemi à 0 et on récupère un ennemi avec this.getEnemy() et on le démarre
   * LIMITATION DES FRAMES AFFICHEES AFIN QU'ELLES NE SOIENT PAS TROP RAPIDES : Si le timer du sprite est inférieur à l'intervalle du sprite on incrémente le timer du sprite avec deltaTime
   * Sinon on réinitialise le timer du sprite à 0 et on met à jour le sprite avec this.spriteUpdate à false
   * Si le score est supérieur ou égal au score gagnant on définit le jeu comme terminé avec this.gameOver à true
   */
  render(context, deltaTime){
    this.planet.draw(context);
    this.drawStatusText(context);
    this.player.draw(context);
    this.player.update();
    this.projectilePool.forEach(projectile => {
      projectile.draw(context);
      projectile.update();
    });
    this.enemyPool.forEach(enemy => {
      enemy.draw(context);
      enemy.update();
    });
    if (!this.gameOver) {
      if (this.enemyTimer < this.enemyInterval) {
        this.enemyTimer += deltaTime;
      } else {
        this.enemyTimer = 0;
        const enemy = this.getEnemy();
        if (enemy) enemy.start();
      }
    }
    if (this.spriteTimer < this.spriteInterval) {
      this.spriteTimer += deltaTime;
      this.spriteUpdate = false;
    } else {
      this.spriteTimer = 0;
      this.spriteUpdate = true;
    }
    if (this.score >= this.winningScore || this.lives < 1) {
      this.gameOver = true;
    }
  }

  /**
   * @param {CanvasRenderingContext2D} context - Contexte 2D du canvas
   * 
   * @description Dessine le texte du statut
   * On commence par sauvegarder le contexte avec save() pour ne pas affecter les autres éléments
   * On définit le texte du statut avec fillText()
   * Si le jeu est terminé on affiche un message de victoire ou de défaite
   * On restaure le contexte avec restore() pour ne pas affecter les autres éléments
   */
  drawStatusText(context){
    context.save();
    context.textAlign = 'left';
    context.font = '30px Impact';
    context.fillText('Score: ' + this.score, 20, 30);
    for (let i = 0; i < this.lives; i++) {
      context.fillText('❤️', 20 + i * 30, 60);
      //context.fillRect(20 + i * 15, 60, 10, 30);
    }
    if (this.gameOver) {
      context.textAlign = 'center';
      let message1;
      let message2;
      if (this.score >= this.winningScore) {
        message1 = 'you win!';
        message2 = 'Your score is ' + this.score + '!';
      } else {
        message1 = 'You lose!';
        message2 = 'Try again!';
      }
      context.font = '100px Impact';
      context.fillText(message1, this.width * 0.5, 200);
      context.font = '50px Impact';
      context.fillText(message2, this.width * 0.5, 550);
    }
    context.restore();
  }

  /**
   * @param {object} a - Position du premier élément
   * @param {object} b - Position du second élément
   * 
   * @returns {array} - Direction du regard (x, y, dx, dy)
   * 
   * @description Calcule la direction du regard
   */
  calcAim(a, b) {
    const dx = a.x - b.x;
    const dy = a.y - b.y;
    const distance = Math.hypot(dx, dy);
    const aimX = dx / distance * -1;
    const aimY = dy / distance * -1;
    return [aimX, aimY, dx, dy];
  }

  /**
   * @param {object} a - Premier élément
   * @param {object} b - Second élément
   * 
   * @returns {boolean} - Collision ou non
   * 
   * @description Vérifie la collision entre deux éléments
   */
  checkCollision(a, b){
    const dx = a.x - b.x;
    const dy = a.y - b.y;
    const distance = Math.hypot(dx, dy);
    const sumOfRadius = a.radius + b.radius;
    return distance < sumOfRadius;
  }

  createProjectiles(){
    for (let i = 0; i < this.numberOfProjectiles; i++) {
      this.projectilePool.push(new Projectile(this));
    }
  }

  getProjectile(){
    for (let i = 0; i < this.projectilePool.length; i++) {
      if (this.projectilePool[i].free) return this.projectilePool[i];
    }
  }

  createEnemies(){
    for (let i = 0; i < this.numberOfEnemies; i++) {
      let randomNumber = Math.random();
      if (randomNumber < 0.25) {
        this.enemyPool.push(new Asteroid(this));
      } else if (randomNumber < 0.5) {
        this.enemyPool.push(new Beetlemorph(this));
      } else if (randomNumber < 0.75) {
        this.enemyPool.push(new Rhinomorph(this));
      } else {
        this.enemyPool.push(new Lobstermorph(this));
      }
    }
  }

  getEnemy(){
    for (let i = 0; i < this.enemyPool.length; i++) {
      if (this.enemyPool[i].free) return this.enemyPool[i];
    }
  }
}



/******************/

/* INITIALISATION */

/******************/
window.addEventListener('load', function() {
  const canvas = document.getElementById('canvas1');
  const ctx = canvas.getContext('2d');
  canvas.width = 800;
  canvas.height = 800;
  ctx.strokeStyle = 'white';
  ctx.fillStyle = 'white';
  ctx.lineWidth = 2;
  ctx.font = '50px Helvetica';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  const game = new Game(canvas);
  game.render(ctx);

  let lastTime = 0;
  /**
   * @param {number} timestamp - Horodatage
   * 
   * @description Animation du jeu
   * On commence par calculer le delta time avec timestamp - lastTime
   * On commence par effacer le canvas avec clearRect() et les paramètres suivants :
   * - 0 : position horizontale de départ
   * - 0 : position verticale de départ
   * - canvas.width : largeur du canvas
   * - canvas.height : hauteur du canvas
   * On appelle la méthode render() de la classe Game avec le contexte 2D du canvas
   * On appelle requestAnimationFrame() avec animate comme argument pour boucler l'animation
   * requestAnimationFrame() appelle la fonction animate() avant le prochain rafraîchissement de l'écran
   * La méthode animate() est appelée avec un argument, un horodatage qui est fourni par le navigateur
   * Cet argument est utilisé pour effectuer des calculs de temps et de mouvement
   */
  function animate(timestamp){
    const deltaTime = timestamp - lastTime;
    lastTime = timestamp;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    game.render(ctx, deltaTime);
    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);
});