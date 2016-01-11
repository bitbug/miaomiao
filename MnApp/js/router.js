define(['mn',
    'controller',
    'models/session'
], function(Mn, controller, sessionModel) {

    var Router = Mn.AppRouter.extend({
        initialize: function() {
            var _this = this;
            this.controller.loadStage().done(function() {
                _this.admin = _this.controller.admin
            })
        },
        controller: controller,
        appRoutes: {
            "": "index"
        }

    });

    return Router;
});