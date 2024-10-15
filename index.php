<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
ini_set('error_log', $_SERVER['DOCUMENT_ROOT'].'/error.log');

?>

<!DOCTYPE html>
<html lang="fr-FR">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="author" content="LunarPlay System">
  <meta name="description" content="Explorez un système solaire imaginaire à travers une série de mini jeux captivants. Défis galactiques, aventures stellaires et amusement interstellaire vous attendent dans cette arcade cosmique." />
  <meta property="og:title" content="LunarPlay System - Explorez des Mini Jeux dans un Système Solaire Imaginaire">
  <meta property="og:description" content="Explorez un système solaire imaginaire à travers une série de mini jeux captivants. Défis galactiques, aventures stellaires et amusement interstellaire vous attendent dans cette arcade cosmique.">
  <meta property="og:image" content="/assets/logo/logo.svg">
  <meta name="keywords" content="LunarPlay System, mini jeux, système solaire imaginaire, jeux en ligne, arcade spatiale, jeux galactiques, aventure stellaire, défis interstellaires, exploration de planètes" />
  <title>LunarPlay System - Explorez des Mini Jeux dans un Système Solaire Imaginaire</title>
  <link rel="shortcut icon" href="/assets/logo/logo_small.svg" type="image/svg+xml">
  <link rel="stylesheet" href="/assets/css/index.css" /> 
</head>

<body>
  <div class="background">

    <div class="container">

      <header class="header">
        <img src="/assets/logo/logo_small.svg" alt="Logo de LunarPlay System" width="100">
        <h1 class="main-title">LunarPlay System</h1>
        <img src="/assets/logo/logo_small.svg" alt="Logo de LunarPlay System" width="100">
      </header>
      
      <main class="main">
        <div class="description">
          <p>Explorez un système solaire imaginaire à travers une série de mini jeux captivants.</p>
          <p class="mb">Défis galactiques, aventures stellaires et amusement interstellaire vous attendent dans cette arcade cosmique.</p>
          <p>Cliquez sur le bouton ci-dessous pour commencer votre aventure.</p>
          <p class="mb">Pour accéder à un jeu, vous devrez cliquer sur la planète correspondante.</p>
          <p class="mb">La planète centrale du système LunarPlay : Solaris Prime contient le classement général.</p>
          <p>Bonne chance et que la force stellaire soit avec vous !</p>
        </div>
        <div>
          <a href="/pages/lunarplay.php" class="button" id="start-button">Démarrez l'aventure</a>
        </div>

        <div class="info">
          <h2 class="info-title">Instructions</h2>
          <div class="info-content">
            <p class="mb">Contrôles de la caméra</p>
            <p>Déplacement de la caméra :</p>
            <p class="mb">Pour ajuster votre perspective, cliquez et faites glisser la souris vers le haut, le bas, la gauche ou la droite.</p>
            <p>Zoomer/Dézoomer :</p>
            <p class="mb">Pour zoomer ou dézoomer, utilisez la molette de la souris.</p>
            <p>Gestes tactiles :</p>
            <p>Si vous utilisez un appareil à écran tactile, pincez pour zoomer et écartez les doigts pour dézoomer.</p>
          </div>
        </div>
      </main>

      <footer class="footer">
        <p>&copy; 2024 LunarPlay System - Tous droits réservés</p>
      </footer>

    </div>

  </div>

  <script type="module" src="/assets/js/index.js"></script>
</body>

</html>