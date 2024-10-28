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
   * @property {boolean} free - Ennemi libre ou non
   * 
   * @method start - Démarre l'ennemi
   * @method reset - Réinitialise l'ennemi
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
    this.free = true;
  }

  start(){
    this.free = false;
    this.x = Math.random() * this.game.width;
    this.y = Math.random() * this.game.height;
    const aim = this.game.calcAim(this, this.game.planet);
    this.speedX = aim[0];
    this.speedY = aim[1];
  }

  reset(){
    this.free = true;
  }

  /**
   * @param {CanvasRenderingContext2D} context - Contexte 2D du canvas
   * 
   * @description Dessine l'ennemi
   */
  draw(context){
    if (!this.free) {
      context.beginPath();
      context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      context.stroke();
    }
  }

  update(){
    if (!this.free) {
      this.x += this.speedX;
      this.y += this.speedY;
      // Si l'ennemi collisionne avec la planète on le réinitialise
      if (this.game.checkCollision(this, this.game.planet)) {
        this.reset();
      }
      // Si l'ennemi collisionne avec le joueur on le réinitialise
      if (this.game.checkCollision(this, this.game.player)) {
        this.reset();
      }
    }
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
   * @property {object} mouse - Position de la souris
   * 
   * @method render - Rendu du jeu, constamment appelé pour mettre à jour le jeu
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
   * On démarre certains ennemis avec this.enemyPool[0].start(), this.enemyPool[1].start
   * On écoute les événements
   */
  constructor(canvas){
    this.canvas = canvas;
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.planet = new Planet(this);
    this.player = new Player(this);
    this.debug = true;

    this.projectilePool = [];
    this.numberOfProjectiles = 20;
    this.createProjectiles();

    this.enemyPool = [];
    this.numberOfEnemies = 20;
    this.createEnemies();
    this.enemyPool[0].start();
    this.enemyPool[1].start();
    this.enemyPool[2].start();
    this.enemyPool[3].start();
    this.enemyPool[4].start();

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
   * On dessine le joueur avec this.player.draw(context)
   * On met à jour le joueur avec this.player.update()
   * Pour chaque projectile dans le pool de projectiles on dessine le projectile avec projectile.draw(context) et on met à jour le projectile avec projectile.update()
   * Pour chaque ennemi dans le pool d'ennemis on dessine l'ennemi avec enemy.draw(context) et on met à jour l'ennemi avec enemy.update()
   */
  render(context){
    this.planet.draw(context);
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
      this.enemyPool.push(new Enemy(this));
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
  ctx.lineWidth = 2;

  const game = new Game(canvas);
  game.render(ctx);

  function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    game.render(ctx);
    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);
});