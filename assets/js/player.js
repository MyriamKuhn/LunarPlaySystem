/***********/

/* IMPORTS */

/***********/
import { Background } from '/assets/js/Background.js';
import { securePlayername } from '/assets/js/utils.js';  


/************************************/

/* INITIALISATION DE L'ARRIERE PLAN */

/************************************/
const background = new Background();


/********************/

/* ENTREE DU PSEUDO */

/********************/
const playernameInput = document.getElementById('playername');
const playernameForm = document.getElementById('playername-form');

playernameForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const errorMessage = document.getElementById('error-message');
  errorMessage.classList.remove('show');

  try {
    const playername = securePlayername(playernameInput.value);
    sessionStorage.setItem('playername', playername);
    sessionStorage.setItem('starting', 'true');
    document.getElementById('playernameHidden').value = playername;
    playernameForm.submit();
  } catch (error) {
    errorMessage.classList.add('show');
  }
});
