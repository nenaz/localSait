<?php
		include_once('logs.php');
        include_once('constantsRU_inc.php');
        include_once('functions_inc.php');
        session_start();
        include('mysql_inc.php');

        $query = "SELECT count(id) as countId FROM films";
        $resQuery = mysqli_query($dbh, $query);
        while($row = mysqli_fetch_assoc($resQuery)){
                $countAll = $row['countId'];
        }
        $query = "SELECT resourse FROM resourse WHERE name = 'pictureWidth' OR name = 'pictureHeight' OR name = 'filmsPath' OR name='categoryFilms'";
        $resQuery = mysqli_query($dbh, $query);
        $i=1;
        while($row = mysqli_fetch_array($resQuery)){
                switch ($i){
                        case 1: $picW = $row['resourse'];$i++; break;
                        case 2: $picH = $row['resourse']; $i++;break;
                        case 3: $filmsP = $row['resourse']; $i++;break;
                        case 4: $category = $row['resourse']; $i++;break;
                }
        }

            /*
        Logs('picH', $picH);
        Logs('filmsP', $filmsP);*/
        /*
// Даем знать клиенту, что возвращаем XML
header("Content-Type: text/xml");
echo "<?xml version=\"1.0\" encoding=\"utf-8\"?>";
echo "<ratings>";
$title="title";
$rating="rating";
echo "</ratings>";
*/
/*
$title->appendChild(
                $dom->createTextNode('Great American Novel'));
*/
$arrCategory = explode(',', $category);
$k=0;
	for($i=1; $i < count($arrCategory); $i++){
		$query = "SELECT id FROM films WHERE genre LIKE '%$arrCategory[$i]%'";
		$res = mysqli_query($dbh, $query);
		$count = mysqli_num_rows($res);
		if($count>0){
			$arrCountForCateg[$arrCategory[$i]] = $count;
		}
	}
	
header("Content-Type: text/xml");
$xml = new DomDocument('1.0');
$menuTable = $xml->appendChild($xml->createElement('menuTable'));
$countAllFilms = $menuTable->appendChild($xml->createElement('countAllFilms'));
$countAllFilms->appendChild($xml->createTextNode($countAll));
$pictureWidth = $menuTable->appendChild($xml->createElement('pictureWidth'));
$pictureWidth->appendChild($xml->createTextNode($picW));
$pictureHeight = $menuTable->appendChild($xml->createElement('pictureHeight'));
$pictureHeight->appendChild($xml->createTextNode($picH));
$arrayCategory = $menuTable->appendChild($xml->createElement('arrayCategory'));
for($i=0; $i < count($arrCategory); $i++){
	$category = $arrayCategory->appendChild($xml->createElement('category'));
	$category->appendChild($xml->createTextNode($arrCategory[$i]));
}
$activePage = $menuTable->appendChild($xml->createElement('activePage'));
$arrayRSS = $menuTable->appendChild($xml->createElement('arrayRSS'));
$rss = $arrayRSS->appendChild($xml->createElement('rss'));
$arrayPicturePath = $menuTable->appendChild($xml->createElement('arrayPicturePath'));
$picturePath = $arrayPicturePath->appendChild($xml->createElement('picturePath'));
$filmsPath = $menuTable->appendChild($xml->createElement('filmsPath'));
$filmsPath->appendChild($xml->createTextNode($filmsP));
$countFilmsOfCategory = $menuTable->appendChild($xml->createElement('countFilmsOfCategory'));
foreach($arrCountForCateg as $key => $value){ 
	$items = $countFilmsOfCategory->appendChild($xml->createElement('items'));
	$keyCateg = $items->appendChild($xml->createElement('keyCateg'));
	$keyCateg->appendChild($xml->createTextNode($key));
	$valueCateg = $items->appendChild($xml->createElement('valueCateg'));
	$valueCateg->appendChild($xml->createTextNode($value));
}

$xml->formatOutput = true;
$requestXML = $xml->saveXML();
echo $requestXML;
$xml->save('test1.xml');
/*
<menuTable>
        <countAll></countAll>
        <pictureWidth></pictureWidth>
        <pictureHeight></pictureHeight>
        <arrayCaterory>
                <category></category>
        </arrayCaterory>
        <activePage></activePage>
        <arrayRSS>
                <RSS></RSS>
        </arrayRSS>
        <arrayPicturePath>
                <picturePath></picturePath>
        </arrayPicturePath>
        <filmsPath></filmsPath>
		<countFilmsOfCategory>
			<items>
				<keyCateg></keyCateg>
				<valueCateg></valueCateg>
			</items>
		</countFilmsOfCategory>
</menuTable>
*/
/*header("Content-Type: text/xml");

//Создает XML-строку и XML-документ при помощи DOM
$dom = new DomDocument('1.0');
//добавление корня - <books>
$books = $dom->appendChild($dom->createElement('books'));
//добавление элемента <book> в <books>
$book = $books->appendChild($dom->createElement('book'));
// добавление элемента <title> в <book>
$title = $book->appendChild($dom->createElement('title'));
// добавление элемента текстового узла <title> в <title>
$title->appendChild(
                $dom->createTextNode('Great American Novel'));
//генерация xml
$dom->formatOutput = true; // установка атрибута formatOutput
                           // domDocument в значение true
// save XML as string or file
$test1 = $dom->saveXML(); // передача строки в test1
echo $test1;*/
//$dom->save('test1.xml'); // сохранение файла

?>