<?php
	session_start();
	$host='localhost';$database='films_db';$user='root';$pswd=''; 
	$dbh = mysql_connect($host, $user, $pswd); 
	mysql_select_db($database);
	mysql_query ("set character_set_client='utf8'", $dbh); 
	mysql_query ("set character_set_results='utf8'", $dbh); 
	mysql_query ("set collation_connection='utf8_general_ci'", $dbh);
	echo '<link rel="stylesheet" href="test_css.css" type="text/css">';
	echo '<script src="test_js.js" type="text/javascript" ></script>';
$viewEdit = $_POST['func'];
$titleAdd = 'Добавить запись';
	switch($viewEdit){
		case 'add_acter':{
			$id1 = 'name_acter';
			$id2 = 'name_eng';
			$id3 = 'dateA';
			$title = 'Добавление нового актера в БД';
			$title1 = 'Полное имя';
			$title2 = 'Имя в оригинаде';
			$title3 = 'Полная дата рождения';
			$class = 'film_to_acter';
		}
		break;
		case 'add_film_acter_edit':{
			$f_id = $_POST['f_id'];
			$f_name = $_POST['f_name'];
			
			$query = "SELECT id_film FROM film_acter WHERE id_film = $f_id";
			$res = mysql_query($query);
			$f_count = mysql_num_rows($res);
			if($f_count>0){$_title = 'У фильма уже есть список актеров.'; echo '<span>'.$_title.'</span>'; exit();}
			else {
			$_SESSION['f_id'] = $f_id;
			$title = 'Сопоставление фильмов и актеров к ним(пока ручное) Список актеров будет выводиться от первого к последнему';
			$title1 = $f_name;
			$title2=$title3=$title4=$title5=$title6=$title7=$title8=$title9=$title10=$title11 = 'Имя актера';
			$id1 = 'nameF';
			$id2 = 'name1';
			$id3 = 'name2';
			$id4 = 'name3';
			$id5 = 'name4';
			$id6 = 'name5';
			$id7 = 'name6';
			$id8 = 'name7';
			$id9 = 'name8';
			$id10 = 'name9';
			$id11 = 'name10';
			$class = 'film_to_acter';
			$eval = $viewEdit;}
		}
		break;
		case 'add_film':{
			$title = 'Добавление нового фильма и его описания';
			$title1 = 'Название фильма';
			$title2 = 'Оригинальное название';
			$title3 = 'Год выхода';
			$title4 = 'Страна';
			$title5 = 'Режиссер';
			$title6 = 'Жанр';
			$title7 = 'Время';
			$title8 = 'Возрастная категория';
			$title9 = 'Премьера';
			$title10 = 'Описание';
			$id1 = 'name_film';
			$id2 = 'name_eng';
			$id3 = 'year_film';
			$id4 = 'country_film';
			$id5 = 'director';
			$id6 = 'genre';
			$id7 = 'total_time';
			$id8 = 'age';
			$id9 = 'premiere';
			$id10 = 'other';
			$class = 'add_info_film';
			$eval = 'make_change('+$viewEdit+')';
		}
		break;
	}
	switch($viewEdit){
		case 'add_film_acter_edit':
		case 'add_film':
		case 'add_acter':{
	?>
		<span><?php echo $title ?></span><br/>
	<div id="names" style="float:left;">
		<?php
		if($viewEdit=='add_acter'){
			?>
			<input type="text" id="<?php echo $id1 ?>" value="<?php echo $title1 ?>" class="<?php echo $class ?>"/><input type="button" onclick="cl('<?php echo $title1 ?>','<?php echo $id1 ?>');"/><br/>
			<?php
		}
		else {
			?>
			<input type="text" id="<?php echo $id1 ?>" value="<?php echo $title1 ?>" class="<?php echo $class ?>"/><br/>
			<?php
		}
		?>
		
		<input type="text" id="<?php echo $id2 ?>" value="<?php echo $title2 ?>" class="<?php echo $class ?>"/><input type="button" onclick="cl('<?php echo $title2 ?>','<?php echo $id2 ?>');"/><br/>
		<input type="text" id="<?php echo $id3 ?>" value="<?php echo $title3 ?>" class="<?php echo $class ?>"/><input type="button" onclick="cl('<?php echo $title3 ?>','<?php echo $id3 ?>');"/><br/>
		<?php
		}
		break;
	}
	switch($viewEdit){
		case 'add_film_acter_edit':
		case 'add_film':{
		?>
		<input type="text" id="<?php echo $id4 ?>" value="<?php echo $title4 ?>" class="<?php echo $class ?>" onfocus="infocus(this);" onblur="notfocus(this);"/><input type="button" onclick="cl('<?php echo $title4 ?>','<?php echo $id4 ?>');"/><br/>
		<input type="text" id="<?php echo $id5 ?>" value="<?php echo $title5 ?>" class="<?php echo $class ?>" onfocus="infocus(this);" onblur="notfocus(this);"/><input type="button" onclick="cl('<?php echo $title5 ?>','<?php echo $id5 ?>');"/><br/>
		<input type="text" id="<?php echo $id6 ?>" value="<?php echo $title6 ?>" class="<?php echo $class ?>" onfocus="infocus(this);" onblur="notfocus(this);"/><input type="button" onclick="cl('<?php echo $title6 ?>','<?php echo $id6 ?>');"/><br/>
		<input type="text" id="<?php echo $id7 ?>" value="<?php echo $title7 ?>" class="<?php echo $class ?>" onfocus="infocus(this);" onblur="notfocus(this);"/><input type="button" onclick="cl('<?php echo $title7 ?>','<?php echo $id7 ?>');"/><br/>
		<input type="text" id="<?php echo $id8 ?>" value="<?php echo $title8 ?>" class="<?php echo $class ?>" onfocus="infocus(this);" onblur="notfocus(this);"/><input type="button" onclick="cl('<?php echo $title8 ?>','<?php echo $id8 ?>');"/><br/>
		<input type="text" id="<?php echo $id9 ?>" value="<?php echo $title9 ?>" class="<?php echo $class ?>" onfocus="infocus(this);" onblur="notfocus(this);"/><input type="button" onclick="cl('<?php echo $title9 ?>','<?php echo $id9 ?>');"/><br/>
		<?php
		}
	}
	switch($viewEdit){
		case 'add_film_acter_edit':{?>
			<input type="text" id="<?php echo $id10 ?>" value="<?php echo $title10 ?>" class="<?php echo $class ?>" onfocus="infocus(this);" onblur="notfocus(this);"/><input type="button" onclick="cl('<?php echo $title10 ?>','<?php echo $id10 ?>');"/><br/>
			<input type="text" id="<?php echo $id11 ?>" value="<?php echo $title11 ?>" class="<?php echo $class ?>" onfocus="infocus(this);" onblur="notfocus(this);"/><input type="button" onclick="cl('<?php echo $title11 ?>','<?php echo $id11 ?>');"/><br/>
		<?php
		}
		break;
		case 'add_film':{?>
		<textarea id="<?php echo $id10 ?>" class="<?php echo $class ?>" style="height:140px;" placeholder="<?php echo $title10 ?>" onfocus="infocus(this);"></textarea><br/>
	</div>
	<div>
		<!--img id="f_picture" style="width:205px; height:290px;" src="http://localhost:8008/films2/pictures/empty.jpg"/><br/-->
		<input type="file" id="pic_file" value="http://localhost:8008/films2/pictures/"/>
	</div><br/>
		<?php
		}
		break;
	}
	if($viewEdit == 'add_film_acter' || $viewEdit == 'add_acter'){
	?>
	<div style="background-color:black;">
		<input type="button" value="<?php echo $titleAdd ?>" onclick="make_change('<?php echo $viewEdit; ?>'); clearHTML();"/>
	</div><?php } ?>
	<div id='acterForFilms' style="overflow: auto; width: 317px; max-height: 530px;">
