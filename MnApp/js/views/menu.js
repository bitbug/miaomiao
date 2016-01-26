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
            var des = $(e.currentTarget).data("des");
            App.router.navigate(des,{trigger:true});

        }

    })


    return Menu;
});