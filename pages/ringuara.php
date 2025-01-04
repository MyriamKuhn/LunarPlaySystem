<?php

require_once __DIR__ . '/../lang/language.php';

use Tools\Security;

$requestScheme = Security::secureInput($_SERVER['REQUEST_SCHEME']);
$serverName = Security::secureInput($_SERVER['SERVER_NAME']);

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
	<link rel="alternate" href="<?= $requestScheme . '://' . $serverName . '/fr/ringuara/' ?>" hreflang="fr" />
	<link rel="alternate" href="<?= $requestScheme . '://' . $serverName . '/en/ringuara/' ?>" hreflang="en" />
	<link rel="alternate" href="<?= $requestScheme . '://' . $serverName . '/de/ringuara/' ?>" hreflang="de" />
	<link rel="canonical" href="<?= $requestScheme . '://' . $serverName . '/' . Security::secureInput($lang) . '/ringuara/' ?>" />
	<link rel="alternate" href="<?= $requestScheme . '://' . $serverName . '/en/ringuara/' ?>" hreflang="x-default" />
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
	<link href="https://fonts.googleapis.com/css2?family=Atma:wght@300;400;500;600;700&display=swap" rel="stylesheet">
	<!-- Stylesheet -->
	<link rel="stylesheet" href="/assets/css/ringuara.css" />
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
		<img src="/assets/img/ringuara/map1.png" id="map1">
		<img src="/assets/img/ringuara/map2.png" id="map2">
		<img src="/assets/img/ringuara/map3.png" id="map3">
		<img src="/assets/img/ringuara/map4.png" id="map4">
		<img src="/assets/img/ringuara/map5.png" id="map5">
		<img src="/assets/img/ringuara/map6.png" id="map6">
		<img src="/assets/img/ringuara/map7.png" id="map7">
		<img src="/assets/img/ringuara/bomb1.png" id="bomb1">
		<img src="/assets/img/ringuara/bomb2.png" id="bomb2">
		<img src="/assets/img/ringuara/bomb3.png" id="bomb3">
		<img src="/assets/img/ringuara/bomb4.png" id="bomb4">
		<img src="/assets/img/ringuara/bomb5.png" id="bomb5">
		<img src="/assets/img/ringuara/bomb6.png" id="bomb6">
		<img src="/assets/img/ringuara/bomb7.png" id="bomb7">
		<img src="/assets/img/ringuara/explosion.png" id="explosion">
		<img src="/assets/img/ringuara/meteor1.png" id="meteor1">
		<img src="/assets/img/ringuara/meteor2.png" id="meteor2">
		<img src="/assets/img/ringuara/meteor3.png" id="meteor3">
		<img src="/assets/img/ringuara/meteor4.png" id="meteor4">
		<img src="/assets/img/ringuara/meteor5.png" id="meteor5">
		<img src="/assets/img/ringuara/meteor6.png" id="meteor6">
		<img src="/assets/img/ringuara/meteor7.png" id="meteor7">
		<img src="/assets/img/ringuara/meteor8.png" id="meteor8">
		<img src="/assets/img/ringuara/meteor9.png" id="meteor9">
		<img src="/assets/img/ringuara/meteor10.png" id="meteor10">
		<img src="/assets/img/ringuara/meteor11.png" id="meteor11">
		<img src="/assets/img/ringuara/meteor12.png" id="meteor12">
		<img src="/assets/img/ringuara/player.png" id="player">
		<img src="/assets/img/ringuara/enemy1.png" id="enemy1">
		<img src="/assets/img/ringuara/enemy2.png" id="enemy2">
		<img src="/assets/img/ringuara/enemy3.png" id="enemy3">
		<img src="/assets/img/ringuara/enemy4.png" id="enemy4">
		<img src="/assets/img/ringuara/enemy5.png" id="enemy5">
		<img src="/assets/img/ringuara/enemy6.png" id="enemy6">
		<img src="/assets/img/ringuara/enemy7.png" id="enemy7">
		<img src="/assets/img/ringuara/enemy8.png" id="enemy8">
		<img src="/assets/img/ringuara/enemy9.png" id="enemy9">
		<img src="/assets/img/ringuara/enemy10.png" id="enemy10">
		<img src="/assets/img/ringuara/enemy11.png" id="enemy11">
		<img src="/assets/img/ringuara/enemy12.png" id="enemy12">
		<img src="/assets/img/ringuara/enemy13.png" id="enemy13">
		<img src="/assets/img/ringuara/enemy14.png" id="enemy14">
		<img src="/assets/img/ringuara/enemy15.png" id="enemy15">
		<img src="/assets/img/ringuara/enemy16.png" id="enemy16">
		<img src="/assets/img/ringuara/enemy17.png" id="enemy17">
		<img src="/assets/img/ringuara/enemy18.png" id="enemy18">
		<img src="/assets/img/ringuara/enemy19.png" id="enemy19">
		<img src="/assets/img/ringuara/enemy20.png" id="enemy20">
		<img src="/assets/img/ringuara/enemy21.png" id="enemy21">

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
	<script type="module" src="/assets/js/ringuara/main.js"></script>
</body>

</html>