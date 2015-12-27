/*
////////
DEMO
///////
setTimeout(function() {
    $('.loader-mask, .loader-content').addClass('active')
}, 1000)
*/
define(['jquery',
    'underscore',
    'backbone'
], function($, _, Backbone) {
    var Loader = function(options) {
        this.options = {
            showMask: true,
            text: 'Loading...',
            maskColor: '#ccc',
            target: 'body',
            loaderType: 'indeterminate' //indeterminate//determiante
        };

        this.options = $.extend(this.options, options);

        this.target = $(this.options.target).eq(0);

        this.init();
    }

    Loader.prototype = {
        init: function() {
            var _this = this;

            this.cssLoaded = this._loadCss('js/objects/maskLoader/css/maskLoader.css');

            this.cssLoaded.done(function() {
                _this.buildHTML().setTargetCSS().setText().dropIntoDom()
            });


        },
        _loadCss: function(url) {
            var link = document.createElement("link"),
                def = $.Deferred(),
                fileName = getFileName(url),
                theID = 'dynamicCSS' + fileName;

            //function
            function getFileName(location) {
                var location = location.split('/'),
                    theLength = location.length,
                    file = location[theLength - 1];

                //split out the extension
                file = file.split('.');

                return file[0];
            }


            // Only load the css if it doesn't exist
            if (!$('#' + theID).length) {
                link.type = "text/css";
                link.rel = "stylesheet";
                link.href = url;
                link.id = theID
                document.getElementsByTagName("head")[0].appendChild(link);

                var timer = setInterval(function() {
                    if ($('.maskLoader-css-loaded').length == 0) {
                        $('body').append('<div class="maskLoader-css-loaded"></div>');
                    }

                    var widthCheck = $('.maskLoader-css-loaded').width();

                    if (widthCheck == 1) {
                        $('.maskLoader-css-loaded').remove();
                        clearInterval(timer);
                        def.resolve();
                    }
                }, 10)
            } else {
                //css file already in dom...
                def.resolve();
            }

            return def.promise();
        },
        show: function(text) {
            var _this = this;

            this.cssLoaded.done(function() {
                _this.setText(text);
                _this.mask.addClass('active');
                _this.contentContainer.addClass('active');
            });

        },
        hide: function() {
            this.mask.removeClass('active');
            this.contentContainer.removeClass('active');
        },
        buildHTML: function() {
            this.mask = $('<div class="loader-mask"></div>');
            this.contentContainer = $('<div class="loader-content"><p></p><div class="loader-progress"><div class="loader-progress-bar"></div></div></div>');

            if (this.options.loaderType == 'indeterminate') {
                this.contentContainer.find('.loader-progress-bar').addClass('indeterminate');
            }

            return this;
        },
        dropIntoDom: function() {
            this.target.append(this.mask, this.contentContainer);

            return this;
        },
        setTargetCSS: function() {
            this.oldOverflow = this.target.css('overflow');
            this.oldPosition = this.target.css('position');

            this.target.css({
                overflow: 'hidden',
                position: 'relative;'
            });

            return this;
        },
        removeTargetCss: function() {
            this.target.css({
                overflow: this.oldOverflow,
                position: thisl.oldPosition
            });

            return this;
        },
        setText: function(text) {
            var theText = text || this.options.text;

            this.contentContainer.find('p').text(theText);

            return this;
        },
        progress: function(width) {
            if (this.options.loaderType == 'determinate') {
                this.contentContainer.find('.loader-progress-bar').css('width', width)
            }

        }
    };

    //usually returning the object you created...
    return Loader;
});


/*
///////
DEMO
//////
var loader = new Loader({
    target: '.target'
})

setTimeout(function() {
    loader.progress('70%')
}, 5000)
*/