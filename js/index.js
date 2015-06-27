var path_pic='';
var wda = window.document.all;
var da = document.all;
var doc = document;
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
				var cl = doc.documentElement.clientWidth/2;
				$('.buttonM').css({'height':opt.pageH});
				/*$('#filmsPage').css({'width':opt.getpageW()});
				$('#mainPage').css({'width':screen.width});
				$('#menuTable').css({'width':screen.width});*/
				$('#mTable').css({'margin':'auto'});
				addEvents();
				setTimeout('drawCategory()', 1000);
				setTimeout('drawChart()', 1000);
			}
	});
}

function showRssFT(th){//RSS с fasttorrent
	var dispN = $('#rssLeft').css('display');
	if(dispN != 'none'){
		$('#rssLeft').animate({'width':0, border:0}, function(){$('#rssLeft').css({display:'none'})});
		$(th).animate({'left':0});
	}else{
		$('#rssLeft').show().animate({'width':610}, function(){$('#rssLeft').css({display:'block'})});
		$(th).animate({'left':615});
	}
	var arr = getRSS('L','http://fasttorrent.ru/feeds/rss/');
}

function showRssKP(th){//RSS с кинопоиска
	var winW = doc.documentElement.clientWidth;
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
	//$('#rssRight').scrollbox();
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
					doc.getElementById(documentGetElementByIdInnerHTML).innerHTML=xhttp.responseText;
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
	doc.getElementById(alternativeName).style.display = 'none';
}

function view_film(number){
	var alternativeName = 'alternativeName_'+number;
	var name = doc.getElementById(alternativeName).innerText;
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
	if( doc.getElementById(alternativeName) ===null){
		name = altName;
		jBool = true;
	}
	else name = doc.getElementById(alternativeName).innerText;
	var exeN = '';
	if( doc.getElementById('exeName') ===null)
		exeN = exeName;
	else exeN = doc.getElementById('exeName').innerText;
	var fileName = '../php/_film.bat';//getRandomInt(1000000, 9999999)+'.bat';
	xhttp=new XMLHttpRequest();
	xhttp.onreadystatechange=function(){
	   if (xhttp.readyState==4 && xhttp.status==200){
			text_button = xhttp.responseText;
			if(jBool == false){
				var view = 'view_film'+number;
				var alternativeName = 'hh'+number;
				doc.getElementById(alternativeName).style.display = 'inline';
				textFileBat(jBool, text_button, view, alternativeName);
				switch(text_button){
					case '1':doc.getElementById(view).value = con1;
						doc.getElementById(alternativeName).href = fileName;
					break;
					case '2':doc.getElementById(view).value = con2;break;
					case '3':doc.getElementById(view).value = con3;
						doc.getElementById('butFT').style.display = 'inline';
					break;
				}
			}else{
				var bText = '';
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

function pic_copy(){
	var host = '192.168.1.89';
	var port = '8008'+'/';
	var main_folder = '';
	var folder1 = 'pictures'+'/';
	var pic_file = doc.getElementById('pic_file').value;
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

function editingInfo(func,w){
	var viewEdit='';
	xhttp=new XMLHttpRequest();
	xhttp.onreadystatechange=function(){
		if (xhttp.readyState==4 && xhttp.status==200){
			switch(func){
				default:{
					doc.getElementById('add_film_main').innerHTML=xhttp.responseText;
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
}

function cl(value, name){
	document.getElementById(name).value = value;
}

function go_action(func, scheme, w, page, param){
	switch(func){
		case 'delete':{
			switch (scheme){
				case 'film':
					var str = 'filmName='+param+'&id='+w+'&func='+func+'_'+scheme;
					xhttpRequest('',opt.getAddDelPagePhp(), str);
					xhttpRequest('filmsPage', opt.getmenuPagePhp(), 'page='+page);
				break;
			}
		}
		break;
		case 'prev':
			$('#prev').removeAttr('disabled');
			$('#forv').removeAttr('disabled');
			prevPage = page;
			go_page(w, page, 'P');
		break;
		case 'synchronization':{
			if(scheme=='undefined' || scheme==''){
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
			//document.getElementById('filmsPage').style.height=''+screen.height+'px';
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