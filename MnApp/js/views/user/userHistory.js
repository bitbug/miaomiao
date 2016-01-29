define(['mn',
    'text!templates/user/userHistory.html',
    'alertify',
    'moment',
    'footable'
], function(Mn, template, alertify,moment,footable) {
    var ItemDetailView = Backbone.View.extend({
        initialize: function(option) {
            var _this = this;
            this.model = option.model;
            $.ajax({
                url:"../Products/productsByUser",
                type:"GET",
                data:{
                    "UserCreated":this.model.id
                },
                dataType:'JSON'
            }).done(function(response){
                _this.collection = response
                _this.render()
                setTimeout(function(){
                    $("#userHistory").footable()
                },0)
            })
        },
        parseCh:function(phrase){
            var enToCh={
                "seedling":"树苗交易",
                "garden":"园艺资材",
                "selling":"供应",
                "buying":"求购",
                "quoting":"报价"
            };
            return enToCh[phrase];
        },
        render: function() {
            var preparedTempalte = _.template(template, {
                collection: this.collection,
                parseCh:this.parseCh
            })
            this.$el.html(preparedTempalte)
        },
    })

    //usually returning the object you created...
    return ItemDetailView;
});