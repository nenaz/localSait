<?php
	include_once('logs.php');
	include('constantsRU_inc.php');
	//session_start();
	if(isset($_POST['filmName'])){
		Logs('parserFilms2.php', 'parserFilms2.php');
		$filmName = urlencode($_POST['filmName']);
		$idFilm = $_POST['id'];
		$search = str_replace(" ", "+", $filmName);
		$post = true;
		Logs('$_POST[filmName] != null', '$post == true');
	}else {
		$filmName = $argv[1];
		$search = str_replace("_", "+", $filmName);
		$post = false;
		Logs('$_POST[filmName] == null', '$post == false');
	}
	if($post==false){
		$exe = '.'.pathinfo($search, PATHINFO_EXTENSION);
		if($exe=='') $exe = MKV;
		$exe = '.'.pathinfo($search, PATHINFO_EXTENSION);
	}

	$user=KP_USER;
	$password=KP_PASS;
	function post($url,$post,$refer){
		if($post==null) $post=false;
		$ch = curl_init($url);
		curl_setopt($ch, CURLOPT_USERAGENT, "Mozilla/5.0 (Windows; U; Windows NT 5.1; ru; rv:1.9.0.4) Gecko/2008102920 AdCentriaIM/1.7 Firefox/3.0.4");
		curl_setopt($ch, CURLOPT_HEADER, 0);
		curl_setopt($ch, CURLOPT_POSTFIELDS, $post);
		curl_setopt($ch, CURLOPT_REFERER, $refer);
		curl_setopt($ch, CURLOPT_COOKIEJAR, "./cookie.txt");
		curl_setopt($ch, CURLOPT_COOKIEFILE, "./cookie.txt");
		curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
		$result  = curl_exec($ch);
		return $result;
	}

	//Logs('FFFFFFFFF', $search);
	post('http://www.kinopoisk.ru/level/30/','shop_user[login]='.$user.'&shop_user[pass]='.$password.'&shop_user[mem]=on&auth=%E2%EE%E9%F2%E8+%ED%E0+%F1%E0%E9%F2','http://www.kinopoisk.ru');
	//$result=post('http://www.kinopoisk.ru/level/1/film/'.$m[0].'/',null,'http://www.kinopoisk.ru/');
	$result=post('http://www.kinopoisk.ru/index.php?first=no&what=&kp_query='.$search,null,'http://www.kinopoisk.ru/');
	$result= iconv("cp1251", "utf-8", $result);
	
	$searchParse=array(
		'id' => '#element most_wanted(.*?)</li>#si',
	);
	
	$sr=array();
	foreach($searchParse as $index => $value){
		preg_match($value,$result,$searchMas);
		$sr[$index]=preg_replace("#.+?<a.+?href=.+?(\d{2,6})/.{20,40}#si","$1",$searchMas[1]);
	}

	$result=post(KP_L1.$sr['id'].'/',null,KP_URL);
	$result= iconv("cp1251", "utf-8", $result);
	$parse=array(
		'name' =>         '#<h1 class=\"moviename-big\" itemprop=\"name\">(.*?)</h1>#si',
		'originalname'=>  '#<span itemprop=\"alternativeHeadline\">(.*?)</span>#si',
		'script' =>       '#сценарий</td><td>(.*?)</td></tr>#si',
		'genre' =>        '#жанр</td><td>(.*?)</td></tr>#si',
		'rus_premiere' => '#data-ical-type=\"rus\"(.*?)data-date-premier-start-link=#si',
		'acts' =>         '#<ul><li itemprop=\"actors\">(.*?)</li></ul>#si',
		'MPAA' =>         '#рейтинг MPAA</td>(.*?)</td>#si',
		'time' =>         '#id=\"runtime\">(.*?)</td></tr>#si',
		'description' =>  '#<span class=\"_reachbanner_\">(.*?)</span>#si',
		'imdb' =>         '#IMDB:\s(.*?)</div>#si',
		'country' =>      '#<td class="type">страна</td>(.*?)</td>#si',
		'director' =>     '#<td itemprop="director">(.*?)</td>#si',
		'year' =>         '#<td class="type">год</td>(.*?)</td>#si',
		'picture' =>      '#onclick="openImgPopup((.*?)); return false#si'
	);
 
	$new=array();
	$acter=array();
	foreach($parse as $index => $value){
		preg_match($value,$result,$matches);
		$new[$index]=preg_replace("#<a.+?>(.+?)</a>#si","$1",$matches[1]);
	}
	$acts = $new['acts'];
	$pos2 = strpos($acts, '</li>', 0);
	$acter[0] = substr($acts, 0, $pos2);
	$acts = substr($acts, $pos2+5);

	for($i=0; $i < 10; $i++){
			$pos1 = strpos($acts, '<li itemprop="actors">',0);		
			$acts = substr($acts, $pos1+22);
			$pos2 = strpos($acts, '</li>', $pos1);
			$acter[$i+1] = substr($acts, $pos1, $pos2);
			$acts = substr($acts, $pos2+5);
	}

	$pos1 = strpos($new['genre'], '<span itemprop="genre">')+23;
	$pos2 = strpos($new['genre'], '</span>');
	$genre = substr($new['genre'], $pos1, $pos2-$pos1);
	
	$pos1 = strpos($new['description'], 'description">')+13;
	$pos2 = strpos($new['description'], '</span>');
	$description = substr($new['description'], $pos1, $pos2-$pos1);
	
	$pos1 = strpos($new['rus_premiere'], 'data-ical-date="')+16;
	$pos2 = strpos($new['rus_premiere'], '"', $pos1);
	$rusPremiere = substr($new['rus_premiere'], $pos1, $pos2-$pos1);
	
	preg_match("/(\d{1,2})\s(\D+)\s(\d{4})/",$new['rus_premiere'], $pass);
	$pass[2]= str_replace(" ","",$pass[2]);
	function datadata($month){
		switch($month){
			case 'января':   $month = '01';break;
			case 'февраля':  $month = '02';break;
			case 'марта':    $month = '03';break;
			case 'апреля':   $month = '04';break;
			case 'мая':      $month = '05';break;
			case 'июня':     $month = '06';break;
			case 'июля':     $month = '07';break;
			case 'августа':  $month = '08';break;
			case 'сентября': $month = '09';break;
			case 'октября':  $month = '10';break;
			case 'ноября':   $month = '11';break;
			case 'декабря':  $month = '12';break;
		}
		return $month;
	}
	$month = datadata($pass[2]);
	$rusPremiere = str_replace(" ","",$pass[3]).'-'.$month.'-'.str_replace(" ","",$pass[1]);
	
	$new['country'] = str_replace(" ","",$new['country']);
	$new['country'] = str_replace("\n","",$new['country']);
	$pos1 = strpos($new['country'], 'relative">')+10;
	$pos2 = strpos($new['country'], '</div>', $pos1);
	$country = substr($new['country'], $pos1, $pos2-$pos1);
	
	$new['year'] = str_replace(" ","",$new['year']);
	$new['year'] = str_replace("\n","",$new['year']);
	$pos1 = strpos($new['year'], 'relative">')+10;
	$pos2 = strpos($new['year'], '</div>', $pos1);
	$year = substr($new['year'], $pos1, $pos2-$pos1);
	
	$new['picture'] = str_replace("('", "", $new['picture']);
	$new['picture'] = str_replace("')", "", $new['picture']);
	
	$url = PIC_URL.$new['picture'];
	$img = LOC_XAMP_FILMS.$new['picture'];

	file_put_contents($img, file_get_contents($url));
	
	include ('mysql_inc.php');
	
	$name_film = str_replace("\n","",$new['name']);
	$year_film = $year;
	$country_film = $country;
	$director = $new['director'];
	$genre = $genre;
	$total_time = str_replace("\n","",$new['time']);
	$age = str_replace("\n","",$new['MPAA']);
	$premiere = $rusPremiere;
	$other = str_replace("\n","",$description);
	$acte = '1';
	$path_pic = $new['picture'];
	$name_eng = str_replace("\n","",$new['originalname']);
	$name_eng = str_replace("&nbsp;"," ",$name_eng);
	$name_eng = str_replace(":","",$name_eng);
	$name_eng = str_replace("?","",$name_eng);
	//Logs('name_eng', $name_eng);
	
	if($post==false){
		$query = "INSERT INTO films(name_film,year_film,country_film,director,genre,total_time,age,premiere,other,id_acter,path_pic,name_eng,exe,acters) 
		VALUE('$name_film','$year_film','$country_film','$director','$genre','$total_time','$age','$premiere','$other','$acte','$path_pic','$name_eng','$exe','$acte')";
		$res = mysqli_query($dbh, $query);
		/*if($res) Logs('OK', 'OK insert films!');
		else Logs('ERROR', 'not insert films!');*/
	}
	else {
		$query = "UPDATE films SET premiere = '$premiere', other = '$other', path_pic = '$path_pic', acters = '$acte', name_eng = '$name_eng' WHERE id = $idFilm";
		$res = mysqli_query($dbh, $query);
		/*if($res)  Logs('OK', 'OK update films!');
		else Logs('ERROR', 'not update films!');*/
	}
	
	for($i=0; $i<10; $i++){
		$sql = "SELECT * FROM acter where name='$acter[$i]'";
		$result = mysqli_query($dbh, $sql);
		$num_rows = mysqli_num_rows($result);
		if($num_rows==0){
			$query = "INSERT INTO acter(name,originalName,dateA) VALUE('$acter[$i]','','')";
			$res = mysqli_query($dbh, $query);
		}
	}
	
	$filmActer=array();
	$i = 0;
	$sql = "SELECT id FROM acter where name='$acter[0]' or name='$acter[1]' or name='$acter[2]' or name='$acter[3]' or name='$acter[4]' or name='$acter[5]' or name='$acter[6]' or name='$acter[7]' or name='$acter[8]' or name='$acter[9]'";
	$result = mysqli_query($dbh, $sql);
	while($row = mysqli_fetch_row($result)){
		$filmActer[$i] = $row[0];
		$i++;
	}

	if($name_eng == '' || $name_eng == 'undefined')$name = $name_film;
	else $name = $name_eng;
	//Logs('name', $name);
	$sql = "SELECT * FROM film_acter where id_film='$name'";
	$result = mysqli_query($dbh, $sql);
		$num_rows = mysqli_num_rows($result);
		//Logs('num_rows', $num_rows);
		if($num_rows==0){
			$query = "INSERT INTO film_acter(id_film,act1,act2,act3,act4,act5,act6,act7,act8,act9,act10) 
			VALUE('$name','$filmActer[0]','$filmActer[1]','$filmActer[2]','$filmActer[3]','$filmActer[4]','$filmActer[5]','$filmActer[6]','$filmActer[7]','$filmActer[8]','$filmActer[9]')";
			$res = mysqli_query($dbh, $query);
		}
?>