<?php
	header("Cach-Control: no-store; max-age = 0");
?>
<!DOCTYPE html>
<html>
<?php
	if (strpos($_SERVER['HTTP_USER_AGENT'], 'MSIE 10')) $brouser_ident = 'IE';
	else $brouser_ident = 'noIE';
	include('modules_inc.php');
?>
<body style="background: url(pictures/mstiteli.jpg) no-repeat;">
	<div scrolling="no" id="loginPas">
		<div class="autorise">
			<div id="login_pas">
				<div>
					<span id="L" class="LP">Логин</span><br/><br/>
					<span id="P" class="LP">Пароль</span>
				</div>
				<div>
					<input MAXLENGTH="10" type="text" id="login" name="login"/><br/><br/>
					<input MAXLENGTH="10" type="password" id="password" onkeydown="checkKey(event);" name="password"/>
				</div>
			</div>
			<div id="parseRes"></div>
			<span id="log_pas"></span>
		</div>
	</div>
</body>
</html>