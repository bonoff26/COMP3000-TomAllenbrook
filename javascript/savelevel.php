<?php

if (!isset($_SESSION)) {
    session_start();
}

include_once 'connect.php';

echo("<script>console.log('Trying to save level');</script>");

$data = file_get_contents("php://input");


saveLevel($_ID, $connection);

$url = $_SERVER['HTTP_REFERER'];
//header("location:main.php");


function saveLevel($id, $connection, $data)
{
    $inputData = mysqli_real_escape_string($connection, $data);

    $sql = "INSERT INTO `levels` (id, data) VALUES ('$id, $data')";
    $result = mysqli_query($connection, $sql);
    echo("<script>console.log('SAVED SUCCESS' + $id);</script>");

    if ($result) {
        echo "Save successfull! php";
    } else {
        echo("<script>console.log('Failed to save at php file');</script>");

    }

}

