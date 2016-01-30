define(['mn',
    'text!templates/article/articleItem.html'
], function(Mn, template) {
    var ArticleItem = Mn.ItemView.extend({
        tagName: "tr",
        className: "articleItem",
        events: {
            "click td": "loadModal"
        },
        loadModal: function() {
            App.modal.show("views/article/articleDetail", {
                title: this.model.get("Title"),
                model: this.model
            })
        },
        onRender:function(option){
            var model = option.model;
            if(model.get("ArticleDateVoid")){
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
    return ArticleItem;
});