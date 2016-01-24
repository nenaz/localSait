(function (app) {
// $(document).ready(function(){
	var MkinofilmsModel = Backbone.Model.extend({
		defaults : {
			'login' : 'nenaz',
			'name' : 'grian'
		}
	});

	var VkinofilmsView = Backbone.View.extend({
		className : 'main-model',
		id : 'model1',
		el : 'div',
        // navPage : App.Data.storage.get('startNavPage'),
        navPage : app.getConfig('startNavPage'),
		template : _.template($('#blokFilm').html()),
		initialize : function(){
			var self = this;
			
			self.beforeRender();
            self.render();
		},
        elem : {
            mainBlock : '#blokFilm',
            backmask : '.background-mask',
            viewFilmElem : '.pageViewFilm',
            blockRating : '.block-rating',
            actualRating : '.actual-rating',
            backgroundMask : '.background-mask',
            navBlockAndFilms : '.navigation-block, .filmss',
        },
		events : {
			'click [action="nav-prev"]' : 'activeNavigateButtonPrev',
			'click [action="nav-next"]' : 'activeNavigateButtonNext',
			'click .new-films-page' : 'viewFilm',
			'click [action="load-mask"]' : 'closeViewFilm',
            'mouseover .block-rating' : 'viewRating',
            'mouseout .block-rating' : 'closeRating',
            'click .rating' : 'selectRating',
            // 'mouseout .rating-scale' : 'closeRating',
			'click [action="play-film"]' : 'playVideoButton',
		},

        beforeRender : function(){
            var self = this,
                deferred = $.Deferred();
            
            $.when(app.Data.loadTemplate()).done(function(data){
                console.log('render menu');
            });
			return deferred.promise();
        },
        
		render : function(){
			this.loadData();
		},
		
		delCommentTags : function(html){
			if (typeof html !== 'undefined'){
				return html.replace('<!--', '').replace('-->', '');
			}
			return '';
		},
		
		loadData : function(){
			var self = this,
				deferred = $.Deferred();

            $.when(app.Data.getMainMenu()).done(function(data){
				// app.Data.storage.set('startNavPage', self.navPage++);
                self.data = data;
                if(self.templatekinofilms === undefined){
					self.templatekinofilms = _.template(self.delCommentTags($(self.elem.mainBlock).html()));
				}
				self.template = self.templatekinofilms;
				$(self.elem.mainBlock).html(self.template(data));
			});
			return deferred.promise();
		},
		
		activeNavigateButtonNext : function(e){
			var self = this,
				deferred = $.Deferred();
// debugger;
            self.navPage = self.navPage + 1;
			$.when(app.Data.getNextPage({page : true,navPage : self.navPage})).done(function(data){
                self.data = data;
				console.log('data');
                // app.Data.storage.set('startNavPage', app.Data.storage.get('startNavPage') + 1);
                // app.Data.storage.set('startNavPage', nav);
                if(self.templatekinofilms === undefined){
					self.templatekinofilms = _.template(self.delCommentTags($(self.elem.mainBlock).html()));
				}
				self.template = self.templatekinofilms;
				$(self.elem.mainBlock).html(self.template(data));
			});
			return deferred.promise();
		},
        
        activeNavigateButtonPrev : function(e){
			var self = this,
				deferred = $.Deferred();

            self.navPage = self.navPage - 1;
			$.when(app.Data.getNextPage({page : true,navPage : self.navPage})).done(function(data){
				console.log('data');
                self.data = data;
                // app.Data.storage.set('startNavPage', nav);
                if(self.templatekinofilms === undefined){
					self.templatekinofilms = _.template(self.delCommentTags($(self.elem.mainBlock).html()));
				}
				self.template = self.templatekinofilms;
				$(self.elem.mainBlock).html(self.template(data));
			});
			return deferred.promise();
		},
        
        viewFilm : function(e){
            var self = this,
                str = $(e.target).attr('src');

            $(self.elem.viewFilmElem).find('img').attr('src', str.replace('small', 'big')); 
            $(self.elem.viewFilmElem).removeClass('mask-hide pageCloseFilm_animation').addClass('pageViewFilm_animation');
            $(self.elem.backmask).removeClass('mask-hide').addClass('backMaskShow_animation');
            $(self.elem.backmask).off('click').on('click',function(){
                self.closeViewFilm();
            });
            // $('#videoFilm').bind('webkitfullscreenchange mozfullscreenchange fullscreenchange', function(e){
                // e.preventDefault();
                // e.stopPropagation();
                // if (document.fullScreen || document.mozFullScreen || document.webkitIsFullScreen) {
                    // $(self.elem.navBlockAndFilms).hide();
                    // $(self.elem.backgroundMask).removeClass('classPositionAbsolute');
                // } else {
                    // $(self.elem.navBlockAndFilms).show();
                    // $(self.elem.backgroundMask).addClass('classPositionAbsolute');
                // }
            // });
        },
        
        closeViewFilm : function(e){
            var self = this;

            $(self.elem.viewFilmElem).removeClass('pageViewFilm_animation').addClass('pageCloseFilm_animation');
            $('[action=load-mask]').removeClass('backMaskShow_animation').addClass('mask-hide');
            _.delay(function(){
                $(self.elem.viewFilmElem).addClass('mask-hide');
                // self.filmStop();
            }, 200);
        },
        
        // filmStop : function(){
            // var mFilm = $('#videoFilm');
            // mFilm[0].pause();
            // mFilm[0].currentTime = 0;
        // },
        
        viewRating : function(e){
            var me = this,
                blockRating = $(e.target).closest('.block-rating'),
                ratingWidth = parseInt(blockRating.find('[data-rating]').attr('data-rating')) * 10;

            blockRating.addClass(' pageRating-new-width');
            blockRating.find('.star2').css({'width' : ratingWidth + '%'});
        },
        
        closeRating : function(e){
            var blockRating = $(e.target).closest('.block-rating');
            blockRating.removeClass(' pageRating-new-width');
        },
        
        selectRating : function(e){
            e.preventDefault();
            e.stopPropagation();
            $(e.target).closest('.select-rating').prev().text($(e.target).text());
            this.closeRating(e);
        },
        
        playVideoButton : function(e){
            // debugger;
            var self = this,
                deferred = $.Deferred(),
                filmId = $(e.target).closest('.new-films-page').attr('data-id'),
                fileName = (self.data.blockFilms['film-'+filmId].title + self.data.blockFilms['film-'+filmId].exeName).replace(/\s/g, '_');
            e.preventDefault();
            e.stopPropagation();
            console.log('fileName = '+fileName);
            $.when(app.Data.playVideo({fileName : fileName})).done(function(data){
                console.log('done playVideo = ' + data);
                // debugger;
            });
        },
	});

	var mkinofilms = new MkinofilmsModel();
	var vkinofilms = new VkinofilmsView({model : mkinofilms});
}(App));