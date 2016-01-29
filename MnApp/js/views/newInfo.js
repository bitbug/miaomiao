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
        // changeRecord: function(e) {
        //     e.preventDefault();
        //     var formData = $("#itemForm").serializeObject();
        //     this.model.save(formData, {
        //         success: function() {
        //             App.modal.close();
        //             alertify.alert("修改成功")
        //         }
        //     })
        // },
        // deleteRecord: function(e) {
        //     e.preventDefault();
        //     var _this = this,
        //         formData = $("#itemForm").serializeObject();

        //     _.extend(formData,{
        //         "UserDateVoid":moment().format()
        //     });

        //     alertify.confirm("删除的条目不可找回，确定删除？",function(e){
        //         if(e){
        //             _this.model.save(formData,{wait:true,success:function(){
        //                 App.modal.close();
        //                 alertify.alert("删除成功");
        //             }})
        //         }
        //     })
        // },
        // events: {
        //     "click #change": "changeRecord",
        //     "click #delete": "deleteRecord"
        // }
    })

    //usually returning the object you created...
    return ItemDetailView;
});