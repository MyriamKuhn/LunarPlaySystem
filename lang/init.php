<?php

// Affichage des erreurs
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
ini_set('error_log', $_SERVER['DOCUMENT_ROOT'] . '/error.log');
ini_set('session.cookie_lifetime', 0);

// Sécurisation du cookie de session avec httpOnly
session_set_cookie_params([
	'lifetime' => 0,
	'path' => '/',
	'domain' => $_SERVER['SERVER_NAME'],
	//'secure' => true,
	'httponly' => true,
	'samesite' => 'Strict',
]);

// Démarrage de la session
session_start();
// Génération du token CSRF
if (empty($_SESSION['csrf_token'])) {
	$_SESSION['csrf_token'] = bin2hex(random_bytes(32));
}

// Autoload des classes
require_once __DIR__ . '/../Autoload.php';
Autoload::register();

use Tools\Security;

// Liste des langues disponibles sur le site
$availableLanguages = ['fr', 'en', 'de']; 

// Détection de la langue
if (isset($_GET['lang']) && in_array($_GET['lang'], $availableLanguages)) {
	$lang = Security::secureInput($_GET['lang']);
	$_SESSION['lang'] = $lang;
} else {
	// Utiliser la session, ou détecter la langue par défaut du navigateur (opérateur de fusion null ("null coalescing operator")
	$lang = $_SESSION['lang'] ?? getBrowserLanguage($availableLanguages);
	$_SESSION['lang'] = $lang;
}

// Charger les traductions correspondantes
$langFile = __DIR__ . "/{$lang}.php";
if (file_exists($langFile)) {
  $translations = require_once $langFile;
} else {
  // Charger la langue par défaut si le fichier de langue n'existe pas
  $translations = require_once __DIR__ . "/en.php";
}

/**
 * Used to get the browser language
 *
 * @param array $availableLanguages
 * @param string $default
 * @return string
 */
function getBrowserLanguage($availableLanguages, $default = 'en') {
	if (isset($_SERVER['HTTP_ACCEPT_LANGUAGE'])) {
		// Extrait la première langue préférée de l'utilisateur
		$langs = explode(',', $_SERVER['HTTP_ACCEPT_LANGUAGE']);
		foreach ($langs as $lang) {
			$lang = substr($lang, 0, 2); // Ne garde que les 2 premiers caractères de la langue
			if (in_array($lang, $availableLanguages)) {
				return $lang; // Retourne la langue si elle est disponible
			}
		}
	}
	return $default; // Sinon, retourne la langue par défaut
}

