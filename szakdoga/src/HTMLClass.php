<?php

class HTMLClass
{
    public static function moveDownloadedFile($filename, $path): bool
    {
        // Create directory if it doesn't exist
        if (!file_exists($path)) {
            mkdir($path, 0777, true);
        }

        //move picture to the the right folder too.
        $picSrc = 'C:\xampp\htdocs\szakdolgozat\szakdoga\public\assets\pictures';
        $vidSrc = 'C:\xampp\htdocs\szakdolgozat\szakdoga\public\assets\videos';
        $picPath = $path . "/pictures";
        $vidPath = $path . "/videos";

        // Move file to destination
        $filePath = getenv('USERPROFILE') . DIRECTORY_SEPARATOR . 'Downloads' . DIRECTORY_SEPARATOR . $filename;
        $destination = $path . '/' . $filename;
        if (file_exists($filePath)) {
            if (rename($filePath, $destination)) {
                self::copyFolder($picSrc,$picPath);
                self::copyFolder($vidSrc,$vidPath);
                return true;
            }
        }
        return false;
    }

    public static function copyFolder($src, $dst): void
    {
        // Open the source directory
        $dir = opendir($src);

        if (!is_dir($dst)) {
            mkdir($dst);
        }

        // Loop through the files in the source directory
        while ($file = readdir($dir)) {
            if ($file != '.' && $file != '..') {
                $srcFile = $src . '/' . $file;
                $dstFile = $dst . '/' . $file;

                // Recursively copy a subdirectory
                if (is_dir($srcFile)) {
                    self::copyFolder($srcFile, $dstFile);
                } else {
                    // Copy a file
                    copy($srcFile, $dstFile);
                }
            }
        }
        // Clean up
        closedir($dir);
    }

}