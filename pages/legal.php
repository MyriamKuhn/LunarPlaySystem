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
  <link rel="alternate" href="<?= $requestScheme . '://' . $serverName . '/fr/legal/' ?>" hreflang="fr" />
  <link rel="alternate" href="<?= $requestScheme . '://' . $serverName . '/en/legal/' ?>" hreflang="en" />
  <link rel="alternate" href="<?= $requestScheme . '://' . $serverName . '/de/legal/' ?>" hreflang="de" />
  <link rel="canonical" href="<?= $requestScheme . '://' . $serverName . '/' . Security::secureInput($lang) . '/legal/' ?>" />
  <link rel="alternate" href="<?= $requestScheme . '://' . $serverName . '/en/legal/' ?>" hreflang="x-default" />
  <!-- Meta pour le SEO -->
  <meta name="description" content="<?= Security::secureInput($translations['legal_description']) ?>" />
  <meta property="og:title" content="<?= Security::secureInput($translations['legal_title']) ?>">
  <meta property="og:description" content="<?= Security::secureInput($translations['legal_description']) ?>">
  <meta property="og:image" content="/assets/logo/logo_big.svg">
  <meta name="keywords" content="<?= Security::secureInput($translations['legal_keywords']) ?>" />
  <title><?= Security::secureInput($translations['legal_title']) ?></title>
  <link rel="shortcut icon" href="/assets/logo/logo_small.svg" type="image/svg+xml">
  <!-- Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400..900&display=swap" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css2?family=Exo+2:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
  <!-- Stylesheet -->
  <link rel="stylesheet" href="/assets/css/legal.css" />
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
        <h1 class="main-title"><?= Security::secureInput($translations['legal']) ?></h1>
        <img src="/assets/logo/logo_small.svg" alt="Logo de LunarPlay System" width="100">
      </header>
      <!-- END : Header -->
      <!-- START : Main -->
      <main class="main">
        <section class="section">
          <h2><?= Security::secureInput($translations['legal_editor_title']) ?></h2>
          <ul>
            <li><?= Security::secureInput($translations['legal_editor_name']) ?></li>
            <li><?= Security::secureInput($translations['legal_editor_status']) ?></li>
            <li><?= Security::secureInput($translations['legal_editor_address']) ?></li>
            <li><?= Security::secureInput($translations['legal_editor_registration']) ?></li>
            <li><?= Security::secureInput($translations['contact_mail']) ?> <a class="link" href="mailto:myriam.kuehn@free.fr">myriam.kuehn@free.fr</a></li>
            <li><?= Security::secureInput($translations['tel']) ?> <a class="link" href="tel:+33682499706">+33 6 82 49 97 06</a></li>
          </ul>
        </section>
        <section class="section">
          <h2><?= Security::secureInput($translations['legal_hosting_title']) ?></h2>
          <ul>
            <li><?= Security::secureInput($translations['legal_hosting_name']) ?></li>
            <li><?= Security::secureInput($translations['legal_hosting_address']) ?></li>
            <li><?= Security::secureInput($translations['legal_hosting_website']) ?> <a class="link" href="https://www.ionos.fr/">https://www.ionos.fr/</a></li>
            <li><?= Security::secureInput($translations['tel']) ?> <a class="link" href="tel:+33970808911">+33 9 70 80 89 11</a></li>
          </ul>
        </section>
        <section class="section">
          <h2><?= Security::secureInput($translations['legal_publication_title']) ?></h2>
          <ul>
            <li><?= Security::secureInput($translations['legal_publication_name']) ?></li>
            <li><?= Security::secureInput($translations['contact_mail']) ?> <a class="link" href="mailto:myriam.kuehn@free.fr">myriam.kuehn@free.fr</a></li>
          </ul>
        </section>
        <section class="section">
          <h2><?= Security::secureInput($translations['legal_intellectual_property']) ?></h2>
          <p><?= Security::secureInput($translations['legal_intellectual_property_content1']) ?></p>
          <p><?= Security::secureInput($translations['legal_intellectual_property_content2']) ?></p>
        </section>
        <section class="section">
          <h2><?= Security::secureInput($translations['legal_limitation_title']) ?></h2>
          <p><?= Security::secureInput($translations['legal_limitation_content']) ?></p>
        </section>
        <section class="section">
          <h2><?= Security::secureInput($translations['legal_privacy_title']) ?></h2>
          <p><?= Security::secureInput($translations['legal_privacy_content_1']) ?></p>
          <p><?= Security::secureInput($translations['legal_privacy_content_2']) ?></p>
        </section>
        <section class="section">
          <h2><?= Security::secureInput($translations['legal_cookies_title']) ?></h2>
          <p><?= Security::secureInput($translations['legal_cookies_content']) ?></p>
        </section>
        <section class="section">
          <h2><?= Security::secureInput($translations['legal_conditions_title']) ?></h2>
          <p><?= Security::secureInput($translations['legal_conditions_content']) ?></p>
          <ul>
            <li><?= Security::secureInput($translations['legal_conditions_content_1']) ?></li>
            <li><?= Security::secureInput($translations['legal_conditions_content_2']) ?></li>
          </ul>
        </section>
        <section class="section">
          <h2><?= Security::secureInput($translations['legal_law_title']) ?></h2>
          <p><?= Security::secureInput($translations['legal_law_content']) ?></p>
        </section>
        <div class="btn-div">
          <a href="/<?= Security::secureInput($lang) ?>" class="button" id="start-button"><?= Security::secureInput($translations['return_index']) ?></a>
        </div>
      </main>
      <!-- END : Main -->
    </div>
    <!-- END : Container -->
    <!-- START : Footer -->
      <footer class="footer">
        <p><?= html_entity_decode(Security::secureInput($translations['footer'])) ?> - <span class="active"><?= Security::secureInput($translations['legal']) ?></span></p>
      </footer>
    <!-- END : Footer -->
  </div>
  <!-- END : Wrapper -->

  <!-- Scripts -->
  <script type="module" src="/assets/js/legal.js"></script>
</body>
</html>