define(['mn',
    'models/session'
], function(Mn, sessionModel) {

    var Router = Mn.AppRouter.extend({
        routes: {
            "": "index"
        },
        index: function() {
            this.loadApp('views/dashboard')
        },
        setStage: function() {
            var _this = this,
                def = $.Deferred();
            this.getAdmin().done(function() {

                $.when(_this.loadView('views/header', {
                    el: "#header"
                }), _this.loadView("views/menu", {
                    el: "#menu"
                })).done(function() {
                    _this.stageSet = true
                    def.resolve()
                })
            })
            return def
        },

        loadApp: function(view, option) {
            var def = $.Deferred(),
                _this = this;

            if (this.stageSet) {
                def.notify()
            } else {
                this.setStage().done(function() {
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
        },
        getAdmin: function() {
            var def = $.Deferred(),
                _this = this;
            sessionModel.fetch().done(function() {
                _this.admin = sessionModel;
                def.resolve()
            }).fail(function() {
                def.reject()
            })

            return def.promise()
        },
    });

    return Router;
});