define(['mn',
    'text!templates/trading/gardenLanding.html'
], function(Mn, template) {
    var GardenLanding = Mn.View.extend({

        initialize: function() {
            this.render();
        },
        render: function() {

            var preparedTemplate = _.template(template,{
                baseUrl:MMAPP.basePhotoPath
            });
            this.$el.html(preparedTemplate)
        },
        events:{
            "click .navButton":"routeTo"
        },
        routeTo:function(e){
            var des = $(e.currentTarget).data("des"),
                filter = $(e.currentTarget).data("filter");
            MMAPP.router.navigate("trading/?des="+des+"?filter="+filter,{trigger:true});
        }
    })

    //usually returning the object you created...
    return GardenLanding;
});