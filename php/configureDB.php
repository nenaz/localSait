SELECT path_pic_big FROM `films` WHERE 1
<?php
header("Contect-Type: text/html; charset=utf-8");
 //       include 'cookie_inc.php';
        //include 'updateReyting.php';
        include_once('logs.php');
        include_once('constantsRU_inc.php');
        include_once('functions_inc.php');
        session_start();
        include('mysql_inc.php');
        include_once('menuNew.php');
		
        
        // $sql = "SELECT resourse FROM resourse where name='category'";
        $sql = "SELECT id, path_pic_big FROM films WHERE 1";
        $result = mysqli_query($dbh, $sql) or die(mysqli_error());
        while($row = mysqli_fetch_row ($result)){
            $selectedIndex = $row[1];
            // Logs('selectedIndex', $selectedIndex);
            $newValue = str_replace('film_big', 'film_small', $selectedIndex);
            // $newValue = str_replace('film_small', 'film_big', $selectedIndex);
            // Logs('newValue', $newValue);
            $query2 = "UPDATE films SET path_pic_small = '$newValue' WHERE id = $row[0]";
            $res2 = mysqli_query($dbh,$query2);
        }