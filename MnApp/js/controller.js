define(['mn',
    'models/session',
    'views/header',
    'views/menu',
    'views/dashboard'
], function(Mn,sessionModel,HeaderView,MenuView,DashboardView) {
    Controller = Backbone.Marionette.Object.extend({
        views:[],
        initialize: function () {
            this.admin = sessionModel
        },

        // Start the app by showing the appropriate views
        // and fetching the list of todo items, if there are any
        start: function () {
            var _this = this
            this.admin.fetch().done(function(){
                App.admin = _this.admin
                _this.showHeader();
                _this.showMenu();
                _this.showDashboard();
                
            });
        },
        showHeader: function () {
            App.root.showChildView('header', new HeaderView());
        },
        showMenu:function(){
            App.root.showChildView('menu',new MenuView())
        },
        showDashboard:function(){
            App.root.showChildView('main',new DashboardView())
        },
        showTradingList:function(option){
            var _this = this;
            this.loadCollection("collections/trading/selling").done(function(){
                option = {collection:_this.collection}
                _this.loadMainView("views/trading/sellingAppView",option)
            })
        },
        showBuyingList:function(option){
            var _this = this;
            this.loadCollection("colleciton/trading/buying").done(function(){
                _this.loadMainView("views/trading/buyingAppView",option)
            })
        },
        showQuotingList:function(option){
            var _this = this;
            this.loadCollection("colleciton/trading/quoting").done(function(){
                _this.loadMainView("views/trading/quotingAppView",option)
            })
        },
        loadCollection:function(link){
            var _this = this,
                def = $.Deferred();
            require([link],function(collection){
                collection.fetch().done(function(){
                    _this.collection = collection
                    def.resolve()
                }).fail(function(){
                    def.reject()
                })
            })
            return def.promise()
        },
        loadMainView:function(link,option){
            require([link],function(view){
            App.root.main.show(new view(option));
            })
        },
    });

    // var Controller = Mn.Controller.extend({

    //     index: function() {
    //         this.loadApp('views/dashboard')
    //     },
    //     setStage: function() {
    //         var def = $.Deferred();
    //         $.when(this.loadView('views/header', {
    //             el: "#header"
    //         }), this.loadView("views/menu", {
    //             el: "#menu"
    //         })).done(function() {
    //             def.resolve()
    //         })
    //         return def
    //     },

    //     loadApp: function(view, option) {
    //         var def = $.Deferred(),
    //             _this = this;

    //         if (this.admin) {
    //             def.notify()
    //         } else {
    //             Router.getAdmin().done(function() {
    //                 def.notify();
    //             });
    //         }

    //         def.progress(function() {
    //             _this.loadView(view, option).done(function() {
    //                 def.resolve();
    //             });
    //         })
    //         return def.promise()
    //     },
    //     loadView: function(viewLink, option) {
    //         var def = $.Deferred(),
    //             _this = this;
    //         if (option["el"] === undefined) {
    //             option["el"] = "#mainView"
    //         }
    //         require([viewLink], function(view) {
    //             App.AppRegion.show(new view(option));
    //             def.resolve();
    //         });

    //         return def.promise()
    //     }
    // })

    return Controller
});