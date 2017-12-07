<?php
    //$file = 'messages.json';
    //$content = json_decode(file_get_contents($file), true);
    //echo json_encode($content);

/*
$host = "ec2-54-243-211-197.compute-1.amazonaws.com";
$dbname = "d2h07jacfl1u2v";
$user = "fbzwtonwoufowv";
$password = "5e064691dd5227cee61ada3cc843b64ca68eaf3fe99c5bb8c9a9df46aa2b47cd";
$port = "5432";
$databaseURL =  getenv("DATABASE_URL");
//$dbconn = pg_connect();
*/







$dbconn = pg_connect("host=ec2-54-243-211-197.compute-1.amazonaws.com port=5432 dbname=d2h07jacfl1u2v user=fbzwtonwoufowv password=5e064691dd5227cee61ada3cc843b64ca68eaf3fe99c5bb8c9a9df46aa2b47cd");
$sql = "create table lorem (id int not null, foo varchar(15), primary key (id));";
$r = pg_query($dbconn, $sql);

$insert = "INSERT INTO lorem (id, foo) VALUES (0, 'Testing Database Insert')";
$insetion = pg_query($dbconn, $insert);

$tbls = "select * from lorem";
$qr = pg_query($dbconn, $tbls);

echo json_encode($qr);
    //echo "PDO connection object created";
    //$file = 'messages.json';
    //$content = json_decode(file_get_contents($file), true);
    //echo json_encode($content);

//echo json_encode($affected_rows);




//https://stackoverflow.com/questions/7165395/call-php-function-from-javascript
?>