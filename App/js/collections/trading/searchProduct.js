define(['jquery',
    'underscore',
    'backbone',
    'models/trading/product',
], function($, _, Backbone, sellingModel) {
    var SearchCollection = Backbone.Collection.extend({
        model: sellingModel,
        url: './index.php/Products/searchProduct'

    })

    //usually returning the object you created...
    return new SearchCollection()
});