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
  <link rel="stylesheet" href="/assets/css/lunarplay.css" /> 
</head>
<body>

  <div class="container-progress-bar">
    <label for="progress-bar">Chargement...</label>
    <progress id="progress-bar" value="0" max="100"></progress>
    <p id="progress-bar-value"></p>
  </div>

  <div id="planet-info" class="planet-info hidden">
    <h2 id="planet-name" class="title"></h2>
    <p id="planet-story" class="description"></p>
    <a href="" id="play-game-button" class="button">Jouer</a>
  </div>

  <div id="planet-name-hover" class="planet-hover"></div>

  <footer class="footer">
    <p>&copy; 2024 LunarPlay System - Tous droits réservés</p>
  </footer>

  <script type="module" src="/assets/js/lunarplay.js"></script>
</body>
</html>