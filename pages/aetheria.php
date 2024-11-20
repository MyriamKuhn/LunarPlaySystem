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
	<!-- Stylesheet -->
	<link rel="stylesheet" href="/assets/css/aetheria.css" />
</head>

<body>
	<canvas id="canvas1"></canvas>

  <div class="controls">
    <button id="fullScreenButton">F</button>
    <button id="resetButton">R</button>
    <button id="backButton">B</button>
  </div>

  <div class="assets">
    <img src="/assets/img/aetheria/crew.png" id="crew">
		<img src="/assets/img/aetheria/crewSprite.png" id="crewSprite">
    <img src="/assets/img/aetheria/beetlemorph100x100.png" id="beetlemorph">
		<img src="/assets/img/aetheria/lobstermorph100x100.png" id="lobstermorph">
		<img src="/assets/img/aetheria/phantommorph100x100.png" id="phantommorph">

		<audio src="/assets/audio/aetheria/newgame.mp3" id="newgame"></audio>
		<audio src="/assets/audio/aetheria/boom1.mp3" id="boom1"></audio>
		<audio src="/assets/audio/aetheria/boom2.mp3" id="boom2"></audio>
		<audio src="/assets/audio/aetheria/boom3.mp3" id="boom3"></audio>
		<audio src="/assets/audio/aetheria/boom4.mp3" id="boom4"></audio>
		<audio src="/assets/audio/aetheria/slide.mp3" id="slide"></audio>
		<audio src="/assets/audio/aetheria/lose.mp3" id="lose"></audio>
		<audio src="/assets/audio/aetheria/scream.mp3" id="scream"></audio>
		<audio src="/assets/audio/aetheria/win.mp3" id="win"></audio>
  </div>




	<div class="btn-div">
		<a href="/<?= Security::secureInput($lang) ?>/lunarplay/" class="button" id="start-button"><?= Security::secureInput($translations['return_lunar']) ?></a>
	</div>


	<!-- START : Footer -->
	<footer class="footer">
		<p><?= html_entity_decode(Security::secureInput($translations['footer'])) ?> - <a href="/<?= Security::secureInput($lang) ?>/legal/" class="link"><?= Security::secureInput($translations['legal']) ?></a></p>
	</footer>
	<!-- END : Footer -->

	<!-- Scripts -->
	<script type="module" src="/assets/js/aetheria/main.js"></script>
</body>

</html>