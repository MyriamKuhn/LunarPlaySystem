<?php

namespace App\Repository;

require_once __DIR__ . '/../../vendor/autoload.php';

use Dotenv\Dotenv;
use App\Db\MongoDb;
use MongoDB\Client;
use Tools\Security;

class GeneralRepository
{

  protected Client $client;
  protected $collection;
  protected $database;

  public function __construct()
  {
    $dotenv = Dotenv::createImmutable(__DIR__ . '/../../');
    $dotenv->load();

    $mongo = MongoDb::getInstance();
    $this->client = $mongo->getClient();
    $this->database = $this->client->selectDatabase($_ENV['MONGODB_DATABASE']);
  }

  // Fonction pour obtenir les classements des planètes
  public function getRanking(string $planet): array
  {
    // Sélectionner le nom de la collection en fonction de la planète
    $collectionName = 'MONGODB_COLLECTION_' . Security::secureInput(strtoupper($planet));
    $collection = $this->database->selectCollection($_ENV[$collectionName]);
    
    // Récupérer les données de la collection
    $cursor = $collection->find();
    $rankings = iterator_to_array($cursor);


    // Préparer les résultats pour la réponse
    $results = [];
    foreach ($rankings as $ranking) {
        $results[] = [
            'place' => $ranking->place,
            'player_name' => $ranking->player_name,
            'score' => $ranking->score,
        ];
    }

    return $results; // Retourner les classements sous forme de tableau
  }

}