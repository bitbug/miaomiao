define(['jquery',
    'underscore',
    'backbone',
    'models/trading/product',
    'fuse'
], function($, _, Backbone, sellingModel,Fuse) {
    var SellingCollection = Backbone.Collection.extend({
        model: sellingModel,
        url: '../Products/productListing',
        // fuzzySearch:function(query){
        //     var colJSON = this.toJSON(),
        //         keys = ["UserName","Name","ProductId","Unit","Price","Location","Quant","ProductDateCreated"],
        //         fuse = new Fuse(colJSON,{keys:keys}),
        //         result = fuse.search(query);
        //     return result;

        // },
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
            console.log(result)
            return result
        },

        // fuzzySearch: function(query) {
        //     var searchSet = {},
        //         _this = this,
        //         matchedCids = [];

        //     //construct the search set
        //     this.each(function(model) {
        //         searchSet[model.cid] = model.get("ProductId") +model.get("UserName")+ model.get("Name") + model.get("Unit") + model.get("Location") + model.get("ProductDateCreated")
        //     });

        //     //loop through the searchSet,for each pair of data:
        //     //  compare the model value and the query character by character,
        //     //  if all characters from the query have been found in the string then push that model string and its cid to result matches
        //     for (key in searchSet) {
        //         var string = searchSet[key].toLowerCase(),
        //             queryIndex = 0,
        //             stringIndex = 0,
        //             newCol = [],
        //             matchedPositions = [];
        //         while (stringIndex < string.length) {
        //             if (string[stringIndex] === query[queryIndex]) {
        //                 matchedPositions.push(stringIndex);
        //                 queryIndex++;
        //                 if (queryIndex >= query.length) {
        //                     matchedCids.push(key)
        //                     break;
        //                 }

        //             }
        //             stringIndex++
        //         }
        //     }

        //     newCol = this.filter(function(model) {
        //         return _.contains(matchedCids, model.cid)
        //     })

        //     return newCol

        // },

    })

    //usually returning the object you created...
    return new SellingCollection()
});