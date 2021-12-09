<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script><link rel="stylesheet" href="../css/homepage.css">
<script src="../javascript/background.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@2.0.0/dist/tf.min.js"></script>


<?php
include_once('navbar.php');
include_once('../javascript/p5.html');
?>

<div class="jumbotron bg-transparent m-lg-4">
    <h1 class="display-2 my-2">Features</h1>
    <p class="lead" id="sub"><strong>An interactive Machine Learning game</strong></p>
    <hr class="my-4">
    <p>The AI uses an evolutionary algorithm in order to become better and better at the level</p>
    <p>Think of it as survival of the fittest, only the best AI get chosen to go on to the next generation, and clones of them are created with small variations in each one</p>
    <p>These small variations or, mutations, hopefully make the AI behave even better than before, so they get chosen for the next generation</p>
    <p class="lead">
    <div class="button1">
        <?php
        if(isset($Username)) {
            echo '<a class="btn btn-secondary" href="../php/game.php" role="button">Click here for the game</a>';
        }
        else {
            echo 'Login to play the game';
        }
        ?>
    </div>
    </p>
</div>
