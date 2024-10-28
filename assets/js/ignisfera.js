/*********/

/* LASER */

/*********/
class Laser {
  /**
   * @param {Game} game Définition du jeu
   * 
   * @property {Game} game Définition du jeu
   * @property {number} x Position horizontale du laser
   * @property {number} y Position verticale du laser
   * @property {number} height Hauteur du laser
   * 
   * @method render Permet de dessiner le laser, constamment appelée pour animer le laser
   * 
   * @description
   * Constructeur de la classe Laser
   */
  constructor(game) {
    this.game = game;
    this.x = 0;
    this.y = 0;
    this.height = this.game.height - 50;
  }

  /**
   * @param {CanvasRenderingContext2D} context Donne le contexte 2D du canvas  
   * 
   * @description Permet de dessiner le laser
   * On définit la position horizontale du laser
   * On diminue l'énergie du joueur du montant des dégâts du laser
   * On sauvegarde le contexte actuel pour ne pas affecter les autres éléments dessinés
   * On définit la couleur de remplissage du laser
   * On dessine le laser
   * On restaure le contexte sauvegardé précédemment pour ne pas affecter les autres éléments dessinés
   * On vérifie si le laser touche un ennemi que toutes les intervalles de temps définis par spriteInterval
   * On vérifie si le laser touche un boss que toutes les intervalles de temps définis par spriteInterval
   */
  render(context) {
    this.x = this.game.player.x + this.game.player.width * 0.5 - this.width * 0.5;
    this.game.player.energy -= this.damage;

    context.save();
    context.fillStyle = 'gold';
    context.fillRect(this.x, this.y, this.width, this.height);
    context.fillStyle = 'white';
    context.fillRect(this.x + this.width * 0.2, this.y, this.width * 0.6, this.height);
    context.restore();

    if (this.game.spriteUpdate) {
      this.game.waves.forEach(wave => {
        wave.enemies.forEach(enemy => {
          if (this.game.checkCollision(enemy, this)) {
            enemy.hit(this.damage);
          }
        });
      });
      this.game.bossArray.forEach(boss => {
        if (this.game.checkCollision(boss, this) && boss.y >= 0) {
          boss.hit(this.damage);
        }
      });
    }
  }
}

/***************/

/* PETIT LASER */

/***************/
class SmallLaser extends Laser {
  /**
   * @param {Game} game Définition du jeu
   * 
   * @property {number} width Définition de la largeur du laser
   * @property {number} damage Dégâts infligés par le laser par frame
   * 
   * @description
   * Constructeur de la classe SmallLaser
   */
  constructor(game) {
    super(game);  // On appelle le constructeur de la classe mère
    this.width = 5;
    this.damage = 0.3;
  }

  /**
   * @param {CanvasRenderingContext2D} context Donne le contexte 2D du canvas
   * 
   * @description Override de la méthode render pour dessiner le laser
   * On vérifie si le joueur a plus de 1 d'énergie et n'est pas en cooldown pour tirer le laser
   * On appelle la méthode render de la classe mère
   * On définit la position horizontale de l'image du joueur
   */
  render(context) {
    if (this.game.player.energy > 1 && !this.game.player.cooldown) {
      super.render(context);  
      this.game.player.frameX = 2; 
    }
  }
}

/***************/

/* GRAND LASER */

/***************/
class BigLaser extends Laser {
  /**
   * @param {Game} game Définition du jeu
   * 
   * @property {number} width Définition de la largeur du laser
   * @property {number} damage Dégâts infligés par le laser par frame
   * 
   * @description
   * Constructeur de la classe SmallLaser
   */
  constructor(game) {
    super(game);  // On appelle le constructeur de la classe mère
    this.width = 25;
    this.damage = 0.7;
  }

  /**
   * @param {CanvasRenderingContext2D} context Donne le contexte 2D du canvas
   * 
   * @description Override de la méthode render pour dessiner le laser
   * On vérifie si le joueur a plus de 1 d'énergie et n'est pas en cooldown pour tirer le laser
   * On appelle la méthode render de la classe mère
   * On définit la position horizontale de l'image du joueur
   */
  render(context) {
    if (this.game.player.energy > 1 && !this.game.player.cooldown) {
      super.render(context);  
      this.game.player.frameX = 3; 
    }
  }
}


/***********/

/* JOUEUR */

/***********/
class Player {
  /**
   * @param {Game} game Définition du jeu
   * 
   * @property {Game} game Définition du jeu
   * @property {number} width Définition de la largeur du joueur
   * @property {number} height Définition de la hauteur du joueur
   * @property {number} x Position horizontale du joueur
   * @property {number} y Position verticale du joueur
   * @property {number} speed Vitesse du joueur
   * @property {number} lives Nombre de vies du joueur
   * @property {number} maxLives Nombre maximum de vies possibles du joueur
   * @property {image} image Image du joueur récupérée dans le HTML
   * @property {image} jets_image Image des jets du joueur récupérée dans le HTML
   * @property {number} frameX Position horizontale de l'image dans le sprite
   * @property {number} jetsFrame Position horizontale de l'image des jets dans le sprite
   * @property {SmallLaser} smallLaser Petit laser du joueur
   * @property {BigLaser} bigLaser Grand laser du joueur
   * @property {number} energy Energie du joueur
   * @property {number} maxEnergy Energie maximale du joueur
   * @property {boolean} cooldown Vérification pour le cooldown du tir
   * 
   * @method draw Dessine le joueur
   * @method update Met à jour la position du joueur
   * @method shoot Tire un projectile
   * @method restart Réinitialise le joueur
   * 
   * @description
   * Constructeur de la classe Player
   */
  constructor(game) {
    this.game = game;  
    this.width = 140;  
    this.height = 120;  
    this.x = this.game.width * 0.5 - this.width * 0.5;  
    this.y = this.game.height - this.height;  
    this.speed = 5;  
    this.lives = 3;
    this.maxLives = 10;
    this.image = document.getElementById('player');
    this.jets_image = document.getElementById('player_jets');
    this.frameX = 0;
    this.jetsFrame = 1;
    this.smallLaser = new SmallLaser(this.game);
    this.bigLaser = new BigLaser(this.game);
    this.energy = 50;
    this.maxEnergy = 100;
    this.cooldown = false;
  }
  
