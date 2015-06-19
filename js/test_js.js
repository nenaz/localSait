var path_pic='';
var wda = window.document.all;
var da = document.all;
var prevPage = 0;
var filmsPath = 'D:\\Films';
var rezult = null;
/*var pageW=0, pageH=0, buttonHeight=0, picKolW=0, picKolH=0;
var count=0; 
var pageCount=0;
var page =1;
var arrCategory = [];//
var selectedIndex = 0;
var searchText = '';
*/
function OptionsPage(){
	this.pageW;//ширина блока с картинками
	this.pageH;//высота блока с картинками
	this.buttonHeight;//ширина кнопок Вперед Назад
	this.picKolW;//количество столбцов с картинками (не более 6)
	this.picKolH;//количество строк с картинками
	this.count;//общее количество фильмов
	this.pageCount;//количество страниц навигации
	this.page = 1;//текущая активная страница
	this.arrCategory = [];//список категорий фильмов
	this.selectedIndex;//индекс активной категории поиска
	this.searchText;//значение строки поиска фильма
	this.picOtsHLR;
	this.arrCountFilmsOfCategory;//ассоциативный массив, где key - названия категорий с !0 количеством фильмов, а value - количесвтво
	this.menuPagePhp = 'php/menu.php';
	this.menuNewPagePhp = 'php/menuNew.php';
	this.addDelPagePhp = 'php/ad_ed_de.php';
	this.pagePagePhp = 'php/page.php';
	this.parserPagePhp = 'php/parseTest2.php';
	this.parserAddPagePhp = 'php/parserFilmsAdd.php';
	this.filePagePhp = 'php/file.php';
	this.editPagePhp = 'php/editing.php';
	this.parserFilmPagePhp = 'php/parserFilms2.php';
	this.parserFilmMPagePhp = 'php/parserFilmsM.php';
	this.passwordPagePhp = 'php/password.php';
//переменные файлов php	
	this.getmenuPagePhp = function(){return this.menuPagePhp;}
	this.getmenuNewPagePhp = function(){return this.menuNewPagePhp;}
	this.getAddDelPagePhp = function(){return this.addDelPagePhp;}
	this.getpagePagePhp = function(){return this.pagePagePhp;}
	this.getparserPagePhp = function(){return this.parserPagePhp;}
	this.getparserAddPagePhp = function(){return this.parserAddPagePhp;}
	this.getfilePagePhp = function(){return this.filePagePhp;}
	this.geteditPagePhp = function(){return this.editPagePhp;}
	this.getparserFilmPagePhp = function(){return this.parserFilmPagePhp;}
	this.getparserFilmMPagePhp = function(){return this.parserFilmMPagePhp;}
//сетеры и гетеры для настроек	
	this.setpageW = function(pageW){this.pageW = pageW;}
	this.getpageW = function(){return this.pageW;}
	this.setpageH = function(pageH){this.pageH = pageH;}
	this.getpageH = function(){return this.pageH;}
	this.setbuttonHeight = function(buttonHeight){this.buttonHeight = buttonHeight;}
	this.getbuttonHeight = function(){return this.buttonHeight;}
	this.setpicKolW = function(picKolW){this.picKolW = picKolW;}
	this.getpicKolW = function(){return this.picKolW;}
	this.setpicKolH = function(picKolH){this.picKolH = picKolH;}
	this.getpicKolH = function(){return this.picKolH;}
	this.setcount = function(count){this.count = count;}
	this.getcount = function(){return this.count;}
	this.setpageCount = function(pageCount){this.pageCount = pageCount;}
	this.getpageCount = function(){return this.pageCount;}
	this.setpage = function(page){this.page = page;}
	this.getpage = function(){return this.page;}
	this.setarrCategory = function(arrCategory){this.arrCategory = arrCategory;}
	this.getarrCategory = function(){return this.arrCategory;}
	this.setselectedIndex = function(selectedIndex){this.selectedIndex = selectedIndex;}
	this.getselectedIndex = function(){return this.selectedIndex;}
	this.setselectedIndex = function(selectedIndex){this.selectedIndex = selectedIndex;}
	this.getselectedIndex = function(){return this.selectedIndex;}
	this.setsearchText = function(searchText){this.searchText = searchText;}
	this.getsearchText = function(){return this.searchText;}
	this.setpicOtsHLR = function(picOtsHLR){this.picOtsHLR = picOtsHLR;}
	this.getpicOtsHLR = function(){return this.picOtsHLR;}
	this.setarrCountFilmsOfCategory = function(arrCountFilmsOfCategory){this.arrCountFilmsOfCategory = arrCountFilmsOfCategory;}
	this.getarrCountFilmsOfCategory = function(){return this.arrCountFilmsOfCategory;}
}

var opt = new OptionsPage();

function varToParamGl(arr){//заполнение глобальных параметров значениями из XML от сервера
	var i=0, arrCategory=[], countFOC=0, arrcountFOC={};
	var count=0, picKolW=0, picKolH=0;
	for(i=0; i<arr.length; i++)
		switch(i){
			case 0: opt.setPageW(arr[i]);break;
			case 1: opt.setPageH(arr[i]);break;
			case 2: opt.setbuttonHeight(arr[i]);break;
			case 3: opt.setpicKolW(arr[i]);break;
			case 4: opt.setpicKolH(arr[i]);break;
		}
	opt.setcount(+rezult.getElementsByTagName('countAllFilms')[0].textContent);
	opt.setpageCount(Math.ceil(opt.getcount()/(opt.getpicKolW()*opt.getpicKolH())));
	for(i=0; i<rezult.getElementsByTagName('category').length; i++)
		arrCategory[i] = rezult.getElementsByTagName('category')[i].textContent;
	opt.setarrCategory(arrCategory);
	//opt.setarrCountFilmsOfCategory()
	countFOC = (rezult.getElementsByTagName('countFilmsOfCategory')[0]).getElementsByTagName('items').length;
	for(i=0; i<countFOC; i++){
		arrcountFOC[rezult.getElementsByTagName('keyCateg')[i].textContent] = rezult.getElementsByTagName('valueCateg')[i].textContent;
	}
	opt.arrCountFilmsOfCategory = arrcountFOC;
}
/*
function afterCreate(){//отрисовка страницы средствами JS
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function(){
		if(xhttp.status==200 && xhttp.readyState==4){
			rezult = xhttp.responseXML;
			varToParamGl(picturesCountXY(rezult, opt));
			navPages(opt.getpageCount(), opt.getpage());
			createCategorySelect(opt.getarrCategory(),opt.getselectedIndex());
			createSearchText(opt.getsearchText());
			go_menu('admin');
			var cl = document.documentElement.clientWidth/2;
			$('#mTable').css({'position':'relative', 'left':cl});
		}
	}
	xhttp.open('POST', 'menuNew.php', true);
	xhttp.setRequestHeader('Content-type','application/x-www-form-urlencoded');
	xhttp.send();
}*//*
$(window).resize(function(){
  //alert("Stop it!");
  opt.setpageW()
});*/

