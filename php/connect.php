<?php
$connection = mysqli_connect('localhost', 'root', '', 'project');
if(!$connection) {
  die("Database connection failed!" . mysqli_error($connection));
}
if(isset($_SESSION['login']))
{
  if(isset($_SESSION['ID']))
  {
    $ID = $_SESSION['ID'];
  }
}
?>
