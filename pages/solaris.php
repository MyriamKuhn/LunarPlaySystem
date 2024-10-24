<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
ini_set('error_log', $_SERVER['DOCUMENT_ROOT'] . '/error.log');

// Sécurisation du cookie de session avec httpOnly
session_set_cookie_params([
	'lifetime' => 3600,
	'path' => '/',
	'domain' => $_SERVER['SERVER_NAME'],
	//'secure' => true,
	'httponly' => true,
	'samesite' => 'Strict',
]);
// Démarrage de la session
session_start();
if (empty($_SESSION['csrf_token'])) {
	$_SESSION['csrf_token'] = bin2hex(random_bytes(32));
}

?>

<!DOCTYPE html>
<html lang="fr-FR">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="author" content="LunarPlay System">
  <meta name="description" content="" />
  <meta property="og:title" content="">
  <meta property="og:description" content="">
  <meta property="og:image" content="/assets/logo/logo.svg">
  <meta name="keywords" content="" />
  <title>Solaris -  </title>
  <link rel="shortcut icon" href="/assets/logo/logo_small.svg" type="image/svg+xml">
  <link rel="stylesheet" href="/assets/css/solaris.css" /> 
</head>
<body>

  <div class="container-progress-bar">
    <label for="progress-bar">Chargement...</label>
    <progress id="progress-bar" value="0" max="100"></progress>
    <p id="progress-bar-value"></p>
  </div>

	Solaris Prime

Rôle : Le cœur du système, à la fois source d'énergie et de lumière pour toutes les autres planètes. Elle pourrait être une étoile habitable ou un monde exceptionnel autour duquel tout gravite.
Caractéristiques : En tant que planète centrale, Solaris Prime serait le siège de civilisations avancées ou le point de départ des explorations dans le reste du système. Elle pourrait également abriter des mystères ou des défis spécifiques, étant à la fois un symbole de stabilité et de danger potentiel.

Ce nom suggère sa primauté et son importance, tout en évoquant une atmosphère imposante et solaire. Solaris Prime pourrait être le "pivot" autour duquel les mini jeux et les intrigues se développent.

  <footer class="footer">
    <p>&copy; 2024 LunarPlay System - Tous droits réservés</p>
  </footer>

  <script type="module" src="/assets/js/solaris.js"></script>
</body>
</html>

