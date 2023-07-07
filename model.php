<?php
defined('security') or die('Access denied'); // Add light protection against file access



/**
 * Connecting to the database
 */
function connect_db($type = 'PDO') {
	try {
		// Connecting
		$handler = new PDO('mysql:host='.HOST.';dbname='.DB.'; charset=utf8', USER, PASS);

		// Returning the connection
		$handler->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

		// Return connection
		return $handler;

	// View error connection
	} catch(PDOException $e) { die('Connection failed: ' . $e->getMessage()); }
}




/**
 * Database prepare query function
 */
function getSql($table = false, $where = false, $fields = 'email, beneficiary, transaction_id, transaction_status', $sqlEnd = '')
{
	// Checking for the existence of a table value
	if (!$table)
		exit('The table name parameter is not passed');

	// BD connection
	$db = connect_db();

	// Build the query
	$query = 'SELECT ' . $fields . ' FROM ' . $table . ' ';

	// Array for filling parameters
	$params = array();

	// Go through the parameters and generate values for the sql query and an array of values
	if (arrExist($where)) {

		// Очищуємо дані
		$where = removeEmptyValues($where);

		// Set more sql query
		$query .= 'WHERE ';

		// Write sql where
		foreach ($where as $field => $value) {
			$query .= $field . ' = ? AND ';
			$params[] = $value;
		}
	}

	// Add a place for values to the query
	$query = rtrim($query, ' AND ');

	// Add the ability to add something to the request
	if($sqlEnd)
		$query .= ' '.$sqlEnd;

	// Prepare the statement
	$stmt = $db->prepare($query);

	// Bind the parameters
	foreach ($params as $key => $value)
		$stmt->bindValue($key + 1, $value);

	// Execute the statement
	$stmt->execute();

	// Check for errors
	if ($stmt->errorCode() != '00000') {
		$errorInfo = $stmt->errorInfo();
		exit('Query failed: ' . $errorInfo[2] . '<br>' . $query);
	}

	// Return prepare connection
	return $stmt;
}



/**
 * Get a single record
 */
function getOneRow($table = false, $where = false, $fields = 'email, beneficiary, transaction_id, transaction_status', $sqlEnd = '')
{
	// Prepare connection
	$stmt = getSql($table, $where, $fields, $sqlEnd);

	// Retrieve the record
	$record = $stmt->fetch(PDO::FETCH_ASSOC);

	// Return single data
	return (arrExist($record)) ? $record : false;
}




/**
 * Get a list of records
 */
function getAllRows($table = false, $where = false, $fields = 'email, beneficiary, transaction_id, transaction_status', $sqlEnd = '')
{
	// Prepare connection
	$stmt = getSql($table, $where, $fields, $sqlEnd);

	// Retrieve the record
	$record = $stmt->fetchAll(PDO::FETCH_ASSOC);

	// Return list of data
	return (arrExist($record)) ? $record : false;
}




/**
 * Adds a new record to the specified table in the database
 */
function addRecord($table, $data)
{
	// Connect to the database
	$db = connect_db();

	// Build the query
	$columns = implode(', ', array_keys($data));
	$values  = implode(', ', array_fill(0, count($data), '?'));

	// Sql part
	$sql = "INSERT INTO $table ($columns) VALUES ($values)";

	// Prepare the statement
	$stmt = $db->prepare($sql);

	// Bind the values
	$i = 1;
	foreach ($data as $value) {
		$stmt->bindValue($i++, $value);
	}

	// Execute the statement
	$result = $stmt->execute();

	// Return answer
	return $db->lastInsertId();
}




/**
 * Edit record in a MySQL table
 */
function editRecord($table, $data, $where)
{
	// Connect to the database
	$db = connect_db();

	// Build the SET clause of the SQL query
	$setClause = '';
	foreach ($data as $column => $value) {
		$setClause .= "`$column` = :$column,";
	}
	$setClause = rtrim($setClause, ',');

	// Build the full SQL query
	$sql = "UPDATE `$table` SET $setClause WHERE $where";

	// Prepare the query
	$stmt = $db->prepare($sql);

	// Bind the parameters
	foreach ($data as $column => $value) {
		$stmt->bindValue(":$column", $value);
	}

	// Checking the execution of the request
	try {
		$data = $stmt->execute();
	} catch (Exception $e) {
		die('Connection failed: ' . $e->getMessage());
	}

	// Execute the query
	return ($data) ? true : false;
}













/**
 * Дістаємо користувача по одному з параметрів
 */
function searchUser() {
    
	// Формуємо частину для запиту
	$where['email']          = clean($_POST['email']);
	$where['beneficiary']    = clean($_POST['beneficiary']);
	$where['transaction_id'] = clean($_POST['transaction_id']);
	$where['transaction_status'] = clean($_POST['transaction_status']);
	
	// Return data
	$res = getAllRows('users', $where, 'email, beneficiary, transaction_id, transaction_status', 'LIMIT 10');

	// Перевіряємо наявність масива і повертаємо json
	return (arrExist($res)) ? json_encode($res) : json_encode(['empty' => true]);
}
