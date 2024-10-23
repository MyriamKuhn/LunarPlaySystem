<?php

require_once __DIR__ . '/../lang/language.php';

use Tools\Security;

$requestScheme = Security::secureInput($_SERVER['REQUEST_SCHEME']);
$serverName = Security::secureInput($_SERVER['SERVER_NAME']);

?>

<script>
  const initialLanguage = '<?= Security::secureInput($_SESSION['lang'] ?? 'en') ?>';
  sessionStorage.setItem('lang', initialLanguage); // Stocke la langue dans sessionStorage
</script>

<!DOCTYPE html>
<html lang="<?= Security::secureInput($lang) ?>">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="author" content="LunarPlay System">
  <!-- Meta pour les langues -->
  <link rel="alternate" href="<?= $requestScheme . '://' . $serverName . '/fr/lunarplay/' ?>" hreflang="fr" />
  <link rel="alternate" href="<?= $requestScheme . '://' . $serverName . '/en/lunarplay/' ?>" hreflang="en" />
  <link rel="alternate" href="<?= $requestScheme . '://' . $serverName . '/de/lunarplay/' ?>" hreflang="de" />
  <link rel="canonical" href="<?= $requestScheme . '://' . $serverName . '/' . Security::secureInput($lang) . '/lunarplay/' ?>" />
  <link rel="alternate" href="<?= $requestScheme . '://' . $serverName . '/en/lunarplay/' ?>" hreflang="x-default" />
  <!-- Meta pour le SEO -->
  <meta name="description" content="<?= Security::secureInput($translations['index_description']) ?>" />
  <meta property="og:title" content="<?= Security::secureInput($translations['index_title']) ?>">
  <meta property="og:description" content="<?= Security::secureInput($translations['index_description']) ?>">
  <meta property="og:image" content="/assets/logo/logo_big.svg">
  <meta name="keywords" content="<?= Security::secureInput($translations['index_keywords']) ?>" />
  <title><?= Security::secureInput($translations['index_title']) ?></title>
  <link rel="shortcut icon" href="/assets/logo/logo_small.svg" type="image/svg+xml">
  <!-- Stylesheet -->
  <link rel="stylesheet" href="/assets/css/lunarplay.css" /> 
</head>
<body>

  <div class="container-progress-bar">
    <label for="progress-bar"><?= Security::secureInput($translations['loading']) ?></label>
    <progress id="progress-bar" value="0" max="100"></progress>
    <p id="progress-bar-value"></p>
  </div>

  <div id="planet-info" class="planet-info hidden">
    <h2 id="planet-name" class="title"></h2>
    <p id="planet-story" class="description"></p>
    <a href="" id="play-game-button" class="button"><?= Security::secureInput($translations['play']) ?></a>
  </div>

  <div id="planet-name-hover" class="planet-hover"></div>

  <footer class="footer">
    <p><?= $translations['footer'] ?> - <a href="/<?= Security::secureInput($lang) ?>/legal/" class="link"><?= Security::secureInput($translations['legal']) ?></a></p>
  </footer>

  <script type="module" src="/assets/js/lunarplay.js"></script>
</body>
</html>