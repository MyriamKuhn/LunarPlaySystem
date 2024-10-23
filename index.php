<?php
require_once __DIR__ . '/lang/language.php';
?>

<script>
  const initialLanguage = '<?= $_SESSION['lang'] ?? 'en'; ?>';
  sessionStorage.setItem('lang', initialLanguage); // Stocke la langue dans sessionStorage
</script>

<!DOCTYPE html>
<html lang="<?= $lang ?>">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="author" content="LunarPlay System">
  <!-- Meta pour les langues -->
  <link rel="alternate" href="<?= $_SERVER['REQUEST_SCHEME'] . '://' . $_SERVER['SERVER_NAME'] . '/fr/' ?>" hreflang="fr" />
  <link rel="alternate" href="<?= $_SERVER['REQUEST_SCHEME'] . '://' . $_SERVER['SERVER_NAME'] . '/en/' ?>" hreflang="en" />
  <link rel="alternate" href="<?= $_SERVER['REQUEST_SCHEME'] . '://' . $_SERVER['SERVER_NAME'] . '/de/' ?>" hreflang="de" />
  <link rel="canonical" href="<?= $_SERVER['REQUEST_SCHEME'] . '://' . $_SERVER['SERVER_NAME'] ?>" />
  <link rel="alternate" href="<?= $_SERVER['REQUEST_SCHEME'] . '://' . $_SERVER['SERVER_NAME'] . '/en/' ?>" hreflang="x-default" />
  <!-- Meta pour le SEO -->
  <meta name="description" content="<?= $translations['index_description'] ?>" />
  <meta property="og:title" content="<?= $translations['index_title'] ?>">
  <meta property="og:description" content="<?= $translations['index_description'] ?>">
  <meta property="og:image" content="/assets/logo/logo_big.svg">
  <meta name="keywords" content="<?= $translations['index_keywords'] ?>" />
  <title><?= $translations['index_title'] ?></title>
  <link rel="shortcut icon" href="/assets/logo/logo_small.svg" type="image/svg+xml">
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
        <h1 class="main-title"><?= $translations['main_title'] ?></h1>
        <img src="/assets/logo/logo_small.svg" alt="Logo de LunarPlay System" width="100">
      </header>
      <!-- END : Header -->
      <!-- START : Main -->
      <main class="main">
        <div class="description">
          <p><?= $translations['main_description_1'] ?></p>
          <p class="mb"><?= $translations['main_description_2'] ?></p>
          <p><?= $translations['main_description_3'] ?></p>
          <p class="mb"><?= $translations['main_description_4'] ?></p>
          <p class="mb"><?= $translations['main_description_5'] ?></p>
          <p><?= $translations['main_description_6'] ?></p>
        </div>
        <div>
          <a href="/pages/lunarplay.php" class="button" id="start-button"><?= $translations['start_button'] ?></a>
        </div>
        <div class="info">
          <h2 class="info-title"><?= $translations['info_title'] ?></h2>
          <div class="info-content">
            <p class="mb info-subtitle"><?= $translations['info_subtitle_1'] ?></p>
            <p class="info-subtitle"><?= $translations['info_subtitle_2'] ?></p>
            <p class="mb"><?= $translations['info_content_1'] ?></p>
            <p class="info-subtitle"><?= $translations['info_subtitle_3'] ?></p>
            <p class="mb"><?= $translations['info_content_2'] ?></p>
            <p class="info-subtitle"><?= $translations['info_subtitle_4'] ?></p>
            <p><?= $translations['info_content_3'] ?></p>
          </div>
        </div>
      </main>
      <!-- END : Main -->
    </div>
    <!-- END : Container -->
    <!-- START : Footer -->
      <footer class="footer">
        <p><?= $translations['footer'] ?> - <a href="#" class="link"><?= $translations['footer_legal'] ?></a></p>
      </footer>
    <!-- END : Footer -->
  </div>
  <!-- END : Wrapper -->

  <!-- Scripts -->
  <script type="module" src="/assets/js/index.js"></script>
</body>
</html>