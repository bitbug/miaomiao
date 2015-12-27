define(['jquery'], function($) {
    //Pager Object Constuctor
    var Pager = function(options) {
        var options = options || {},
            _options = {
                transition: 'slide-left',
                showLegend: true
            },
            _thisPager = this;

        this._options = $.extend(_options, options);

        //properties
        this.container = $('.container-pages').addClass(_options.transition);
        this.pages = this.container.find('.page');
        this.numberOfPages = this.pages.length;
        this.animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';


        //Private object?!?
        /*
  /** LEGEND OBJECT 
    The Legend will be a 'private property' of the Pager object,
    however it will be it's own object with methods...
  */
        var _Legend = {
                init: function() {
                    this.legendContainer = $('<div class="container-paging-legend noselect bottom center"></div>'),
                    this.legendList = $('<ul class="clearfix"></ul>'),
                    this.legendItem = $('<li></li>'),
                    this.pageLeft = '<i class="fa fa-chevron-left"></i>',
                    this.pageRight = '<i class="fa fa-chevron-right"></i>';

                    this._buildPageItems();
                    this._appendToPager();
                    this._bindEvents();
                    this._updatePosition();
                },
                _buildPageItems: function() {
                    for (var i = 1; i <= _thisPager.numberOfPages; i++) {
                        //add the left chevron
                        if (i === 1) {
                            var pageLeftItem = this.legendItem.clone().html(this.pageLeft).appendTo(this.legendList);
                        }

                        var clonedItem = this.legendItem.clone().addClass('specificSlide').text(i).appendTo(this.legendList);

                        //add the right chevron
                        if (i === _thisPager.numberOfPages) {
                            var pageRightItem = this.legendItem.clone().html(this.pageRight).appendTo(this.legendList);
                        }
                    } //end for loop
                },
                _appendToPager: function() {
                    this.legendList.appendTo(this.legendContainer);
                    this.legendContainer.appendTo(_thisPager.container);
                },
                _bindEvents: function() {
                    var _this = this;
                    _thisPager.container.on('click', '.container-paging-legend li', function(e) {
                        var theElm = $(e.target).closest('li');
                        if (theElm.find('i').hasClass('fa-chevron-left')) {
                            _thisPager.goToSlide('prev');
                        }

                        if (theElm.find('i').hasClass('fa-chevron-right')) {
                            _thisPager.goToSlide('next');
                        }

                        if (theElm.hasClass('specificSlide')) {
                            var theNumber = parseInt(theElm.index() - 1); //for prev chevron
                            _thisPager.goToSlide(theNumber);
                        }

                        _this._updatePosition();
                    });
                },
                _updatePosition: function() {

                    setTimeout(function() {
                        var currentPage = _thisPager.getCurrentSlide();
                        $('.container-paging-legend li').removeClass('active');
                        $('.container-paging-legend li:eq(' + (currentPage + 1) + ')').addClass('active'); //+ 1 for left arrow
                    }, 250);
                },
                _remove: function() {

                }
            } //end of _Legend


        //PRIVATE methods
        var _loadCss = function(url) {

                var getFileName = function(location) {
                    var location = location.split('/'),
                        theLength = location.length,
                        file = location[theLength - 1];

                    //split out the extension
                    file = file.split('.');

                    return file[0];
                }

                var link = document.createElement("link"),
                    def = $.Deferred(),
                    fileName = getFileName(url),
                    theID = 'dynamicCSS' + fileName;

                // Only load the css if it doesn't exist
                if (!$('#' + theID).length) {
                    link.type = "text/css";
                    link.rel = "stylesheet";
                    link.href = url;
                    link.id = theID
                    document.getElementsByTagName("head")[0].appendChild(link);

                    var timer = setInterval(function() {
                        if ($('.dynamicCSS-test-element').length == 0) {
                            $('body').append('<div class="dynamicCSS-test-element"></div>');
                        }

                        var widthCheck = $('.dynamicCSS-test-element').width();

                        if (widthCheck == 1) {

                            $('.dynamicCSS-test-element').remove();
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
            _getCurrentSlide = function() {
                return $('.page[data-slidestate="active"]').index();
            },
            _getNextSlide = function() {
                var current = _getCurrentSlide();

                if (current < (_thisPager.numberOfPages - 1)) {
                    return (current + 1);
                } else {
                    return false;
                }
            },
            _getPrevSlide = function() {
                var current = _getCurrentSlide();
                if (current !== 0) {
                    return (current - 1);
                } else {
                    return -1;
                }
            },
            _bindEvents = function() {

            },
            _remove = function() {

            },
            _markState = function(elm, state, animateYN) {
                if (animateYN) {
                    $(elm).addClass('animate');
                } else {
                    $(elm).removeClass('animate');
                }

                $(elm).attr('data-slidestate', state);
            },
            _init = function(options) {
                var startSlide = options.goToSlide || 0;

                if ($('.container-pages .page[data-slidestate="active"]').length == 0) {
                    _markState($('.container-pages .page:eq(' + startSlide + ')'), 'active', false);
                }

                //dynamically load css...then fire it all up...
                _loadCss('js/objects/pagination/css/pager.css').done(function() {

                    if (options.showLegend) {
                        _Legend.init();
                    }

                    _bindEvents();
                })

            };


        /*
  /* PUBLIC METHODS
  */
        this.getCurrentSlide = function() {
            return $('.page[data-slidestate="active"]').index();
        };

        this.goToSlide = function(slide) {
            var currentPosition = _getCurrentSlide(),
                nextPage = _getNextSlide(),
                prevPage = _getPrevSlide();

            //states of a slide
            //onDeck: queued for viewing
            //active: current slide in view
            //oldNews: slide that was viewed

            switch (slide) {
                case 'next':
                    if (nextPage) {
                        _markState($('.page:eq(' + nextPage + ')'), 'onDeck', false);
                        setTimeout(function() {
                            _markState($('.page:eq(' + nextPage + ')'), 'active', true);
                            _markState($('.page:eq(' + currentPosition + ')'), 'oldNews', true);
                        }, 0);
                    }
                    break;
                case 'prev':
                    if (prevPage > -1) {
                        _markState($('.page:eq(' + prevPage + ')'), 'onDeck', false);
                        setTimeout(function() {
                            _markState($('.page:eq(' + prevPage + ')'), 'active', true);
                            _markState($('.page:eq(' + currentPosition + ')'), 'oldNews', true);
                        }, 0);
                    }
                    break;
                default:
                    //expecting a number;
                    if (currentPosition !== slide) {
                        _markState($('.page:eq(' + slide + ')'), 'onDeck', false);
                        setTimeout(function() {
                            _markState($('.page:eq(' + currentPosition + ')'), 'oldNews', true);
                            _markState($('.page:eq(' + slide + ')'), 'active', true);
                        }, 0);
                    }

                    break;
            }

        }


        //start it up...
        _init(this._options);
    };


    //usually returning the object you created...
    return Pager;
});