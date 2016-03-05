<?php
        header("Contect-Type: text/html; charset=utf-8");
        include_once('logs.php');
        include_once('constantsRU_inc.php');
        include_once('functions_inc.php');
        session_start();
        include('mysql_inc.php');
        include_once('menuNew.php');
        
        $globalCountPicture = $_GET['globalCountPicture'];
        $page = 1;
        $countAll = 0;
        $count = $globalCountPicture;
        $limit = $count * ($page - 1) ;
		$arrCategory = arrCategoryFilms($dbh);
        $queryAll = "SELECT path_pic_big FROM films order by id DESC";
        $resAll = mysqli_query($dbh, $queryAll);
		while($rowAll = mysqli_fetch_array($resAll)){
            $path_pic_big = $rowAll['path_pic_big'];
            preg_match("/\d+/",$path_pic_big, $idPic);
            if (count($idPic) != 0) {
            Logs('idPic',$idPic[0]);
                $obj['arrAllBigPagesId'][$countAll] = $idPic[0];
                $countAll += 1;
            }
        }
        $query = "SELECT * FROM films order by id DESC LIMIT $limit, $globalCountPicture ";
        $res = mysqli_query($dbh, $query);
        $i=0;
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
            preg_match("/\d+/",$row['path_pic_big'], $idPic);
            $obj['blockFilms']['film-'.$i]['arrAllBigPagesId'] = $idPic[0];
            if (file_exists(LOC_XAMP_FILMS.$row['path_pic_small'])) {
                $obj['blockFilms']['film-'.$i]['src_small'] = $row['path_pic_small'];
            } else {
                $obj['blockFilms']['film-'.$i]['src_small'] = '/images/system/no_image.png';
                // $obj['blockFilms']['film-'.$i]['arrAllBigPagesId'] = '-1';
                // $obj['blockFilms']['film-'.$i]['src_small'] = LOC_XAMP_FILMS.$row['path_pic_small'];
            }
			// $obj['blockFilms']['film-'.$i]['src_small'] = '/images/pic3D/Broco_1.jpg';
			$obj['blockFilms']['film-'.$i]['rating'] = $row['kinopoisk'];
		}
		$obj['blockFilmsCount'] = $i;
		$obj['menuTable'] = configData();
        // $query = "SELECT count(id) as countId FROM films";
		// $resQuery = mysqli_query($dbh, $query);
		// while($row = mysqli_fetch_assoc($resQuery)){
				// $countAll = $row['countId'];
		// }
        $obj['countAll'] = $countAll;
		echo json_encode($obj);