  /**
   * @param {CanvasRenderingContext2D} context 
   * 
   * @description Dessine le joueur
   * On change la position horizontale de l'image si la touche 1 est enfoncée
   * On dessine le petit laser si la touche 2 est enfoncée
   * On dessine le grand laser si la touche 3 est enfoncée
   * On dessine l'image des jets du joueur avec 9 arguments :
   * l'image, la position horizontale dans le frame, la position verticale dans le frame, la largeur dans le frame, la hauteur dans le frame, la position horizontale de l'image, la position verticale de l'image, la largeur de l'image, la hauteur de l'image
   * On dessine l'image du joueur avec 9 arguments :
   * l'image, la position horizontale dans le frame, la position verticale dans le frame, la largeur dans le frame, la hauteur dans le frame, la position horizontale de l'image, la position verticale de l'image, la largeur de l'image, la hauteur de l'image
   */
  draw(context) {
    if (this.game.keys.indexOf('1') > -1) {
      this.frameX = 1; 
    } else if (this.game.keys.indexOf('2') > -1) {
      this.smallLaser.render(context);
    } else if (this.game.keys.indexOf('3') > -1) { 
      this.bigLaser.render(context);
    } else {
      this.frameX = 0;  
    }
    context.drawImage(this.jets_image, this.jetsFrame * this.width, 0, this.width, this.height, this.x, this.y, this.width, this.height);
    context.drawImage(this.image, this.frameX * this.width, 0, this.width, this.height, this.x, this.y, this.width, this.height);
  }
  
  update() {
    // Tant que le joueur a moins d'énergie que son maximum, on recharge doucement son énergie
    if (this.energy < this.maxEnergy) this.energy += 0.05;
    if (this.energy < 1) this.cooldown = true;  // Si le joueur n'a plus d'énergie, on active le cooldown
    else if (this.energy > this.maxEnergy * 0.2) this.cooldown = false;  // Si le joueur a plus de 20% d'énergie, on désactive le cooldown
    // Déplacement horizontal du joueur
    if (this.game.keys.indexOf('ArrowLeft') > -1) {
      this.x -= this.speed; 
      this.jetsFrame = 0;  // On définit la position horizontale de l'image des jets
    } else if (this.game.keys.indexOf('ArrowRight') > -1) {
      this.x += this.speed; 
      this.jetsFrame = 2;  // On définit la position horizontale de l'image des jets
    } else {
      this.jetsFrame = 1;  // On définit la position horizontale de l'image des jets
    }
    // On empêche le joueur de sortir de plus de 50% de sa largeur de l'écran afin de pouvoir encore tirer des projectiles sur les côtés
    if (this.x < -this.width * 0.5) this.x = -this.width * 0.5;
    else if (this.x > this.game.width - this.width * 0.5) this.x = this.game.width - this.width * 0.5;
  }
  
  shoot() {
    const projectile = this.game.getProjectile();  // On récupère un projectile
    if (projectile) projectile.start(this.x + this.width * 0.5, this.y);  // On tire le projectile
  }

  restart() {
    this.x = this.game.width * 0.5 - this.width * 0.5;  
    this.y = this.game.height - this.height;  
    this.lives = 3;
  }
}


/***************/

/* PROJECTILES */

/***************/
class Projectile {

  /**
   * @property {number} width Définition de la largeur du projectile
   * @property {number} height Définition de la hauteur du projectile
   * @property {number} x  Position horizontale du projectile
   * @property {number} y Position verticale du projectile
   * @property {number} speed Vitesse du projectile
   * @property {boolean} free Projectile libre ou non
   * 
   * @method draw Permet de dessiner le projectile
   * @method update Permet de mettre à jour la position du projectile
   * @method start Permet d'initialiser le projectile
   * @method reset Permet de réinitialiser le projectile
   * 
   * @description
   * Constructeur de la classe Projectile
   * On définit les propriétés du projectile
   * On définit le projectile comme libre
   * On utilise le Object Pool Pattern pour les projectiles pour éviter de créer et supprimer des objets en permanence et ainsi améliorer les performances
   */
  constructor() {
    this.width = 3;  
    this.height = 40;  
    this.x = 0;  
    this.y = 0;  
    this.speed = 20;  
    this.free = true; 
  }

  /**
   * @param {CanvasRenderingContext2D} context  Donne le contexte 2D du canvas
   * 
   * @description Dessine le projectile si il n'est pas libre
   * On sauvegarde le contexte actuel pour ne pas affecter les autres éléments dessinés
   * On définit la couleur de remplissage du projectile
   * On dessine le projectile
   * On restaure le contexte sauvegardé précédemment pour ne pas affecter les autres éléments dessinés
   */
  draw(context) {
    // On dessine le projectile si il n'est pas libre
    if (!this.free) {
      context.save();  
      context.fillStyle = 'gold';  
      context.fillRect(this.x, this.y, this.width, this.height);  
      context.restore();  
    }
  }

  /**
   * @description Fonction pour mettre à jour la position du projectile
   * On met à jour la position du projectile si il n'est pas libre
   * Si le projectile sort de l'écran, on le réinitialise
   * Si ce n'est pas fait il ne pourra que tirer les 10 projectiles du pool et plus rien ne se passera
   */
  update() {
    if (!this.free) {
      this.y -= this.speed;
      if (this.y < -this.height) this.reset(); 
    }
  }

  /**
   * @param {number} x  Position horizontale du projectile
   * @param {number} y  Position verticale du projectile
   * 
   * @description Fonction pour initialiser le projectile
   * On définit la position horizontale du projectile à son centre
   * On définit la position verticale du projectile
   * On définit le projectile comme occupé
   */
  start(x, y) {
    this.x = x - this.width * 0.5;  
    this.y = y;  
    this.free = false;  
  }

