<?php




        if (isset($_POST['message'])) {
            $message = $_POST['message'];
            $file = 'messages.json';
            $content = json_decode(file_get_contents($file) , true );
            //$messageAsJSObject = '{"message": "' . $message . '"}';
            //$data = json_encode($message);
            $content[messages][] = array(
                'message' => $message
            );

            //encode the new data
            $content_json = json_encode($content, JSON_PRETTY_PRINT);
            file_put_contents($file, $content_json, LOCK_EX);

        }

       header('Location: /note_submitted.html'); // redirect back to the main site





























//URL: https://stackoverflow.com/questions/13973963/easiest-way-to-store-data-from-web-site-on-server-side
?>


/**
 * Created by PhpStorm.
 * User: jzignego
 * Date: 11/28/17
 * Time: 11:04 AM
 */