<?php

class Autoload
{
  /*
  * Register the autoloader
  */
  static function register()
  {
    spl_autoload_register(array(__CLASS__, 'autoload'));
  }

  /**
   * Used to autoload classes
   *
   * @param string $class
   * @return void
   */
  static function autoload($class)
  {
    $class = str_replace('\\', '/', $class);
    if (file_exists(__DIR__.'/'.$class.'.php')) {
      require __DIR__.'/'.$class.'.php';
    }
  }
}