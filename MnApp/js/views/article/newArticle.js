define(['mn',
    'text!templates/article/newArticle.html',
    'alertify',
    'moment'
], function(Mn, template, alertify,moment) {
    var NewArticle = Backbone.View.extend({
        initialize: function(option) {
            this.collection = option.collection;
            this.render()
        },
        render: function() {
            var preparedTempalte = _.template(template)
            this.$el.html(preparedTempalte)
        },
        
        events: {
            "click #create": "createRecord",
        },
        createRecord:function(e){
            e.preventDefault();
            var formData = this.$el.find("#articleForm").serializeObject(),
                data = _.extend(formData,{
                    "Author":App.admin.id,
                    "UserName":App.admin.get("UserName"),
                    "ArticleDateCreated":moment().format()
                })
            this.collection.create(data,{
                wait:true,
                success:function(response){
                    console.log(response)
                    App.modal.close();
                    alertify.alert("添加成功")
                }
            })
        }
    })

    //usually returning the object you created...
    return NewArticle;
});