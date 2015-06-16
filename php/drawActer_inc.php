<table>
	<?php
		if($row[12] == '' || $row[12] == 'undefined')$name = $row[1];
		else $name = $row[12];
		Logs('name8888', $name);
		$query_id_acter = "SELECT act1,act2,act3,act4,act5,act6,act7,act8,act9,act10 FROM film_acter WHERE id_film = '$name'";
		$res_id_acter = mysqli_query($dbh, $query_id_acter);
		while($row_id_acter = mysqli_fetch_row($res_id_acter)){
			for($acter=0;$acter<10;$acter++){
				//$row_id_acter[$acter]
				Logs('$row_id_acter[$acter]', $row_id_acter[$acter]);
				if($row_id_acter[$acter]!=''){
					$query_acter = "SELECT name FROM acter WHERE id = $row_id_acter[$acter]";
					$res_acter = mysqli_query($dbh, $query_acter);
					while($row_acter = mysqli_fetch_row($res_acter)){
						echo '<tr><td>'.$row_acter[0].'</td></tr>';
					}
				}
			}
		}
	?>
</table>