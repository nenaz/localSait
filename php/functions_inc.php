<?php
	function picturesCountXY(&$pageW, &$pageH, &$buttonHeight, &$picKolW, &$picKolH){
		$glWidth = $_SESSION['clWidth'];//ширина экрана
		$glHeight = $_SESSION['clHeight'];//высота экрана
		$lRButton = 87;//размер кнопок навигации
		$lROtstup = 15;//размер отступов до кнопок навигации
		$picWidth = 205;//ширина картинки
		$picHeight = 290;//высота картинки
		$freePixelW = $glWidth-(2*$lRButton)-$lROtstup;
		$freePixelH = $glHeight-45;
		$picKolW = floor($freePixelW/($picWidth+15));//количество столбцов с картинками
		$picKolH = floor($freePixelH/($picHeight+10));//количество строк с картинками
		$picOstH = $freePixelH%($picHeight+10);//остаток свободных пикселей ширины
		$picOtsHLR = $picOstH/2;//отступы от краев экрана
		$pageW = ($picWidth+$lROtstup)*$picKolW+$lROtstup+$lRButton*2;
		$_SESSION['pageW'] = $pageW;
		$picOstW = ($glWidth - $pageW)/2;	
		$pageH = ($picHeight+$lROtstup)*$picKolH+50;
		$butRight = $pageW-$lRButton;
		$buttonHeight = $pageH - 55;
	}
	
	function arrCategory(){
		return ['ВСЕ','аниме','биография','боевик','вестерн','военный','детектив','детский','документальный','драма','история',
				'комедия','короткометражка','криминал','мелодрама','музыка','мультфильм','мюзикл','приключения','семейный',
				'спорт','триллер','фантастика','фильм-нуар','фэнтези'];
	}
	
	function drawTabZag($row){
		echo $row[2];
		?><table>
			<tbody>
			<tr><td style="width:138px;height:28px;">год</td><td id="year" style="width:307px;height:28px;"><?php echo $row[2];?></td></tr>
			<tr><td style="width:138px;height:28px;">страна</td><td id="country" style="width:307px;height:28px;"><?php echo $row[3];?></td></tr>
			<tr><td style="width:138px;height:28px;">режиссер</td><td id="director" style="width:307px;height:28px;"><?php echo $row[4];?></td></tr>
			<tr><td style="width:138px;height:28px;">жанр</td><td id="renge" style="width:307px;height:28px;"><?php echo $row[5];?></td></tr>
			<tr><td style="width:138px;height:28px;">премьера (РФ)</td><td id="date" style="width:307px;height:28px;"><?php echo $row[8];?></td></tr>
			<tr><td style="width:138px;height:28px;">рейтинг MPAA</td><td id="age" style="width:307px;height:28px;"><?php echo $row[7];?></td></tr>
			<tr><td style="width:138px;height:28px;">время</td><td id="time" style="width:307px;height:28px;"><?php echo $row[6];?></td></tr>
			</tbody>
		</table>
		<?php
	}
	
	function arrCategoryFilms($dbh){
		$query = "SELECT resourse FROM resourse WHERE name='categoryFilms'";
		$resQuery = mysqli_query($dbh, $query);
		$i=0;
		while($row = mysqli_fetch_array($resQuery)){
			$category = $row['resourse'];
			$i++;
		}
		$arrCategory = explode(',', $category);
		return $arrCategory;
	}
?>