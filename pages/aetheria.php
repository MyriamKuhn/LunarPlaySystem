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
	<!-- Stylesheet -->
	<link rel="stylesheet" href="/assets/css/aetheria.css" />
</head>

<body>
	<canvas id="canvas1"></canvas>
	<div class="hidden">
		<img src="/assets/img/aetheria/planet.png" id="planet">
		<img src="/assets/img/aetheria/player.png" id="player">
	</div>




	<div class="btn-div">
		<a href="/<?= Security::secureInput($lang) ?>/lunarplay/" class="button" id="start-button"><?= Security::secureInput($translations['return_lunar']) ?></a>
	</div>


	<!-- START : Footer -->
	<footer class="footer">
		<p><?= Security::secureInput($translations['footer']) ?> - <a href="/<?= Security::secureInput($lang) ?>/legal/" class="link"><?= Security::secureInput($translations['legal']) ?></a></p>
	</footer>
	<!-- END : Footer -->

	<!-- Scripts -->
	<script type="module" src="/assets/js/aetheria.js"></script>
</body>

</html>