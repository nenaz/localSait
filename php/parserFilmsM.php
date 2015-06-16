<?php
	include_once('logs.php');
	session_start();
	$nameEng = $_POST['nameEng'];
	$directorPOST = $_POST['director'];
	$search = urlencode($nameEng);
	$search = str_replace("+", "%20", $search);

	$user='nenaz';
	$password='nrai0gbd';
	function post($url,$post,$refer){
		if($post==null){$post=true;}
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
		Logs('url', $url);
		return $result;
	}
	post('http://www.fast-torrent.ru/user/login/','username='.$user.'&password='.$password.'&redirect_to=%2Fuser%2F','http://www.fast-torrent.ru');
	$result=post('http://www.fast-torrent.ru/search/'.$search.'/1.html',null,'http://www.fast-torrent.ru/search/'.$search.'/');

	$count = substr_count($result, '<span itemprop="alternativeHeadline">');
	Logs('count', $count);
	$cou=1;
	$bDownloadTrue = false;
	while($cou<=$count){
		$result = str_replace("\n","",$result);
		$result = str_replace("\t","",$result);
		$numPos =  strpos($result, '<strong>Режиссер</strong>');
		if($numPos<0){
			Logs('numPos<0 EXIT');
			$bDdownload = true;
			Continue;
		}
		
		$result = substr($result, $numPos);
		$numPosStart =  $numPos;
		$numPosEnd =  strpos($result, '</a>');
		$director = substr($result, 0, $numPosEnd);
		$director = str_replace("\n","",$director);
		$numPosStart = strpos($director, ' itemprop="actor">');
		$director = substr($director, $numPosStart+18);
		$result = substr($result, $numPosEnd);

		if($director == $directorPOST){
			$numPosStart = strpos($result, '<div class="film-foot"><a href="')+32;
			$numPosEnd =  strpos($result, '" target=');
			$pageDownload = substr($result, $numPosStart, $numPosEnd-$numPosStart);
			$bDownloadTrue = true;
			break;
		}
		else{
			$bDownloadTrue = false;
		}
		$cou++;
	}
	if($bDownloadTrue)	{?>
		<div id="downloadLink" style="float:left;"><a id="dLink" target="_blank" href="http://www.fast-torrent.ru<?php echo $pageDownload; ?>">Перейти на страницу скачивания</a></div>
	<?php }
	else {?>
		<div id="downloadLink" style="float:left;"><span>Не удалось найти такой фильм на <a href="www.fast-torrent.ru">FastTorrent.ru</a></span></div>
	<?php }
?>