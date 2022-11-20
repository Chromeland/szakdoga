<?php

if ($_POST["type"] === 'TextToDb') {
    echo(json_encode(saveTextToDB($_POST["ID"],$_POST["Type"],$_POST["parentElement"],$_POST["posX"],$_POST["posY"],$_POST['innerText'],$_POST["style"],$_POST["fontFamily"],$_POST["fontColor"],$_POST["fontSize"],$_POST["textFloat"],$_POST["opacity"],$_POST["borderRadius"],$_POST["borderStyle"],$_POST["borderSize"],$_POST['borderColor'])));
} else {
    echo(json_encode($_POST["ID"]));
}

function saveTextToDB($id,$Type,$parentElement,$posX,$posY,$innerText,$Style = 'normal',$fontFamily = 'Arial',$fontColour = 'black',$fontSize = 12,$textFloat = 'left',$opacity = 1,$borderRadius = null,$borderStyle = null,$borderSize = null,$borderColor = null)
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

    $checkIfExists = $conn->query("SELECT * FROM `texts` WHERE `ID` = '" . $id . "'");
    $rowCount = mysqli_num_rows($checkIfExists);
    if ($rowCount < 1) {
        $add = "INSERT INTO `texts` VALUES ('" . $id . "','" . $Type . "','" . $parentElement . "','" . $posX . "','" . $posY . "','" . $innerText . "','" . $Style . "','" . $fontFamily . "','" . $fontColour . "','" . $fontSize . "','" . $textFloat . "','" . $opacity . "','" . $borderRadius . "','" . $borderStyle . "','" . $borderSize . "','" . $borderColor . "')";
        $conn->query($add);
        echo "New record created successfully";
    } else {
        $update = "UPDATE `texts` SET `ID`= '$id',`Type`='$Type',`ParentElement`='$parentElement',`Position-x`='$posX',`Position-y`='$posY',`InnerText`='$innerText',`Style`='$Style',`FontFamily`='$fontFamily',`FontColor`='$fontColour',`FontSize`='$fontSize',`Text-Float`='$textFloat',`Opacity`='$opacity',`Border-Radius`='$borderRadius',`Border-Style`='$borderStyle',`Border-Size`='$borderSize',`Border-Color`='$borderColor' WHERE `ID` = '$id'";
        $conn->query($update);
        echo "Record update successful";
    }
    $conn->close();
    return true;
}