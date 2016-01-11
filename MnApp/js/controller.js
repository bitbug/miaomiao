define(['mn',
    'models/session'
], function(Mn, sessionModel) {

    var Controller = Mn.Controller.extend({
        index: function() {
            this.loadApp('views/dashboard')
        },
        loadStage: function() {
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
        loadApp: function(view, option) {
            var def = $.Deferred(),
                _this = this;

            this.loadStage().done(function() {
                // option = $.extend({
                //     admin: _this.admin
                // }, option);

                def.notify();
            });

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

            require([viewLink], function(view) {
                App.AppRegion.show(new view(option));
                def.resolve();
            });

            return def.promise()
        }
    })

    return new Controller()
});