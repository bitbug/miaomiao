define(['mn',
    'text!templates/user/payment.html',
    'moment'
], function(Mn,template,moment) {
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

        },
        subscripe:function(e){
            var SubEndDate,
                duration = $(e.currentTarget).data("duration")
            if(duration=="month"){
                SubEndDate = moment().add(1,"M").format()
            }else{
                SubEndDate = moment().add(1,"y").format()
            }
            MMAPP.user.save({"SubEndDate":SubEndDate,
                            "Membership":this.model.Level
                            },{success:function(r){
                MMAPP.modal.close();
            }})
        },
        events:{
          "click .pay":"subscripe",
        }
    })

    //usually returning the object you created...
    return MembershipView;
});