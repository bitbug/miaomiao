define(['mn',
    'text!templates/menu.html'
], function(Mn, template) {
    var Menu = Mn.ItemView.extend({
         template: function() {
            var _this = this;
            return _.template(template, {
                data: Router.admin
            })
        },
        ui:{
                des:"[data-des]"
        },
        events:{
                "click @ui.des":"routeTo"
        },
        routeTo:function(e){
            var des = $(e.currentTarget).data("des"),
                filter = $(e.currentTarget).data("filter");
            switch(des){
                case "dashboard":
                    App.router.navigate("dashboard",{trigger:true});
                break;
                case "garden":
                case "seedling":
                    App.router.navigate("trading/?des="+des+"?filter="+filter,{trigger:true});
                break;
                case "userInfo":
                    App.router.navigate("users",{trigger:true});
                break;
                case "membership":
                    App.router.navigate("membership",{trigger:true})
                    
            }

        }

    })


    return Menu;
});