function afterCreate(){
	$.ajax({
		type:'POST',
		url:opt.getmenuNewPagePhp(),
		async:true,
		data:'',
		cache:false,
		dataType:"xml",
		success: function(data){
				rezult = data;
				varToParamGl(picturesCountXY(rezult, opt));
				navPages(opt.getpageCount(), opt.getpage());
				createCategorySelect(opt.getarrCategory(),opt.getselectedIndex());
				createSearchText(opt.getsearchText());
				go_menu('admin');
				var cl = document.documentElement.clientWidth/2;
				//$('#mTable').css({'position':'relative', 'left':cl});
				$('#filmsPage').css({'width':opt.getpageW()});
				$('#mainPage').css({'width':screen.width});
				$('#menuTable').css({'width':screen.width});
				$('#mTable').css({'margin':'auto'});
				setTimeout('drawCategory()', 1000);
			}
	});
}

function showRssFT(th){//RSS с fasttorrent
	var dispN = $('#rssLeft').css('display');
	if(dispN != 'none'){
		$('#rssLeft').animate({'width':0, border:0}, function(){$('#rssLeft').css({display:'none'})});
		$(th).animate({'left':0});
	}else{
		$('#rssLeft').show().animate({'width':610}).css({display:'block'});
		$(th).animate({'left':615});
	}
	var arr = getRSS('L','http://fasttorrent.ru/feeds/rss/');
	$('#rssLeft').scrollbox();
}

function showRssKP(th){//RSS с кинопоиска
	var winW = document.documentElement.clientWidth;
	var dispN = $('#rssRight').css('display');
	if(dispN != 'none'){
		$('#rssRight').animate({'left':'100%','width':0, border:0}, function(){$('#rssRight').css({display:'none'})});
		$(th).animate({'left':winW-40});
	}else{
		$('#rssRight').show().animate({'width':610,'left':winW-620}).css({display:'block'});
		$(th).animate({'left':winW-650});
	}
	var arr = getRSS('R','http://www.kinopoisk.ru/news.rss');
	//setTimeout("$('#rssRight').scrollbox()", 1500);
	$('#rssRight').scrollbox();
}

/* RSS */
 function getRSS(st, feedUrl) {//взять RSS по ссылке
	$.get('php/proxy.php?url=' + feedUrl, function(data) {
		var html = "<ul>";
		$(data).find('item').each(function() {
			var title = $(this).find('title').text();
			var url = $(this).find('link').text();
			var description = $(this).find('description').text();
			var pubDate = $(this).find('pubDate').text();
			html  += "<li class='entry'><span class='postTitle'>" + "<a href='" + url + "' target='_blank'>"+title+"</a></span></li>";
		});
		html += "</ul>";
		if(st=='L')$('#rssLeft').append($(html));
		else $('#rssRight').append($(html));
	});
 }  
 /* RSS */

function setReyt(th, num){//получить рейтинг для фильма
	var id= $(th).closest('.photoblock').find('.filmPoster').attr('id');//получить id фильма
	var str = 'id='+id+'&num='+num+'&func=updateReyt';//строка для отправки в php
	$(th).closest('.iDiv').find('#dig').text(num);//обновление оценки фильма
	xhttpRequest('', opt.getAddDelPagePhp(), str);//отправка запроса к php
	$(th).closest('.starsReyt').animate({//спрятать div с оценкой
									'height':0,
									'top':0
								}).find('div').hide(300);
}

function viewFilm(th, pPage){
	$('#prev').attr('disabled', 'disabled');
	$('#forv').attr('disabled', 'disabled');
	var str = 'id='+th.id+'&pPage='+pPage;
	xhttpRequest('filmsPage', opt.getpagePagePhp(), str);
	$('#pageF').css({width:opt.getpageW()});
	//$('#filmsPage').css({'padding-right':15});
}

function parseK(){
	xhttpRequest('parseRes', opt.parserPagePhp(), 'id=3434');
}

function xhttpRequest(documentGetElementByIdInnerHTML, pagePHP, str){
	if(documentGetElementByIdInnerHTML !='downloadLink' && documentGetElementByIdInnerHTML !='')loading();
	xhttp=new XMLHttpRequest();
	xhttp.onreadystatechange=function(){
		if (xhttp.readyState==4 && xhttp.status==200){
			if(documentGetElementByIdInnerHTML!=''){
				if(documentGetElementByIdInnerHTML=='sin'){
					$(documentGetElementByIdInnerHTML).val(xhttp.responseText);
				}
				else if(documentGetElementByIdInnerHTML=='mainpage'){
					$('#prev').removeAttr('disabled');
					$('#forv').removeAttr('disabled');
					$('#filmsPage').css({'padding-right':0});
					window.scrollTo(0,0);
				}
				else{
					$(documentGetElementByIdInnerHTML).css({'paddingLeft':'0'});
					document.getElementById(documentGetElementByIdInnerHTML).innerHTML=xhttp.responseText;
					//$(documentGetElementByIdInnerHTML).val(xhttp.responseText);
				}
			//setTimeout(function(){document.getElementById(documentGetElementByIdInnerHTML).innerHTML='';},3000);
			}
			$('#parser').css({'display': 'none'});
		}
	}
	xhttp.open('POST',pagePHP,true);
	xhttp.setRequestHeader('Content-type','application/x-www-form-urlencoded');
	xhttp.send(str);
}

