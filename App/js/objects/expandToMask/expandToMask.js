define(['jquery',
    'underscore',
    'backbone'
], function($, _, Backbone) {
    var ExpandToMask = function(elm) {
        //constructor
        this.elm = $(elm);
        this.def = $.Deferred();
        this.elmParent = this.elm.parent();
        this.clonedElm = this.elm.clone(false).addClass('cloned');

        this.windowWidth = $(window).width();
        this.windowHeight = $(window).height();

        this.init();

        return this.def.promise()
    };

    ExpandToMask.prototype = {
        init: function() {
            var _this = this;

            this.hideElm();
            this.swapForCloned();

            $(document).one('mdModalClose', function() {
                _this.collapse();
            });

            setTimeout(function() {
                _this.moveToCenter();
            }, 0);
        },
        setClonedValues: function() {
            this.clonedWidth = this.clonedElm.outerWidth(true);
            this.clonedHeight = this.clonedElm.height();

            this.clonedStartLeft = this.elm.offset().left;
            this.clonedStartTop = this.elm.offset().top;
            this.clonedBackground = (this.elm.css('background-color').toString() == 'rgba(0, 0, 0, 0)') ? '#ccc' : this.elm.css('background-color').toString();

            this.clonedElm.css({
                left: this.clonedStartLeft,
                top: this.clonedStartTop,
                position: 'absolute',
                background: this.clonedBackground,
                display: 'inline-block',
                width: this.clonedWidth,
                height: this.clonedHeight,
                zIndex: '999'
            });

            this.removeClonedContent();
        },
        removeClonedContent: function() {
            this.clonedElm.children().remove();
            this.clonedElm.html('');
        },
        swapForCloned: function() {
            $('body').append(this.clonedElm);

            this.setClonedValues();
        },
        moveToCenter: function() {
            var _this = this;

            this.clonedElm.animate({
                left: (this.windowWidth / 2) - (this.clonedWidth / 2),
                top: (this.windowHeight / 2) - (this.clonedHeight / 2)
            });

            this.expand();
        },
        expand: function() {
            var _this = this;

            this.clonedElm.animate({
                width: this.windowWidth,
                height: this.windowHeight,
                left: 0,
                top: 0,
                borderRadius: 0,
                opacity: .7,
                zIndex: 99999
            }, function() {
                _this.def.resolve();

                //                _this.def = undefined;
            });


        },
        collapse: function() {
            this.clonedElm.animate({
                width: this.clonedWidth,
                height: this.clonedHeight,
                left: this.clonedStartLeft,
                top: this.clonedStartTop,
                borderRadius: '50%',
                opacity: 1,
                zIndex: 99999
            });

            this.showElm();
            this.removeCloned();
        },
        hideElm: function() {
            this.elm.fadeOut();
        },
        showElm: function() {
            this.elm.fadeIn();
        },
        removeCloned: function() {
            this.clonedElm.fadeOut(function() {
                $(this).remove();
            });
        }
    };

    return ExpandToMask;
});
