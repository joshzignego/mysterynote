<?php
    //$file = 'messages.json';
    //$content = json_decode(file_get_contents($file), true);
    //echo json_encode($content);


    /*$host = "ec2-54-243-211-197.compute-1.amazonaws.com";
    $dbname = "d2h07jacfl1u2v";
    $user = "fbzwtonwoufowv";
    $password = "5e064691dd5227cee61ada3cc843b64ca68eaf3fe99c5bb8c9a9df46aa2b47cd";
    $port = "5432";
    //$databaseURL =  getenv("DATABASE_URL");
    $dbconn = pg_connect("host=$host port=$port dbname=$dbname user=$user password=$password");
    */

    $dbconn = pg_connect(getenv("DATABASE_URL"));
    if (!$dbconn) {
        echo json_encode("connection error to DB");
        exit;
    }

    $result = pg_query($dbconn, "SELECT * FROM testMessages");
    if (!$result) {
        echo "An error occurred getting result.\n";
        exit;
    }

    $messagesArray = array();
    while ($row = pg_fetch_row($result)) {
        array_push($messagesArray, "" . $row[0] . $row[1]);
    }

    echo json_encode($messagesArray);

?>