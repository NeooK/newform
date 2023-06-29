<?php
define('security', TRUE); // Add light protection against file access


$_GET['type'] = 'form';
$_GET['no-json'] = true;

// Connect the config file
include 'config.php';

function executeQueriesFromArray($queries) {
  // Параметри підключення до бази даних
  $servername = HOST;
  $username = USER;
  $password = PASS;
  $dbname = DB;

  try {
    // Підключення до бази даних
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    // Встановлення режиму помилок для підключення до бази даних
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Підставляємо назву бази
    $queries = str_replace('INSERT INTO table_name', 'INSERT INTO users', $queries);

    // Розбиваємо масив запитів на окремі запити
    $queries = explode(';', $queries);

    // Виконуємо кожен запит
    foreach ($queries as $query) {
      // Перевіряємо, чи не є запит порожнім
      if (!empty(trim($query))) {
        // Виконуємо запит
        $stmt = $conn->prepare($query);
        $stmt->execute();
      }
    }

    echo "Запити успішно виконані.";
  } catch(PDOException $e) {
    echo "Помилка: " . $e->getMessage();
  }

  // Закриваємо з'єднання з базою даних
  $conn = null;
}




if(arrExist($_POST)) {
        
    // Отримуємо масив запитів з вхідних даних
    $queries = $_POST['sql'];
    
    // Виклик функції для виконання запитів
    executeQueriesFromArray($queries);
    
    
}

?>

<br>

<a href="https://products.aspose.app/cells/conversion/excel-to-json" target="_blank">Перетворити exel в sql</a>

<br />
<br />

<form method="post">
  <textarea name="sql" style="width: 100%; height: 100%;" placeholder="Вставити sql запит"></textarea>
  <button>Імпортувати</button>
</form>