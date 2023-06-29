<?php
defined('security') or die('Access denied'); // Add light protection against file access


// Settings for the database
if ($_SERVER['HTTP_X_FORWARDED_PROTO'] == 'http') {

	define('DOMAIN', 'api');
	define('PATH',   'http://'.DOMAIN.'/');
	define('HOST',   'localhost');
	define('USER',   'root');
	define('PASS',   'root');
	define('DB',     'ivan_api');

} else {

	define('DOMAIN', 'api.inderio.com');
	define('PATH',   'https://'.DOMAIN.'/');
	define('HOST',   'inderio.mysql.tools');
	define('USER',   'inderio_api');
	define('PASS',   'd93hBLn;+4');
	define('DB',     'inderio_api');

}

// Виводимо як json
if(!isset($_GET['no-json'])) {
    
    // Вказуємо, що вивід буде json
	header('Content-Type: application/json');
	
    // Налаштування для здійснення запиту з одного сервера на інший сервер
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Headers: X-Requested-With, Content-Type, Accept, Origin, Authorization');
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
}


// Збірка функцій
if(!require_once('functions.php'))
	die('functions.php not found');

// Приймаємо тип звернення який потрібно виконати
$systemOption['type'] = (clean($_GET['type'])) ? clean($_GET['type']) : '404';

// Якщо немає типу звернення видаємо помилку
if($systemOption['type'] === '404')
	exit(json_encode(['No type']));


// Звернення до бази даних
if(!require_once('model.php'))
	die('model.php not found');
	