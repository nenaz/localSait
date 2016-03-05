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
        },
        
        addClass: function (elem, className) {
            var re = new RegExp("(^|\\s)" + className + "(\\s|$)", "g");
            if (re.test(elem.className)) {
                return;
            }
            elem.className = (elem.className + " " + className).replace(/\s+/g, " ").replace(/(^ | $)/g, "");
        },
        
        removeClass: function (elem, className) {
            var re = new RegExp("(^|\\s)" + className + "(\\s|$)", "g");
            elem.className = elem.className.replace(re, "$1").replace(/\s+/g, " ").replace(/(^ | $)/g, "");
        }
    };
})(App, jQuery);