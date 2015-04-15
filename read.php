<?php
    $url = 'https://dingscreens.ding.com/api/data';
    $ch = curl_init();
    curl_setopt($ch,CURLOPT_URL,$url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    $output  =  trim(curl_exec($ch));
    echo $output;
    curl_close($ch);
    exit;
?>