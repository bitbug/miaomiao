define(['jquery',
    'underscore',
    'backbone'
], function($, _, Backbone) {

    var Router = Backbone.Router.extend({
        routes: {
            '': 'index',
            'test': 'chris'
        },

        /*
            These are the 'routes' for webpay
        */
        index: function() {
            var _this = this;
            //alert('index route has fired!')
            this.loadView('views/dashboard');
        },

        /*
            End of 'routes' section
        */


        loadView: function(theView, options) {

            var def = $.Deferred(),
                _this = this;

            var options = $.extend({
                el: '#container-equipmentManagement'
            }, options);

            require([theView], function(appView) {

                _this.theApp = new appView(options);
                def.resolve();
            });

            return def.promise();
        },
        clearOldApp: function() {
            var _this = this;

            var def = $.Deferred();

            if (this.oldApp instanceof Backbone.View) {
                this.oldApp.remove();

                def.resolve();
            } else {
                $('.container-view[data-old]').remove();
                def.resolve();
            }

            return def.promise();
        },
        loadApplication: function(theView, options) {

            var _this = this,
                _options = $.extend({
                    el: '.container-view:not([data-old])'
                }, options),
                def = $.Deferred();

            _this.loadStage().done(function() {
                def.notify();
            });

            //this feels incredibly lame...
            //couldn't get $.when/$.then/sequential chaining to work...
            def.progress(function() {
                _this.injectContainer().done(function() {
                    _this.loadView(theView, _options).done(function() {

                        _this.oldApp = Object(_this.currentApplication);

                        _this.currentApplication = _this.theApp;

                        _this.clearOldApp();
                        //remove old app
                        setTimeout(function() {
                            _this.theApp.render();

                        }, 100);
                    })
                });
            });

            return def.promise();
        }
    });

    return Router;
});