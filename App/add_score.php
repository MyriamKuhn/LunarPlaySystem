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

  // Récupérer le CSRF Token dans l'en-tête
  $csrfToken = $_SERVER['HTTP_X_CSRF_TOKEN'] ?? null;
	
  // Vérification si le token CSRF est présent dans les en-têtes
  if (empty($csrfToken)) {
    Security::sendResponse(false, 'Token CSRF manquant.', 400);
    exit;
  }

  // Vérification du token CSRF
  Security::checkCSRF($csrfToken);

  // Instanciation du repository général
  $generalRepository = new GeneralRepository();

  // Récupérer la planète depuis la requête POST
  $data = json_decode(file_get_contents('php://input'), true);
  if (json_last_error() !== JSON_ERROR_NONE) {
    Security::sendResponse(false, 'Données JSON invalides.', 400);
    exit;
  }
  $planet = Security::secureInput($data['planet']);
  $playername = Security::secureInput($data['playername']);
  $score = Security::secureInput($data['score']);

  // Ajouter le score
  if ($generalRepository->addScore($planet, $playername, $score)) {
    Security::sendResponse(true, 'Score ajouté avec succès.', 200);
  } else {
    Security::sendResponse(false, 'Le score n\'a pas été mis à jour.', 400);
  }

} catch (Throwable $t) {
  error_log('Erreur serveur : ' . $t->getMessage());
  Security::sendResponse(false, $t->getMessage(), 500);
} catch (Exception $e) {
  error_log('Exception attrapée : ' . $e->getMessage());
  Security::sendResponse(false, $e->getMessage(), 500);
}