  /**
   * @description Fonction pour réinitialiser le projectile
   * On définit le projectile comme libre
   */
  reset() {
    this.free = true; 
  }

}


/***********/

/* ENNEMIS */

/**********/
class Enemy {
  /**
   * @param {Game} game Définition du jeu
   * @param {number} positionX Détermine la position dans la grille d'ennemis
   * @param {number} positionY Détermine la position dans la grille d'ennemis
   * 
   * @property {Game} game Définition du jeu
   * @property {number} width Définition de la largeur de l'ennemi
   * @property {number} height Définition de la hauteur de l'ennemi
   * @property {number} x Position horizontale de l'ennemi
   * @property {number} y Position verticale de l'ennemi
   * @property {number} positionX Position horizontale de l'ennemi
   * @property {number} positionY Position verticale de l'ennemi
   * @property {boolean} markedForDeletion Marque l'ennemi pour suppression
   * 
   * @method draw Permet de dessiner l'ennemi
   * @method update Permet de mettre à jour la position de l'ennemi
   * @method hit Permet de gérer les dégâts infligés à l'ennemi
   * 
   * @description
   * Constructeur de la classe Enemy
   */
  constructor(game, positionX, positionY) {
    this.game = game;  
    this.width = this.game.enemySize;  
    this.height = this.game.enemySize; 
    this.x = 0;  
    this.y = 0;  
    this.positionX = positionX;
    this.positionY = positionY;
    this.markedForDeletion = false;
  }

  /**
   * @param {CanvasRenderingContext2D} context  Donne le contexte 2D du canvas
   * 
   * @description Dessine l'ennemi
   * On dessine l'image de l'ennemi avec 9 arguments :
   * l'image, la position horizontale dans le frame, la position verticale dans le frame, la largeur dans le frame, la hauteur dans le frame, la position horizontale de l'image, la position verticale de l'image, la largeur de l'image, la hauteur de l'image
   */
  draw(context) {
    context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height);  
  }

  /**
   * @param {number} x  Position horizontale de l'ennemi
   * @param {number} y  Position verticale de l'ennemi
   * 
   * @description Mets à jour la position de l'ennemi
   */
  update(x, y) {
    this.x = x + this.positionX;
    this.y = y + this.positionY;
    // On vérifie si le projectile touche l'ennemi
    this.game.projectilesPool.forEach(projectile => {
      if (!projectile.free && this.game.checkCollision(this, projectile) && this.lives > 0) { 
        this.hit(1);  // On diminue les vies de l'ennemi de 1
        projectile.reset();  // On réinitialise le projectile afin qu'il ne puisse pas toucher plusieurs ennemis
      }
    });
    // On vérifie si l'ennemi a encore assez de vies
    if (this.lives < 1) {
      if (this.game.spriteUpdate) this.frameX++;  // On incrémente la position horizontale de l'image uniquement si spriteUpdate est vrai
      if (this.frameX > this.maxFrame) {
        this.markedForDeletion = true;  // Si on atteint le nombre maximum de frames, on marque l'ennemi pour suppression
        if (!this.game.gameOver) this.game.score += this.maxLives;  // On augmente le score du joueur du nombre de vies de l'ennemi
      }
    }
    // On vérifie si l'ennemi touche le joueur
    if (this.game.checkCollision(this, this.game.player) && this.lives > 0) {
      this.lives = 0;  // On définit les vies de l'ennemi à 0
      this.game.player.lives--;  // On diminue le nombre de vies du joueur
    }
    // Condition pour la défaite du joueur
    if (this.y + this.height > this.game.height || this.game.player.lives < 1) {
      this.game.gameOver = true;  // On définit la défaite du joueur
    }
  }

  /**
   * @param {number} damage Dégâts infligés à l'ennemi
   * 
   * @description Gère les dégâts infligés à l'ennemi
   * On diminue les vies de l'ennemi
   */
  hit(damage) {
    this.lives -= damage;
  }
}

/**********************/

/* ENNEMI BEETLEMORPH */

/**********************/
class BeetleMorph extends Enemy {
  /**
   * @param {Game} game Définition du jeu
   * @param {number} positionX Position horizontale de l'ennemi
   * @param {number} positionY Position verticale de l'ennemi
   * 
   * @property {image} image Image de l'ennemi récupérée dans le HTML
   * @property {number} frameX Position horizontale de l'image dans le sprite
   * @property {number} maxFrame Nombre maximum de frames pour l'animation
   * @property {number} frameY Position verticale de l'image dans le sprite définie aléatoirement pour chaque ennemi (4 ennemis différents)
   * @property {number} lives Nombre de vies de l'ennemi
   * @property {number} maxLives Nombre maximum de vies possibles de l'ennemi
   * 
   * @description
   * Constructeur de la classe BeetleMorph
   */
  constructor(game, positionX, positionY) {
    super(game, positionX, positionY);  // On appelle le constructeur de la classe mère
    this.image = document.getElementById('beetlemorph');  
    this.frameX = 0;
    this.maxFrame = 2;
    this.frameY = Math.floor(Math.random() * 4); 
    this.lives = 1;
    this.maxLives = this.lives;
  }
}

/*********************/

/* ENNEMI RHINOMORPH */

