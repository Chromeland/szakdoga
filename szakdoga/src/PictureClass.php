<?php
$pictreFilePath = 'C:/xampp/htdocs/szakdolgozat/szakdoga/public/assets/pictures/';
class PictureClass
{

    public static function moveUploadedPicture($file): string
    {
        global $pictreFilePath;
        $tempFilePath = $file['tmp_name'];
        $newFilePath = $pictreFilePath . $file['name'];
        if (move_uploaded_file($tempFilePath, $newFilePath)) {
            return $newFilePath;
        } else {
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

    public static function deleteImage($file): string
    {
        global $pictreFilePath;
        $picToDelete = $pictreFilePath . '/' . $file;
        if (file_exists($picToDelete)) {
            unlink($picToDelete);
            return 'Picture deleted successfully.';
        } else {
            return 'Picture not found.';
        }
    }

    public static function newProject($folder): string
    {
        if (!$folder){
            return 'Error';
        }

        $files = glob($folder . '/*');
        foreach ($files as $file) {
            if (basename($file) === '.gitignore') {
                continue;
            }
            else if (is_file($file)) {
                unlink($file);
            }
        }
        return 'Success';
    }
}