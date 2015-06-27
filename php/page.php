<?php
	include_once('logs.php');
	include_once('constantsRU_inc.php');
	include_once('functions_inc.php');
	session_start();
	include('mysql_inc.php');
	
	$filmId = abs((int)$_POST['id']);
	$count = 5;
	$limit = 5;
	
	if(isset($_POST['pPage']))
		$page = trim(strip_tags($_POST['pPage']));
	else 
		$page = trim(strip_tags($_SESSION['pPage']));
	$query_page = "SELECT * FROM films";
	$query = "SELECT * FROM films where id=$filmId";
	$res = mysqli_query($dbh, $query);
	$res_count = mysqli_query($dbh, $query_page);
	$count = mysqli_num_rows($res_count);
	$page_count = $count/6;
	$r = strpos($page_count, ".");
	if($r === false){ }
	else {$ost =  substr($page_count, $r+1, strlen($page_count));
	$page_count = substr($page_count,0,$r);
	if($ost>0)$page_count++;}
	$i=0;
	if(isset($_POST['pageH'])) $pageH = $_SESSION['pageH'] = $_POST['pageH'];
	else  $pageH = $_SESSION['pageH'];
	if(isset($_POST['pageW'])) $pageW = $_SESSION['pageW'] = $_POST['pageH'];
	else  $pageW = $_SESSION['pageW'];
?>
<div id="pageF" >
	<div class="table">
	<?php
	while($row = mysqli_fetch_row($res)){
		$i++;
	?>
		<div class="ViewFilmInfo" style="height:<?php echo $pageH;?>px;">
			<input id="back" type="button" style="width:<?php echo $pageW;?>px;" value="Назад" onclick="go_action('prev', '', '', <?php echo $page;?>);"/><br/>
			<input type="button" id="sin" value="Синхронизация с КИНОПОИСК" onclick="go_action('synchronization', '<?php echo $row[12]?>', '<?php echo $row[0]?>', '<?php echo $page;?>', '<?php echo $row[1]?>');"/>
			<input id="butFT" type="button" value="Попытаться скачать с FastTorrent.ru" onclick="go_action('downloadFT', 'film', '<?php echo $row[12]?>', '<?php echo $page;?>', '<?php echo $row[4]?>');"/>
			<div id="downloadLink"></div>
			<input id="delete" type="button" value="Удалить к херам" onclick="go_action('delete', 'film', '<?php echo $row[0]?>', '<?php echo $page;?>', '<?php echo $row[1]?>');"/>
			<div id="headerFilm">
				<h1 id="name"><?php echo $row[1]?></h1>
				<span id="alternativeName<?php echo '_'.$i;?>"><?php echo $row[12]?></span>
				<div>
					<span id="exeName"><?php if($row[13]!='undefined')echo $row[13];?></span>
				</div>
			</div>
			<div id="photoblock">
				<div id="filmImgBox2">
					<img src="<?php echo $row[11];?>"/>
				</div>
			</div>
			<div id="infoTable" class="infTabActList">
				<!-- отрисовка заголовков описания начало-->
				<?php include('drawTableZagol_inc.php');?>
				<!-- отрисовка заголовков описания конец-->
			</div>
			<div id="actorList" class="infTabActList">
				<!-- отрисовка актеров начало-->
				<?php include('drawActer_inc.php');?>
				<!-- отрисовка актеров конец-->
			</div><br/>
		</div>
		<div class="tr"><div class="td">
			<div id="description">
			<?php echo $row[9];?>
			</div>
		</div></div>
		<!--div class="tr"><div class="td tdNull"></div></div-->
	<?php
	}
	?>
	</div>
</div>