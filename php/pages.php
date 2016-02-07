<?php
	include_once('logs.php');
	session_start();
	include_once('constantsRU_inc.php');
	include_once('functions_inc.php');
	include('mysql_inc.php');
	$page = $_GET['page'];
	$navPage = $_GET['navPage'];
	$titleAdd = 'Добавить запись';
	$count = $_GET['globalCountPicture'];
	$limit = $count * ($navPage - 1);
	$i=0;
	// Logs('page', $page);
	// Logs('navPage', $navPage);
	// Logs('limit', $limit);
	
	if (mysqli_connect_errno($dbh)){
		echo "Failed to connect to MySQL:" . mysqli_connect_error();
	}
	$query = "SELECT * FROM films order by id DESC LIMIT $limit, $count ";
	// $query = "SELECT * FROM films";
	$res = mysqli_query($dbh, $query);
	
	while($row = mysqli_fetch_array($res)){
		$i++;
        // Logs('i', $i);
			$nameF = FILMS_PATH.str_replace(" ", "_", $row[12]).$row[13];
			$bgc = '';
			if((!file_exists($nameF)) && (!file_exists(mb_convert_encoding($nameF, 'Windows-1251', 'UTF-8')))){
				$bgc =  "bacground-color:red;";
			}
			
			$obj['blockFilms']['film-'.$i]['count'] = $i;
			$obj['blockFilms']['film-'.$i]['posterId'] = $row[0];
			$obj['blockFilms']['film-'.$i]['page'] = $page;
			$obj['blockFilms']['film-'.$i]['exeName'] = $row['exe'];
			$obj['blockFilms']['film-'.$i]['title'] = $row['name_eng'];
			$obj['blockFilms']['film-'.$i]['src_big'] = $row['path_pic_big'];
			$obj['blockFilms']['film-'.$i]['src_small'] = $row['path_pic_small'];
			$obj['blockFilms']['film-'.$i]['rating'] = $row['kinopoisk'];
	}
	$obj['blockFilmsCount'] = $i;
	echo json_encode($obj);
?>	