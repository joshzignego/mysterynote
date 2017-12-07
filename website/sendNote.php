<?php
$dbconn = pg_connect(getenv("DATABASE_URL"));

//There was an error connecting to the database
if (!$dbconn) {
    exit;
}

if (isset($_POST['message'])) {
    $message = $_POST['message'];

    $r = pg_query($dbconn, "CREATE TABLE IF NOT EXISTS testMessages (id SERIAL, message varchar(2000))");
    if (!$r) {
        echo "Error on create!";
        exit;
    }

    $insert = pg_query($dbconn, "INSERT INTO testMessages(message) VALUES ('$message')");
    if (!$insert) {
        echo "Error on insert!".$message.(gettype($message));
        exit;
    }
    header('Location: /note_submitted.html');





            //$file = 'messages.json';
            //$content = json_decode(file_get_contents($file) , true );
            //$messageAsJSObject = '{"message": "' . $message . '"}';
            //$data = json_encode($message);
            //$content[messages][] = array(
              //  'message' => $message
            //);
    //encode the new data
    //$content_json = json_encode($content, JSON_PRETTY_PRINT);
    //file_put_contents($file, $content_json, LOCK_EX);
    //header('Location: /note_submitted.html');
}
?>

/**
 * Created by PhpStorm.
 * User: jzignego
 * Date: 11/28/17
 * Time: 11:04 AM
 */