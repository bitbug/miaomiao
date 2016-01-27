define(['jquery',
    'underscore',
    'backbone',
    'models/trading/selling'
], function($, _, Backbone, sellingModel) {
    var SellingCollection = Backbone.Collection.extend({
        model: sellingModel,
        url: '../Products/sellingListing',
        fuzzySearch: function(query) {
            var searchSet = {},
                _this = this,
                matchedCids = [];

            //construct the search set
            this.each(function(model) {
                searchSet[model.cid] = model.get("Id") + model.get("Name") + model.get("Quant") + model.get("Unit") + model.get("Price") + model.get("Location") + model.get("DateCreated")
            });

            //loop through the searchSet,for each pair of data:
            //  compare the model value and the query character by character,
            //  if all characters from the query have been found in the string then push that model string and its cid to result matches
            for (key in searchSet) {
                var string = searchSet[key].toLowerCase(),
                    queryIndex = 0,
                    stringIndex = 0,
                    newCol = [],
                    matchedPositions = [];
                while (stringIndex < string.length) {
                    if (string[stringIndex] === query[queryIndex]) {
                        matchedPositions.push(stringIndex);
                        queryIndex++;
                        if (queryIndex >= query.length) {
                            matchedCids.push(key)
                            break;
                        }

                    }
                    stringIndex++
                }
            }

            newCol = this.filter(function(model) {
                return _.contains(matchedCids, model.cid)
            })

            return newCol

        },

    })

    //usually returning the object you created...
    return new SellingCollection()
});