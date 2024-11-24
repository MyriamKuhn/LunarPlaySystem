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

	/**
	 * Used to get the ranking of a planet
	 *
	 * @param string $planet
	 * @return array
	 */
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
				'playername' => $ranking->playername,
				'score' => $ranking->score,
			];
		}

		return $results; // Retourner les classements sous forme de tableau
	}

	/**
	 * Adds a score entry for a player in the ranking of a planet.
	 *
	 * @param string $planet The planet name.
	 * @param string $playerName The name of the player.
	 * @param int $score The player's score.
	 * @return bool Returns true if the insertion was successful, false otherwise.
	 */
	public function addScore(string $planet, string $playerName, int $score): bool
	{
		// Sélectionner le nom de la collection en fonction de la planète
		$collectionName = 'MONGODB_COLLECTION_' . Security::secureInput(strtoupper($planet));
		$collection = $this->database->selectCollection($_ENV[$collectionName]);

		$playerName = Security::secureInput($playerName);
		$score = intval($score);

		try {
			// Rechercher l'entrée existante pour le joueur
			$existingEntry = $collection->findOne(['playername' => $playerName]);

			// Vérifier si le joueur a déjà un score
			if ($existingEntry !== null) {
				// Si le nouveau score est inférieur ou égal à l'ancien, ne rien faire
				if ($score <= $existingEntry['score']) {
					$this->updateGlobalRanking($playerName, $score);
					return true; // Le score n'a pas été mis à jour
				}

				// Si le nouveau score est meilleur, supprimer l'ancien classement
				$collection->deleteOne(['_id' => $existingEntry['_id']]);
			}

			// Calculer la place du joueur selon son nouveau score
			$place = $this->calculatePlace($collection, $score);

			// Décaler les places des joueurs derrière ce score
			$this->updatePlaces($collection, $place);

			// Créer la nouvelle entrée pour le classement
			$entry = [
				'playername' => $playerName,
				'score' => $score,
				'place' => $place,
			];

			// Insérer l'entrée dans la collection
			$collection->insertOne($entry);

			// Mettre à jour le classement global
			$this->updateGlobalRanking($playerName, $score);

			return true;
		} catch (\Exception $e) {
			// Vous pouvez loguer l'erreur ici si nécessaire
			error_log($e->getMessage());
			return false;
		}
	}

	/**
	 * Calculates the ranking place based on the score.
	 *
	 * @param \MongoDB\Collection $collection The MongoDB collection.
	 * @param int $score The player's score.
	 * @return int The calculated place.
	 */
	private function calculatePlace($collection, int $score): int
	{
		// Trouver le nombre de joueurs ayant un score supérieur
		$higherScoresCount = $collection->countDocuments(['score' => ['$gt' => $score]]);

		// La place est égale à ce nombre + 1
		return $higherScoresCount + 1;
	}

	/**
	 * Updates the places of players ranked after the new entry.
	 *
	 * @param \MongoDB\Collection $collection The MongoDB collection.
	 * @param int $startingPlace The place where the shift starts.
	 * @return void
	 */
	private function updatePlaces($collection, int $startingPlace): void
	{
		// Décale les places des joueurs ayant un rang >= $startingPlace
		$collection->updateMany(
			['place' => ['$gte' => $startingPlace]],
			['$inc' => ['place' => 1]]
		);
	}

	/**
	 * Updates the global ranking based on all game scores.
	 *
	 * @param string $playername The name of the player.
	 * @param int $score The player's score.
	 * @return void
	 */
	private function updateGlobalRanking(string $playername, int $score): void
	{
		// Sélection de la collection globale pour stocker les résultats
		$globalCollection = $this->database->selectCollection($_ENV['MONGODB_COLLECTION_LUNARPLAY']);

		// Vérifier si le joueur existe déjà dans le classement global
		$existingPlayer = $globalCollection->findOne(['playername' => $playername]);

		if ($existingPlayer) {
			// Si le joueur existe, additionner son score au score existant
			$newScore = $existingPlayer['score'] + $score;

			// Mettre à jour le score dans la collection globale
			$globalCollection->updateOne(
				['playername' => $playername],  // Identifier le joueur
				['$set' => ['score' => $newScore]]  // Mettre à jour le score
			);
		} else {
			// Si le joueur n'existe pas, créer une nouvelle entrée avec le score reçu
			$globalCollection->insertOne([
				'playername' => $playername,
				'score' => $score,
			]);
		}

		// Créer un index pour améliorer la performance de tri
    $globalCollection->createIndex(['score' => -1]);

		// Récupérer tous les joueurs et leurs scores pour trier et ajouter les rangs
		$rankedResults = $globalCollection->find([], ['sort' => ['score' => -1]]);

		// Ajouter un rang à chaque joueur
		$rank = 1;
		$rankedPlayers = [];
		foreach ($rankedResults as $result) {
			$rankedPlayers[] = [
				'playername' => $result['playername'],
				'score' => $result['score'],
				'place' => $rank++
			];
		}

		// Préparer les opérations en vrac pour mettre à jour le classement global
		$bulkOperations = [];

		// Ajouter des opérations d'update pour chaque joueur dans le nouveau tableau
    foreach ($rankedPlayers as $player) {
      $bulkOperations[] = [
        'updateOne' => [
          ['playername' => $player['playername']], // Filtre pour trouver le joueur
          ['$set' => ['score' => $player['score'], 'place' => $player['place']]], // Mettre à jour le score et la place
          ['upsert' => true] // Insérer si le joueur n'existe pas
        ]
      ];
    }

		// Exécuter toutes les opérations en une seule requête
		$globalCollection->bulkWrite($bulkOperations);
	}
}
