define(['mn',
    'text!templates/trading/productItem.html'
], function(Mn, template) {
    var ProductItemView = Mn.ItemView.extend({
        tagName: "tr",
        className: "item",
        events: {
            "click td": "loadModal",
            "click .photoManager": "loadPhotoManager"
        },
        loadModal: function() {
            App.modal.show("views/trading/itemDetail", {
                title: this.model.get("Name"),
                model: this.model
            })
        },
        loadPhotoManager: function(e) {
            e.preventDefault();
            e.stopPropagation();
            App.modal.show('views/photoView', {
                title: "照片管理",
                model: this.model
            })
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