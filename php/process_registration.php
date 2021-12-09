<?php
if(!isset($_SESSION))
{
  session_start();
}

include_once 'connect.php';

register($_POST['form_usernameReg'], $_POST['form-PasswordReg'], $_POST['form-emailReg'], $connection);

$url = $_SERVER['HTTP_REFERER'];
header("location:../Home.php");




function register($username, $password, $email, $connection)
{
  $SendUsername = mysqli_real_escape_string($connection, $username);
  $SendPassword = mysqli_real_escape_string($connection, $password);
  $SendEmail = mysqli_real_escape_string($connection, $email);

  $login = false;

  $sql = "INSERT INTO `users` (username, password, email) VALUES ('$SendUsername', '$SendPassword', '$SendEmail')";
  $result = mysqli_query($connection, $sql);

  if ($result) {
    echo "Registration successfull!";
  }
  else {
    echo("<script>console.log('Failed to register');</script>");

  }

}

?>
