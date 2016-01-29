define(['mn',
    'text!templates/setting/membershipItem.html',
    'alertify'
], function(Mn, template,alertify) {
    var MembershipItem = Mn.ItemView.extend({
        template: function(model) {
            return _.template(template, {
                model: model
            })
        },
        ui:{
            submit:".changeButton",
            form:".infoForm"
        },
        events:{
            "click @ui.submit":"changeSetting"
        },
        changeSetting:function(e){
            e.preventDefault();
            e.stopPropagation();
            var formData = this.ui.form.serializeObject()
            this.model.save(formData,{success:function(){
                alertify.alert("修改成功")
            }})

        }
    })

    //usually returning the object you created...
    return MembershipItem;
});