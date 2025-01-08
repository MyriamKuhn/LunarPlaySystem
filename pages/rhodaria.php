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
	<link rel="alternate" href="<?= $requestScheme . '://' . $serverName . '/fr/rhodaria/' ?>" hreflang="fr" />
	<link rel="alternate" href="<?= $requestScheme . '://' . $serverName . '/en/rhodaria/' ?>" hreflang="en" />
	<link rel="alternate" href="<?= $requestScheme . '://' . $serverName . '/de/rhodaria/' ?>" hreflang="de" />
	<link rel="canonical" href="<?= $requestScheme . '://' . $serverName . '/' . Security::secureInput($lang) . '/rhodaria/' ?>" />
	<link rel="alternate" href="<?= $requestScheme . '://' . $serverName . '/en/rhodaria/' ?>" hreflang="x-default" />
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
	<!-- Stylesheet -->
	<link rel="stylesheet" href="/assets/css/rhodaria.css" />
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
		<img src="/assets/img/rhodaria/forest_margin_repeat_1600x600.png" id="background">
		<img src="/assets/img/rhodaria/magic_berry1.png" id="berry1">
		<img src="/assets/img/rhodaria/snake_corgi.png" id="corgi">
		<img src="/assets/img/rhodaria/food.png" id="food">
		<img src="/assets/img/rhodaria/void_wolf.png" id="wolf">
		<img src="/assets/img/rhodaria/sticky_saberhound.png" id="hound">
		<img src="/assets/img/rhodaria/spectral_schnoodle.png" id="schnoodle">
		<img src="/assets/img/rhodaria/basilisk.png" id="basilisk">
		<img src="/assets/img/rhodaria/carni_creeper.png" id="carni">
		<img src="/assets/img/rhodaria/snake_zilla.png" id="zilla">
		<img src="/assets/img/rhodaria/spore_shark.png" id="shark">

		<audio src="/assets/audio/rhodaria/bad_food.mp3" id="bad_food" preload="auto"></audio>
		<audio src="/assets/audio/rhodaria/bite1.mp3" id="bite1" preload="auto"></audio>
		<audio src="/assets/audio/rhodaria/bite2.mp3" id="bite2" preload="auto"></audio>
		<audio src="/assets/audio/rhodaria/bite3.mp3" id="bite3" preload="auto"></audio>
		<audio src="/assets/audio/rhodaria/bite4.mp3" id="bite4" preload="auto"></audio>
		<audio src="/assets/audio/rhodaria/bite5.mp3" id="bite5" preload="auto"></audio>
		<audio src="/assets/audio/rhodaria/button.mp3" id="button" preload="auto"></audio>
		<audio src="/assets/audio/rhodaria/restart.mp3" id="restart" preload="auto"></audio>
		<audio src="/assets/audio/rhodaria/start.mp3" id="start" preload="auto"></audio>
		<audio src="/assets/audio/rhodaria/win.mp3" id="win" preload="auto"></audio>
	</div>

	<div class="score">
		<p id="score1"></p>
		<p id="time"></p>
	</div>

	<div id="gameover" class="gameover">
		<p id="message1" class="large"></p>
		<p id="message2" class="normal"></p>
		<p id="message3" class="normal"></p>
		<p id="message4" class="normal"></p>
		<p id="message5" class="normal"></p>
		<p id="message6" class="normal"></p>
		<p id="message7" class="normal"></p>
	</div>

	<div class="controls">
		<button id="fullScreenButton">💻</button>
		<button id="resetButton">⚔️</button>
		<button id="backButton">👈</button>
		<button id="volumeButton">🔊</button>
	</div>

	<canvas id="canvas2" class="hidden"></canvas>
	
	<!-- Scripts -->
	<script type="module" src="/assets/js/rhodaria/main.js"></script>
</body>

</html>