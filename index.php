<?php

require_once __DIR__ . '/lang/init.php';

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
  <meta name="csrf-token" content="<?= $_SESSION['csrf_token']; ?>">
  <meta name="language" content="<?= Security::secureInput($_SESSION['lang'] ?? 'en') ?>">
  <!-- Meta pour les langues -->
  <link rel="alternate" href="<?= $requestScheme . '://' . $serverName . '/fr/' ?>" hreflang="fr" />
  <link rel="alternate" href="<?= $requestScheme . '://' . $serverName . '/en/' ?>" hreflang="en" />
  <link rel="alternate" href="<?= $requestScheme . '://' . $serverName . '/de/' ?>" hreflang="de" />
  <link rel="canonical" href="<?= $requestScheme . '://' . $serverName . '/' . Security::secureInput($lang) . '/' ?>" />
  <link rel="alternate" href="<?= $requestScheme . '://' . $serverName . '/en/' ?>" hreflang="x-default" />
  <!-- Meta pour le SEO -->
  <meta name="description" content="<?= Security::secureInput($translations['index_description']) ?>" />
  <meta property="og:title" content="<?= Security::secureInput($translations['index_title']) ?>">
  <meta property="og:description" content="<?= Security::secureInput($translations['index_description']) ?>">
  <meta property="og:image" content="/assets/logo/logo_big.svg">
  <meta name="keywords" content="<?= Security::secureInput($translations['index_keywords']) ?>" />
  <title><?= Security::secureInput($translations['index_title']) ?></title>
  <link rel="shortcut icon" href="/assets/logo/logo_small.svg" type="image/svg+xml">
  <!-- Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400..900&display=swap" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css2?family=Exo+2:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
  <!-- Stylesheet -->
  <link rel="stylesheet" href="/assets/css/index.css" />
  <link rel="stylesheet" href="/assets/css/flags.css" />
</head>

<body>
  <!-- Background -->
  <div class="background"></div>
  <!-- START : Wrapper -->
  <div class="wrapper">
    <!-- Language dropdown -->
    <div class="dropdown">
      <button class="dropbtn" id="language-button">
        <span class="" id="current-flag"></span>
      </button>        
      <div class="dropdown-content">
        <a href="#" data-lang="fr">
          <span class="flag flag-fr"></span> Français
        </a>
        <a href="#" data-lang="en">
          <span class="flag flag-us"></span> English
        </a>
        <a href="#" data-lang="de">
          <span class="flag flag-de"></span> Deutsch
        </a>
      </div>
    </div>
    <!-- START : Container -->
    <div class="container">
      <!-- START : Header -->
      <header class="header">
        <img src="/assets/logo/logo_small.svg" alt="Logo de LunarPlay System" width="100">
        <h1 class="main-title"><?= Security::secureInput($translations['main_title']) ?></h1>
        <img src="/assets/logo/logo_small.svg" alt="Logo de LunarPlay System" width="100">
      </header>
      <!-- END : Header -->
      <!-- START : Main -->
      <main class="main">
        <div class="description">
          <p><?= Security::secureInput($translations['main_description_1']) ?></p>
          <p class="mb"><?= Security::secureInput($translations['main_description_2']) ?></p>
          <p><?= Security::secureInput($translations['main_description_3']) ?></p>
          <p class="mb"><?= Security::secureInput($translations['main_description_4']) ?></p>
          <p class="mb"><?= Security::secureInput($translations['main_description_5']) ?></p>
          <p><?= Security::secureInput($translations['main_description_6']) ?></p>
        </div>
        <div>
          <a href="/<?= (empty($_SESSION['playername'])) ? Security::secureInput($lang) . '/player/' : Security::secureInput($lang) . '/lunarplay/' ?>" class="button" id="start-button"><?= Security::secureInput($translations['start_button']) ?></a>
        </div>
        <div class="info">
          <h2 class="info-title"><?= Security::secureInput($translations['info_title']) ?></h2>
          <div class="info-content">
            <p class="mb info-subtitle"><?= Security::secureInput($translations['info_subtitle_1']) ?></p>
            <p class="info-subtitle"><?= Security::secureInput($translations['info_subtitle_2']) ?></p>
            <p class="mb"><?= Security::secureInput($translations['info_content_1']) ?></p>
            <p class="info-subtitle"><?= Security::secureInput($translations['info_subtitle_3']) ?></p>
            <p class="mb"><?= Security::secureInput($translations['info_content_2']) ?></p>
            <p class="info-subtitle"><?= Security::secureInput($translations['info_subtitle_4']) ?></p>
            <p><?= Security::secureInput($translations['info_content_3']) ?></p>
          </div>
        </div>
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
  <script type="module" src="/assets/js/index.js"></script>
</body>
</html>