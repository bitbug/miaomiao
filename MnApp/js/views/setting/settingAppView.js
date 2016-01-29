define(['mn',
    'views/setting/membershipItem',
    'text!templates/setting/setting.html',
], function(Mn, itemView,template) {
    var SettingAppView = Mn.CompositeView.extend({
        childView:itemView,
        childContainer:"#membershipContainer",
        template:function(){
            return _.template(template);
        }
    })

    //usually returning the object you created...
    return SettingAppView;
});