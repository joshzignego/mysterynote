<?php
        /*$recaptchaSecretKey = "6LfWZDsUAAAAAGNx8TouIbZZQ79dJZXIAvWPhOUT";
        $client_captcha_response = $_POST['g-recaptcha-response'];
        $user_ip = $_SERVER['REMOTE_ADDR'];

        $captcha_verify = open_https_url("https://www.google.com/recaptcha/api/siteverify?secret=$your_secret&response=$client_captcha_response&remoteip=$user_ip");
        $captcha_verify_decoded = json_decode($captcha_verify);
        if($captcha_verify_decoded->success)
            die('DIRTY ROBOT');*/
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
            file_put_contents($file, $content_json);

        }

        /*$file = 'messages.json';
        $content = json_decode(file_get_contents($file) , true );
        $message = $_POST['message']; //. concatenates string in php
        $messageAsJSObject = '{"message": "' . $message . '"}';
        $data = json_encode($message);
        $content[messages][] = array(
            'message' => $message
        );

        //encode the new data
        $content_json = json_encode($content, JSON_PRETTY_PRINT);
        file_put_contents($file, $content_json);*/

       header('Location: /note_submitted.html'); // redirect back to the main site

//URL: https://stackoverflow.com/questions/13973963/easiest-way-to-store-data-from-web-site-on-server-side
?>


/**
 * Created by PhpStorm.
 * User: jzignego
 * Date: 11/28/17
 * Time: 11:04 AM
 */