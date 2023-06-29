<?php
define('security', TRUE); // Add light protection against file access

// Connect the config file
include 'config.php';

// Переключалка для типів звернення
switch ($systemOption['type']) {
	case 'search-user':
		echo searchUser();
		break;
	
	default:
		# code...
		break;
}

