<?php

require_once __DIR__ . '/../lang/language.php';

use Tools\Security;

$requestScheme = Security::secureInput($_SERVER['REQUEST_SCHEME']);
$serverName = Security::secureInput($_SERVER['SERVER_NAME']);

if (isset($_SESSION['playername'])) {
  header('Location: /' . $lang . '/lunarplay/');
  exit();
}

?>


<!DOCTYPE html>
<html lang="<?= Security::secureInput($lang) ?>">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="author" content="LunarPlay System">
  <!-- Meta pour les langues -->
  <link rel="alternate" href="<?= $requestScheme . '://' . $serverName . '/fr/player/' ?>" hreflang="fr" />
  <link rel="alternate" href="<?= $requestScheme . '://' . $serverName . '/en/player/' ?>" hreflang="en" />
  <link rel="alternate" href="<?= $requestScheme . '://' . $serverName . '/de/player/' ?>" hreflang="de" />
  <link rel="canonical" href="<?= $requestScheme . '://' . $serverName . '/' . Security::secureInput($lang) . '/player/' ?>" />
  <link rel="alternate" href="<?= $requestScheme . '://' . $serverName . '/en/player/' ?>" hreflang="x-default" />
  <!-- Meta pour le SEO -->
  <meta name="description" content="<?= Security::secureInput($translations['player_description']) ?>" />
  <meta property="og:title" content="<?= Security::secureInput($translations['player_title']) ?>">
  <meta property="og:description" content="<?= Security::secureInput($translations['player_description']) ?>">
  <meta property="og:image" content="/assets/logo/logo_big.svg">
  <meta name="keywords" content="<?= Security::secureInput($translations['player_keywords']) ?>" />
  <title><?= Security::secureInput($translations['player_title']) ?></title>
  <link rel="shortcut icon" href="/assets/logo/logo_small.svg" type="image/svg+xml">
  <!-- Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400..900&display=swap" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css2?family=Exo+2:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
  <!-- Stylesheet -->
  <link rel="stylesheet" href="/assets/css/player.css" />
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
        <h1 class="main-title"><?= Security::secureInput($translations['player']) ?></h1>
        <img src="/assets/logo/logo_small.svg" alt="Logo de LunarPlay System" width="100">
      </header>
      <!-- END : Header -->
      <!-- START : Main -->
      <main class="main">
        <section>
          <h2><?= Security::secureInput($translations['player_name_title']) ?></h2>
          <div class="error-message" id="error-message">
            <p><?= Security::secureInput($translations['player_error']) ?></p>
          </div>
          <form id="playername-form" class="div-input" action="/<?= $lang ?>/lunarplay/" method="POST">
            <input type="hidden" id="playernameHidden" name="playername" value="">
            <input type="hidden" id="csrf_token" name="csrf_token" value="<?= $_SESSION['csrf_token'] ?>">
            <input id="playername" type="text" placeholder="<?= Security::secureInput($translations['player_placeholder']) ?>" minlength="3" maxlength="20" required>
            <button id="playername-button" class="button" type="submit"><?= Security::secureInput($translations['player_button']) ?></button>
          </form>
        </section>
        <section>
          <h2><?= Security::secureInput($translations['player_name_question']) ?></h2>
          <p><?= Security::secureInput($translations['player_name_description1']) ?></p>
          <p><?= Security::secureInput($translations['player_name_description2']) ?></p>
          <p><?= Security::secureInput($translations['player_name_description3']) ?></p>
          <p><?= Security::secureInput($translations['player_name_description4']) ?></p>
          <p><?= Security::secureInput($translations['player_name_description5']) ?></p>
          <p><?= Security::secureInput($translations['player_name_description6']) ?></p>
          <p><?= Security::secureInput($translations['player_name_description7']) ?></p>
          <p><?= Security::secureInput($translations['player_name_description8']) ?></p>
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
  <script type="module" src="/assets/js/player.js"></script>
</body>
</html>