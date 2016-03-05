<?php
	function Logs($errorStr, $mess){
		// error_log(date("Y M d, H:i:s O => ").$errorStr.": ".$mess."\r\n", 3, "d:/OTHERS/server/localsait/logs/myErrors.log");
		error_log(date("Y M d, H:i:s O => ").$errorStr.": ".$mess."\r\n", 3, "F:/others/GITHUB/localsait_new/logs/myErrors.log");
	}
?>