define(['mn',
    'models/session',
    'views/header',
    'views/nav',
    'views/dashboard',
    'models/trading/product',
    'models/article/newsModel',
    'moment'
], function(Mn, sessionModel, HeaderView, MenuView, DashboardView, ProductModel,ArticleModel,moment) {
    Controller = Backbone.Marionette.Object.extend({
        views: [],
        initialize: function() {
            this.user = sessionModel
        },

        // Start the MMAPP by showing the appropriate views
        // and fetching the list of todo items, if there are any
        start: function() {
            var _this = this
            this.user.fetch().done(function() {
                MMAPP.user = _this.user;
                _this.showHeader();
                _this.showMenu();
                _this.showDashboard();
                _this.checkMembership()

            });
        },
        checkMembership:function(){
            var today = moment().format(),
                subEndDate = MMAPP.user.get("SubEndDate");

            if(subEndDate&&moment(subEndDate).isBefore(today)){
                MMAPP.user.save({"Membership":0,"SubEndDate":""})
            }
        },
        showHeader: function(option) {
            MMAPP.root.showChildView('header', new HeaderView());
        },
        showMenu: function() {

            MMAPP.root.showChildView('menu', new MenuView())
        },
        showDashboard: function() {
            MMAPP.root.showChildView('main', new DashboardView())
        },
        showProductList: function(des, filter) {
            var _this = this;
            this.loadCollection("collections/trading/product", {
                "Type": filter,
                "ProductType": des
            }).done(function() {
                var option = {
                    collection: _this.collection,
                    des: des,
                    filter: filter
                };
                _this.loadMainView("views/trading/productAppView", option)
            })
        },
        showProductDetail: function(title, ProductId,mode) {
            var _this = this,
                productModel = new ProductModel();
            $.when(productModel.fetch({
                data: $.param({
                    ProductId: ProductId
                })
            }), $.ajax({
                url: "./index.php/Products/productPhoto",
                data: $.param({
                    "FileType": "ProductPhoto",
                    "ProductId": ProductId
                })
            })).done(function(r1, r2) {
                _this.loadMainView("views/trading/itemDetail", {
                    ProductId: ProductId,
                    mode:mode,
                    model: productModel,
                    photoCollection: r2[0]
                });
            })

        },
        showGardenLanding:function(){
            this.loadMainView('views/trading/gardenLanding',{})
        },
        showNewInfo:function(){
            this.loadMainView('views/newInfo',{})
        },
        showArticle:function(){
            var _this = this;
            this.loadCollection('collections/article/newsCollection').done(function(){
                var option = {
                    collection:_this.collection
                }
                _this.loadMainView('views/article/articleAppView',option)
            })
        },
        showArticleDetail:function(title,ArticleId){
            var _this= this,
                articleModel = new ArticleModel();
                articleModel.fetch({data:$.param({
                    ArticleId:ArticleId
                })}).done(function(){
                    _this.loadMainView('views/article/articleDetail',{
                        model:articleModel
                    })
                })
        },
        showUserPosts:function(title,filter,userId){
            var _this = this;
            this.loadCollection("collections/trading/product",{
                "Type":filter,
                "UserCreated":userId
            }).done(function(){
                 var option = {
                    collection: _this.collection,
                    type: filter
                };
                _this.loadMainView("views/user/userProductsView", option)
            })
        },
        showPhotoMng:function(title,ProductId){
            this.loadMainView("views/photoView",{
                ProductId:ProductId
            })
        },
        showUserInfo:function(){
            this.loadMainView("views/user/userInfo");
        },
        membershipMng:function(){
            this.loadMainView("views/user/membershipView");
        },
        showQuotings:function(title, RelateProduct){
            var _this = this
            this.loadCollection("collections/trading/product",{
                "RelateProduct":RelateProduct
            }).done(function(){
                var option = {
                    collection:_this.collection,
                    RelateProduct:RelateProduct
                }
                _this.loadMainView("views/trading/productAppView",option)
            })
        },
        loadCollection: function(link, option) {
            var _this = this,
                def = $.Deferred();

            option || (option = {});
            require([link], function(collection) {
                collection.fetch({
                    data: $.param(option)
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
                MMAPP.root.main.show(new view(option));
            })
        }

    });

    return Controller
});