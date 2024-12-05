<?php

namespace App\Repository;

require_once __DIR__ . '/../../vendor/autoload.php';

use Dotenv\Dotenv;
use App\Db\MongoDb;
use MongoDB\Client;
use Tools\Security;
use MongoDB\UTCDateTime;

class GeneralRepository
{

	protected Client $client;
	protected $collection;
	protected $database;

	/**
	 * Constructor of the GeneralRepository class
	 */
	public function __construct()
	{
		$dotenv = Dotenv::createImmutable(__DIR__ . '/../../');
		$dotenv->load();

		$mongo = MongoDb::getInstance();
		$this->client = $mongo->getClient();
		$this->database = $this->client->selectDatabase($_ENV['MONGODB_DATABASE']);
	}

  public function addScore(string $planet, string $playerName, int $score): bool
{
    $playerName = Security::secureInput($playerName);
    $score = intval($score);

    // Collections
    $scoresCollectionName = 'MONGODB_COLLECTION_' . Security::secureInput(strtoupper($planet));
    $scoresCollection = $this->database->selectCollection($_ENV[$scoresCollectionName]);

    $rankingsCollectionName = $scoresCollectionName . '_ranking';
    $rankingsCollection = $this->database->selectCollection($_ENV[$rankingsCollectionName]);

    $rankingsCollection->createIndex(['highscore' => -1]);
$rankingsCollection->createIndex(['playername' => 1]);


    try {
        // Ajouter une nouvelle entrée dans la collection des scores
        $scoresCollection->insertOne([
            'playername' => $playerName,
            'score' => $score,
            'playedAt' => new \UTCDateTime()
        ]);

        // Vérifier et mettre à jour le meilleur score dans les classements
        $existingRanking = $rankingsCollection->findOne(['playername' => $playerName]);

        if (!$existingRanking || $score > $existingRanking['highscore']) {
            $rankingsCollection->updateOne(
                ['playername' => $playerName],
                [
                    '$set' => [
                        'highscore' => $score,
                        'lastPlayed' => new \UTCDateTime(),
                        'gameplays' => ($existingRanking['gameplays'] ?? 0) + 1
                    ]
                ],
                ['upsert' => true]
            );
        } else {
            // Si le score n'est pas un nouveau highscore, juste incrémenter les parties jouées
            $rankingsCollection->updateOne(
                ['playername' => $playerName],
                ['$inc' => ['gameplays' => 1]]
            );
        }

        return true;
    } catch (\Exception $e) {
        error_log($e->getMessage());
        return false;
    }
}

public function getRankings(string $planet, int $limit = 10, int $offset = 0): array
{
    $rankingsCollectionName = 'MONGODB_COLLECTION_' . Security::secureInput(strtoupper($planet)) . '_ranking';
    $rankingsCollection = $this->database->selectCollection($_ENV[$rankingsCollectionName]);

    $rankingsCollection->createIndex(['highscore' => -1]);
$rankingsCollection->createIndex(['playername' => 1]);


    $cursor = $rankingsCollection->find(
        [],
        [
            'sort' => ['highscore' => -1], // Tri par meilleur score décroissant
            'skip' => $offset,
            'limit' => $limit
        ]
    );

    $rankings = [];
    $place = $offset + 1;

    foreach ($cursor as $entry) {
        $rankings[] = [
            'place' => $place,
            'playername' => $entry['playername'],
            'highscore' => $entry['highscore'],
            'gameplays' => $entry['gameplays'],
            'lastPlayed' => $entry['lastPlayed']->toDateTime()->format('Y-m-d H:i:s')
        ];
        $place++;
    }

    return $rankings;
}

public function getRankingsForDataTables(string $planet, array $queryParams): array
{
    $rankingsCollectionName = 'MONGODB_COLLECTION_' . Security::secureInput(strtoupper($planet)) . '_ranking';
    $rankingsCollection = $this->database->selectCollection($_ENV[$rankingsCollectionName]);

    $draw = intval($queryParams['draw'] ?? 1);
    $start = intval($queryParams['start'] ?? 0);
    $length = intval($queryParams['length'] ?? 10);

    // Nombre total de joueurs
    $recordsTotal = $rankingsCollection->countDocuments();

    // Appliquer la pagination
    $cursor = $rankingsCollection->find(
        [],
        [
            'sort' => ['highscore' => -1], // Trier par meilleur score décroissant
            'skip' => $start,
            'limit' => $length
        ]
    );

    $data = [];
    $place = $start + 1;

    foreach ($cursor as $entry) {
        $data[] = [
            'place' => $place,
            'playername' => $entry['playername'],
            'highscore' => $entry['highscore'],
            'gameplays' => $entry['gameplays'],
            'lastPlayed' => $entry['lastPlayed']->toDateTime()->format('Y-m-d H:i:s')
        ];
        $place++;
    }

    return [
        'draw' => $draw,
        'recordsTotal' => $recordsTotal,
        'recordsFiltered' => $recordsTotal, // Aucun filtre dans cet exemple
        'data' => $data
    ];
}



}