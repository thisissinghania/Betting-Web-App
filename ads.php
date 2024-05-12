<?php

$file = fopen("static/clients/". $_SERVER['HTTP_HOST'] ."/ads.txt","r");

while(! feof($file)) {
  $line = fgets($file);
  echo $line. "<br>";
}

fclose($file);