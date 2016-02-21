define(['mn',
    'text!templates/user/userInfo.html',
    'alertify',
    'moment'
], function(Mn, template, alertify,moment) {
    var UserInfoView = Backbone.View.extend({
        initialize: function(option) {
            this.model = MMAPP.user;
            this.render()
        },
        render: function() {
            var preparedTempalte = _.template(template, {
                model: this.model
            })
            this.$el.html(preparedTempalte)
        },
        changeRecord: function(e) {
            e.preventDefault();
            var formData = $("#itemForm").serializeObject();
            this.model.save(formData, {
                success: function() {
                    MMAPP.router.navigate("",{trigger:true})
                    alertify.alert("修改成功")
                }
            })
        },
        upgrade:function(){
            MMAPP.router.navigate("membership/?title=membership",{trigger:true})
        },
        events: {
            "click #change": "changeRecord",
            "click #upgrade": "upgrade"
        }
    })

    //usually returning the object you created...
    return UserInfoView;
});