<?php
session_start();
$connection = mysqli_connect('localhost', 'root', '', 'project');

$data = file_get_contents("php://input");
//var_export($data);

$id = $_SESSION['ID'];

saveLevel($id, $connection, $data);

$url = $_SERVER['HTTP_REFERER'];
//header("location:main.php");


function saveLevel($id, $connection, $data)
{
    $inputData = json_decode($data);

    print_r($data);
    print_r($inputData);

    $spikes = $inputData[0];
    $platforms = $inputData[1];
    $goals = $inputData[2];
    $coins = $inputData[3];

    //$spikeString = implode($spikes);

    $spikeOutput = mysqli_real_escape_string($connection, $spikes);
    $platformsOutput = mysqli_real_escape_string($connection, $platforms);
    $goalsOutput = mysqli_real_escape_string($connection, $goals);
    $coinsOutput = mysqli_real_escape_string($connection, $coins);

    print_r($coinsOutput);


    $sql = "INSERT INTO `levels` (id, spikes, platforms, goals, coins) VALUES ('$id', '$spikeOutput', '$platformsOutput', '$goalsOutput', '$coinsOutput')";


    $result = mysqli_query($connection, $sql);




    if ($result) {
        print_r("Success");
    } else {
        print_r("Failed");
        print_r(mysqli_error($connection));
        $sql = "UPDATE `levels` SET spikes='$spikeOutput', platforms='$platformsOutput', goals='$goalsOutput', coins='$coinsOutput' WHERE id=$id";
        $result = mysqli_query($connection, $sql);
        if ($result) {
            print_r("Success new entry");
        }
        else {
            print_r("Failed new entry");
        }
    }

}

