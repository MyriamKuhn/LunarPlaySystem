<?php

// Chargement de l'autoloader
require_once __DIR__.'/../Autoload.php';
Autoload::register();

use App\Repository\GeneralRepository;

$generalRepository = new GeneralRepository();
$collection = $generalRepository->addScore('aetheria', 'Mimi', 20);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $data = json_decode(file_get_contents('php://input'), true);

  if (!isset($data['planet'], $data['playername'], $data['score'])) {
      http_response_code(400);
      echo json_encode(['error' => 'Invalid input']);
      exit;
  }

  $planet = $data['planet'];
  $playerName = $data['playername'];
  $score = (int) $data['score'];

  $result = $gameService->addScore($planet, $playerName, $score);

  if ($result) {
      echo json_encode(['success' => true]);
  } else {
      http_response_code(500);
      echo json_encode(['error' => 'Could not add score']);
  }
}


if ($_SERVER['REQUEST_METHOD'] === 'GET') {
  $planet = $_GET['planet'] ?? null;
  $limit = (int) ($_GET['limit'] ?? 10);
  $offset = (int) ($_GET['offset'] ?? 0);

  if (!$planet) {
      http_response_code(400);
      echo json_encode(['error' => 'Planet is required']);
      exit;
  }

  $rankings = $gameService->getRankings($planet, $limit, $offset);

  echo json_encode($rankings);
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
  $planet = $_GET['planet'] ?? null;

  if (!$planet) {
      http_response_code(400);
      echo json_encode(['error' => 'Planet is required']);
      exit;
  }

  // Extraire les paramètres DataTables
  $queryParams = [
      'draw' => $_GET['draw'] ?? 1,
      'start' => $_GET['start'] ?? 0,
      'length' => $_GET['length'] ?? 10
  ];

  // Récupérer les données pour DataTables
  $rankings = $gameService->getRankingsForDataTables($planet, $queryParams);

  // Envoyer les données au format JSON
  echo json_encode($rankings);
}


// DATATABLES
//$(document).ready(function () {
//  $('#rankingsTable').DataTable({
//      processing: true,
//      serverSide: true,
//      ajax: {
//          url: '/api/rankings',
//          data: function (d) {
//              d.planet = 'Earth'; // Ajouter des paramètres personnalisés si nécessaire
//          }
//      },
//      columns: [
//          { data: 'place', title: 'Place' },
//          { data: 'playername', title: 'Player Name' },
//          { data: 'highscore', title: 'High Score' },
//          { data: 'gameplays', title: 'Gameplays' },
//          { data: 'lastPlayed', title: 'Last Played' }
//      ]
//  });
//});
//
