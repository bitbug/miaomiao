define(['jquery',
        'underscore',
        'backbone',
        'Modernizr',
        'BSDatePicker'
    ],
    function($, _, Backbone, Modernizr) {
        var BaseView = Backbone.View.extend({
            constructor: function(options) {
                this.subView = [];
                this.childRemove = this.remove; //called in remove method
                this.animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
                this.transitionEnd = 'webkitTransitionEnd mozTransitionEnd MSTransitionEnd otranitionend tranitionend';

                var _this = this,
                    childRender = this.render;

                //override the various methods
                this.render = function() {
                    childRender.call(_this);

                    nextEventLoop(function() {
                        _this._postRender();
                    });

                }
                this.remove = function() {
                    this.removeAllSubViews();
                    this.childRemove.call(this);
                    
                    // call the base class remove method (last line of method!)
                    Backbone.View.prototype.remove.apply(this, arguments);
                }
                // Call the original constructor
                Backbone.View.apply(this, arguments);
            },
            loadSubView: function(view, viewOptions, targetSelector) {
                var _this = this,
                    def = $.Deferred();
                //load up the view...,
                require([view], function(theView) {
                    var theContainer = (viewOptions.tagName) ? $('<' + viewOptions.tagName + '/>') : $('<div class="container-subView"></div>'),
                        theID = _.uniqueId('subview_'),
                        options = {
                            el: '#' + theID
                        },
                        targetID = (targetSelector) ? $(targetSelector) : _this.$el;

                    //set the ID and append
                    theContainer.attr('id', theID);
                    targetID.append(theContainer);
                    //extend options...
                    options = $.extend(options, (viewOptions || {}));
                    
                    var theView = new theView(options);

                    //add to subView array
                    var newViewObject = {
                        id: theID,
                        view: theView,
                        string: view
                    };

                    _this.subView.push(newViewObject);

                    theView.$el.one('renderComplete', function() {
                        def.resolve();
                    })

                });

                return def.promise();
            },
            removeSubView: function(id) {
                var obj = _.findWhere(this.subView, {
                    id: id
                });
                obj.view.remove();
            },
            removeSubViewByString: function(string) {
                var _this = this;
                this.subView.forEach(function(obj, index){
                    
                    if(obj.string == string){
                        if(obj.view){
                            obj.view.remove();
                        }

                        delete _this.subView[index];
                    }
                });
            },
            removeAllSubViews: function() {
                var _this = this;

                this.subView.forEach(function(obj, index) {
                    //such weak sauce...so lame...with some objects the view is nested...lame lame lame lame
                    if (obj.view.view) {
                        obj.view.view.remove();
                    } else {
                        obj.view.remove();
                    }
                });

                this.subView = [];
            },
            loadFallbacks: function() {
                //no date input fallback

                var dateInput = this.$el.find('input[type="date"]');

                if (!Modernizr.inputtypes.date && dateInput.length) {
                    //modify the dates to be in the datepicker format...
                    dateInput.each(function(index, elm) {
                        var theValue = $(elm).val();
                        theValue = theValue.html5ToUSDate();
                        //var theValue = ('0' + (theDate.getMonth() + 1)).slice(-2) + '/' + ('0' + theDate.getDate()).slice(-2) + '/' + theDate.getFullYear();
                        $(elm).val(theValue);
                    });

                    dateInput.datepicker({
                        format: "mm/dd/yyyy",
                        multidate: false,
                    });

                }
            },
            _postRender: function() {
                var _this = this;

                this.loadFallbacks();

                nextEventLoop(function() {
                    _this.$el.trigger('renderComplete');
                })

            }
        });
        //usually returning the object you created...
        return BaseView;
    });