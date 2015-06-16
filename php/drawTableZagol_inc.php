<table>
	<tbody>
	<tr><td style="width:138px;height:28px;">год</td><td id="year" style="width:307px;height:28px;"><?php echo $row[2];?></td></tr>
	<tr><td style="width:138px;height:28px;">страна</td><td id="country" style="width:307px;height:28px;"><?php echo $row[3];?></td></tr>
	<tr><td style="width:138px;height:28px;">режиссер</td><td id="director" style="width:307px;height:28px;"><?php echo $row[4];?></td></tr>
	<tr><td style="width:138px;height:28px;">жанр</td><td id="renge" style="width:307px;height:28px;"><?php echo $row[5];?></td></tr>
	<tr><td style="width:138px;height:28px;">премьера (РФ)</td><td id="date" style="width:307px;height:28px;"><?php echo $row[8];?></td></tr>
	<tr><td style="width:138px;height:28px;">рейтинг MPAA</td><td id="age" style="width:307px;height:28px;"><?php echo $row[7];?></td></tr>
	<tr><td style="width:138px;height:28px;">время</td><td id="time" style="width:307px;height:28px;"><?php echo $row[6];?></td></tr>
	</tbody>
</table>
<span onclick="view_film2('<?php echo $i;?>'); del('<?php echo $i;?>');" style="text-decoration:underline;cursor:pointer;">сгенерить кнопку для просмотра</span>
<a href="" id="hh<?php echo $i;?>" style="display:none;"><input type="button" id="view_film<?php echo $i;?>"/></a>