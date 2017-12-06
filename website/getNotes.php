<?php
    $file = 'messages.json';
    $content = json_decode(file_get_contents($file), true);
    echo json_encode($content);

    //$size = count($content[messages]) - 1;
    //$index = rand(0, $size);
    //$message = $content[messages][$size]['message'];
    //$message = htmlspecialchars($message);
    //$message = str_replace("\n", "<br />", $message);
    //echo $message;
//https://stackoverflow.com/questions/7165395/call-php-function-from-javascript
?>