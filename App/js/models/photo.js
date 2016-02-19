define(['jquery',
    'underscore',
    'backbone'
], function($, _, Backbone) {
    var PhotoModel = Backbone.Model.extend({
        idAttribute: "FileId"
    })

    //usually returning the object you created...
    return PhotoModel
});