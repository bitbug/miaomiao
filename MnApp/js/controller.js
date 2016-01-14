define(['mn',
    'models/session'
], function(Mn, sessionModel) {

    var Controller = Mn.Controller.extend({

        index: function() {
            this.loadApp('views/dashboard')
        },
        setStage: function() {
            var def = $.Deferred();
            $.when(this.loadView('views/header', {
                el: "#header"
            }), this.loadView("views/menu", {
                el: "#menu"
            })).done(function() {
                def.resolve()
            })
            return def
        },

        loadApp: function(view, option) {
            var def = $.Deferred(),
                _this = this;

            if (this.admin) {
                def.notify()
            } else {
                Router.getAdmin().done(function() {
                    def.notify();
                });
            }

            def.progress(function() {
                _this.loadView(view, option).done(function() {
                    def.resolve();
                });
            })
            return def.promise()
        },
        loadView: function(viewLink, option) {
            var def = $.Deferred(),
                _this = this;
            if (option["el"] === undefined) {
                option["el"] = "#mainView"
            }
            require([viewLink], function(view) {
                App.AppRegion.show(new view(option));
                def.resolve();
            });

            return def.promise()
        }
    })

    return Controller
});