/*********************/
class Rhinomorph extends Enemy {
  /**
   * @param {Game} game Définition du jeu
   * @param {number} positionX Position horizontale de l'ennemi
   * @param {number} positionY Position verticale de l'ennemi
   * 
   * @property {image} image Image de l'ennemi récupérée dans le HTML
   * @property {number} frameX Position horizontale de l'image dans le sprite
   * @property {number} maxFrame Nombre maximum de frames pour l'animation
   * @property {number} frameY Position verticale de l'image dans le sprite définie aléatoirement pour chaque ennemi (4 ennemis différents)
   * @property {number} lives Nombre de vies de l'ennemi
   * @property {number} maxLives Nombre maximum de vies possibles de l'ennemi
   * 
   * @method hit Override de la méthode hit pour gérer les dégâts infligés à l'ennemi
   * 
   * @description
   * Constructeur de la classe BeetleMorph
   */
  constructor(game, positionX, positionY) {
    super(game, positionX, positionY);  // On appelle le constructeur de la classe mère
    this.image = document.getElementById('rhinomorph');  
    this.frameX = 0;
    this.maxFrame = 5;
    this.frameY = Math.floor(Math.random() * 4); 
    this.lives = 4;
    this.maxLives = this.lives;
  }

  /**
   * @param {number} damage Dégâts infligés à l'ennemi
   * 
   * @description Override de la méthode hit pour gérer les dégâts infligés à l'ennemi
   * On diminue les vies de l'ennemi
   * On incrémente la position horizontale de l'image
   */
  hit(damage) {
    this.lives -= damage;
    this.frameX = this.maxLives - Math.floor(this.lives);  
  }
}

/*********************/

/* ENNEMI EAGLEMORPH */

/*********************/
class Eaglemorph extends Enemy {
  /**
   * @param {Game} game Définition du jeu
   * @param {number} positionX Position horizontale de l'ennemi
   * @param {number} positionY Position verticale de l'ennemi
   * 
   * @property {image} image Image de l'ennemi récupérée dans le HTML
   * @property {number} frameX Position horizontale de l'image dans le sprite
   * @property {number} maxFrame Nombre maximum de frames pour l'animation
   * @property {number} frameY Position verticale de l'image dans le sprite définie aléatoirement pour chaque ennemi (4 ennemis différents)
   * @property {number} lives Nombre de vies de l'ennemi
   * @property {number} maxLives Nombre maximum de vies possibles de l'ennemi
   * @property {number} shots Nombre de tirs de l'ennemi
   * 
   * @method hit Override de la méthode hit pour gérer les dégâts infligés à l'ennemi
   * @method shoot Méthode pour tirer un projectile
   * 
   * @description
   * Constructeur de la classe BeetleMorph
   */
  constructor(game, positionX, positionY) {
    super(game, positionX, positionY);  // On appelle le constructeur de la classe mère
    this.image = document.getElementById('eaglemorph');  
    this.frameX = 0;
    this.maxFrame = 8;
    this.frameY = Math.floor(Math.random() * 4); 
    this.lives = 4;
    this.maxLives = this.lives;
    this.shots = 0;
  }

  /**
   * @param {number} damage Dégâts infligés à l'ennemi
   * 
   * @description Override de la méthode hit pour gérer les dégâts infligés à l'ennemi
   * On fait tirer un projectile à l'ennemi si il n'a pas encore tiré 4 projectiles
   * On diminue les vies de l'ennemi
   * On incrémente la position horizontale de l'image
   * On fait descendre l'ennemi
   */
  hit(damage) {
    if (this.shots < 4) this.shoot();  
    this.lives -= damage;
    this.frameX = this.maxLives - Math.floor(this.lives);  
    this.y += 3;  
  }

  shoot() {
    const projectile = this.game.getEnemyProjectile();  // On récupère un projectile
    if (projectile) {
      projectile.start(this.x + this.width * 0.5, this.y + this.height * 0.5);  // On tire
      this.shots++;  // On incrémente le nombre de tirs
    }
  }
}

/***************************/

/* PROJECTILES DES ENNEMIS */

/***************************/
class EnemyProjectile {

  /**
   * @param {Game} game Définition du jeu
   * 
   * @property {Game} game Définition du jeu
   * @property {number} width Définition de la largeur du projectile
   * @property {number} height Définition de la hauteur du projectile
   * @property {number} x  Position horizontale du projectile
   * @property {number} y Position verticale du projectile
   * @property {number} speed Vitesse du projectile
   * @property {boolean} free Projectile libre ou non
   * @property {image} image Image du projectile récupérée dans le HTML
   * @property {number} frameX Position horizontale de l'image dans le sprite définie aléatoirement
   * @property {number} frameY Position verticale de l'image dans le sprite définie aléatoirement
   * @property {number} lives Nombre de vies du projectile
   * 
   * @method draw Permet de dessiner le projectile
   * @method update Permet de mettre à jour la position du projectile
   * @method start Permet d'initialiser le projectile
   * @method reset Permet de réinitialiser le projectile
   * 
   * @description
   * Constructeur de la classe Projectile
   * On définit les propriétés du projectile
   * On définit le projectile comme libre
   * On utilise le Object Pool Pattern pour les projectiles pour éviter de créer et supprimer des objets en permanence et ainsi améliorer les performances
   */
  constructor(game) {
    this.game = game;
    this.width = 50;  
    this.height = 35;  
    this.x = 0;  
    this.y = 0;  
    this.speed = Math.random() * 3 + 2;
    this.free = true; 
    this.image = document.getElementById('enemyProjectile');
    this.frameX = Math.floor(Math.random() * 4);
    this.frameY = Math.floor(Math.random() * 2);
    this.lives = 5;
  }

