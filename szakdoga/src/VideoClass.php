<?php

class VideoClass
{
    public static function moveVideo($video): bool
    {
        $destination = '../public/assets/videos/';
        $target_file = $destination . basename($video["name"]);
        $videoFileType = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));

        // Check if file already exists
        if (file_exists($target_file)) {
            echo "Sorry, file already exists.";
            return false;
        }

        // Check file size
        if ($video["size"] > 500000000) { // 500 MB
            echo "Sorry, your file is too large.";
            return false;
        }

        // Allow certain video file formats
        if ($videoFileType != "mp4" && $videoFileType != "avi" && $videoFileType != "mov"
            && $videoFileType != "wmv" && $videoFileType != "flv" && $videoFileType != "webm") {
            echo "Sorry, only MP4, AVI, MOV, WMV, FLV, and WEBM files are allowed.";
            return false;
        }
        if (move_uploaded_file($video["tmp_name"], $target_file)) {
            return true;
        } else {
            echo "Sorry, there was an error uploading your file.";
            return false;
        }
    }

    public static function newProject($folder): bool
    {
        if (!$folder) {
            return false;
        }

        $files = glob($folder . '/*');
        foreach ($files as $file) {
            if (basename($file) === '.gitignore') {
                continue;
            } else if (is_file($file)) {
                unlink($file);
            }
        }
        return true;
    }

    public static function getVideoSrc($fileName): string
    {
        $absolute_path = 'http://kdbiy8.szakdolgozat.net/Szakdolgozat/szakdoga/public/';
        $filePath = 'assets/videos/' . $fileName;
        return $absolute_path . $filePath;
    }
}