function category(){
	var  searchCategory = $('#searchSelect').val();
	var selectedIndex = $("#searchSelect option").index($("#searchSelect option:selected"));
	xhttpRequest('filmsPage', opt.getmenuPagePhp(), 'searchCategory='+searchCategory+'&selectedIndex='+selectedIndex);
}

function searchKP(id, page){
	var searchText = $('#search_text').val();
	if(searchText!=''){
		var str = 'filmName='+searchText;
		xhttpRequest('', opt.getparserAddPagePhp(), str);
		setTimeout(function(){xhttpRequest('mainPage', opt.getmenuPagePhp(), 'id='+id+'&pPage='+page);},2000);
	}
}

function search(){
	var searchText = $('#search_text').val();
	if(searchText!=''){
		var str = '&searchText='+searchText;
		xhttpRequest('mainPage', opt.getmenuPagePhp(), str);
	}
}

function period(){
	var periodicalFunctionVar = periodicalFunction.periodical(2000);
}

function go_page(th, pPage, PR){
	if(PR==null){
		$('.pageNumAllAct').removeClass('pageNumAllAct');
		if(pPage!=null){
			var page = opt.getpage();
			page += +pPage;
			opt.setpage(page);
			$('.pageNumAll:contains('+page+')').addClass('pageNumAllAct');
		}
		else {
			page = +th.textContent;
			opt.setpage(page);
			$(th).addClass('pageNumAllAct');
		}
	}else{
		var page=pPage;
	}
	var str='page='+page;
	xhttpRequest('filmsPage', opt.getmenuPagePhp(), str);
}

function none(alternativeName){
	document.getElementById(alternativeName).style.display = 'none';
}

function view_film(number){
	var alternativeName = 'alternativeName_'+number;
	var name = document.getElementById(alternativeName).innerText;
}

