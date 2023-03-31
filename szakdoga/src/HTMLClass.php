<?php

class HTMLClass
{
    public static function moveDownloadedFile($filename, $path): bool
    {
        // Create directory if it doesn't exist
        if (!file_exists($path)) {
            mkdir($path, 0777, true);
        }

        // Move file to destination
        $filePath = getenv('USERPROFILE') . DIRECTORY_SEPARATOR . 'Downloads' . DIRECTORY_SEPARATOR . $filename;
        $destination = $path . '/' . $filename;
        if (file_exists($filePath)) {
            echo('Léterik');
        }
        if (rename($filePath, $destination)) {
            return true;
        } else {
            return false;
        }
    }
}