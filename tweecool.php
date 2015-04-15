<?php

//var_dump($_POST);die;
$data = $_POST;

$username = $data['username'];
$count = $data['count'];

// create curl resource
$ch = curl_init();

// set url
curl_setopt($ch, CURLOPT_URL, "https://www.api.tweecool.com/?screenname=$username&count=$count");

//return the transfer as a string
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

// $output contains the output string
$output = curl_exec($ch);

echo $output;
// close curl resource to free up system resources
curl_close($ch);