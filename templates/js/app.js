(function () {
	
	var Application = function () {
		var app = this,
            private = {
                config: false,
            };
		
		this.setConfig = function (config) {
            if (!private.config) {
                private.config = config;
            }
        };

        this.getConfig = function (value) {
            return private.config[value];
        };
		
	};
	window.App = new Application();
}());