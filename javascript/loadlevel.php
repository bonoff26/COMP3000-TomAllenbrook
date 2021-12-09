<?php

session_start();
$connection = mysqli_connect('localhost', 'root', '', 'project');

$id = $_SESSION['ID'];

$sql = "SELECT * FROM `levels` WHERE id='$id'";

$result = mysqli_query($connection, $sql);

$data = array();

while ($row = mysqli_fetch_assoc($result)) {
    $data[] = $row;
}

$output = json_encode($data);
echo $output;

