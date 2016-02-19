define(['mn',
    'text!templates/user/userProductItem.html'
], function(Mn, template) {
    var ProductItemView = Mn.ItemView.extend({
        events: {
            "click .panel": "routeToEdit",
        },
        routeToEdit: function() {
            MMAPP.router.navigate("productDetail/?title=ProductEdit?ProductId=" + this.model.id+"?mode=edit", {
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