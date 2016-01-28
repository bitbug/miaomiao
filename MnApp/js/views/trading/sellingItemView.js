define(['mn',
    'text!templates/trading/sellingItem.html'
], function(Mn, template) {
    var SellingItemView = Mn.ItemView.extend({
        tagName: "tr",
        className: "item",
        events: {
            "click td": "loadModal"
        },
        loadModal: function() {
            App.modal.show("views/trading/itemDetail", {
                title: this.model.get("Name"),
                model: this.model
            })
        },
        onRender:function(option){
            var model = option.model;
            if(model.get("DateVoid")){
                this.$el.hide()
            }else{
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
    return SellingItemView;
});