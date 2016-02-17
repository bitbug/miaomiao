define(['mn',
    'text!templates/trading/productItem.html'
], function(Mn, template) {
    var ProductItemView = Mn.ItemView.extend({
        tagName: "li",
        events: {
            "click .panel": "routeToDetail",
        },
        routeToDetail: function() {
            MMAPP.router.navigate("productDetail/?title=ProductDetail?ProductId=" + this.model.id, {
                trigger: true
            });
        },
        onRender: function(option) {
            var model = option.model;
            if (model.get("DateVoid")) {
                this.$el.hide()
            } else {
                this.$el.show()
            }
        },
        template: function(model) {
            return _.template(template, {
                model: model
            })
        },
    })

    //usually returning the object you created...
    return ProductItemView;
});