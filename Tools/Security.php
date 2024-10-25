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
    echo json_encode([
      'success' => $success,
      'datas' => $datas
    ]);
  }

  // Vérification du token CSRF
  public static function checkCSRF(string $token): void
  {
    if (!hash_equals($token, $_SESSION['csrf_token'])) {
      die('Invalid CSRF token');
    }
  }
  
}