  /**
   * @param {CanvasRenderingContext2D} context  Donne le contexte 2D du canvas
   * 
   * @description Dessine le projectile si il n'est pas libre
   * On dessine le projectile si il n'est pas libre
   * On dessine l'image de l'ennemi avec 9 arguments :
   * l'image, la position horizontale dans le frame, la position verticale dans le frame, la largeur dans le frame, la hauteur dans le frame, la position horizontale de l'image, la position verticale de l'image, la largeur de l'image, la hauteur de l'image
   */
  draw(context) {
    if (!this.free) {
      context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height);
    }
  }

  /**
   * @description Fonction pour mettre à jour la position du projectile
   * On met à jour la position du projectile si il n'est pas libre
   * Si le projectile sort de l'écran, on le réinitialise
   * Si ce n'est pas fait il ne pourra que tirer les 10 projectiles du pool et plus rien ne se passera
   */
  update() {
    if (!this.free) {
      this.y += this.speed;
      if (this.y > this.game.height) this.reset(); 
      // On vérifie si le projectile touche le joueur
      if (this.game.checkCollision(this, this.game.player)) {
        this.reset();  // On réinitialise le projectile
        this.game.player.lives--;  // On diminue les vies du joueur
        if (this.game.player.lives < 1) this.game.gameOver = true;  // On définit la défaite du joueur
      }
      // On vérifie si le projectile du joueur touche un projectile ennemi
      this.game.projectilesPool.forEach(projectile => {
        if (this.game.checkCollision(this, projectile) && !projectile.free) {
          projectile.reset();  // On réinitialise le projectile du joueur
          this.hit(1); // On diminue les vies du projectile ennemi
          if (this.lives < 1) this.reset();  // On réinitialise le projectile ennemi si il n'a plus de vies
        }
      });
    }
  }

  /**
   * @param {number} x  Position horizontale du projectile
   * @param {number} y  Position verticale du projectile
   * 
   * @description Fonction pour initialiser le projectile
   * On définit la position horizontale du projectile à son centre
   * On définit la position verticale du projectile
   * On définit le projectile comme occupé
   * On définit la position horizontale de l'image dans le sprite
   * On définit la position verticale de l'image dans le sprite
   * On définit les vies du projectile
   * On définit la vitesse du projectile
   */
  start(x, y) {
    this.x = x - this.width * 0.5;  
    this.y = y;  
    this.free = false;  
    this.frameX = Math.floor(Math.random() * 4);
    this.frameY = Math.floor(Math.random() * 2);
    this.lives = 5;
    this.speed = Math.random() * 3 + 2;
  }

  /**
   * @description Fonction pour réinitialiser le projectile
   * On définit le projectile comme libre
   */
  reset() {
    this.free = true; 
  }

  /**
   * @param {number} damage Dégâts infligés au projectile
   * 
   * @description Gère les dégâts infligés au projectile
   * On diminue les vies du projectile
   * On diminue la vitesse du projectile
   */
  hit(damage) {
    this.lives -= damage;
    this.speed *= 0.6;  
  }

}

/***************/

/* ENNEMI BOSS */

/***************/
class Boss {
  /**
   * @param {Game} game Définition du jeu
   * @param {number} bossLives Nombre de vies du boss
   * 
   * @property {number} width Définition de la largeur du boss
   * @property {number} height Définition de la hauteur du boss
   * @property {number} x Position horizontale du boss au centre de l'écran
   * @property {number} y Position verticale du boss
   * @property {number} speedX Vitesse du boss en X (direction aléatoire)
   * @property {number} speedY Vitesse du boss en Y
   * @property {number} lives Nombre de vies du boss
   * @property {number} maxLives Nombre maximum de vies possibles du boss
   * @property {boolean} markedForDeletion Marque le boss pour suppression
   * @property {image} image Image du boss récupérée dans le HTML
   * @property {number} frameX Position horizontale de l'image dans le sprite
   * @property {number} frameY Position verticale de l'image dans le sprite définie aléatoirement pour chaque ennemi (4 ennemis différents)
   * @property {number} maxFrame Nombre maximum de frames pour l'animation
   * 
   * @method draw Permet de dessiner le boss
   * @method update Permet de mettre à jour la position du boss
   * @method hit Permet de gérer les dégâts infligés au boss
   * 
   * @description
   * Constructeur de la classe Boss
   */
  constructor(game, bossLives) {
    this.game = game;
    this.width = 200;
    this.height = 200;
    this.x = this.game.width * 0.5 - this.width * 0.5;
    this.y = -this.height;
    this.speedX = Math.random() < 0.5 ? -1 : 1;
    this.speedY = 0;
    this.lives = bossLives;
    this.maxLives = this.lives;
    this.markedForDeletion = false;
    this.image = document.getElementById('boss');
    this.frameX = 1;
    this.frameY = Math.floor(Math.random() * 4);
    this.maxFrame = 11;
  }

  /**
   * @param {CanvasRenderingContext2D} context Donne le contexte 2D du canvas
   * 
   * @description Dessine le boss
   * * On dessine l'image de l'ennemi avec 9 arguments :
   * l'image, la position horizontale dans le frame, la position verticale dans le frame, la largeur dans le frame, la hauteur dans le frame, la position horizontale de l'image, la position verticale de l'image, la largeur de l'image, la hauteur de l'image
   * On sauvegarde le contexte actuel pour ne pas affecter les autres éléments dessinés
   * On affiche le nombre de vies du boss
   * On restaure le contexte sauvegardé précédemment pour ne pas affecter les autres éléments dessinés
   */
  draw(context) {
    context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height);
    if (this.lives >= 1) {
      context.save();
      context.textAlign = 'center';
      context.shadowOffsetX = 3;
      context.shadowOffsetY = 3;
      context.shadowColor = 'black';
      context.fillText(Math.floor(this.lives), this.x + this.width * 0.5, this.y + 50);
      context.restore();
    }
  }

  update() {
    this.speedY = 0;
    if (this.game.spriteUpdate && this.lives >= 1) this.frameX = 0;  // On incrémente la position horizontale de l'image
    if (this.y < 0) this.y += 4;  // On fait descendre le boss
    // On fait rebondir le boss sur les bords de l'écran et on le fait descendre
    if (this.x < 0 || this.x > this.game.width - this.width && this.lives >= 1) {
      this.speedX *= -1;
      this.speedY = this.height * 0.5;
    }
    this.x += this.speedX;
    this.y += this.speedY;
    // On vérifie si le projectile touche le boss
    this.game.projectilesPool.forEach(projectile => {
      if (this.game.checkCollision(this, projectile) && !projectile.free && this.lives >= 1 && this.y >= 0) {
        this.hit(1);  // On diminue les vies du boss de 1
        projectile.reset();  // On réinitialise le projectile
      }
    });
    // On vérifie si le boss touche le joueur
    if (this.game.checkCollision(this, this.game.player) && this.lives >= 1) {
      this.game.gameOver = true;  // On définit la défaite du joueur
      this.lives = 0;  // On définit les vies du boss à 0
    }
    // Si le boss n'a plus de vies
    if (this.lives < 1 && this.game.spriteUpdate) {
      this.frameX++;
      if (this.frameX > this.maxFrame) {
        this.markedForDeletion = true;  // Si on atteint le nombre maximum de frames, on marque le boss pour suppression
        this.game.score += this.maxLives;  // On augmente le score du joueur du nombre de vies du boss 
        this.game.bossLives += 5;  // On augmente le nombre de vies du prochain boss
        if (!this.game.gameOver) this.game.newWave();  // On crée une nouvelle vague si le boss est vaincu
      }
    }
    // Condition pour la défaite du joueur si le boss touche le bas de l'écran
    if (this.y + this.height > this.game.height) this.game.gameOver = true;  
  }

  /**
   * @param {number} damage Dégâts infligés au boss
   * 
   * @description Gère les dégâts infligés au boss
   */
  hit(damage) {
    this.lives -= damage;
    if (this.lives >= 1) this.frameX = 1;  // On définit la position horizontale de l'image
  }
}


