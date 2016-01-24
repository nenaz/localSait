<?php
include_once('logs.php');
$fileName = $_POST['fileName'];
// $catalogPath = $_POST['catalogPath'];
$catalogPath = 'D:\\Films\\';
Logs('start', "start c:\KMPlayer\KMPlayer.exe ".$catalogPath.$fileName);
// $name = $_POST['name'];
// $exe = $_POST['exe'];
// $name = '\\'.$name;
// $queryString=str_replace (' ','_',$name);
// $filmsPath = $filmsPath.$queryString.$exe;
// Logs('filmsPath', $filmsPath);
// if(file_exists(mb_convert_encoding($filmsPath, 'Windows-1251', 'UTF-8'))){
	// $h = fopen($fileName,"w");
	// $filmsPath = mb_convert_encoding($filmsPath, 'CP866');
	// Logs('mb_convert_encoding filmsPath', $filmsPath);
	// $text = "cd \ 
	// C:\
	// cd Program Files (x86)\The KMPlayer\ 
	// start KMPlayer.exe ".$filmsPath;
	// $text = $text." 
	// del D:\Films\_film.bat";
	// if (fwrite($h,$text))echo '1';
	// else echo '2';
	// fclose($h);
// }
// else echo '3';

    if(file_exists(mb_convert_encoding($catalogPath.$fileName, 'Windows-1251', 'UTF-8'))){
        exec("start taskkill /IM KMPlayer.exe");
        exec("start c:\KMPlayer\KMPlayer.exe ".$catalogPath.$fileName);
        echo true;
    } else {
        echo false;
    }
?>