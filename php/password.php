<?php
	include_once('logs.php');
	session_start();
	$login = $_POST['login'];
	$_SESSION['clWidth'] = $_POST['clWidth'];
	$_SESSION['clHeight'] = $_POST['clHeight'];
	$password = md5($_POST['password']);
	//include('modules_inc.php');
	include_once('logs.php');
	include_once('constantsRU_inc.php');
	include_once('functions_inc.php');
	include('mysql_inc.php');
	$query = "SELECT * FROM user WHERE login='$login' AND hash='$password'";
	$res = mysqli_query($dbh, $query);
	$count = mysqli_affected_rows($dbh);
	if ($count==0) echo 'Такой комбинации Логин/Пароль не существует';
	if ($count==1)
	if($login=='nenaz'){
		echo 'Авторизация успешна+';
		$_SESSION['login'] = $login;
		$_SESSION['password'] = $password;
	}
	else {
		echo 'Авторизация успешна';
		$_SESSION['login'] = $login;
		$_SESSION['password'] = $password;
		$_SESSION['page'] = 1;
		$_SESSION['limit'] = 0;
		$_SESSION['count'] = 6;
	}
?>