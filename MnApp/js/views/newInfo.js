define(['mn',
    'text!templates/newInfo.html',
    'alertify',
    'moment'
], function(Mn, template, alertify,moment) {
    var ItemDetailView = Backbone.View.extend({
        initialize: function(option) {
            this.model = option.model;
            this.render()
        },
        render: function() {
            this.$el.html(template)
        },
        events:{
            "click #create":"createInfo"
        },
        createInfo:function(e){
            e.preventDefault()
            var formData = $("#newInfoForm").serializeObject(),
                data = _.extend(formData,{
                    "ProductDateCreated":moment().format(),
                    "UserCreated":this.model.id
                });

            $.ajax({
                url:"../Products/product",
                type:"POST",
                data:data,
                dataType:"JSON"
            }).done(function(){
                App.modal.close();
                alertify.alert("发布成功");
            })
        }
    })

    //usually returning the object you created...
    return ItemDetailView;
});