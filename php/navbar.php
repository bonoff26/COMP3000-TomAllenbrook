<?php

if(isset($_SESSION['login']))
{
    if(isset($_SESSION['Username']))
        {
        $Username = $_SESSION['Username'];
        }
}
?>


<link rel="stylesheet" href="../css/navbarCSS.css">

<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <a class="navbar-brand" href="main.php">COMP3000 Project</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNavDropdown">
    <ul class="navbar-nav navbar-nav mr-auto mt-2 mt-lg-0">
      <li class="nav-item active">
        <a class="nav-link" href="main.php">Home <span class="sr-only">(current)</span></a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="features.php">Features</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="about.php">About</a>
      </li>
    </ul>

    <ul class="navbar-nav">
            <?php
            if(isset($Username)) {
                echo "<li>";
                echo "Welcome ".$Username;
                echo "</li>";

                #echo "<br><br>";
                echo "<li class='nav-item''>";
                echo "<a href='logout.php' class='nav-link' id='logoutButton'>Logout</a>";
                echo '<script>console.log("Logged in")</script>';
            }
            else {
                #echo "<br><br>";
                echo '<script>console.log("Not logged in")</script>';
                echo "<li class='nav-item''>";
                echo '<a href="login.php" class="nav-link" id="regButton" role="button">Login</a>';
                echo "</li>";

                echo "<li class='nav-item''>";
                echo '<a href="register.php" class="nav-link" id="regButton" role="button">Register</a>';
                echo "</li>";

            }
            echo "</li>";
            ?>
    </ul>
  </div>
</nav>



