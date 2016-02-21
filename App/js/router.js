define(['mn',
    'views/header'
], function(Mn, HeaderView) {
    Router = Backbone.Marionette.AppRouter.extend({
        appRoutes: {
            "":"showDashboard",
            "article/?title=:title":"showArticle",
            "newInfo/?title=:title":"showNewInfo",
            "landing/?des=:garden":"showGardenLanding",
            "trading/?des=:des?filter=:filter": "showProductList",
            "productDetail/?title=:title?ProductId=:id?mode=:mode": "showProductDetail",
            "articleDetail/?title=:title?Id=:id":"showArticleDetail",
            "userCenter/?title=:title?filter=:filter?userId=:id":"showUserPosts",
            "userInfo/?title=:title":"showUserInfo",
            "photoManager/?title=:title?productId=:id":"showPhotoMng",
            "membership/?title=:membership":"membershipMng",
                // "membership":"showSetting",
                // "users":"showUserList",
                // "article":"showArticle"
        },
        onRoute: function(name, path, param) {
            var _this = this
            breadList = '';
            param.forEach(function(seg) {
                    
                if (seg) {                    
                    seg = _this.parseCh(seg);

                    if (seg != undefined) {
                        breadList += seg;
                    }

                }
            })
            MMAPP.currentPos = breadList
            MMAPP.root.showChildView('header', new HeaderView());
        },
        parseCh: function(phrase) {
            var enToCh = {
                "my":"我的",
                "article":"行业关注",
                "seedling": "树苗",
                "garden": "园艺资材",
                "selling": "出售",
                "buying": "求购",
                "quoting": "报价",
                "setting": "平台设置",
                "membership": "会员制度",
                "payment": "支付信息",
                "ProductDetail": "商品详情",
                "ProductEdit":"编辑商品",
                "newInfo":"发布信息",
                "newsDetail":"文章内容",
                "photoManager":"照片管理",
                "userInfo":"个人信息",
            };
            return enToCh[phrase];
        }
    });

    // var Router = Mn.AppRouter.extend({
    //     routes: {
    //         "": "index"
    //     },
    //     index: function() {
    //         this.loadApp('views/dashboard')
    //     },
    //     setStage: function() {
    //         var _this = this,
    //             def = $.Deferred();
    //         this.getAdmin().done(function() {

    //             $.when(_this.loadView('views/header', {
    //                 el: "#header"
    //             }), _this.loadView("views/menu", {
    //                 el: "#menu"
    //             })).done(function() {
    //                 _this.stageSet = true
    //                 def.resolve()
    //             })
    //         })
    //         return def
    //     },

    //     loadApp: function(view, option) {
    //         var def = $.Deferred(),
    //             _this = this;

    //         if (this.stageSet) {
    //             def.notify()
    //         } else {
    //             this.setStage().done(function() {
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
    //     },
    //     getAdmin: function() {
    //         var def = $.Deferred(),
    //             _this = this;
    //         sessionModel.fetch().done(function() {
    //             _this.admin = sessionModel;
    //             def.resolve()
    //         }).fail(function() {
    //             def.reject()
    //         })

    //         return def.promise()
    //     },
    // });

    return Router;
});