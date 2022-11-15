<?php

include('DB.php');

if ($_POST["type"] === 'SaveToDb') {
    echo(json_encode(prepareDBAction($_POST["ID"])));
} else {
    echo(json_encode($_POST["ID"]));
}

function prepareDBAction($id)
{
    $tmp = explode("#", $id);
    $id = $tmp[0];

    $servername = "localhost:3306";
    $username = "BenceTest";
    $password = "123";
    $dbname = "szakdolgozat";

// Create connection
    $conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $sql = "INSERT INTO `texts`(`ID`) VALUES ('" . $id . "')";

    if ($conn->query($sql) === TRUE) {
        echo "New record created successfully";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }

    $conn->close();
}