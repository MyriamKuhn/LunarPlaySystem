/***********/

/* IMPORTS */

/***********/
import { Background } from '/assets/js/Background.js';


/************************************/

/* INITIALISATION DE L'ARRIERE PLAN */

/************************************/
const background = new Background();


/************************************/

/* LANGUES AU CHARGEMENT DE LA PAGE */

/************************************/
const currentLanguage = document.querySelector('div[data-lang]').getAttribute('data-lang');

document.addEventListener("DOMContentLoaded", function() {
  // Fonction pour obtenir la langue actuelle à partir de l'URL
  function getCurrentLanguage() {
    const storedLanguage = currentLanguage;
    return storedLanguage;
  }

  /**
   * @description Mettre à jour le bouton de langue en fonction de la langue actuelle
   */
  function updateLanguageButton() {
    const currentLang = getCurrentLanguage();
    sessionStorage.setItem('lang', currentLang);
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