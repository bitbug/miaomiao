define(['mn',
    'text!templates/user/payment.html',
], function(Mn,template) {
    var MembershipView = Backbone.View.extend({
        initialize: function(option) {
           this.model = option.model;
           this.renderView();
        },
        renderView:function(){
            var preparedTempalte = _.template(template,{
                model:this.model,
                helper:this.templateHelper
            })
            this.$el.html(preparedTempalte)
        },
        templateHelper:function(str){
            var listArr = str.split("；"),
                ulContent = '';
            listArr.forEach(function(item){
                ulContent+= "<li>"+item+"</li>"
            })
            return ulContent

        }
    })

    //usually returning the object you created...
    return MembershipView;
});