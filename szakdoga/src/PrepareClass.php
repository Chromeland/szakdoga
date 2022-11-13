<?php

include('DB.php');

class PrepareClass
{

    public static function Instance()
    {
        static $inst = null;
        if ($inst === null) {
            $inst = new PrepareClass();
        }
        return $inst;
    }

    public function prepareDBAction($id)
    {
        $db = DB::Instance();

//        $query = "INSERT INTO `texts`(`ID`) VALUES ('Akarmi')";
//        $db->query('szakdolgozat', $query);
        return true;
    }
}