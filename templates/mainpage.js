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
        navPage : app.getConfig('startNavPage'),
		template : _.template($('#blokFilm').html()),
		initialize : function(){
			var self = this;
			
			self.beforeRender();
            self.render();
		},
        elem : {
            mainBlock : '#blokFilm',
            navLine : '.navigation-panel',
            backmask : '.background-mask',
            viewFilmElem : '.pageViewFilm',
            blockRating : '.block-rating',
            actualRating : '.actual-rating',
            backgroundMask : '.background-mask',
            navBlockAndFilms : '.navigation-block, .filmss',
        },
		events : {
			'click [action="nav-prev"], [action="nav-next"]' : 'activeNavigateButton',
            'click [action="nav-page"]' : 'clickNavPage',
			'click .new-films-page' : 'viewFilm',
			'click [action="load-mask"]' : 'closeViewFilm',
            'mouseover .block-rating' : 'viewRating',
            'mouseout .block-rating' : 'closeRating',
            'click .rating' : 'selectRating',
			'click [action="play-film"]' : 'playVideoButton',
		},

        beforeRender : function(){
            var self = this,
                deferred = $.Deferred();
            
            $.when(app.Data.loadTemplate(self.elem.mainBlock, 'mainpage')).done(function(data){
                console.log('render menu');
            });
            $.when(app.Data.loadTemplate(self.elem.navLine, 'navigation')).done(function(data){
                console.log('render navigation line');
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

            $.when(app.Data.getMainMenu(app.Monitor())).done(function(data){
                data.countPages = Math.ceil(parseInt(data.countAll) / data.blockFilmsCount);
                self.data = data;
                self.renderTemplate(data, self.elem.mainBlock, 'mainBlock');
                self.renderTemplate(data, self.elem.navLine,'navLine');
			});
			return deferred.promise();
		},
        
        renderTemplate : function(data, elem, nameTemplate){
            var self = this;
            if(self[nameTemplate] === undefined){
                self[nameTemplate] = _.template(self.delCommentTags($(elem).html()));
            }
            self.template = self[nameTemplate];
            $(elem).html(self.template(data));
        },
		
		activeNavigateButton : function(e, page){
            var self = this,
				incPage = $(e.target).attr('action') === "nav-next" ? true : false;
            self.navPage = incPage ? self.navPage + 1 : self.navPage - 1;
			self.activeNavigatePage(self.navPage);
		},
        
        clickNavPage : function(e){
            var self = this,
                navPage = parseInt($(e.target).text());
            e.preventDefault();
            e.stopPropagation();
            self.navPage = navPage;
            self.activeNavigatePage(navPage);
        },
        
        activeNavigatePage : function(navPage){
            var self = this,
				deferred = $.Deferred();
            $.when(app.Data.getNextPage({page : true,navPage : navPage,globalCountPicture : App.Monitor().globalCountPicture})).done(function(data){
                data.countPages = Math.ceil(parseInt(data.countAll) / data.blockFilmsCount);
                self.data = data;
                self.renderTemplate(data, self.elem.mainBlock, 'mainBlock');
			});
			return deferred.promise();
        },
        
        // activeNavigateButtonPrev : function(e){
			// var self = this,
				// deferred = $.Deferred();

            // self.navPage = self.navPage - 1;
			// $.when(app.Data.getNextPage({page : true,navPage : self.navPage})).done(function(data){
                // data.countPages = Math.ceil(parseInt(data.countAll) / data.blockFilmsCount);
                // self.data = data;
                // self.renderTemplate(data, self.elem.mainBlock);
			// });
			// return deferred.promise();
		// },
        
        viewFilm : function(e){
            var self = this,
                str = $(e.target).attr('src');

            $(self.elem.viewFilmElem).find('img').attr('src', str.replace('small', 'big')); 
            $(self.elem.viewFilmElem).removeClass('mask-hide pageCloseFilm_animation').addClass('pageViewFilm_animation');
            $(self.elem.backmask).removeClass('mask-hide').addClass('backMaskShow_animation');
            $(self.elem.backmask).off('click').on('click',function(){
                self.closeViewFilm();
            });
        },
        
        closeViewFilm : function(e){
            var self = this;

            $(self.elem.viewFilmElem).removeClass('pageViewFilm_animation').addClass('pageCloseFilm_animation');
            $('[action=load-mask]').removeClass('backMaskShow_animation').addClass('mask-hide');
            _.delay(function(){
                $(self.elem.viewFilmElem).addClass('mask-hide');
            }, 200);
        },
        
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
            var self = this,
                deferred = $.Deferred(),
                filmId = $(e.target).closest('.new-films-page').attr('data-id'),
                fileName = (self.data.blockFilms['film-'+filmId].title + self.data.blockFilms['film-'+filmId].exeName).replace(/\s/g, '_');
            e.preventDefault();
            e.stopPropagation();
            console.log('fileName = '+fileName);
            $.when(app.Data.playVideo({fileName : fileName})).done(function(data){
                console.log('done playVideo = ' + data);
            });
        },
	});

	var mkinofilms = new MkinofilmsModel();
	var vkinofilms = new VkinofilmsView({model : mkinofilms});
}(App));