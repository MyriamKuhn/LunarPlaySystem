<?php

// Chargement de l'autoloader
require_once __DIR__.'/../Autoload.php';
Autoload::register();

use App\Repository\GeneralRepository;

$generalRepository = new GeneralRepository();
$collection = $generalRepository->addScore('aetheria', 'Mimi', 20);