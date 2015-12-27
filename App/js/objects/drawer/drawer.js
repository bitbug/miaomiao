define(['jquery',
    'underscore',
    'backbone',
    'text!App/viper/js/objects/drawer/templates/drawer.html'
], function($, _, Backbone, template) {
    var Drawer = function() {
        //constructor

        this.needInit = true;
    }

    //methods
    Drawer.prototype = {
        init: function() {
            var _this = this;

            this.container.append(template);

            this.cacheReferences();
            this.bindEvents();

            this.drawer.hide();

            this.needInit = false;
        },
        open: function(view, options) {
            var _this = this,
                options = $.extend(options, {
                    el: '#container-drawer-view'
                });

            this.container = (options.container) ? $('body').find(options.container) : $('body');

            if (this.needInit) {
                this.init();
            }

            this.createContainer().done(function() {
                require([view], function(theView) {
                    _this.view = new theView(options);
                });
            });

            this.setTitle(options.title);
            this.drawer.show();
            this.drawer.removeClass('close').addClass('open');
        },
        blockClosing: function() {
            this.drawer.find('.backArrow').addClass('disabled');
        },
        allowClosing: function() {
            this.drawer.find('.backArrow').removeClass('disabled');
        },
        close: function() {
            var _this = this;

            this.drawer.removeClass('open').addClass('close');
            setTimeout(function() {
                _this.view.remove();
                _this.header.find('h3').text('');
                _this.drawer.hide();
            }, 1000);

        },
        setTitle: function(text) {
            this.header.find('h3').text(text);
        },
        bindEvents: function() {
            var _this = this;

            this.drawer.on('click', '.backArrow:not(.disabled)', function() {
                _this.close();
            });
        },
        createContainer: function() {
            var theContainer = $('<div id="container-drawer-view">Loading...</div>'),
                def = $.Deferred();

            this.content.append(theContainer);
            nextEventLoop(def.resolve);

            return def.promise();
        },
        cacheReferences: function() {
            this.drawer = this.container.find('.container-drawer');
            this.header = this.drawer.find('.drawer-header');
            this.footer = this.drawer.find('.drawer-footer');
            this.content = this.drawer.find('.drawer-content');
        }
    };


    return Drawer;
});
