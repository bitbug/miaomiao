define(['jquery',
    'underscore',
    'backbone',
    'models/trading/product',
    'fuse'
], function($, _, Backbone, sellingModel,Fuse) {
    var SellingCollection = Backbone.Collection.extend({
        model: sellingModel,
        url: './index.php/Products/productListing',
        fuzzySearch:function(query){
            var initData = this.toJSON(),
                keys = ["UserName","Name","ProductId","Unit","Price","Location","Quant","ProductDateCreated"],
                queryArr = query.split(" "),
                fuse,
                result;

            for(var i=0;i<queryArr.length;i++){
                fuse = new Fuse(initData,{keys:keys});

                if(queryArr[i]!=""){
                    result = fuse.search(queryArr[i]);                   
                }
                initData = result;
            }
            return result
        },

    })

    //usually returning the object you created...
    return new SellingCollection()
});