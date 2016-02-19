define(['mn',
    'text!templates/article/articleDetail.html',
    'alertify',
    'moment'
], function(Mn, template, alertify,moment) {
    var ArticleDetail = Backbone.View.extend({
        initialize: function(option) {
            this.model = option.model;
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
                    App.modal.close();
                    alertify.alert("修改成功")
                }
            })
        },
        deleteRecord: function(e) {
            e.preventDefault();
            var _this = this,
                formData = $("#itemForm").serializeObject();

            _.extend(formData,{
                "ArticleDateVoid":moment().format()
            });

            alertify.confirm("删除的条目不可找回，确定删除？",function(e){
                if(e){
                    _this.model.save(formData,{wait:true,success:function(){
                        App.modal.close();
                        alertify.alert("删除成功");
                    }})
                }else{
                    console.log("cancled")
                }
            })
        },
        events: {
            "click #change": "changeRecord",
            "click #delete": "deleteRecord"
        }
    })

    //usually returning the object you created...
    return ArticleDetail;
});