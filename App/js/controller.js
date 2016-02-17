define(['mn',
    'models/session',
    'views/header',
    'views/nav',
    'views/dashboard',
    'models/trading/product',
], function(Mn, sessionModel, HeaderView, MenuView, DashboardView, ProductModel) {
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

            });
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
        showProductDetail: function(title, ProductId) {
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
                    model: productModel,
                    photoCollection: r2[0]
                });
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