<?php

// require_once('Loader.php');

header('Content-Type: application/json');

$json = file_get_contents('php://input');

if ($_POST["type"] == 'SaveToDb') {
    echo(json_encode(PrepareClass::Instance()->prepareDBAction($_POST["ID"])));
}