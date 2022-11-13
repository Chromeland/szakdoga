<?php
/**
 * This file is responsible for autoloading the called classes.
 * This has to be included only once per request!
 * The class file has to be in the src folder.
 * If it is desired to put classes in sub-folders, the spl_autoload_register function has to be extended.
 */

/* umask(0);

// The szakdoga_ROOT constant is defined here.
// With the help of that, absolute paths can and should be used to define paths.
if (!defined('Szakdoga_ROOT')) {
    if ($_SERVER['DOCUMENT_ROOT']) {
        define('szakdoga_ROOT', $_SERVER['DOCUMENT_ROOT'] . '/szakdolgozat');
    } else {
        // Used for cli
        define('szakdoga_ROOT', dirname(__DIR__));
    }
}

// the installation script sets display_errors=Off in php.ini, so this can be used in production as well
error_reporting(E_ERROR | E_PARSE);

spl_autoload_register(function ($class) {
        $filePath = szakdoga_ROOT . "/src/$class.php";
        if (!file_exists($filePath)) {
            // TODO: This shouldn't be ignored silently
            //throw new Exception("$class.php doesn't exists!");
        } else {
            require_once szakdoga_ROOT . "/src/$class.php";
        }
}); */
