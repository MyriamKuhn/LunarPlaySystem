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
  <!-- Meta pour les langues -->
  <link rel="alternate" href="<?= $requestScheme . '://' . $serverName . '/fr/solaris/' ?>" hreflang="fr" />
  <link rel="alternate" href="<?= $requestScheme . '://' . $serverName . '/en/solaris/' ?>" hreflang="en" />
  <link rel="alternate" href="<?= $requestScheme . '://' . $serverName . '/de/solaris/' ?>" hreflang="de" />
  <link rel="canonical" href="<?= $requestScheme . '://' . $serverName . '/' . Security::secureInput($lang) . '/solaris/' ?>" />
  <link rel="alternate" href="<?= $requestScheme . '://' . $serverName . '/en/solaris/' ?>" hreflang="x-default" />
  <!-- Meta pour le SEO -->
  <meta name="author" content="LunarPlay System">
  <meta name="description" content="<?= Security::secureInput($translations['solaris_description']) ?>" />
  <meta property="og:title" content="<?= Security::secureInput($translations['solaris_title']) ?>">
  <meta property="og:description" content="<?= Security::secureInput($translations['solaris_description']) ?>">
  <meta property="og:image" content="/assets/logo/logo_big.svg">
  <meta name="keywords" content="<?= Security::secureInput($translations['solaris_keywords']) ?>" />
  <title><?= Security::secureInput($translations['solaris_title']) ?></title>
  <link rel="shortcut icon" href="/assets/logo/logo_small.svg" type="image/svg+xml">
  <!-- Stylesheet -->
  <link href="https://cdn.datatables.net/v/dt/dt-2.1.8/r-3.0.3/sb-1.8.1/sp-2.3.3/datatables.min.css" rel="stylesheet">
  <link rel="stylesheet" href="/assets/css/solaris.css" />
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
        <h1 class="main-title"><?= Security::secureInput($translations['solaris_title']) ?></h1>
        <img src="/assets/logo/logo_small.svg" alt="Logo de LunarPlay System" width="100">
      </header>
      <!-- END : Header -->
      <!-- START : Main -->
      <main class="main">
        <section class="planet-section">
          <a class="link planet" href="#aetheria" data-planet="aetheria">Aetheria</a>
          <a class="link planet" href="#aqualis" data-planet="aqualis">Aqualis</a>
          <a class="link planet" href="#cryos" data-planet="cryos">Cryos</a>
          <a class="link planet" href="#elythium" data-planet="elythium">Elythium</a>
          <a class="link planet" href="#goliathor" data-planet="goliathor">Goliathor</a>
          <a class="link planet" href="#ignisfera" data-planet="ignisfera">Ignisfera</a>
          <a class="link planet" href="#lunara" data-planet="lunara">Lunara</a>
          <a class="link planet" href="#nereidia" data-planet="nereidia">Nereidia</a>
          <a class="link planet" href="#rhodaria" data-planet="rhodaria">Rhodaria</a>
          <a class="link planet" href="#ringuara" data-planet="ringuara">Ringuara</a>
          <a class="link planet" href="#lunar" data-planet="lunarplay">LunarPlay</a>
        </section>

        <section class="loading" id="loading">
          <div class="loader"></div>
          <p><?= Security::secureInput($translations['loading']) ?></p>
        </section>

        <section class="ranking">
          <h2 id="planet-title"></h2>
          <p id="planet-intro" class="intro"></p>
          <p id="no-datas" class="nodatas"><?= Security::secureInput($translations['solaris_nodatas']) ?></p>
        </section>

        <table class="ranking-table hidden" id="ranking-table">
          <thead>
            <tr>
              <th><?= Security::secureInput($translations['rank']) ?></th>
              <th><?= Security::secureInput($translations['playername']) ?></th>
              <th><?= Security::secureInput($translations['score']) ?></th>
            </tr>
          </thead>
          <tbody id="ranking-body"></tbody>
            <!-- Emplacement des données -->
          </tbody>
        </table>
        
        <div class="btn-div">
          <a href="/<?= Security::secureInput($lang) ?>/lunarplay/" class="button" id="start-button"><?= Security::secureInput($translations['return_lunar']) ?></a>
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
  <script src="https://cdn.datatables.net/v/dt/jq-3.7.0/dt-2.1.8/r-3.0.3/sb-1.8.1/sp-2.3.3/datatables.min.js"></script>
  <script type="module" src="/assets/js/solaris.js"></script>
</body>
</html>