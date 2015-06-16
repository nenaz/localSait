<?php
	$host=DB_HOST;$database=DB_NAME;$user=DB_LOGIN;$pswd=DB_PASS; 
	$dbh = mysqli_connect($host, $user, $pswd, $database); 
	if(mysqli_connect_error())
		Logs(mysqli_connect_errno(), mysqli_connect_error());
	mysqli_query($dbh, "SET NAMES 'utf8'");
?>