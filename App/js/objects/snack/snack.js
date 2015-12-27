define(['jquery',
    'underscore',
    'backbone',
    'text!App/viper/js/objects/snack/template/snackTemplate.html'
], function($, _, Backbone, template) {
    var TagSnack = function() {
        this.options = {
            container: 'body',
            showCloseX: false,
            delay: 5000,
            customHTML: false,
            message: [],
            showAction: false,
            helper: this.helper()
        };

        this.init();
    };

    TagSnack.prototype = {
        init: function() {
            this._loadCss('/assets/App/viper/js/objects/snack/css/snack.css');
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
                    if ($('.snack-css-loaded').length == 0) {
                        $('body').append('<div class="snack-css-loaded"></div>');
                    }

                    var widthCheck = $('.snack-css-loaded').width();

                    if (widthCheck == 1) {
                        $('.snack-css-loaded').remove();
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
        show: function(options) {
            var _this = this;

            this.options = $.extend(this.options, options);

            $(this.options.container).append(_.template(template, this.options));

            //next event loop...
            setTimeout(function() {
                _this.cacheReferences();
                _this.container.fadeIn();
                _this.setTimer();
            }, 0);
        },
        setTimer: function() {
            var _this = this;

            setTimeout(function() {
                _this.close();
            }, this.options.delay);
        },
        helper: function() {
            var _this = this;

            return {
                buildMessages: function() {
                    var html = '';

                    if (_this.options.customHTML) {
                        html = _this.options.customHTML;
                    } else {
                        html += '<ul>';

                        _this.options.message.forEach(function(message, index) {
                            html += '<li>' + message + '</li>';
                        });

                        html += '</ul>';
                    }

                    return html;
                }
            }

        },
        close: function() {
            var _this = this;

            this.container.fadeOut(500, function() {
                _this.clear();
            });
        },
        clear: function() {
            $(this.options.container).find('.container-tagSnack').remove();
        },
        bindfEvents: function() {

        },
        cacheReferences: function() {
            this.container = $(this.options.container).find('.container-tagSnack');
            this.action = this.container.find('.tagSnack-action');
            this.content = this.container.find('.tagSnack-content');
        }
    };

    //usually returning the object you created...
    return TagSnack;
});
