define(['mn',
    'text!templates/dashboard.html'
], function(Mn, template) {
    var Dashboard = Mn.View.extend({
        className:"container",
        initialize: function() {
            this.render();
        },
        render: function() {

            var preparedTemplate = _.template(template, {
                baseUrl: MMAPP.basePhotoPath
            });
            this.$el.html(preparedTemplate)
        },
        events:{
            "click .navButton":"routeTo"
        },
        routeTo:function(e){
            var des = $(e.currentTarget).data("des"),
                filter = $(e.currentTarget).data("filter");
            switch(des){
                case "dashboard":
                    MMAPP.router.navigate("dashboard",{trigger:true});
                break;
                case "garden":
                case "seedling":
                    MMAPP.router.navigate("trading/?des="+des+"?filter="+filter,{trigger:true});
                break;
            }
        }
    })

    //usually returning the object you created...
    return Dashboard;
});