<?php

session_start();

// Autoload des classes
require_once __DIR__ . '/../Autoload.php';
Autoload::register();

use Tools\Security;

// Vérifier si un token CSRF est déjà présent dans la session
if (empty($_SESSION['csrf_token'])) {
	$_SESSION['csrf_token'] = bin2hex(random_bytes(32));
}

// Vérifier si une langue a été choisie via GET
if (isset($_GET['lang'])) {
  // S'assurer que la langue choisie est valide avant de l'assigner
	$availableLanguages = ['fr', 'en', 'de'];
	$requestedLang = Security::secureInput($_GET['lang']);
  if (in_array($requestedLang, $availableLanguages)) {
    $_SESSION['lang'] = $requestedLang;
  }
}

// Vérifier si la langue dans la session est valide
$lang = isset($_SESSION['lang']) && in_array($_SESSION['lang'], $availableLanguages) ? $_SESSION['lang'] : 'en';

// Charger les traductions
$langFile = __DIR__ . "/../lang/{$lang}.php";
if (file_exists($langFile)) {
  $translations = require_once $langFile;
} else {
  $translations = require_once __DIR__ . '/../lang/en.php';
}