define(['mn',
    'collections/article/newsCollection',
    'collections/trading/product',
    'collections/user/userList',
    'text!templates/dashboard.html'
], function(Mn, articles, products, users, template) {
    var Dashboard = Mn.View.extend({
        stats: {
            "articles": 0,
            "seedling": 0,
            "garden": 0,
            "users": 0,
            "products": 0
        },
        initialize: function() {
            var _this = this
            $.when(articles.fetch(), users.fetch(), products.fetch()).done(function(responseR, responseU, responseP) {
                _this.stats.articles = responseR[0].length;
                _this.stats.users = responseU[0].length;
                _this.stats.products = responseP[0].length;
                var result = _.countBy(responseP[0], function(obj) {
                    return (obj["ProductType"] == "seedling") ? "seedling" : "garden"
                })
                _this.stats.seedling = result.seedling;
                _this.stats.garden = result.garden;
                _this.render();
            })

        },
        render: function() {

            var preparedTemplate = _.template(template, {
                data: this.stats
            });
            this.$el.html(preparedTemplate)
        }
    })

    //usually returning the object you created...
    return Dashboard;
});