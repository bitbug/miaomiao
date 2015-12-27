define(['jquery',
    'underscore'
], function($, _) {

    var TimeClock = function(options) {
        //Constructor...
        //default options
        this.options = {
            interval: 10000, //10 seconds
            dateString: null
        }

        this.options = $.extend(this.options, options);

        //start it up...
        this.init();
    };

    //the methods...
    TimeClock.prototype = {
        init: function() {
            this.dateMS = (this.options.dateString) ? new Date(this.options.dateString) : new Date();
            this.dateMS = this.dateMS.getTime();

            //start the timer
            this.startInterval();
        },
        updateMS: function() {
            this.dateMS = this.dateMS + this.options.interval;
        },
        startInterval: function() {
            var _this = this;

            this.timer = setInterval(function() {
                _this.updateMS();
            }, this.options.interval);
        },
        getTime: function() {
            var theDisplayTime = new Date(this.dateMS);
            return theDisplayTime.displayTime();
        }
    }


    //usually returning the object you created...
    return TimeClock;
});
