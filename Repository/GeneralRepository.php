<?php

namespace Repository;

require_once __DIR__ . '/../vendor/autoload.php';

use Dotenv\Dotenv;
use Db\MongoDb;
use MongoDB\Client;

class GeneralRepository
{

  protected Client $client;
  protected $collection;

  public function __construct()
  {
    $dotenv = Dotenv::createImmutable(__DIR__ . '/../');
    $dotenv->load();

    $mongo = MongoDb::getInstance();
    $this->client = $mongo->getClient();
    $database = $this->client->selectDatabase($_ENV['MONGODB_DATABASE']);
    $this->collection = $database->selectCollection($_ENV['MONGODB_COLLECTION']);
  }

  public function getCollection()
  {
    return $this->collection;
  }

}