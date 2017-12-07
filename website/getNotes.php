<?php
    $databaseConnection = pg_connect(getenv("DATABASE_URL"));

    if (!$databaseConnection) {
        echo "Cannot connect to the database!";
        exit;
    }

    $result = pg_query($databaseConnection, "SELECT message FROM testMessages");
    if (!$result) {
        echo "An error occurred retrieving the message!.\n";
        exit;
    }

$result = pg_query($databaseConnection, "DROP TABLE lorem, lorem2, testMessages");

    $messagesArray = array();
    while ($row = pg_fetch_row($result)) {
        array_push($messagesArray, "" . $row[0]);
    }

    echo json_encode($messagesArray);
?>