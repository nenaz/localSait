<?php
        header("Contect-Type: text/html; charset=utf-8");
 //       include 'cookie_inc.php';
        //include 'updateReyting.php';
        include_once('logs.php');
        include_once('constantsRU_inc.php');
        include_once('functions_inc.php');
        session_start();
        include('mysql_inc.php');
		
        if(isset($_POST['searchCategory']))Logs('$_POST[', $_POST['searchCategory']);
        else Logs('$_POST[searchCategory]', 'пусто');

        if(isset($_POST['searchText'])){$searchText = $_POST['searchText'];
        }
        else {
                $searchText = '';
        }


        /*$res = mysql_query("UPDATE resourse SET resourse='$page' WHERE name='savePageField'");
        if($res) Logs(OK_UPDATE, OK_UPDATE_1);
        else Logs(ERROR_UPDATE, ERROR_UPDATE_1);*/
		if(isset($_POST['picKolW'])) $picKolW = $_SESSION['picKolW'] = $_POST['picKolW'];
		else  $picKolW = $_SESSION['picKolW'];
		if(isset($_POST['picKolH'])) $picKolH = $_SESSION['picKolH'] = $_POST['picKolH'];
		else  $picKolH = $_SESSION['picKolH'];
		if(isset($_POST['page'])) $page = $_SESSION['page'] = $_POST['page'];
		else  $page = $_SESSION['page'];
		if(isset($_POST['pageW'])) $pageW = $_SESSION['pageW'] = $_POST['pageW'];
		else  $pageW = $_SESSION['pageW'];
		if(isset($_POST['pageH'])) $pageH = $_SESSION['pageH'] = $_POST['pageH'];
		else  $pageH = $_SESSION['pageH'];
		if(isset($_POST['picOtsHLR'])) $picOtsHLR = $_SESSION['picOtsHLR'] = $_POST['picOtsHLR'];
		else  $picOtsHLR = $_SESSION['picOtsHLR'];
        $count = $picKolW*$picKolH;
        $limit = $count*($page-1) ;
		
		$arrCategory = arrCategoryFilms($dbh);
        $limitBool = false;
        if(isset($_POST['selectedIndex'])){
                $selectedIndex = $_POST['selectedIndex'];
                $sql = "UPDATE resourse SET resourse='$selectedIndex' WHERE name='category'";
                $res =  mysqli_query($dbh, $sql) or die(mysqli_error($dbh));
                $limitBool = true;
        }
        $sql = "SELECT resourse FROM resourse where name='category'";
        $result = mysqli_query($dbh, $sql) or die(mysqli_error());
        while($row = mysqli_fetch_row ($result))
                $selectedIndex = $row[0];
        Logs('selectedIndex', $selectedIndex);
		if($selectedIndex!=0){
                if($limitBool ==true){$limit = 0;$page=1;}
				Logs('$arrCategory[$selectedIndex]', $arrCategory[$selectedIndex]);
                $query_page = "SELECT * FROM films Where genre LIKE '%".$arrCategory[$selectedIndex]."%'";
                $query = "SELECT * FROM films Where genre LIKE '%".$arrCategory[$selectedIndex]."%' order by id DESC LIMIT $limit, $count ";
        }else{
                if($searchText!=''){
                        $limit = 0;$page=1;
                        $query_page = "SELECT * FROM films Where name_film LIKE '%".$searchText."%' or name_eng LIKE '%".$searchText."%'";
                        $query = "SELECT * FROM films Where name_film LIKE '%".$searchText."%' or name_eng LIKE '%".$searchText."%' order by id DESC LIMIT $limit, $count ";
                }else{
                        $query_page = "SELECT * FROM films";
                        $query = "SELECT * FROM films order by id DESC LIMIT $limit, $count ";
                }
        }
		//$query = "SELECT * FROM films order by id DESC LIMIT $limit, $count";
		Logs('$query', $query);
        $res = mysqli_query($dbh, $query);
        $res_count = mysqli_query($dbh, $query_page);
        //$count = mysqli_num_rows($res_count);
        $page_count = 6;//$count/($picKolW*$picKolH);
        $r = strpos($page_count, ".");
        if($r === false){ }
        else {$ost =  substr($page_count, $r+1, strlen($page_count));
        $page_count = substr($page_count,0,$r);
        if($ost>0)$page_count++;}
        $i=0;
        ?>
        <div id="page" style="height:<?php echo $pageH;?>px; width:<?php echo $pageW;?>px; margin-right:15px;">
                <div id="filmImgBox" style="padding-left:<?php echo $picOtsHLR;?>px">
                        <?php $i=0;
                        while($row = mysqli_fetch_array($res)){
                                $i++;
                        ?>
                                <div class="photoblock" id="photoblock<?php echo '_'.$i;?>" style="<?php
                                        $nameF = FILMS_PATH.str_replace(" ", "_", $row[12]).$row[13];
                                        if((!file_exists($nameF)) && (!file_exists(mb_convert_encoding($nameF, 'Windows-1251', 'UTF-8')))){
                                                ?>background:red;<?php
                                        }?>">
                                                <img class="filmPoster" id="<?php echo $row[0];?>" onclick="viewFilm(this, <?php echo $page;?>);" exeName="<?php echo $row['exe'];?>" title="<?php echo $row['name_eng'];?>" src="<?php echo $row[11];?>"/>
                                                <div class="iDiv" onmouseenter="openPlay(this);" onmouseleave="closePlay(this);">
                                                        <img class="dImg dplay" src="/images/system/play.png"/>
                                                        <img class="dImg" src="/images/system/information.png"/>
                                                        <img class="dImg" src="/images/system/star.png"/>
                                                        <span id="dig" class="stars"><?php echo $row['reyting'];?></span>
                                                        <div class="starsReyt">
                                                                <div>
                                                                        <span>оценка</span>
                                                                        <div onclick="setReyt(this, 10);">10</div>
                                                                        <div onclick="setReyt(this, 9);">9</div>
                                                                        <div onclick="setReyt(this, 8);">8</div>
                                                                        <div onclick="setReyt(this, 7);">7</div>
                                                                        <div onclick="setReyt(this, 6);">6</div>
                                                                        <div onclick="setReyt(this, 5);">5</div>
                                                                        <div onclick="setReyt(this, 4);">4</div>
                                                                        <div onclick="setReyt(this, 3);">3</div>
                                                                        <div onclick="setReyt(this, 2);">2</div>
                                                                        <div onclick="setReyt(this, 1);">1</div>
                                                                </div>
                                                        </div>
                                                </div>
                                </div>
                        <?php }
                        if($i<$picKolW){//дополнить пустыми блоками столбцы страницы, если кол-во фильмов меньше picKolW
                                $i = $picKolW-$i;
                                for($k=0; $k<$i; $k++){?>
                                        <div class="photoblock" id="photoblockNull<?php echo '_'.$k;?>"></div>
                        <?php }
                        }
                        ?>
                </div>
        </div>