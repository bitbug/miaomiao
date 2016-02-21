define(['mn',
    'text!templates/user/membership.html',
], function(Mn,template) {
    var MembershipView = Backbone.View.extend({
        initialize: function() {
            var _this = this;
            $.ajax({
                url:"./index.php/Setting/membershipList",
                type:"GET",
            }).done(function(res){
                _this.settings = res;
                _this.renderView()
            })
        },
        renderView: function() {
            var preparedTempalte = _.template(template, {
                collection: this.settings,
            })
            this.$el.html(preparedTempalte)
        },
        routeToPay:function(e){
            var index = $(e.currentTarget).data("level"),
                option = this.settings[index];
            MMAPP.modal.show("views/user/payment",{
                title:option.RoleName,
                model :option
            });
        },
        events:{
            "click .memOption":"routeToPay"
        }
    })

    //usually returning the object you created...
    return MembershipView;
});