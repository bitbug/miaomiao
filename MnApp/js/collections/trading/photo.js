define(['jquery',
    'underscore',
    'backbone',
    'models/photo',
], function($, _, Backbone, sellingModel) {
    var PhotoCollection = Backbone.Collection.extend({
        model: sellingModel,
        url: '../Products/productPhoto',

    })

    //usually returning the object you created...
    return new PhotoCollection()
});