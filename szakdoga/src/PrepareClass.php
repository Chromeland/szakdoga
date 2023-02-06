<?php

include 'DbClass.php';

if ($_POST["type"] === 'TextToDb') {
    echo(json_encode(DbClass::Instance()->saveTextToDB($_POST["ID"],$_POST["Type"],$_POST["parentElement"],$_POST["posX"],$_POST["posY"],$_POST['innerText'],$_POST["style"],$_POST["fontFamily"],$_POST["fontColor"],$_POST["fontSize"],$_POST["textFloat"],$_POST["opacity"],$_POST["borderRadius"],$_POST["borderStyle"],$_POST["borderSize"],$_POST['borderColor'])));
}else if ($_POST['type'] === 'ReadFromDB'){
    echo(json_encode(DbClass::Instance()->getTextFromDB($_POST['Table'],$_POST['ID'])));
}
else {
    echo("Something went wrong!");
}