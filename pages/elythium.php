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
	<!-- Meta pour les langues -->
	<link rel="alternate" href="<?= $requestScheme . '://' . $serverName . '/fr/elythium/' ?>" hreflang="fr" />
	<link rel="alternate" href="<?= $requestScheme . '://' . $serverName . '/en/elythium/' ?>" hreflang="en" />
	<link rel="alternate" href="<?= $requestScheme . '://' . $serverName . '/de/elythium/' ?>" hreflang="de" />
	<link rel="canonical" href="<?= $requestScheme . '://' . $serverName . '/' . Security::secureInput($lang) . '/elythium/' ?>" />
	<link rel="alternate" href="<?= $requestScheme . '://' . $serverName . '/en/elythium/' ?>" hreflang="x-default" />
	<!-- Meta pour le SEO -->
	<meta name="author" content="LunarPlay System">
	<meta name="description" content="<?= Security::secureInput($translations['elythium_description']) ?>" />
	<meta property="og:title" content="<?= Security::secureInput($translations['elythium_title']) ?>">
	<meta property="og:description" content="<?= Security::secureInput($translations['elythium_description']) ?>">
	<meta property="og:image" content="/assets/logo/logo_big.svg">
	<meta name="keywords" content="<?= Security::secureInput($translations['elythium_keywords']) ?>" />
	<title><?= Security::secureInput($translations['elythium_title']) ?></title>
	<link rel="shortcut icon" href="/assets/logo/logo_small.svg" type="image/svg+xml">
	<!-- Stylesheet -->
	<link rel="stylesheet" href="/assets/css/elythium.css" />
</head>

<body>
	<canvas id="canvas1"></canvas>
	<div class="hidden">
		<img src="/assets/img/elythium/planet.png" id="planet">
		<img src="/assets/img/elythium/player.png" id="player">
		<img src="/assets/img/elythium/asteroid.png" id="asteroid">
		<img src="/assets/img/elythium/lobstermorph.png" id="lobstermorph">
		<img src="/assets/img/elythium/beetlemorph.png" id="beetlemorph">
		<img src="/assets/img/elythium/rhinomorph.png" id="rhinomorph">
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
	<script type="module" src="/assets/js/elythium.js"></script>
</body>

</html>