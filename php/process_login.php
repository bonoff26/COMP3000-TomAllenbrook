<?php
if(!isset($_SESSION))
{
  session_start();
}

require_once 'connect.php';


if(isset($_POST['login']))
{
  echo("<script>console.log('logging in POST');</script>");
  $_SESSION['login'] = checkLogin($_POST['form_email'], $_POST['form-Password'], $connection);
}
else {
  echo("<script>console.log('post not set');</script>");
}
//$url = $_SERVER['HTTP_REFERER'];
header("location:main.php");



function checkLogin($email, $password, $connection)
{
  $login = false;

  //open the file
  $sql = "SELECT * FROM `users` WHERE email='$email'";
  $result = mysqli_query($connection, $sql);
  $count = mysqli_num_rows($result);
  if ($count == 1) {
    $row = mysqli_fetch_array($result);
    $hashed_password = $row['password'];
    if(password_verify($password, $hashed_password)) {
      $_SESSION['Username'] = $row['username'];
      $print = $_SESSION['Username'];


      $_SESSION['ID'] = $row['id'];
      $login = true;
      $id =  $_SESSION['ID'];
    }
    else {
      $login = false;
    }

  }
  return $login;
}
?>
