(function (app, $, localStorage) {
    'use strict';
    
    var Monitor = function(){
        // debugger;
        var screenWidth = $('html').width(),
            screenHeight = $('html').height(),
            pictureWidth = app.getConfig('pictureWidth'),
            pictureHeight = app.getConfig('pictureHeight'),
            colPicture = Math.floor(screenWidth / pictureWidth),
            rowPicture = Math.floor(screenHeight / pictureHeight);
            
        // console.log('colPicture = '+colPicture);
        // console.log('rowPicture = '+rowPicture);
        return {
            colPicture : colPicture,
            rowPicture : rowPicture
        };
    };
    
    app.monitor = new Monitor();

}(App, jQuery, localStorage));