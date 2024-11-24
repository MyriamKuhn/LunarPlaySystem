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
	<meta name="author" content="LunarPlay System">
	<!-- Meta pour les langues -->
	<link rel="alternate" href="<?= $requestScheme . '://' . $serverName . '/fr/aqualis/' ?>" hreflang="fr" />
	<link rel="alternate" href="<?= $requestScheme . '://' . $serverName . '/en/aqualis/' ?>" hreflang="en" />
	<link rel="alternate" href="<?= $requestScheme . '://' . $serverName . '/de/aqualis/' ?>" hreflang="de" />
	<link rel="canonical" href="<?= $requestScheme . '://' . $serverName . '/' . Security::secureInput($lang) . '/aqualis/' ?>" />
	<link rel="alternate" href="<?= $requestScheme . '://' . $serverName . '/en/aqualis/' ?>" hreflang="x-default" />
	<!-- Meta pour le SEO -->
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
	<link rel="stylesheet" href="/assets/css/construction.css" />
</head>

<body>
	<!-- Background -->
	<div class="background"></div>
	<!-- START : Wrapper -->
	<div class="wrapper">
		<!-- START : Container -->
		<div class="container">
			<!-- START : Header -->
			<header class="header">
				<img src="/assets/logo/logo_small.svg" alt="Logo de LunarPlay System" width="100">
				<h1 class="main-title"><?= Security::secureInput($translations['under_construction']) ?></h1>
				<img src="/assets/logo/logo_small.svg" alt="Logo de LunarPlay System" width="100">
			</header>
			<!-- END : Header -->
			<!-- START : Main -->
			<main class="main">
				<section class="section">
					<p><?= Security::secureInput($translations['under_construction_description']) ?></p>
					<div class="btn-div">
						<a href="/<?= Security::secureInput($lang) ?>/lunarplay/" class="button" id="start-button"><?= Security::secureInput($translations['return_lunar']) ?></a>
					</div>
				</section>
			</main>
			<!-- END : Main -->
		</div>
		<!-- END : Container -->
		<!-- START : Footer -->
		<footer class="footer">
      <p><?= html_entity_decode(Security::secureInput($translations['footer'])) ?> - <a href="/<?= Security::secureInput($lang) ?>/legal/" class="link"><?= Security::secureInput($translations['legal']) ?></a></p>
    </footer>
		<!-- END : Footer -->
	</div>
	<!-- END : Wrapper -->

	<!-- Scripts -->
	<script type="module" src="/assets/js/construction.js"></script>
</body>

</html>