/************************/

// VALIDATION DES JSON //

/***********************/
export const validateJSONStructure = (data) => {
  if (Array.isArray(data)) {
    return data.every(item => validateJSONStructure(item));
  } else if (typeof data === 'object' && data !== null) {
    return Object.values(data).every(value => validateJSONStructure(value));
  } else {
    return ['string', 'number', 'boolean'].includes(typeof data);
  }
};


/**************************/

// VALIDATION DES DONNEES //

/*************************/
export const securePlayername = (string) => {
  // Échappe les chevrons pour éviter les attaques XSS
  let sanitized = string.replace(/</g, '&lt;').replace(/>/g, '&gt;');
  // Supprime les caractères non autorisés (autorise lettres, chiffres, espaces, tirets et underscores)
  sanitized = sanitized.replace(/[^a-zA-Z0-9 \-_]/g, '');
  // Vérifie la longueur
  if (sanitized.length < 3 || sanitized.length > 20) {
    throw new Error("Votre pseudo doit contenir entre 3 et 20 caractères.");
  }
  return sanitized;
};


/*************************************************/

// SECURISER LES INPUTS CONTRE LES INJECTIONS XSS //

/*************************************************/
/**
 * Fonction pour sécuriser les inputs contre les injections XSS
 * @param {string} text
 * @returns {string}
 */
export function secureInput(text) {
  const map = {
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    '&': '&amp;',
  };
  return text.replace(/[<>"'&]/g, (m) => map[m]);
}


/*******************************/

// ENVOI SCORES AVEC FETCH API //

/******************************/
/**
 * Envoi des scores au serveur
 * @param {object} data
 * @returns {Promise}
 */
export function sendScore(data) {
  return fetch('/App/add_score.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
    },
    body: JSON.stringify(data)
  })
  .then(response => response.json())
  .catch(error => {
    console.error('Erreur:', error);
  });
};