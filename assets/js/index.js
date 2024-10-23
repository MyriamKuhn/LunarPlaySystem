const background = document.querySelector('.background');

// Palette de couleurs pour les étoiles
const colors = [
  '#ffffff', // Blanc
  '#ffcc00', // Jaune
  '#ff6600', // Orange
  '#66ccff', // Bleu clair
  '#ff66cc', // Rose
  '#cc99ff', // Violet
];

// Nombre maximum d'étoiles actives
const maxStars = 20;

// Fonction pour générer une étoile
function createStar() {
  const star = document.createElement('div');
  star.className = 'star';

  // Déterminer la taille de l'étoile entre 1 et 5 pixels
  const size = Math.random() * 4 + 1; 
  star.style.width = `${size}px`;
  star.style.height = `${size}px`;

  // Positionner l'étoile de manière aléatoire dans la fenêtre
  star.style.top = `${Math.random() * 100}vh`; // Position verticale aléatoire
  star.style.left = `${Math.random() * 100}vw`; // Position horizontale aléatoire

  // Choisir une couleur aléatoire parmi la palette
  const colorIndex = Math.floor(Math.random() * colors.length);
  star.style.backgroundColor = colors[colorIndex];

  // Durée de l'animation de mouvement entre 60 et 120 secondes
  const duration = Math.random() * 60 + 60; 
  star.style.animation = `moveStar ${duration}s linear infinite, twinkle 1.5s infinite alternate`; // Appliquer les animations

  // Rendre l'étoile visible immédiatement
  star.style.opacity = 0.8; 
  background.appendChild(star);
  
  return star; 
}

// Fonction pour faire disparaître une étoile
function removeStar(star) {
  star.style.opacity = 0; 
  setTimeout(() => {
    star.remove(); // Supprimer l'étoile après la disparition
  }, 1500); // Délai pour permettre à l'animation de disparition de se produire
}

// Fonction pour régénérer les étoiles
function regenerateStars() {
  // Vérifier s'il y a des étoiles actives
  const stars = document.querySelectorAll('.star');

  // Supprimer une étoile aléatoire si on a plus que maxStars
  if (stars.length > maxStars) {
    const randomIndex = Math.floor(Math.random() * stars.length);
    removeStar(stars[randomIndex]); 
  }

  // Générer une nouvelle étoile
  createStar(); 
}

// Appeler la fonction pour générer les étoiles initialement
for (let i = 0; i < maxStars; i++) {
  createStar();
}

// Appeler la fonction pour régénérer les étoiles à intervalles réguliers
setInterval(regenerateStars, 500); 


document.addEventListener("DOMContentLoaded", function() {
  // Fonction pour obtenir la langue actuelle à partir de l'URL
  function getCurrentLanguage() {
    const storedLanguage = sessionStorage.getItem('lang') || initialLanguage;
    return storedLanguage;
  }

  // Mettre à jour le bouton avec le drapeau de la langue actuelle
  function updateLanguageButton() {
    const currentLang = getCurrentLanguage();
    const dropdownButton = document.getElementById("language-button");
    // Nettoyer le contenu du bouton avant d'ajouter le nouveau
    dropdownButton.innerHTML = '';
    // Mettre à jour la classe du drapeau en fonction de la langue actuelle
    const flagSpan = document.createElement('span');
    flagSpan.className = currentLang !== 'en' ? `flag flag-${currentLang}` : 'flag flag-us';
    flagSpan.id = "current-flag";
    dropdownButton.appendChild(flagSpan);
    const textNode = document.createTextNode(currentLang === 'fr' ? " Français" : currentLang === 'de' ? " Deutsch" : " English");
    dropdownButton.appendChild(textNode);
  }

  // Appeler la fonction pour mettre à jour le bouton lors du chargement de la page
  updateLanguageButton();

  // Pour le menu déroulant du choix de la langue
  document.querySelectorAll('.dropdown-content a').forEach(item => {
    item.addEventListener('click', function(event) {
      event.preventDefault(); // Empêche le lien de rediriger
      const lang = this.getAttribute('data-lang');
      sessionStorage.setItem('lang', lang); // Stocker la langue dans la session
      window.location.href = `/${lang}/`; // Redirige vers la nouvelle URL
    });
  });
});