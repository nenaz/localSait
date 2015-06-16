<?php
	include_once('logs.php');
	session_start();
	include_once('constantsRU_inc.php');
	include_once('functions_inc.php');
	include('mysql_inc.php');
	/*$host='localhost';$database='films_db';$user='root';$pswd='';
	$dbh = mysql_connect($host, $user, $pswd); 
	mysql_select_db($database);
	mysql_query ("set character_set_client='utf8'", $dbh); 
	mysql_query ("set character_set_results='utf8'", $dbh); 
	mysql_query ("set collation_connection='utf8_general_ci'", $dbh);*/
	$func = $_POST['func'];
	//$scheme = $_POST['scheme'];
	switch ($func){
		case 'updateReyt':{
			$id = $_POST['id'];
			$num = $_POST['num'];
			break;
		}
		case 'add_film_acter_edit':{
			$nameF = $_POST['nameF'];
			$name1 = $_POST['name1'];
			$name2 = $_POST['name2'];
			$name3 = $_POST['name3'];
			$name4 = $_POST['name4'];
			$name5 = $_POST['name5'];
			$name6 = $_POST['name6'];
			$name7 = $_POST['name7'];
			$name8 = $_POST['name8'];	
			$name9 = $_POST['name9'];	
			$name10 = $_POST['name10'];
			$f_id = $_SESSION['f_id'];
			
			echo $f_id;
		}
		break;
		case 'add_film':{
			$name_film = $_POST['name_film'];
			$name_eng = $_POST['name_eng'];
			$year_film = $_POST['year_film'];
			$country_film = $_POST['country_film'];
			$director = $_POST['director'];
			$genre = $_POST['genre'];
			$total_time = $_POST['total_time'];
			$age = $_POST['age'];
			$premiere = $_POST['premiere'];	
			$other = $_POST['other'];	
			$path_pic = $_POST['path_pic'];
			$acter = 0;	
		}
		break;
		case 'add_acter':{
			$name_acter = $_POST['name_acter'];
			$name_eng = $_POST['name_eng'];
			$dateA = $_POST['dateA'];
		}
		break;
		case 'add_film_excel':{
			$name_film = $_POST['name_film'];
			$name_eng = $_POST['name_eng'];
			$year_film = $_POST['year_film'];
			$country_film = $_POST['country_film'];
			$director = $_POST['director'];
			$genre = $_POST['genre'];
			$total_time = $_POST['total_time'];
			$age = '';
			$premiere = '';	
			$other = '';	
			$path_pic = '';
			$acter = 0;	
		}//ya.mrnenaz@yandex.ru
		break;
		case 'pic_file':{
			$pic_file = $_POST['pic_file'];
			echo $pic_file;
			$url=$pic_file;
			$name="some_image.jpg";
		}
		break;
		case 'delete_film':
			$f_id = $_POST['id'];
			$query = "DELETE FROM films WHERE id='$f_id'";
			$res = mysqli_query($dbh, $query);
			if($res)Logs('DELETE FROM films WHERE id='.$f_id, 'delete OK');
			else Logs('DELETE FROM films WHERE id='.$f_id, 'delete ERROR');
		break;
	}
	
	if($func=='add_acter'){
		$result = mysqli_query($dbh, "SELECT * FROM acter where name=$name_acter");
		$num_rows = mysqli_query($dbh,$result);
		if($num_rows==0){
			$query = "INSERT INTO acter(name,originalName,dateA) VALUE('$name_acter','$name_eng','$dateA')";
			$res = mysqli_query($dbh,$query);
			if($res)echo 'Запись добавлена!';
			else echo 'Оrшибка при добавлении записи!';
		}
		else echo 'запись уже существует';
	}
	if($func=='add_film'){
		$query = "INSERT INTO films(name_film,year_film,country_film,director,genre,total_time,age,premiere,other,id_acter,path_pic,name_eng) VALUE('$name_film','$year_film','$country_film','$director','$genre','$total_time','$age','$premiere','$other','$acter','$path_pic','$name_eng')";
		$res = mysqli_query($dbh,$query);
		if($res)echo 'Запись добавлена!';
		else echo 'Ошибка при добавлении записи!';
	}
	if($func=='add_film_excel'){
		$query = "INSERT INTO films(name_film,year_film,country_film,director,genre,total_time,age,premiere,other,id_acter,path_pic,name_eng) VALUE('$name_film','$year_film','$country_film','$director','$genre','$total_time','$age','$premiere','$other','$acter','$path_pic','$name_eng')";
		$res = mysqli_query($dbh,$query);
		if($res)echo 'Запись добавлена!';
		else echo 'Ошибка при добавлении записи!';
	}
	
	if($func=='add_film_acter_edit'){
		$arrIdAct = array();
		for($i=1; $i<11; $i++){
			switch ($i){
				case 1:  $nameA = $_POST['name1'];break;
				case 2:  $nameA = $_POST['name2'];break;
				case 3:  $nameA = $_POST['name3'];break;
				case 4:  $nameA = $_POST['name4'];break;
				case 5:  $nameA = $_POST['name5'];break;
				case 6:  $nameA = $_POST['name6'];break;
				case 7:  $nameA = $_POST['name7'];break;
				case 8:  $nameA = $_POST['name8'];break;
				case 9:  $nameA = $_POST['name9'];break;
				case 10: $nameA = $_POST['name10'];break;
			}
			$qSelAct = "select id from acter where name='$nameA'";
			//echo $qSelAct;
			$resQSelAct = mysqli_query($dbh,$qSelAct);
			$rowIdActer = mysqli_fetch_array($dbh,$resQSelAct);
			$arrIdAct[] = $rowIdActer[0];			
			//echo $rowIdActer[0];
		}
		
		/*for($i=0; $i<10; $i++){
		 echo $arrIdAct[$i];
		}*/
		$query = "INSERT INTO film_acter(id_film,act1,act2,act3,act4,act5,act6,act7,act8,act9,act10) VALUE('$f_id','$arrIdAct[0]','$arrIdAct[1]','$arrIdAct[2]','$arrIdAct[3]','$arrIdAct[4]','$arrIdAct[5]','$arrIdAct[6]','$arrIdAct[7]','$arrIdAct[8]','$arrIdAct[9]')";
		$res = mysqli_query($dbh,$query);
		if($res){
			echo 'Запись добавлена!';
			$act = 1;
			$query2 = "UPDATE films SET acters = '$act' WHERE id = $f_id";
			$res2 = mysqli_query($dbh,$query2);
		}
		else echo 'Ошибка при добавлении записи!';
	}
	if($func=='updateReyt'){
		//echo "<div id='updateReyt' style='width:100px; height:100px; background-color:black; color:white;'>$id----$num</div>";
		$query2 = "UPDATE films SET reyting = $num WHERE id = $id";
		  //$query = "UPDATE films SET reyting = $num WHERE id = $f_id";
			$res2 = mysqli_query($dbh,$query2) or die("<div id='updateReyt' style='width:100px; height:100px; background-color:black; color:white;'>$id----$num</div>");
	}
?>