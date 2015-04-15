<?php
    // create curl resource
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, "https://ezescreens.ezetop.com:8690/api/data");
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    $output  =  trim(curl_exec($ch));
    curl_close($ch);
    exit;
?>