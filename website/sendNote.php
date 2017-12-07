<?php
$databaseConnection = pg_connect(getenv("DATABASE_URL"));

//There was an error connecting to the database
if (!$databaseConnection) {
    echo "Cannot connect to the database!";
    exit;
}

if (isset($_POST['message'])) {
    $message = $_POST['message'];
    $message = pg_escape_literal($message);

    $insert = pg_query($databaseConnection, "INSERT INTO messages(message) VALUES ($message)");
    if (!$insert) {
        echo "Error on submitting the note!"."\n";
        echo pg_last_error($databaseConnection);
        exit;
    }
}

header('Location: /note_submitted.html');
?>