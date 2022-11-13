<?php
include('PrepareClass.php');

header('Content-Type: application/json');


if (isset($_POST["type"]) == 'SaveToDb') {
    echo(json_encode(PrepareClass::Instance()->prepareDBAction($_POST["ID"])));
}