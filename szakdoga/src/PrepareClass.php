<?php

include('DB.php');

header('Content-Type: application/json');

$aResult = array();

if (!isset($_POST['functionname'])) {
    $aResult['error'] = 'No function name!';
}

if (!isset($_POST['arguments'])) {
    $aResult['error'] = 'No function arguments!';
}

if (!isset($aResult['error'])) {

    switch ($_POST['functionname']) {
        case 'prepareDBAction':
            if (!is_array($_POST['arguments'])) {
                $aResult['error'] = 'Error in arguments!';
            } else {
                $aResult['result'] = prepareDBAction(($_POST['arguments'][0]));
            }
            break;

        default:
            $aResult['error'] = 'Not found function ' . $_POST['functionname'] . '!';
            break;
    }

}

echo json_encode($aResult);

function prepareDBAction($id)
{
    $db = DB::Instance();

    $query = "INSERT INTO `texts`(`ID`) VALUES ('Akarmi')";
    return $db->query('szakdolgozat', $query);


}