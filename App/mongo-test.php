<?php

// Chargement de l'autoloader
require_once __DIR__.'/../Autoload.php';
Autoload::register();

use Repository\GeneralRepository;

$generalRepository = new GeneralRepository();
$collection = $generalRepository->getRanking('lunarplay');

var_dump($collection);