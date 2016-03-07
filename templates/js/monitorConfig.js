(function (app, $, localStorage) {
    'use strict';
    
    var Monitor = function(){
        var screenWidth = $('html').width(),
            screenHeight = $('html').height(),
            pictureWidth = app.getConfig('pictureWidth'),
            pictureHeight = app.getConfig('pictureHeight'),
            colPicture = Math.floor(screenWidth / pictureWidth),
            rowPicture = Math.floor(screenHeight / pictureHeight),
            globalCountPicture = colPicture * rowPicture,
            globalPadding = Math.floor((screenWidth - pictureWidth * colPicture) / 2 ),
            previewWidth = app.getConfig('previewWidth'),
            previewHeight = app.getConfig('previewHeight'),
            left = Math.floor(screenWidth / 2 - previewWidth / 2),
            top = Math.floor(screenHeight / 2 - previewHeight / 2);
            globalPadding = (globalPadding > 60) ? globalPadding : 60;
            
        return function(){
            return {
                globalCountPicture : globalCountPicture,
                globalPadding : globalPadding,
                left : left,
                top : top,
            }
        };
    };

    var Device = function(){
        var strNavigator = navigator.userAgent,
            isAndroid = strNavigator.match(/Android|Linux/g) ? true : false,
            isIphone = strNavigator.match(/iPhone/g) ? true : false,
            isIpad = strNavigator.match(/iPad/g) ? true : false,
            isIE = strNavigator.match(/Trident/g) ? true : false;
        return function(){
            return {
                isAndroid : isAndroid,
                isIphone : isIphone,
                isIpad : isIpad,
                isIE : isIE,
            }
        } 
    };
    
    app.Monitor = new Monitor();
    app.Device = new Device();

}(App, jQuery, localStorage));