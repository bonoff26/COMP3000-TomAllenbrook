<?php
$connection = mysqli_connect('localhost', 'root', '', 'test');
if(!$connection) {
  die("Database connection failed!" . mysqli_error($connection));
}
?>