<?php	
	switch($viewEdit){
		case 'add_film_acter':{
			//$query = "SELECT id, name_film FROM films";
			//$res = mysql_query($query);
			?>
			<div style="width:300px; background-color:red;" id="filmsTab">
			<?php
			//while($row_film = mysql_fetch_array($res)){
				//$query2 = "SELECT id_film FROM film_acter";
				$query = "SELECT id, name_film FROM films WHERE acters = 0";
				$res = mysql_query($query);
				while($row_film = mysql_fetch_array($res)){
				?>
				<div style="background-color:white; margin-left:3px; border: solid black 1px; width:290px; height:40px;" onDblClick="go_action('add','film_acter_edit',this);">
					<span style="display:none;"><?php echo $row_film[0]; ?></span>
					<span><center><?php echo $row_film[1]; ?></center></span>
				</div><br/>
				<?php
				}
			?>
			</div>
			<?php
		}
		break;
		case 'add_acter_view':{
			?>
			<div style="width:300px; background-color:red;" id="filmsTab">
			<?php
				$query = "SELECT id, name, originalName FROM acter order by name";
				$res = mysql_query($query);
				while($row_film = mysql_fetch_array($res)){
				?>
				<div style="background-color:white; margin-left:3px; border: solid black 1px; width:290px; height:20px;" onDblClick="go_action('add','acter_view_edit',this);">
					<span style="display:none;"><?php echo $row_film[0]; ?></span>
					<span><?php echo $row_film[1]; ?></span>
				</div>
				<?php
				}
			?>
			</div>
			<?php
		}
		break;
	}
?>	
	</div>