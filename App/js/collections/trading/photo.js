define(['jquery',
    'underscore',
    'backbone',
    'models/photo',
], function($, _, Backbone, photoModel) {
    var PhotoCollection = Backbone.Collection.extend({
        model: photoModel,
        url: './index.php/Products/productPhoto',

    })

    //usually returning the object you created...
    return new PhotoCollection()
});