<?php
    include_once('logs.php');
    $fileName = $_POST['fileName'];
    $catalogPath = 'D:\\Films\\';
    // Logs('start', "start c:\KMPlayer\KMPlayer.exe ".$catalogPath.$fileName);
    if(file_exists(mb_convert_encoding($catalogPath.$fileName, 'Windows-1251', 'UTF-8'))){
        exec("start taskkill /IM KMPlayer.exe");
        exec("start c:\KMPlayer\KMPlayer.exe ".$catalogPath.$fileName);
        echo true;
    } else {
        echo false;
    }
?>