export class Background {
  /**
   * @property {HTMLElement} background - Élément HTML pour le fond d'écran
   * @property {Array} colors - Palette de couleurs pour les étoiles
   * @property {Number} maxStars - Nombre maximum d'étoiles actives
   * 
   * @method createStar - Fonction pour générer une étoile aléatoire et retourner l'élément HTML
   * @method removeStar - Fonction pour faire disparaître une étoile après un délai prends l'étoile en paramètre
   * @method regenerateStars - Fonction pour régénérer les étoiles
   * @method init - Fonction pour initialiser les étoiles
   * 
   * @description
   * Constructeur de la classe Background
   * Initialiser les propriétés de la classe
   * et appeler les fonctions pour initialiser les étoiles
   */
  constructor() {
    this.background = document.querySelector('.background');
    this.colors = [
      '#ffffff', 
      '#ffcc00', 
      '#ff6600', 
      '#66ccff', 
      '#ff66cc', 
      '#cc99ff', 
    ];
    this.maxStars = 20;
    this.init();
  }

  createStar() {
    const star = document.createElement('div');
    star.className = 'star';

    // Déterminer la taille de l'étoile entre 1 et 5 pixels
    const size = Math.random() * 4 + 1; 
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;

    // Positionner l'étoile de manière aléatoire dans la fenêtre
    star.style.top = `${Math.random() * 100}vh`; 
    star.style.left = `${Math.random() * 100}vw`; 

    // Choisir une couleur aléatoire parmi la palette
    const colorIndex = Math.floor(Math.random() * this.colors.length);
    star.style.backgroundColor = this.colors[colorIndex];

    // Durée de l'animation de mouvement entre 60 et 120 secondes
    const duration = Math.random() * 60 + 60; 
    star.style.animation = `moveStar ${duration}s linear infinite, twinkle 1.5s infinite alternate`; 

    // Rendre l'étoile visible immédiatement
    star.style.opacity = 0.8; 
    this.background.appendChild(star);
    
    return star; 
  }

  removeStar(star) {
    star.style.opacity = 0; 
    setTimeout(() => {
      star.remove(); // Supprimer l'étoile après la disparition
    }, 1500); // Délai pour permettre à l'animation de disparition de se produire
  }

  regenerateStars() {
    // Vérifier s'il y a des étoiles actives
    const stars = document.querySelectorAll('.star');

    // Supprimer une étoile aléatoire si on a plus que maxStars
    if (stars.length > this.maxStars) {
      const randomIndex = Math.floor(Math.random() * stars.length);
      this.removeStar(stars[randomIndex]); 
    }

    // Générer une nouvelle étoile
    this.createStar(); 
  }

  init() {
    // Appeler la fonction pour générer les étoiles initialement
    for (let i = 0; i < this.maxStars; i++) {
      this.createStar();
    }

    // Appeler la fonction pour régénérer les étoiles à intervalles réguliers
    setInterval(this.regenerateStars.bind(this), 500); 
  }

}