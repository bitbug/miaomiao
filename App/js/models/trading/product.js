define(['jquery',
    'underscore',
    'backbone'
], function($, _, Backbone) {
    var SellingModel = Backbone.Model.extend({

    idAttribute: "ProductId"
    })

    //usually returning the object you created...
    return SellingModel
});