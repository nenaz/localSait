<?php
        header("Contect-Type: text/html; charset=utf-8");
        include_once('logs.php');
        include_once('constantsRU_inc.php');
        include_once('functions_inc.php');
        session_start();
        include('mysql_inc.php');
        include_once('menuNew.php');
        
        $colPicture = $_GET['colPicture'];
        $rowPicture = $_GET['rowPicture'];
        // Logs('$colPicture', $colPicture);
        // Logs('$rowPicture', $rowPicture);

        $page = 1;
        $count = $colPicture * $rowPicture;
        $limit = $count * ($page - 1) ;
		
		$arrCategory = arrCategoryFilms($dbh);
        // $limitBool = false;
        // if(isset($_POST['selectedIndex'])){
                // $selectedIndex = $_POST['selectedIndex'];
                // $sql = "UPDATE resourse SET resourse='$selectedIndex' WHERE name='category'";
                // $res =  mysqli_query($dbh, $sql) or die(mysqli_error($dbh));
                // $limitBool = true;
        // }
        // $sql = "SELECT resourse FROM resourse where name='category'";
        // $result = mysqli_query($dbh, $sql) or die(mysqli_error());
        // while($row = mysqli_fetch_row ($result))
                // $selectedIndex = $row[0];
        // Logs('selectedIndex', $selectedIndex);
		// if($selectedIndex!=0){
                // if($limitBool ==true){$limit = 0;$page=1;}
				// Logs('$arrCategory[$selectedIndex]', $arrCategory[$selectedIndex]);
                // $query_page = "SELECT * FROM films Where genre LIKE '%".$arrCategory[$selectedIndex]."%'";
                // $query = "SELECT * FROM films Where genre LIKE '%".$arrCategory[$selectedIndex]."%' order by id DESC LIMIT $limit, $count ";
        // }else{
                // if($searchText!=''){
                        // $limit = 0;$page=1;
                        // $query_page = "SELECT * FROM films Where name_film LIKE '%".$searchText."%' or name_eng LIKE '%".$searchText."%'";
                        // $query = "SELECT * FROM films Where name_film LIKE '%".$searchText."%' or name_eng LIKE '%".$searchText."%' order by id DESC LIMIT $limit, $count ";
                // }else{
                        // $query_page = "SELECT * FROM films";
                        $query = "SELECT * FROM films order by id DESC LIMIT $limit, $count ";
                // }
        // }
		//$query = "SELECT * FROM films order by id DESC LIMIT $limit, $count";
		// Logs('$query', $query);
        $res = mysqli_query($dbh, $query);
        // $res_count = mysqli_query($dbh, $query_page);
        //$count = mysqli_num_rows($res_count);
        $page_count = 6;//$count/($picKolW*$picKolH);
        $r = strpos($page_count, ".");
        if($r === false){ }
        else {
			$ost =  substr($page_count, $r+1, strlen($page_count));
			$page_count = substr($page_count,0,$r);
			if($ost>0){
				$page_count++;
			}
		}
        $i=0;
		// $obj['pageHeight'] = $pageH;
		// $obj['pageWidth'] = $pageW;
		while($row = mysqli_fetch_array($res)){
			$i++;
			$nameF = FILMS_PATH.str_replace(" ", "_", $row[12]).$row[13];
			$bgc = '';
			if((!file_exists($nameF)) && (!file_exists(mb_convert_encoding($nameF, 'Windows-1251', 'UTF-8')))){
				$bgc =  "bacground-color:red;";
			}
			$obj['blockFilms']['film-'.$i]['id'] = $row['id'];
			$obj['blockFilms']['film-'.$i]['count'] = $i;
			$obj['blockFilms']['film-'.$i]['posterId'] = $row[0];
			$obj['blockFilms']['film-'.$i]['page'] = $page;
			$obj['blockFilms']['film-'.$i]['exeName'] = $row['exe'];
			$obj['blockFilms']['film-'.$i]['title'] = $row['name_eng'];
			$obj['blockFilms']['film-'.$i]['src_big'] = $row['path_pic_big'];
			$obj['blockFilms']['film-'.$i]['src_small'] = $row['path_pic_small'];
			$obj['blockFilms']['film-'.$i]['rating'] = $row['reyting'];
		}
		$obj['blockFilmsCount'] = $i;
		$obj['menuTable'] = configData();
        $query = "SELECT count(id) as countId FROM films";
		$resQuery = mysqli_query($dbh, $query);
		while($row = mysqli_fetch_assoc($resQuery)){
				$countAll = $row['countId'];
		}
        $obj['countAll'] = $countAll;
		echo json_encode($obj);