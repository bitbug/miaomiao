define(['mn',
    'text!templates/trading/sellingItem.html'
], function(Mn,template) {
    var SellingItemView = Mn.ItemView.extend({
        tagName: 'tr',
        template:function(model){
            return _.template(template,{model:model})
        },
    })

    //usually returning the object you created...
    return SellingItemView;
});