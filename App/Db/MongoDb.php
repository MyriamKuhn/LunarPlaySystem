<?php

namespace App\Db;

require_once __DIR__ . '/../../vendor/autoload.php';

use Dotenv\Dotenv;
use Exception as GlobalException;
use MongoDB\Client;

class MongoDb
{

  private ?Client $client = null;
  private static ?self $_instance = null;
  private string $uri;

  /**
   * MongoDb constructor
   */
  private function __construct()
  {
    $dotenv = Dotenv::createImmutable(__DIR__ . '/../../');
    $dotenv->load();
    $this->uri = $_ENV['MONGODB_URI'];
  }

  /**
   * @return MongoDb
   * 
   * This function is used to get the instance of the MongoDb class.
   */
  public static function getInstance(): self
  {
    if (is_null(self::$_instance)) {
      self::$_instance = new MongoDb();
    }
    return self::$_instance;
  }

  /**
   * @return Client
   * 
   * This function is used to get the client of the MongoDb class.
   */
  public function getClient(): Client
  {
    if (is_null($this->client)) {
      try {
        $this->client = new Client($this->uri);

      } catch (GlobalException $e) {
        echo $e->getMessage() . "(Erreur : " . $e->getCode() . ")";
        die();
      }
    }
    return $this->client;
  }
}