/********************/

/* VAGUES D'ENNEMIS */

/********************/
class Wave {
  /**
   * @param {Game} game  Définition du jeu
   * 
   * @property {Game} game  Définition du
   * @property {number} width  Définition de la largeur de la vague
   * @property {number} height  Définition de la hauteur de la vague
   * @property {number} x  Position horizontale de la vague au centre de l'écran
   * @property {number} y  Position verticale de la vague
   * @property {number} speedX  Vitesse de la vague en X (direction aléatoire)
   * @property {number} speedY  Vitesse de la vague en Y
   * @property {array} enemies  Conteneur des ennemis
   * @property {boolean} nextWaveTrigger  Vérification si la prochaine vague doit être créée
   * @property {boolean} markedForDeletion  Marque la vague pour suppression
   * 
   * @method render  Permet de dessiner la vague à l'écran, constamment appelée pour animer la vague
   * @method create  Permet de remplir la vague d'ennemis avec des ennemis à l'aide du conteneur d'ennemis
   * 
   * @description
   * Constructeur de la classe Wave
   * On définit les propriétés de la vague
   * On créé la vague
   */
  constructor(game) {
    this.game = game;  
    this.width = this.game.columns * this.game.enemySize;  
    this.height = this.game.rows * this.game.enemySize;  
    this.x = this.game.width * 0.5 - this.width * 0.5;  
    this.y = -this.height;  
    this.speedX = Math.random() < 0.5 ? -1 : 1;
    this.speedY = 0;
    this.enemies = [];
    this.nextWaveTrigger = false;
    this.markedForDeletion = false;
    this.create();
  }

  /**
   * @param {CanvasRenderingContext2D} context  Donne le contexte 2D du canvas
   * 
   * @description Dessine la vague à l'écran, constamment appelée pour animer la vague
   */
  render(context) {
    if (this.y < 0) this.y += 5;  // On fait descendre la vague
    this.speedY = 0; 
    // On fait rebondir la vague sur les bords de l'écran et on la fait descendre
    if (this.x < 0 || this.x > this.game.width - this.width) {
      this.speedX *= -1;
      this.speedY = this.game.enemySize;
    }
    this.x += this.speedX;
    this.y += this.speedY;
    // On met à jour et on dessine les ennemis
    this.enemies.forEach(enemy => {
      enemy.update(this.x, this.y);
      enemy.draw(context);
    });
    this.enemies = this.enemies.filter(enemy => !enemy.markedForDeletion);  // On filtre les ennemis marqués pour suppression
    if (this.enemies.length <= 0) this.markedForDeletion = true;  // Si il n'y a plus d'ennemis, on marque la vague pour suppression
  }

  create() {
    // pour chaque ligne et chaque colonne, on crée un ennemi
    for (let y = 0; y < this.game.rows; y++) {
      for (let x = 0; x < this.game.columns; x++) {
        let enemyX = x * this.game.enemySize;
        let enemyY = y * this.game.enemySize;
        // On crée un ennemi aléatoire : 80% de chance d'avoir un Rhinomorph
        if (Math.random() < 0.3) {
          this.enemies.push(new Eaglemorph(this.game, enemyX, enemyY));
        } else if (Math.random() < 0.6) {  
          this.enemies.push(new Rhinomorph(this.game, enemyX, enemyY));
        } else {
          this.enemies.push(new BeetleMorph(this.game, enemyX, enemyY));
        }
      }
    }
  }
}


/*****************/

/* MOTEUR DE JEU */

