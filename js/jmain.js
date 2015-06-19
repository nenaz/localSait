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
		$(th).find('.starsReyt').animate({//показать оценку
									'height':200,
									'top':-200
								}).find('div').show();
	});
}

function closePlay(th){//обработка иконок на картинке фильма
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
/*
function drawDiag(goriz){
	var count = 10;
	/*$('#diagOp').css({	'width':150, 'height':150, 'background-color':'#fff', 'font-size':0});*/
	/*$('#diagGr').css({	'width':150, 'height':150, 'background-color':'#fff', 'font-size':0});
	var sm='';
	if(goriz==false){
		for(var i=0; i<count; i++){
			sm = "<div id=st"+i+" style='height:0px; width:10px; background-color:#0A0AC9;float:left; margin-right:3px;box-shadow:2px 2px 2px #0A0AC9; position:relative; top:100px;'></div>";
			$(sm).appendTo('#diagGr');
		}
	}else{
		for(var i=0; i<count; i++){
			sm = "<div id=st"+i+" style='height:10px; width:0px; background-color:#0A0AC9;			margin-bottom:3px;box-shadow:2px 2px 2px #0A0AC9; position:relative;'></div>";
			$(sm).appendTo('#diagGr');//32D124
		}
	}
}

function viewDiag(goriz){
	var idi='', t=0, ttop=0;
	if(goriz==false){
		for(var i=0; i<10; i++){
			idi='st'+i;	t=10*i;	ttop = 100 - t - 2;
			$('#'+idi).animate({'height':t, 'top':ttop});
		}
	}else{
		for(var i=0; i<10; i++){
			idi='st'+i; t=10*i;
			$('#'+idi).animate({'width':t});
		}
	}
}*/

function drawCategory(){
	var i=0, sm='', count = opt.getarrCategory().length, t=0, arrcountFOC = opt.arrCountFilmsOfCategory;
	var arrCateg = opt.getarrCategory();
	$('#diagGr').css({	'width':410, 'height':150, 'background-color':'#fff', 'font-size':0});
	sm = "<div class='d1'><div class='d2' style='width:101px;' id=categ0>ВСЕГО фильмов</div><div id='all' class='d3' style='width:160px;'></div><span class='nameCat'>"+opt.count+" шт.</span></div>";
	$(sm).appendTo('#diagGr');
	//$("#st"+i).animate({'width':200});
	for(cat in arrcountFOC){
		t=arrcountFOC[cat]*1.5;
		sm = "<div class='d1'><div class='d2' id=categ"+i+">"+cat+"</div><div id=st"+i+" class='d3'></div><span class='nameCat'>"+arrcountFOC[cat]+" шт.</span></div>";
		$(sm).appendTo('#diagGr');
		$("#st"+i).animate({'width':t});
		i++;
	}
	
}

function viewCategory(){
	
}