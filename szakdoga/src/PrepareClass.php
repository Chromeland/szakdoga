<?php

if ($_POST["type"] === 'TextToDb') {
    echo(json_encode(saveTextToDB($_POST["ID"],$_POST["type"],$_POST["parentElement"],$_POST["posX"],$_POST["posY"],$_POST["style"],$_POST["fontFamily"],$_POST["fontColour"],$_POST["fontSize"],$_POST["textFloat"],$_POST["opacity"],$_POST["borderRadius"],$_POST["botderStyle"],$_POST["borderSize"])));
} else {
    echo(json_encode($_POST["ID"]));
}

function saveTextToD($id,$type,$parentElement,$posX,$posY,$Style = 'normal',$fontFamily = 'Arial',$fontColour = 'black',$fontSize = 12,$textFloat = 'left',$opacity = 1,$borderRadius = null,$borderStyle = null,$borderSize = null)
{
    $tmp = explode("#", $id);
    $id = $tmp[0];

    $servername = "localhost:3306";
    $username = "BenceTeszt";
    $password = "123";
    $dbname = "szakdolgozat";

// Create connection
    $conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $sql = "INSERT INTO `texts` VALUES ('" .$id. "','" .$type. "','" .$parentElement. "','" .$posX. "','" .$posY. "','" .$Style. "','" .$fontFamily. "','" .$fontColour. "','" .$fontSize. "','" .$textFloat. "','" .$opacity. "','" .$borderRadius. "','" .$borderStyle. "','" .$borderSize. "')";

    if ($conn->query($sql) === TRUE) {
        echo "New record created successfully";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }

    $conn->close();
}