<?php

namespace Tools;

class Security
{

  // Méthode pour sécuriser les inputs
  public static function secureInput(string $input): string
  {
    return htmlspecialchars(trim($input), ENT_QUOTES, 'UTF-8');
  }
  
}
