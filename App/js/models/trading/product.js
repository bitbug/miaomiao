define(['jquery',
    'underscore',
    'backbone'
], function($, _, Backbone) {
    var SellingModel = Backbone.Model.extend({
    url:"./index.php/Products/productById",
    idAttribute: "ProductId"
    })

    //usually returning the object you created...
    return SellingModel
});