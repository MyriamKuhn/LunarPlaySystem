<?php

namespace App\Repository;

require_once __DIR__ . '/../../vendor/autoload.php';

use Dotenv\Dotenv;
use App\Db\MongoDb;
use MongoDB\Client;
use Tools\Security;
use MongoDB\BSON\UTCDateTime;

class GeneralRepository
{

	protected Client $client;
	protected $collection;
	protected $database;
  protected array $validPlanets = ['aetheria', 'aqualis', 'cryos', 'elythium', 'goliathor', 'ignisfera', 'lunara', 'nereidia', 'rhodaria', 'ringuara', 'lunarplay'];

	/**
	 * Constructor of the GeneralRepository class
	 */
	public function __construct()
	{
    try {
      $dotenv = Dotenv::createImmutable(__DIR__ . '/../../');
      $dotenv->load();

      $mongo = MongoDb::getInstance();
      $this->client = $mongo->getClient();
      $this->database = $this->client->selectDatabase($_ENV['MONGODB_DATABASE']);

      // Initialiser les index pour chaque collection de scores
      foreach ($this->validPlanets as $planet) {
        $this->initializeIndexes($planet);
      }
    } catch (\Exception $e) {
      error_log($e->getMessage());
      // Relancer l'exception pour l'attraper dans le script appelant
      throw $e;
    }
	}

  /**
   * Initialize the indexes for a specific planet
   *
   * @param string $planet
   * 
   * @return void
   */
  private function initializeIndexes(string $planet): void
  {
    // Sécurisation du nom de la planète
    $planet = Security::secureInput(strtolower($planet));
    
    // Nom de la collection spécifique à la planète
    $scoresCollectionName = 'MONGODB_COLLECTION_' . strtoupper($planet);
    $scoresCollection = $this->database->selectCollection($_ENV[$scoresCollectionName]);

    // Vérifier si les index existent déjà
    $existingIndexes = $scoresCollection->listIndexes();
    $indexNames = array_map(function($index) {
      return $index->getName();
    }, iterator_to_array($existingIndexes));

    // Créer les indices si non existants
    if (!in_array('playername_1', $indexNames)) {
      $scoresCollection->createIndex(['playername' => 1]);
    }

    if (!in_array('score_-1', $indexNames)) {
      $scoresCollection->createIndex(['score' => -1]);
    }

    if (!in_array('playedAt_1', $indexNames)) {
      $scoresCollection->createIndex(
        ['playedAt' => 1],
        ['expireAfterSeconds' => 15552000]  
      );
    }
  }

  /**
   * Add a score to the database for a player on a planet
   *
   * @param string $planet
   * @param string $playerName
   * @param integer $score
   * @param float $timeSpent
   * @param integer $obstaclesCrossed
   * 
   * @return boolean
   */
  public function addScore(string $planet, string $playerName, int $score, float|null $timeSpent = 0, int|null $obstaclesCrossed = 0): bool
  {
    // Sécurisation des données de base
    $planet = Security::secureInput($planet);
    $playerName = Security::secureInput($playerName);
    $score = intval($score);
    $timeSpent = floatval($timeSpent);
    $obstaclesCrossed = intval($obstaclesCrossed);

    // Vérification des données de base
    if (empty($playerName)) {
      throw new \Exception("Player name cannot be empty.");
    }
    if ($score <= 0) {
      throw new \Exception("Score must be greater than zero.");
    }
    if (strtolower($planet) === 'cryos') {
      if ($timeSpent <= 0 || $obstaclesCrossed <= 0) {
        throw new \Exception("Invalid data for 'Cryos' planet: timeSpent and obstaclesCrossed must be greater than zero.");
      }
    }
    if (!in_array(strtolower($planet), $this->validPlanets)) {
      throw new \Exception("Invalid planet specified.");
    }

    // Collections
    $scoresCollectionName = 'MONGODB_COLLECTION_' . strtoupper($planet);

    // Vérification que la collection de la planète existe
    if (!in_array($_ENV[$scoresCollectionName], iterator_to_array($this->database->listCollectionNames()))) {
      throw new \Exception("Collection for the planet '{$planet}' not found.");
    }
    
    $scoresCollection = $this->database->selectCollection($_ENV[$scoresCollectionName]);
    $globalRankingCollection = $this->database->selectCollection($_ENV['MONGODB_COLLECTION_LUNARPLAY']);


    try {
      // Enregistrement dans la collection du jeu
      $datas = [
        'playername' => $playerName,
        'score' => $score,
        'playedAt' => new UTCDateTime()
      ];
      // Si c'est la planète Cryos, ajouter les données spécifiques
      if (strtolower($planet) === 'cryos') {
        $datas['timeSpent'] = $timeSpent;
        $datas['obstaclesCrossed'] = $obstaclesCrossed;
      } 

      $scoresCollection->insertOne($datas);

      // Mise à jour du classement global
      $globalRankingCollection->updateOne(
        ['playername' => $playerName],
        ['$inc' => ['score' => $score]],
        ['upsert' => true]
      );

      return true;
    } catch (\Exception $e) {
      error_log($e->getMessage());
      // Relancer l'exception pour la gérer dans le script appelant
      throw $e;
      return false;
    }
  }

    /**
   * Get the ranking for a specific planet
   *
   * @param string $planet
   * 
   * @return array
   */
  public function getRanking(string $planet): array
  {
    // Sécurisation des données de base
    $planet = Security::secureInput($planet);

    // Vérification des données de base
    if (!in_array(strtolower($planet), $this->validPlanets)) {
      throw new \Exception("Invalid planet specified.");
    }

    // Collections
    $scoresCollectionName = 'MONGODB_COLLECTION_' . strtoupper($planet);
    $scoresCollection = $this->database->selectCollection($_ENV[$scoresCollectionName]);

    // Récupérer tous les scores triés par score décroissant
    $cursor = $scoresCollection->find([], [
      'sort' => ['score' => -1]
    ]);

    // Calcul des places
    $data = [];
    $place = 1;
    foreach ($cursor as $entry) {
      $entryData = [
        'place' => $place,
        'playername' => $entry['playername'],
        'score' => $entry['score']
      ];

      // Ajouter les données spécifiques à 'cryos' si présentes
      if (strtolower($planet) === 'cryos') {
        $entryData['timeSpent'] = $entry['timeSpent'] ?? null;
        $entryData['obstaclesCrossed'] = $entry['obstaclesCrossed'] ?? null;
      }

      $data[] = $entryData;
      $place++;
    }

    return $data;
  }

}
