define(['mn',
    'models/session',
    'views/header',
    'views/nav',
    'views/dashboard'
], function(Mn, sessionModel, HeaderView, MenuView, DashboardView) {
    Controller = Backbone.Marionette.Object.extend({
        views: [],
        initialize: function() {
            this.user = sessionModel
        },

        // Start the app by showing the appropriate views
        // and fetching the list of todo items, if there are any
        start: function() {
            var _this = this
            this.user.fetch().done(function() {
                App.user = _this.user;
                _this.showHeader();
                _this.showMenu();
                _this.showDashboard();

            });
        },
        showHeader: function() {
            App.root.showChildView('header', new HeaderView());
        },
        showMenu: function() {
            App.root.showChildView('nav', new MenuView())
        },
        showDashboard: function() {
            App.root.showChildView('main', new DashboardView())
        },
        loadCollection: function(link,option) {
            var _this = this,
                def = $.Deferred();

            option || (option = {});
            require([link], function(collection) {
                collection.fetch({
                    data:$.param(option)
                }).done(function() {
                    _this.collection = collection
                    def.resolve()
                }).fail(function() {
                    def.reject()
                })
            })
            return def.promise()
        },
        loadMainView: function(link, option) {
            option || (option = {});

            require([link], function(view) {
                App.root.main.show(new view(option));
            })
        }

    });

    return Controller
});