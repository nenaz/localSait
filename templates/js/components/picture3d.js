(function (app,$) {
    var App3d = function (el) {
        var me = this;
        me.el = el;
        me.init();
    };
    
    App3d.prototype.init = function () {
       console.log('INIT'); 
    };
    
    app.Utils.initComponent('app3d',App3d);
})(App,jQuery);