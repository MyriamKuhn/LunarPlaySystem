/***********/

/* IMPORTS */

/***********/
import { Background } from '/assets/js/Background.js';
import { validateJSONStructure, secureInput } from '/assets/js/utils.js';
import { descriptions } from '/assets/js/translations.js';


/************************************/

/* INITIALISATION DE L'ARRIERE PLAN */

/************************************/
const background = new Background();


/**********************/

/* VARIABLES GLOBALES */

/**********************/
const lang = sessionStorage.getItem('lang') || document.querySelector('meta[name="language"]').getAttribute('content');
const planetTitles = descriptions[lang];


/******************************/

/* AU CHARGEMENT DU DOCUMENT */

/*****************************/
document.addEventListener("DOMContentLoaded", function() {
  const links = document.querySelectorAll('.planet');

  links.forEach(link => {
    // Fonction pour gérer l'ajout de la classe active
    const activateLink = (event) => {
      event.preventDefault();
      
      // Supprimer la classe active de tous les liens
      links.forEach(l => l.classList.remove('active'));

      // Ajouter la classe active au lien cliqué
      link.classList.add('active');

      // Récupérer la planète à afficher
      const planet = link.getAttribute('data-planet');
      showPlanetData(planet);
    };

    // Écouter les événements de clic et de toucher
    link.addEventListener('click', activateLink);
    link.addEventListener('touchstart', activateLink, { passive: false }); 
  });

  // Afficher les données de la première planète par défaut
  const defaultPlanet = 'lunarplay';
  // Simuler le clic sur l'onglet par défaut
  document.querySelector(`.planet[data-planet="${defaultPlanet}"]`).click(); 
});

/**
 * Fonction pour afficher les données de la planète
 * 
 * @param {string} planet - Le nom de la planète
 * @returns {void}
 * @async
 * @sideEffects
 * @throws {Error} - Erreur lors de la récupération des données
 * @throws {Error} - Format inattendu des données
 * @throws {Error} - Aucun classement trouvé
 */
const showPlanetData = (planet) => {
  document.getElementById('loading').classList.remove('hidden');
  document.getElementById('no-datas').classList.add('hidden');
  document.getElementById('ranking-table').classList.add('hidden');
  if ($.fn.dataTable.isDataTable('#ranking-table')) {
    $('#ranking-table').DataTable().clear().destroy();
  }
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
        document.getElementById('loading').classList.add('hidden');
        document.getElementById('no-datas').classList.remove('hidden');
        document.getElementById('ranking-table').classList.add('hidden');
        return;
      } else {
        console.error('Erreur lors de la récupération des données');
        return;
      }
    } else {
      displayRankingTable(data.datas);
    }
  })
  .catch(error => console.error('Erreur lors de la récupération des données:', error));
};

/**
 * Fonction pour afficher les données de la planète dans un tableau DataTable
 * 
 * @param {string} data - Les données du classement
 * @returns {void}
 */
// Fonction pour afficher le tableau de classement
function displayRankingTable(data) {
  // Initialiser DataTables avec les données récupérées
  const table = $('#ranking-table').DataTable({
    data: data,  // Les données récupérées
    columns: [
      { 
        data: "place", 
        title: planetTitles['info']['rank'], 
        render: function(data, type, row) {
          return parseInt(data, 10);  
        }
      },
      { 
        data: "playername", 
        title: planetTitles['info']['playername'], 
        render: function(data, type, row) {
          return secureInput(data).trim();  
        }
      },
      { 
        data: "score", 
        title: planetTitles['info']['score'], 
        render: function(data, type, row) {
          return parseInt(data, 10);  
        }
      }
    ],
    "responsive": true,
    "buttons": [],
    "paging": true,
    "pagingType": "simple_numbers",
    "pageLength": 10,
    "lengthMenu": [5, 10, 25, 50],
    "ordering": true,
    "order": [[0, 'asc']],
    "searching": true,
    "language": {
      "paginate": {
        "next":       ">>",
        "previous":   "<<"
      },
      "lengthMenu": planetTitles['info']['pagination'],
      "zeroRecords": planetTitles['info']['zeroRecords'],
      "info": "",
      "infoEmpty": "",
      "infoFiltered": "",
      "sSearch": planetTitles['info']['search'],
    },
    initComplete: function () {
      document.getElementById('loading').classList.add('hidden');
      document.getElementById('no-datas').classList.add('hidden');
      document.getElementById('ranking-table').classList.remove('hidden');
    }
  });
  
}