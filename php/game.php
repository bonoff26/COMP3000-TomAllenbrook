<script src="../javascript/game.js"></script>
<script src="../javascript/playerClass.js"></script>
<script src="../javascript/AIPlayerClass.js"></script>
<script src="../javascript/neuralnetwork.js"></script>
<script src="../javascript/ga.js"></script>
<script src="../javascript/obstacle.js"></script>
<script src="../javascript/leveleditor.js"></script>
<script src="../javascript/rewards.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@2.0.0/dist/tf.min.js"></script>
<script   src="https://code.jquery.com/jquery-3.1.1.min.js"   integrity="sha256-hVVnYaiADRTO2PzUGmuLJr8BLUSjGIZsDYGmIJLv2b8="   crossorigin="anonymous"></script>



<?php
if(!isset($_SESSION))
{
    session_start();
    echo '<script>console.log("Session started")</script>';
    $username = $_SESSION['Username'];
    echo '<script type="text/javascript">' .
        'console.log(' . $username . ');</script>';
}
?>


<?php
include_once('../javascript/p5.html');
?>



