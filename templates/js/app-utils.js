(function (app, $) {
    'use strict';
    
    app.Utils = {
        initComponent: function (pluginName, plugin) {
            $.fn[pluginName] = function () {
                $(this).each(function () {
                    var el = $(this);
                    if (!el.data(pluginName)) {
                        el.data(pluginName, new plugin(el));
                    }
                }); 
            };
        }
    };
})(App, jQuery);