/*****************/
class Game {
  /**
   * @param {HTMLCanvasElement} canvas  Définition du canvas
   * 
   * @property {HTMLCanvasElement} canvas  Définition du canvas
   * @property {number} width  Définition de la largeur
   * @property {number} height  Définition de la hauteur
   * @property {array} keys  Définition des touches du clavier
   * @property {Player} player  Définition du joueur
   * @property {array} projectilesPool  Définition du pool de projectiles
   * @property {number} numberOfProjectiles  Définition du nombre de projectiles
   * @property {boolean} fired  Permet d'empêcher le joueur de rester appuyé sur la touche de tir
   * @property {number} columns  Définition du nombre de colonnes pour la grille de la vague d'ennemis
   * @property {number} rows  Définition du nombre de lignes pour la grille de la vague d'ennemis
   * @property {number} enemySize  Définition de la taille d'un ennemi
   * @property {array} waves  Conteneur des vagues d'ennemis
   * @property {number} waveCount  Numéro de la vague
   * @property {boolean} spriteUpdate  Vérification pour l'affichage du sprite
   * @property {number} spriteTimer  Timer pour l'affichage du sprite
   * @property {number} spriteInterval  Intervalle de temps pour afficher le prochain sprite
   * @property {number} score  Score du joueur
   * @property {boolean} gameOver  Défaite du joueur
   * @property {array} bossArray  Conteneur des boss
   * @property {number} bossLives  Nombre de vies du boss
   * 
   * @method render  Permet de dessiner le jeu, constamment appelée pour animer le jeu
   * @method createProjectiles  Permet de créer les projectiles
   * @method getProjectile  Permet de récupérer un projectile
   * @method createEnemyProjectiles  Permet de créer les projectiles ennemis
   * @method getEnemyProjectile  Permet de récupérer un projectile ennemi
   * @method checkCollision  Permet de détecter les collisions entre 2 rectangles
   * @method drawStatusText  Permet d'afficher du texte à l'écran
   * @method newWave  Permet de créer une nouvelle vague d'ennemis en ajoutant soit une colonne soit une ligne
   * @method restart  Permet de réinitialiser le jeu
   * 
   * @description
   * Constructeur de la classe Game
   * On définit le canvas
   * On définit la array keys pour les touches du clavier
   * On crée un joueur
   * On crée un pool de projectiles
   * On définit le nombre de projectiles
   * On crée les projectiles
   * On définit fired comme false
   * On définit les propriétés de la vague d'ennemis
   * On crée un pool de projectiles ennemis
   * On définit le nombre de projectiles ennemis
   * On crée les projectiles ennemis
   * On définit le spriteUpdate comme false
   * On définit le spriteTimer à 0
   * On définit le spriteInterval à 120
   * On définit le score à 0
   * On définit le gameOver comme false
   * On crée un conteneur pour les boss
   * On mets les valeurs par défaut
   * On écoute les touches du clavier
   */
  constructor(canvas) {
    this.canvas = canvas;  
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.keys = [];  
    this.player = new Player(this);  

    this.projectilesPool = [];  
    this.numberOfProjectiles = 15;  
    this.createProjectiles();
    this.fired = false;

    this.columns = 1;
    this.rows = 1;
    this.enemySize = 80;
    this.waves = [];
    this.waveCount = 1;

    this.enemyProjectilesPool = [];  
    this.numberOfEnemyProjectiles = 15;  
    this.createEnemyProjectiles();

    this.spriteUpdate = false;
    this.spriteTimer = 0;
    this.spriteInterval = 120;

    this.score = 0;
    this.gameOver = false;

    this.bossArray = [];
    this.bossLives = 10;
    this.restart();

    window.addEventListener('keydown', (e) => {
      if (e.key === '1' && !this.fired) this.player.shoot();  // Si la touche 1 est enfoncée et que fired est false, on tire
      this.fired = true;  // On définit qu'un projectile a été tiré
      if (this.keys.indexOf(e.key) === -1) this.keys.push(e.key);  // Si la touche n'est pas déjà enfoncée, on l'ajoute
      if (e.key === 'r' && this.gameOver) this.restart();  // Si le joueur a perdu et que la touche r est enfoncée, on redémarre le jeu
    });
    window.addEventListener('keyup', (e) => {
      this.fired = false;  // On définit la fin de l'action du tir
      const index = this.keys.indexOf(e.key);
      if (index > -1) this.keys.splice(index, 1);  // Si la touche est relâchée, on la retire
    });
  }

  /**
   * @param {CanvasRenderingContext2D} context Donne le contexte 2D du canvas
   * @param {number} deltaTime Donne le temps écoulé entre 2 images
   * 
   * @description Dessine le jeu, constamment appelée pour animer le jeu
   * On lance le timer pour l'affichage du sprite
   * On dessine le texte à l'écran
   * On met à jour la position des projectiles
   * On dessine les projectiles
   * On met à jour la position des projectiles ennemis
   * On dessine les projectiles ennemis
   * On dessine le joueur
   * On met à jour la position du joueur
   * On dessine les boss
   * On met à jour la position des boss
   * On dessine les vagues d'ennemis
   */
  render(context, deltaTime) {
    // Timer pour l'affichage du sprite
    if (this.spriteTimer > this.spriteInterval) {
      this.spriteUpdate = true;
      this.spriteTimer = 0;
    } else {
      this.spriteUpdate = false;
      this.spriteTimer += deltaTime;
    }
    this.drawStatusText(context);  
    this.projectilesPool.forEach(projectile => {
      projectile.update();  
      projectile.draw(context);  
    });
    this.enemyProjectilesPool.forEach(enemyProjectile => {
      enemyProjectile.update();  
      enemyProjectile.draw(context);  
    });
    this.player.draw(context);  
    this.player.update();  
    this.bossArray.forEach(boss => {
      boss.draw(context);
      boss.update();
    });
    this.bossArray = this.bossArray.filter(boss => !boss.markedForDeletion);  // On filtre les boss marqués pour suppression
    this.waves.forEach(wave => {
      wave.render(context); 
      // On crée une nouvelle vague si il n'y a plus d'ennemis
      if (wave.enemies.length < 1 && !wave.nextWaveTrigger && !this.gameOver) {
        this.newWave();  // On crée une nouvelle vague si il n'y a plus d'ennemis
        wave.nextWaveTrigger = true;  
      }
    });
  }

  createProjectiles() {
    for (let i = 0; i < this.numberOfProjectiles; i++) {
      this.projectilesPool.push(new Projectile());  // On crée un nouveau projectile et on l'ajoute au pool
    }
  }

  getProjectile() {
    for (let i = 0; i < this.projectilesPool.length; i++) {
      if (this.projectilesPool[i].free) return this.projectilesPool[i];  // On retourne le projectile libre
    }
  }

  createEnemyProjectiles() {
    for (let i = 0; i < this.numberOfEnemyProjectiles; i++) {
      this.enemyProjectilesPool.push(new EnemyProjectile(this));  // On crée un nouveau projectile et on l'ajoute au pool
    }
  }

