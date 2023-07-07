<?php
defined('security') or die('Access denied'); // Add light protection against file access

/**
* Unpacking the array to make it look good
*/
function print_arr($arr)
{
	// Print an array in a nice format
	echo '<pre>'; print_r($arr); echo "</pre>";
}


/**
* We clean up the data as much as possible
*/
function clean($data)
{
	return htmlspecialchars(strip_tags(addslashes(trim($data))));
}

/**
 * Checking an array for existence for foreach
 */
function arrExist($data = false)
{
	// The cycle requires a check
	return (is_array($data) AND !empty($data)) ? true : false;
}


/**
 * Очищуємо масив від непотрібних значень
 */
function removeEmptyValues($array) {
    return array_filter($array, function($value) {
        return $value != false;
    });
}





