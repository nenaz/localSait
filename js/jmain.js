function openPlay(th){
	$(th).children('img').first().attr({'id':'bF'});//картинке play добавить id и обработчик
	$(th).children().first().on('click', function(){
		var altName = $(th).closest('.photoblock').find('img').first().attr('title');
		var exeName = $(th).closest('.photoblock').find('img').first().attr('exeName');
		view_film2('1', altName, exeName);
	});
	$(th).children('img').first().next().attr({'id':'info'});//картинке info добавить id
	$(th).children('img').last().attr({'id':'star'});//картинке оценка добавить id и обработчик
	$(th).children('img').last().on('click', function(){
		$(th).find('.starsReyt').animate({//показать оценку
									'height':200,
									'top':-200
								}).find('div').show();
	});
}

function closePlay(th){
	$('#fBat').remove();//удаление кнопки скачать
	$('#bF').show();//показать кнопку play
	$(th).find('.starsReyt').animate({ //спрятать оценку 
									'height':0,
									'top':0
								}).find('div').hide(300);
	$(th).children().first().removeAttr('id'); //удалить атрибут id у всех картинок
	$(th).children().first().next().removeAttr('id');
	$(th).children().last().removeAttr('id');
}

function picturesCountXY(rezult, opt){
	var glWidth = screen.width;//ширина экрана
	var glHeight = screen.height;//высота экрана
	var lRButton = 87;//размер кнопок навигации
	var lROtstup = 15;//размер отступов до кнопок навигации
	var picWidth = +rezult.getElementsByTagName('pictureWidth')[0].textContent;//ширина картинки
	var picHeight = +rezult.getElementsByTagName('pictureHeight')[0].textContent;//высота картинки
	var freePixelW = glWidth-(2*lRButton)-lROtstup;
	var freePixelH = glHeight-45;
	picKolW = Math.floor(freePixelW/(picWidth+15));//количество столбцов с картинками
	picKolH = Math.floor(freePixelH/(picHeight+10));//количество строк с картинками
	var picOstH = freePixelH%(picHeight+10);//остаток свободных пикселей ширины
	var picOtsHLR = picOstH/2;//отступы от краев экрана
	pageW = (picWidth+lROtstup)*picKolW;//+lRButton*2;
	var picOstW = (glWidth - pageW)/2;	
	pageH = (picHeight+lROtstup)*picKolH+50;
	var butRight = pageW-lRButton;
	buttonHeight = pageH - 55;
	opt.setpageW(pageW);
	opt.setpageH(pageH);
	opt.setbuttonHeight(buttonHeight);
	opt.setpicKolW(picKolW);
	opt.setpicKolH(picKolH);
	opt.setpicOtsHLR(picOtsHLR);
	return opt;
}

function navPages(pageCount, page){
	var smessage='';
	for(var j=1; j<=pageCount; j++){
		if(j!=page) {
			smessage = $("<span class='pageNumAll' onclick='go_page(this);'>"+j+"</span>");
		}else{
			smessage = $("<span class='pageNumAll pageNumAllAct' onclick='go_page(this);'>"+j+"</span>");
		}
		$('#navPages').append(smessage);
	}
}

function createCategorySelect(arrCategory, selectedIndex){
	var smessage='';
	for(var j=0; j<arrCategory.length; j++){
		if(j==selectedIndex){
			smessage = $("<option selected='selected'>"+arrCategory[j]+"</option>");
			$('#searchSelect').append(smessage);
		}else{
			smessage = $("<option>"+arrCategory[j]+"</option>");
			$('#searchSelect').append(smessage);
		}		
	}
}

function createSearchText(searchText){
	if(searchText!='') $('#search_text').val(searchText);
}