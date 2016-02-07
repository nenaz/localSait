<?php
	include_once('logs.php');
    include_once('constantsRU_inc.php');
    include_once('functions_inc.php');
    // session_start();
    include('mysql_inc.php');
	if(isset($_GET['filmName'])){
		$filmName = urlencode($_GET['filmName']);
		// $idFilm = $_POST['id'];
		$search = str_replace(" ", "+", $filmName);
		// $post = true;
		$post = false;
		// Logs('$_GET[filmName] != null', '$post == true');
	}else {
		$filmName = $argv[1];
		$search = str_replace("_", "+", $filmName);
		$post = false;
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
		'genre' =>        '#<span itemprop="genre">(.*?)</span>#si',
		'rus_premiere' => '#data-ical-type=\"rus\"(.*?)data-date-premier-start-link=#si',
		'acts' =>         '#<ul><li itemprop=\"actors\">(.*?)</li></ul>#si',
		'MPAA' =>         '#рейтинг MPAA</td>(.*?)</td>#si',
		'time' =>         '#id=\"runtime\">(.*?)</td></tr>#si',
		'description' =>  '#<span class=\"_reachbanner_\">(.*?)</span>#si',
		'imdb' =>         '#IMDB:\s(.*?)</div>#si',
		'kinopoisk' => '#<span class="rating_ball">(.*?)</span>#si',
		'director' =>     '#<td itemprop="director">(.*?)</td>#si',
		'year' =>         '#<td class="type">год</td>(.*?)</td>#si',
		'picture_big' => '#onclick="openImgPopup((.*?));#si',
		'picture_small' => '#img width="205" src="(.*?)"#si',
        'country' => '#<div class="movieFlags">(.*?)<div id="photoBlock"#si'
	);
	$new=array();
	foreach($parse as $index => $value){
        preg_match($value,$result,$matches);
        if ($matches != null) {
            $new[$index]=preg_replace("#<a.+?>(.+?)</a>#si","$1",$matches[1]);
        }
	}
    preg_match_all('/title=\D+">/',$new['country'],$new_country);
    $new_country_str = str_replace(['title="','">'],'',implode(', ',$new_country[0]));
    $new_acters_str = str_replace(['</li><li itemprop="actors">','...'],', ',$new['acts']);
    $new_acters_mas = explode(', ', $new_acters_str);
    $new_genre = explode(' ', $new['genre']);
    $new_description = html_entity_decode(str_replace('&#151;','-',str_replace(['<div class="brand_words" itemprop="description">','</div>'],' ',$new['description'])));
    $rusPremiere = trim(str_replace(['data-ical-date="','"'],'',$new['rus_premiere']));
	preg_match("/(\d{1,2})\s(\D+)\s(\d{4})/",$new['rus_premiere'], $pass);
	$new_year = $pass[3];
	$new["picture_big"] = preg_replace("/(\(')||('\))/i", "", $new["picture_big"]); 
	$new["picture_small"] = preg_replace("/http:\/\/st.kp.yandex.net/i", "", $new["picture_small"]); 
	$url = PIC_URL.$new['picture_big'];
	$img = LOC_XAMP_FILMS.$new['picture_big'];
	file_put_contents($img, file_get_contents($url));
    $url = PIC_URL.$new['picture_small'];
	$path_pic_small = preg_replace('/iphone\d+_/','',str_replace('film_iphone','film_small',$new['picture_small']));
	$img = LOC_XAMP_FILMS.$path_pic_small;
	file_put_contents($img, file_get_contents($url));
	$name_film = str_replace("\n","",$new['name']);
	$director = $new['director'];
	$genre = $new['genre'];
	$total_time = str_replace("\n","",$new['time']);
    preg_match('/\d{1,3}\s\D{6}/',$new['time'],$new_time);
	$age = str_replace("\n","",$new['MPAA']);
    preg_match('/alt="\D+\d+/',$age,$new_age);
    $age = str_replace('alt="','',$new_age[0]);
	$premiere = $rusPremiere;
	$path_pic_big = $new['picture_big'];
	$name_eng = str_replace(["?",":","&nbsp;","\n"],"",$new['originalname']);
    $exe = '.mkv';
    if (isset($new['imdb'])) {
        $imdb = $new['imdb'];
        $kinopoisk = $new['kinopoisk'];
        $query_str_fields = ",IMDB,kinopoisk)";
        $query_str_value = ",'$imdb','$kinopoisk')";
    } else {
        $query_str_fields = ")";
        $query_str_value = ")";
    }
    $obj = [];
	if($post==false){
		$query = "INSERT INTO films(name_film,year_film,director,genre,total_time,age,people_date,other,id_acter,path_pic_big,path_pic_small,name_eng,exe,acters,country_film".$query_str_fields." 
		VALUE('$name_film','$new_year','$director','$genre','$new_time[0]','$age','$premiere','$new_description','$new_acters_str','$path_pic_big','$path_pic_small','$name_eng','$exe','$new_acters_str','$new_country_str'".$query_str_value;
		// Logs('query',$query);
        $res = mysqli_query($dbh, $query);
        $obj['res'] = true;
	}
	else {
		Logs('$post','false');
        $query = "UPDATE films SET premiere = '$premiere', other = '$other', path_pic = '$path_pic', acters = '$acte', name_eng = '$name_eng' WHERE id = $idFilm";
		$res = mysqli_query($dbh, $query);
	}
	// for($i=0; $i < count($new_acters_mas); $i++){
		// $item = $new_acters_mas[$i];
        // $sql = "SELECT * FROM acter where name='$item'";
		// $result = mysqli_query($dbh, $sql);
		// $num_rows = mysqli_num_rows($result);
		// if($num_rows==0){
			// $query = "INSERT INTO acter(name,originalName,dateA) VALUE('$item','','')";
			// $res = mysqli_query($dbh, $query);
		// }
	// }
	// $filmActer=array();
	// $i = 0;
	// $sql = "SELECT id FROM acter where name='$acter[0]' or name='$acter[1]' or name='$acter[2]' or name='$acter[3]' or name='$acter[4]' or name='$acter[5]' or name='$acter[6]' or name='$acter[7]' or name='$acter[8]' or name='$acter[9]'";
	// $result = mysqli_query($dbh, $sql);
	// while($row = mysqli_fetch_row($result)){
		// $filmActer[$i] = $row[0];
		// $i++;
	// }
	// if($name_eng == '' || $name_eng == 'undefined')$name = $name_film;
	// else $name = $name_eng;
	// $sql = "SELECT * FROM film_acter where id_film='$name'";
	// $result = mysqli_query($dbh, $sql);
		// $num_rows = mysqli_num_rows($result);
		// if($num_rows==0){
			// $query = "INSERT INTO film_acter(id_film,act1,act2,act3,act4,act5,act6,act7,act8,act9,act10) 
			// VALUE('$name','$filmActer[0]','$filmActer[1]','$filmActer[2]','$filmActer[3]','$filmActer[4]','$filmActer[5]','$filmActer[6]','$filmActer[7]','$filmActer[8]','$filmActer[9]')";
			// $res = mysqli_query($dbh, $query);
		// }
    // echo json_encode($obj);
    echo true;
?>