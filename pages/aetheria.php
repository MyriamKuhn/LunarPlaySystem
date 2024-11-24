<?php

require_once __DIR__ . '/../lang/language.php';

use Tools\Security;

$requestScheme = Security::secureInput($_SERVER['REQUEST_SCHEME']);
$serverName = Security::secureInput($_SERVER['SERVER_NAME']);

if (!isset($_SESSION['playername'])) {
  header('Location: /' . $lang . '/player/');
  exit();
}

?>

<!DOCTYPE html>
<html lang="<?= Security::secureInput($lang) ?>">

<head>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<!-- CSRF Token -->
	<meta name="csrf-token" content="<?= $_SESSION['csrf_token']; ?>">
	<meta name="language" content="<?= Security::secureInput($_SESSION['lang'] ?? 'en') ?>">
	<!-- Meta pour les langues -->
	<link rel="alternate" href="<?= $requestScheme . '://' . $serverName . '/fr/aetheria/' ?>" hreflang="fr" />
	<link rel="alternate" href="<?= $requestScheme . '://' . $serverName . '/en/aetheria/' ?>" hreflang="en" />
	<link rel="alternate" href="<?= $requestScheme . '://' . $serverName . '/de/aetheria/' ?>" hreflang="de" />
	<link rel="canonical" href="<?= $requestScheme . '://' . $serverName . '/' . Security::secureInput($lang) . '/aetheria/' ?>" />
	<link rel="alternate" href="<?= $requestScheme . '://' . $serverName . '/en/aetheria/' ?>" hreflang="x-default" />
	<!-- Meta pour le SEO -->
	<meta name="author" content="LunarPlay System">
	<meta name="description" content="<?= Security::secureInput($translations['aetheria_description']) ?>" />
	<meta property="og:title" content="<?= Security::secureInput($translations['aetheria_title']) ?>">
	<meta property="og:description" content="<?= Security::secureInput($translations['aetheria_description']) ?>">
	<meta property="og:image" content="/assets/logo/logo_big.svg">
	<meta name="keywords" content="<?= Security::secureInput($translations['aetheria_keywords']) ?>" />
	<title><?= Security::secureInput($translations['aetheria_title']) ?></title>
	<link rel="shortcut icon" href="/assets/logo/logo_small.svg" type="image/svg+xml">
  <!-- Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Bangers&family=Orbitron:wght@400..900&display=swap" rel="stylesheet">
	<link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400..900&display=swap" rel="stylesheet">
	<link href="https://fonts.googleapis.com/css2?family=Exo+2:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
	<!-- Stylesheet -->
	<link rel="stylesheet" href="/assets/css/aetheria.css" />
</head>

<body>

	<!-- Écran de chargement -->
	<div id="loading-screen" class="loading-screen">
    <p id="loading-text"></p>
    <progress id="loading-progress" value="0" max="100"></progress>
  </div>

	<!-- Écran de jeu -->
	<canvas id="canvas1" class="hidden"></canvas>

  <div class="assets">
		<img src="/assets/img/aetheria/crewSprite.png" id="crewSprite">
    <img src="/assets/img/aetheria/beetlemorph100x100.png" id="beetlemorph">
		<img src="/assets/img/aetheria/rhinomorph100x100.png" id="rhinomorph">
		<img src="/assets/img/aetheria/lobstermorph100x100.png" id="lobstermorph">
		<img src="/assets/img/aetheria/phantommorph100x100.png" id="phantommorph">
		<img src="/assets/img/aetheria/mantismorph100x100.png" id="mantismorph">
		<img src="/assets/img/aetheria/eaglemorph100x100.png" id="eaglemorph">
		<img src="/assets/img/aetheria/projectileLarge.png" id="projectile">
		<img src="/assets/img/aetheria/locustmorph100x100.png" id="locustmorph">
		<img src="/assets/img/aetheria/squidmorph100x100.png" id="squidmorph">
		<img src="/assets/img/aetheria/boss8.png" id="boss">

		<audio src="/assets/audio/aetheria/newgame.mp3" id="newgame" preload="auto"></audio>
		<audio src="/assets/audio/aetheria/boom1.mp3" id="boom1" preload="auto"></audio>
		<audio src="/assets/audio/aetheria/boom2.mp3" id="boom2" preload="auto"></audio>
		<audio src="/assets/audio/aetheria/boom3.mp3" id="boom3" preload="auto"></audio>
		<audio src="/assets/audio/aetheria/boom4.mp3" id="boom4" preload="auto"></audio>
		<audio src="/assets/audio/aetheria/slide.mp3" id="slide" preload="auto"></audio>
		<audio src="/assets/audio/aetheria/lose.mp3" id="lose" preload="auto"></audio>
		<audio src="/assets/audio/aetheria/scream.mp3" id="scream" preload="auto"></audio>
		<audio src="/assets/audio/aetheria/win.mp3" id="win" preload="auto"></audio>
  </div>

	<div class="controls">
    <button id="fullScreenButton">💻</button>
    <button id="resetButton">⚔️</button>
    <button id="backButton">👈</button>
		<button id="volumeButton">🔊</button>
  </div>

	<!-- Scripts -->
	<script type="module" src="/assets/js/aetheria/main.js"></script>
</body>

</html>