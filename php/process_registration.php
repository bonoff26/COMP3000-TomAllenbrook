<?php
if(!isset($_SESSION))
{
  session_start();
}

include_once 'connect.php';

register($_POST['form_usernameReg'], $_POST['form-PasswordReg'], $_POST['form-emailReg'], $connection);

$url = $_SERVER['HTTP_REFERER'];
header("location:main.php");




function register($username, $password, $email, $connection)
{
  $SendUsername = mysqli_real_escape_string($connection, $username);
  $SendPassword = mysqli_real_escape_string($connection, $password);
  $SendPassword = password_hash($SendPassword, PASSWORD_DEFAULT);
  $SendEmail = mysqli_real_escape_string($connection, $email);

  $login = false;

  $sql = "INSERT INTO `users` (username, password, email) VALUES ('$SendUsername', '$SendPassword', '$SendEmail')";
  $result = mysqli_query($connection, $sql);

  # $sql = "INSERT INTO `levels` (data) VALUES ('blank') WHERE ";

  if ($result) {
    echo "Registration successfull!";
  }
  else {

  }

}

?>
