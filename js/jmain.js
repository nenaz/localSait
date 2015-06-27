function openPlay(th){//обработка иконок на картинке фильма
	$(th).children('img').first().attr({'id':'bF'});//картинке play добавить id и обработчик
	$(th).children().first().on('click', function(){
		var altName = $(th).closest('.photoblock').find('img').first().attr('title');
		var exeName = $(th).closest('.photoblock').find('img').first().attr('exeName');
		view_film2('1', altName, exeName);
	});
	$(th).children('img').first().next().attr({'id':'info'});//картинке info добавить id
	$(th).children('img').last().attr({'id':'star'});//картинке оценка добавить id и обработчик
	$(th).children('img').last().on('click', function(){
		$(th).find('.dimgSmallStarsReyt').animate({//показать оценку
									'height':200,
									'top':-200
								}).find('div').show();
	});
}

function closePlay(th){//обработка иконок на картинке фильма
	$('#fBat').remove();//удаление кнопки скачать
	$('#bF').show();//показать кнопку play
	$(th).find('.dimgSmallStarsReyt').animate({ //спрятать оценку 
									'height':0,
									'top':0
								}).find('div').hide(300);
	$(th).children().first().removeAttr('id'); //удалить атрибут id у всех картинок
	$(th).children().first().next().removeAttr('id');
	$(th).children().last().removeAttr('id');
}

function setReyt(th, num){//получить рейтинг для фильма
	var id= $(th).closest('.photoblock').find('.filmPoster').attr('id');//получить id фильма
	var str = 'id='+id+'&num='+num+'&func=updateReyt';//строка для отправки в php
	$(th).closest('.iDiv').find('#dig').text(num);//обновление оценки фильма
	xhttpRequest('', opt.getAddDelPagePhp(), str);//отправка запроса к php
	$(th).closest('.dimgSmallStarsReyt').animate({//спрятать div с оценкой
									'height':0,
									'top':0
								}).find('div').hide(300);
}

function picturesCountXY(rezult, opt){//генерация констант для отрисовки mf,kbws расположения картинок фильмовё
	var glWidth = screen.width;//ширина экрана
	var glHeight = screen.height;//высота экрана
	var lRButton = 87;//размер кнопок навигации
	var lROtstup = 15;//размер отступов до кнопок навигации
	var picWidth = +rezult.getElementsByTagName('pictureWidth')[0].textContent;//ширина картинки
	var picHeight = +rezult.getElementsByTagName('pictureHeight')[0].textContent;//высота картинки
	var freePixelW = glWidth-(2*lRButton)-lROtstup;
	var freePixelH = glHeight-45;
	picKolW = Math.floor(freePixelW/(picWidth+15));	//количество столбцов с картинками
	if(picKolW>6)picKolW=6;
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

function navPages(pageCount, page){//генерайя страниц навигации
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

function createCategorySelect(arrCategory, selectedIndex){//генерация выпадающего списка категорий
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

function drawCategory(){//отрисовка графика с категориям фильмов
	var i=0, sm='', count = opt.getarrCategory().length, t=0, arrcountFOC = opt.arrCountFilmsOfCategory;
	var arrCateg = opt.getarrCategory();
	$('#diagGr').css({	'width':410, 'height':150, 'background-color':'#fff', 'font-size':0});
	sm = "<div class='d1'><div class='d2' style='width:200px;' id=categ0>ВСЕГО фильмов</div><div id='all' class='d3' style='width:160px;'></div><span class='nameCat'>"+opt.count+" шт.</span></div>";
	$(sm).appendTo('#diagGr');
	for(cat in arrcountFOC){
		t=arrcountFOC[cat]*1.5;
		sm = "<div class='d1'><div class='d2' id=categ"+i+">"+cat+"</div><div id=st"+i+" class='d3'></div><span class='nameCat'>"+arrcountFOC[cat]+" шт.</span></div>";
		$(sm).appendTo('#diagGr');
		$("#st"+i).animate({'width':t}).click((function(icat){
																	return function(){
																		alert(icat);
																	}
																})(cat));
		i++;
	}	
}

function addEvents(){
	var getElement = doc.getElementsByTagName('img')[0];//rss FT
	getElement.addEventListener('click', function(){showRssFT(this);}, false);
	getElement = doc.getElementsByTagName('img')[1];//rss KP
	getElement.addEventListener('click', function(){showRssKP(this);}, false);
	$('#search_text').on('keydown', function(){//текстовое поле поиска ENTER
		checkKey(event, 'search');
	});	
	doc.getElementById('searchSelect').addEventListener('change', category, false);//выбор категории фильма
	$('[value="Поиск"]').on('click', function(){//кнопка поиска фильма
		search();
	});
	$('#prev').on('click', function(){//кнопка Назад
		go_page('', '-1');
	});
	$('#forv').on('click', function(){//кнопка Вперед
		go_page('', '1');
	});
	/*$('.iDiv').on('mouseenter', function(){
		openPlay(this);
	});
	$('.iDiv').on('mouseleave', function(){
		closePlay(this);
	});*/
	//onmouseenter="openPlay(this);" onmouseleave="closePlay(this);
}