<?php
include_once('logs.php');
$fileName = $_POST['fileName'];
$filmsPath = $_POST['filmsPath'];
$name = $_POST['name'];
$exe = $_POST['exe'];
$name = '\\'.$name;
$queryString=str_replace (' ','_',$name);
$filmsPath = $filmsPath.$queryString.$exe;
Logs('filmsPath', $filmsPath);
if(file_exists(mb_convert_encoding($filmsPath, 'Windows-1251', 'UTF-8'))){
//if(file_exists($filmsPath)){
	$h = fopen($fileName,"w");
	$filmsPath = mb_convert_encoding($filmsPath, 'CP866');
	Logs('mb_convert_encoding filmsPath', $filmsPath);
	$text = "cd \ 
	C:\
	cd Program Files (x86)\The KMPlayer\ 
	start KMPlayer.exe ".$filmsPath;
	$text = $text." 
	del D:\Films\_film.bat";
	if (fwrite($h,$text))echo '1';
	else echo '2';
	fclose($h);
}
else echo '3';
?>