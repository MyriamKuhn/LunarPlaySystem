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
	<link rel="alternate" href="<?= $requestScheme . '://' . $serverName . '/fr/lunara/' ?>" hreflang="fr" />
	<link rel="alternate" href="<?= $requestScheme . '://' . $serverName . '/en/lunara/' ?>" hreflang="en" />
	<link rel="alternate" href="<?= $requestScheme . '://' . $serverName . '/de/lunara/' ?>" hreflang="de" />
	<link rel="canonical" href="<?= $requestScheme . '://' . $serverName . '/' . Security::secureInput($lang) . '/lunara/' ?>" />
	<link rel="alternate" href="<?= $requestScheme . '://' . $serverName . '/en/lunara/' ?>" hreflang="x-default" />
	<!-- Meta pour le SEO -->
	<meta name="author" content="LunarPlay System">
	<meta name="description" content="<?= Security::secureInput($translations['lunara_description']) ?>" />
	<meta property="og:title" content="<?= Security::secureInput($translations['lunara_title']) ?>">
	<meta property="og:description" content="<?= Security::secureInput($translations['lunara_description']) ?>">
	<meta property="og:image" content="/assets/logo/logo_big.svg">
	<meta name="keywords" content="<?= Security::secureInput($translations['lunara_keywords']) ?>" />
	<title><?= Security::secureInput($translations['lunara_title']) ?></title>
	<link rel="shortcut icon" href="/assets/logo/logo_small.svg" type="image/svg+xml">
	<!-- Google Fonts -->
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
	<link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400..900&display=swap" rel="stylesheet">
	<link href="https://fonts.googleapis.com/css2?family=Exo+2:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
	<link href="https://fonts.googleapis.com/css2?family=Rubik+Moonrocks&display=swap" rel="stylesheet">
	<!-- Stylesheet -->
	<link rel="stylesheet" href="/assets/css/lunara.css" />
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
	<img src="/assets/img/cryos/background_single.png" id="background">
	<img src="/assets/img/lunara/enemy1.png" id="enemy1">
	<img src="/assets/img/lunara/enemy2.png" id="enemy2">
	<img src="/assets/img/lunara/enemy3.png" id="enemy3">
	<img src="/assets/img/lunara/enemy4.png" id="enemy4">
	<img src="/assets/img/lunara/enemy5.png" id="enemy5">
	<img src="/assets/img/lunara/enemy6.png" id="enemy6">
	<img src="/assets/img/lunara/enemy7.png" id="enemy7">
	<img src="/assets/img/lunara/enemy8.png" id="enemy8">
	<img src="/assets/img/lunara/enemy9.png" id="enemy9">
	<img src="/assets/img/lunara/defender0.png" id="defender0">
	<img src="/assets/img/lunara/defender1.png" id="defender1">
	<img src="/assets/img/lunara/defender2.png" id="defender2">
	<img src="/assets/img/lunara/defender3.png" id="defender3">
	<img src="/assets/img/lunara/defender4.png" id="defender4">
	<img src="/assets/img/lunara/defender5.png" id="defender5">
	<img src="/assets/img/lunara/defender6.png" id="defender6">
	<img src="/assets/img/lunara/defender7.png" id="defender7">
	<img src="/assets/img/lunara/larva1.png" id="larva1">
	<img src="/assets/img/lunara/larva2.png" id="larva2">
	<img src="/assets/img/lunara/larva3.png" id="larva3">
	<img src="/assets/img/lunara/projectile1.png" id="projectile1">
	<img src="/assets/img/lunara/projectile2.png" id="projectile2">
	<img src="/assets/img/lunara/projectile4.png" id="projectile4">
	<img src="/assets/img/lunara/projectile5.png" id="projectile5">
	<img src="/assets/img/lunara/projectile6.png" id="projectile6">
	<img src="/assets/img/lunara/projectile7.png" id="projectile7">

	<audio src="/assets/audio/lunara/change.mp3" id="change" preload="auto"></audio>
	<audio src="/assets/audio/lunara/lose.mp3" id="lose" preload="auto"></audio>
	<audio src="/assets/audio/lunara/place.wav" id="place" preload="auto"></audio>
	<audio src="/assets/audio/lunara/projectile.wav" id="projectile" preload="auto"></audio>
	<audio src="/assets/audio/lunara/wave.mp3" id="wave" preload="auto"></audio>
	<audio src="/assets/audio/lunara/win.mp3" id="win" preload="auto"></audio>
	<audio src="/assets/audio/lunara/resource.mp3" id="resource" preload="auto"></audio>
	<audio src="/assets/audio/lunara/dead.mp3" id="dead" preload="auto"></audio>
	<audio src="/assets/audio/lunara/defender.mp3" id="defender" preload="auto"></audio>
</div>

<div class="controls">
  <button id="resetButton">⚔️</button>
  <button id="backButton">👈</button>
	<button id="volumeButton">🔊</button>
</div>

<div id="orientation-overlay">
  <p><?= Security::secureInput($translations['cryos_mode']) ?></p>
</div>

<!-- Scripts -->
<script type="module" src="/assets/js/lunara/main.js"></script>
</body>

</html>