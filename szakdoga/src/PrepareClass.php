<?php

include('DB.php');

class PrepareClass
{

    public function prepareDBAction($id)
    {
        $db = DB::Instance();

        $query = "INSERT INTO `texts`(`ID`) VALUES ('Akarmi')";
        return $db->query('szakdolgozat', $query);

    }
}