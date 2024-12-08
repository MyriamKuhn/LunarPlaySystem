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
	<link rel="alternate" href="<?= $requestScheme . '://' . $serverName . '/fr/cryos/' ?>" hreflang="fr" />
	<link rel="alternate" href="<?= $requestScheme . '://' . $serverName . '/en/cryos/' ?>" hreflang="en" />
	<link rel="alternate" href="<?= $requestScheme . '://' . $serverName . '/de/cryos/' ?>" hreflang="de" />
	<link rel="canonical" href="<?= $requestScheme . '://' . $serverName . '/' . Security::secureInput($lang) . '/cryos/' ?>" />
	<link rel="alternate" href="<?= $requestScheme . '://' . $serverName . '/en/cryos/' ?>" hreflang="x-default" />
	<!-- Meta pour le SEO -->
	<meta name="author" content="LunarPlay System">
	<meta name="description" content="<?= Security::secureInput($translations['under_construction_description']) ?>" />
	<meta property="og:title" content="<?= Security::secureInput($translations['under_construction_title']) ?>">
	<meta property="og:description" content="<?= Security::secureInput($translations['under_construction_description']) ?>">
	<meta property="og:image" content="/assets/logo/logo_big.svg">
	<meta name="keywords" content="<?= Security::secureInput($translations['under_construction_keywords']) ?>" />
	<title><?= Security::secureInput($translations['under_construction_title']) ?></title>
	<link rel="shortcut icon" href="/assets/logo/logo_small.svg" type="image/svg+xml">
	<!-- Google Fonts -->
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
	<link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400..900&display=swap" rel="stylesheet">
	<link href="https://fonts.googleapis.com/css2?family=Exo+2:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
	<link href="https://fonts.googleapis.com/css2?family=Bungee&display=swap" rel="stylesheet">
	<!-- Stylesheet -->
	<link rel="stylesheet" href="/assets/css/cryos.css" />
</head>

<body>
<body>

<!-- Écran de chargement -->
<div id="loading-screen" class="loading-screen">
	<p id="loading-text"></p>
	<progress id="loading-progress" value="0" max="100"></progress>
</div>

<!-- Écran de jeu -->
<canvas id="canvas1" class="hidden"></canvas>

<div class="assets">
	<img src="/assets/img/cryos/background_single.png" id="background">
	<img src="/assets/img/cryos/player_fish.png" id="player">
	<img src="/assets/img/cryos/smallGears.png" id="obstacle">

	<audio src="/assets/audio/cryos/winflappy.mp3" id="win" preload="auto"></audio>
	<audio src="/assets/audio/cryos/loseflappy.mp3" id="lose" preload="auto"></audio>
	<audio src="/assets/audio/cryos/charge.mp3" id="charge" preload="auto"></audio>
	<audio src="/assets/audio/cryos/flap1.mp3" id="flap1" preload="auto"></audio>
	<audio src="/assets/audio/cryos/flap2.mp3" id="flap2" preload="auto"></audio>
	<audio src="/assets/audio/cryos/flap3.mp3" id="flap3" preload="auto"></audio>
	<audio src="/assets/audio/cryos/flap4.mp3" id="flap4" preload="auto"></audio>
	<audio src="/assets/audio/cryos/flap5.mp3" id="flap5" preload="auto"></audio>
</div>

<div class="controls">
	<button id="fullScreenButton">💻</button>
  <button id="resetButton">⚔️</button>
  <button id="backButton">👈</button>
	<button id="volumeButton">🔊</button>
</div>

<!-- Scripts -->
<script type="module" src="/assets/js/cryos/main.js"></script>
</body>

</html>