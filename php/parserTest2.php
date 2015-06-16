<form method='get'>
<input type='text' name='id' value='<?php echo $m[0];?>' size="40"/>
<input type='submit' value='get' name='submit'/>
</form>
<?php
#################################
# Kinopoisk.ru parser
# by #Wolf#
# http://wolf-et.ru/
#################################
if(empty($_REQUEST['id'])){die("die");}
header ("Content-type: text/html; charset=utf-8");
$user='nenaz';
$password='nrai0gbd';
   function post($url,$post,$refer)
    {
    if($post==null){$post=false;}
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
    preg_match('#([0-9]{2,7})#',$_REQUEST['id'],$m);
    post('http://www.kinopoisk.ru/level/30/','shop_user[login]='.$user.'&shop_user[pass]='.$password.'&shop_user[mem]=on&auth=%E2%EE%E9%F2%E8+%ED%E0+%F1%E0%E9%F2','http://www.kinopoisk.ru');
    $result=post('http://www.kinopoisk.ru/level/1/film/'.$m[0].'/',null,'http://www.kinopoisk.ru/');
    //$result= iconv("cp1251", "utf8", $result);
    //echo $result;
    $parse=array(
    //'name' =>         '#<h1 class="moviename-big" itemprop="name">(.*?)</h1>#si',
    //'originalname'=>  '#13px">(.*?)</span>#si',
    'year' =>         '#?</td><td class=\"\">(.*?)</td></tr>#si'/*,
    'country' =>      '#???/td><td class=\"\">(.*?)</td></tr>#si',
    'slogan' =>       '#???/td><td style="color: \#555">(.*?)</td></tr>#si',
    'director' =>     '#????</td><td>(.*?)</td></tr>#si',
    'script' =>       '#????td><td>(.*?)</td></tr>#si',
    'producer' =>     '#???/td><td>(.*?)</td></tr>#si',
    'operator' =>     '#?????d><td>(.*?)</td></tr>#si',
    'composer' =>     '#?????d><td>(.*?)</td></tr>#si',
    'genre' =>        '#???d><td>(.*?)</td></tr>#si',
    'budget' =>       '#??</td><td class=\"dollar\">(.*?)</td></tr>#si',
    'usa_charges' =>  '#?</td><td class=\"dollar\">(.*?)</td></tr>#si',
    'world_charges'=> '#??td><td class=\"dollar\">(.*?)</td></tr>#si',
    'rus_charges' =>  '#???</td><td class=\"dollar\">(.*?)</td></tr>#si',
    'world_premiere'=>'#?\)</td><td class=\"calendar\">(.*?)</td></tr>#si',
    'rus_premiere' => '#є\)</td><td class="calendar">(.*?)</td></tr>#si',
    'dvd' =>          '#dvd">(.*?)</td></tr>#is',
    'bluray' =>       '#bluray">(.*?)</td></tr>#is',
    'MPAA' =>         '#MPAA</td><td class=\"[\S]{1,100}\"><a href=\'[\S]{1,100}\'><img src=\'/[\S]{1,100}\' height=11 alt=\'(.*?)\' border=0#si',
    'time' =>         '#id="runtime">(.*?)</td></tr>#si',
    'description' =>  '#<span class=\"_reachbanner_\">(.*?)</span>#si',
    'imdb' =>         '#IMDB:\s(.*?)</div>#si',
    'kinopoisk' =>    '#text-decoration: none">(.*?)<span#si',
    'kp_votes' =>     '#<span style=\"font:100 14px tahoma, verdana\">(.*?)</span>#si',*/
     );
	// echo 'name = '.$parse[1];
 
   $new=array();
   foreach($parse as $index => $value)
   {
   //echo 'parse = '.$parse['name'].' tttttt1<br/>';
   //echo 'value = '.$value.' tttttt2<br/>';
   
   preg_match($value,$result,$matches);
   //echo 'matches = '.$matches[1].'<br/>';
   $new[$index]=preg_replace("#<a.+?>(.+?)</a>#si","$1",$matches[1]);
   //echo '$$matches[1] = '.$matches[1].'<br/>';
   }
   /*
preg_match('#getTrailer\("(.*?)","(.*?)","(.*?)","[0-9]+","[0-9]+","(.*?)",""\);#i',$result,$trailer);
  /////////////////////////print//////////////////////////////
echo '[img]http://www.kinopoisk.ru/images/film/'.$m[0].'.jpg[/img]<br />';
echo '[??? ????] http://'.$trailer[4].'.kinopoisk.ru/trailers/flv/'.$trailer[2].'<br />';
echo '[???preview] http://'.$trailer[4].'.kinopoisk.ru/trailers/flv/'.$trailer[3].'<br />';*/
echo '[b]Название:[/b]'.$new['name'].'<br />';
/*echo '[b]????? ???[/b]'.$new['originalname'].'<br />';
echo '[b]I?/b]'.$new['year'].'<br />';
echo '[b]???:[/b]'.$new['country'].'<br />';
echo '[b]???/b]'.$new['slogan'].'<br />';
echo '[b]????[/b]'.$new['director'].'<br />';
echo '[b]????[/b]'.$new['script'].'<br />';
echo '[b]а???[/b]'.$new['producer'].'<br />';
echo '[b]????[/b]'.$new['operator'].'<br />';
echo '[b]????[/b]'.$new['composer'].'<br />';
echo '[b]??[/b]'.$new['genre'].'<br />';
echo '[b]????b]'.$new['budget'].'<br />';
echo '[b]?? ??:[/b]'.$new['usa_charges'].'<br />';
echo '[b]?? ??:[/b]'.$new['world_charges'].'<br />';
echo '[b]?? ???[/b]'.$new['rus_charges'].'<br />';
echo '[b]а?? (?):[/b]'.$new['world_premiere'].'<br />';
echo '[b]а?? (є):[/b]'.$new['rus_premiere'].'<br />';
echo '[b]?? ?DVD:[/b]'.$new['dvd'].'<br />';
echo '[b]?? ?Blu-Ray:[/b]'.$new['bluray'].'<br />';
echo '[b]???MPAA:[/b]'.$new['MPAA'].'<br />';
echo '[b]??:[/b]'.$new['time'].'<br />';
echo '[b]???:[/b]'.$new['description'].'<br />';
echo '[b]???????/b]'.$new['kinopoisk'].'('.$new['kp_votes'].' )<br />';
echo '[b]???IMDb:[/b]'.$new['imdb'].'<br />';*/
?>