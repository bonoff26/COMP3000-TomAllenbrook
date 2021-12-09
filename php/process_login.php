<?php
if(!isset($_SESSION))
{
  session_start();
}

require_once 'connect.php';

if(isset($_POST['login']))
{
  $_SESSION['login'] = checkLogin($_POST['form_username'], $_POST['form-Password'], $connection);
}
$url = $_SERVER['HTTP_REFERER'];
header("location:$url");



function checkLogin($username, $password, $connection)
{
  $login = false;
  //open the file
  $sql = "SELECT * FROM `users` WHERE username='$username' AND password='$password'";
  $result = mysqli_query($connection, $sql);
  $count = mysqli_num_rows($result);
  if ($count == 1) {
    $row = mysqli_fetch_array($result);

    $_SESSION['Username'] = $row['username'];
    $login = true;
  }
  return $login;
}

//old way to check username/passwords, uses a text file.
function checkLoginText($username, $password)
{
  $login = false;
  //open the file
  $file = fopen("../login.txt", "r");
  $storedUsername = fgets($file);
  $storedPassword = fgets($file);
  if((trim($username) == trim($storedUsername)) && (trim($password) == trim($storedPassword)))
  {
    $login = true;
    $_SESSION['Username'] = $username;
  }
  fclose($file);
  return $login;
}
?>
