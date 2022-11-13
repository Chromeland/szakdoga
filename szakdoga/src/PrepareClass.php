<?php

class PrepareClass
{

    public static function Instance()
    {
        static $inst = null;
        if ($inst === null) {
            $inst = new AnytoolsClass();
        }
        return $inst;
    }

    public function prepareDBAction($id)
    {
        $db = DB::Instance();

        /* $query = "INSERT INTO `texts`(`ID`) VALUES ('Akarmi')";
         $db->query('szakdolgozat', $query);*/
    }
}