function getRandomInt(min, max){
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function view_film2(number, altName, exeName){//обработка данных для генерации bat файла
	var con1 = 'Скачать для просмотра в папку '+filmsPath;
	var con2 = 'Ошибка генерации файла';
	var con3 = 'Фильм еще не скачан';
	var con4 = 'Сохранить в папку '+filmsPath;
	var alternativeName = 'alternativeName_'+number;
	var text_button = '';
	var name='';
	var jBool = false;
	if( document.getElementById(alternativeName) ===null){
		name = altName;
		jBool = true;
	}
	else name = document.getElementById(alternativeName).innerText;
	//if(name=='')name = document.getElementById('name').innerText;
	var exeN = '';
	if( document.getElementById('exeName') ===null)
		exeN = exeName;
	else exeN = document.getElementById('exeName').innerText;
	var fileName = '_film.bat';//getRandomInt(1000000, 9999999)+'.bat';
	xhttp=new XMLHttpRequest();
	xhttp.onreadystatechange=function(){
	   if (xhttp.readyState==4 && xhttp.status==200){
			text_button = xhttp.responseText;
			if(jBool == false){
				var view = 'view_film'+number;
				var alternativeName = 'hh'+number;
				document.getElementById(alternativeName).style.display = 'inline';
				textFileBat(jBool, text_button, view, alternativeName);
				switch(text_button){
					case '1':document.getElementById(view).value = con1;
						document.getElementById(alternativeName).href = fileName;
					break;
					case '2':document.getElementById(view).value = con2;break;
					case '3':document.getElementById(view).value = con3;
						document.getElementById('butFT').style.display = 'inline';
					break;
				}
			}else{
				var bText = '';
				//var message = $("<a href='' id='fBat'><img  class='dImg2'  id='view_film'/></a>");
				//$('#bF').parent().append(message);
				//$('#bF').hide();
				//$('#fBat').attr({'href': fileName});
				switch(text_button){//src='/images/system/download.png'
					case '1':
						var message = $("<a href='' id='fBat'><img  class='dImg2'  id='view_film'/></a>");
						bText = con4;
						$('#bF').parent().append(message);
						$('#fBat').attr({'href': fileName});
						$('.dImg2').attr({'src':'/images/system/download.png'});
					break;
					case '2':
						var message = $("<img  class='dImg2'  id='view_film'/>");
						$('#bF').parent().append(message);
						bText = con2;
						$('.dImg2').attr({'src':'/images/system/error.png'});
					break;
					case '3':
						var message = $("<div id='fBat'><img  class='dImg2'  id='view_film'/></div>");
						$('#bF').parent().append(message);
						bText = con3;
						$('.dImg2').attr({'src':'/images/system/error.png'});
					break;
				}
				$('#view_film').val(bText);
			}
		 }
	   }
	xhttp.open('POST',opt.getfilePagePhp(),true);
	xhttp.setRequestHeader('Content-type','application/x-www-form-urlencoded');
	var str='filmsPath='+filmsPath+'&name='+name+'&exe='+exeN+'&fileName='+fileName;
	xhttp.send(str);
}

function del(number){
	switch (number){
		case '1' : 
			document.getElementById('view_film1').style.display = "inline";
			document.getElementById('view_film2').style.display = "none";
			document.getElementById('view_film3').style.display = "none";
			document.getElementById('view_film4').style.display = "none";
			document.getElementById('view_film5').style.display = "none";
		break;
		case '2' : document.getElementById('view_film1').style.display = "none";
			document.getElementById('view_film2').style.display = "inline";
			document.getElementById('view_film3').style.display = "none";
			document.getElementById('view_film4').style.display = "none";
			document.getElementById('view_film5').style.display = "none";
		break;
		case '3' : document.getElementById('view_film1').style.display = "none";
			document.getElementById('view_film2').style.display = "none";
			document.getElementById('view_film3').style.display = "inline";
			document.getElementById('view_film4').style.display = "none";
			document.getElementById('view_film5').style.display = "none";
		break;
		case '4' : document.getElementById('view_film1').style.display = "none";
			document.getElementById('view_film2').style.display = "none";
			document.getElementById('view_film3').style.display = "none";
			document.getElementById('view_film4').style.display = "inline";
			document.getElementById('view_film5').style.display = "none";
		break;
		case '5' : document.getElementById('view_film1').style.display = "none";
			document.getElementById('view_film2').style.display = "none";
			document.getElementById('view_film3').style.display = "none";
			document.getElementById('view_film4').style.display = "none";
			document.getElementById('view_film5').style.display = "inline";
		break;
	}
}

function pic_copy(){
	var host = '192.168.1.89';
	var port = '8008'+'/';
	var main_folder = '';
	var folder1 = 'pictures'+'/';
	var pic_file = document.getElementById('pic_file').value;
	var i=pic_file.indexOf('fakepath');
	if(i>-1){
		var pic_file = pic_file.substring(i+9,pic_file.length);
		path = 'http://'+host+':'+port;
		if(main_folder!='')path=path+main_folder;
		if(folder1!='')path = path + folder1+pic_file;
		else path = path+pic_file;
		path_pic = path;
	}
	else{
		var i=pic_file.indexOf('pictures');
		var pic_file = pic_file.substring(i+9,pic_file.length);
		path = 'http://'+host+':'+port;
		if(main_folder!='')path=path+main_folder;
		if(folder1!='')path = path + folder1+pic_file;
		else path = path+pic_file;
		path_pic = path;
	}
	return path_pic;
}

function infocus(w){
	w.value='';
}

function notfocus(w){
	/*var str=w.defaultValue;
	switch (str){
		case 'Название фильма': if(w.value=='')w.value = w.defaultValue;break;
		case 'Год выхода': if(w.value=='')w.value = w.defaultValue;break;
		case 'Страна': if(w.value=='')w.value = w.defaultValue;break;
		case 'Режиссер': if(w.value=='')w.value = w.defaultValue;break;
		case 'Жанр': if(w.value=='')w.value = w.defaultValue;break;
		case 'Время': if(w.value=='')w.value = w.defaultValue;break;
		case 'Возрастная категория': if(w.value=='')w.value = w.defaultValue;break;
		case 'Премьера': if(w.value=='')w.value = w.defaultValue;break;
	}*/
}

function make_change(func, n, i){
	var str = '';
	switch (func){
		case 'add_acter':{
			var name_acter = document.getElementById('name_acter').value;
			var name_eng = document.getElementById('name_eng').value;
			var dateA = document.getElementById('dateA').value;
			str = 'name_acter='+name_acter+'&name_eng='+name_eng+'&dateA='+dateA;
		}
		break;
		case 'add_film_acter_edit':{
			var name1 = document.getElementById('name1').value;
			var name2 = document.getElementById('name2').value;
			var name3 = document.getElementById('name3').value;
			var name4 = document.getElementById('name4').value;
			var name5 = document.getElementById('name5').value;
			var name6 = document.getElementById('name6').value;
			var name7 = document.getElementById('name7').value;
			var name8 = document.getElementById('name8').value;
			var name9 = document.getElementById('name9').value;
			var name10 = document.getElementById('name10').value;
			var nameF = document.getElementById('nameF').value;
			str = 'name1='+name1+'&name2='+name2+'&name3='+name3+'&name4='+
			name4+'&name5='+name5+'&name6='+name6+'&name7='+name7+
			'&name8='+name8+'&name9='+name9+'&name10='+name10+'&nameF='+nameF;
		}
		break;
		case 'add_film':{
			var name_film = document.getElementById('name_film').value;
			var name_eng = document.getElementById('name_eng').value;
			var year_film = document.getElementById('year_film').value;
			var country_film = document.getElementById('country_film').value;
			var director = document.getElementById('director').value;
			var genre = document.getElementById('genre').value;
			var total_time = document.getElementById('total_time').value;
			var age = document.getElementById('age').value;
			var premiere = document.getElementById('premiere').value;
			var other = document.getElementById('other').value;
			path_pic = pic_copy();
			str = 'name_film='+name_film+'&name_eng='+name_eng+'&year_film='+year_film+'&country_film='+
			country_film+'&director='+director+'&genre='+genre+'&total_time='+total_time+
			'&age='+age+'&premiere='+premiere+'&other='+other+'&path_pic='+path_pic;
		}
		break;
		case 'add_film_excel':{
			//var nd = 'dv'+n
			//if(n==100 || n==200 || n==300 || n==400)alert(n);
			//var name_film = document.getElementById(nd).value;
			var n1n2 = n;//document.all.test_div.childNodes[n-1].innerHTML;
			var nRnE = n1n2.split('$');
			//alert(nRnE);
			var name_film = nRnE[0];//document.all.test_div.childNodes[n-1].innerHTML;
			var name_eng = nRnE[1];
			var year_film = nRnE[2];
			var country_film = nRnE[3];
			var director = nRnE[4];
			var genre = nRnE[5];
			var total_time = nRnE[6]+' мин.';
			var age = '';
			var premiere = '';
			var other = '';
			path_pic = '';
			str = 'name_film='+name_film+'&name_eng='+name_eng+'&year_film='+year_film+'&country_film='+
			country_film+'&director='+director+'&genre='+genre+'&total_time='+total_time+
			'&age='+age+'&premiere='+premiere+'&other='+other+'&path_pic='+path_pic;
		}
		break;
	}
	
	xhttp=new XMLHttpRequest();
	xhttp.onreadystatechange=function(){
	   if (xhttp.readyState==4 && xhttp.status==200){
			if(document.getElementById('fucn_result')!=null)document.getElementById('fucn_result').innerHTML=xhttp.responseText;
			switch(func){
				case 'add':{
					document.getElementById('name_film').value="Название фильма";
					document.getElementById('name_eng').value="Оригинальное название";
					document.getElementById('year_film').value="Год выхода";
					document.getElementById('country_film').value="Страна";
					document.getElementById('director').value="Режиссер";
					document.getElementById('genre').value="Жанр";
					document.getElementById('total_time').value="Время";
					document.getElementById('age').value="Возрастная категория";
					document.getElementById('premiere').value="Премьера";
					document.getElementById('other').value='';
				}
				break;
			}
		 }
	   }
	xhttp.open('POST',opt.getAddDelPagePhp(),true);
	xhttp.setRequestHeader('Content-type','application/x-www-form-urlencoded');
	var str=str+'&func='+func;
	xhttp.send(str);
}

function editingInfo(func,w){
	var viewEdit='';
	xhttp=new XMLHttpRequest();
	xhttp.onreadystatechange=function(){
		if (xhttp.readyState==4 && xhttp.status==200){
			switch(func){
				case 'add_film_acter_edit':
					document.getElementById('add_film_main_edit').innerHTML=xhttp.responseText;	
					//document.getElementById('add_film_main_edit').style.display = 'none';	
					
				break;
				case 'add_acter':
					document.getElementById('add_acter').innerHTML=xhttp.responseText;	
					//document.getElementById('add_film_main_edit').style.display = 'none';	
					
				break;
				case 'add_acter_view':
					document.getElementById('add_film_main2').innerHTML=xhttp.responseText;	
					//document.getElementById('add_film_main_edit').style.display = 'none';	
					
				break;
				case 'add_acter_edit':
					document.getElementById('add_film_main2').innerHTML=xhttp.responseText;	
					//document.getElementById('add_film_main_edit').style.display = 'none';	
					
				break;
				default:{
					document.getElementById('add_film_main').innerHTML=xhttp.responseText;
					//document.getElementById('add_film_main').style.display = 'none';
					//jq_pr();
				}
			}
		}
	}
	xhttp.open('POST',opt.geteditPagePhp(),false);
	xhttp.setRequestHeader('Content-type','application/x-www-form-urlencoded');
	var str='func='+func;
	//if(w!=null) str=str+'&f_id='+w.firstChild.innerText+'&f_name='+w.lastChild.innerText;
	if(w!=null) {
		str=str+'&f_id='+w.childNodes[1].innerText+'&f_name='+w.childNodes[3].innerText;
	}
	xhttp.send(str);
}

function clearHTML(){
	document.getElementById('add_film_main_edit').innerHTML = '';
	document.getElementById('add_film_main').innerHTML = '';
	//go_action('add','film_acter');
}

function cl(value, name){
	document.getElementById(name).value = value;
}

function go_action(func, scheme, w, page, param){
	switch(func){
		case 'add':{
			switch (scheme){
				case 'film': {
					document.getElementById('add_film_main_edit').innerHTML = '';
					editingInfo(func+'_'+scheme);
				}
				break;
				case 'film_acter_edit': {
					//if(document.getElementById('add_film_main').innerText!='')document.getElementById('add_film_main').innerHTML = '';
					editingInfo(func+'_'+scheme,w);
				}
				break;
				case 'film_acter': {
					//if(document.getElementById('add_film_main').innerText!='')document.getElementById('add_film_main').innerHTML = '';
					editingInfo(func+'_'+scheme);
				}
				break;
				case 'acter_view': {
					editingInfo(func+'_'+scheme);
				}
				break;
				case 'acter_view_edit': {
					//editingInfo(func+'_'+scheme);
					if(document.getElementById('names')){
						var ft = document.getElementById('names');
						for(var i=0; i<ft.children.length; i++){
							var ftCh = ft.children[i];
							if(ftCh.tagName == 'INPUT' && ftCh.type=='text'){
								if(ftCh.value==w.innerText)break;
								if(ftCh.value == '' || ftCh.value == 'Имя актера') {
									ftCh.value = w.innerText;
									w.readOnly
									break;
								}
							}
						}
					}
				}
				break;
				case 'acter': //document.getElementById('add_film_main').style.display = 'none';
					editingInfo(func+'_'+scheme);
				break;
			}
		}
		break;
		case 'edit':{
			switch (scheme){
				case 'film': document.getElementById('add_film_main').style.display = 'inline';
				break;
				case 'acter': document.getElementById('add_film_main').style.display = 'none';
				break;
			}
		}
		break;
		case 'delete':{
			switch (scheme){
				case 'film': //document.getElementById('add_film_main').style.display = 'inline';
					var str = 'filmName='+param+'&id='+w+'&func='+func+'_'+scheme;
					xhttpRequest('',opt.getAddDelPagePhp(), str);
					xhttpRequest('filmsPage', opt.getmenuPagePhp(), 'page='+page);
				break;
				case 'acter': document.getElementById('add_film_main').style.display = 'none';
				break;
			}
		}
		break;
		case 'exit': document.location.replace("index.php");
		break;
		case 'clear':
			document.getElementById('add_film_main_edit').innerHTML = '';
			document.getElementById('add_film_main').innerHTML = '';
			document.getElementById('add_acter').innerHTML = '';
		break;
		case 'prev':
			$('#prev').removeAttr('disabled');
			$('#forv').removeAttr('disabled');
			prevPage = page;
			go_page(w, page, 'P');
			//document.location.replace("main.html");
		break;
		case 'synchronization':{
			if(scheme=='undefined' || scheme==''){
				//param = convert(param);
				scheme = param;
			}
			var str = 'filmName='+scheme+'&id='+w;
			xhttpRequest('', opt.getparserFilmPagePhp(), str);
			xhttpRequest('filmsPage', opt.getpagePagePhp(), 'id='+w+'&pPage='+page);
		}
		break;
		case 'downloadFT':{
			var str = 'nameEng='+w+'&director='+param;
			xhttpRequest('downloadLink', opt.getparserFilmMPagePhp(), str);
		}
		break;
	}
}
/*
%7D%7B%EE%F2%F2%40%E1%FC%29%F7
*/
function convert(inputStr){
	var outputStr='';
	var len = inputStr.length;
	for(var i = 0; i < len; i++){
		switch(inputStr[i]){
			case ' ': outputStr += '+'; break;
			case 'А': outputStr += '%C0'; break;
			case 'Б': outputStr += '%C1'; break;
			case 'В': outputStr += '%C2'; break;
			case 'Г': outputStr += '%C3'; break;
			case 'Д': outputStr += '%C4'; break;
			case 'Е': outputStr += '%C5'; break;
			case 'Ж': outputStr += '%C6'; break;
			case 'З': outputStr += '%C7'; break;
			case 'И': outputStr += '%C8'; break;
			case 'Й': outputStr += '%C9'; break;
			case 'К': outputStr += '%CA'; break;
			case 'Л': outputStr += '%CB'; break;
			case 'М': outputStr += '%CC'; break;
			case 'Н': outputStr += '%CD'; break;
			case 'О': outputStr += '%CE'; break;
			case 'П': outputStr += '%CF'; break;
			case 'Р': outputStr += '%D0'; break;
			case 'С': outputStr += '%D1'; break;
			case 'Т': outputStr += '%D2'; break;
			case 'У': outputStr += '%D3'; break;
			case 'Ф': outputStr += '%D4'; break;
			case 'Х': outputStr += '%D5'; break;
			case 'Ц': outputStr += '%D6'; break;
			case 'Ч': outputStr += '%D7'; break;
			case 'Ш': outputStr += '%D8'; break;
			case 'Щ': outputStr += '%D9'; break;
			case 'Ъ': outputStr += '%DA'; break;
			case 'Ы': outputStr += '%DB'; break;
			case 'Ь': outputStr += '%DC'; break;
			case 'Э': outputStr += '%DD'; break;
			case 'Ю': outputStr += '%DE'; break;
			case 'Я': outputStr += '%DF'; break;
			
			case 'а': outputStr += '%E0'; break;
			case 'б': outputStr += '%E1'; break;
			case 'в': outputStr += '%E2'; break;
			case 'г': outputStr += '%E3'; break;
			case 'д': outputStr += '%E4'; break;
			case 'е': outputStr += '%E5'; break;
			case 'ж': outputStr += '%E6'; break;
			case 'з': outputStr += '%E7'; break;
			case 'и': outputStr += '%E8'; break;
			case 'й': outputStr += '%E9'; break;
			case 'к': outputStr += '%EA'; break;
			case 'л': outputStr += '%EB'; break;
			case 'м': outputStr += '%EC'; break;
			case 'н': outputStr += '%ED'; break;
			case 'о': outputStr += '%EE'; break;
			case 'п': outputStr += '%EF'; break;
			case 'р': outputStr += '%F0'; break;
			case 'с': outputStr += '%F1'; break;
			case 'т': outputStr += '%F2'; break;
			case 'у': outputStr += '%F3'; break;
			case 'ф': outputStr += '%F4'; break;
			case 'х': outputStr += '%F5'; break;
			case 'ц': outputStr += '%F6'; break;
			case 'ч': outputStr += '%F7'; break;
			case 'ш': outputStr += '%F8'; break;
			case 'щ': outputStr += '%F9'; break;
			case 'ъ': outputStr += '%FA'; break;
			case 'ы': outputStr += '%FB'; break;
			case 'ь': outputStr += '%FC'; break;
			case 'э': outputStr += '%FD'; break;
			case 'ю': outputStr += '%FE'; break;
			case 'я': outputStr += '%FF'; break;
			
			case '{': outputStr += '%7B'; break;
			case '|': outputStr += '%7C'; break;
			case '}': outputStr += '%7D'; break;
			case '~': outputStr += '%7E'; break;
			case '(': outputStr += '%28'; break;
			case ')': outputStr += '%29'; break;
			case '@': outputStr += '%40'; break;
			default: outputStr += inputStr[i];
		}
	}
	return outputStr;
}

function loading(){
	/*document.getElementById('parser').style.width= screen.width+'px';
	document.getElementById('parser').style.height= screen.height+'px';
	document.getElementById('parser').style.position= 'absolute';
	document.getElementById('parser').style.top= ''+document.getElementById('page').offsetTop+'px';
	//document.getElementById('parser').style.left= ''+document.getElementById('page').offsetLeft+'px';
	document.getElementById('parser').style.display= 'inline';
	document.getElementById('parser').style.background= 'white';*/
}

function registration(){
	xhttp=new XMLHttpRequest();
	xhttp.onreadystatechange=function(){
	   if (xhttp.readyState==4 && xhttp.status==200){
			document.location.replace("registration.php");
		 }
	   }
	//xhttp.open('POST','menu.php',true);
	xhttp.open('POST','registration.php',true);
	xhttp.setRequestHeader('Content-type','application/x-www-form-urlencoded');
	var str='';//'menu='+menu;
	xhttp.send(str);
}

function go_menu(menu){
	//document.getElementById('login_pas').style.display = 'none';
	//var menu = 'admin';
	
	//opt.setpicKolW(44);
	xhttp=new XMLHttpRequest();
	xhttp.onreadystatechange=function(){
	   if (xhttp.readyState==4 && xhttp.status==200){
			//document.location.replace("main.html");
			//document.getElementById('mainPage').innerHTML=xhttp.responseText;
			document.getElementById('filmsPage').innerHTML=xhttp.responseText;
			//document.getElementById('mainPage').style.height=''+document.body.clientHeight+'px';
			//document.getElementById('mainPage').style.height=''+screen.height+'px';
			document.getElementById('filmsPage').style.height=''+screen.height+'px';
		 }
	   }
	//xhttp.open('POST','menu.php',true);
	xhttp.open('POST',opt.getmenuPagePhp(),true);
	xhttp.setRequestHeader('Content-type','application/x-www-form-urlencoded; charset=utf-8');
	var str='menu='+menu+'&picKolW='+opt.getpicKolW()+'&picKolH='+opt.getpicKolH()+'&page='+opt.getpage()+'&pageW='+opt.getpageW()+'&pageH='+opt.getpageH()+'&picOtsHLR='+opt.getpicOtsHLR();
	xhttp.send(str);
}

function checkKey(e, func) {
	var inp = document.getElementById('password');
	if(e.keyCode == "13") {
		if(func=='search')search();
		else pass();
	}
}


function pass(){
	var str = '';
	var login = document.getElementById('login').value;
	var password = document.getElementById('password').value;
	if(login=='')return;
	if(password=='')return;
	xhttp=new XMLHttpRequest();
	xhttp.onreadystatechange=function(){
	   if (xhttp.readyState==4 && xhttp.status==200){
			document.getElementById('log_pas').innerHTML=xhttp.responseText;
			var rez=document.getElementById('log_pas').innerHTML;
			//if(rez=='Авторизация успешна')go_menu(0);
			//if(rez=='Авторизация успешна+')go_menu(1);
			//if(rez=='Авторизация успешна')document.location.replace("menu.php");
			if(rez=='Авторизация успешна')document.location.replace("main.html");
			if(rez=='Авторизация успешна+')document.location.replace("menu_admin.php");
		 }
	   }
	xhttp.open('POST',opt.getpasswordPagePhp(),true);
	xhttp.setRequestHeader('Content-type','application/x-www-form-urlencoded');
	var str='login='+login+'&password='+password+'&lnl='+document.getElementById('password').value+'&lnl2='+login+'&clWidth='+screen.width+'&clHeight='+screen.height;
	xhttp.send(str);
}//pass

function MD5(string) {
 
   function RotateLeft(lValue, iShiftBits) {
           return (lValue<<iShiftBits) | (lValue>>>(32-iShiftBits));
   }
 
   function AddUnsigned(lX,lY) {
           var lX4,lY4,lX8,lY8,lResult;
           lX8 = (lX & 0x80000000);
           lY8 = (lY & 0x80000000);
           lX4 = (lX & 0x40000000);
           lY4 = (lY & 0x40000000);
           lResult = (lX & 0x3FFFFFFF)+(lY & 0x3FFFFFFF);
           if (lX4 & lY4) {
                   return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
           }
           if (lX4 | lY4) {
                   if (lResult & 0x40000000) {
                           return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
                   } else {
                           return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
                   }
           } else {
                   return (lResult ^ lX8 ^ lY8);
           }
   }
 
   function F(x,y,z) { return (x & y) | ((~x) & z); }
   function G(x,y,z) { return (x & z) | (y & (~z)); }
   function H(x,y,z) { return (x ^ y ^ z); }
   function I(x,y,z) { return (y ^ (x | (~z))); }
 
   function FF(a,b,c,d,x,s,ac) {
           a = AddUnsigned(a, AddUnsigned(AddUnsigned(F(b, c, d), x), ac));
           return AddUnsigned(RotateLeft(a, s), b);
   };
 
   function GG(a,b,c,d,x,s,ac) {
           a = AddUnsigned(a, AddUnsigned(AddUnsigned(G(b, c, d), x), ac));
           return AddUnsigned(RotateLeft(a, s), b);
   };
 
   function HH(a,b,c,d,x,s,ac) {
           a = AddUnsigned(a, AddUnsigned(AddUnsigned(H(b, c, d), x), ac));
           return AddUnsigned(RotateLeft(a, s), b);
   };
 
   function II(a,b,c,d,x,s,ac) {
           a = AddUnsigned(a, AddUnsigned(AddUnsigned(I(b, c, d), x), ac));
           return AddUnsigned(RotateLeft(a, s), b);
   };
 
   function ConvertToWordArray(string) {
           var lWordCount;
           var lMessageLength = string.length;
           var lNumberOfWords_temp1=lMessageLength + 8;
           var lNumberOfWords_temp2=(lNumberOfWords_temp1-(lNumberOfWords_temp1 % 64))/64;
           var lNumberOfWords = (lNumberOfWords_temp2+1)*16;
           var lWordArray=Array(lNumberOfWords-1);
           var lBytePosition = 0;
           var lByteCount = 0;
           while ( lByteCount < lMessageLength ) {
                   lWordCount = (lByteCount-(lByteCount % 4))/4;
                   lBytePosition = (lByteCount % 4)*8;
                   lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount)<<lBytePosition));
                   lByteCount++;
           }
           lWordCount = (lByteCount-(lByteCount % 4))/4;
           lBytePosition = (lByteCount % 4)*8;
           lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80<<lBytePosition);
           lWordArray[lNumberOfWords-2] = lMessageLength<<3;
           lWordArray[lNumberOfWords-1] = lMessageLength>>>29;
           return lWordArray;
   };
 
   function WordToHex(lValue) {
           var WordToHexValue="",WordToHexValue_temp="",lByte,lCount;
           for (lCount = 0;lCount<=3;lCount++) {
                   lByte = (lValue>>>(lCount*8)) & 255;
                   WordToHexValue_temp = "0" + lByte.toString(16);
                   WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length-2,2);
           }
           return WordToHexValue;
   };
 
   function Utf8Encode(string) {
           string = string.replace(/\r\n/g,"\n");
           var utftext = "";
 
           for (var n = 0; n < string.length; n++) {
 
                   var c = string.charCodeAt(n);
 
                   if (c < 128) {
                           utftext += String.fromCharCode(c);
                   }
                   else if((c > 127) && (c < 2048)) {
                           utftext += String.fromCharCode((c >> 6) | 192);
                           utftext += String.fromCharCode((c & 63) | 128);
                   }
                   else {
                           utftext += String.fromCharCode((c >> 12) | 224);
                           utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                           utftext += String.fromCharCode((c & 63) | 128);
                   }
 
           }
 
           return utftext;
   };
 
   var x=Array();
   var k,AA,BB,CC,DD,a,b,c,d;
   var S11=7, S12=12, S13=17, S14=22;
   var S21=5, S22=9 , S23=14, S24=20;
   var S31=4, S32=11, S33=16, S34=23;
   var S41=6, S42=10, S43=15, S44=21;
 
   string = Utf8Encode(string);
 
   x = ConvertToWordArray(string);
 
   a = 0x67452301; b = 0xEFCDAB89; c = 0x98BADCFE; d = 0x10325476;
 
   for (k=0;k<x.length;k+=16) {
           AA=a; BB=b; CC=c; DD=d;
           a=FF(a,b,c,d,x[k+0], S11,0xD76AA478);
           d=FF(d,a,b,c,x[k+1], S12,0xE8C7B756);
           c=FF(c,d,a,b,x[k+2], S13,0x242070DB);
           b=FF(b,c,d,a,x[k+3], S14,0xC1BDCEEE);
           a=FF(a,b,c,d,x[k+4], S11,0xF57C0FAF);
           d=FF(d,a,b,c,x[k+5], S12,0x4787C62A);
           c=FF(c,d,a,b,x[k+6], S13,0xA8304613);
           b=FF(b,c,d,a,x[k+7], S14,0xFD469501);
           a=FF(a,b,c,d,x[k+8], S11,0x698098D8);
           d=FF(d,a,b,c,x[k+9], S12,0x8B44F7AF);
           c=FF(c,d,a,b,x[k+10],S13,0xFFFF5BB1);
           b=FF(b,c,d,a,x[k+11],S14,0x895CD7BE);
           a=FF(a,b,c,d,x[k+12],S11,0x6B901122);
           d=FF(d,a,b,c,x[k+13],S12,0xFD987193);
           c=FF(c,d,a,b,x[k+14],S13,0xA679438E);
           b=FF(b,c,d,a,x[k+15],S14,0x49B40821);
           a=GG(a,b,c,d,x[k+1], S21,0xF61E2562);
           d=GG(d,a,b,c,x[k+6], S22,0xC040B340);
           c=GG(c,d,a,b,x[k+11],S23,0x265E5A51);
           b=GG(b,c,d,a,x[k+0], S24,0xE9B6C7AA);
           a=GG(a,b,c,d,x[k+5], S21,0xD62F105D);
           d=GG(d,a,b,c,x[k+10],S22,0x2441453);
           c=GG(c,d,a,b,x[k+15],S23,0xD8A1E681);
           b=GG(b,c,d,a,x[k+4], S24,0xE7D3FBC8);
           a=GG(a,b,c,d,x[k+9], S21,0x21E1CDE6);
           d=GG(d,a,b,c,x[k+14],S22,0xC33707D6);
           c=GG(c,d,a,b,x[k+3], S23,0xF4D50D87);
           b=GG(b,c,d,a,x[k+8], S24,0x455A14ED);
           a=GG(a,b,c,d,x[k+13],S21,0xA9E3E905);
           d=GG(d,a,b,c,x[k+2], S22,0xFCEFA3F8);
           c=GG(c,d,a,b,x[k+7], S23,0x676F02D9);
           b=GG(b,c,d,a,x[k+12],S24,0x8D2A4C8A);
           a=HH(a,b,c,d,x[k+5], S31,0xFFFA3942);
           d=HH(d,a,b,c,x[k+8], S32,0x8771F681);
           c=HH(c,d,a,b,x[k+11],S33,0x6D9D6122);
           b=HH(b,c,d,a,x[k+14],S34,0xFDE5380C);
           a=HH(a,b,c,d,x[k+1], S31,0xA4BEEA44);
           d=HH(d,a,b,c,x[k+4], S32,0x4BDECFA9);
           c=HH(c,d,a,b,x[k+7], S33,0xF6BB4B60);
           b=HH(b,c,d,a,x[k+10],S34,0xBEBFBC70);
           a=HH(a,b,c,d,x[k+13],S31,0x289B7EC6);
           d=HH(d,a,b,c,x[k+0], S32,0xEAA127FA);
           c=HH(c,d,a,b,x[k+3], S33,0xD4EF3085);
           b=HH(b,c,d,a,x[k+6], S34,0x4881D05);
           a=HH(a,b,c,d,x[k+9], S31,0xD9D4D039);
           d=HH(d,a,b,c,x[k+12],S32,0xE6DB99E5);
           c=HH(c,d,a,b,x[k+15],S33,0x1FA27CF8);
           b=HH(b,c,d,a,x[k+2], S34,0xC4AC5665);
           a=II(a,b,c,d,x[k+0], S41,0xF4292244);
           d=II(d,a,b,c,x[k+7], S42,0x432AFF97);
           c=II(c,d,a,b,x[k+14],S43,0xAB9423A7);
           b=II(b,c,d,a,x[k+5], S44,0xFC93A039);
           a=II(a,b,c,d,x[k+12],S41,0x655B59C3);
           d=II(d,a,b,c,x[k+3], S42,0x8F0CCC92);
           c=II(c,d,a,b,x[k+10],S43,0xFFEFF47D);
           b=II(b,c,d,a,x[k+1], S44,0x85845DD1);
           a=II(a,b,c,d,x[k+8], S41,0x6FA87E4F);
           d=II(d,a,b,c,x[k+15],S42,0xFE2CE6E0);
           c=II(c,d,a,b,x[k+6], S43,0xA3014314);
           b=II(b,c,d,a,x[k+13],S44,0x4E0811A1);
           a=II(a,b,c,d,x[k+4], S41,0xF7537E82);
           d=II(d,a,b,c,x[k+11],S42,0xBD3AF235);
           c=II(c,d,a,b,x[k+2], S43,0x2AD7D2BB);
           b=II(b,c,d,a,x[k+9], S44,0xEB86D391);
           a=AddUnsigned(a,AA);
           b=AddUnsigned(b,BB);
           c=AddUnsigned(c,CC);
           d=AddUnsigned(d,DD);
           }
 
       var temp = WordToHex(a)+WordToHex(b)+WordToHex(c)+WordToHex(d);
 
       return temp.toLowerCase();
}//MD5