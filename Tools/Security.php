<?php

namespace Tools;

class Security
{

  // Méthode pour sécuriser les inputs
  public static function secureInput(string $input): string
  {
    return htmlspecialchars(trim($input), ENT_QUOTES, 'UTF-8');
  }

  // Méthode pour gérer les réponses JSON
  public static function sendResponse(bool $success, string|array $datas, int $statusCode = 200): void
  {
    http_response_code($statusCode);
    header('Content-Type: application/json; charset=utf-8');

    $response = [
      'success' => $success,
      'datas' => $datas
    ];

    if (!$success) {
      // Ajouter un message d'erreur détaillé en cas d'échec
      $response['errorMessage'] = 'Une erreur est survenue, veuillez réessayer plus tard.';
    }

    echo json_encode($response);
  }

  // Vérification du token CSRF
  public static function checkCSRF(string $token): void
  {
    if (!hash_equals($token, $_SESSION['csrf_token'])) {
      die('Invalid CSRF token');
    }
  }
  
}