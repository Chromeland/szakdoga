<?php

class HTMLClass
{

    public static function createHTML($path,$content = '*'): bool
    {
        if (!file_exists($path)){
            file_put_contents($path,$content);
            return $path;
        }
        return false;
    }

    public static function moveUploadedRecources($path): string
    {

        // Create directory if it doesn't exist
        if (!file_exists($path)) {
            mkdir($path, 0777, true);
        }

//move picture to the the right folder too.
        $picSrc = '../public/assets/pictures';
        $vidSrc = '../public/assets/videos';
        $picPath = $path . "/pictures";
        $vidPath = $path . "/videos";

        self::copyFolder($picSrc, $picPath);
        self::copyFolder($vidSrc, $vidPath);
        return 'Success';
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