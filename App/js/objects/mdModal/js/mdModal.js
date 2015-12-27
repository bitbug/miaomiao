define(['jquery',
    'underscore',
    'backbone',
    'text!js/objects/mdModal/templates/mdModal.html'
], function($, _, Backbone, template) {
    var MDModal = function() {
        var _this = this;
        //});
    }
    MDModal.prototype = {
        init: function(options) {
            var _this = this;
            this.bindEvents();
            this.options = {
                el: '.ch-dynamicContainer-mdModal',
                showFooter: false,
                showMask: true
            };
            //this.fetchTemplate.done(function(html) {
            _this.template = template;
            $.extend(this.options, (options || {}));
        },
        setProperties: function() {
            this.mask = $('body').find('.ch-mask');
            this.modalContainer = $('body').find('.ch-container-mdModal');
            this.modalContent = this.modalContainer.find('.ch-content-mdModal');
        },
        dump: function() {
            this.mask.remove();
            this.modalContainer.remove();
            this.stageSet = false;
        },
        alterOptions: function() {},
        setStage: function() {
            var _this = this,
                def = $.Deferred();
            this.alterOptions(); //lame
            //if (!this.stageSet) {
            //this.fetchTemplate.done(function() {
            $('body').append(_.template(_this.template, this.options));
            _this.setProperties();
            _this.stageSet = true;
            setTimeout(function() {
                def.resolve()
            }, 0);

            return def.promise();
        },
        show: function(view, options) {
            var _this = this;
            this.init(options);
            this.setStage().done(function() {
                _this.loadView(view);

            });
        },
        setWidth: function() {
            if (this.options.width) {
                var theWidth = (this.options.width.indexOf('%') != -1) ? ($(window).width() * (parseFloat(this.options.width) / 100)) : this.options.width;
                this.modalContainer.css({
                    width: this.options.width,
                    marginLeft: (parseFloat(theWidth) / 2) * (-1)
                });
            }
        },
        setTitle: function() {
            //if (this.options.title) {
            this.modalContainer.find('.ch-header-mdModal h3').text(this.options.title || ' ')
                //}
        },
        loadView: function(view) {
            var def = $.Deferred(),
                _this = this,
                dynamicContainer = $('<div class="ch-dynamicContainer-mdModal"></div>');
            this.modalContent.html(dynamicContainer);
            this.setWidth();
            this.setTitle();



            require([view], function(theView) {
                theView = new theView(_this.options)
                _this.view = (theView.view instanceof Backbone.View) ? theView.view : theView;
                
                _this.view.$el.on('renderComplete.ch-modalReady', function() {
                    _this.setHeight();
                });
                _this.unHide();
                def.resolve();
            });
            return def.promise();
        },
        setHeight: function() {
            var theContainer = $('.ch-container-mdModal'),
                _this = this;


            nextEventLoop(function() {
                //stupid and cheesy hack for height...don't have time to troubleshoot right now...
                var containerHeight = $('.ch-container-mdModal').outerHeight(true);

                theContainer.css('height', containerHeight + 40);
            });

        },
        removeHeight: function() {
            var theContainer = $('.ch-container-mdModal');

            theContainer.attr('style', '');
        },
        unHide: function() {
            var _this = this;
            this.mask.fadeIn();
            this.modalContainer.addClass('fadeInDown').removeClass('fadeOutUp');
            setTimeout(function() {
                _this.modalContainer.show()
            }, 0);
        },
        hide: function() {
            var _this = this;
            //this.removeEvents();
            this.mask.fadeOut();
            this.modalContainer.removeClass('fadeInDown').addClass('fadeOutUp');
        },
        close: function() {
            this.hide();
        },
        clearContent: function() {
            this.view.remove();
            this.modalContainer.find('.ch-header-mdModal h3').text('');
            this.modalContainer.removeClass('fadeOutUp').hide();
        },
        destroy: function() {
            this.removeEvents();
            this.mask.remove();
            this.modalContainer.remove();
        },
        removeEvents: function() {


            //List of events that need to be removed manually.
            //eventType is currently used...targetElm isn't but added anyways..
            var events = [{
                eventType: 'click.ch-mdModal-close',
                targetElm: '.ch-close-mdModal'
            }, {
                eventType: '.ch-modal-animate',
                targetElm: '.ch-container-mdModal.fadeOutUp'
            }, {
                eventType: '.ch-modalReady',
                targetElm: ''
            }];
            events.forEach(function(obj, index) {
                $(obj.eventType).off();
            });
        },
        bindEvents: function() {
            var _this = this;

            $('body').on('click.ch-mdModal-close', '.ch-close-mdModal, .ch-cancel', function() {
                _this.hide();
            });

            $('body').on('click.ch-moModal-okay', '.ch-okay', function() {
                $('.ch-container-mdModal').trigger('mdModalOkay');
                _this.hide();
            });

            $('body').on('webkitAnimationEnd.ch-modal-animate mozAnimationEnd.ch-modal-animate MSAnimationEnd.ch-modal-animate oanimationend.ch-modal-animate animationend.ch-modal-animate', '.ch-container-mdModal.fadeOutUp', function() {
                _this.clearContent();
                _this.removeHeight();
                _this.removeEvents();
                $('.ch-container-mdModal').trigger('mdModalClose');
                setTimeout(function() {
                    _this.dump();
                }, 0);
            });
        }
    };
    //usually returning the object you created...
    return MDModal;
});
