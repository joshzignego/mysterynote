<?php
    //$file = 'messages.json';
    //$content = json_decode(file_get_contents($file), true);
    //echo json_encode($content);


$host = "ec2-54-243-211-197.compute-1.amazonaws.com";
$dbname = "d2h07jacfl1u2v";
$user = "fbzwtonwoufowv";
$password = "5e064691dd5227cee61ada3cc843b64ca68eaf3fe99c5bb8c9a9df46aa2b47cd";
$port = "5432";
//$databaseURL =  getenv("DATABASE_URL");
//$dbconn = pg_connect();








$dbconn = pg_connect("host=$host port=$port dbname=$dbname user=$user password=$password");

if (!$dbconn) {
    echo json_encode("connection error to DB");
    exit;
}
else {
//$sql = "create table lorem2 (id int not null, foo varchar(15), primary key (id));";
//$r = pg_query($dbconn, $sql);
    $insert = pg_query($dbconn, "INSERT INTO lorem2 VALUES (5, 'Insert5')");
    if (!$insert) {
        echo "An error occurred inserting ;).\n";
        exit;
    }


    $result = pg_query($dbconn, "SELECT foo FROM lorem2");
    if (!$result) {
        echo "An error occurred getting result.\n";
        exit;
    }

    while ($row = pg_fetch_row($result)) {
        echo "Foo: $row[1]";
    }


    //echo json_encode("insert is".$insert.""$qr);
    //echo "PDO connection object created";
    //$file = 'messages.json';
    //$content = json_decode(file_get_contents($file), true);
    //echo json_encode($content);

//echo json_encode($affected_rows);

}


//https://stackoverflow.com/questions/7165395/call-php-function-from-javascript
?>