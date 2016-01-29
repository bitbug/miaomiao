define(['mn',
    'models/session',
    'views/header',
    'views/menu',
    'views/dashboard'
], function(Mn, sessionModel, HeaderView, MenuView, DashboardView) {
    Controller = Backbone.Marionette.Object.extend({
        views: [],
        initialize: function() {
            this.admin = sessionModel
        },

        // Start the app by showing the appropriate views
        // and fetching the list of todo items, if there are any
        start: function() {
            var _this = this
            this.admin.fetch().done(function() {
                App.admin = _this.admin
                _this.showHeader();
                _this.showMenu();
                _this.showDashboard();

            });
        },
        showHeader: function() {
            App.root.showChildView('header', new HeaderView());
        },
        showMenu: function() {
            App.root.showChildView('menu', new MenuView())
        },
        showDashboard: function() {
            App.root.showChildView('main', new DashboardView())
        },
        showProductList:function(des,filter){
            var _this = this;
            this.loadCollection("collections/trading/product",{
                "Type":filter,
                "ProductType":des
            }).done(function(){
                var option={
                    collection:_this.collection
                };
                _this.loadMainView("views/trading/productAppView",option)
            })
        },
        showUserList:function(){
            var _this = this;
            this.loadCollection("collections/user/userList").done(function(){
                _this.loadMainView('views/user/userAppView',{collection:_this.collection})
            })
        },
        showSetting:function(){
            var _this = this;
            this.loadCollection('collections/setting/membership').done(function(){
                var option = {
                    collection:_this.collection
                }
                _this.loadMainView('views/setting/settingAppView',option)
            })
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