define(['mn',
    'text!templates/user/userItem.html'
], function(Mn, template) {
    var UserSelectView = Mn.ItemView.extend({
        tagName: "tr",
        className: "userItem",
        template: function(model) {
            return _.template(template, {
                model: model
            })
        },
        ui:{
            history:".checkHistory",
            postInfo:".postInfo"
        },
        events: {
            "click td": "loadDetail",
            "click @ui.history":"loadHistory",
            "click @ui.postInfo":"loadNewInfo"
        },
        loadHistory:function(e){
            e.preventDefault();
            e.stopPropagation()
            App.modal.show("views/user/userHistory",{
                title:this.model.get("UserName")+"发布的信息",
                model:this.model
            })
        },
        loadNewInfo:function(e){
            e.preventDefault();
            e.stopPropagation()
            App.modal.show("views/newInfo",{
                title:"发布新信息",
                model:this.model
            })
        },
        loadDetail: function() {
            App.modal.show("views/user/userDetail", {
                title: this.model.get("UserName"),
                model: this.model
            })
        },
        onRender:function(option){
            var model = option.model;
            if(model.get("UserDateVoid")){
                this.$el.hide()
            }else{
                this.$el.show()
            }
        },
    })

    //usually returning the object you created...
    return UserSelectView;
});