/***********/

/* IMPORTS */

/***********/
import { Background } from '/assets/js/Background.js';
import { validateJSONStructure } from '/assets/js/utils.js';
import { descriptions } from '/assets/js/translations.js';


/************************************/

/* INITIALISATION DE L'ARRIERE PLAN */

/************************************/
const background = new Background();


/******************************/

/* AU CHARGEMENT DU DOCUMENT */

/*****************************/
document.addEventListener("DOMContentLoaded", function() {
  const links = document.querySelectorAll('.planet');
  const lang = sessionStorage.getItem('lang') || initialLanguage;
  const planetTitles = descriptions[lang];
  // Fonction pour afficher les données de la planète
  const showPlanetData = (planet) => {
    // Afficher le titre de la planète
    document.getElementById('planet-title').textContent = planetTitles[planet]['game'];
    // Afficher le sous-titre de la planète
    document.getElementById('planet-intro').textContent = planetTitles[planet]['desc'];

    // Appeler le script PHP pour obtenir les données
    fetch('/App/get_ranking.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
      },
      body: JSON.stringify({ planet: planet })
    })
    .then(response => response.json())
    .then(data => {
      if (!validateJSONStructure(data)) {
        console.error('Format inattendu des données');
        return;
      }
      if (data.success === false) {
        if (data.datas === "Aucun classement trouvé pour cette planète.") {
          console.log('Aucun classement trouvé pour cette planète.');
          document.getElementById('loading').classList.add('hidden');
          const noDatas = document.getElementById('no-datas');
          noDatas.classList.remove('hidden');
          return;
        } else {
          console.error('Erreur lors de la récupération des données');
          return;
        }
      } else {
        displayRankingTable(data.datas, planet);
      }
    })
    .catch(error => console.error('Erreur lors de la récupération des données:', error));
  };

  links.forEach(link => {
    // Fonction pour gérer l'ajout de la classe active
    const activateLink = (event) => {
      event.preventDefault();
      
      // Supprimer la classe active de tous les liens
      links.forEach(l => l.classList.remove('active'));

      // Ajouter la classe active au lien cliqué
      link.classList.add('active');

      const planet = link.getAttribute('data-planet');
      showPlanetData(planet);
    };

    // Écouter les événements de clic et de toucher
    link.addEventListener('click', activateLink);
    link.addEventListener('touchstart', activateLink); // Gérer les événements tactiles
  });

  // Afficher les données de la première planète par défaut
  const defaultPlanet = 'lunarplay';
  // Simuler le clic sur l'onglet par défaut
  document.querySelector(`.planet[data-planet="${defaultPlanet}"]`).click(); 
});

function displayRankingTable(data, planet) {
  const rankingsDiv = document.getElementById('planet-rankings');
  rankingsDiv.innerHTML = ''; // Vider les anciens tableaux

  // Créer le tableau
  const table = document.createElement('table');
  table.className = 'display'; // Classe pour DataTables

  // Créer l'en-tête
  const thead = document.createElement('thead');
  const headerRow = document.createElement('tr');
  data.columns.forEach(column => {
      const th = document.createElement('th');
      th.textContent = column; // Ajouter le titre de la colonne
      headerRow.appendChild(th);
  });
  thead.appendChild(headerRow);
  table.appendChild(thead);

  // Créer le corps
  const tbody = document.createElement('tbody');
  data.rows.forEach(row => {
      const tr = document.createElement('tr');
      data.columns.forEach(column => {
          const td = document.createElement('td');
          td.textContent = row[column]; // Remplir les données
          tr.appendChild(td);
      });
      tbody.appendChild(tr);
  });
  table.appendChild(tbody);
  
  rankingsDiv.appendChild(table);

  // Initialiser DataTables
  $(table).DataTable();

  // Afficher le tableau
  document.getElementById('loading').classList.add('hidden');
  document.getElementById('no-datas').classList.add('hidden');
  document.getElementById('ranking-table').classList.remove('hidden');

}