(function (app, $, localStorage) {
    'use strict';
	
	var DataProvider = function () {
		var self = this,
            localStoragePrefix = '_films_';
        
        this.playVideo = function(param){
            debugger;
            var deferred = $.Deferred();
            $.ajax({
				url: '../php/file.php',
				type: "post",
				dataType: 'json',
                crossDomain: true,
				data : param
			}).done(function(data) {
                console.log('menu');
                deferred.resolve(data);
			});
            return deferred.promise();
        };
        
        this.getNextPage = function(param){
			var deferred = $.Deferred();
            $.ajax({
				url : '../php/pages.php',
				type : 'get',
				dataType : 'json',
                crossDomain: true,
				data : param
			}).done(function(data){
                console.log('pages');
                deferred.resolve(data);
			});
            return deferred.promise();
		};
        
        this.getMainMenu = function(param){
            var deferred = $.Deferred();
            $.ajax({
				url: '../php/menu.php',
				type: "get",
				dataType: 'json',
                crossDomain: true,
				data : param
			}).done(function(data) {
                console.log('menu');
                deferred.resolve(data);
			});
            return deferred.promise();
        };
        
        this.loadTemplate = function(id, name){
            var self = this,
				// name = 'mainpage',
				separator = '/',
				path = 'templates',
				extension = '.tpl',
                deferred = $.Deferred();
                
            $.ajax({
				type: "get",
				url: 
					// path + 
					// separator + 
					name + 
					extension,
				dataType: 'html'
			}).done(function(data) {
				try{
					$(id).empty().html(data);
                    deferred.resolve(data);
				}
				catch (exception){
					console.log('done exception: '+path + separator + name + extension);
					console.log(exception);
				}
			});
            return deferred.promise();
        };
        
        this.storage = {
			get : function(item){
                if(localStorage[localStoragePrefix + item]){
                    return JSON.parse(localStorage[localStoragePrefix + item]);
                }
			},
			set : function(item, value){
                localStorage[localStoragePrefix + item] = JSON.stringify(value);
            },
            remove : function(item){
                delete localStorage[localStoragePrefix + item];
            }
		};
        
        this.searchKP = function(param){
            var deferred = $.Deferred();
            $.ajax({
				url : '../php/parserFilms2.php',
				type : 'get',
				dataType : 'json',
                crossDomain: true,
				data : param
			}).done(function(data){
                // debugger;
                console.log('search');
                deferred.resolve(data);
			}).fail(function(error){
                deferred.resolve(error);
                // debugger;
            });
            return deferred.promise();
        };
	};
	app.Data = new DataProvider();
}(App, jQuery, localStorage));