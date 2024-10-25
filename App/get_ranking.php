<?php

session_start();
// Vérifier si un token CSRF est déjà présent dans la session
if (empty($_SESSION['csrf_token'])) {
	$_SESSION['csrf_token'] = bin2hex(random_bytes(32));
}

// Chargement de l'autoloader
require_once __DIR__.'/../Autoload.php';
Autoload::register();

use App\Repository\GeneralRepository;
use Tools\Security;

try {
  if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    Security::sendResponse(false, 'Méthode non autorisée.', 405);
    exit;
  }

  // Récupérer les en-têtes
  $headers = getallheaders();
    
  // Vérification si le token CSRF est présent dans les en-têtes
  if (!isset($headers['X-CSRF-Token'])) {
      Security::sendResponse(false, 'Token CSRF manquant.', 400);
      exit;
  }

  // Vérification du token CSRF
  Security::checkCSRF($headers['X-CSRF-Token']);

  // Instanciation du repository général
  $generalRepository = new GeneralRepository();

  // Récupérer la planète depuis la requête POST
  $data = json_decode(file_get_contents('php://input'), true);
  $planet = Security::secureInput($data['planet']);

  // Obtenir les classements
  $rankings = $generalRepository->getRanking($planet);

  // Définir les colonnes dynamiquement, ici en supposant qu'elles sont toujours les mêmes
  $columns = ['Position', 'Joueur', 'Score'];
  $rows = [];

  // Préparer les lignes pour la réponse
  foreach ($rankings as $ranking) {
    $rows[] = [
        'Position' => Security::secureInput($ranking['place']),
        'Joueur' => Security::secureInput($ranking['player_name']),
        'Score' => Security::secureInput($ranking['score']),
    ];
  }

  if (empty($rows)) {
    Security::sendResponse(false, 'Aucun classement trouvé pour cette planète.', 404);
  } else {
    Security::sendResponse(true, ['columns' => $columns, 'rows' => $rows]);
  }

} catch (Exception $e) {
  Security::sendResponse(false, $e->getMessage(), 500);
}