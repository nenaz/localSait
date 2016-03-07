(function (app) {
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
            Sliderfilm : '#parent-slider-film',
            Mainmenu : '#mainmenu',
        },
        
		events : {
			'click [action="nav-prev"], [action="nav-next"]' : 'activeNavigateButton',
            'click [action="nav-page"]' : 'clickNavPage',
			'click .new-films-page' : 'viewFilm',
			'click [action="load-mask"]' : 'closeViewFilm',
            'click .rating' : 'selectRating',
			'click [action="play-film"]' : 'playVideoButton',
			'click [action="stop-film"]' : 'stopVideoButton',
            'click [type="button"]' : 'searchKP',
			'click [action="change-slide"]' : 'changeSlide',
		},

        beforeRender : function(){
            var self = this,
                deferred = $.Deferred();
            
            $.when(app.Data.loadTemplate(self.elem.mainBlock, 'mainpage')).done(function(data){
                console.log('render mainpage');
            });
            $.when(app.Data.loadTemplate(self.elem.Mainmenu, 'mainmenu')).done(function(data){
                console.log('render mainmenu');
            });
            $.when(app.Data.loadTemplate(self.elem.navLine, 'navigation')).done(function(data){
                console.log('render navigation line');
            });
            $.when(app.Data.loadTemplate(self.elem.Sliderfilm, 'sliderFilm')).done(function(data){
                console.log('render sliderFilm');
            });
			return deferred.promise();
        },
        
        // afterRender : function () {
            // var self = this;
            // `;
            // _(self.$('[component="pic3d"]')).each(function (el) {
                // debugger;
                // app.Data.app3d($(el));
                // app.Data.app3d(el);
            // });
        // },
        
		render : function(){
            var self = this;
            // $.when().done(function () {
                
            // });
            self.loadData();
		},
        
        afterRender : function(){
            var me = this;
            // $('#mainmenu').css({'padding-left' : app.Monitor().globalPadding});
            document.getElementById('mainmenu').style.cssText = 'height: ' + document.getElementsByClassName('filmss')[0].clientHeight + 'px';
            // $('#blokFilm').css({'padding-left' : app.Monitor().globalPadding});
            $(this.elem.viewFilmElem).css({
                'left' : app.Monitor().left,
                'top' : app.Monitor().top,
            });
            // debugger;
            // _(me.$('.new-films-page')).each(function (el) {
            // _(me.$('[component="pic3d"]')).each(function (el) {
                // $(el).app3d();
            // });
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
            self.arrAllBigPagesId = [];
            $.when(app.Data.getMainMenu({globalCountPicture : app.Monitor().globalCountPicture})).done(function(data){
                data.countPages = Math.ceil(parseInt(data.countAll) / data.blockFilmsCount);
                self.data = data;
                for (i = 0; i < parseInt(data.countAll); i += 1) {
                    self.arrAllBigPagesId = data.arrAllBigPagesId;
                }
                self.countPages = data.countPages;
                self.renderTemplate(data, self.elem.mainBlock, 'mainBlock');
                self.renderTemplate(data, self.elem.navLine,'navLine');
                self.afterRender();
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
		
		activeNavigateButton : function(e){
            var self = this,
				incPage = $(e.target).attr('action') === "nav-next" ? true : false,
                page = self.navPage;
            page = incPage ? page + 1 : page - 1;
            if (page > 0 && page <= self.countPages) {
                self.activeNavigatePage(page);
            }
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
            self.navPage = navPage;
            // debugger;
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
            e.preventDefault();
            e.stopPropagation();
            var self = this,
                str = e.target.getAttribute('src');
                // debugger;
            self.startImageId = e.target.closest('[data-id]').getAttribute('data-film-id');
            // $(self.elem.viewFilmElem).find('img')[0].setAttribute('src', str.replace('small', 'big'));
            // debugger;
            $('#img1')[0].setAttribute('src', str.replace('small', 'big'));
            $(self.elem.viewFilmElem).removeClass('mask-hide pageCloseFilm_animation').addClass('pageViewFilm_animation');
            self.maskShow();
            $(self.elem.backmask).off('click').on('click',function(){
                self.closeViewFilm();
            });
        },
        
        closeViewFilm : function(e){
            var self = this,
            img1 = document.getElementById('img1'),
                img2 = document.getElementById('img2');
            // debugger;
            $(self.elem.viewFilmElem).removeClass('pageViewFilm_animation').addClass('pageCloseFilm_animation');
            self.imageId = undefined;
            // img1.setAttribute('id', 'img2');
            // img2.setAttribute('id', 'img1');
            self.maskHide();
        },
        
        // viewRating : function(e){
            // var me = this,
                // blockRating = $(e.target).closest('.block-rating'),
                // ratingWidth = parseInt(blockRating.find('[data-rating]').attr('data-rating')) * 10;

            // blockRating.addClass(' pageRating-new-width');
            // blockRating.find('.star2').css({'width' : ratingWidth + '%'});
        // },
        
        // closeRating : function(e){
            // var blockRating = $(e.target).closest('.block-rating');
            // blockRating.removeClass(' pageRating-new-width');
        // },
        
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
            self.maskShow();
            $.when(app.Data.playVideo({fileName : fileName})).done(function(data){
                console.log('done playVideo = ' + data);
                self.maskHide();
            });
        },
        
        searchKP : function (e) {
             var self = this,
                filmName = $(e.target).prev();
            
            $.when(app.Data.searchKP({filmName : filmName.val()})).done(function(data){
                filmName.val('');
                self.render();
            });
        },
        
        stopVideoButton: function (e) {
            var self = this;
            e.stopPropagation();
            self.maskShow();
        },
        
        maskShow: function () {
            var self = this;
            $(self.elem.backmask).removeClass('mask-hide').addClass('backMaskShow_animation');
        },
        
        maskHide: function () {
            var self = this;
             $('[action=load-mask]').removeClass('backMaskShow_animation').addClass('mask-hide');
            _.delay(function(){
                $(self.elem.viewFilmElem).addClass('mask-hide');
            }, 200);
        },
        
        changeSlide: function(e){
            console.time('changeSlide');
            var me = this,
                typeChange = e.target.closest('[data-slide]').getAttribute('data-slide'),
                img1 = document.getElementById('img1'),
                img2 = document.getElementById('img2'),
                img3 = document.getElementById('img3'),
                // imgLeft = document.getElementsByClassName('slider-navigate-center')[0].getElementsByTagName('img')[0],
                centerId = document.getElementsByClassName('slider-navigate-center')[0].getElementsByTagName('img')[1].getAttribute('id'),
                imgCenter = document.getElementById(centerId),
                // imgRight = document.getElementsByClassName('slider-navigate-center')[0].getElementsByTagName('img')[2],
                srcPath = '../images/film_big/';
            me.imageId = me.imageId || me.arrAllBigPagesId.indexOf(me.startImageId);
            if (JSON.parse(typeChange)) {
                me.imageId += 1;
                $.when(img2.setAttribute('src', srcPath + me.arrAllBigPagesId[me.imageId] + '.jpg')).done(function () {
                    img2.style.cssText = 'transform: translate3d(0, 0, 0); opacity: 1; z-index: 2;';
                    img1.style.cssText += 'z-index: 1;';
                    _.delay(function () {
                        img1.style.cssText = '';
                        img1.setAttribute('id', 'img2');
                        img2.setAttribute('id', 'img1');
                        img1.style.cssText = "transform: translate3d(115%,0,0); opacity: 0; z-index: 1;";
                    }, 355);
                });
            } else {
                me.imageId -= 1;
                $.when(img3.setAttribute('src', srcPath + me.arrAllBigPagesId[me.imageId] + '.jpg')).done(function () {
                    img3.style.cssText = 'transform: translate3d(0, 0, 0); opacity: 1; z-index: 2;';
                    img1.style.cssText += 'z-index: 1;';
                    _.delay(function () {
                    // debugger;
                        img1.style.cssText = '';
                        img1.setAttribute('id', 'img3');
                        img3.setAttribute('id', 'img1');
                        img1.style.cssText = "transform: translate3d(-115%,0,0); opacity: 0; z-index: 1;";
                    }, 355);
                });
            }
            console.timeEnd('changeSlide');
        }
	});

	var mkinofilms = new MkinofilmsModel();
	var vkinofilms = new VkinofilmsView({model : mkinofilms});
}(App));