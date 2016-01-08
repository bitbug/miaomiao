/*
  This fires up the application.
  It loads the router and calles the initialize method.
*/

define([
    'jquery',
    'underscore',
    'backbone',
    'mn',
    'router',
], function($,_,Backbone,Mn,appRouter) {
    var Application = Mn.Application.extend({
        initialize:function(){
               //global functions....
            nextEventLoop = function(func, context) {
                var context = context || this;

                setTimeout(function() {
                    func.call(context);
                }, 0);
            };

            isDate = function(value) {
                /* Super simple (or dumb?) check for date. */
                if (value) {
                    value = value.toString();

                    var dateParts = (value.indexOf('/') > 0) ? value.split('/').length : value.split('-').length;

                    var value = value.replace(/-/g, "/");

                    var dateTest = new Date(value);

                    if (dateParts == 3 && dateTest != 'Invalid Date') {
                        return true;
                    } else {
                        return false;
                    }
                } else {
                    return false;
                }
            }

            isNumber = function(value) {
                var numberPattern = new RegExp(/^-?\d*(\.\d+)?$/);

                return numberPattern.test(value)
            }

            isPhone = function(value) {
                var phonePattern = new RegExp(/1?(?:[.\s-]?[2-9]\d{2}[.\s-]?|\s?\([2-9]\d{2}\)\s?)(?:[1-9]\d{2}[.\s-]?\d{4}\s?(?:\s?([xX]|[eE][xX]|[eE][xX]\.|[eE][xX][tT]|[eE][xX][tT]\.)\s?\d{3,4})?|[a-zA-Z]{7})/);

                return phonePattern.test(value)
            }

            isEmail = function(value) {
                var emailPattern = /[a-z0-9]+([-+._][a-z0-9]+){0,2}@.*?(\.(a(?:[cdefgilmnoqrstuwxz]|ero|(?:rp|si)a)|b(?:[abdefghijmnorstvwyz]iz)|c(?:[acdfghiklmnoruvxyz]|at|o(?:m|op))|d[ejkmoz]|e(?:[ceghrstu]|du)|f[ijkmor]|g(?:[abdefghilmnpqrstuwy]|ov)|h[kmnrtu]|i(?:[delmnoqrst]|n(?:fo|t))|j(?:[emop]|obs)|k[eghimnprwyz]|l[abcikrstuvy]|m(?:[acdeghklmnopqrstuvwxyz]|il|obi|useum)|n(?:[acefgilopruz]|ame|et)|o(?:m|rg)|p(?:[aefghklmnrstwy]|ro)|qa|r[eosuw]|s[abcdeghijklmnortuvyz]|t(?:[cdfghjklmnoprtvwz]|(?:rav)?el)|u[agkmsyz]|v[aceginu]|w[fs]|y[etu]|z[amw])\b){1,2}/;

                return emailPattern.test(value);
            }

            // truncate a long string by character
            // usage: str.trunc(12, true);
            String.prototype.trunc =
                function(n, useWordBoundary) {
                    var toLong = this.length > n,
                        s_ = toLong ? this.substr(0, n - 1) : this;
                    s_ = useWordBoundary && toLong ? s_.substr(0, s_.lastIndexOf(' ')) : s_;
                    return toLong ? s_ + '&hellip;' : s_;
            };

            // capitalize a string (this is too cool = This Is Too Cool)
            // usage: str.capitalize();
            String.prototype.capitalize = function() {
                return this.replace(/(?:^|\s)\S/g, function(a) {
                    return a.toUpperCase();
                });
            }

            String.prototype.html5ToUSDate = function() {
                var theArray = this.split('-');

                if (theArray.length == 3) {
                    return theArray[1] + '/' + theArray[2] + '/' + theArray[0];
                } else {
                    console.log('%cIncorrect HTML5 Date Format, expecting YYYY-MM-DD.', 'color: red');
                }

            }

            //adds remove method to Array.  Removes by value.
            //SomArray.remove('value')
            Array.prototype.remove = function() {
                var what, a = arguments,
                    L = a.length,
                    ax;
                while (L && this.length) {
                    what = a[--L];
                    while ((ax = this.indexOf(what)) !== -1) {
                        this.splice(ax, 1);
                    }
                }
                return this;
            };


            //show nice time
            Date.prototype.displayTime = function() {
                var hours = this.getHours(),
                    ampm = 'am',
                    minutes = (this.getMinutes() < 10) ? '0' + this.getMinutes() : this.getMinutes();

                if (hours == 0) {
                    hours = 12;
                }

                if (hours > 12) {
                    hours = hours - 12;
                    ampm = 'pm';
                }

                return (hours + ':' + minutes + ampm);
            }

            //add easy way to get full date string...
            Date.prototype.getFullDate = function() {
                var theMonth = this.getMonth() + 1,
                    theDay = this.getDate(),
                    theFullYear = this.getFullYear();

                if (theMonth < 10) {
                    theMonth = '0' + theMonth;
                }

                if (theDay < 10) {
                    theDay = '0' + theDay;
                }

                return theMonth + '/' + theDay + '/' + theFullYear;
            }

            Date.prototype.getHTML5Date = function() {
                //will output YYYY-MM-DD
                var theMonth = this.getMonth() + 1,
                    theDay = this.getDate(),
                    theFullYear = this.getFullYear();

                if (theMonth < 10) {
                    theMonth = '0' + theMonth;
                }

                if (theDay < 10) {
                    theDay = '0' + theDay;
                }

                return theFullYear + '-' + theMonth + '-' + theDay;
            }

            /**
             * Number.prototype.format(n, x)
             *
             * @param integer n: length of decimal
             * @param integer x: length of sections
             */
            Number.prototype.format = function(n, x) {
                var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\.' : '$') + ')';
                return this.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, 'g'), '$&,');
            };

            /* extend/replace the backbone sync, this adds the
               check for session active...
            */


            //serializeObject function for JQuery...
            $.fn.serializeObject = function() {
                var o = {};
                var a = this.serializeArray();
                $.each(a, function() {
                    if (o[this.name]) {
                        if (!o[this.name].push) {
                            o[this.name] = [o[this.name]];
                        }
                        o[this.name].push(this.value || '');
                    } else {
                        o[this.name] = this.value || '';
                    }
                });
                return o;
            };

            //disable link clicks, we want backbone to handle these
            $(document).on('click', '[href]:not([follow])', function(e) {
                e.preventDefault();
            });


            $(document).ready(function(){
                var windowHeight = $(window).height();
                $("body").height(windowHeight)
            })
            
        },
    });
    
    var App = new Application();

    App.on("start",function(){

        this.addRegions({
            AppRegion:"#appContainer"
        });
        this.Router = new appRouter();
        Backbone.history.start();


    })


    return window.App = App;
});