  getEnemyProjectile() {
    for (let i = 0; i < this.enemyProjectilesPool.length; i++) {
      if (this.enemyProjectilesPool[i].free) return this.enemyProjectilesPool[i];  // On retourne le projectile libre
    }
  }

  /**
   * @param {object} a  Objet A à comparer
   * @param {object} b  Objet B à comparer
   * @returns {boolean}  Retourne vrai si les 2 rectangles se touchent
   * 
   * @description Fonction pour détecter les collisions entre 2 rectangles
   */
  checkCollision(a, b) {
    return (
      a.x < b.x + b.width &&
      a.x + a.width > b.x &&
      a.y < b.y + b.height &&
      a.y + a.height > b.y
    ) 
  }

  /**
   * @param {CanvasRenderingContext2D} context Donne le contexte 2D du canvas
   * 
   * @description Fonction pour afficher du texte à l'écran
   * On affiche le score aux coordonnées X, Y
   * On affiche le nombre de vagues aux coordonnées X, Y
   * On affiche le nombre de vies max aux coordonnées X, Y (rectangles vides)
   * On affiche le nombre de vies aux coordonnées X, Y (rectangles pleins)
   * On affiche le nombre d'énergie aux coordonnées X, Y (barre)
   * On affiche GAME OVER au milieu de l'écran si le joueur a perdu
   */
  drawStatusText(context) {
    context.save(); // On sauvegarde le contexte actuel pour pouvoir le restaurer plus tard
    context.shadowOffsetX = 2;
    context.shadowOffsetY = 2;
    context.shadowColor = 'black';
    context.fillText('Score: ' + this.score, 20, 40);
    context.fillText('Wave: ' + this.waveCount, 20, 80);
    for (let i = 0; i < this.player.maxLives; i++) {
      context.strokeRect(20 + 20 * i, 100, 10, 15);
    }
    for (let i = 0; i < this.player.lives; i++) {
      context.fillRect(20 + 20 * i, 100, 10, 15);
    }
    context.save(); // On sauvegarde le contexte actuel pour pouvoir le restaurer plus tard
    this.player.cooldown ? context.fillStyle = 'red' : context.fillStyle = 'gold';  // On définit la couleur de la barre d'énergie en fonction du cooldown
    for (let i = 0; i < this.player.energy; i++) {
      context.fillRect(20 + 2 * i, 130, 2, 15);
    }
    context.restore(); // On restaure le contexte sauvegardé précédemment pour ne pas affecter les autres éléments dessinés
    if (this.gameOver) {
      context.textAlign = 'center';
      context.font = '100px Impact';
      context.fillText('GAME OVER', this.width * 0.5, this.height * 0.5);
      context.font = '20px Impact';
      context.fillText('Press R to restart', this.width * 0.5, this.height * 0.5 + 30);
    }
    context.restore(); // On restaure le contexte sauvegardé précédemment pour ne pas affecter les autres éléments dessinés
  }

  newWave() {
    this.waveCount++;  // On incrémente le numéro de la vague
    if (this.player.lives < this.player.maxLives) this.player.lives++;  // On ajoute une vie au joueur si il n'a pas le maximum de vies possibles et qu'il a gagné une vague
    // On crée un boss tous les 10 niveaux de vague sinon on crée une nouvelle vague avec une colonne ou une ligne en plus
    if (this.waveCount % 10 === 0) {
      this.bossArray.push(new Boss(this, this.bossLives));
    } else {
      if (Math.random() < 0.5 && this.columns * this.enemySize < this.width * 0.8) {
        this.columns++;
      } else if (this.rows * this.enemySize < this.height * 0.6) {
        this.rows++;
      }
      this.waves.push(new Wave(this));
    }
    this.waves = this.waves.filter(wave => !wave.markedForDeletion);  // On filtre les vagues marquées pour suppression
  }

  /**
   * @description Fonction pour réinitialiser le jeu
   * On réinitialise le joueur
   * On réinitialise le nombre de colonnes
   * On réinitialise le nombre de lignes
   * On vide les vagues
   * On vide les boss
   * On crée une nouvelle vague
   * On crée un nouveau boss
   * On réinitialise le numéro de la vague
   * On réinitialise le score
   * On réinitialise le game over
   */
  restart() {
    this.player.restart();  
    this.columns = 1;  
    this.rows = 1;  
    this.waves = [];  
    this.bossArray = [];
    this.bossLives = 10;
    this.waves.push(new Wave(this));
    //this.bossArray.push(new Boss(this, this.bossLives));
    this.waveCount = 1;  
    this.score = 0;  
    this.gameOver = false; 
  }

}


/*****************/

/* INITIALISATION */

/*****************/
window.addEventListener('load', function() {
  const canvas = document.getElementById('canvas1'); // On récupère le canvas
  const ctx = canvas.getContext('2d');  // On récupère le contexte 2D
  canvas.width = 600;  // On définit la largeur du canvas
  canvas.height = 800;  // On définit la hauteur du canvas
  ctx.fillStyle = 'white';  // On définit la couleur de remplissage
  ctx.strokeStyle = 'white';  // On définit la couleur des traits
  ctx.font = '30px Impact';  // On définit la police

  // On crée une nouvelle instance de Game
  const game = new Game(canvas);

  // On définit le dernier temps à 0
  let lastTime = 0;  
  /**
   * @param {number} timestamp Donne le temps actuel
   * 
   * @description
   * Fonction pour animer le jeu
   * On définit le delta time pour la vitesse de rafraîchissement de l'écran
   * On définit le dernier temps comme le temps actuel
   * On efface le canvas
   * On dessine le jeu
   * On lance l'animation à la prochaine image
   */
  function animate(timestamp) {
    const deltaTime = timestamp - lastTime;  
    lastTime = timestamp;  
    ctx.clearRect(0, 0, canvas.width, canvas.height);  
    game.render(ctx, deltaTime);  
    requestAnimationFrame(animate);  
  }
  // On lance l'animation
  animate(0);
});