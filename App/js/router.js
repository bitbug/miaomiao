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
            "quotingList/?title=:quoting/?ProductId=:id":"showQuotings"
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

    return Router;
});