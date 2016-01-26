define(['mn',
    'views/trading/sellingItemView',
    'text!templates/trading/selling.html'
], function(Mn,itemView,template) {
    var SellingAppView = Mn.CompositeView.extend({
        childView:itemView,
        childViewContainer:"#dataBody",
        onRender:function(){
            
        },
        template:function(){
            return _.template(template)
        }
    })

    //usually returning the object you created...
    return SellingAppView;
});