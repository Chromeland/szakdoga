<?php

class PictureClass
{

    public static function moveUploadedPicture($file): string
    {
        $tempFilePath = $file['tmp_name'];
        $newFilePath = 'C:/xampp/htdocs/szakdolgozat/szakdoga/public/assets/pictures/' . $file['name'];
        if (move_uploaded_file($tempFilePath, $newFilePath)) {
            return $newFilePath;
        }else{
            return "Error";
        }
    }

    public static function checkImages($directory): array
    {
        $images = [];
        if (is_dir($directory)) {
            $files = scandir($directory);
            foreach ($files as $file) {
                $path = $directory . '/' . $file;
                if (is_file($path) && in_array(pathinfo($path, PATHINFO_EXTENSION), ['jpg', 'jpeg', 'png', 'gif'])) {
                    $images[] = $file;
                }
            }
        }
        return $images;
    }
}