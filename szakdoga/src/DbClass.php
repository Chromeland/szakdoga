<?php

class DbClass
{
    private static $instance;

    public static function Instance(): DbClass
    {
        if (!self::$instance) {
            self::$instance = new self();
        }

        return self::$instance;
    }


    public function saveTextToDB($id, $Type, $parentElement, $posX, $posY, $innerText, $Style = 'normal', $fontFamily = 'Arial', $fontColour = 'black', $fontSize = 12, $textFloat = 'left', $opacity = 1, $borderRadius = null, $borderStyle = null, $borderSize = null, $borderColor = null)
    {
        $tmp = explode("#", $id);
        $id = $tmp[0];

        $servername = "localhost:3306";
        $username = "BenceTeszt";
        $password = "123";
        $dbname = "szakdolgozat";

// Create connection
        $conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }

        $checkIfExists = $conn->query("SELECT * FROM `texts` WHERE `ID` = '" . $id . "'");
        //$result = $checkIfExists->fetch_array(MYSQLI_ASSOC);
        $rowCount = mysqli_num_rows($checkIfExists);
//checking if the element already exists
        if ($rowCount < 1) {
            $add = "INSERT INTO `texts` VALUES ('" . $id . "','" . $Type . "','" . $parentElement . "','" . $posX . "','" . $posY . "','" . $innerText . "','" . $Style . "','" . $fontFamily . "','" . $fontColour . "','" . $fontSize . "','" . $textFloat . "','" . $opacity . "'";
            if ($borderColor) {
                $add .= ",'" . $borderRadius . "','" . $borderStyle . "','" . $borderSize . "','" . $borderColor . "')";
                $conn->query($add);
                echo "New record created successfully";
            } else {
                $add .= ",NULL,NULL,NULL,NULL)";
                $conn->query($add);
                echo "New record created successfully";
            }

        } else {
            $update = "UPDATE `texts` SET `ID`= '$id',`Type`='$Type',`ParentElement`='$parentElement',`Position-x`='$posX',`Position-y`='$posY',`InnerText`='$innerText',`Style`='$Style',`FontFamily`='$fontFamily',`FontColor`='$fontColour',`FontSize`='$fontSize',`Text-Float`='$textFloat',`Opacity`='$opacity',`Border-Radius`='$borderRadius',`Border-Style`='$borderStyle',`Border-Size`='$borderSize',`Border-Color`='$borderColor' WHERE `ID` = '$id'";
            $conn->query($update);
            echo "Record update successful";
        }
        $conn->close();
        return true;
    }

    public function getTextFromDB($table, $id)
    {
        $servername = "localhost:3306";
        $username = "BenceTeszt";
        $password = "123";
        $dbname = "szakdolgozat";

        // Create connection
        $conn = new mysqli($servername, $username, $password, $dbname);
        // Check connection
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }

        $checkIfExists = $conn->query("SELECT * FROM $table WHERE `ID` = '" . $id . "'");
        $rowCount = mysqli_num_rows($checkIfExists);
        //checking if the element already exists
        if ($rowCount < 1) {
            $conn->close();
            return "Error";
        } else {
            $result[] = $checkIfExists->fetch_array(MYSQLI_ASSOC);
            $conn->close();
            foreach ($result as $elements) {
                foreach ($elements as $details) {
                    $getResult[] = $details;
                    $retString = implode(',', $getResult);
                }
            }
            return $getResult;
        }
    }
}