define(['mn',
    'text!templates/article/articleItem.html'
], function(Mn, template) {
    var ArticleItem = Mn.ItemView.extend({
        events: {
            "click .panel": "loadModal"
        },
        loadModal: function() {
            MMAPP.router.navigate("articleDetail/?title=newsDetail?Id="+this.model.id,{trigger:true})
            // App.modal.show("views/article/articleDetail", {
            //     title: this.model.get("Title"),
            //     model: this.model
            // })
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